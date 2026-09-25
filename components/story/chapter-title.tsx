"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { segment, useBeat } from "./memory-scene";

type ChapterTitleProps = {
  progress: MotionValue<number>;
  range: [number, number];
  hold?: boolean;
  fadeIn?: number;
  fadeOut?: number;
  /** Phần khoảng dùng để lau chữ hiện ra. */
  wipe?: number;
  tone?: "ink" | "mist";
  kicker?: string;
  children: React.ReactNode;
  className?: string;
};

export function ChapterTitle({
  progress,
  range,
  hold = false,
  fadeIn,
  fadeOut,
  wipe = 0.45,
  tone = "ink",
  kicker,
  children,
  className = "",
}: ChapterTitleProps) {
  const { opacity, y } = useBeat(progress, range, hold, fadeIn, fadeOut);
  const wipeEnd = range[0] + (range[1] - range[0]) * wipe;
  const wipeAmount = useTransform(progress, (value) => segment(value, [range[0], wipeEnd], [100, 0]));
  const clipPath = useTransform(
    wipeAmount,
    (value) => `inset(-0.2em ${Math.max(0, Math.min(100, value))}% -0.28em 0)`,
  );
  const color = tone === "ink" ? "text-[#332B27]" : "text-[#F7F0E8]";

  return (
    <motion.div style={{ opacity, y }} className={className}>
      {kicker ? (
        <p className="mb-3 font-[family-name:var(--font-body)] text-[10px] tracking-[0.42em] text-[#B99A63]">
          {kicker}
        </p>
      ) : null}
      <motion.h2
        style={{ clipPath }}
        className={`text-balance font-[family-name:var(--font-serif)] text-[clamp(32px,7vw,72px)] leading-[1.35] font-medium ${color}`}
      >
        {children}
      </motion.h2>
    </motion.div>
  );
}
