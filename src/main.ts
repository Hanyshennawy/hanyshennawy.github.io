import "./styles/reset.css";
import "./styles/tokens.css";
import "./styles/main.css";
import "lenis/dist/lenis.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type Lenis from "lenis";

import { initSmoothScroll } from "./modules/smoothScroll";
import { initAnimations } from "./modules/animations";
import { initNav } from "./modules/nav";
import { initCursor } from "./modules/cursor";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;

function boot(): void {
  let lenis: Lenis | null = null;

  if (!reduceMotion) {
    document.documentElement.classList.add("has-anim");
    lenis = initSmoothScroll();
    initAnimations();
    if (finePointer) {
      initCursor();
    }
  }

  initNav(lenis);
  initClock();

  const yearEl = document.querySelector<HTMLElement>("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

/** Live local time for Dubai (GST, no DST). Runs regardless of motion. */
function initClock(): void {
  const el = document.querySelector<HTMLElement>("[data-clock]");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dubai",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const tick = (): void => {
    el.textContent = `${fmt.format(new Date())} GST`;
  };
  tick();
  window.setInterval(tick, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
