branch: agents/lineage-curator-2026-11-23
reviewed-head: 8a37dc02b2d852680561878d1ced1ab00eb8e418
verdict: approve

## Why

Sixteen new nodes from the 2026-11-23 inbox, with Wikipedia titles and creators, plus the inbox move to `done/` and the curator report. The branch is built on `agents/tech-scout-2026-11-23` (reviewed and approved separately at `0b6e8e5`), so merging it also brings in those two scout commits. Every fact I re-checked matches its source. The branch merges into `main` cleanly.

## What I checked

- In a throwaway worktree at the tip: `tsc --noEmit` passes, `vitest run` passes 131 of 131, and the demo build (`vite build --config vite.demo.config.ts`) succeeds.
- All six commits are by `makio-san <killbillbeatrixx@gmail.com>`. The messages are Conventional Commits with a scope and a sentence. No trailers, no Claude attribution, no em or en dashes in added lines, no secrets, no stray files, no node_modules.
- The changed paths are `src/data/branches/*`, `src/data/creators.ts`, `src/data/wiki.ts`, `agents/inbox/` and `agents/reports/`. All are within the curator's scope.
- Every parent id (`information-theory`, `theory`, `eniac`, `search-engines`, `research-unix-v6`, `windows-nt`, `floppy-disk`, `systems-security`, `rsa`, `lisp`, `early-games`, `nes`) exists once in `src/data/branches`.

## Facts re-checked against sources I opened (Wikipedia API, batched, 5 s apart, no 429)

- Hamming code: Richard W. Hamming, 1950, to correct punched card reader errors; Hamming(7,4) adds three parity bits to four data bits. Matches.
- Bourne shell: work started in 1976 by Stephen Bourne at Bell Labs, replacing the Thompson shell; released in 1979 as the default shell of Version 7 Unix; the basis of POSIX sh. Matches.
- File Allocation Table: originally developed in 1977 for floppy disks; designed by Marc McDonald for a precursor of Standalone Disk BASIC-80; FAT12, FAT16, FAT32 and exFAT; still common on USB drives and SD cards. Matches.
- Creeper: written by Bob Thomas at BBN in 1971, moving between TENEX PDP-10s on the ARPANET; a later self-copying version by Ray Tomlinson. Reaper was the first antivirus. Both credits match.
- NTFS: the default file system starting with Windows NT 3.1, superseding FAT; ACLs, encryption, compression and shadow copies. Matches.
- Tetris: Alexey Pajitnov at the Dorodnitsyn Computing Center, Elektronika 60, about 220 versions on at least 70 platforms. Matches. The year 1984 rests on the article's creation section, as the curator flags.
- X.509: the article body says "initially issued on July 3, 1988", which the summary uses. Matches.
- Monte Carlo method: conceived by Stanislaw Ulam. Matches.

## Notes, not blockers

- Monte Carlo sits under `eniac` and Mathematica under `lisp`. Both are judgement calls the curator explains in their report.
- `wannacry` has no `origin` field. This is deliberate, and the type check accepts it.
- Minecraft is correctly left in the inbox as skipped.
