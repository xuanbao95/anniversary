"use client";

import { useState } from "react";
import { AudioPlayer } from "./audio-player";
import { FilmStrip } from "./film-strip";
import { RsvpModal } from "./modals/rsvp-modal";

export function AnniversaryWheelPage() {
  const [isPaused, setIsPaused] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden text-[#FAF6EE] selection:bg-[#B99A63] selection:text-black">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[#0c0a09]" />
        <div className="absolute inset-x-0 top-0 h-[58%] bg-[radial-gradient(ellipse_at_top,rgba(185,154,99,0.28),transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[48%] bg-[radial-gradient(ellipse_at_bottom,rgba(92,58,32,0.42),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.62)_100%)]" />
        <div className="absolute inset-0 opacity-[0.16] mix-blend-soft-light [background-image:radial-gradient(rgba(250,246,238,0.7)_0.45px,transparent_0.45px)] [background-size:2.5px_2.5px]" />
        <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-[#B99A63]/75" />
        <span className="absolute right-3 top-3 h-5 w-5 border-r border-t border-[#B99A63]/75" />
        <span className="absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[#B99A63]/75" />
        <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[#B99A63]/75" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-4 py-3 sm:px-8 sm:py-4">
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="relative z-30 flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-3">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-[#FAF6EE]">
            X<span className="mx-0.5 text-lg text-[#B99A63]">&amp;</span>M
          </span>
          <span className="hidden h-3.5 w-px bg-white/20 sm:block" />
          <span className="hidden text-[9.5px] font-semibold tracking-[0.24em] text-[#B99A63] sm:block">
            KỶ NIỆM NGÀY CƯỚI • 27/11/2022 — 27/11/2026
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setRsvpOpen(true)}
            className="rounded-full border border-white/15 bg-[#171615]/70 px-3.5 py-1 text-[8.5px] font-medium tracking-[0.14em] text-[#E8DCC9] transition-colors hover:border-[#B99A63] hover:text-[#B99A63]"
          >
            GỬI LỜI CHÚC (RSVP)
          </button>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="rounded-full border border-white/15 bg-[#171615]/70 px-3 py-1 text-[8.5px] tracking-[0.14em] text-[#C5B8A8] transition-colors hover:border-[#B99A63] hover:text-[#B99A63]"
          >
            {isPaused ? "▶ TIẾP TỤC" : "⏸ TẠM DỪNG"}
          </button>
          <AudioPlayer />
        </div>
      </header>

      <main className="relative z-20 flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-6 overflow-hidden py-2 sm:gap-8">
        <div className="px-2 text-center">
          <p className="text-[10px] font-semibold tracking-[0.32em] text-[#B99A63]">
            KỶ NIỆM NGÀY CƯỚI
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-script)] text-4xl leading-tight text-[#F3E6D0] sm:text-5xl">
            Xuân Bảo &amp; Minh Ngọc
          </h1>
          <p className="mt-2 font-[family-name:var(--font-display)] text-lg text-[#E0C097] sm:text-xl">
            4 năm ngày cưới
          </p>
          <p className="mt-1 text-[11px] tracking-[0.22em] text-[#C5B8A8]">
            27.11.2022 — 27.11.2026
          </p>
        </div>

        <div className="-mx-4 min-w-0 w-[calc(100%+2rem)] sm:-mx-8 sm:w-[calc(100%+4rem)]">
          <FilmStrip isPaused={isPaused} />
        </div>

        <p className="px-4 text-center font-[family-name:var(--font-script)] text-[28px] leading-snug text-[#E0C097] sm:text-[34px]">
          &ldquo;Bốn mùa thay lá, tình ta vẫn vẹn nguyên.&rdquo;
        </p>
      </main>

      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2 text-[9px] tracking-[0.18em] text-[#A69280]">
        <span>XUÂN BẢO &amp; MINH NGỌC</span>
        <span>27 / 11 / 2022 — 27 / 11 / 2026</span>
      </footer>

      {rsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
      </div>
    </div>
  );
}
