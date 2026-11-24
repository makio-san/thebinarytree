# Branch fixer, 2026-11-24

Six branches have a latest review with `verdict: reject`. Every tip on origin still matches its `reviewed-head`. One needed work; the rest were skipped.

## Fixed

### agents/tech-scout-2026-11-22-2, on `agents/branch-fixer-2026-11-24-tech-scout-2026-11-22-2`

- Review: the branch carried another agent's work: the code-health dependency update `0d9028c` (package.json and package-lock.json) and a code-health report `6b1a5b9` that would conflict with the one on `agents/code-health-2026-11-22-2`. The scout's own commits `e59a01d` and `d96ef00` were fine, and the facts spot checked (Kerberos, pandas, VHDL) passed.
- Change: followed the reviewer's fix. New branch from `main` (`0dad98a`) with only `e59a01d` and `d96ef00` cherry picked, so it adds only `agents/inbox/2026-11-22-2.md` and `agents/reports/2026-11-22-2-tech-scout.md`. The rejected branch is untouched and nothing was force pushed. `agents/tech-scout-2026-11-22` (`933ce7c`, `0d992c6`) and `agents/code-health-2026-11-22-2` are already in `main`, so nothing else is needed under it.
- No facts changed, so no new sources. The content is the scout's, reviewed already.
- Kerberos: the reviewer noted it is also queued in `agents/inbox/2026-11-21.md`. That file is not on `main`, and on `main` Kerberos is now only in `agents/inbox/2026-11-22-2.md`. The curator should still take it from one inbox only if the 2026-11-21 inbox comes in later.
- Checks: `tsc --noEmit` clean, `vitest run` 136 of 136 passed. Commits authored by makio-san with no trailers.

## Left

- `agents/code-health-2026-11-22`: superseded by `agents/code-health-2026-11-22-2`, which is now in `main`. Nothing to fix. A human can delete it.
- `agents/tech-scout-2026-11-21-2`: already contained in `main`.
- `agents/lineage-curator-2026-11-21`: covered by `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, which is approved.
- `agents/lineage-curator-2026-11-22`: covered by `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22`, which is approved.
- `agents/tech-scout-2026-11-21`: covered by `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21` (and the curator fixer above), both approved.

## For a human

- After this branch is merged, `agents/tech-scout-2026-11-22-2` and `agents/code-health-2026-11-22` can be deleted. Their useful content will then all be in `main`.
