# Branch fixer, 2026-11-25

Seven branches have a latest review with `verdict: reject`. Every tip on origin still matches its `reviewed-head`. One needed work; the rest were skipped.

## Fixed

### agents/lineage-curator-2026-11-24-2, on `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`

- Review: the only reason was that the branch did not merge into `main`. `agents/inbox/2026-11-24.md` was an add/add conflict, because the curator had copied the file from the then unmerged tech scout branch and cut it down to the two skipped entries, while `main` later received the scout's full 16 entry version. Facts, authorship and messages all passed.
- Change: followed the reviewer's fix. New branch from the rejected tip `632d7fc`, then a normal merge of `main` (`1b5457e`) with one merge commit, `288d61f`. The conflict is resolved to the curator's version, so `agents/inbox/2026-11-24.md` holds only MYCIN and MUD1, and the other 14 entries stay in `agents/inbox/done/2026-11-24.md`. The next curator run will not write the 14 nodes twice. The data files (`networks.ts`, `processors.ts`, `creators.ts`, `wiki.ts`) merged by themselves.
- Nothing was rebased, rewritten or force pushed. The rejected branch is untouched.
- No facts changed, so no new sources. The content is the curator's, checked by the reviewer already.
- Checks on the merged result: `tsc --noEmit` clean, `vitest run` 148 of 148 passed. Commits authored by makio-san with no trailers.

## Left

- `agents/lineage-curator-2026-11-21`: covered by `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, which is approved and not rejected, so the skip rule applies. See the note for a human below: that fixer branch is stuck.
- `agents/tech-scout-2026-11-21`: already contained in `main`.
- `agents/tech-scout-2026-11-21-2`: already contained in `main`.
- `agents/lineage-curator-2026-11-22`: already contained in `main`.
- `agents/tech-scout-2026-11-22-2`: covered by `agents/branch-fixer-2026-11-24-tech-scout-2026-11-22-2`, which is in `main`. The rejected branch itself still carries the code-health commits and will never merge. It can be deleted.
- `agents/code-health-2026-11-22`: superseded by `agents/code-health-2026-11-22-2`, which is in `main`. Nothing to fix. It can be deleted.

## For a human

- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`) is approved, but the release merger has skipped it four times because it conflicts with `main` in `src/data/branches/peripherals.ts`. `main` has since rebuilt the Buses and Interconnects group (PCI, PCI Express, Compute Express Link, USB) in the place where that branch adds its nodes. No agent's rules cover this case: the reviewer approved the tip, the merger does not resolve conflicts, and the fixer must skip a branch that a fixer branch already contains and that was not rejected. So the Siri, Kerberos, HDMI, ELIZA and Turing test work from 21 November will stay off the site until someone merges `main` into it and places its nodes in the new group by hand, or the reviewer rejects the tip for the conflict so that the fixer may take it. Kerberos is also queued in `agents/inbox/2026-11-22-2.md` on `main`, so check that it is not written twice.
- Deleting `agents/tech-scout-2026-11-22-2` and `agents/code-health-2026-11-22` on origin would shorten the list of rejected tips that every run looks at.
