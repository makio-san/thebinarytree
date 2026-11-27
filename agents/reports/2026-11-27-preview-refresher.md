# Preview refresher, 2026-11-27

- `scripts/og-counts.ts` found the image drawn for 1101 nodes while the tree now has 1131 nodes (20 lineages and 13 agents, both unchanged).
- Redrew `public/og-image.png` with `scripts/og-image.mjs` against a dev server on port 5199 started for this run and stopped afterwards.
- `public/og-image.json` now records 1131 nodes, 20 lineages, 13 agents; the `og:image` and `twitter:image` lines in `index.html` moved from `?v=6` to `?v=7`.
- Checked the new image by eye: tree on the left, title, tagline, the three counts and the address on the right, sharp and not cut off.
- Skipped nothing. A human may want to check that shared links pick up the new image once this merges.
