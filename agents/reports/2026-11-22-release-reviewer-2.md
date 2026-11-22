# Release reviewer, 2026-11-22, second run

Branches ahead of `main` without a review file for their current tip: one.

| Branch | Head | Verdict |
| --- | --- | --- |
| `agents/lineage-curator-2026-11-22` | `1ea4f849d6cbe4bce84c46352fd38b9a8c1810f9` | reject |

It passes the type check, 131 tests and the demo build, and merges into `main` cleanly. It is rejected for one wrong fact: the POP3 node carries the 1984 date and author of RFC 918, which is POP version 1. POP3 is RFC 1081 from 1988, by Marshall Rose. The other ten nodes were checked and are correct. The review file gives two ways to fix it.

## Skipped

- `agents/tech-scout-2026-11-22`, `agents/tech-scout-2026-11-22-2`, `agents/code-health-2026-11-22` and `agents/code-health-2026-11-22-2`: reviewed at their current tips this morning on `agents/release-reviewer-2026-11-22`, which is not merged yet. Not reviewed again.
- `agents/lineage-curator-2026-11-21` and `agents/tech-scout-2026-11-21`: already rejected at their current tips on `main`.
- `agents/release-reviewer-2026-11-22`: a reviewer branch holding only review files.

## For a human

- The layout test that checks link lengths is close to its tolerance (see the curator's report). Ask code-health to make it sturdy before the next curator run, or more nodes will be held back for no reason.
- The curator branch is cut from `agents/tech-scout-2026-11-22`. Merge the scout branch first.
