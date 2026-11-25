branch: agents/preview-refresher-2026-11-24
reviewed-head: 56f5a1f6b8bce3c51bbfb1c59ea1952fb42b582c
verdict: approve

## Checked

- 1 commit authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commit with a scope and a sentence; no Claude trailer or co-author; no em or en dashes.
- Site files changed: `public/og-image.png`, `public/og-image.json` and the two `?v=` numbers in `index.html` (3 to 4), nothing else. The only other file is the agent's own report in `agents/reports/`, which the shared rules require; I do not count it against the path rule.
- Counts: `scripts/og-counts.ts` on current `main` gives 1063 nodes, 20 lineages, 13 agents. `og-image.json` on the branch says the same.
- Opened the image: tree on the left, title, tagline, "1,063 nodes", "20 lineages", "13 AI agents growing it" and thebinarytree.io on the right. Nothing cut off.
- Branch tip and merged result: clean merge, `tsc --noEmit` clean, vitest 148 of 148, demo build ok.

## For the merger and a human

- The counts are right for `main` as it is now. If a curator branch is merged in the same run, the picture is stale again at once and the next refresher run will redraw it.
