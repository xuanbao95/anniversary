"use client";

import { type ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { CHAPTER_TWO } from "@/data/anniversaryData";
import { ChapterTitle } from "./chapter-title";
import { ChapterFooter, FilmScreen, usePrefersReducedMotion } from "./film-screen";
import { MemoryScene, segment } from "./memory-scene";
import { ParallaxPhoto } from "./parallax-photo";
import { PolaroidPhoto } from "./polaroid-photo";
import { ScrollProgress } from "./scroll-progress";

const chapter = CHAPTER_TWO;
const LOOP_SECONDS = 260;
const LINE_FADE = 0.4;
const LINE_CLEAR = 1.6;
const LINE_STEP = LINE_FADE + LINE_CLEAR;
const LINE_SPAN = LINE_STEP + LINE_FADE;

function at(seconds: number) {
  return seconds / LOOP_SECONDS;
}

function schedule(start: number, count: number) {
  const linesAt = start + 1.2;
  const punchAt = linesAt + count * LINE_STEP;
  const end = punchAt + 3.2;
  return { start, end, linesAt, punchAt };
}

const somewhereBeat = schedule(0, 7);
const datesBeat = schedule(somewhereBeat.end - 1.6, 8);
const tripsBeat = schedule(datesBeat.end - 1.6, 9);
const dinnerBeat = schedule(tripsBeat.end - 1.6, 10);
const moviesBeat = schedule(dinnerBeat.end - 1.6, 12);
const imperfectBeat = schedule(moviesBeat.end - 1.6, 12);
const stayedBeat = schedule(imperfectBeat.end - 1.6, 9);
const learningBeat = schedule(stayedBeat.end - 1.6, 8);
const memoriesBeat = schedule(learningBeat.end - 1.6, 6);
const somehowBeat = schedule(memoriesBeat.end - 1.6, 12);

function fadeOf(start: number, end: number) {
  const span = Math.max(end - start, 0.4);
  return {
    fadeIn: Math.min(0.4, 0.55 / span),
    fadeOut: Math.max(0.5, 1 - 1.6 / span),
    wipe: Math.min(0.45, 0.85 / span),
  };
}

function StoryBackdrop({ progress }: { progress: MotionValue<number> }) {
  const travel = useTransform(progress, (value) =>
    segment(value, [at(tripsBeat.start), at(tripsBeat.start + 2), at(tripsBeat.end - 2), at(tripsBeat.end)], [0, 1, 1, 0]),
  );
  const night = useTransform(progress, (value) =>
    segment(
      value,
      [at(moviesBeat.start), at(moviesBeat.start + 2), at(imperfectBeat.end - 2), at(imperfectBeat.end)],
      [0, 1, 1, 0],
    ),
  );
  const paper = useTransform(progress, (value) =>
    segment(
      value,
      [
        0,
        at(tripsBeat.start),
        at(tripsBeat.start + 2.4),
        at(tripsBeat.end - 1),
        at(dinnerBeat.start + 1),
        at(moviesBeat.start),
        at(moviesBeat.start + 2.4),
        at(imperfectBeat.end - 1),
        at(stayedBeat.start + 1),
        at(somehowBeat.start),
        at(somehowBeat.start + 3),
      ],
      [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
    ),
  );
  const blackout = useTransform(progress, (value) =>
    segment(value, [at(somehowBeat.start + 2), at(somehowBeat.start + 6)], [0, 1]),
  );
  const leak = useTransform(progress, (value) =>
    segment(value, [at(moviesBeat.start + 1), at(moviesBeat.start + 4), at(moviesBeat.end - 4), at(moviesBeat.end)], [0, 0.55, 0.28, 0]),
  );
  const grain = useTransform(progress, (value) =>
    segment(value, [0, at(moviesBeat.start), at(moviesBeat.start + 3), at(stayedBeat.start), 1], [0.16, 0.16, 0.3, 0.18, 0.26]),
  );

  return (
    <>
      <div className="absolute inset-0 bg-[#F6F0E8]" />
      <motion.div style={{ opacity: paper }} className="story-paper absolute inset-0" />
      <motion.div style={{ opacity: travel }} className="absolute inset-0 bg-[#241C18]" />
      <motion.div
        style={{ opacity: travel }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,154,99,0.22),transparent_62%)]"
      />
      <motion.div style={{ opacity: night }} className="absolute inset-0 bg-[#0F0E0D]" />
      <motion.div
        style={{ opacity: leak }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_18%,rgba(201,149,145,0.34),transparent_46%),radial-gradient(ellipse_at_18%_82%,rgba(185,154,99,0.18),transparent_42%)]"
      />
      <motion.div style={{ opacity: blackout }} className="absolute inset-0 bg-black" />
      <motion.svg aria-hidden style={{ opacity: grain }} className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay">
        <filter id="story-grain-02">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#story-grain-02)" />
      </motion.svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.28)_100%)]" />
    </>
  );
}

