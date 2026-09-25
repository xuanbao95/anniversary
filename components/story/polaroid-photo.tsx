"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import type { StoryPhoto } from "@/data/anniversaryData";
import { segment, useBeat } from "./memory-scene";

type PolaroidPhotoProps = {
  photo: StoryPhoto;
  progress: MotionValue<number>;
  range: [number, number];
  drift?: number;
  compact?: boolean;
  className?: string;
};

export function PolaroidPhoto({
  photo,
  progress,
  range,
  drift = 18,
  compact = false,
  className = "",
}: PolaroidPhotoProps) {
  const { opacity } = useBeat(progress, range, true);
  const y = useTransform(progress, (value) => segment(value, [range[0], range[1]], [drift, -drift * 0.6]));
  const rotate = photo.rotate ?? 0;
  const size = compact
    ? "w-[24vw] max-w-[120px] p-1.5 pb-5 sm:w-[132px] sm:max-w-none"
    : "w-[30vw] max-w-[168px] p-2 pb-7 sm:w-[180px] sm:max-w-none sm:p-2.5 sm:pb-9";

  return (
    <motion.figure
      style={{ opacity, y, rotate }}
      className={`${size} shrink-0 bg-[#FFFDF8] shadow-[0_18px_40px_rgba(51,43,39,0.16)] ${className}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#E7DDD2]">
        <img src={photo.src} alt={photo.alt} className="h-full w-full object-cover" draggable={false} />
      </div>
      {photo.note ? (
        <figcaption className="mt-2 px-1 text-center font-[family-name:var(--font-script)] text-[clamp(15px,2.4vw,22px)] leading-tight text-[#332B27]">
          {photo.note}
        </figcaption>
      ) : null}
    </motion.figure>
  );
}
