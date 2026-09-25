"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { CHAPTER_ONE } from "@/data/anniversaryData";
import { ChapterTitle } from "./chapter-title";
import { CinematicText } from "./cinematic-text";
import { ChapterFooter, FilmScreen, usePrefersReducedMotion } from "./film-screen";
import { MemoryScene, segment } from "./memory-scene";
import { ParallaxPhoto } from "./parallax-photo";
import { PolaroidPhoto } from "./polaroid-photo";
import { ScrollProgress } from "./scroll-progress";

const chapter = CHAPTER_ONE;
const LOOP_SECONDS = 32;

function StoryBackdrop({ progress }: { progress: MotionValue<number> }) {
  const travel = useTransform(progress, (value) => segment(value, [0.28, 0.38, 0.46, 0.54], [0, 1, 1, 0]));
  const night = useTransform(progress, (value) => segment(value, [0.44, 0.54, 0.74, 0.86], [0, 1, 1, 0]));
  const paper = useTransform(progress, (value) => segment(value, [0, 0.3, 0.46, 0.72, 0.84, 0.93], [1, 1, 0, 0, 1, 0]));
  const blackout = useTransform(progress, (value) => segment(value, [0.88, 0.97], [0, 1]));
  const leak = useTransform(progress, (value) => segment(value, [0.6, 0.68, 0.76, 0.84], [0, 0.7, 0.45, 0]));
  const grain = useTransform(progress, (value) => segment(value, [0, 0.46, 0.6, 0.86, 1], [0.18, 0.18, 0.32, 0.2, 0.28]));

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
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,149,145,0.38),transparent_46%),radial-gradient(ellipse_at_20%_80%,rgba(185,154,99,0.2),transparent_42%)]"
      />
      <motion.div style={{ opacity: blackout }} className="absolute inset-0 bg-black" />
      <motion.svg
        aria-hidden
        style={{ opacity: grain }}
        className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
      >
        <filter id="story-grain-01">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#story-grain-01)" />
      </motion.svg>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.28)_100%)]" />
    </>
  );
}

function ChapterOneReel({ progress }: { progress: MotionValue<number> }) {
  const cameraScale = useTransform(progress, (value) => segment(value, [0, 0.55, 0.7, 1], [1.015, 1, 1.03, 1]));
  const cameraY = useTransform(progress, (value) => segment(value, [0, 0.7, 1], [0, -12, 0]));

  return (
    <>
      <StoryBackdrop progress={progress} />
      <ScrollProgress progress={progress} />
      <motion.div style={{ scale: cameraScale, y: cameraY }} className="absolute inset-x-0 top-0 bottom-16">
        <NoticeScene progress={progress} />
        <OrdinaryScene progress={progress} />
        <TripScene progress={progress} />
        <BusScene progress={progress} />
        <MomentScene progress={progress} />
        <RealizationScene progress={progress} />
        <EndingScene progress={progress} />
      </motion.div>
    </>
  );
}

function MemoryFilmPlayhead() {
  return (
    <FilmScreen
      chapterId={chapter.id}
      label="Chương 01, Ngày anh để ý em"
      duration={LOOP_SECONDS}
      cue={chapter.ending.cue}
      top={chapter.ending.top}
    >
      {(progress) => <ChapterOneReel progress={progress} />}
    </FilmScreen>
  );
}

function NoticeScene({ progress }: { progress: MotionValue<number> }) {
  const { notice } = chapter;
  return (
    <MemoryScene progress={progress} range={[0, 0.18]}>
      <div className="flex w-full max-w-3xl flex-col items-center px-5 text-center">
        <ChapterTitle progress={progress} range={[0.01, 0.16]} hold kicker={notice.kicker}>
          {notice.title}
        </ChapterTitle>
        <CinematicText progress={progress} range={[0.03, 0.17]} hold variant="aside" className="mt-4 text-[#8C7354]">
          {notice.subtitle}
        </CinematicText>
        <ParallaxPhoto
          photo={notice.photo}
          progress={progress}
          range={[0.045, 0.2]}
          shift={10}
          className="mt-6 w-full max-w-md"
          frameClassName="aspect-[16/10] max-h-[30vh] sm:aspect-[16/9]"
        />
        <CinematicText progress={progress} range={[0.08, 0.18]} hold className="mt-5">
          {notice.coworker}
        </CinematicText>
        <CinematicText progress={progress} range={[0.11, 0.185]} hold variant="hand" className="mt-2 text-[#6E5344]">
          {notice.impression}
        </CinematicText>
      </div>
    </MemoryScene>
  );
}

function OrdinaryScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <MemoryScene progress={progress} range={[0.14, 0.34]}>
      <div className="flex w-full max-w-4xl items-start justify-center gap-2 px-3 pt-6 sm:gap-8 sm:px-8">
        {chapter.ordinary.photos.map((photo, index) => (
          <PolaroidPhoto
            key={photo.src}
            photo={photo}
            progress={progress}
            range={[0.16 + index * 0.025, 0.34]}
            drift={index === 1 ? 10 : 22}
            className={index === 1 ? "mt-8 sm:mt-14" : "mt-0"}
          />
        ))}
      </div>
    </MemoryScene>
  );
}

function TripScene({ progress }: { progress: MotionValue<number> }) {
  const { trip } = chapter;
  return (
    <MemoryScene progress={progress} range={[0.3, 0.5]}>
      <div className="flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-8">
        <CinematicText progress={progress} range={[0.31, 0.48]} hold variant="whisper" tone="mist" className="text-[#B99A63]">
          {trip.period}
        </CinematicText>
        <ChapterTitle progress={progress} range={[0.32, 0.48]} hold tone="mist" className="mt-2">
          {trip.title}
        </ChapterTitle>
        <CinematicText progress={progress} range={[0.35, 0.49]} hold variant="hand" tone="mist" className="mt-3 text-[#E7D3C4]">
          {trip.subtitle}
        </CinematicText>
        <div className="mt-6 grid w-full grid-cols-2 gap-2 sm:mt-8 sm:grid-cols-4 sm:gap-4">
          {trip.photos.map((photo, index) => (
            <ParallaxPhoto
              key={photo.src}
              photo={photo}
              progress={progress}
              range={[0.34 + index * 0.028, 0.5]}
              shift={index % 2 === 0 ? 16 : -16}
              frameClassName="aspect-[3/4] max-h-[22vh] sm:max-h-[34vh]"
            />
          ))}
        </div>
      </div>
    </MemoryScene>
  );
}

function BusScene({ progress }: { progress: MotionValue<number> }) {
  const { bus } = chapter;
  return (
    <MemoryScene progress={progress} range={[0.46, 0.64]}>
      <div className="grid w-full max-w-5xl items-center gap-6 px-5 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:px-10">
        <div className="relative mx-auto h-[32vh] w-full max-w-md overflow-hidden bg-[#120f0d] md:h-[46vh]">
          <img
            src={bus.window.src}
            alt=""
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-[2px]"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="pointer-events-none absolute inset-[7%] rounded-[1.5rem] border border-white/20" />
          <ParallaxPhoto
            photo={bus.photo}
            progress={progress}
            range={[0.5, 0.64]}
            shift={8}
            className="absolute inset-x-[14%] top-[16%] bottom-[14%]"
            frameClassName="h-full shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
          />
        </div>
        <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
          {bus.lines.map((line, index) => (
            <CinematicText
              key={line}
              progress={progress}
              range={[0.49 + index * 0.04, 0.64]}
              hold
              variant={index === bus.lines.length - 1 ? "hand" : "body"}
              tone="mist"
              className={index === bus.lines.length - 1 ? "text-[#F0D7CC]" : ""}
            >
              {line}
            </CinematicText>
          ))}
        </div>
      </div>
    </MemoryScene>
  );
}

