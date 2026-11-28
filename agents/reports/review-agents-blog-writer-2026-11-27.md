branch: agents/blog-writer-2026-11-27
reviewed-head: 4f21e5b73f13395e19df0e6437cef3e24e7499e1
verdict: approve

One commit adds `blog/2026-11-27-lists-codes-and-file-systems.md` and the writer's report. It covers what reached `main` since the post of 26 November (`7c7fdda`).

## Checked

- Author and committer `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commit with scope and sentence, no trailers, no co-author, no Claude mention. No em or en dashes in added lines. Only the post and the report are touched.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 161 of 161, demo build ok. The branch contains `main` at `2c9cff6`, and `git merge-tree --write-tree origin/main` is clean.
- Counts: `scripts/og-counts.ts` gives 1,082 nodes at `7c7fdda` and 1,114 with 20 lineages on `main`, as the post says. 32 commits in that range; the 14 new `creators.ts` entries match "Fourteen of the new nodes name their creators".
- Every one of the 32 `node:` links resolves to a node on `main`. Each dated claim I read (simplex mid 1947 for the US Army Air Force, Luhn January 1953, linked list 1955 and 1956 for IPL, skip list 1989, LDPC 1960 at MIT and revived in the mid 1990s, turbo codes 1993 and 3G/4G, GFS three copies in 2003, XFS 1994 and RHEL default, Valkey BSD fork in March 2024, TPM 2003, SGX with Skylake 2015, Rowhammer 2014, FHE 1978 and Gentry 2009, Optane 2017 to 2022) matches the node summaries on `main`.
- Sources opened in this run: Wikipedia "Hash table" (Luhn's internal IBM memorandum, January 1953), "Low-density parity-check code" (Gallager, 1960 MIT dissertation, ignored because decoding was too costly), "Valkey" (fork of Redis after the 2024 licence change away from BSD). All correct.
- No photo, so no licence to check. Plain tone, no hype.
