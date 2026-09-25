"use client";

import { useEffect } from "react";

function screens() {
  const nodes = [...document.querySelectorAll<HTMLElement>(".chapter-screen")];
  return [...new Set(nodes)];
}

function fitsOneScreen(node: HTMLElement) {
  return node.offsetHeight <= window.innerHeight * 1.15;
}

export function ChapterPager() {
  useEffect(() => {
    const syncSnap = () => {
      const list = screens();
      const ready = list.length > 1 && list.every(fitsOneScreen);
      const flowing = Boolean(document.querySelector("[data-chapter-flow]"));
      document.documentElement.classList.toggle("chapter-snap", ready && !flowing);
      document.documentElement.classList.toggle("chapter-snap-soft", ready && flowing);
    };

    syncSnap();
    window.addEventListener("resize", syncSnap);
    return () => {
      window.removeEventListener("resize", syncSnap);
      document.documentElement.classList.remove("chapter-snap");
      document.documentElement.classList.remove("chapter-snap-soft");
    };
  }, []);

  return null;
}