function MomentScene({ progress }: { progress: MotionValue<number> }) {
  const { moment } = chapter;
  const scale = useTransform(progress, (value) => segment(value, [0.6, 0.78], [1.06, 1]));
  const clarity = useTransform(progress, (value) => segment(value, [0.6, 0.68], [8, 0]));
  const filter = useTransform(clarity, (value) => `blur(${value}px)`);

  return (
    <MemoryScene progress={progress} range={[0.6, 0.78]}>
      <div className="flex w-full max-w-xl flex-col items-center px-5 text-center">
        <div className="w-full overflow-hidden">
          <motion.figure style={{ scale, filter }} className="w-full">
            <img
              src={moment.photo.src}
              alt={moment.photo.alt}
              className="aspect-[4/5] max-h-[38vh] w-full object-cover sm:aspect-[16/11] sm:max-h-[42vh]"
            />
          </motion.figure>
        </div>
        <div className="relative mt-8 h-24 w-full overflow-hidden sm:h-28">
          {moment.lines.map((line, index) => (
            <CinematicText
              key={line}
              progress={progress}
              range={[0.63 + index * 0.032, 0.63 + index * 0.032 + 0.05]}
              hold={index === moment.lines.length - 1}
              variant={index === moment.lines.length - 1 ? "hand" : "body"}
              tone="mist"
              className="absolute inset-x-0 top-0"
            >
              {line}
            </CinematicText>
          ))}
        </div>
      </div>
    </MemoryScene>
  );
}

function RealizationScene({ progress }: { progress: MotionValue<number> }) {
  const { realization } = chapter;
  return (
    <MemoryScene progress={progress} range={[0.74, 0.88]}>
      <div className="flex h-full w-full max-w-4xl flex-col items-center justify-center px-4 py-8 text-center">
        <div className="mb-6 flex items-end justify-center gap-2 sm:mb-8 sm:gap-5">
          {realization.photos.map((photo, index) => (
            <PolaroidPhoto
              key={photo.src}
              photo={photo}
              progress={progress}
              range={[0.75 + index * 0.015, 0.88]}
              drift={12}
              compact
              className={index === 1 ? "mb-3" : ""}
            />
          ))}
        </div>
        <CinematicText progress={progress} range={[0.76, 0.87]} hold className="max-w-lg">
          {realization.lead}
        </CinematicText>
        <div className="relative mt-4 h-14 w-full overflow-hidden">
          {realization.lines.map((line, index) => (
            <CinematicText
              key={line}
              progress={progress}
              range={[0.785 + index * 0.02, 0.8 + index * 0.02]}
              variant="whisper"
              className="absolute inset-x-0 text-[#6E5344]"
            >
              {line}
            </CinematicText>
          ))}
        </div>
        <CinematicText progress={progress} range={[0.8, 0.875]} hold className="text-[#5C463C]">
          {realization.bridge}
        </CinematicText>
        <CinematicText progress={progress} range={[0.82, 0.88]} hold variant="hand" className="mt-1 text-[clamp(40px,7vw,68px)] text-[#332B27]">
          {realization.handwritten}
        </CinematicText>
      </div>
    </MemoryScene>
  );
}

