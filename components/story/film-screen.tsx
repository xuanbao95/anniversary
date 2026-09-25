"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, useMotionValue, type MotionValue } from "motion/react";

export function usePrefersReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return reduceMotion;
}

function visibleHeight(node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  return Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
}

type FooterSlot = {
  chapterId: string;
  setVisible: (visible: boolean) => void;
};

const footerSlots = new Set<FooterSlot>();
let footerFrame = 0;

function measureFooters() {
  footerFrame = 0;
  const chapters = [...document.querySelectorAll<HTMLElement>("[id^='chapter-']")];
  let bestId = "";
  let best = 0;
  for (const node of chapters) {
    const height = visibleHeight(node);
    if (height > best) {
      best = height;
      bestId = node.id;
    }
  }
  const active = best > 80 ? bestId : "";
  for (const slot of footerSlots) {
    slot.setVisible(active === `chapter-${slot.chapterId}`);
  }
}

function onFooterScroll() {
  if (footerFrame) return;
  footerFrame = window.requestAnimationFrame(measureFooters);
}

export function ChapterFooter({ chapterId, cue, top }: { chapterId: string; cue: string; top: string }) {
  const [target, setTarget] = useState({ href: "#top", label: top });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = document.getElementById(`chapter-${chapterId}`);
    if (!section) return;

    const chapters = [...document.querySelectorAll<HTMLElement>("[id^='chapter-']")];
    const index = chapters.findIndex((node) => node.id === `chapter-${chapterId}`);
    const next = chapters[index + 1];
    setTarget(next?.id ? { href: `#${next.id}`, label: cue } : { href: "#top", label: top });

    const slot: FooterSlot = {
      chapterId,
      setVisible: (nextVisible) => {
        setVisible((current) => (current === nextVisible ? current : nextVisible));
      },
    };
    footerSlots.add(slot);
    if (footerSlots.size === 1) {
      window.addEventListener("scroll", onFooterScroll, { passive: true });
      window.addEventListener("resize", onFooterScroll);
    }
    measureFooters();
    return () => {
      footerSlots.delete(slot);
      if (footerSlots.size === 0) {
        window.removeEventListener("scroll", onFooterScroll);
        window.removeEventListener("resize", onFooterScroll);
        window.cancelAnimationFrame(footerFrame);
        footerFrame = 0;
      }
    };
  }, [chapterId, cue, top]);

  if (!visible) return null;

  return (
    <a
      href={target.href}
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col items-center bg-gradient-to-t from-black/45 to-transparent px-6 pt-10 pb-5 font-[family-name:var(--font-body)] text-[10px] tracking-[0.34em] text-[#F6F0E8] uppercase"
    >
      {target.label}
      <span className="mt-2 block h-6 w-px bg-[#B99A63]/80" aria-hidden />
    </a>
  );
}

type FilmScreenProps = {
  chapterId: string;
  label: string;
  duration: number;
  cue: string;
  top: string;
  children: (progress: MotionValue<number>) => ReactNode;
};

export function FilmScreen({ chapterId, label, duration, cue, top, children }: FilmScreenProps) {
  const trackRef = useRef<HTMLElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;

    let controls: { stop: () => void } | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const playing = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.6);
        if (playing) {
          if (controls) return;
          progress.set(0);
          controls = animate(progress, 1, {
            duration,
            ease: "linear",
            repeat: Infinity,
          });
          return;
        }
        controls?.stop();
        controls = null;
      },
      { threshold: [0, 0.6, 1] },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      controls?.stop();
    };
  }, [duration, progress]);

  return (
    <section
      ref={trackRef}
      id={`chapter-${chapterId}`}
      aria-label={label}
      className="chapter-screen relative h-dvh overflow-hidden"
    >
      {children(progress)}
      <ChapterFooter chapterId={chapterId} cue={cue} top={top} />
    </section>
  );
}
