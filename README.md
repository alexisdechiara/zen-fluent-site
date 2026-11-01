# Zen Fluent website

The site of [Zen Fluent](https://github.com/alexisdechiara/zen-fluent), the
Fluent / WinUI 3 mod for Zen Browser: <https://zen-fluent-site.vercel.app>.

Vite, React and TypeScript, deployed on Vercel. No UI framework: the styles
in `src/styles.css` follow WinUI 3 / Fluent 2 tokens, in light and dark.

## Pages

- `/`: overview, with the interactive browser (hotspots), the before / after
  slider, the two mods and the install steps.
- `/mods`: features, Zen Fluent Enhanced and the compatible mods.
- `/changelog`: every release.

## Data from the mod's repository

`npm run build` first runs `scripts/sync.mjs`, which pulls from
`alexisdechiara/zen-fluent` (branch `main`):

- `CHANGELOG.md` → `src/data/CHANGELOG.md` (the changelog page and the version
  shown everywhere),
- `enhanced/settings/compatible-mods.json` → `src/data/compatible-mods.json`
  (only the mods with `supported` or `partial` status are listed),
- the release tags → `src/data/tags.json`.

So a Vercel redeploy is enough after a release. When GitHub cannot be reached,
the committed copies are used.

## Images

- `public/shots/`: the mod's README screenshots in WebP. Refresh them with
  `npm run images -- ../zen-fluent/screenshots`.
- `public/compare/`: the before / after pair (`zen-default-*.webp`,
  `zen-fluent-*.webp`), same window, same size. The pairs are declared in
  `src/data/compare.ts` (a `dark` pair is used in the dark theme when
  present).
- Hotspot positions and texts: `src/data/hotspots.ts` (percent of the
  1280 × 800 screenshot).

## Develop

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview
```
