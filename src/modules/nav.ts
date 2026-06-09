import type Lenis from "lenis";

/**
 * Navigation behaviour that must work regardless of motion preference:
 * scroll-spy, anchor scrolling, the mobile menu, and header reveal-on-scroll.
 */
export function initNav(lenis: Lenis | null): void {
  const header = document.querySelector<HTMLElement>("[data-header]");
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  setupAnchorScroll(lenis, reduceMotion);
  setupScrollSpy(navLinks);
  setupHeader(header);
  setupMobileMenu(lenis);
}

/** Smoothly scroll to in-page targets, accounting for the fixed header. */
function setupAnchorScroll(lenis: Lenis | null, reduceMotion: boolean): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;

      event.preventDefault();
      if (lenis && !reduceMotion) {
        lenis.scrollTo(target, { offset: -72, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  });
}

/** Highlight the nav item for the section currently in view. */
function setupScrollSpy(navLinks: HTMLAnchorElement[]): void {
  const map = new Map<string, HTMLAnchorElement>();
  navLinks.forEach((link) => {
    const id = link.getAttribute("href")?.slice(1);
    if (id) map.set(id, link);
  });

  const sections = Array.from(map.keys())
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.removeAttribute("aria-current"));
        const active = map.get(entry.target.id);
        active?.setAttribute("aria-current", "true");
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/** Hide the header when scrolling down, reveal on scroll up, tint when scrolled. */
function setupHeader(header: HTMLElement | null): void {
  if (!header) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle("header--scrolled", y > 8);
    if (y > lastY && y > 420) {
      header.classList.add("header--hidden");
    } else {
      header.classList.remove("header--hidden");
    }
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true },
  );
}

/** Full-screen mobile menu with morphing toggle and scroll lock. */
function setupMobileMenu(lenis: Lenis | null): void {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!toggle || !menu) return;

  const links = menu.querySelectorAll<HTMLAnchorElement>("[data-menu-link]");

  const open = () => {
    menu.hidden = false;
    // Allow the browser to apply `display` before transitioning the clip-path.
    requestAnimationFrame(() => menu.classList.add("is-open"));
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
    lenis?.stop();
  };

  const close = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
    lenis?.start();
    const onEnd = () => {
      menu.hidden = true;
      menu.removeEventListener("transitionend", onEnd);
    };
    menu.addEventListener("transitionend", onEnd);
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    isOpen ? close() : open();
  });

  links.forEach((link) => link.addEventListener("click", close));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      close();
    }
  });
}
