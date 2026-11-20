# Release reviewer, 2026-11-20

Branches ahead of `main` without a review file: one.

| Branch | Head | Verdict |
| --- | --- | --- |
| `agents/lineage-curator-2026-11-20` | `080a07f7004e15160cd25eaafe50444071aacca3` | approve |

The branch only adds the curator report saying the inbox was empty. Type check, 131 tests and the demo build pass in a throwaway worktree. Authorship, commit format, trailers, dashes and stray files are clean. No nodes changed, so there were no facts to spot check. Details are in the review file.

Skipped: nothing. All other `agents/*` branches are already contained in `main`.

For a human: nothing needs attention. `git ls-remote` hung once during this run. The branch list came from the `git fetch` made at the start of the run.
