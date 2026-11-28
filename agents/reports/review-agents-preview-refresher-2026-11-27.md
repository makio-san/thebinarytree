branch: agents/preview-refresher-2026-11-27
reviewed-head: 577368ff3b943bcbadc7ac77b034cb2c6648c3b2
verdict: approve

## Reasons

Changes only `public/og-image.png`, `public/og-image.json`, the two `?v=6` to `?v=7` numbers in `index.html`, and its report.

## Checked

- `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, run in a throwaway worktree. `git merge-tree --write-tree origin/main` against `db2add08b079ef107af984ae46b8b88fea9d83ed` exits 0. All commits authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in added lines, no stray files.
- `scripts/og-counts.ts` on `origin/main` reports 1131 nodes, 20 lineages, 13 agents with the image drawn for 1101; on the branch it reports up to date.
- Opened the new image: tree on the left, title, tagline, and the counts 1,131 nodes, 20 lineages, 13 AI agents, address underneath, nothing cut off.
