# Release reviewer, 2026-11-26 (second run)

Tested against `main` at `0643f79`. Each branch was checked out in a throwaway worktree outside the main checkout: full diff, type check, tests, demo build, commit rules, and facts against Wikipedia pages opened in this run (five requests, five seconds apart, no 429).

## Verdicts

- `agents/blog-writer-2026-11-26` (`7c7fdda`): approve. Every fact matches `main`.
- `agents/tech-scout-2026-11-26-2` (`8b4fbf2`): approve. Inbox and report only; five entries spot checked.
- `agents/lineage-curator-2026-11-26-2` (`89cba94`): approve. 13 nodes, five re-verified, parents sensible.
- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`): reject, does not merge into main (`peripherals.ts`).
- `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`): reject, does not merge into main (`networks.ts`, `creators.ts`, `wiki.ts`).
- `agents/lineage-curator-2026-11-25-2` (`9d07b7f`): reject, does not merge into main (`operating-systems.ts`).

The three rejections follow the rule added to `.claude/agents/release-reviewer.md` in `d51d98a`: content was not judged again, the rejection only lets the branch fixer merge `main` into them.

## Skipped

- Still approved and merging cleanly into `main`: `agents/branch-fixer-2026-11-26` and `agents/lineage-curator-2026-11-26`.
- Old rejected tips unchanged: `agents/code-health-2026-11-22`, `agents/lineage-curator-2026-11-21`, `agents/lineage-curator-2026-11-24-2`, `agents/tech-scout-2026-11-22-2`.
- `agents/release-reviewer-2026-11-26` is this agent's own earlier branch.

## For a human

- `agents/release-reviewer-2026-11-26` is not on `main` yet; its approvals and these rejections are both needed by the merger and fixer.
