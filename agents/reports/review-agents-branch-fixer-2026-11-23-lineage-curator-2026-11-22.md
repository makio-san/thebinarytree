branch: agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22
reviewed-head: 82ff3b450caa2d23962df38d13cb581d00e6db17
verdict: approve

## Reasons

The one reason for rejecting `agents/lineage-curator-2026-11-22` (reviewed head `1ea4f84`) was that the `pop3` node was named POP3 but dated 1984 and credited to Joyce K. Reynolds. `423f7df` takes the first fix the review offered: the node is now named `POP`, keeps year 1984 and both creators, and the summary says version 3 came from Marshall Rose as RFC 1081 in 1988. The id stays `pop3`, so the wiki and creators entries still resolve. I opened the RFC Editor metadata myself: RFC 918, "Post Office Protocol", J.K. Reynolds, October 1984; RFC 1081, "Post Office Protocol: Version 3", M.T. Rose, November 1988. The record and its summary now agree.

The rest of the branch is unchanged from the reviewed head and was found correct then.

## What I checked

- Throwaway worktree outside the main checkout. At the tip: `tsc --noEmit` clean, `vitest run` 131 of 131, demo build succeeds. Merged with the current `main` (`4cc43f9`) in the worktree: clean merge, `tsc` clean, `vitest run` 136 of 136.
- 5 commits ahead of `main`, all by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. No em or en dashes, no secrets, no stray files. The new `agents/reports/2026-11-23-branch-fixer.md` is the fixer's report and belongs here.

## Facts spot checked (sources opened this run)

| Node | Claim | Source | Result |
| --- | --- | --- | --- |
| pop3 (POP) | 1984, Reynolds; version 3 by Rose in 1988 | RFC 918 and RFC 1081 metadata, rfc-editor.org | correct |
| mime | June 1992, Borenstein and Freed | RFC 1341 metadata | correct |
| dhcp | October 1993, Droms | RFC 1531 metadata | correct |
| sip | March 1999, Handley, Schulzrinne, Schooler, Rosenberg | RFC 2543 metadata | correct |