function TimedCopy({
  progress,
  start,
  end,
  tone = "ink",
  variant = "body",
  className = "",
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  tone?: "ink" | "mist";
  variant?: "body" | "hand" | "aside";
  className?: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, (value) => {
    const time = value * LOOP_SECONDS;
    return segment(time, [start, start + LINE_FADE, Math.max(start + LINE_FADE, end - LINE_FADE), end], [0, 1, 1, 0]);
  });
  const y = useTransform(opacity, (value) => (1 - value) * 12);
  const look =
    variant === "hand"
      ? "font-[family-name:var(--font-script)] text-[clamp(26px,4vw,40px)] leading-snug"
      : variant === "aside"
        ? "font-[family-name:var(--font-serif)] text-[clamp(15px,1.8vw,20px)] leading-relaxed"
        : "font-[family-name:var(--font-body)] text-[clamp(15px,2.1vw,20px)] font-light leading-relaxed";
  const color = tone === "mist" ? "text-[#F7F0E8]" : "text-[#332B27]";

  return (
    <motion.p style={{ opacity, y }} className={`max-w-xl ${look} ${color} ${className}`}>
      {children}
    </motion.p>
  );
}

function LineReel({
  progress,
  lines,
  start,
  tone = "ink",
}: {
  progress: MotionValue<number>;
  lines: string[];
  start: number;
  tone?: "ink" | "mist";
}) {
  return (
    <div className="relative mt-3 h-16 w-full max-w-xl overflow-hidden sm:h-20">
      {lines.map((line, index) => {
        const lineStart = start + index * LINE_STEP;
        return (
          <TimedCopy
            key={`${index}-${line}`}
            progress={progress}
            start={lineStart}
            end={lineStart + LINE_SPAN}
            tone={tone}
            className="absolute inset-x-0 top-0"
          >
            {line}
          </TimedCopy>
        );
      })}
    </div>
  );
}

function beatRange(start: number, end: number): [number, number] {
  return [at(start), at(end)];
}

function photoRange(start: number): [number, number] {
  return [at(start + 0.45), at(start + 2.1)];
}

function PunchLines({
  progress,
  lines,
  start,
  end,
  tone = "ink",
  className = "",
}: {
  progress: MotionValue<number>;
  lines: string[];
  start: number;
  end: number;
  tone?: "ink" | "mist";
  className?: string;
}) {
  return (
    <div className="mt-2 flex flex-col items-center">
      {lines.map((line, index) => (
        <TimedCopy
          key={line}
          progress={progress}
          start={start + index * 0.85}
          end={end}
          tone={tone}
          variant="hand"
          className={className}
        >
          {line}
        </TimedCopy>
      ))}
    </div>
  );
}

