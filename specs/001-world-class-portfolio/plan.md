# Implementation Plan: World-Class Personal Portfolio

**Branch**: `001-world-class-portfolio` | **Date**: 2026-06-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-world-class-portfolio/spec.md`

## Summary

Deliver a single-page, editorially-driven personal portfolio that lets executives
and recruiters grasp Hany Moussa's national-scale impact in seconds, explore curated
flagship work, and make contact. Built with Vite + vanilla TypeScript, animated with
GSAP (ScrollTrigger + SplitText) over Lenis smooth scroll, styled with a restrained
OKLCH near-monochrome system and self-hosted editorial typography, and deployed as a
static bundle to GitHub Pages via GitHub Actions.

## Technical Context

**Language/Version**: TypeScript 5.x, ES2022 modules

**Primary Dependencies**: Vite 5/7, gsap (ScrollTrigger, SplitText), lenis

**Storage**: N/A (static content authored as a typed TS data module)

**Testing**: Manual acceptance against Success Criteria + `tsc --noEmit` type gate +
production build verification; Lighthouse audit pass

**Target Platform**: Evergreen browsers, mobile-first; GitHub Pages static hosting

**Project Type**: Static single-page web (frontend only)

**Performance Goals**: Lighthouse >= 95 (Perf/A11y/BP/SEO), LCP < 2.5s, CLS < 0.1,
animations sustained at 60fps via transform/opacity only

**Constraints**: No backend; `prefers-reduced-motion` fully honored; nav <= 4; one
accent <= 10% per view; no banned anti-patterns; content strictly from CV

**Scale/Scope**: ~6 sections, ~6 flagship projects, ~6 experience entries, one page

## Constitution Check

*GATE: must pass before and after design.*

| Principle | Plan compliance |
|-----------|-----------------|
| I. Editorial hierarchy | Giant display headlines per section; metrics top/left; type scale ratio >=1.25; body <=75ch |
| II. Decision economy | 4 nav items; one CTA per section |
| III. Performance | Vanilla TS, tree-shaken GSAP, transform/opacity only, ScrollTrigger not scroll listeners, preloaded subset fonts |
| IV. Inclusive AA | Semantic landmarks, keyboard focus, contrast >=4.5:1, reduced-motion kill switch |
| V. Restrained craft | OKLCH tinted neutrals + single accent; exponential ease-out; banned-pattern checklist enforced; no em dashes |

**Result**: PASS. No violations; Complexity Tracking empty.

## Project Structure

### Documentation (this feature)

```text
specs/001-world-class-portfolio/
├── plan.md          # This file
├── spec.md          # Feature specification
├── research.md      # Phase 0 decisions
└── tasks.md         # Phase 2 task list
```

### Source Code (repository root)

```text
index.html                  # App shell, meta/OG tags, font preloads, section markup
public/
└── images/                 # hany-moussa.jpg (user-supplied), og-image, favicon
src/
├── main.ts                 # Entry: boot motion, sections, year, nav
├── data/
│   └── content.ts          # Typed single source of truth (CV-derived content)
├── styles/
│   ├── reset.css           # Modern reset + base
│   ├── tokens.css          # OKLCH color, type scale, spacing, fonts (@font-face)
│   └── main.css            # Layout + component styles per section
├── modules/
│   ├── smoothScroll.ts     # Lenis init + GSAP ticker sync + reduced-motion guard
│   ├── animations.ts       # ScrollTrigger/SplitText reveals, counters, marquee
│   ├── cursor.ts           # Custom cursor + magnetic interactions (pointer:fine only)
│   ├── nav.ts              # Scroll-spy, anchor scroll, mobile menu morph
│   └── render.ts           # Render sections from content.ts into the DOM
└── vite-env.d.ts
vite.config.ts              # base: './', build options
tsconfig.json
.github/workflows/deploy.yml # GitHub Pages build + deploy
README.md                   # Run, customize photo, deploy instructions
```

**Structure Decision**: Single static frontend project. Content is fully decoupled
into `src/data/content.ts` so copy/metrics can be edited without touching markup or
logic, satisfying FR-012 traceability and easing future updates.

**Implementation note (delivered)**: Content is authored directly as semantic,
accessible HTML in `index.html` rather than via a `content.ts` + `render.ts`
render step. This maximizes SEO and progressive enhancement (the page is fully
readable before and without JavaScript), while `src/modules/*` enhance the static
DOM. Self-hosted fonts live in `src/fonts/` and are bundled by Vite. The single,
traceable content source (FR-012) and every constitution gate remain satisfied.

## Implementation Phases

1. **Setup**: scaffold Vite+TS, install deps, config base path, tokens, fonts, reset.
2. **Foundational**: app shell (`index.html`), content data module, render pipeline,
   reduced-motion utility, smooth-scroll boot. Blocks all UI stories.
3. **US1 (P1)**: Hero + Impact band (credibility in 10s).
4. **US2 (P1)**: Work showcase + Experience timeline + capabilities marquee.
5. **US3 (P2)**: Contact zone + footer + nav CTAs.
6. **US4 (P2)**: Responsive collapse + reduced-motion + a11y polish.
7. **Deploy**: GitHub Actions workflow, README, build verification, Lighthouse pass.

## Complexity Tracking

> No constitution violations. Section intentionally empty.
