"use client";

import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { CHAPTER_THREE } from "@/data/anniversaryData";
import { ChapterFooter, usePrefersReducedMotion } from "./film-screen";
import { segment } from "./memory-scene";
import { ScrollProgress } from "./scroll-progress";

const chapter = CHAPTER_THREE;
const VIDEO_AT = 32;
const PLANNED_VIDEO = 16;
const MISSING_VIDEO = 4;
const FINALE_END = 76;

function Hold({
  elapsed,
  lenRef,
  start,
  end,
  afterStart,
  afterEnd,
  className = "",
  children,
}: {
  elapsed: MotionValue<number>;
  lenRef: MutableRefObject<number>;
  start?: number;
  end?: number;
  afterStart?: number;
  afterEnd?: number;
  className?: string;
  children: ReactNode;
}) {
  const opacity = useTransform(elapsed, (time) => {
    const a = afterStart == null ? (start ?? 0) : VIDEO_AT + lenRef.current + afterStart;
    const b = afterEnd == null ? (end ?? a) : VIDEO_AT + lenRef.current + afterEnd;
    return segment(time, [a, a + 0.8, Math.max(a + 0.8, b - 0.7), b], [0, 1, 1, 0]);
  });
  const y = useTransform(opacity, (value) => (1 - value) * 16);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

function duckMusic() {
  const music = document.querySelector<HTMLAudioElement>("audio");
  if (!music || music.paused) return null;
  music.pause();
  return music;
}

function MemoryFilmThreePlayhead() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lenRef = useRef(PLANNED_VIDEO);
  const missingRef = useRef(false);
  const duckedRef = useRef<HTMLAudioElement | null>(null);
  const elapsed = useMotionValue(0);
  const progress = useMotionValue(0);
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);
  const [missing, setMissing] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const showControlsRef = useRef(false);

  const veil = useTransform(elapsed, (time) => segment(time, [0, 1.6], [1, 0]));
  const videoOpacity = useTransform(elapsed, (time) => {
    const stillEnd = VIDEO_AT + lenRef.current + 14.5;
    return segment(time, [VIDEO_AT - 0.3, VIDEO_AT + 0.6, stillEnd - 0.8, stillEnd], [0, 1, 1, 0]);
  });
  const videoBlur = useTransform(elapsed, (time) => {
    const end = VIDEO_AT + lenRef.current;
    const stillEnd = end + 14.5;
    const amount = segment(time, [end - 0.2, end + 0.8, stillEnd - 0.8, stillEnd], [0, 7, 7, 0]);
    return `blur(${amount}px)`;
  });

  const restoreMusic = () => {
    const music = duckedRef.current;
    duckedRef.current = null;
    if (!music) return;
    music.play().catch(() => {});
  };

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    let raf = 0;
    let running = false;
    let last = 0;
    let phase: "before" | "video" | "after" = "before";
    let before = 0;
    let after = 0;
    let fallback = 0;

    const reset = () => {
      phase = "before";
      before = 0;
      after = 0;
      fallback = 0;
      last = 0;
      const video = videoRef.current;
      if (video) {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* file chưa sẵn */
        }
      }
      restoreMusic();
      setMuted(true);
      showControlsRef.current = false;
      setShowControls(false);
      if (video) video.muted = true;
      elapsed.set(0);
      progress.set(0);
      if (barRef.current) barRef.current.style.transform = "scaleX(0)";
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      const video = videoRef.current;
      const len = missingRef.current ? MISSING_VIDEO : lenRef.current;

      if (video?.error && !missingRef.current) {
        missingRef.current = true;
        lenRef.current = MISSING_VIDEO;
        setMissing(true);
      }

      if (phase === "before") {
        before = Math.min(VIDEO_AT, before + dt);
        elapsed.set(before);
        if (before >= VIDEO_AT - 0.02) {
          phase = "video";
          fallback = 0;
          if (video && !missingRef.current) {
            video.currentTime = 0;
            video.muted = false;
            setMuted(false);
            duckedRef.current = duckMusic();
            video
              .play()
              .then(() => {
                setNeedsTap(false);
                setMuted(false);
              })
              .catch(() => {
                video.muted = true;
                setMuted(true);
                restoreMusic();
                video.play().then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
              });
          }
        }
      } else if (phase === "video") {
        if (missingRef.current || !video) {
          fallback = Math.min(MISSING_VIDEO, fallback + dt);
          elapsed.set(VIDEO_AT + fallback);
          if (fallback >= MISSING_VIDEO) {
            phase = "after";
            after = 0;
          }
        } else {
          const time = Number.isFinite(video.currentTime) ? video.currentTime : 0;
          elapsed.set(VIDEO_AT + time);
          if (barRef.current && video.duration) {
            barRef.current.style.transform = `scaleX(${Math.min(1, time / video.duration)})`;
          }
          const finished = video.ended || (video.duration > 0 && time >= video.duration - 0.08);
          if (finished) {
            phase = "after";
            after = 0;
            restoreMusic();
            setMuted(true);
            video.muted = true;
          }
        }
      } else {
        after += dt;
        elapsed.set(VIDEO_AT + len + after);
        if (after >= FINALE_END) reset();
      }

      const clock = phase === "before" ? before : phase === "after" ? VIDEO_AT + len + after : elapsed.get();
      progress.set(Math.min(1, clock / (VIDEO_AT + len + FINALE_END)));
      if (phase === "video" && !missingRef.current && !showControlsRef.current) {
        showControlsRef.current = true;
        setShowControls(true);
      } else if (phase !== "video" && showControlsRef.current) {
        showControlsRef.current = false;
        setShowControls(false);
      }
      raf = window.requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const playing = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.6);
        if (playing) {
          if (running) return;
          running = true;
          reset();
          raf = window.requestAnimationFrame(frame);
          return;
        }
        running = false;
        window.cancelAnimationFrame(raf);
        videoRef.current?.pause();
        restoreMusic();
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      videoRef.current?.pause();
      restoreMusic();
    };
  }, [elapsed, progress]);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video || missing) return;
    if (video.muted) {
      video.muted = false;
      try {
        await video.play();
        setMuted(false);
        setNeedsTap(false);
        duckedRef.current = duckMusic();
      } catch {
        video.muted = true;
        setMuted(true);
      }
      return;
    }
    video.muted = true;
    setMuted(true);
    restoreMusic();
  };

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    duckedRef.current = duckMusic();
    video
      .play()
      .then(() => {
        setNeedsTap(false);
        setMuted(false);
      })
      .catch(() => {
        video.muted = true;
        setMuted(true);
        restoreMusic();
        video.play().then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
      });
  };

  return (
    <section
      ref={sectionRef}
      id="chapter-03"
      aria-label="Chương 03, The Day I Asked You"
      className="chapter-screen relative h-dvh overflow-hidden bg-[#0F0E0D] text-[#F7F0E8]"
    >
      <ScrollProgress progress={progress} />
      <motion.div style={{ opacity: veil }} className="story-paper absolute inset-0" />

      <div className="absolute inset-x-0 top-0 bottom-16">
        <Hold elapsed={elapsed} lenRef={lenRef} start={1.1} end={5.4} className="absolute inset-0 flex items-center justify-center">
          <p className="font-[family-name:var(--font-body)] text-[11px] tracking-[0.42em] text-[#B99A63] uppercase">
            {chapter.opening.kicker}
          </p>
        </Hold>

        <Hold elapsed={elapsed} lenRef={lenRef} start={4.2} end={20} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="font-[family-name:var(--font-serif)] text-[clamp(32px,6vw,68px)] leading-[1.35]">
            {chapter.opening.title}
          </h2>
          <div className="mt-8 max-w-3xl space-y-3">
            {chapter.opening.lines.map((line, index) => (
              <Hold key={line} elapsed={elapsed} lenRef={lenRef} start={7.2 + index * 3.4} end={20}>
                <p className="font-[family-name:var(--font-serif)] text-[clamp(16px,2.2vw,24px)] leading-relaxed text-[#E7D7CC]">
                  {line}
                </p>
              </Hold>
            ))}
          </div>
        </Hold>

        <Hold elapsed={elapsed} lenRef={lenRef} start={18.6} end={VIDEO_AT} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          {chapter.question.map((line, index) => (
            <Hold key={line} elapsed={elapsed} lenRef={lenRef} start={20.4 + index * 5.8} end={VIDEO_AT} className="mt-6">
              <p className="max-w-xl font-[family-name:var(--font-serif)] text-[clamp(20px,3vw,32px)] leading-snug">{line}</p>
            </Hold>
          ))}
        </Hold>

        <motion.div style={{ opacity: videoOpacity }} className="absolute inset-0 flex flex-col items-center justify-center px-5 pb-[16vh] pt-[4vh]">
          <div className="relative aspect-[9/16] h-[min(46dvh,calc(100dvh-18rem))] w-auto max-w-[92vw]">
            <motion.div style={{ filter: videoBlur }} className="relative h-full overflow-hidden border border-[#B99A63]/80 bg-black">
              <video
                ref={videoRef}
                src={chapter.video}
                muted
                playsInline
                preload="auto"
                className="h-full w-full object-cover"
                onLoadedMetadata={(event) => {
                  const duration = event.currentTarget.duration;
                  if (Number.isFinite(duration) && duration > 0) lenRef.current = duration;
                }}
                onError={() => {
                  missingRef.current = true;
                  lenRef.current = MISSING_VIDEO;
                  setMissing(true);
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(201,149,145,0.28),transparent_42%)] mix-blend-screen" />
              <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-overlay">
                <filter id="story-grain-03">
                  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#story-grain-03)" />
              </svg>
            </motion.div>
            {showControls ? (
              <div className="absolute inset-0 z-20">
                {needsTap && !missing ? (
                  <button
                    type="button"
                    onClick={startVideo}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#B99A63] bg-[#1A1614] px-4 py-2 text-[11px] tracking-[0.28em] text-[#F3E6D0]"
                  >
                    PHÁT
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={toggleSound}
                  className="absolute top-3 right-3 rounded-full border border-[#B99A63]/30 bg-[#171615]/80 px-3 py-1 text-[9px] font-medium tracking-[0.16em] text-[#E8DCC9] backdrop-blur-sm transition-all hover:border-[#B99A63] hover:text-[#B99A63]"
                >
                  {muted ? "BẬT TIẾNG" : "TẮT TIẾNG"}
                </button>
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/20">
                  <div ref={barRef} className="h-full origin-left bg-[#B99A63]" style={{ transform: "scaleX(0)" }} />
                </div>
              </div>
            ) : null}
          </div>
          <p className="mt-4 text-[11px] tracking-[0.32em] text-[#B99A63] uppercase">{chapter.moment}</p>
        </motion.div>

        <Hold
          elapsed={elapsed}
          lenRef={lenRef}
          afterStart={0.4}
          afterEnd={14.5}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end px-6 pb-[18vh] text-center"
        >
          {chapter.still.map((line, index) => (
            <Hold key={line} elapsed={elapsed} lenRef={lenRef} afterStart={1.1 + index * 2.8} afterEnd={14.5} className="mt-4">
              <p className="font-[family-name:var(--font-serif)] text-[clamp(18px,2.6vw,28px)]">{line}</p>
            </Hold>
          ))}
        </Hold>

        <Hold
          elapsed={elapsed}
          lenRef={lenRef}
          afterStart={13.2}
          afterEnd={26}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="max-w-[94vw] font-[family-name:var(--font-garamond)] text-[clamp(26px,5.6vw,80px)] leading-[1.15] whitespace-nowrap text-[#B99A63]">
            {chapter.ask.line}
          </p>
          <Hold elapsed={elapsed} lenRef={lenRef} afterStart={19.2} afterEnd={26} className="mt-8">
            <p className="text-[12px] tracking-[0.22em] text-[#E7D7CC]">{chapter.ask.aside}</p>
          </Hold>
        </Hold>

        <Hold
          elapsed={elapsed}
          lenRef={lenRef}
          afterStart={24.8}
          afterEnd={42}
          className="story-paper absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-[#332B27]"
        >
          <img
            src={chapter.yes.photo.src}
            alt={chapter.yes.photo.alt}
            className="mb-6 aspect-video w-full max-w-sm object-cover"
          />
          <p className="max-w-xl font-[family-name:var(--font-serif)] text-[clamp(16px,2.2vw,22px)] leading-relaxed">
            {chapter.yes.line}
          </p>
          <div className="relative mt-6 h-28 w-full">
            <Hold elapsed={elapsed} lenRef={lenRef} afterStart={30} afterEnd={36.2} className="absolute inset-0 flex items-center justify-center">
              <p className="font-[family-name:var(--font-serif)] text-[clamp(72px,16vw,150px)] leading-none">{chapter.yes.word}</p>
            </Hold>
            <Hold elapsed={elapsed} lenRef={lenRef} afterStart={35} afterEnd={42} className="absolute inset-0 flex items-center justify-center">
              <p className="font-[family-name:var(--font-serif)] text-[clamp(36px,7vw,84px)] tracking-[0.08em]">{chapter.yes.forever}</p>
            </Hold>
          </div>
        </Hold>

        <Hold
          elapsed={elapsed}
          lenRef={lenRef}
          afterStart={40.6}
          afterEnd={58}
          className="story-paper absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-[#332B27]"
        >
          <div className="flex max-w-5xl flex-wrap items-end justify-center gap-2 sm:gap-4">
            {chapter.after.photos.map((photo, index) => (
              <Hold key={photo.src} elapsed={elapsed} lenRef={lenRef} afterStart={41.2 + index * 0.7} afterEnd={58}>
                <figure
                  style={{ rotate: `${photo.rotate ?? 0}deg` }}
                  className="w-[17vw] max-w-[108px] bg-[#FFFDF8] p-1.5 pb-5 shadow-[0_14px_30px_rgba(51,43,39,0.16)]"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#E7DDD2]">
                    <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" draggable={false} />
                  </div>
                  <figcaption className="mt-1 font-[family-name:var(--font-script)] text-[clamp(13px,2vw,18px)]">{photo.note}</figcaption>
                </figure>
              </Hold>
            ))}
          </div>
          {chapter.after.lines.map((line, index) => (
            <Hold key={line} elapsed={elapsed} lenRef={lenRef} afterStart={46 + index * 4} afterEnd={58} className="mt-5">
              <p className="max-w-xl font-[family-name:var(--font-body)] text-[clamp(15px,2vw,18px)] font-light">{line}</p>
            </Hold>
          ))}
        </Hold>

        <Hold
          elapsed={elapsed}
          lenRef={lenRef}
          afterStart={56.4}
          afterEnd={FINALE_END}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          {chapter.ending.lines.map((line, index) => (
            <Hold key={line} elapsed={elapsed} lenRef={lenRef} afterStart={58 + index * 4.5} afterEnd={70}>
              <p className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(20px,3vw,32px)]">{line}</p>
            </Hold>
          ))}
          <Hold elapsed={elapsed} lenRef={lenRef} afterStart={68} afterEnd={FINALE_END} className="mt-10">
            <p className="text-[11px] tracking-[0.32em] text-[#B99A63]">
              {chapter.id} → {chapter.nextId}
            </p>
            <p className="mt-2 font-[family-name:var(--font-serif)] text-[clamp(16px,2.4vw,22px)]">
              {chapter.title} → {chapter.nextTitle}
            </p>
            <p className="mt-3 font-[family-name:var(--font-serif)] text-sm text-[#E7D7CC] italic">{chapter.ending.nextLine}</p>
          </Hold>
        </Hold>
      </div>

      <ChapterFooter chapterId={chapter.id} cue={chapter.cue} top={chapter.top} />
    </section>
  );
}

