"use client";

import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const resumeRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const releaseGesture = useRef<(() => void) | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.28;

    let stopped = false;
    const detach = () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("scroll", onGesture);
      releaseGesture.current = null;
    };
    releaseGesture.current = detach;

    const begin = () => {
      if (stopped) return;
      if (!audio.paused) {
        setPlaying(true);
        detach();
        return;
      }
      audio
        .play()
        .then(() => {
          if (stopped || audio.paused) return;
          setPlaying(true);
          detach();
        })
        .catch(() => {
          // Trình duyệt chặn tự phát khi chưa có thao tác.
        });
    };

    const onGesture = (event: Event) => {
      const target = event.target;
      if (target instanceof Element && target.closest("[data-audio-toggle]")) return;
      begin();
    };

    begin();
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    window.addEventListener("scroll", onGesture, { passive: true });

    const onVisibility = () => {
      if (document.hidden && !audio.paused) {
        resumeRef.current = true;
        audio.pause();
      } else if (!document.hidden && resumeRef.current) {
        resumeRef.current = false;
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => setPlaying(false));
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      detach();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    releaseGesture.current?.();
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setUnavailable(true);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/our-story-demo.mp3"
        loop
        preload="auto"
        onError={() => setUnavailable(true)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        autoPlay
      />
      <button
        type="button"
        data-audio-toggle=""
        onClick={toggle}
        disabled={unavailable}
        className="flex items-center gap-2 rounded-full border border-[#B99A63]/30 bg-[#171615]/80 px-3.5 py-1.5 text-[9px] font-medium tracking-[0.16em] text-[#E8DCC9] backdrop-blur-sm transition-all hover:border-[#B99A63] hover:text-[#B99A63] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex h-3 items-center gap-0.5">
          {[0, 120, 240].map((delay) => (
            <i
              key={delay}
              style={{ animationDelay: `${delay}ms` }}
              className={`block w-[1.5px] origin-center rounded-full bg-[#B99A63] ${
                playing ? "h-3 animate-[equalize_.45s_ease-in-out_infinite_alternate]" : "h-1"
              }`}
            />
          ))}
        </span>
        <span>{unavailable ? "NHẠC ĐANG TẢI" : playing ? "TẠM DỪNG" : "PHÁT NHẠC"}</span>
      </button>
    </>
  );
}
