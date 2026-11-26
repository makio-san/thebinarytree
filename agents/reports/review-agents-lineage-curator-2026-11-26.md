branch: agents/lineage-curator-2026-11-26
reviewed-head: 5919a864e2908894a5e521bc2d431ec0a7184e6d
verdict: approve

19 nodes, no wrong fact found. The branch is built on `agents/tech-scout-2026-11-26` and carries its two commits, which are reviewed separately and approved for `9141e0c`.

## Checked

- 5 commits, all authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes in any added line.
- Paths: eight branch files, `creators.ts`, `wiki.ts`, the inbox files and two reports. No stray files, no secrets, no node_modules.
- Branch tip, which is also the merged result because the merge base is the current `main` (`0fe6622`): `git merge-tree` clean, `tsc --noEmit` clean, vitest 148 of 148, demo build ok.
- No id among the 19 exists on `main` or on the three approved data branches that still wait (`agents/lineage-curator-2026-11-25-2` and the two branch fixer branches).
- Inbox: `2026-11-25.md` keeps only Bloom filter with its `skipped:` note, `2026-11-26.md` keeps the five queued entries, the rest moved to `done/`.

## Facts

Two batched Wikipedia API requests in this run (intros of all 19 titles, then the wikitext of eleven), five seconds apart, both 200. All 19 titles resolve without a redirect. Every year, creator and dated claim in the 19 summaries was compared with the article:

- `amd-zen-6`: the article says the Epyc 9006 series, codenamed Venice, was announced on July 23, 2026, and that the Zen 6c variant has a maximum of 256 cores. Matches.
- `turbo-code`: patent application filed 23 April 1991 with Claude Berrou as sole inventor; 1993 paper by Berrou, Glavieux and Thitimajshima; 3G and 4G use. Matches.
- `rowhammer`: June 2014 paper; Project Zero showed two working privilege escalation exploits on March 9, 2015. Matches.
- `tpm`: conceived by the Trusted Computing Group, 1.1b first deployed in 2003, ISO/IEC 11889 in 2009. Matches.
- `xfs`: created 1993, introduced with IRIX 5.3 in 1994, GPL in May 1999, Linux in 2001, default in Red Hat Enterprise Linux. Matches.
- `apfs`: iOS 10.3 on 27 March 2017, macOS 10.13 on 25 September 2017. Matches.
- `rpm`: written in 1995 by Erik Troan and Marc Ewing; baseline format of the Linux Standard Base. Matches.
- `docsis`: version 1.0 released in March 1997 with elements of earlier proprietary cable modems. Matches.
- `homomorphic-encryption`: problem posed in 1978 within a year of RSA; Craig Gentry, 2009, lattice based. Matches.
- `intel-sgx`: introduced in 2015 with the sixth generation Core processors on Skylake. Matches.
- `ldpc`, `zsh`, `wifi-7`, `nerf`, `gaussian-splatting`, `xpoint-3d`, `harmonyos`, `fuchsia`, `h266`: year, people and dates match the article intros.

Parents were read in the diff context and are as the report lists them. The loose ones (NeRF under `alexnet`, 3D XPoint under `flash-memory`, SGX under `intel-core-i`) are named in the author's report and are defensible.

## For the merger and a human

- Merges cleanly into `main` today. It appends to the end of `wiki.ts` and `creators.ts`, as the other waiting data branches do, so whichever lands second may conflict.
- Merging this branch also brings in the two commits of `agents/tech-scout-2026-11-26`.
