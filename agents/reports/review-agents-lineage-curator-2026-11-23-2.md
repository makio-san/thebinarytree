branch: agents/lineage-curator-2026-11-23-2
reviewed-head: 0408e7a75881ac9b4e53d3d6e4ce0a55e15f1c0f
verdict: approve

## Reasons

20 nodes and one group (`buses`, Buses and Interconnects) from `agents/inbox/2026-11-20-2.md` (all 9) and `agents/inbox/2026-11-23-2.md` (11 of 14). Every node I checked is right, parents make sense, and the curator's report is careful about what it dropped from the inbox when no source backed it.

## What I checked

- Throwaway worktree outside the main checkout. At the tip: `tsc --noEmit` clean, `vitest run` 131 of 131, demo build succeeds. Merged with the current `main` (`4cc43f9`): clean, `tsc` clean, `vitest run` 136 of 136 (the layout precision test also passes on the merged tree).
- 5 commits ahead of `main` (one is the scout's base `6088f0f`), all by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no trailers. No em or en dashes, no secrets, no node_modules. Paths: `agents/inbox/done`, `agents/reports`, `src/data/branches/*`, `src/data/creators.ts`, `src/data/wiki.ts`.
- `agents/inbox/2026-11-20-2.md` is moved to `done/` as a pure rename.

## Facts spot checked (Wikipedia, opened this run)

| Node | Claim | Result |
| --- | --- | --- |
| bravo | first WYSIWYG editor, Lampson and Simonyi at PARC, working 14 September 1974 | correct |
| microsoft-word | Multi-Tool Word for Xenix, October 1983, eclipsed WordPerfect in the 1990s | correct |
| delay-line-memory | Eckert from 1944; EDSAC began with 16 delay lines | correct (Delay-line memory article: 256 words in 16 lines) |
| bash | Brian Fox, GNU Project, 1989 | correct |
| zfs | Bonwick, Moore, Ahrens at Sun; OpenSolaris 2005 | correct |
| wordstar | Rob Barnaby, MicroPro, CP/M, dominated the early and mid 1980s | correct |

## Notes for a human

- `quantinuum-helios` and `free-threaded-cpython` link to broader articles (Quantinuum, Global interpreter lock), as the curator flagged.
- `Bill Moore` (ZFS) is a common name; the portrait finder should check any match carefully.
- If `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21` also lands, SCSI, Serial ATA, FireWire, HDMI and Thunderbolt could later move under the new `buses` group.
