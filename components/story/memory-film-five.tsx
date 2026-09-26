"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CHAPTER_FIVE, type StoryPhoto } from "@/data/anniversaryData";
import { ChapterFooter, usePrefersReducedMotion } from "./film-screen";
import { PolaroidPhoto } from "./polaroid-photo";
import { ScrollProgress } from "./scroll-progress";

const chapter = CHAPTER_FIVE;

const spots = [
  "left-[2%] top-[8%]",
  "right-[4%] top-[6%]",
  "left-[0%] bottom-[12%]",
  "right-[2%] bottom-[16%]",
  "left-[20%] top-0",
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
      initial={{ opacity: 0, y: 16, filter: "blur(8px)", scale: 1.02 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.25, delay, ease: [0.22, 1, 0.36, 1] }}
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

function Kicker({ children }: { children: ReactNode }) {
  return <p className="text-[11px] tracking-[0.42em] text-[#B99A63] uppercase">{children}</p>;
}

function Line({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,28px)] leading-snug ${light ? "text-[#E7D7CC]" : "text-[#332B27]"}`}
    >
      {children}
    </p>
  );
}

function ZoomStill({ photo, calm, className = "" }: { photo: StoryPhoto; calm: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  if (calm) {
    return <img src={photo.src} alt={photo.alt} className={`w-full object-cover ${className}`} draggable={false} />;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img src={photo.src} alt={photo.alt} style={{ scale }} className="h-full w-full object-cover" draggable={false} />
    </div>
  );
}

function FilmPlayer({
  src,
  still,
  calm,
  grainId,
  className = "",
}: {
  src: string;
  still: StoryPhoto;
  calm: boolean;
  grainId: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [missing, setMissing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

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

  if (missing) {
    return <img src={still.src} alt={still.alt} className={`aspect-video w-full object-cover ${className}`} />;
  }

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

  return (
    <div className={`relative aspect-video w-full overflow-hidden border border-[#B99A63]/80 bg-black ${className}`}>
      <video
        ref={videoRef}
        src={src}
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
      <Grain id={grainId} />
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
            onClick={() => {
              const node = videoRef.current;
              if (!node) return;
              node.muted = !node.muted;
              setMuted(node.muted);
            }}
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

function Cluster({ hero, photos, calm }: { hero: StoryPhoto; photos: StoryPhoto[]; calm: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 20%"] });

  if (calm) {
    return (
      <div className="mx-auto mt-10 flex max-w-sm flex-col items-center gap-4">
        <Frame photo={hero} className="w-[min(80vw,320px)]" />
        {photos.map((photo, index) => (
          <Frame key={`${photo.note}-${index}`} photo={photo} className="w-[min(70vw,220px)]" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div ref={ref} className="relative mx-auto mt-8 hidden h-[72vh] max-w-5xl md:block">
        {photos.map((photo, index) => (
          <div key={`${photo.note}-${index}`} className={`absolute ${spots[index] ?? ""}`}>
            <PolaroidPhoto photo={photo} progress={scrollYProgress} range={[0.08, 0.9]} drift={8} />
          </div>
        ))}
        <img
          src={hero.src}
          alt={hero.alt}
          className="absolute top-1/2 left-1/2 z-10 aspect-[4/5] w-[min(28vw,260px)] -translate-x-1/2 -translate-y-1/2 object-cover shadow-[0_24px_50px_rgba(51,43,39,0.18)]"
          draggable={false}
        />
      </div>
      <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-4 md:hidden">
        <Frame photo={hero} className="w-[min(80vw,320px)]" />
        {photos.map((photo, index) => (
          <Frame key={`m-${photo.note}-${index}`} photo={photo} className="w-[min(70vw,220px)]" />
        ))}
      </div>
    </>
  );
}

function MemoryFilmFivePlay({ progress, calm }: { progress: MotionValue<number>; calm: boolean }) {
  const { opening, sign, waiting, milestones, counting, birth, firstMoment, firstDays, growth, wall, today, family, letter, ending, next } =
    chapter;

  return (
    <>
      <ScrollProgress progress={progress} />

      <section className="story-paper flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <Kicker>{opening.kicker}</Kicker>
        </Reveal>
        <Reveal calm={calm} delay={0.15} className="mt-8">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,7vw,92px)] leading-[1.05]">{opening.title}</h2>
        </Reveal>
        <Reveal calm={calm} delay={0.28} className="mt-8 max-w-4xl">
          <p className="font-[family-name:var(--font-garamond)] text-[clamp(22px,3.1vw,40px)] leading-snug">{opening.english}</p>
        </Reveal>
      </section>

      <section className="story-paper flex min-h-dvh flex-col items-center justify-center px-6 py-28 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <p className="font-[family-name:var(--font-script)] text-[clamp(28px,4vw,44px)]">{opening.lead}</p>
        </Reveal>
        <Reveal calm={calm} delay={0.2} className="mt-8">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,7vw,88px)] leading-none">WE WERE THREE</h2>
        </Reveal>
        <Reveal calm={calm} delay={0.35} className="mt-6 max-w-xl">
          <Line>{opening.line}</Line>
        </Reveal>
        <div className="mt-10 w-full max-w-xl">
          <FilmPlayer src={opening.video} still={opening.still} calm={calm} grainId="story-grain-05-news" />
        </div>
        <div className="mt-10 max-w-xl space-y-3">
          {opening.captions.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-script)] text-[clamp(22px,3vw,32px)]">{line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,80px)] leading-none">{sign.title}</h2>
        </Reveal>
        <div className="mx-auto mt-8 max-w-2xl space-y-4">
          {sign.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
        <ZoomStill photo={sign.photo} calm={calm} className="mx-auto mt-12 aspect-[4/5] max-w-md" />
        <div className="mt-12 space-y-2">
          {sign.english.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-garamond)] text-[clamp(28px,4vw,48px)]">{line}</p>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-6 max-w-xl space-y-2">
          {sign.vietnamese.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-[#332B27]">
        <Reveal calm={calm} className="text-center">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,80px)] leading-none">{waiting.title}</h2>
        </Reveal>
        <div className="mx-auto mt-16 max-w-3xl space-y-20">
          {waiting.months.map((month) => (
            <Reveal key={month.label} calm={calm} className="text-center">
              <Kicker>{month.label}</Kicker>
              <p className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-script)] text-[clamp(22px,3vw,32px)]">{month.note}</p>
              {month.ultrasound && month.photos[0] ? (
                <figure className="mx-auto mt-8 max-w-2xl">
                  <ZoomStill photo={month.photos[0]} calm={calm} className="aspect-[4/3]" />
                  {month.photos[0].note ? (
                    <figcaption className="mt-3 font-[family-name:var(--font-script)] text-[clamp(20px,2.8vw,28px)]">
                      {month.photos[0].note}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
              {!month.ultrasound && month.photos.length > 0 ? (
                <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center">
                  {month.photos.map((photo, index) => (
                    <Frame key={`${photo.note}-${index}`} photo={photo} className="w-[min(70vw,220px)]" />
                  ))}
                </div>
              ) : null}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-[#332B27]">
        <ol className="relative mx-auto max-w-xl space-y-16 pl-12">
          <span className="absolute top-0 bottom-0 left-4 w-px bg-[#B99A63]" aria-hidden />
          {milestones.map((item) => (
            <li key={item.title} className="relative">
              <span className="absolute top-2 -left-12 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#B99A63]" aria-hidden />
              <Reveal calm={calm}>
                <h3 className="font-[family-name:var(--font-garamond)] text-[clamp(28px,4vw,44px)] leading-none">{item.title}</h3>
                <p className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(18px,2.2vw,24px)]">{item.line}</p>
                {item.photo ? <Frame photo={item.photo} className="mt-6 w-[min(70vw,240px)]" /> : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,80px)] leading-none">{counting.title}</h2>
        </Reveal>
        <ZoomStill photo={counting.photo} calm={calm} className="mx-auto mt-10 aspect-[16/10] max-w-3xl" />
        <div className="mx-auto mt-10 max-w-xl space-y-3">
          {counting.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
        {counting.meetInDays != null ? (
          <Reveal calm={calm} className="mt-12">
            <p className="font-[family-name:var(--font-garamond)] text-[clamp(64px,10vw,120px)] leading-none">{counting.meetInDays}</p>
            <Kicker>Days until we meet</Kicker>
          </Reveal>
        ) : null}
      </section>

      <section className="bg-[#0F0E0D] px-6 py-28 text-center text-[#F7F0E8]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,84px)] leading-none">{birth.title}</h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {birth.arrive.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-serif)] text-[clamp(22px,3vw,36px)]">{line}</p>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-xl space-y-3">
          {birth.before.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line light>{line}</Line>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 w-full max-w-5xl">
          <FilmPlayer src={birth.video} still={birth.still} calm={calm} grainId="story-grain-05-birth" />
        </div>
      </section>

      <section className="flex flex-col items-center bg-[#0F0E0D] px-6 py-28 text-center text-[#F7F0E8]">
        <div className="max-w-3xl space-y-16">
          {birth.quiet.map((line, index) => (
            <Reveal key={line} calm={calm} delay={calm ? 0 : index * 0.05}>
              <p className="font-[family-name:var(--font-garamond)] text-[clamp(28px,5vw,64px)] leading-tight">{line}</p>
            </Reveal>
          ))}
        </div>
        <Reveal calm={calm} className="mt-20 max-w-xl">
          <Line light>{birth.cry}</Line>
        </Reveal>
        <Reveal calm={calm} className="relative mt-16 w-full max-w-md">
          <ZoomStill photo={birth.photo} calm={calm} className="aspect-[4/5]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,149,145,0.22),transparent_46%)]" />
        </Reveal>
        <Reveal calm={calm} className="mt-14">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,7vw,88px)] leading-none text-[#F7F0E8]">{birth.hello}</h2>
        </Reveal>
        <div className="mt-6 space-y-3">
          {birth.welcome.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line light>{line}</Line>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Cluster hero={firstMoment.hero} photos={firstMoment.photos} calm={calm} />
        <div className="mx-auto mt-12 max-w-xl space-y-3">
          {firstMoment.captions.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-8 max-w-xl space-y-2">
          {firstMoment.close.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-script)] text-[clamp(22px,3vw,32px)]">{line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,80px)] leading-none">{firstDays.title}</h2>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
          {firstDays.photos.map((photo, index) => (
            <Reveal key={`${photo.note}-${index}`} calm={calm}>
              <Frame photo={photo} className="mx-auto w-full max-w-[220px]" />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-xl space-y-3">
          {firstDays.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-[#332B27]">
        <Reveal calm={calm} className="text-center">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,80px)] leading-none">{growth.title}</h2>
        </Reveal>
        <ol className="relative mx-auto mt-16 max-w-xl space-y-14 pl-10">
          <span className="absolute top-0 bottom-0 left-3 w-px bg-[#B99A63]/80" aria-hidden />
          {growth.milestones.map((item) => (
            <li key={item.label}>
              <Reveal calm={calm}>
                <Kicker>{item.label}</Kicker>
                <p className="mt-2 font-[family-name:var(--font-script)] text-[clamp(22px,3vw,30px)]">{item.age}</p>
                <p className="mt-2 font-[family-name:var(--font-serif)] text-[clamp(18px,2.2vw,24px)]">{item.note}</p>
                {item.photo ? <Frame photo={item.photo} className="mt-5 w-[min(68vw,220px)]" /> : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-4">
          {wall.photos.map((photo, index) => (
            <Reveal key={`${photo.note}-${index}`} calm={calm}>
              <Frame photo={photo} className="mx-auto w-full max-w-[220px]" />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto mt-12 max-w-xl space-y-2">
          {wall.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <p className="font-[family-name:var(--font-script)] text-[clamp(22px,3vw,32px)]">{line}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,6vw,80px)] leading-none">{today.title}</h2>
          <p className="mt-3 font-[family-name:var(--font-script)] text-2xl">{today.when}</p>
        </Reveal>
        <Cluster hero={today.hero} photos={today.photos} calm={calm} />
        <div className="mx-auto mt-12 max-w-xl space-y-3">
          {today.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper flex flex-col items-center px-6 py-28 text-center text-[#332B27]">
        <Reveal calm={calm}>
          <img
            src={family.photo.src}
            alt={family.photo.alt}
            className="aspect-[4/5] w-[min(78vw,360px)] object-cover shadow-[0_24px_50px_rgba(51,43,39,0.16)]"
          />
        </Reveal>
        <div className="mt-12 max-w-xl space-y-3">
          {family.lines.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
        <Reveal calm={calm} className="mt-14">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(40px,7vw,88px)] leading-none">{family.title}</h2>
        </Reveal>
        <div className="mt-8 max-w-xl space-y-3">
          {family.after.map((line) => (
            <Reveal key={line} calm={calm}>
              <Line>{line}</Line>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="story-paper px-6 py-24">
        <Reveal calm={calm} className="mx-auto max-w-xl bg-[#FFFDF8] px-8 py-14 text-center text-[#332B27] shadow-[0_18px_40px_rgba(51,43,39,0.08)]">
          <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(32px,5vw,56px)] leading-none">{letter.title}</h2>
          <div className="mt-8 space-y-4">
            {letter.lines.map((line) => (
              <p key={line} className="font-[family-name:var(--font-serif)] text-[clamp(18px,2.2vw,24px)] leading-snug">
                {line}
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="relative flex min-h-dvh items-end justify-center overflow-hidden bg-[#0F0E0D] px-6 pb-[18vh] text-center">
        <img src={ending.photo.src} alt={ending.photo.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-[#0F0E0D]/35 to-[#0F0E0D]/15" />
        <div className="relative">
          <Reveal calm={calm}>
            <h2 className="font-[family-name:var(--font-garamond)] text-[clamp(36px,6vw,80px)] leading-none">{ending.title}</h2>
            <p className="mt-6 font-[family-name:var(--font-serif)] text-[clamp(18px,2.4vw,28px)] text-[#F7F0E8]">{ending.line}</p>
          </Reveal>
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

export function MemoryFilmFive() {
  const calm = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <article
      ref={ref}
      id="chapter-05"
      data-chapter-flow=""
      aria-label="Chương 05, Our Little Miracle"
      className="relative bg-[#F6F0E8] text-[#F7F0E8]"
    >
      <MemoryFilmFivePlay progress={scrollYProgress} calm={calm} />
      <ChapterFooter chapterId={chapter.id} cue={chapter.cue} top={chapter.top} />
    </article>
  );
}
