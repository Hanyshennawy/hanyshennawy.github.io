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

## Photos & gallery

Curated, web-optimized photos live in [`public/images/`](./public/images): the
About portrait (`portrait-main.jpg`) and ten `field-*.jpg` images that power the
"In the Field" gallery and the hover previews on linked work rows. The full set
of original photographs is preserved in `assets-source/photos/` (kept in version
control, not shipped to the live site).

To re-curate from new originals: drop them in `public/images/`, edit the mapping
in [`scripts/process-photos.ps1`](./scripts/process-photos.ps1), and run it. It
resizes to web-friendly sizes, applies clean slugs, and archives the originals.

## Downloadable CV

The site serves a branded PDF at `public/Hany-Moussa-CV.pdf`, linked from the
hero, the contact section, and the mobile menu. The source is
[`cv-template/cv.html`](./cv-template/cv.html) (it reuses the site's fonts and
palette). After editing it, regenerate the PDF with:

```powershell
pwsh -File scripts/generate-cv.ps1
```

This renders the PDF with an installed headless Chrome or Edge, so no extra
dependencies are required.

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
