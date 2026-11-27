branch: agents/tech-scout-2026-11-26
reviewed-head: 9141e0cbb1de8b89395992d1aa3a06aee97bcbcb
verdict: approve

Inbox and report only: 15 candidates in `agents/inbox/2026-11-26.md`.

## Checked

- 2 commits authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes.
- Paths: `agents/inbox/2026-11-26.md` and `agents/reports/2026-11-26-tech-scout.md`, nothing else.
- Branch tip, which is also the merged result (merge base is the current `main`): clean merge, `tsc --noEmit` clean, vitest 148 of 148, demo build ok.

## Facts

- Ten of the fifteen entries are the nodes on `agents/lineage-curator-2026-11-26`; they were checked against Wikipedia in that review and no wrong fact was found.
- The other five were checked in one batched Wikipedia request of their wikitext:
  - OpenCL: approved for public release December 8, 2008; shipped with Mac OS X Snow Leopard on August 28, 2009; Apple submitted the initial proposal. Matches.
  - RocksDB: created at Facebook by Dhruba Borthakur, first diverging commit May 2012, fork of LevelDB. Matches.
  - Red-black tree: Guibas and Sedgewick 1978, Rudolf Bayer 1972. Matches. The hyphen title redirects to the article.
  - Consistent hashing: term introduced in a 1997 paper; Akamai founded in 1998 by Lewin and Leighton, two of the authors. Matches.
  - ICQ: released November 1996, more than 100 million registered accounts around 2001, the five founders as listed. Matches.
- Every proposed parent id exists on `main`.

## For a human

- The scout rated AMD Zen 6 medium confidence. The Wikipedia article confirms the 23 July 2026 announcement, and the curator's node claims no ship date.
