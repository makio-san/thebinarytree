# Branch fixer, 2026-11-28, second run

Eleven branches have a latest review with `verdict: reject`. Every tip on origin still matches its `reviewed-head`. One is new since this morning: `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2`, rejected only for a conflict with `main`. Two branches were rejected only for a conflict, and I tried both against `main` at `02eebb0`. Both merge cleanly once resolved, but both turn `test/layout.test.ts` red, so I aborted both merges and pushed no fix. Neither counts as a try.

## Left

### agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2 (`27bb66e`)

- Review: does not merge into `main` (`db2add0`), conflict in `src/data/branches/networks.ts`. The content was approved before and was not judged again.
- Tried: `git merge --no-commit origin/main`. The conflict is add/add at the end of the same list: the branch adds Minitel, `main` adds ICQ. I kept both, Minitel first, and checked that no node id appears twice in `src/data/branches`. `tsc --noEmit` was clean.
- Why left: `vitest run` failed 1 of 161 tests: "places every child exactly one link length from its parent" got 1.0999999983889266, which is 1.6e-9 off, against a tolerance of 5e-10. `main` on its own passes. I ran `git merge --abort` and pushed nothing.

### agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21 (`4f88415`)

- Review: does not merge into `main` (`0643f79`), conflict in `src/data/branches/peripherals.ts`.
- Tried twice on today's `main`:
  1. Thunderbolt as a top level sibling before `main`'s Buses and Interconnects group: the layout test was off by 1.6e-9.
  2. Thunderbolt moved into Buses and Interconnects, after PCI and USB: off by 7.0e-10, still above 5e-10.
- Why left: the same test is red. Merge aborted, nothing pushed.

## Skipped

- `agents/lineage-curator-2026-11-21` (`d245833`): contained in `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, which was rejected only for a conflict.
- `agents/lineage-curator-2026-11-25-2` (`9d07b7f`): contained in `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2`, which was rejected only for a conflict.
- `agents/lineage-curator-2026-11-24-2` (`632d7fc`) and `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`): contained in `agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2`, pushed this morning and not yet reviewed.
- `agents/lineage-curator-2026-11-22`, `agents/tech-scout-2026-11-21`, `agents/tech-scout-2026-11-21-2`: already contained in `main`.
- `agents/tech-scout-2026-11-22-2` (`6b1a5b9`) and `agents/code-health-2026-11-22` (`21c50df`): superseded, as this morning's report says. Nothing to fix.

## For a human

- Two reviewed branches are now blocked only by the precision check `toBeCloseTo(1.1, 9)` in `test/layout.test.ts`. Between them they hold back Minitel and the twelve nodes from 21 November (SCSI, Serial ATA, FireWire, HDMI, Thunderbolt, FTP, Kerberos, SSH, the X Window System, the Turing test, ELIZA and Siri). The miss is 0.7e-9 to 1.6e-9 on very deep links near the boundary, and it depends on how the added nodes shift the deepest chain. This needs code-health work: better numerics in `hyperbolicDistance`, or a tolerance that scales with depth. That is not a review fix, so I did not change the test.
- If `agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2` merges first, `main` will change again and these two may need another look.