function SomewhereScene({ progress }: { progress: MotionValue<number> }) {
  const { somewhere } = chapter;
  const beat = somewhereBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  const titleAt = 4.4;
  const titleFade = fadeOf(titleAt, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <div className="relative h-52 w-full sm:h-60">
          <ChapterTitle
            progress={progress}
            range={[at(0.2), at(5.6)]}
            fadeIn={0.1}
            fadeOut={0.88}
            wipe={0.16}
            kicker={chapter.id}
            className="absolute inset-x-0 top-0"
          >
            {chapter.title}
          </ChapterTitle>
          <ChapterTitle
            progress={progress}
            range={beatRange(titleAt, beat.end)}
            fadeIn={titleFade.fadeIn}
            fadeOut={titleFade.fadeOut}
            wipe={titleFade.wipe}
            className="absolute inset-x-0 top-0"
          >
            {somewhere.title}
          </ChapterTitle>
        </div>
        <ParallaxPhoto
          photo={somewhere.photo}
          progress={progress}
          range={photoRange(beat.start)}
          shift={0}
          className="mt-2 w-full max-w-sm"
          frameClassName="aspect-[16/10] max-h-[22vh]"
        />
        <LineReel progress={progress} lines={somewhere.lines} start={beat.linesAt} />
        <PunchLines progress={progress} lines={[somewhere.punch]} start={beat.punchAt} end={beat.end} className="mt-2 text-[#6E5344]" />
      </div>
    </MemoryScene>
  );
}

function DatesScene({ progress }: { progress: MotionValue<number> }) {
  const { dates } = chapter;
  const beat = datesBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe}>
          {dates.title}
        </ChapterTitle>
        <div className="mt-4 flex items-end justify-center gap-2 sm:gap-5">
          {dates.photos.map((photo, index) => (
            <PolaroidPhoto
              key={photo.src}
              photo={photo}
              progress={progress}
              range={photoRange(beat.start + index * 0.35)}
              drift={10}
              compact
              className={index === 1 ? "mb-3" : ""}
            />
          ))}
        </div>
        <LineReel progress={progress} lines={dates.lines} start={beat.linesAt} />
        <PunchLines progress={progress} lines={[dates.punch]} start={beat.punchAt} end={beat.end} className="text-[#6E5344]" />
      </div>
    </MemoryScene>
  );
}

function TripsScene({ progress }: { progress: MotionValue<number> }) {
  const { trips } = chapter;
  const beat = tripsBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-8">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe} tone="mist">
          {trips.title}
        </ChapterTitle>
        <div className="mt-4 grid w-full grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4">
          {trips.photos.map((photo, index) => (
            <ParallaxPhoto
              key={photo.src}
              photo={photo}
              progress={progress}
              range={photoRange(beat.start + index * 0.28)}
              shift={index % 2 === 0 ? 14 : -14}
              frameClassName="aspect-[3/4] max-h-[18vh] sm:max-h-[28vh]"
            />
          ))}
        </div>
        <LineReel progress={progress} lines={trips.lines} start={beat.linesAt} tone="mist" />
        <PunchLines progress={progress} lines={[trips.punch]} start={beat.punchAt} end={beat.end} tone="mist" className="text-[#E7D3C4]" />
      </div>
    </MemoryScene>
  );
}

function DinnerScene({ progress }: { progress: MotionValue<number> }) {
  const { dinner } = chapter;
  const beat = dinnerBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe}>
          {dinner.title}
        </ChapterTitle>
        <ParallaxPhoto
          photo={dinner.photo}
          progress={progress}
          range={photoRange(beat.start)}
          shift={0}
          className="mt-3 w-full max-w-sm"
          frameClassName="aspect-[16/10] max-h-[20vh]"
        />
        <LineReel progress={progress} lines={dinner.lines} start={beat.linesAt} />
        <PunchLines progress={progress} lines={dinner.punch} start={beat.punchAt} end={beat.end} className="text-[#6E5344]" />
      </div>
    </MemoryScene>
  );
}

