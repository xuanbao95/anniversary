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
const DESKTOP_CYCLES = 2;
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

function curve(x: number, cycles: number) {
  const k = (Math.PI * 2 * cycles) / REEL_W;
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

function edgePoint(x: number, dist: number, cycles: number): Point {
  const point = curve(x, cycles);
  return {
    x: point.x + point.ux * dist,
    y: point.y + point.uy * dist,
  };
}

function buildArcTable(cycles: number) {
  const steps = 2400;
  const table: { x: number; s: number }[] = [{ x: 0, s: 0 }];
  let traveled = 0;
  let previous = curve(0, cycles);

  for (let step = 1; step <= steps; step += 1) {
    const x = (step / steps) * REEL_W;
    const point = curve(x, cycles);
    traveled += Math.hypot(point.x - previous.x, point.y - previous.y);
    table.push({ x, s: traveled });
    previous = point;
  }

  return { table, total: traveled };
}

function xAtArc(target: number, arc: { table: { x: number; s: number }[]; total: number }) {
  const total = arc.total;
  const wrapped = ((target % total) + total) % total;
  if (wrapped <= 0) return 0;

  let low = 0;
  let high = arc.table.length - 1;
  while (low < high - 1) {
    const mid = (low + high) >> 1;
    if (arc.table[mid].s < wrapped) low = mid;
    else high = mid;
  }

  const start = arc.table[low];
  const end = arc.table[high];
  const span = end.s - start.s;
  const t = span === 0 ? 0 : (wrapped - start.s) / span;
  return start.x + (end.x - start.x) * t;
}

function line(points: Point[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${num(point.x)} ${num(point.y)}`)
    .join("");
}

const RAIL_X = Array.from({ length: FILM_FRAMES.length * 16 + 1 }, (_, index) => (index / (FILM_FRAMES.length * 16)) * REEL_W);

type Reel = {
  cycles: number;
  bodyPath: string;
  railPath: string;
  photoBand: string;
  holes: Hole[];
  viewY: number;
  viewH: number;
  imageW: number;
  imageH: number;
  arcTotal: number;
  frameArc: number;
  placeAt: (distance: number) => { x: number; y: number; angle: number };
};

function buildReel(cycles: number): Reel {
  const arc = buildArcTable(cycles);
  const frameArc = arc.total / FILM_FRAMES.length;
  const band = (dist: number) => RAIL_X.map((x) => edgePoint(x, dist, cycles));
  const outerTop = band(HALF);
  const outerBottom = band(-HALF);
  const photoTop = band(PHOTO_EDGE - 1.5);
  const photoBottom = band(-(PHOTO_EDGE - 1.5));
  const holeCount = Math.max(1, Math.round(arc.total / 34));
  const holeSpacing = arc.total / holeCount;
  const along = HALF - SPROCKET / 2;
  const holes: Hole[] = Array.from({ length: holeCount }, (_, index) => {
    const x = xAtArc((index + 0.5) * holeSpacing, arc);
    const point = curve(x, cycles);
    const angle = (Math.atan2(point.slope, 1) * 180) / Math.PI;
    return [-along, along].map((dist) => {
      const center = edgePoint(x, dist, cycles);
      return { x: center.x, y: center.y, angle };
    });
  }).flat();
  const edgeYs = [...outerTop, ...outerBottom].map((point) => point.y);
  const viewPad = 8;
  const viewY = Math.min(...edgeYs) - viewPad;
  const viewH = Math.max(...edgeYs) - Math.min(...edgeYs) + viewPad * 2;

  const placeAt = (distance: number) => {
    const x = xAtArc(distance, arc);
    const point = curve(x, cycles);
    return { x: point.x, y: point.y, angle: Math.atan2(point.slope, 1) };
  };

  return {
    cycles,
    bodyPath: `${line(outerTop)}${line([...outerBottom].reverse()).replace(/^M/, "L")}Z`,
    railPath: `${line(outerTop)}${line(outerBottom)}${line(band(PHOTO_EDGE))}${line(band(-PHOTO_EDGE))}`,
    photoBand: `${line(photoTop)}${line([...photoBottom].reverse()).replace(/^M/, "L")}Z`,
    holes,
    viewY,
    viewH,
    imageW: frameArc - FRAME_GAP,
    imageH: PHOTO_THICKNESS + 18,
    arcTotal: arc.total,
    frameArc,
    placeAt,
  };
}

function coverSource(image: HTMLImageElement, imageW: number, imageH: number) {
  const target = imageW / imageH;
  const aspect = image.naturalWidth / image.naturalHeight;
  if (aspect > target) {
    const sh = image.naturalHeight;
    const sw = sh * target;
    return { sx: (image.naturalWidth - sw) / 2, sy: 0, sw, sh };
  }
  const sw = image.naturalWidth;
  const sh = sw / target;
  return { sx: 0, sy: (image.naturalHeight - sh) / 2, sw, sh };
}

const DESKTOP_REEL = buildReel(DESKTOP_CYCLES);

function cyclesFor(stageWidth: number, visibleW: number) {
  if (stageWidth >= 640) return DESKTOP_CYCLES;
  const wavesAcross = 1.15;
  const next = (wavesAcross * REEL_W) / Math.max(visibleW, FRAME_W * 2);
  return Math.round(Math.min(12, Math.max(4, next)) * 10) / 10;
}

export function FilmStrip({ isPaused }: FilmStripProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const distanceRef = useRef(0);
  const reelRef = useRef(DESKTOP_REEL);
  const visibleWRef = useRef(FRAME_W * 6);
  const drawRef = useRef<() => void>(() => {});
  const [visibleW, setVisibleW] = useState(FRAME_W * 6);
  const [reel, setReel] = useState(DESKTOP_REEL);
  const [reduceMotion, setReduceMotion] = useState(false);

  const drawPhotos = () => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const dpr = window.devicePixelRatio || 1;
    const { width, height } = stage.getBoundingClientRect();
    const pixelW = Math.max(1, Math.round(width * dpr));
    const pixelH = Math.max(1, Math.round(height * dpr));
    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
    }

    const current = reelRef.current;
    const viewW = visibleWRef.current;
    const viewX = (REEL_W - viewW) / 2;
    const scale = Math.max(pixelW / viewW, pixelH / current.viewH);
    const originX = (pixelW - viewW * scale) / 2 - viewX * scale;
    const originY = (pixelH - current.viewH * scale) / 2 - current.viewY * scale;
    const pxPerUnit = scale / dpr;
    const column = Math.max(1.5, 1.35 / pxPerUnit);
    const overlap = 0.75 / pxPerUnit;
    const shift = distanceRef.current;

    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, pixelW, pixelH);
    context.save();
    context.setTransform(scale, 0, 0, scale, originX, originY);
    context.clip(new Path2D(current.photoBand));

    FILM_FRAMES.forEach((_, frameIndex) => {
      const image = imagesRef.current[frameIndex];
      if (!image || !image.complete || image.naturalWidth === 0) return;
      const start = frameIndex * current.frameArc + FRAME_GAP / 2 + shift;
      const cover = coverSource(image, current.imageW, current.imageH);
      const count = Math.max(8, Math.ceil(current.imageW / column));
      const step = current.imageW / count;
      const srcStep = cover.sw / count;
      const colW = step + overlap;

      for (let index = 0; index < count; index += 1) {
        const place = current.placeAt(start + (index + 0.5) * step);
        if (place.x < viewX - 48 || place.x > viewX + viewW + 48) continue;
        context.save();
        context.translate(place.x, place.y);
        context.rotate(place.angle);
        context.drawImage(
          image,
          cover.sx + index * srcStep,
          cover.sy,
          srcStep,
          cover.sh,
          -colW / 2,
          -current.imageH / 2,
          colW,
          current.imageH,
        );
        context.restore();
      }
    });

    context.restore();
  };
  drawRef.current = drawPhotos;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const fit = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (height < 1 || width < 1) return;
      const fitted = (width / height) * reelRef.current.viewH;
      const maxVisible = REEL_W - FRAME_W * 2;
      const nextVisible = Math.max(FRAME_W * 2, Math.min(fitted, maxVisible));
      visibleWRef.current = nextVisible;
      setVisibleW(nextVisible);

      const cycles = cyclesFor(width, nextVisible);
      if (Math.abs(cycles - reelRef.current.cycles) > 0.05) {
        const next = buildReel(cycles);
        reelRef.current = next;
        setReel(next);
      }
      drawRef.current();
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    imagesRef.current = FILM_FRAMES.map((frame) => {
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        if (alive) drawRef.current();
      };
      image.src = frame.src;
      return image;
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    drawRef.current();
    if (!stage || isPaused || reduceMotion) return;

    let frame = 0;
    let previous: number | null = null;
    let running = false;

    const stop = () => {
      running = false;
      previous = null;
      window.cancelAnimationFrame(frame);
    };

    const tick = (now: number) => {
      if (!running) return;
      if (previous != null) {
        distanceRef.current += (Math.min(now - previous, 48) / LOOP_MS) * reelRef.current.arcTotal;
      }
      previous = now;
      drawRef.current();
      frame = window.requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (running) return;
        running = true;
        previous = null;
        frame = window.requestAnimationFrame(tick);
        return;
      }
      stop();
    });
    observer.observe(stage);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [isPaused, reduceMotion, reel, visibleW]);

  const viewX = (REEL_W - visibleW) / 2;
  const viewBox = `${num(viewX)} ${num(reel.viewY)} ${num(visibleW)} ${num(reel.viewH)}`;

  return (
    <div ref={stageRef} className="film-strip relative h-full min-h-0 w-full overflow-hidden">
      <svg className="film-reel" viewBox={viewBox} preserveAspectRatio="xMidYMid slice" role="img" aria-label="Thước phim kỷ niệm">
        <path d={reel.bodyPath} fill="#161311" />
      </svg>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
      <svg className="film-reel pointer-events-none absolute inset-0" viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden>
        <path
          d={reel.railPath}
          fill="none"
          stroke="rgba(185,154,99,0.72)"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
        {reel.holes.map((hole, index) => (
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
      </svg>
    </div>
  );
}
