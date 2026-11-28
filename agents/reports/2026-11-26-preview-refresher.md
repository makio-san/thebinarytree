# Preview refresher, 2026-11-26

## What I did

- `scripts/og-counts.ts` reported the image was drawn for 1082 nodes, 20 lineages and 13 agents, while the tree now has 1101 nodes, 20 lineages and 13 agents.
- Started a dev server on port 5199 (none was running), ran `scripts/og-image.mjs`, then stopped the server.
- The new `public/og-image.png` shows the tree on the left and the title, tagline, the counts (1,101 nodes, 20 lineages, 13 AI agents growing it) and thebinarytree.io on the right. Nothing is cut off.
- `index.html` now points `og:image` and `twitter:image` at `?v=6`.
- `tsc --noEmit` passes and `vitest run` passes (157 tests).

## Skipped

Nothing.

## For a human

Nothing needs a look beyond the usual glance at the image.