function MoviesScene({ progress }: { progress: MotionValue<number> }) {
  const { movies } = chapter;
  const beat = moviesBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe} tone="mist">
          {movies.title}
        </ChapterTitle>
        <ParallaxPhoto
          photo={movies.photo}
          progress={progress}
          range={photoRange(beat.start)}
          shift={0}
          className="mt-3 w-full max-w-md"
          frameClassName="aspect-[16/9] max-h-[22vh]"
        />
        <LineReel progress={progress} lines={movies.lines} start={beat.linesAt} tone="mist" />
        <PunchLines progress={progress} lines={[movies.punch]} start={beat.punchAt} end={beat.end} tone="mist" className="text-[#F0D7CC]" />
      </div>
    </MemoryScene>
  );
}

function ImperfectScene({ progress }: { progress: MotionValue<number> }) {
  const { imperfect } = chapter;
  const beat = imperfectBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe} tone="mist">
          {imperfect.title}
        </ChapterTitle>
        <ParallaxPhoto
          photo={imperfect.photo}
          progress={progress}
          range={photoRange(beat.start)}
          shift={0}
          className="mt-3 w-full max-w-xs"
          frameClassName="aspect-[4/5] max-h-[18vh]"
        />
        <LineReel progress={progress} lines={imperfect.lines} start={beat.linesAt} tone="mist" />
        <PunchLines
          progress={progress}
          lines={[imperfect.question]}
          start={beat.punchAt}
          end={beat.end}
          tone="mist"
          className="text-[#F3E6D0]"
        />
      </div>
    </MemoryScene>
  );
}

function StayedScene({ progress }: { progress: MotionValue<number> }) {
  const { stayed } = chapter;
  const beat = stayedBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe}>
          {stayed.title}
        </ChapterTitle>
        <ParallaxPhoto
          photo={stayed.photo}
          progress={progress}
          range={photoRange(beat.start)}
          shift={0}
          className="mt-3 w-full max-w-sm"
          frameClassName="aspect-[16/10] max-h-[18vh]"
        />
        <LineReel progress={progress} lines={stayed.lines} start={beat.linesAt} />
        <PunchLines progress={progress} lines={stayed.holds} start={beat.punchAt} end={beat.end} className="text-[#332B27]" />
      </div>
    </MemoryScene>
  );
}

function LearningScene({ progress }: { progress: MotionValue<number> }) {
  const { learning } = chapter;
  const beat = learningBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe}>
          {learning.title}
        </ChapterTitle>
        <ParallaxPhoto
          photo={learning.photo}
          progress={progress}
          range={photoRange(beat.start)}
          shift={0}
          className="mt-3 w-full max-w-sm"
          frameClassName="aspect-[16/10] max-h-[18vh]"
        />
        <LineReel progress={progress} lines={learning.lines} start={beat.linesAt} />
        <PunchLines progress={progress} lines={[learning.punch]} start={beat.punchAt} end={beat.end} className="text-[#6E5344]" />
      </div>
    </MemoryScene>
  );
}

function MemoriesScene({ progress }: { progress: MotionValue<number> }) {
  const { memories } = chapter;
  const beat = memoriesBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center px-4 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe}>
          {memories.title}
        </ChapterTitle>
        <div className="mt-3 flex items-end justify-center gap-2 sm:gap-5">
          {memories.photos.map((photo, index) => (
            <PolaroidPhoto
              key={photo.src}
              photo={photo}
              progress={progress}
              range={photoRange(beat.start + index * 0.35)}
              drift={8}
              compact
              className={index === 1 ? "mb-2" : ""}
            />
          ))}
        </div>
        <LineReel progress={progress} lines={memories.lines} start={beat.linesAt} />
        <PunchLines progress={progress} lines={memories.punches} start={beat.punchAt} end={beat.end} className="text-[#332B27]" />
      </div>
    </MemoryScene>
  );
}

