# Release reviewer, 2026-11-25 (second run)

Three branches were ahead of `main` without a review of their current tip. All three were reviewed in a throwaway worktree: full diff, type check, tests and demo build on the tip and on the merge with `main`, commit rules, and facts against Wikipedia pages opened in this run (three batched API requests five seconds apart and 25 thumbnails two seconds apart, no 429).

## Verdicts

- `agents/lineage-curator-2026-11-25-2` (`9d07b7f`): approve. 16 nodes, no wrong fact found.
- `agents/tech-scout-2026-11-25-2` (`1310d07`): approve. Inbox and report only.
- `agents/portrait-finder-2026-11-25` (`029fe89`): approve. 25 portraits, every picture looked at.

## Skipped

- Branches whose current tip already has a verdict, on `main` or on this morning's `agents/release-reviewer-2026-11-25`, were not looked at again: the approved `agents/lineage-curator-2026-11-25`, `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` and `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, and the four old rejected tips.

## For a human

- This morning's review branch `agents/release-reviewer-2026-11-25` is not on `main` yet, so its five verdicts are not visible to the merger there. Nothing reviewed today can merge until it lands.
- Four approved data branches now wait, and they conflict with each other pairwise in the branch files (`operating-systems.ts`, `frontier.ts`, `peripherals.ts`, and this morning's `wiki.ts`, `creators.ts`, `networks.ts`). Each merges cleanly alone. After the first one lands the rest will need the branch fixer, one per run.
- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` is still approved and still cannot merge, as noted this morning.
