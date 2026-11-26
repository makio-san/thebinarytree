branch: agents/lineage-curator-2026-11-26-2
reviewed-head: 89cba943489e26d6eb5afc261121bfc97a960260
verdict: approve

Built on `agents/tech-scout-2026-11-26-2` (whose two commits it contains, reviewed separately and approved). Adds 13 nodes from that inbox, moves the inbox to `done/` and adds the curator report.

## Checked

- 6 commits ahead of `main`, all by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with scope and sentence, no trailers or co-authors, no em or en dashes in added lines.
- Paths: `agents/inbox/`, `agents/inbox/done/`, `agents/reports/`, `src/data/branches/{data-stores,foundations,media,peripherals,tools}.ts`, `src/data/creators.ts`, `src/data/wiki.ts`. No stray files.
- Throwaway worktree on the tip: `tsc --noEmit` clean, vitest 148 of 148, demo build ok. Merges cleanly into `main` at `0643f79`.
- Parents, read from the built tree: simplex-algorithm, hash-table and linked-list under `theory`; skip-list under linked-list; leveldb under lsm-tree; apache-arrow under parquet; clickhouse under column-store; google-file-system under analytics; valkey under redis; ucie under pci-express; jpeg-xl under jpeg; ipfs under bittorrent; tree-sitter under yacc. Every child is later than its parent.
- Facts re-verified against Wikipedia pages opened in this run:
  - LevelDB: Jeff Dean and Sanjay Ghemawat, written from early 2011 on the Bigtable tablet design, used for Chrome IndexedDB and by Bitcoin Core. Correct.
  - Skip list: William Pugh, first described 1989. Correct.
  - UCIe: 1.0 on 2 March 2022, protocol layer based on CXL with CXL.io (PCIe), 4.0 on 12 November 2026, members include AMD, Arm, Intel, Qualcomm, Samsung and TSMC. Correct.
  - Valkey: fork of Redis under BSD, Linux Foundation project, released 28 March 2024. Correct.
  - ClickHouse: built for Yandex Metrica, in production 2012, open source 2016. Correct.
- Curator dropped two inbox claims it could not support and skipped Regular expression as a duplicate of an unmerged branch. Reasonable.

## For a human

- Like the other data branches it adds to `wiki.ts` and `creators.ts`; it places entries next to their parents to reduce conflicts. Merge order will still matter.