function SomehowScene({ progress }: { progress: MotionValue<number> }) {
  const { somehow } = chapter;
  const beat = somehowBeat;
  const fade = fadeOf(beat.start, beat.end);
  const range = beatRange(beat.start, beat.end);
  return (
    <MemoryScene progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut}>
      <div className="flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <ChapterTitle progress={progress} range={range} fadeIn={fade.fadeIn} fadeOut={fade.fadeOut} wipe={fade.wipe} tone="mist">
          {somehow.title}
        </ChapterTitle>
        <LineReel progress={progress} lines={somehow.lines} start={beat.linesAt} tone="mist" />
        <PunchLines progress={progress} lines={somehow.punch} start={beat.punchAt} end={beat.end} tone="mist" className="text-[#F3E6D0]" />
      </div>
    </MemoryScene>
  );
}

function EndCardScene({ progress }: { progress: MotionValue<number> }) {
  const { somehow } = chapter;
  const cardAt = somehowBeat.end - 0.6;
  const fade = fadeOf(cardAt, LOOP_SECONDS);
  const shown = useTransform(progress, (value) => {
    const time = value * LOOP_SECONDS;
    return segment(time, [cardAt + 1.2, cardAt + 1.8, LOOP_SECONDS + 1], [0, 1, 1]);
  });
  return (
    <MemoryScene progress={progress} range={[at(cardAt), 1]} hold fadeIn={fade.fadeIn}>
      <div className="flex w-full max-w-2xl flex-col items-center px-6 text-center">
        {somehow.quotes.map((line, index) => (
          <TimedCopy
            key={line}
            progress={progress}
            start={cardAt + 0.5 + index * 0.8}
            end={LOOP_SECONDS + 1}
            variant="aside"
            tone="mist"
            className="text-[#E7D7CC]"
          >
            {line}
          </TimedCopy>
        ))}
        <motion.div style={{ opacity: shown }} className="mt-8 text-center">
          <div className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.32em] text-[#B99A63]">
            {chapter.id} → {chapter.nextId}
          </div>
          <p className="mt-2 font-[family-name:var(--font-serif)] text-[clamp(16px,2.4vw,22px)] text-[#F7F0E8]">
            {chapter.title} → {chapter.nextTitle}
          </p>
        </motion.div>
      </div>
    </MemoryScene>
  );
}

function ChapterTwoReel({ progress }: { progress: MotionValue<number> }) {
  const cameraScale = useTransform(progress, (value) => segment(value, [0, 0.5, 0.72, 1], [1.012, 1, 1.02, 1]));
  const cameraY = useTransform(progress, (value) => segment(value, [0, 0.7, 1], [0, -8, 0]));

  return (
    <>
      <StoryBackdrop progress={progress} />
      <ScrollProgress progress={progress} />
      <motion.div style={{ scale: cameraScale, y: cameraY }} className="absolute inset-x-0 top-0 bottom-16">
        <SomewhereScene progress={progress} />
        <DatesScene progress={progress} />
        <TripsScene progress={progress} />
        <DinnerScene progress={progress} />
        <MoviesScene progress={progress} />
        <ImperfectScene progress={progress} />
        <StayedScene progress={progress} />
        <LearningScene progress={progress} />
        <MemoriesScene progress={progress} />
        <SomehowScene progress={progress} />
        <EndCardScene progress={progress} />
      </motion.div>
    </>
  );
}

function MemoryFilmTwoPlayhead() {
  return (
    <FilmScreen
      chapterId={chapter.id}
      label="Chương 02, Falling in Love"
      duration={LOOP_SECONDS}
      cue={chapter.cue}
      top={chapter.top}
    >
      {(progress) => <ChapterTwoReel progress={progress} />}
    </FilmScreen>
  );
}

