# Branch fixer, 2026-11-27

Ten branches have a latest review with `verdict: reject`. Every tip on origin still matches its `reviewed-head`. Three were rejected only because they no longer merge into `main` (`d6557e1` at this run). I fixed one. The other two merge cleanly in content but turn the tests red, so I left them. The rest were skipped under the rules.

## Fixed

### agents/lineage-curator-2026-11-25-2, on `agents/branch-fixer-2026-11-27-lineage-curator-2026-11-25-2`

- Review: the only reason was a conflict with `main` in `src/data/branches/operating-systems.ts`. The content was approved on 25 November and was not judged again.
- Change: new branch from the rejected tip `9d07b7f`, then `git merge --no-commit origin/main` and one merge commit, `fa2a653`. Both sides only added sibling nodes at the same place under Linux: the branch adds ext4, `main` added cgroups and io_uring. All three are kept, in that order. No id now appears twice in `src/data/branches`.
- No facts changed, so no new sources.
- Checks on the merged result: `tsc --noEmit` clean, `vitest run` 157 of 157 passed. `git merge-tree` against `origin/main` is clean. Nothing rebased, rewritten or force pushed; the rejected branch is untouched.

## Left

- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`): rejected for a conflict in `src/data/branches/peripherals.ts`. The conflict itself is easy: `main` added a Buses and Interconnects group at the end of the peripherals branch, where the fixer branch adds Thunderbolt as a top level node. I placed Thunderbolt in the new group next to PCI and USB. But the merged tree fails `test/layout.test.ts` ("places every child exactly one link length from its parent"): the link from Intel Core i to Intel SGX, fifteen levels deep and about 1.4e-7 from the boundary, comes out 6.1e-10 short of 1.1, past the test's 5e-10 tolerance. It fails the same way with `main`'s own peripherals file, so it is not the placement. I aborted the merge and pushed nothing for it. Not counted as a try.
- `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`): rejected for conflicts in `networks.ts`, `creators.ts` and `wiki.ts`. All three are add/add at the same place (Sendmail next to Microsoft Exchange Server under mail; creators and Wikipedia titles for both sides), and keeping both resolves them with no duplicate keys. The merged tree fails the same layout test, by 5.3e-10. Aborted, nothing pushed. Not counted as a try.
- `agents/lineage-curator-2026-11-21` (`d245833`): contained in `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, which was rejected only for a merge conflict, so the work belongs on that branch (see above).
- `agents/lineage-curator-2026-11-24-2` (`632d7fc`): contained in `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, same reason.
- `agents/lineage-curator-2026-11-22`, `agents/tech-scout-2026-11-21`, `agents/tech-scout-2026-11-21-2`: already contained in `main`.
- `agents/tech-scout-2026-11-22-2` (`6b1a5b9`): its scout commits reached `main` through `agents/branch-fixer-2026-11-24-tech-scout-2026-11-22-2`; the rest is code-health work that will never merge. Nothing to fix.
- `agents/code-health-2026-11-22` (`21c50df`): superseded by `agents/code-health-2026-11-22-2`, which is in `main`. Nothing to fix.

## For a human

- The tight check in `test/layout.test.ts` (`toBeCloseTo(1.1, 9)`) now blocks data work. `main` passes only narrowly: the Intel chain reaches fifteen levels with Intel SGX, and any merge that adds nodes moves that deep point enough to cross 5e-10. This holds back 26 reviewed nodes (SCSI, Serial ATA, FireWire, HDMI, Thunderbolt, FTP, Kerberos, SSH, the X Window System, the Turing test, ELIZA and Siri; Mach, seL4, IRC, SHRDLU, Watson, ImageNet, Itanium, OLED, Sendmail, grep, OSPF, DirectX, SETI@home and the trackball), and will soon block curator branches too. It needs either better numerics in `hyperbolicDistance` near the boundary or a looser tolerance for very deep links. That is code-health work, not a review fix, so I did not change it here. Once it is fixed, the two conflicts above resolve as described.
- If this branch merges first, `main` grows again, so check the two left branches against the new `main`.
- Deleting `agents/tech-scout-2026-11-22-2` and `agents/code-health-2026-11-22` on origin would shorten the list of rejected tips that every run reads.
