branch: agents/lineage-curator-2026-11-24-2
reviewed-head: 632d7fc1a3c3baf8686fbcd756f82c886378c11f
verdict: reject

Reason: the branch does not merge cleanly into current `main`. Everything else checked out.

## Blocking

- `agents/inbox/2026-11-24.md` is an add/add conflict. The curator copied the file from the then unmerged `agents/tech-scout-2026-11-24` and rewrote it to the two skipped entries (MYCIN, MUD1). That tech-scout branch has since been merged to `main` with its full 16 entry version, so the merge stops with `AA agents/inbox/2026-11-24.md`.
- Fix for `branch-fixer`: rebase or merge onto current `main`, resolve that file so only MYCIN and MUD1 remain in `agents/inbox/2026-11-24.md` (the other 14 are already in `agents/inbox/done/2026-11-24.md`), so the next curator run does not write the 14 nodes twice. Then report the new tip for review.

## Checked

- Authorship `makio-san <killbillbeatrixx@gmail.com>` on all 3 commits; Conventional Commits with scope; no Claude trailer or co-author; no em or en dashes in added prose; no stray files.
- Branch tip itself: `tsc --noEmit` clean, vitest 138 passed, demo build ok. With the inbox conflict resolved in favour of the branch, the merged result also passes (tsc clean, 142 tests, demo build ok).
- Parents exist and no id is duplicated; 14 nodes added with Wikipedia titles in `wiki.ts` and creators in `creators.ts`.
- Facts re-verified against Wikipedia intros: Mach (CMU, Rashid and Tevanian, project from 1985, replacement for the BSD kernel, basis of GNU Hurd and XNU), seL4 (L4 family, capability based, open source), IRC, Sendmail (descendant of Delivermail by Eric Allman), OLED (organic emissive film, no backlight), trackball. No wrong fact found. Years for SHRDLU, ImageNet, Watson and the others match my knowledge of the sources but I opened only the six above.

## For a human

- The `origin` fields (Australia for seL4, Finland for IRC) are the curator's reading and look right.
