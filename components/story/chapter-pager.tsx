"use client";

import { useEffect } from "react";

function screens() {
  const hero = document.getElementById("top");
  const chapters = [...document.querySelectorAll<HTMLElement>("[id^='chapter-']")];
  return [hero, ...chapters].filter((node): node is HTMLElement => Boolean(node));
}

function screenIndex(list: HTMLElement[]) {
  const mark = window.scrollY + window.innerHeight * 0.35;
  let index = 0;
  list.forEach((node, item) => {
    if (node.offsetTop <= mark) index = item;
  });
  return index;
}

function fitsOneScreen(node: HTMLElement) {
  return node.offsetHeight <= window.innerHeight * 1.15;
}

export function ChapterPager() {
  useEffect(() => {
    let moving = false;
    let idleTimer = 0;

    const syncSnap = () => {
      const list = screens();
      document.documentElement.classList.toggle("chapter-snap", list.length > 1 && list.every(fitsOneScreen));
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || document.querySelector("[data-chapter-scroll-lock]")) return;
      const distance = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? event.deltaY * 16 : event.deltaY;
      if (Math.abs(distance) < 12) return;

      const list = screens();
      if (list.length < 2) return;
      const index = screenIndex(list);
      const current = list[index];

      if (!fitsOneScreen(current)) {
        const top = current.offsetTop;
        const bottom = top + current.offsetHeight - window.innerHeight;
        const goingDown = distance > 0;
        if ((goingDown && window.scrollY < bottom - 4) || (!goingDown && window.scrollY > top + 4)) return;
      }

      event.preventDefault();
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        moving = false;
      }, 680);
      if (moving) return;

      const next = index + (distance > 0 ? 1 : -1);
      if (next < 0 || next >= list.length) return;
      moving = true;
      list[next].scrollIntoView({ behavior: "smooth", block: "start" });
    };

    syncSnap();
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", syncSnap);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", syncSnap);
      window.clearTimeout(idleTimer);
      document.documentElement.classList.remove("chapter-snap");
    };
  }, []);

  return null;
}
