"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FILM_FRAMES } from "@/data/film-frames";

type FilmStripProps = {
  isPaused: boolean;
};

type Point = { x: number; y: number };

type Hole = { x: number; y: number; angle: number };

const FRAME_W = 240;
const FILM_H = 196;
const SPROCKET = 20;
const AMPLITUDE = 48;
const CYCLES = 2;
const FRAME_GAP = 16;
const HOLE_W = 16;
const HOLE_H = 11;
const LOOP_MS = 70000;

const REEL_W = FILM_FRAMES.length * FRAME_W;
const HALF = FILM_H / 2;
const PHOTO_EDGE = HALF - SPROCKET;
const PHOTO_THICKNESS = (PHOTO_EDGE - 1.5) * 2;

function num(value: number) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

function curve(x: number) {
  const k = (Math.PI * 2 * CYCLES) / REEL_W;
  const y = AMPLITUDE * Math.sin(k * x);
  const slope = AMPLITUDE * k * Math.cos(k * x);
  const length = Math.hypot(slope, 1);
  return {
    x,
    y,
    slope,
    ux: slope / length,
    uy: -1 / length,
  };
}

function edgePoint(x: number, dist: number): Point {
  const point = curve(x);
  return {
    x: point.x + point.ux * dist,
    y: point.y + point.uy * dist,
  };
}

function buildArcTable() {
  const steps = 2400;
  const table: { x: number; s: number }[] = [{ x: 0, s: 0 }];
  let traveled = 0;
  let previous = curve(0);

  for (let step = 1; step <= steps; step += 1) {
    const x = (step / steps) * REEL_W;
    const point = curve(x);
    traveled += Math.hypot(point.x - previous.x, point.y - previous.y);
    table.push({ x, s: traveled });
    previous = point;
  }

  return { table, total: traveled };
}

const ARC = buildArcTable();
const FRAME_ARC = ARC.total / FILM_FRAMES.length;
const IMAGE_W = FRAME_ARC - FRAME_GAP;
const IMAGE_H = PHOTO_THICKNESS + 18;

function xAtArc(target: number) {
  const total = ARC.total;
  const wrapped = ((target % total) + total) % total;
  if (wrapped <= 0) return 0;

  let low = 0;
  let high = ARC.table.length - 1;
  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (ARC.table[mid].s < wrapped) low = mid;
    else high = mid;
  }

  const start = ARC.table[low];
  const end = ARC.table[high];
  const span = end.s - start.s;
  const t = span === 0 ? 0 : (wrapped - start.s) / span;
  return start.x + (end.x - start.x) * t;
}

