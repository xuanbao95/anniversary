"use client";

import { useEffect } from "react";

function screens() {
  const hero = document.getElementById("top");
  const chapters = [...document.querySelectorAll<HTMLElement>("[id^='chapter-']")];
  return [hero, ...chapters].filter((node): node is HTMLElement => Boolean(node));
}

function fitsOneScreen(node: HTMLElement) {
  return node.offsetHeight <= window.innerHeight * 1.15;
}

export function ChapterPager() {
  useEffect(() => {
    const syncSnap = () => {
      const list = screens();
      document.documentElement.classList.toggle("chapter-snap", list.length > 1 && list.every(fitsOneScreen));
    };

    syncSnap();
    window.addEventListener("resize", syncSnap);
    return () => {
      window.removeEventListener("resize", syncSnap);
      document.documentElement.classList.remove("chapter-snap");
    };
  }, []);

  return null;
}
