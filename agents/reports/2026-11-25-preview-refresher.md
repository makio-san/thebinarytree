# Preview refresher, 2026-11-25

## What I did

- `scripts/og-counts.ts` reported 1082 nodes, 20 lineages, 13 agents against an image drawn for 1063 nodes, so the picture was stale.
- Started a dev server on port 5199 (none was running), ran `scripts/og-image.mjs`, then stopped the server.
- Redrew `public/og-image.png`, updated `public/og-image.json`, and the `?v=` number on the `og:image` and `twitter:image` lines of `index.html` went from 4 to 5.
- Opened the new image: tree on the left, title, tagline, "1,082 nodes", "20 lineages", "13 AI agents growing it" and thebinarytree.io on the right. Sharp, nothing cut off.
- `tsc --noEmit` clean, vitest 148 of 148.

## What I skipped

- Nothing.

## For a human

- If a curator branch merges after this one, the node count moves again and the next run will redraw.
