import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * All scroll-linked and entrance motion. Invoked only when the user has not
 * requested reduced motion, so every effect here is purely additive.
 */
export function initAnimations(): void {
  heroReveal();
  revealOnScroll();
  animateCounters();
  initMarquee();
  initGallery();

  // Keep trigger positions correct after layout shifts (font swap, resize).
  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
  });
}

/** Masked, staggered line reveal for the hero headline. */
function heroReveal(): void {
  const title = document.querySelector<HTMLElement>(".hero__title");
  if (!title) return;

  const split = new SplitText(title, { type: "lines", linesClass: "hero-line" });

  // Wrap each line in an overflow-hidden mask for a clean rise.
  split.lines.forEach((line) => {
    const mask = document.createElement("span");
    mask.className = "hero-line-mask";
    line.parentNode?.insertBefore(mask, line);
    mask.appendChild(line);
  });

  const tl = gsap.timeline({ delay: 0.2 });
  tl.from(split.lines, {
    yPercent: 120,
    duration: 1.1,
    ease: "expo.out",
    stagger: 0.1,
  });
  tl.from(
    ".hero__top, .hero__bottom, .hero__scroll",
    { opacity: 0, y: 24, duration: 0.9, ease: "expo.out", stagger: 0.08 },
    "-=0.7",
  );
}

/** Batched fade-and-rise for everything tagged [data-reveal]. */
function revealOnScroll(): void {
  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    once: true,
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        overwrite: true,
      });
    },
  });
}

/** Count-up for metric figures. Static HTML already holds final values. */
function animateCounters(): void {
  const counters = gsap.utils.toArray<HTMLElement>("[data-count]");
  const formatter = new Intl.NumberFormat("en-US");

  counters.forEach((el) => {
    const target = Number(el.dataset.count ?? "0");
    const proxy = { value: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(proxy, {
          value: target,
          duration: 2,
          ease: "expo.out",
          onUpdate: () => {
            el.textContent = formatter.format(Math.round(proxy.value));
          },
        });
      },
    });
  });
}

/** Seamless, hover-slowed marquee for the expertise band. */
function initMarquee(): void {
  const track = document.querySelector<HTMLElement>(".marquee__track");
  const marquee = track?.closest<HTMLElement>(".marquee");
  if (!track || !marquee) return;

  // Duplicate content so the loop reads as continuous.
  track.innerHTML = track.innerHTML + track.innerHTML;

  const tween = gsap.to(track, {
    xPercent: -50,
    ease: "none",
    duration: 32,
    repeat: -1,
  });

  marquee.addEventListener("pointerenter", () => tween.timeScale(0.2));
  marquee.addEventListener("pointerleave", () => tween.timeScale(1));
}

/**
 * Pinned horizontal scrub for the "In the Field" gallery: vertical scroll drives
 * the rail sideways. Only on wide, fine-pointer viewports; everywhere else the
 * CSS leaves a native horizontal scroll rail.
 */
function initGallery(): void {
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (!finePointer || window.innerWidth < 1024) return;

  const section = document.querySelector<HTMLElement>("[data-gallery]");
  const rail = document.querySelector<HTMLElement>("[data-gallery-rail]");
  const track = document.querySelector<HTMLElement>("[data-gallery-track]");
  if (!section || !rail || !track) return;

  section.classList.add("gallery--pinned");

  const amount = (): number => Math.max(0, track.scrollWidth - rail.clientWidth);
  if (amount() <= 0) {
    section.classList.remove("gallery--pinned");
    return;
  }

  const tween = gsap.to(track, { x: () => -amount(), ease: "none" });

  ScrollTrigger.create({
    trigger: rail,
    start: "top top",
    end: () => "+=" + amount(),
    pin: true,
    scrub: 0.6,
    animation: tween,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  });

  // Image widths set the track size, so recalc once everything has loaded.
  window.addEventListener("load", () => ScrollTrigger.refresh());
}
