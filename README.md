# Eos

Personal site of Zoha Rakotomalala — a career told in changing light.
Named for the Greek goddess of dawn; sibling of [Mithra](https://github.com/zoha-rakotomalala/Mithra),
the Persian god of light.

Live at [zoha-rakotomalala.github.io](https://zoha-rakotomalala.github.io).

## Editing the site

Almost everything you will ever want to change lives in **one file**:

```
src/data/scenes.ts
```

- **Change a sentence** → edit the string.
- **Add / remove / reorder a scene** → add, remove, or move an object in the
  `scenes` array. Scroll order = array order.
- **Change a scene's light** → change its `sky` pair (top color, bottom color).
- **Add links to a scene** → fill its `links` array.
- **Add images to a scene** → drop files in `public/images/` and fill the
  scene's `images` array (`src: "/images/name.jpg"`). They render as
  museum-style figures with optional captions.
- **Change the count-up numbers** → the `stats` array on the Paris scene.
- **Change the skill domains** → the `spectrum` array on the spectrum scene.

The CV page is `src/pages/cv.astro` (one document, edited as a whole).
The PDF served by the Download button is `public/cv.pdf` — replace the file
to update it.

Design tokens and reusable classes: `src/styles/global.css`.
The light engine (scroll blending, reveals, count-ups): `src/scripts/sky.ts`.

## Developing

```bash
npm install     # once
npm run dev     # live-reload dev server
npm run build   # production build into dist/
npm run preview # serve the production build locally
```

## Deploying

Push to `main`. The GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages.
One-time setup: repository Settings → Pages → Source = "GitHub Actions".

## The easter egg

Type `eos` anywhere on the page.
