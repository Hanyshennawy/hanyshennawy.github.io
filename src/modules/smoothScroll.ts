import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Inertial smooth scrolling driven by the GSAP ticker so that ScrollTrigger and
 * Lenis share a single render loop. Only called when motion is permitted.
 */
export function initSmoothScroll(): Lenis {
  const lenis = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 1,
    smoothWheel: true,
    touchMultiplier: 1.6,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}
