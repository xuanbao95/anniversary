"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

type MemorySceneProps = {
  progress: MotionValue<number>;
  range: [number, number];
  /** Giữ cảnh đến hết khoảng, không tan ở cuối. */
  hold?: boolean;
  /** Phần của khoảng dùng để hiện. Mặc định giữ nhịp chương 01. */
  fadeIn?: number;
  /** Mốc trong khoảng bắt đầu tan. Mặc định giữ nhịp chương 01. */
  fadeOut?: number;
  className?: string;
  children: React.ReactNode;
};

/** Nội suy có chặn hai đầu. Dạng hàm để không bị animation native cắt sai khoảng. */
export function segment(value: number, input: number[], output: number[]) {
  if (value <= input[0]) return output[0];
  const last = input.length - 1;
  if (value >= input[last]) return output[last];
  for (let index = 0; index < last; index += 1) {
    const next = input[index + 1];
    if (value <= next) {
      const span = next - input[index];
      const t = span === 0 ? 0 : (value - input[index]) / span;
      return output[index] + t * (output[index + 1] - output[index]);
    }
  }
  return output[last];
}

export function useBeat(
  progress: MotionValue<number>,
  range: [number, number],
  hold = false,
  fadeIn?: number,
  fadeOut?: number,
) {
  const [enter, leave] = range;
  const span = Math.max(leave - enter, 0.004);
  const fadeInEnd = enter + span * (fadeIn ?? (enter === 0 ? 0.08 : 0.28));
  const fadeOutStart = enter + span * (fadeOut ?? (hold ? 0.9 : 0.7));
  const visible = enter === 0 ? 1 : 0;

  const opacity = useTransform(progress, (value) =>
    segment(value, [enter, fadeInEnd, fadeOutStart, leave], [visible, 1, 1, hold ? 1 : 0]),
  );
  const y = useTransform(progress, (value) =>
    segment(value, [enter, fadeInEnd, leave], [16, 0, hold ? 0 : -10]),
  );

  return { opacity, y };
}

export function MemoryScene({ progress, range, hold = false, fadeIn, fadeOut, className = "", children }: MemorySceneProps) {
  const { opacity, y } = useBeat(progress, range, hold, fadeIn, fadeOut);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
