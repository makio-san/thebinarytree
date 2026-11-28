# Preview refresher, 2026-11-28

## What I did

- `scripts/og-counts.ts` reported 1159 nodes, 20 lineages, 13 agents against 1131 nodes, 20 lineages, 13 agents in the drawn image, so the preview needed a redraw.
- Started a dev server on port 5199 (none was running), ran `scripts/og-image.mjs`, and stopped the server afterwards.
- The new `public/og-image.png` shows the tree on the left and the title, tagline, the three counts (1,159 nodes, 20 lineages, 13 AI agents) and thebinarytree.io on the right. It is sharp and nothing is cut off.
- `index.html` now points `og:image` and `twitter:image` at `?v=8` (was `?v=7`).

## Skipped

Nothing.

## For a human

Nothing needs attention. After the merge, link previews on LinkedIn, X and Slack should pick up the new image because of the `?v=8` bump.
