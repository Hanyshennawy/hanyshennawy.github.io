---
description: "Task list for the world-class personal portfolio"
---

# Tasks: World-Class Personal Portfolio

**Input**: Design documents from `specs/001-world-class-portfolio/`

**Prerequisites**: plan.md, spec.md, research.md

**Status**: All tasks complete and verified (2026-06-09). Build green, no type errors; desktop/mobile and menu validated in-browser; no horizontal overflow at 390px or 1440px.

**Tests**: No automated test suite for v1 (static marketing page). Quality is gated
by `tsc --noEmit`, a clean production build, and manual acceptance against the
Success Criteria (Lighthouse, keyboard, reduced-motion, responsive).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: can run in parallel (different files, no dependency)
- **[Story]**: US1-US4 or SETUP/FOUND/DEPLOY

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 SETUP Scaffold Vite + vanilla-TS project at repo root (package.json, tsconfig.json, vite.config.ts with `base: './'`).
- [x] T002 SETUP Install runtime deps: `gsap`, `lenis`. Confirm versions (gsap >=3.13).
- [x] T003 [P] SETUP Add `src/styles/reset.css` (modern reset, box-sizing, media defaults, focus-visible base).
- [x] T004 [P] SETUP Add `src/styles/tokens.css`: self-hosted `@font-face` (display + text), OKLCH color tokens (tinted neutrals + single accent), fluid type scale (>=1.25), spacing scale, radius, motion easings.
- [x] T005 [P] SETUP Self-host font woff2 in `src/fonts/` so Vite bundles and fingerprints them; declare `@font-face` with `font-display: swap`.

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T006 FOUND Author all content (Profile, Metrics, Projects, Experience, Credentials, Capabilities) directly as semantic, accessible HTML in `index.html` from the CV only, for SEO and no-JS resilience.
- [x] T007 FOUND Build `index.html` shell: semantic landmarks, `<title>`, meta description, Open Graph + Twitter tags, theme-color, favicon, font preloads, skip-link.
- [x] T008 FOUND Progressive enhancement: `src/modules/*` enhance the static DOM (no client-side render step); content is server-static in `index.html`.
- [x] T009 FOUND Implement reduced-motion utility + `src/modules/smoothScroll.ts` (Lenis + GSAP ticker sync, guarded by `prefers-reduced-motion`).
- [x] T010 FOUND Wire `src/main.ts` entry: import styles, boot smooth scroll, animations, cursor, nav, and dynamic year (all motion guarded by `prefers-reduced-motion`).

**Checkpoint**: Shell renders content with native scroll; motion layer ready.

## Phase 3: User Story 1 - Credibility in 10s (Priority: P1) MVP

- [x] T011 US1 Hero section: oversized name + single strategic outcome line, eyebrow tag (role/location), availability status, scroll cue. Type-driven hierarchy, accent <=10%.
- [x] T012 US1 Hero motion in `animations.ts`: SplitText staggered line reveal + ease-out; static final state under reduced motion.
- [x] T013 US1 Impact band: CV-verified metrics (~25,000 staff, 240,000+ students, 13,000+ educators, 1st place hackathon) emphasized top/left (F-pattern).
- [x] T014 US1 Animated count-up for metrics via ScrollTrigger; respects reduced motion (final values shown instantly).

## Phase 4: User Story 2 - Explore work and outcomes (Priority: P1)

- [x] T015 US2 Work section: curated flagship projects (My Journey, National Competency Framework, Skill Gap Assessment, MurshidAI, Deira App, Aoun) as outcome-led rows with org, role/year, result, tags. Avoid identical-card-grid pattern.
- [x] T016 US2 Restrained hover/interaction cues for project rows (magnetic/underline reveal, no color shout); keyboard focus parity.
- [x] T017 US2 Experience timeline in `index.html` (roles, orgs, locations, dates exactly per CV) with scroll reveals.
- [x] T018 US2 Capabilities marquee (competencies + technical tools) with pause-on-hover and reduced-motion stop.

## Phase 5: User Story 3 - Make contact (Priority: P2)

- [x] T019 US3 About section: long-form bio + photo slot (`public/images/hany-moussa.jpg`) with descriptive alt and typographic fallback if missing.
- [x] T020 US3 Contact zone + footer: giant `mailto:` CTA, LinkedIn (new tab, `rel="noopener noreferrer"`), phone, location, credentials/certifications list.
- [x] T021 US3 Navigation: <=4 destinations, scroll-spy active state, smooth anchor scroll, mobile menu with hamburger-to-X morph and staggered link reveal.

## Phase 6: User Story 4 - Responsive, reduced-motion, a11y (Priority: P2)

- [x] T022 US4 Custom cursor + magnetic buttons gated to `pointer: fine` and non-reduced-motion; never block native pointer on touch.
- [x] T023 US4 Responsive pass: single-column collapse, fluid clamps, 44px touch targets, no horizontal overflow 320-1920px.
- [x] T024 US4 Accessibility pass: heading outline, focus-visible styles, color contrast >=4.5:1, alt text, `aria-current` on nav, reduced-motion verification.

## Phase 7: Deploy and Verify

- [x] T025 [P] DEPLOY Add `.github/workflows/deploy.yml` (build + `upload-pages-artifact` + `deploy-pages`).
- [x] T026 [P] DEPLOY Add `.gitignore`, `README.md` (run/customize photo/deploy), and a social `og-image`.
- [x] T027 DEPLOY Run `tsc --noEmit` and `npm run build`; fix any errors; verify `dist/` output and asset paths.
- [x] T028 DEPLOY Manual acceptance: Lighthouse >=95s, keyboard nav, reduced-motion, mobile 390px, content matches CV.

## Dependencies

- Setup (T001-T005) -> Foundational (T006-T010) -> all user stories.
- US1 and US2 are independent slices after Foundational; US3 depends on nav shell;
  US4 polishes all prior sections. Deploy is last.

## Parallel opportunities

- T003/T004/T005 (separate files) in parallel.
- T025/T026 (separate files) in parallel.
