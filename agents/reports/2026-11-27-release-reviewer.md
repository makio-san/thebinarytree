# Release reviewer, 2026-11-27

Reviewed every `agents/*` branch ahead of `main` (`d6557e1`) whose tip had no current review. Six branches, all approved. The one approved branch still waiting, `agents/lineage-curator-2026-11-26-2`, still merges cleanly into `main`, so it keeps its approval.

| Branch | Verdict | Note |
| --- | --- | --- |
| agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2 | approve | conflict resolved; content identical to the approved tip |
| agents/fact-checker-2026-11-27 | approve | eight security summaries corrected; spot checks match |
| agents/lineage-curator-2026-11-27 | approve | 17 nodes; six re-verified |
| agents/preview-refresher-2026-11-26 | approve | 1,101 nodes, image checked |
| agents/tech-scout-2026-11-27 | approve | fifteen candidates, sourced |
| agents/web-reader-2026-11-27 | approve | inbox only, no list |

Each branch: type check, tests (157 of 157) and the demo build on the tip, merge-tree against `main`, tests on the merged result. Wikipedia read in one batched intro request and seven full text requests 4.5 seconds apart, no 429.

## Still rejected, unchanged tips

`branch-fixer-2026-11-23-lineage-curator-2026-11-21`, `branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, `lineage-curator-2026-11-21`, `lineage-curator-2026-11-24-2`, `lineage-curator-2026-11-25-2`, `code-health-2026-11-22`, `tech-scout-2026-11-22-2`.

## For a human

- The branch fixer reports that `test/layout.test.ts` (`toBeCloseTo(1.1, 9)`) fails on merged results that add nodes deep in the Intel chain, which blocks two fixer branches. That needs code-health work on `hyperbolicDistance` or the tolerance.
- The branch-fixer and lineage-curator data branches touch the same files; after one merges, the other may conflict.
