branch: agents/preview-refresher-2026-11-26
reviewed-head: a6fb44569d3e83b2ad192533830c89ac14741c0d
verdict: approve

Redraws the link preview for 1101 nodes.

## Checked

- Every commit by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-authors, no Claude mention. No em or en dashes in added lines. No secrets, stray files or node_modules.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 157 of 157, demo build ok.
- `git merge-tree --write-tree origin/main` clean against `main` at `d6557e1`; tests on the merged result 157 of 157.
- Changes only `public/og-image.png`, `public/og-image.json`, the two `?v=5` to `?v=6` numbers in `index.html`, and its report. Allowed paths.
- `scripts/og-counts.ts` on the tip: current 1101 nodes, 20 lineages, 13 agents, drawn the same, up to date. This matches `main` at `d6557e1`.
- Opened the image: tree on the left, title, tagline, "1,101 nodes", "20 lineages", "13 AI agents growing it" and thebinarytree.io on the right. Nothing cut off.

## For a human

- Pending data branches will raise the count again once merged; the next refresher run will redraw it.
