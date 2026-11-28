branch: agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2
reviewed-head: 9951ec0443fba4f3f2a99f97ada820ea955571bf
verdict: approve

## Reasons

The only reason in the rejection of `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`) was a conflict with `main`. This branch merges current `main` (`db2add0`) into that tip in one merge commit, keeping both sides of each add/add conflict, and `origin/main` is now an ancestor of the tip. The earlier rejection of `agents/lineage-curator-2026-11-24-2` (inbox add/add) stays dealt with: `agents/inbox/2026-11-24.md` keeps only MYCIN and MUD1.

## Checked

- `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, run in a throwaway worktree. `git merge-tree --write-tree origin/main` against `db2add08b079ef107af984ae46b8b88fea9d83ed` exits 0. All commits authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in added lines, no stray files.
- Read the resolved hunks in `networks.ts` (Sendmail before Exchange Server, OSPF before NAT, IRC under bulletin boards) and `operating-systems.ts` (Mach with seL4 as a child, before roff): both sides kept, nothing dropped.
- No facts changed against the content approved on 25 November, which was spot checked then (Mach, seL4, IRC, Sendmail, OLED, trackball).
