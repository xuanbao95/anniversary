"use client";

import { MemorySlice } from "@/types/memory";

type SpotlightModalProps = {
  memory: MemorySlice;
  onClose: () => void;
};

export function SpotlightModal({ memory, onClose }: SpotlightModalProps) {
  return (
    <div
      data-chapter-scroll-lock=""
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-[scene-rise_.3s_ease-out_both]"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl overflow-hidden rounded-lg border border-[#B99A63]/30 bg-[#141312] p-6 text-[#FAF6EE] shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg text-[#E8DCC9] transition-colors hover:bg-white/20"
        >
          ✕
        </button>

        <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
          <div className="relative overflow-hidden rounded border border-white/10 shadow-lg">
            <img
              src={memory.image}
              alt={memory.title}
              className="h-[270px] w-full object-cover sm:h-[330px]"
            />
            <span className="absolute bottom-2 right-2 rounded bg-black/75 px-2.5 py-1 text-[8px] tracking-wider text-[#D8B980] backdrop-blur-xs">
              {memory.location} • {memory.date}
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[9px] font-semibold tracking-[0.2em] text-[#B99A63]">
              {memory.subtitle}
            </span>
            <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-[#FAF6EE]">
              {memory.title}
            </h3>
            <p className="font-[family-name:var(--font-script)] text-[22px] leading-snug text-[#E0C097]">
              &ldquo;{memory.quote}&rdquo;
            </p>
            <div className="border-t border-white/10 pt-3 text-[11.5px] leading-relaxed text-[#B8A89A]">
              {memory.description}
            </div>
            <div className="mt-2 flex items-center gap-2 text-[9px] tracking-widest text-[#B99A63]">
              <span>27/11/2022 — 27/11/2024</span>
              <span className="h-px flex-1 bg-[#B99A63]/30" />
              <span>♥</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
