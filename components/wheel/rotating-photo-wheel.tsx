"use client";

import { MemorySlice } from "@/types/memory";
import { MEMORIES } from "@/data/memories";
import { createArcPath, getBadgePosition } from "@/lib/svg-geometry";
import { ClinkingGlassesCenter } from "./clinking-glasses-center";

type RotatingPhotoWheelProps = {
  isPaused: boolean;
  activeMemory: MemorySlice | null;
  onHoverMemory: (memory: MemorySlice | null) => void;
  onSelectMemory: (memory: MemorySlice) => void;
};

export function RotatingPhotoWheel({
  isPaused,
  activeMemory,
  onHoverMemory,
  onSelectMemory,
}: RotatingPhotoWheelProps) {
  // SVG Center and Radii
  const cx = 350;
  const cy = 350;
  const rOuter = 320;
  const rInner = 185;

  return (
    <div className="relative aspect-square h-full w-full">
      <svg className="h-full w-full" viewBox="0 0 700 700">
        <defs>
          {MEMORIES.map((slice) => (
            <clipPath key={`clip-${slice.id}`} id={`clip-slice-${slice.id}`}>
              <path d={createArcPath(cx, cy, rOuter, rInner, slice.startDeg, slice.endDeg)} />
            </clipPath>
          ))}
        </defs>

        {/* Vòng Tròn Viền Ngoài Phát Sáng */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter + 6}
          fill="none"
          stroke="#B99A63"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.32"
        />
        <circle
          cx={cx}
          cy={cy}
          r={rInner - 6}
          fill="none"
          stroke="#B99A63"
          strokeWidth="1"
          strokeDasharray="3 5"
          opacity="0.25"
        />

        {/* ================= DẢI ẢNH CONG BÊN NGOÀI - CHUYỂN ĐỘNG XOAY ================= */}
        <g
          className={isPaused ? "" : "animate-wheel-slow"}
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {MEMORIES.map((slice) => {
            const isActive = activeMemory?.id === slice.id;
            const pathD = createArcPath(cx, cy, rOuter, rInner, slice.startDeg, slice.endDeg);
            const badge = getBadgePosition(cx, cy, rOuter, rInner, slice.startDeg, slice.endDeg);

            return (
              <g
                key={slice.id}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={() => onHoverMemory(slice)}
                onClick={() => onSelectMemory(slice)}
              >
                {/* Ảnh Kỷ Niệm Nằm Trong Lát Cắt */}
                <g clipPath={`url(#clip-slice-${slice.id})`}>
                  <image
                    href={slice.image}
                    x="0"
                    y="0"
                    width="700"
                    height="700"
                    preserveAspectRatio="xMidYMid slice"
                    className={`transition-all duration-700 ${
                      isActive
                        ? "filter-none scale-105"
                        : "filter-grayscale brightness-[0.72] sepia-[0.22] hover:brightness-[0.98]"
                    }`}
                  />
                </g>

                {/* Đường Viền Ngăn Cách Lát Cắt */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={isActive ? "#D8B980" : "#1e1c1a"}
                  strokeWidth={isActive ? "2.8" : "1.6"}
                  className="transition-colors duration-300"
                />

                {/* Nhãn Tag Chữ Nhật Đen Viền Trắng Nghiêng Theo Góc Uốn */}
                <g
                  transform={`translate(${badge.x}, ${badge.y}) rotate(${badge.rotate})`}
                  className="pointer-events-none select-none"
                >
                  <rect
                    x="-58"
                    y="-10"
                    width="116"
                    height="20"
                    rx="2"
                    fill="#0A0909"
                    stroke={isActive ? "#D8B980" : "#FAF6EE"}
                    strokeWidth="1.2"
                    className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] transition-colors"
                  />
                  <text
                    x="0"
                    y="3.8"
                    textAnchor="middle"
                    fill={isActive ? "#D8B980" : "#FAF6EE"}
                    fontSize="7.6"
                    fontWeight="bold"
                    letterSpacing="0.14em"
                    fontFamily="var(--font-body), sans-serif"
                  >
                    {slice.badge}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* ================= TÂM VÒNG TRÒN CỐ ĐỊNH ================= */}
        <ClinkingGlassesCenter cx={cx} cy={cy} rInner={rInner} />
      </svg>
    </div>
  );
}
