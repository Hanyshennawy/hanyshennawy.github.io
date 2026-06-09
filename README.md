# Hany Moussa — Personal Portfolio

A world-class, single-page portfolio for **Hany Moussa**, Principal Project
Manager (Strategy, Transformation & AI in Education). Built spec-first with
[GitHub Spec Kit](https://github.com/github/spec-kit); engineered for clarity,
performance, accessibility, and restrained editorial craft.

## Tech stack

- **Vite + TypeScript** — fast, tiny, framework-free static build
- **GSAP** (ScrollTrigger + SplitText) — entrance, scroll, and counter motion
- **Lenis** — inertial smooth scrolling, synced to the GSAP ticker
- **Self-hosted type** — Clash Display + General Sans (Fontshare), bundled by Vite
- **OKLCH** restrained palette — tinted near-black canvas, warm ink, one amber accent

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run typecheck
```

## Add your photo

Drop a portrait at **`public/images/hany-moussa.jpg`** (portrait ratio, roughly
900 × 1100 or larger). Until then a typographic placeholder is shown. No code
changes are needed; the filename is already wired up.

## Edit the content

All copy lives as plain, semantic HTML in [`index.html`](./index.html) so it is
SEO-friendly and works even before JavaScript loads. Update text, metrics,
projects, and experience there. Design tokens (color, type scale, spacing) live
in [`src/styles/tokens.css`](./src/styles/tokens.css).

## Deploy to GitHub Pages (free)

This repo includes a ready workflow at
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

1. Create a GitHub repository and push this project to the `main` branch.
2. In the repo, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or run the workflow manually). The site builds and publishes
   automatically.

The Vite `base` is set to `./` (relative), so the site works whether it is served
from `username.github.io` or a project subpath like `username.github.io/repo`
without any extra configuration.

> For best link-preview support, export `public/images/og-image.svg` to a 1200×630
> PNG and set absolute `og:image` / `twitter:image` URLs in `index.html` once your
> domain is known.

## Accessibility & motion

- Respects `prefers-reduced-motion`: smooth scroll, parallax, counters, and
  entrance animations are disabled and all content is shown statically.
- Full keyboard support with visible focus states and a skip link.
- Semantic landmarks, logical heading order, and AA-targeted contrast.

## Project provenance (Spec Kit)

- Constitution: [`.specify/memory/constitution.md`](./.specify/memory/constitution.md)
- Specification, plan, research, tasks:
  [`specs/001-world-class-portfolio/`](./specs/001-world-class-portfolio/)

## License

MIT for the code. Personal content, the CV, and the photograph remain the
property of Hany Moussa.