function EndingScene({ progress }: { progress: MotionValue<number> }) {
  const { ending } = chapter;
  return (
    <MemoryScene progress={progress} range={[0.9, 1]} hold>
      <div className="flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <ChapterTitle progress={progress} range={[0.91, 0.98]} hold tone="mist">
          {ending.title}
        </ChapterTitle>
        <div className="relative mt-6 h-24 w-full overflow-hidden">
          {ending.lines.map((line, index) => (
            <CinematicText
              key={line}
              progress={progress}
              range={[0.908 + index * 0.01, 0.922 + index * 0.01]}
              variant={index === 0 ? "hand" : "body"}
              tone="mist"
              className="absolute inset-x-0 text-[#E7D7CC]"
            >
              {line}
            </CinematicText>
          ))}
        </div>
        <CinematicText progress={progress} range={[0.955, 1]} hold variant="hand" tone="mist" className="text-[#F3E6D0]">
          {ending.final}
        </CinematicText>
        <div className="mt-10 font-[family-name:var(--font-body)] text-[11px] tracking-[0.32em] text-[#B99A63]">
          {chapter.id} → {chapter.nextId}
        </div>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-[clamp(16px,2.4vw,22px)] text-[#F7F0E8]">
          {chapter.title} → {chapter.nextTitle}
        </p>
      </div>
    </MemoryScene>
  );
}

function MemoryFilmStatic() {
  const { notice, ordinary, trip, bus, moment, realization, ending } = chapter;
  return (
    <article
      id="chapter-01"
      aria-label="Chương 01, Ngày anh để ý em"
      className="bg-[#F6F0E8] text-[#332B27]"
    >
      <section className="story-paper mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-5 py-16 text-center">
        <p className="text-[10px] tracking-[0.42em] text-[#B99A63]">{notice.kicker}</p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(36px,6vw,72px)] leading-[1.35]">{notice.title}</h2>
        <p className="mt-4 text-[10px] tracking-[0.28em] text-[#8C7354] uppercase">{notice.subtitle}</p>
        <img src={notice.photo.src} alt={notice.photo.alt} className="mt-8 aspect-[16/10] w-full max-w-md object-cover" />
        <p className="mt-6 max-w-xl text-lg font-light">{notice.coworker}</p>
        <p className="mt-3 font-[family-name:var(--font-script)] text-3xl text-[#6E5344]">{notice.impression}</p>
      </section>
      <section className="mx-auto flex min-h-dvh max-w-4xl flex-wrap items-start justify-center gap-4 px-4 py-16">
        {ordinary.photos.map((photo) => (
          <figure key={photo.src} className="w-[42%] max-w-[180px] bg-[#FFFDF8] p-2 pb-8 shadow-lg" style={{ rotate: `${photo.rotate ?? 0}deg` }}>
            <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
            <figcaption className="mt-2 text-center font-[family-name:var(--font-script)] text-xl">{photo.note}</figcaption>
          </figure>
        ))}
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center bg-[#241C18] px-5 py-16 text-center text-[#F7F0E8]">
        <p className="text-[10px] tracking-[0.28em] text-[#B99A63]">{trip.period}</p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(36px,6vw,72px)] leading-[1.35]">{trip.title}</h2>
        <p className="mt-3 font-[family-name:var(--font-script)] text-3xl text-[#E7D3C4]">{trip.subtitle}</p>
        <div className="mt-8 grid w-full max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
          {trip.photos.map((photo) => (
            <img key={photo.src} src={photo.src} alt={photo.alt} className="aspect-[3/4] w-full object-cover" />
          ))}
        </div>
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center bg-[#0F0E0D] px-5 py-16 text-center text-[#F7F0E8]">
        <img src={bus.photo.src} alt={bus.photo.alt} className="aspect-[16/10] w-full max-w-lg object-cover" />
        {bus.lines.map((line) => (
          <p key={line} className="mt-4 max-w-xl text-lg font-light">{line}</p>
        ))}
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center bg-[#0F0E0D] px-5 py-16 text-center text-[#F7F0E8]">
        <img src={moment.photo.src} alt={moment.photo.alt} className="max-h-[46vh] w-full max-w-xl object-cover" />
        {moment.lines.map((line) => (
          <p key={line} className="mt-3 max-w-xl font-[family-name:var(--font-script)] text-3xl">{line}</p>
        ))}
      </section>
      <section className="story-paper mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-5 py-16 text-center">
        <p className="max-w-lg text-lg font-light">{realization.lead}</p>
        {realization.lines.map((line) => (
          <p key={line} className="mt-3 text-[11px] tracking-[0.22em] text-[#6E5344] uppercase">{line}</p>
        ))}
        <p className="mt-6">{realization.bridge}</p>
        <p className="mt-2 font-[family-name:var(--font-script)] text-5xl">{realization.handwritten}</p>
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 py-16 text-center text-[#F7F0E8]">
        <h2 className="font-[family-name:var(--font-serif)] text-[clamp(36px,6vw,72px)] leading-[1.35]">{ending.title}</h2>
        <p className="mt-6 max-w-xl font-[family-name:var(--font-script)] text-3xl text-[#F3E6D0]">{ending.final}</p>
        <p className="mt-10 text-[11px] tracking-[0.32em] text-[#B99A63]">{chapter.id} → {chapter.nextId}</p>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-xl">{chapter.title} → {chapter.nextTitle}</p>
      </section>
      <ChapterFooter chapterId={chapter.id} cue={chapter.ending.cue} top={chapter.ending.top} />
    </article>
  );
}

export function MemoryFilm() {
  const reduceMotion = usePrefersReducedMotion();
  if (reduceMotion) return <MemoryFilmStatic />;
  return <MemoryFilmPlayhead />;
}
