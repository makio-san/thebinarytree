# Release reviewer, 2026-11-25

Five branches were ahead of `main` without a review of their current tip. All five were reviewed in a throwaway worktree: full diff, type check, tests and demo build on the tip and on the merge with `main`, commit rules, and facts against Wikipedia pages opened in this run (four batched requests, five seconds apart, no 429).

## Verdicts

- `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`): approve. The inbox conflict that caused the rejection is resolved as asked.
- `agents/lineage-curator-2026-11-25` (`aa300a1`): approve. 19 nodes, no wrong fact found.
- `agents/tech-scout-2026-11-25` (`ca7a6c7`): approve. Inbox and report only.
- `agents/web-reader-2026-11-25` (`48b1357`): approve. One inbox candidate and a report, no reading list.
- `agents/preview-refresher-2026-11-24` (`56f5a1f`): approve. The image shows 1,063 nodes, 20 lineages and 13 agents, which is what `main` has.

## Skipped

- Branches whose current tip already has a verdict were not looked at again: the four old rejected tips and the approved `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`.

## For a human

- The two approved data branches of today conflict with each other in `wiki.ts`, `creators.ts` and `networks.ts`, although each merges cleanly alone. The merger will take one and skip the other.
- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`) is still approved and still cannot merge, as today's branch fixer report explains. That report suggests the reviewer reject the tip so the fixer may take it. My instructions only cover tips with no current review, so I left the approval as it is. Someone should decide: merge `main` into it by hand, or allow the reviewer to reject an approved tip that no longer merges.
- The rejected `agents/tech-scout-2026-11-22-2`, `agents/code-health-2026-11-22` and `agents/lineage-curator-2026-11-21` are superseded and could be deleted on origin.
