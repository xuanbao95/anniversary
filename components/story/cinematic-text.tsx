"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { segment, useBeat } from "./memory-scene";

type CinematicTextProps = {
  progress: MotionValue<number>;
  range: [number, number];
  hold?: boolean;
  variant?: "body" | "hand" | "whisper" | "display" | "aside";
  tone?: "ink" | "mist";
  className?: string;
  children: React.ReactNode;
};

const variantClass = {
  body: "max-w-xl font-[family-name:var(--font-body)] text-[clamp(15px,2.1vw,20px)] font-light leading-relaxed",
  hand: "max-w-xl font-[family-name:var(--font-script)] text-[clamp(26px,4vw,40px)] leading-snug",
  whisper: "font-[family-name:var(--font-body)] text-[10px] font-medium tracking-[0.28em] uppercase",
  aside: "max-w-xl text-balance font-[family-name:var(--font-serif)] text-[clamp(15px,1.8vw,20px)] leading-relaxed",
  display: "font-[family-name:var(--font-serif)] text-[clamp(32px,6vw,72px)] leading-[1.05] font-medium",
};

const toneClass = {
  ink: "text-[#332B27]",
  mist: "text-[#F7F0E8]",
};

export function CinematicText({
  progress,
  range,
  hold = false,
  variant = "body",
  tone = "ink",
  className = "",
  children,
}: CinematicTextProps) {
  const { opacity, y } = useBeat(progress, range, hold);
  const blur = useTransform(opacity, (value) => segment(value, [0, 1], [3, 0]));
  const filter = useTransform(blur, (value) => `blur(${value}px)`);

  return (
    <motion.p
      style={{ opacity, y, filter }}
      className={`${variantClass[variant]} ${toneClass[tone]} ${className}`}
    >
      {children}
    </motion.p>
  );
}
