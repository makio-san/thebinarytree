# Branch fixer, 2026-11-28

Ten branches have a latest review with `verdict: reject`, the same ten as yesterday. Every tip on origin still matches its `reviewed-head`. Two were rejected only because they no longer merge into `main` (`db2add0` at this run). I fixed one. The other still turns the layout test red after the merge, so I left it. The rest were skipped under the rules.

## Fixed

### agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2, on `agents/branch-fixer-2026-11-28-lineage-curator-2026-11-24-2`

- Review: the only reason was a conflict with `main` in `src/data/branches/networks.ts`, `src/data/creators.ts` and `src/data/wiki.ts` (against `0643f79`). The content was approved on 25 November and was not judged again.
- Change: new branch from the rejected tip `d555ea0`, then `git merge --no-commit origin/main` and one merge commit, `fix(data): merge main into lineage-curator-2026-11-24-2 after a conflict.` Against today's `main` there is a fourth conflicting file, `src/data/branches/operating-systems.ts`. All four are add/add at the same place, and I kept both sides, the branch's entries first:
  - `networks.ts`: Sendmail, then Microsoft Exchange Server, under mail; OSPF, then Network Address Translation, after IPv6.
  - `operating-systems.ts`: Mach (with seL4 below it), then roff, as siblings at the end of the same list.
  - `creators.ts` and `wiki.ts`: the branch's block for Mach, IRC, SHRDLU and the rest, then `main`'s blocks.
- Checked that each of the branch's ids (mach, sel4, irc, shrdlu, ibm-watson, imagenet, itanium, oled, sendmail, grep, ospf, directx, seti-at-home, trackball) appears exactly once as a node id, once in `WIKI_TITLES` and at most once in `CREATORS`.
- No facts changed, so no new sources.
- Checks on the merged result: `tsc --noEmit` clean, `vitest run` 161 of 161 passed, including the tight link length check in `test/layout.test.ts` that failed for this branch yesterday. Nothing rebased, rewritten or force pushed; the rejected branch is untouched. This is not counted as a try.

## Left

- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`): rejected for a conflict in `src/data/branches/peripherals.ts`. As yesterday, the conflict is easy: `main` added a Buses and Interconnects group at the end of peripherals, where the branch adds Thunderbolt as a top level node, and Thunderbolt fits in that group next to PCI and USB. But the merged tree still fails `test/layout.test.ts` ("places every child exactly one link length from its parent"): the link from Intel Core i to Intel SGX, depth 15, comes out 1.48e-9 short of 1.1, against a tolerance of 5e-10. I aborted the merge and pushed nothing for it. Not counted as a try.
- `agents/lineage-curator-2026-11-21` (`d245833`): contained in the fixer branch above, which was rejected only for a conflict, so the work belongs there.
- `agents/lineage-curator-2026-11-24-2` (`632d7fc`): contained in `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, fixed above.
- `agents/lineage-curator-2026-11-25-2` (`9d07b7f`): contained in `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2`, whose latest review approves it.
- `agents/lineage-curator-2026-11-22`, `agents/tech-scout-2026-11-21`, `agents/tech-scout-2026-11-21-2`: already contained in `main`.
- `agents/tech-scout-2026-11-22-2` (`6b1a5b9`): its scout commits reached `main` through `agents/branch-fixer-2026-11-24-tech-scout-2026-11-22-2`; the rest is code-health work that will never merge. Nothing to fix.
- `agents/code-health-2026-11-22` (`21c50df`): superseded by `agents/code-health-2026-11-22-2`, which is in `main`. Nothing to fix.

## For a human

- Naming: the rejected branch was itself a fixer branch, so I named the new one after the original work (`lineage-curator-2026-11-24-2`) rather than `branch-fixer-2026-11-25`.
- The check in `test/layout.test.ts` (`toBeCloseTo(1.1, 9)`) still holds back the twelve reviewed nodes of `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (SCSI, Serial ATA, FireWire, HDMI, Thunderbolt, FTP, Kerberos, SSH, the X Window System, the Turing test, ELIZA and Siri). Whether a merge passes depends on how the added nodes shift the fifteen level Intel chain, so it can flip either way as `main` grows. It needs better numerics in `hyperbolicDistance` near the boundary or a looser tolerance for very deep links. That is code-health work, not a review fix, so I did not change it.
- If the branch fixed today merges first, check the left branch against the new `main` again.
- Deleting `agents/tech-scout-2026-11-22-2` and `agents/code-health-2026-11-22` on origin would shorten the list of rejected tips every run reads.
