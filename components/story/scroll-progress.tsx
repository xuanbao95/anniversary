"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { segment } from "./memory-scene";

type ScrollProgressProps = {
  progress: MotionValue<number>;
};

export function ScrollProgress({ progress }: ScrollProgressProps) {
  const scaleX = useTransform(progress, (value) => segment(value, [0, 1], [0, 1]));

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none absolute top-0 right-0 left-0 z-40 h-px origin-left bg-[#B99A63]"
    />
  );
}
