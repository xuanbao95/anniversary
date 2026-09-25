"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CHAPTER_FOUR, type StoryPhoto } from "@/data/anniversaryData";
import { ChapterFooter, usePrefersReducedMotion } from "./film-screen";
import { PolaroidPhoto } from "./polaroid-photo";
import { ScrollProgress } from "./scroll-progress";

const chapter = CHAPTER_FOUR;

const spots = [
  "left-[2%] top-[6%]",
  "right-[3%] top-[8%]",
  "left-[0%] bottom-[10%]",
  "right-[2%] bottom-[14%]",
  "left-[22%] top-0",
  "right-[18%] bottom-0",
];

function Reveal({
  children,
  className = "",
  calm = false,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  calm?: boolean;
  delay?: number;
}) {
  if (calm) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: "blur(8px)", scale: 1.025 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Frame({ photo, className = "" }: { photo: StoryPhoto; className?: string }) {
  return (
    <figure
      style={{ rotate: `${photo.rotate ?? 0}deg` }}
      className={`bg-[#FFFDF8] p-1.5 pb-5 shadow-[0_18px_40px_rgba(51,43,39,0.16)] ${className}`}
    >
      <img src={photo.src} alt={photo.alt} className="aspect-[4/5] w-full object-cover" draggable={false} />
      {photo.note ? (
        <figcaption className="mt-1 px-1 text-center font-[family-name:var(--font-script)] text-[clamp(16px,2.2vw,22px)] leading-tight text-[#332B27]">
          {photo.note}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Grain({ id }: { id: string }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-25 mix-blend-overlay">
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}

function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[11px] tracking-[0.42em] text-[#B99A63] uppercase ${className}`}>{children}</p>;
}

function StoryLine({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`max-w-xl font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,28px)] leading-snug ${light ? "text-[#E7D7CC]" : "text-[#332B27]"}`}>
      {children}
    </p>
  );
}

function EngagementStage({ hero, photos }: { hero: StoryPhoto; photos: StoryPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 20%"] });

  return (
    <div ref={ref} className="relative mx-auto hidden h-[78vh] max-w-5xl md:block">
      {photos.map((photo, index) => (
        <div key={`${photo.note}-${index}`} className={`absolute ${spots[index] ?? ""}`}>
          <PolaroidPhoto photo={photo} progress={scrollYProgress} range={[0.08, 0.92]} drift={10} />
        </div>
      ))}
      <img
        src={hero.src}
        alt={hero.alt}
        className="absolute top-1/2 left-1/2 z-10 aspect-[4/5] w-[min(28vw,260px)] -translate-x-1/2 -translate-y-1/2 object-cover shadow-[0_24px_50px_rgba(51,43,39,0.2)]"
        draggable={false}
      />
    </div>
  );
}

function AlbumTurn({ line, title, calm }: { line: string; title: string; calm: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const paper = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const rule = useTransform(scrollYProgress, [0.12, 0.4], [0, 1]);
  const copy = useTransform(scrollYProgress, [0.4, 0.62], [0, 1]);

  if (calm) {
    return (
      <section className="flex min-h-dvh flex-col items-center justify-center bg-[#0F0E0D] px-6 text-center">
        <p className="font-[family-name:var(--font-serif)] text-[clamp(22px,3vw,36px)]">{line}</p>
        <h2 className="mt-8 font-[family-name:var(--font-garamond)] text-[clamp(42px,7vw,88px)] leading-none">{title}</h2>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[170vh] bg-[#0F0E0D]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div style={{ opacity: copy }} className="flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="font-[family-name:var(--font-serif)] text-[clamp(22px,3vw,36px)]">{line}</p>
          <h2 className="mt-8 font-[family-name:var(--font-garamond)] text-[clamp(42px,7vw,88px)] leading-none">{title}</h2>
        </motion.div>
        <motion.div style={{ opacity: paper }} className="story-paper absolute inset-0" />
        <motion.div style={{ scaleX: rule }} className="absolute top-1/2 right-0 left-0 h-px origin-left bg-[#B99A63]" />
      </div>
    </section>
  );
}

function WeddingHero({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const { hero, title, lines } = chapter.wedding;

  if (calm) {
    return (
      <section className="relative flex min-h-dvh items-end justify-center overflow-hidden bg-[#0F0E0D] px-6 pb-[18vh] text-center">
        <img src={hero.src} alt={hero.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-[#0F0E0D]/35 to-[#0F0E0D]/20" />
        <div className="relative">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(48px,8vw,104px)] leading-none">{title}</h2>
          {lines.map((line) => (
            <StoryLine key={line} light>
              <span className="mt-4 block">{line}</span>
            </StoryLine>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[150vh] bg-[#0F0E0D]">
      <div className="sticky top-0 flex h-dvh items-end justify-center overflow-hidden px-6 pb-[18vh] text-center">
        <motion.img src={hero.src} alt={hero.alt} style={{ scale }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_16%,rgba(201,149,145,0.28),transparent_46%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-transparent to-[#0F0E0D]/25" />
        <Grain id="story-grain-04-hero" />
        <div className="relative">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(48px,8vw,104px)] leading-none">{title}</h2>
          {lines.map((line) => (
            <p key={line} className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,28px)] text-[#E7D7CC]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingFilm({ calm }: { calm: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const { video, still } = chapter.wedding.ceremony;

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;
    const markMissing = () => {
      if (node.error) setMissing(true);
    };
    markMissing();
    node.addEventListener("error", markMissing);
    return () => node.removeEventListener("error", markMissing);
  }, []);

  const togglePlay = () => {
    const node = videoRef.current;
    if (!node) return;
    if (node.paused) {
      node.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      return;
    }
    node.pause();
    setPlaying(false);
  };

  const toggleSound = () => {
    const node = videoRef.current;
    if (!node) return;
    node.muted = !node.muted;
    setMuted(node.muted);
  };

  if (missing) {
    return <img src={still.src} alt={still.alt} className="aspect-video w-full object-cover" />;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-[#B99A63]/80 bg-black">
      <video
        ref={videoRef}
        src={video}
        muted
        playsInline
        preload="metadata"
        controls={calm}
        className="h-full w-full object-cover"
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(event) => {
          const node = event.currentTarget;
          if (barRef.current && node.duration) {
            barRef.current.style.transform = `scaleX(${Math.min(1, node.currentTime / node.duration)})`;
          }
        }}
      />
      <Grain id="story-grain-04-video" />
      {calm ? null : (
        <>
          <button
            type="button"
            onClick={togglePlay}
            className="absolute bottom-4 left-4 rounded-full border border-[#B99A63]/30 bg-[#171615]/80 px-3 py-1 text-[9px] tracking-[0.16em] text-[#E8DCC9] backdrop-blur-sm"
          >
            {playing ? "TẠM DỪNG" : "PHÁT"}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="absolute top-3 right-3 rounded-full border border-[#B99A63]/30 bg-[#171615]/80 px-3 py-1 text-[9px] tracking-[0.16em] text-[#E8DCC9] backdrop-blur-sm"
          >
            {muted ? "BẬT TIẾNG" : "TẮT TIẾNG"}
          </button>
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/20">
            <div ref={barRef} className="h-full origin-left bg-[#B99A63]" style={{ transform: "scaleX(0)" }} />
          </div>
        </>
      )}
    </div>
  );
}

function MemoryRail({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-62%"]);
  const photos = chapter.wedding.memory.photos;

  if (calm) {
    return (
      <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
        {photos.map((photo, index) => (
          <Frame key={`${photo.note}-${index}`} photo={photo} className="w-36" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div ref={ref} className="relative hidden h-[160vh] md:block">
        <div className="sticky top-0 flex h-dvh items-center overflow-hidden">
          <motion.div style={{ x }} className="flex items-end gap-5 px-[12vw]">
            {photos.map((photo, index) => (
              <Frame key={`${photo.note}-${index}`} photo={photo} className="w-44 shrink-0" />
            ))}
          </motion.div>
        </div>
      </div>
      <div className="mx-auto flex max-w-lg flex-col items-center gap-5 md:hidden">
        {photos.map((photo, index) => (
          <Frame key={`${photo.note}-${index}`} photo={photo} className="w-[min(72vw,280px)]" />
        ))}
      </div>
    </>
  );
}

function HoneymoonBurn({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const cover = useTransform(scrollYProgress, [0.15, 0.72], [1, 0]);
  const leak = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 0.5, 0]);
  const { from } = chapter.honeymoon;
  const arrival = chapter.honeymoon.photos[0];

  if (calm) {
    return <img src={arrival.src} alt={arrival.alt} className="aspect-[16/9] w-full max-w-4xl object-cover" />;
  }

  return (
    <section ref={ref} className="relative h-[140vh] bg-[#0F0E0D]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <img src={arrival.src} alt={arrival.alt} className="absolute inset-0 h-full w-full object-cover" />
        <motion.img src={from.src} alt={from.alt} style={{ opacity: cover }} className="absolute inset-0 h-full w-full object-cover" />
        <motion.div
          style={{ opacity: leak }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(185,154,99,0.45),transparent_55%)]"
        />
        <Grain id="story-grain-04-burn" />
      </div>
    </section>
  );
}

function MomentStill({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const { moment } = chapter.honeymoon;

  const copy = (
    <div className="relative z-10 max-w-3xl px-6 pb-[16vh] text-center">
      <Kicker>{moment.kicker}</Kicker>
      <h2 className="mt-6 font-[family-name:var(--font-garamond)] text-[clamp(42px,7vw,96px)] leading-none">{moment.title}</h2>
      {moment.lines.map((line) => (
        <p key={line} className="mt-4 font-[family-name:var(--font-serif)] text-[clamp(18px,2.3vw,26px)] text-[#F7F0E8]">
          {line}
        </p>
      ))}
    </div>
  );

  if (calm) {
    return (
      <section className="relative flex min-h-dvh items-end justify-center overflow-hidden bg-[#0F0E0D]">
        <img src={moment.photo.src} alt={moment.photo.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#0F0E0D]/45" />
        {copy}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[140vh] bg-[#0F0E0D]">
      <div className="sticky top-0 flex h-dvh items-end justify-center overflow-hidden">
        <motion.img src={moment.photo.src} alt={moment.photo.alt} style={{ scale }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D]/80 via-[#0F0E0D]/25 to-transparent" />
        <Grain id="story-grain-04-moment" />
        {copy}
      </div>
    </section>
  );
}

function MemoryFilmFourPlay({ progress, calm }: { progress: MotionValue<number>; calm: boolean }) {
  const { opening, engagement, wedding, honeymoon, finale, next } = chapter;

  return (
    <>
      <ScrollProgress progress={progress} />
      <section className="flex min-h-dvh flex-col items-center justify-center bg-[#0F0E0D] px-6 py-24 text-center">
        <Reveal calm={calm}>
          <Kicker>{opening.kicker}</Kicker>
        </Reveal>
        <Reveal calm={calm} delay={0.15} className="mt-8">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,7vw,92px)] leading-[1.05]">{opening.title}</h2>
        </Reveal>
        <Reveal calm={calm} delay={0.28} className="mt-8 max-w-4xl">
          <p className="font-[family-name:var(--font-garamond)] text-[clamp(22px,3.2vw,42px)] leading-snug text-[#F7F0E8]">{opening.english}</p>
        </Reveal>
        <Reveal calm={calm} delay={0.4} className="mt-8 max-w-2xl">
          <p className="font-[family-name:var(--font-body)] text-[clamp(16px,2vw,20px)] font-light leading-relaxed text-[#E7D7CC]">{opening.vietnamese}</p>
        </Reveal>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(42px,7vw,88px)] leading-none text-[#332B27]">{engagement.title}</h2>
          <p className="mt-4 text-[13px] tracking-[0.18em] text-[#8C7354]">{engagement.subtitle}</p>
        </Reveal>
        <div className="mx-auto mt-10 max-w-2xl space-y-4">
          {engagement.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <StoryLine>{line}</StoryLine>
            </Reveal>
          ))}
        </div>
        {calm ? (
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4">
            <Frame photo={engagement.hero} className="col-span-2 mx-auto w-[min(80vw,320px)]" />
            {engagement.photos.map((photo, index) => (
              <Frame key={`${photo.note}-${index}`} photo={photo} />
            ))}
          </div>
        ) : (
          <>
            <EngagementStage hero={engagement.hero} photos={engagement.photos} />
            <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 md:hidden">
              <Frame photo={engagement.hero} className="col-span-2" />
              {engagement.photos.map((photo, index) => (
                <Frame key={`m-${photo.note}-${index}`} photo={photo} />
              ))}
            </div>
          </>
        )}
        <div className="mx-auto mt-12 max-w-xl space-y-3">
          {engagement.captions.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-script)] text-[clamp(22px,3vw,34px)] text-[#332B27]">{line}</p>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-2xl space-y-3">
          {engagement.close.map((line) => (
            <Reveal key={line} calm={calm}>
              <StoryLine>{line}</StoryLine>
            </Reveal>
          ))}
        </div>
      </section>

      <AlbumTurn line={chapter.toWedding.line} title={chapter.toWedding.title} calm={calm} />
      <WeddingHero calm={calm} />

      <section className="story-paper px-6 py-24 text-[#332B27]">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 md:gap-16">
          {wedding.preparation.photos.map((photo, index) => (
            <Reveal key={`${photo.note}-${index}`} calm={calm} className={index % 2 ? "md:ml-auto" : ""}>
              <Frame photo={photo} className="w-[min(78vw,300px)]" />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-xl space-y-3 text-center">
          {wedding.preparation.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <StoryLine>{line}</StoryLine>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#0F0E0D] px-6 py-24 text-center">
        <Reveal calm={calm} className="mx-auto max-w-2xl">
          <StoryLine light>{wedding.ceremony.before}</StoryLine>
        </Reveal>
        <div className="mx-auto mt-10 w-full max-w-5xl">
          <WeddingFilm calm={calm} />
        </div>
        <div className="mx-auto mt-12 max-w-xl space-y-3">
          {wedding.ceremony.after.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,28px)] text-[#E7D7CC]">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal calm={calm} className="mt-16">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(36px,6vw,84px)] leading-none text-[#B99A63]">{wedding.ceremony.vow}</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {wedding.ceremony.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,28px)]">{line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper py-24 text-center text-[#332B27]">
        <MemoryRail calm={calm} />
        <div className="mx-auto mt-12 max-w-xl space-y-3 px-6">
          {wedding.memory.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <StoryLine>{line}</StoryLine>
            </Reveal>
          ))}
        </div>
      </section>

      <HoneymoonBurn calm={calm} />

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(42px,7vw,88px)] leading-none">{honeymoon.title}</h2>
          <p className="mt-4 text-[13px] tracking-[0.16em] text-[#8C7354]">{honeymoon.subtitle}</p>
        </Reveal>
        <Reveal calm={calm} className="mx-auto mt-8 max-w-2xl">
          <StoryLine>{honeymoon.lead}</StoryLine>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
          {honeymoon.photos.map((photo, index) => (
            <Reveal key={`${photo.note}-${index}`} calm={calm}>
              <Frame photo={photo} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-xl space-y-3">
          {honeymoon.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <StoryLine>{line}</StoryLine>
            </Reveal>
          ))}
        </div>
      </section>

      <MomentStill calm={calm} />

      <section className="story-paper flex flex-col items-center px-6 py-28 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <img src={finale.photo.src} alt={finale.photo.alt} className="aspect-[4/5] w-[min(78vw,360px)] object-cover shadow-[0_24px_50px_rgba(51,43,39,0.16)]" />
        </Reveal>
        <div className="mt-12 max-w-2xl space-y-6">
          {finale.pairs.map((pair) => (
            <Reveal key={pair.english} calm={calm}>
              <p className="font-[family-name:var(--font-garamond)] text-[clamp(22px,3vw,36px)] leading-snug">{pair.english}</p>
              <p className="mt-2 font-[family-name:var(--font-body)] text-[clamp(16px,2vw,18px)] font-light">{pair.vietnamese}</p>
            </Reveal>
          ))}
        </div>
        <Reveal calm={calm} className="mt-14">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(42px,8vw,96px)] leading-none">{finale.title}</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {finale.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <StoryLine>{line}</StoryLine>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 max-w-xl space-y-6">
          {finale.close.map((pair) => (
            <Reveal key={pair.english} calm={calm}>
              <p className="font-[family-name:var(--font-garamond)] text-[clamp(20px,2.8vw,32px)]">{pair.english}</p>
              <p className="mt-2 text-[clamp(16px,2vw,18px)] font-light">{pair.vietnamese}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <Kicker>{next.kicker}</Kicker>
          <h2 className="mt-6 font-[family-name:var(--font-garamond)] text-[clamp(40px,7vw,84px)] leading-none">{next.title}</h2>
          <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,26px)]">{next.subtitle}</p>
        </Reveal>
      </section>
    </>
  );
}

export function MemoryFilmFour() {
  const calm = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <article
      ref={ref}
      id="chapter-04"
      data-chapter-flow=""
      aria-label="Chương 04, The Day We Became Us"
      className="relative bg-[#0F0E0D] text-[#F7F0E8]"
    >
      <MemoryFilmFourPlay progress={scrollYProgress} calm={calm} />
      <ChapterFooter chapterId={chapter.id} cue={chapter.cue} top={chapter.top} />
    </article>
  );
}
