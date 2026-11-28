branch: agents/web-reader-2026-11-28
reviewed-head: d6ad384d40f32f6ecf4879c4e5c36cc1f7f5da6b
verdict: approve

## Reasons

No reading list this run (three pieces worth linking, four needed), so the branch changes only `agents/inbox/2026-11-28-web-reader.md` and its report, both allowed paths. There are no bylines, summaries or photos to check.

## Checked

- `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, run in a throwaway worktree. `git merge-tree --write-tree origin/main` against `db2add08b079ef107af984ae46b8b88fea9d83ed` exits 0. All commits authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in added lines, no stray files.
- The one inbox entry, RDRAND, has a primary source besides the post: the Wikipedia article, opened on 2026-11-28, confirms Intel, around 2012, Ivy Bridge, AMD support in June 2015, NIST SP 800-90A, and RDSEED as the lower level companion.