function MemoryFilmThreeStatic() {
  return (
    <article id="chapter-03" aria-label="Chương 03, The Day I Asked You" className="bg-[#0F0E0D] text-[#F7F0E8]">
      <section className="flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-[11px] tracking-[0.42em] text-[#B99A63] uppercase">{chapter.opening.kicker}</p>
        <h2 className="mt-6 font-[family-name:var(--font-serif)] text-[clamp(36px,6vw,68px)] leading-[1.35]">{chapter.opening.title}</h2>
        {chapter.opening.lines.map((line) => (
          <p key={line} className="mt-3 max-w-xl font-[family-name:var(--font-serif)] text-lg text-[#E7D7CC]">
            {line}
          </p>
        ))}
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        {chapter.question.map((line) => (
          <p key={line} className="mt-4 max-w-xl font-[family-name:var(--font-serif)] text-2xl">
            {line}
          </p>
        ))}
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center px-5 text-center">
        <video src={chapter.video} controls playsInline preload="metadata" className="aspect-[9/16] h-[min(46dvh,calc(100dvh-18rem))] w-auto max-w-[92vw] border border-[#B99A63]/80 bg-black" />
        <p className="mt-4 text-[11px] tracking-[0.32em] text-[#B99A63] uppercase">{chapter.moment}</p>
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        {chapter.still.map((line) => (
          <p key={line} className="mt-4 font-[family-name:var(--font-serif)] text-2xl">
            {line}
          </p>
        ))}
        <p className="mt-10 font-[family-name:var(--font-garamond)] text-[clamp(42px,8vw,88px)] text-[#B99A63]">{chapter.ask.line}</p>
        <p className="mt-4 text-sm tracking-[0.18em]">{chapter.ask.aside}</p>
      </section>
      <section className="story-paper flex min-h-dvh flex-col items-center justify-center px-6 py-16 text-center text-[#332B27]">
        <img src={chapter.yes.photo.src} alt={chapter.yes.photo.alt} className="mb-6 aspect-video w-full max-w-sm object-cover" />
        <p className="max-w-xl font-[family-name:var(--font-serif)] text-xl">{chapter.yes.line}</p>
        <p className="mt-6 font-[family-name:var(--font-serif)] text-7xl">{chapter.yes.word}</p>
        <p className="mt-4 font-[family-name:var(--font-serif)] text-4xl">{chapter.yes.forever}</p>
        <div className="mt-8 flex flex-wrap items-end justify-center gap-3">
          {chapter.after.photos.map((photo) => (
            <figure key={photo.note} className="w-28 bg-[#FFFDF8] p-1.5 pb-4">
              <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" />
              <figcaption className="mt-1 font-[family-name:var(--font-script)]">{photo.note}</figcaption>
            </figure>
          ))}
        </div>
        {chapter.after.lines.map((line) => (
          <p key={line} className="mt-4 max-w-xl font-light">
            {line}
          </p>
        ))}
      </section>
      <section className="flex min-h-dvh flex-col items-center justify-center bg-[#0F0E0D] px-6 text-center">
        {chapter.ending.lines.map((line) => (
          <p key={line} className="mt-4 font-[family-name:var(--font-serif)] text-2xl">
            {line}
          </p>
        ))}
        <p className="mt-10 text-[11px] tracking-[0.32em] text-[#B99A63]">
          {chapter.id} → {chapter.nextId}
        </p>
        <p className="mt-2 font-[family-name:var(--font-serif)] text-xl">
          {chapter.title} → {chapter.nextTitle}
        </p>
        <p className="mt-3 font-[family-name:var(--font-serif)] text-[#E7D7CC] italic">{chapter.ending.nextLine}</p>
      </section>
      <ChapterFooter chapterId={chapter.id} cue={chapter.cue} top={chapter.top} />
    </article>
  );
}

export function MemoryFilmThree() {
  const reduceMotion = usePrefersReducedMotion();
  if (reduceMotion) return <MemoryFilmThreeStatic />;
  return <MemoryFilmThreePlayhead />;
}
