"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { StoryPhoto } from "@/data/anniversaryData";
import { segment, useBeat } from "./memory-scene";

type ParallaxPhotoProps = {
  photo: StoryPhoto;
  progress: MotionValue<number>;
  range: [number, number];
  hold?: boolean;
  shift?: number;
  className?: string;
  frameClassName?: string;
};

export function ParallaxPhoto({
  photo,
  progress,
  range,
  hold = true,
  shift = 24,
  className = "",
  frameClassName = "",
}: ParallaxPhotoProps) {
  const { opacity } = useBeat(progress, range, hold);
  const revealEnd = range[0] + (range[1] - range[0]) * 0.35;
  const x = useTransform(progress, (value) => segment(value, [range[0], range[1]], [shift, -shift * 0.35]));
  const scale = useTransform(progress, (value) => segment(value, [range[0], range[1]], [1.08, 1]));
  const reveal = useTransform(progress, (value) => segment(value, [range[0], revealEnd], [14, 0]));
  const clipPath = useTransform(reveal, (value) => `inset(${value}% ${value * 0.4}% ${value}% ${value * 0.4}%)`);

  return (
    <motion.figure style={{ opacity, x }} className={`mx-auto w-full overflow-hidden ${className}`}>
      <motion.div style={{ scale, clipPath }} className={`w-full overflow-hidden ${frameClassName}`}>
        <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover object-center" draggable={false} />
      </motion.div>
    </motion.figure>
  );
}
