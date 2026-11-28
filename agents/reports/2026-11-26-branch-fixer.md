# Branch fixer, 2026-11-26

Seven branches have a latest review with `verdict: reject`. Every tip on origin still matches its `reviewed-head`. None may be taken under the skip rules, so nothing was fixed and no data changed. This report exists because two approved fixer branches are stuck and no agent's rules let anyone move them.

## Left

- `agents/lineage-curator-2026-11-21` (`d245833`): covered by `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`), which is approved and not rejected, so the skip rule applies. Tried once so far. Stuck, see below.
- `agents/lineage-curator-2026-11-24-2` (`632d7fc`): covered by `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`), which is approved and not rejected, so the skip rule applies. Tried once so far. Stuck since last night, see below.
- `agents/lineage-curator-2026-11-22` (`1ea4f84`): already contained in `main`.
- `agents/tech-scout-2026-11-21` (`7cea3f5`): already contained in `main`.
- `agents/tech-scout-2026-11-21-2` (`8301a3a`): already contained in `main`.
- `agents/tech-scout-2026-11-22-2` (`6b1a5b9`): its two scout commits reached `main` through `agents/branch-fixer-2026-11-24-tech-scout-2026-11-22-2`. The rejected branch still carries the code-health commits and will never merge. Nothing to fix.
- `agents/code-health-2026-11-22` (`21c50df`): superseded by `agents/code-health-2026-11-22-2`, which is in `main`. Nothing to fix.

## For a human

Two fixer branches are approved for their tips but no longer merge into `main` (`0fe6622`). I tested both with `git merge-tree` in this run:

- `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` (`d555ea0`) conflicts in `src/data/branches/networks.ts`, `src/data/creators.ts` and `src/data/wiki.ts`. It merged cleanly when it was reviewed, but `agents/lineage-curator-2026-11-25` went into `main` first on the evening of 25 November and both append at the same places. The reviewer predicted this. It holds 14 nodes: Mach, seL4, IRC, SHRDLU, Watson, ImageNet, Itanium, OLED, Sendmail, grep, OSPF, DirectX, SETI@home and the trackball.
- `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` (`4f88415`) conflicts in `src/data/branches/peripherals.ts`, where `main` rebuilt the Buses and Interconnects group. The merger has skipped it on every run since 24 November. It holds 12 nodes: SCSI, Serial ATA, FireWire, HDMI, Thunderbolt, FTP, Kerberos, SSH, the X Window System, the Turing test, ELIZA and Siri.

Why they stay stuck: the reviewer approved each tip, the merger aborts on a conflict and does not resolve it, and the fixer must skip a rejected branch that an unrejected fixer branch already contains. So 26 reviewed nodes will stay off the site until one of these happens:

1. The reviewer rejects the two fixer tips for the merge conflict. The fixer then takes them on its next run and merges `main` in, as it did on 25 November.
2. Someone merges `main` into each by hand and places the nodes.
3. The fixer's skip rule is changed so that an approved fixer branch that no longer merges into `main` counts as needing a fix.

Things to watch when they are merged:

- Kerberos is on the 21 November fixer branch and is also queued in `agents/inbox/2026-11-22-2.md`. Check that a curator has not written it a second time.
- The 14 entries of the 24 November inbox must stay in `agents/inbox/done/2026-11-24.md`, with only MYCIN and MUD1 left in `agents/inbox/2026-11-24.md`.

Deleting `agents/tech-scout-2026-11-22-2` and `agents/code-health-2026-11-22` on origin would shorten the list of rejected tips that every run reads.
