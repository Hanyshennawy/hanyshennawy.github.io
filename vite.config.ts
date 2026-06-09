import { defineConfig } from "vite";

// Relative base ("./") keeps asset URLs portable across GitHub Pages user sites
// (username.github.io) and project subpaths (username.github.io/repo) without
// hardcoding the repository name. See specs/001-world-class-portfolio/research.md.
export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    cssTarget: "chrome100",
    assetsInlineLimit: 2048,
    reportCompressedSize: true,
  },
});