function StaticBeat({
  title,
  lines,
  closing,
  photos,
  dark = false,
}: {
  title: string;
  lines: string[];
  closing?: string[];
  photos?: { src: string; alt: string }[];
  dark?: boolean;
}) {
  return (
    <section
      className={`flex min-h-dvh flex-col items-center justify-center px-5 py-16 text-center ${dark ? "bg-[#0F0E0D] text-[#F7F0E8]" : "story-paper text-[#332B27]"}`}
    >
      <h2 className="font-[family-name:var(--font-serif)] text-[clamp(36px,6vw,72px)] leading-[1.35]">{title}</h2>
      {photos && photos.length > 1 ? (
        <div className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} className="aspect-[3/4] w-full object-cover" />
          ))}
        </div>
      ) : null}
      {photos && photos.length === 1 ? (
        <img src={photos[0].src} alt={photos[0].alt} className="mt-8 aspect-[16/10] w-full max-w-md object-cover" />
      ) : null}
      {lines.map((line) => (
        <p key={line} className="mt-3 max-w-xl text-lg font-light">
          {line}
        </p>
      ))}
      {closing?.map((line) => (
        <p key={line} className="mt-3 font-[family-name:var(--font-script)] text-3xl">
          {line}
        </p>
      ))}
    </section>
  );
}

function MemoryFilmTwoStatic() {
  const { somewhere, dates, trips, dinner, movies, imperfect, stayed, learning, memories, somehow } = chapter;
  return (
    <article id="chapter-02" aria-label="Chương 02, Falling in Love" className="bg-[#F6F0E8] text-[#332B27]">
      <StaticBeat title={chapter.title} lines={[]} />
      <StaticBeat title={somewhere.title} lines={somewhere.lines} closing={[somewhere.punch]} photos={[somewhere.photo]} />
      <StaticBeat title={dates.title} lines={dates.lines} closing={[dates.punch]} photos={dates.photos} />
      <StaticBeat title={trips.title} lines={trips.lines} closing={[trips.punch]} photos={trips.photos} dark />
      <StaticBeat title={dinner.title} lines={dinner.lines} closing={dinner.punch} photos={[dinner.photo]} />
      <StaticBeat title={movies.title} lines={movies.lines} closing={[movies.punch]} photos={[movies.photo]} dark />
      <StaticBeat title={imperfect.title} lines={imperfect.lines} closing={[imperfect.question]} photos={[imperfect.photo]} dark />
      <StaticBeat title={stayed.title} lines={stayed.lines} closing={stayed.holds} photos={[stayed.photo]} />
      <StaticBeat title={learning.title} lines={learning.lines} closing={[learning.punch]} photos={[learning.photo]} />
      <StaticBeat title={memories.title} lines={memories.lines} closing={memories.punches} photos={memories.photos} />
      <section className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 py-16 text-center text-[#F7F0E8]">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(36px,6vw,72px)] leading-[1.35]">{somehow.title}</h2>
        {somehow.lines.map((line) => (
          <p key={line} className="mt-3 max-w-xl text-lg font-light">
            {line}
          </p>
        ))}
        {somehow.punch.map((line) => (
          <p key={line} className="mt-3 font-[family-name:var(--font-script)] text-3xl text-[#F3E6D0]">
            {line}
          </p>
        ))}
        {somehow.quotes.map((line) => (
          <p key={line} className="mt-4 font-[family-name:var(--font-serif)] text-xl text-[#E7D7CC]">
            {line}
          </p>
        ))}
        <p className="mt-10 text-[11px] tracking-[0.32em] text-[#B99A63]">
          {chapter.id} → {chapter.nextId}
        </p>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-xl">
          {chapter.title} → {chapter.nextTitle}
        </p>
      </section>
      <ChapterFooter chapterId={chapter.id} cue={chapter.cue} top={chapter.top} />
    </article>
  );
}

export function MemoryFilmTwo() {
  const reduceMotion = usePrefersReducedMotion();
  if (reduceMotion) return <MemoryFilmTwoStatic />;
  return <MemoryFilmTwoPlayhead />;
}