function line(points: Point[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${num(point.x)} ${num(point.y)}`)
    .join("");
}

function samples() {
  const count = FILM_FRAMES.length * 16;
  return Array.from({ length: count + 1 }, (_, index) => (index / count) * REEL_W);
}

const RAIL_X = samples();

function band(dist: number) {
  return RAIL_X.map((x) => edgePoint(x, dist));
}

const outerTop = band(HALF);
const outerBottom = band(-HALF);
const photoTop = band(PHOTO_EDGE - 1.5);
const photoBottom = band(-(PHOTO_EDGE - 1.5));

const BODY_PATH = `${line(outerTop)}${line([...outerBottom].reverse()).replace(/^M/, "L")}Z`;
const RAIL_PATH = `${line(outerTop)}${line(outerBottom)}${line(band(PHOTO_EDGE))}${line(band(-PHOTO_EDGE))}`;
const PHOTO_BAND = `${line(photoTop)}${line([...photoBottom].reverse()).replace(/^M/, "L")}Z`;

const holeCount = Math.max(1, Math.round(ARC.total / 34));
const holeSpacing = ARC.total / holeCount;
const along = HALF - SPROCKET / 2;

const HOLES: Hole[] = Array.from({ length: holeCount }, (_, index) => {
  const x = xAtArc((index + 0.5) * holeSpacing);
  const point = curve(x);
  const angle = (Math.atan2(point.slope, 1) * 180) / Math.PI;
  return [-along, along].map((dist) => {
    const center = edgePoint(x, dist);
    return { x: center.x, y: center.y, angle };
  });
}).flat();

const edgeYs = [...outerTop, ...outerBottom].map((point) => point.y);
const VIEW_PAD = 8;
const VIEW_Y = Math.min(...edgeYs) - VIEW_PAD;
const VIEW_H = Math.max(...edgeYs) - Math.min(...edgeYs) + VIEW_PAD * 2;

function poseAt(distance: number) {
  const x = xAtArc(distance);
  const point = curve(x);
  const angle = (Math.atan2(point.slope, 1) * 180) / Math.PI;
  return `translate(${num(point.x)} ${num(point.y)}) rotate(${num(angle)})`;
}

const BASE_POSES = FILM_FRAMES.map((_, index) => poseAt((index + 0.5) * FRAME_ARC));

export function FilmStrip({ isPaused }: FilmStripProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<Array<SVGImageElement | null>>([]);
  const distanceRef = useRef(0);
  const [visibleW, setVisibleW] = useState(FRAME_W * 6);
  const [reduceMotion, setReduceMotion] = useState(false);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const fit = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (height < 1 || width < 1) return;
      const fitted = (width / height) * VIEW_H;
      const maxVisible = REEL_W - FRAME_W * 2;
      setVisibleW(Math.max(FRAME_W * 2, Math.min(fitted, maxVisible)));
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (isPaused || reduceMotion) return;

    let frame = 0;
    let previous: number | null = null;

    const tick = (now: number) => {
      if (previous != null) {
        distanceRef.current += Math.min(now - previous, 48) / LOOP_MS * ARC.total;
      }
      previous = now;
      const shift = distanceRef.current;

      photosRef.current.forEach((photo, index) => {
        if (!photo) return;
        photo.setAttribute("transform", poseAt((index + 0.5) * FRAME_ARC + shift));
      });

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isPaused, reduceMotion]);

  const viewX = (REEL_W - visibleW) / 2;

  return (
    <div ref={stageRef} className="film-strip relative h-full min-h-0 w-full overflow-hidden">
      <svg
        className="film-reel"
        viewBox={`${num(viewX)} ${num(VIEW_Y)} ${num(visibleW)} ${num(VIEW_H)}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Thước phim kỷ niệm"
      >
        <defs>
          <clipPath id="film-photo-band">
            <path d={PHOTO_BAND} />
          </clipPath>
        </defs>
        <path d={BODY_PATH} fill="#161311" />
        <path
          d={RAIL_PATH}
          fill="none"
          stroke="rgba(185,154,99,0.72)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
        {HOLES.map((hole, index) => (
          <rect
            key={`hole-${index}`}
            x={num(-HOLE_W / 2)}
            y={num(-HOLE_H / 2)}
            width={HOLE_W}
            height={HOLE_H}
            rx="2"
            fill="#0d0c0b"
            stroke="rgba(185,154,99,0.55)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            transform={`translate(${num(hole.x)} ${num(hole.y)}) rotate(${num(hole.angle)})`}
          />
        ))}
        <g clipPath="url(#film-photo-band)">
          {FILM_FRAMES.map((frame, index) => (
            <image
              key={frame.id}
              ref={(node) => {
                photosRef.current[index] = node;
              }}
              className="film-photo"
              href={frame.src}
              x={num(-IMAGE_W / 2)}
              y={num(-IMAGE_H / 2)}
              width={num(IMAGE_W)}
              height={num(IMAGE_H)}
              preserveAspectRatio="xMidYMid slice"
              transform={BASE_POSES[index]}
            >
              <title>{frame.alt}</title>
            </image>
          ))}
        </g>
      </svg>
    </div>
  );
}
