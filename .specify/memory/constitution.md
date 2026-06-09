# Hany Moussa Portfolio Constitution

A single-page, world-class personal portfolio for Hany Moussa (Principal Project
Manager | Strategy, Transformation & AI in Education). The site must read as a
$150k agency build, not a template. Design IS the product (brand register).

## Core Principles

### I. Editorial Typographic Hierarchy (NON-NEGOTIABLE)

Attention is directed through type scale and weight, never through loud color.
Every section leads with a massive, elegantly weighted statement of a single
strategic outcome. Type scale steps keep a >=1.25 ratio; body copy is capped at
65-75ch. The most critical proof points (impact metrics, governance results) are
placed along the top and left margins to honor F-pattern scanning. This directly
encodes the client's brief and NN/g heuristics.

### II. Decision Economy (Hick's Law)

Primary navigation never exceeds four destinations. Each section presents one
clear next action. Choice is curated, not dumped. Cognitive load is treated as a
budget that must not be overspent.

### III. Performance Is a Feature

Target Lighthouse Performance >= 95 on a mid-tier mobile profile. Animate only
`transform` and `opacity`; never animate layout properties. Use IntersectionObserver
or GSAP ScrollTrigger, never raw scroll-event reflow loops. `backdrop-filter` is
restricted to fixed/sticky layers. Total JS payload stays lean; fonts are
preloaded and subset where possible. Largest Contentful Paint < 2.5s.

### IV. Inclusive by Default (WCAG 2.1 AA)

Text/background contrast >= 4.5:1 (>= 3:1 for large display type). Full keyboard
operability with visible focus states. Semantic landmarks and a logical heading
outline. `prefers-reduced-motion` MUST disable smooth scroll, parallax, and
entrance animations, leaving a fully usable static experience. All meaningful
imagery has alt text.

### V. Restrained Craft, Zero Slop

Restrained color strategy: tinted near-neutrals plus a single accent used on
<=10% of any view. No pure `#000`/`#fff`; neutrals are tinted toward the brand
hue (OKLCH). Motion eases out with exponential curves, no bounce or elastic.
BANNED: gradient text (`background-clip:text`), side-stripe accent borders,
default glassmorphism, the big-number hero-metric cliche template, identical
card grids, and modal-first patterns. Copy contains NO em dashes and no restated
headings. If a viewer could say "AI made that," it has failed.

## Technology Constraints

- Build: Vite + vanilla TypeScript (no heavyweight UI framework).
- Motion: GSAP (3.13+, fully free) with ScrollTrigger + SplitText; Lenis for
  smooth scroll, synced to the GSAP ticker.
- Fonts: licensed-for-web display + text families (Fontshare/self-hosted).
  Banned families: Inter, Roboto, Arial, Helvetica, Open Sans.
- Hosting: GitHub Pages (free), deployed via GitHub Actions. Vite `base` set for
  path portability. No backend, no database, no tracking that needs consent.
- Content is sourced solely from the verified CV; no fabricated facts, titles,
  dates, or metrics.

## Quality Gates

A change ships only when: production build succeeds with zero type errors; the
page is keyboard navigable; reduced-motion renders cleanly; nav has <=4 items;
no banned pattern from Principle V is present; and all metrics/dates match the
CV. Visual review confirms the editorial hierarchy and breathing whitespace
(section padding is generous, never cramped).

## Governance

This constitution supersedes ad-hoc preferences. Any deviation must be recorded
in the plan's Complexity Tracking with a justification and the simpler rejected
alternative. Amendments are versioned semantically: MAJOR for principle
removals/redefinitions, MINOR for new principles/sections, PATCH for
clarifications.

**Version**: 1.0.0 | **Ratified**: 2026-06-09 | **Last Amended**: 2026-06-09
