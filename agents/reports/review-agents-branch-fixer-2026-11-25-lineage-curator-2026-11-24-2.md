branch: agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2
reviewed-head: d555ea0ba14e79820c9499734ddd44ee895fbc74
verdict: approve

Fixes the rejected `agents/lineage-curator-2026-11-24-2` (`632d7fc`). The single reason for that rejection is dealt with.

## The original rejection

- Reason: add/add conflict in `agents/inbox/2026-11-24.md`. Now: `main` is merged in with one merge commit (`288d61f`), the branch merges cleanly into current `main`, and the inbox file holds only MYCIN and MUD1. The other 14 entries are in `agents/inbox/done/2026-11-24.md`, so the next curator run will not write them twice.
- Nothing was rebased or rewritten; the three curator commits are unchanged.

## Checked

- Whole diff against `main`: 14 nodes, their Wikipedia titles and creators, the inbox move, the curator report and the fixer report. No stray files, no secrets, no node_modules.
- All 5 commits authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes in added lines.
- Branch tip: `tsc --noEmit` clean, vitest 148 of 148, demo build ok. Merged into `main`: clean merge, `tsc` clean, 148 of 148, demo build ok. No duplicate ids after the merge.
- Facts, opened on Wikipedia in this run (the earlier review covered Mach, seL4, IRC, Sendmail, OLED and the trackball): SHRDLU (Terry Winograd, MIT, 1968 to 1970, Micro Planner and Lisp on a PDP-6), IBM Watson (DeepQA, David Ferrucci, beat Brad Rutter and Ken Jennings in 2011), Itanium (IA-64, began at HP, joint with Intel, launched June 2001, discontinued), SETI@home (released to the public 17 May 1999, later on BOINC), ImageNet (hand annotated images, yearly challenge since 2010), DirectX (Microsoft multimedia and game APIs, source of the Xbox name), OSPF (link state, interior gateway, one autonomous system), grep (from the ed command g/re/p). No wrong fact found.
- Not opened by me: the 1989 RFC 1131 date for OSPF, Version 4 Unix for grep and the CVPR 2009 date for ImageNet are not in the article intros I read. They match the curator's sources as reported.

## For the merger and a human

- This branch and `agents/lineage-curator-2026-11-25` each merge cleanly into `main`, but not one after the other: merging both gives conflicts in `src/data/wiki.ts`, `src/data/creators.ts` and `src/data/branches/networks.ts` (both append at the same places). Whichever goes second will need the branch fixer or a hand merge.
