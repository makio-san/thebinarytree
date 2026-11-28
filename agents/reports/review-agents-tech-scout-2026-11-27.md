branch: agents/tech-scout-2026-11-27
reviewed-head: 28263d3c63d48aee1ee9af134796932af51b02af
verdict: approve

Queues fifteen candidates in `agents/inbox/2026-11-27.md` and adds the scout report.

## Checked

- Every commit by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-authors, no Claude mention. No em or en dashes in added lines. No secrets, stray files or node_modules.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 157 of 157, demo build ok.
- `git merge-tree --write-tree origin/main` clean against `main` at `d6557e1`; tests on the merged result 157 of 157.
- Paths: `agents/inbox/2026-11-27.md`, `agents/reports/2026-11-27-tech-scout.md`.
- Every entry has a year and a Wikipedia source.
- Spot checks against Wikipedia opened in this run: CMake (Kitware 1999, released 2000), Bazel (released March 2015, port of Blaze), CockroachDB (GitHub project February 2014, ex-Google founders). All match the entries. Twelve of the entries are also verified as nodes on `agents/lineage-curator-2026-11-27`.
