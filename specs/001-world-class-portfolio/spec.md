# Feature Specification: World-Class Personal Portfolio for Hany Moussa

**Feature Branch**: `001-world-class-portfolio`

**Created**: 2026-06-09

**Status**: Approved

**Input**: User request: "Create an impressive, world-class, dynamic personal
portfolio. Inspired by dennissnellenberg.com and rejouice.com. Must follow NN/g
UX (F-pattern, Hick's Law, typographic hierarchy). Host on GitHub Pages."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Executive / Recruiter scans credibility in 10 seconds (Priority: P1)

A senior government or education-sector decision maker lands on the page and,
without reading paragraphs, must grasp who Hany is, the scale of his impact, and
that he operates at national level. They scan top and left, see a single
commanding statement and headline metrics, and form a strong first impression.

**Why this priority**: First impression decides whether they continue. This is
the MVP: a hero plus an impact band delivers value on its own.

**Independent Test**: Load the site, view only the first viewport plus one scroll.
Confirm name, strategic positioning, and at least three headline metrics
(~25,000 staff, 240,000+ students, 13,000+ educators) are visible and dominant
through size/weight, not color.

**Acceptance Scenarios**:

1. **Given** a first-time visitor, **When** the hero renders, **Then** the name
   and a one-line strategic outcome dominate the viewport via type scale.
2. **Given** the visitor scrolls once, **When** the impact band enters, **Then**
   quantified national-scale metrics animate into view along a left-aligned rhythm.

---

### User Story 2 - Stakeholder explores selected work and outcomes (Priority: P1)

A potential employer or partner wants proof. They browse a curated set of flagship
initiatives (My Journey platform, National Educators' Competency Framework, Skill
Gap Assessment, MurshidAI, Deira App, Aoun) each expressed as an outcome with its
scale, role, and domain.

**Why this priority**: Evidence of capability is the core of a portfolio.

**Independent Test**: Navigate to Work; confirm each project shows a clear
outcome-led title, the organization, the year/role, and a measurable result, with
no fabricated content beyond the CV.

**Acceptance Scenarios**:

1. **Given** the Work section, **When** a visitor hovers a project, **Then** a
   restrained motion cue confirms interactivity without color-shouting.
2. **Given** a project entry, **When** read, **Then** it states scope/scale and
   the visitor's takeaway in one scannable line.

---

### User Story 3 - Interested contact reaches out (Priority: P2)

A convinced visitor wants to connect. They find an unmistakable, low-friction way
to email or open LinkedIn, plus location and availability.

**Why this priority**: Conversion. Valuable but depends on P1 credibility first.

**Independent Test**: From any point, reach the contact affordance within one
action; confirm `mailto:` and LinkedIn open correctly.

**Acceptance Scenarios**:

1. **Given** the footer/contact zone, **When** the visitor clicks the primary CTA,
   **Then** their mail client opens addressed to hany.shennawy@live.com.
2. **Given** the contact zone, **When** the visitor clicks LinkedIn, **Then** the
   correct profile opens in a new tab.

---

### User Story 4 - Mobile and reduced-motion visitor (Priority: P2)

A visitor on a phone, or one who has enabled reduced motion, gets the same
content and hierarchy with layouts collapsed to a single column and animation
suppressed.

**Why this priority**: Inclusivity and reach; a large share of traffic is mobile.

**Independent Test**: Emulate a 390px viewport and toggle `prefers-reduced-motion`;
confirm single-column layout, no smooth-scroll hijack, no entrance animation, and
full readability.

**Acceptance Scenarios**:

1. **Given** reduced-motion is on, **When** the page loads, **Then** content is
   immediately visible with no transform-based reveals and native scrolling.
2. **Given** a 390px viewport, **When** scrolling, **Then** all sections stack,
   touch targets are >=44px, and nothing overflows horizontally.

### Edge Cases

- What happens when the visitor's browser blocks web fonts? Fallback stack keeps
  hierarchy and the layout does not shift jarringly.
- How does the system handle a very tall desktop display? Max content width caps
  line length; whitespace scales rather than text becoming oversized.
- What happens before JS loads or if JS fails? Core content and contact links
  remain readable and usable (progressive enhancement; no blank screen).
- What happens when the user's photo file is absent? A graceful typographic
  placeholder renders instead of a broken image.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST be a single page with anchored sections: Hero, Impact,
  Work, About, Experience, Contact.
- **FR-002**: Primary navigation MUST expose at most four destinations.
- **FR-003**: The hero MUST present the name and one strategic outcome as the
  dominant element via type scale and weight, not color.
- **FR-004**: An impact band MUST present quantified, CV-verified national-scale
  metrics with left/top emphasis (F-pattern).
- **FR-005**: The Work section MUST present curated flagship initiatives, each as
  an outcome-led entry with organization, role/year, and a measurable result.
- **FR-006**: The About section MUST include a concise bio and a slot for the
  professional photograph with descriptive alt text.
- **FR-007**: An experience timeline MUST list roles, organizations, and dates
  exactly as per the CV.
- **FR-008**: The Contact zone MUST provide a `mailto:` primary action, a LinkedIn
  link (opens in new tab, `rel="noopener"`), phone, and location.
- **FR-009**: Entrance and scroll-linked animations MUST use only `transform`/
  `opacity` and MUST be fully disabled under `prefers-reduced-motion`.
- **FR-010**: Smooth scrolling MUST be implemented but MUST degrade to native
  scrolling under reduced motion and on unsupported/touch-constrained contexts.
- **FR-011**: The site MUST be keyboard operable with visible focus and correct
  landmark/heading semantics.
- **FR-012**: All textual content MUST be sourced from the verified CV; no
  invented facts, titles, dates, or numbers.
- **FR-013**: The build MUST output a static bundle deployable to GitHub Pages,
  with asset paths that resolve under a project subpath.
- **FR-014**: The site MUST include accurate document metadata (title, description,
  Open Graph/Twitter tags, favicon) for professional link previews.
- **FR-015**: No banned anti-pattern (gradient text, side-stripe borders, default
  glass, hero-metric cliche, identical card grids, modal-first) may appear.

### Key Entities

- **Profile**: name, title/positioning line, location, email, phone, LinkedIn,
  short and long bio, photo reference.
- **Metric**: label, value, optional qualifier (e.g., "school staff").
- **Project**: title (outcome-led), organization, role, year, result, tags/domain.
- **Experience**: role, organization, location, start, end, highlights.
- **Credential**: award/certification name, issuer, year.
- **Capability**: competency or technical tool label (for the marquee/skills).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time viewer can state Hany's positioning and three impact
  metrics after 10 seconds on the page (first viewport + one scroll).
- **SC-002**: Lighthouse scores >= 95 Performance, >= 95 Accessibility, >= 95 Best
  Practices, >= 95 SEO on a mid-tier mobile profile.
- **SC-003**: Largest Contentful Paint < 2.5s and Cumulative Layout Shift < 0.1 on
  a simulated 4G mobile profile.
- **SC-004**: 100% of interactive elements are reachable and operable by keyboard
  with a visible focus indicator.
- **SC-005**: With `prefers-reduced-motion`, zero transform/opacity entrance
  animations run and scrolling is native, while all content remains present.
- **SC-006**: Primary navigation contains <= 4 items at every breakpoint.
- **SC-007**: No horizontal overflow at 320px-1920px widths.
- **SC-008**: Every metric and date on the page matches the source CV exactly.

## Assumptions

- The visitor's primary goal is professional evaluation (hiring, partnership,
  speaking), not consuming long-form articles.
- The professional photograph will be supplied by the user and placed at the
  documented asset path; a typographic fallback covers its absence.
- English is the sole language for v1; right-to-left support is out of scope.
- Hosting is GitHub Pages with the GitHub Actions build source; no server runtime.
- The MSc (Edinburgh Napier, 2026) is in progress and labeled accordingly.
- Contact is via existing email/LinkedIn; no server-side contact form in v1.
