import { gsap } from "gsap";

/**
 * Floating image preview that follows the cursor while hovering work rows that
 * carry a [data-preview] image. Enhancement only: initialised on fine-pointer,
 * motion-allowed devices. The gallery section covers everyone else.
 */
export function initWorkPreview(): void {
  const preview = document.querySelector<HTMLElement>(".work-preview");
  const img = preview?.querySelector<HTMLImageElement>("img");
  const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-preview]"));
  if (!preview || !img || rows.length === 0) return;

  const base = import.meta.env.BASE_URL;
  let current = "";

  gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.9, autoAlpha: 0 });
  const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3" });
  const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3" });

  const show = (src: string) => {
    if (src !== current) {
      img.src = base + src;
      current = src;
    }
    gsap.to(preview, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "expo.out" });
  };
  const hide = () => {
    gsap.to(preview, { autoAlpha: 0, scale: 0.9, duration: 0.35, ease: "power2.out" });
  };

  rows.forEach((row) => {
    const src = row.dataset.preview;
    if (!src) return;
    row.addEventListener("pointerenter", () => show(src));
    row.addEventListener("pointerleave", hide);
    row.addEventListener("pointermove", (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
    });
  });
}
