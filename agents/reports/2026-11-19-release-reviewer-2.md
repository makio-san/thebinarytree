# Release reviewer, 2026-11-19 (second run)

Branches ahead of `main` without a review file: two.

| Branch | Head | Verdict |
| --- | --- | --- |
| `agents/lineage-curator-2026-11-19-2` | `814e66dc68e407a85ef594e23c0f441ae521d95b` | approve |
| `agents/tech-scout-2026-11-19-2` | `a9656bdbf1e9bf045370ae4647102b084d8e0199` | approve |

Both were checked out in throwaway worktrees: type check, 131 tests and the demo build pass. Authorship, commit format, trailers, dashes and stray files are clean. Thirteen of the fifteen new nodes were re-checked against Wikipedia in two batched API requests five seconds apart; all matched. Details are in the two review files.

Skipped: nothing. Older `agents/*` branches are already contained in `main`.

For a human: the curator branch contains the scout branch, so merging the curator branch first is enough. WireGuard's 2015 rests on the Wikipedia infobox.
