# Phase 0 Research: World-Class Portfolio

**Feature**: 001-world-class-portfolio | **Date**: 2026-06-09

## Decision 1: Build tooling

**Decision**: Vite + vanilla TypeScript (no React/Vue).

**Rationale**: A single marketing page needs no virtual DOM or routing. Vanilla TS
keeps the JS payload tiny (supports Performance principle), gives full control over
bespoke motion, and removes framework "smell" that pushes output toward templated
slop. Vite gives instant HMR, fingerprinted static output, and a documented GitHub
Pages path.

**Alternatives rejected**: Next.js/Astro (heavier, SSR features unused for a static
single page); plain HTML with no bundler (loses TS safety, font/asset fingerprinting,
and tree-shaking of GSAP).

## Decision 2: Motion stack

**Decision**: GSAP 3.13+ with ScrollTrigger and SplitText, plus Lenis smooth scroll
synced to the GSAP ticker.

**Rationale**: Verified that GSAP and all plugins (ScrollTrigger, SplitText,
ScrollSmoother) are now fully free under Webflow. GSAP gives frame-accurate,
GPU-friendly tweens and the exponential ease-out curves the constitution demands.
Lenis (MIT) provides best-in-class inertia scrolling and integrates with ScrollTrigger
via a single ticker loop. SplitText enables the per-line/character headline reveals
characteristic of award-tier editorial sites.

**Integration pattern (verified)**:

```js
const lenis = new Lenis({ lerp: 0.1 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

**Reduced motion**: Guard all of the above behind
`matchMedia('(prefers-reduced-motion: reduce)')`. When reduced, skip Lenis entirely,
do not register entrance tweens, and set final states immediately.

**Alternatives rejected**: Framer Motion (React-only); AOS (low-craft, scroll-listener
based); pure CSS scroll animations (insufficient control for staggered line reveals
and pinned sequences).

## Decision 3: Typography

**Decision**: Self-host display + text families from Fontshare. Display: a wide
contemporary grotesk for the giant editorial headlines; Text: a neutral, highly
legible grotesk for body and UI. Provide a robust system fallback stack to prevent
layout shift.

**Rationale**: Constitution bans Inter/Roboto/Arial/Helvetica/Open Sans. Fontshare
fonts (e.g., Clash Display, General Sans, Satoshi) are free for commercial use, load
fast when self-hosted and preloaded, and carry the editorial character the
dennissnellenberg reference embodies. Self-hosting avoids third-party requests
(Best Practices, privacy).

**Alternatives rejected**: Google Fonts CDN (extra origin, banned families dominate);
proprietary "Dennis Sans"/"SuisseIntl" from the references (not licensed to us).

## Decision 4: Color strategy

**Decision**: Restrained. Tinted near-black canvas and warm off-white ink in OKLCH,
with one electric-blue accent used on <=10% of any view (links, focus, a single
hero detail). No pure black or white.

**Rationale**: Encodes the client's explicit instruction ("do not use bold colors to
draw attention; use size and weight") and the constitution's restrained strategy. A
near-monochrome canvas lets typography carry hierarchy and makes the lone accent feel
intentional and premium, echoing both references.

**Alternatives rejected**: Full multi-color palette (fights the typographic hierarchy);
pure black/white like raw Rejouice (we want warmth and depth, not a clone).

## Decision 5: Hosting and base path

**Decision**: GitHub Pages via GitHub Actions (`upload-pages-artifact` + `deploy-pages`).
Vite `base: './'` (relative) so assets resolve whether served from a user site or a
project subpath, with no need to hardcode the repository name.

**Rationale**: The repository name is unknown at build time. Relative base is bulletproof
for a single `index.html` site and removes a common GitHub Pages 404 failure mode. The
Actions workflow is the Vite-documented, modern approach (Pages Source = GitHub Actions).

**Alternatives rejected**: Hardcoded `/repo-name/` base (breaks if renamed); `gh-pages`
branch push (older pattern, more manual steps).

## Decision 6: Information architecture (NN/g)

**Decision**: One page, four nav destinations (Work, About, Contact, plus the logo as
Home), F-pattern emphasis with metrics top/left, and one CTA per section.

**Rationale**: Hick's Law caps choices; F-pattern matches executive scanning; a single
strong CTA per section reduces decision cost. Sections beyond nav (Impact, Experience)
are reachable by scroll and from About, keeping the menu minimal.

**Alternatives rejected**: Multi-page site with a top nav of 6+ links (violates Hick's
Law and adds routing for no content benefit).

## Open risks

- Photograph asset must be provided by the user; mitigated by a typographic fallback.
- SplitText reflow on resize must re-run safely; mitigated by `ScrollTrigger.refresh()`
  and a debounced re-split on breakpoint change.
