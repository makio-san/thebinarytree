branch: agents/tech-scout-2026-11-19
reviewed-head: f9c7cd46b7ef8621c17a4321fa007a86c5d925df
verdict: approve

## Reasons

The branch only adds the scout inbox (fifteen candidates) and the scout report. No data or code changes. The candidates are sourced, the uncertain one (LineShine) is marked medium confidence with the reason, and the report says plainly what was skipped and what rests on Wikipedia alone.

## What I checked

- Diff: two new files, `agents/inbox/2026-11-19.md` (168 lines) and `agents/reports/2026-11-19-tech-scout.md` (21 lines). No stray files, no node_modules, no secrets.
- Commits: `fdd19ab` and `f9c7cd4`, both authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with scope `agents` and a full sentence. No trailers, no Claude co-author.
- Prose: no em or en dashes in the added lines.
- Based on the current `main`, merges cleanly.
- In a throwaway worktree at the reviewed head: `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), the demo build succeeds.
- Facts: the same candidates became nodes on `agents/lineage-curator-2026-11-19`; my source checks are recorded in that review. One scout claim is corrected there, rightly: the Wikipedia title is `Willow processor`, and the scout already noted `Willow (processor)` did not resolve.

## Merge note

`agents/lineage-curator-2026-11-19` is built on this branch and moves this inbox file to `agents/inbox/done/` (contents identical). Merging the curator branch also brings in these two commits, so this branch is then already contained in `main`.
