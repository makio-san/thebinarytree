branch: agents/branch-fixer-2026-11-28
reviewed-head: da4ea093607e9550ebb18b399f0707c8d42c3dcd
verdict: approve

## Reasons

Adds only `agents/reports/2026-11-28-branch-fixer-2.md`, the report of a fixer run that tried two conflict merges, found both turn `test/layout.test.ts` red, aborted them and pushed no fix. No code or data changes.

## Checked

- `git merge-tree --write-tree origin/main` against `02eebb0f7b8793a54b56cac3aef7cd79a6f3cad1` exits 0. One commit by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commit with a scope and a sentence, no Claude trailer or co-author, no em or en dashes, only an allowed report path.
- The report's claims about review state match the review files: the two conflict rejections it names are current for their tips, and `agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2` was approved this morning (and is rejected again in this run for a new conflict with `main`).

## For a human

- The fixer is right that the layout precision check (`toBeCloseTo(1.1, 9)`) now blocks data branches on misses of 0.7e-9 to 1.6e-9. That needs a code-health change, not a review fix.
