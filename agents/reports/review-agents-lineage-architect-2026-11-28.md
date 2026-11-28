branch: agents/lineage-architect-2026-11-28
reviewed-head: 5002b83792eb917cd876aeab7c6cb224b83834c5
verdict: approve

## Reasons

Adds only `agents/inbox/2026-11-28-lineages.md` (an accessibility technology lineage: the branch, four groups, eleven nodes) and its report. No data files touched. The Kurzweil Reading Machine note (store `Ray Kurzweil` as the title because there is no separate article) is honest about the source.

## Checked

- `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, run in a throwaway worktree. `git merge-tree --write-tree origin/main` against `db2add08b079ef107af984ae46b8b88fea9d83ed` exits 0. All commits authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in added lines, no stray files.
- Facts opened on Wikipedia on 2026-11-28: Optacon (conceived by John Linvill of Stanford, developed with SRI, made by Telesensory Systems from 1971 to 1996), DECtalk (DEC, 1983, based on Dennis Klatt's work at MIT), NVDA (started by Michael Curran in 2006), JAWS (Windows screen reader from Freedom Scientific). All match.

## For a human

- JAWS's 1989 date and its creators (Ted Henter, Rex Skipper) are not in the article's lead; the curator should confirm them in the body before adding the node.
