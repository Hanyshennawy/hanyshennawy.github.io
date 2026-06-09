import { gsap } from "gsap";

/**
 * Custom cursor and magnetic interactions. Only initialised on fine-pointer,
 * motion-allowed devices, so touch and reduced-motion users keep native input.
 */
export function initCursor(): void {
  const cursor = document.querySelector<HTMLElement>(".cursor");
  if (!cursor) return;

  document.body.classList.add("has-cursor");

  const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
  const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });

  window.addEventListener(
    "pointermove",
    (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
    },
    { passive: true },
  );

  // Grow the ring over interactive elements.
  const interactive = document.querySelectorAll<HTMLElement>(
    "a, button, [data-magnetic]",
  );
  interactive.forEach((el) => {
    el.addEventListener("pointerenter", () =>
      document.body.classList.add("cursor-hover"),
    );
    el.addEventListener("pointerleave", () =>
      document.body.classList.remove("cursor-hover"),
    );
  });

  // Magnetic pull for tagged elements.
  const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");
  magnets.forEach((el) => {
    const strength = 0.4;
    let cx = 0;
    let cy = 0;

    el.addEventListener("pointerenter", () => {
      const rect = el.getBoundingClientRect();
      cx = rect.left + rect.width / 2;
      cy = rect.top + rect.height / 2;
    });

    el.addEventListener("pointermove", (event) => {
      gsap.to(el, {
        x: (event.clientX - cx) * strength,
        y: (event.clientY - cy) * strength,
        duration: 0.4,
        ease: "power3.out",
      });
    });

    el.addEventListener("pointerleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    });
  });
}
