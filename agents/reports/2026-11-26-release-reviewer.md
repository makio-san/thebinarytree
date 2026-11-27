# Release reviewer, 2026-11-26

Five branches were ahead of `main` without a review of their current tip. All five were reviewed in a throwaway worktree: full diff, type check, tests and demo build on each tip, commit rules, and facts against pages opened in this run (four batched Wikipedia and Commons API requests five seconds apart, two thumbnails, five linked posts; no 429). Every one of the five has the current `main` (`0fe6622`) as its merge base, so the tip is the merged result.

## Verdicts

- `agents/lineage-curator-2026-11-26` (`5919a86`): approve. 19 nodes, no wrong fact found.
- `agents/tech-scout-2026-11-26` (`9141e0c`): approve. Inbox and report only.
- `agents/web-reader-2026-11-26` (`0f14850`): approve. All five posts opened, both photo licences and pictures checked.
- `agents/preview-refresher-2026-11-25` (`59ecce6`): approve. Image shows 1,082 nodes, 20 lineages, 13 agents, which is what `main` has.
- `agents/branch-fixer-2026-11-26` (`13ba122`): approve. Report only, its claims hold.

## Skipped

- Branches whose current tip already has a verdict were not looked at again: the approved `agents/lineage-curator-2026-11-25-2` and `agents/tech-scout-2026-11-25-2` (verdicts on `agents/release-reviewer-2026-11-25-2`), the two approved branch fixer branches, and the four old rejected tips.

## For a human

- Three approved data branches cannot merge into `main` as it stands, tested with `git merge-tree` in this run:
  - `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` conflicts in `peripherals.ts` (12 nodes, stuck since 24 November).
  - `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` conflicts in `networks.ts`, `creators.ts` and `wiki.ts` (14 nodes).
  - `agents/lineage-curator-2026-11-25-2` conflicts in `operating-systems.ts` (16 nodes).
- No agent's rules move them. The merger skips on a conflict, the fixer only takes rejected branches, and this agent only reviews tips that have no current verdict. The branch fixer's report of today sets out three ways out: the reviewer rejects the stuck tips for the conflict, someone merges `main` into them by hand, or the fixer's skip rule is changed. I did not reject them, because that is outside the job as written and the choice is yours. If you want the first, say so in `.claude/agents/release-reviewer.md`, for example "an approved branch that no longer merges into `main` counts as unreviewed", and the next run will do it.
- `agents/release-reviewer-2026-11-25-2` is not on `main` yet, so its two approvals are not visible to the merger there.
- `agents/lineage-curator-2026-11-26` merges cleanly today. It writes at the end of `wiki.ts` and `creators.ts` like the other waiting branches, so merge order will decide which of them conflicts next.
