# Lineage curator, 2026-11-26 (second run)

Branched from `agents/tech-scout-2026-11-26-2`, which is not merged yet, so I could read its inbox `agents/inbox/2026-11-26-2.md`. The older inbox files still on `main` are already claimed by unmerged branches: `2026-11-21.md` by `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, `2026-11-24.md` by `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, `2026-11-25.md` by `agents/lineage-curator-2026-11-26` and `2026-11-25-web-reader.md` by `agents/lineage-curator-2026-11-25-2`. `2026-11-23.md` only holds the skipped Minecraft entry. So this run took only the new file.

## Added (13 nodes)

Every entry was checked against its Wikipedia article, fetched in one batched request with redirects; all 13 titles resolve.

| Node | Parent | Year | Notes |
| --- | --- | --- | --- |
| `simplex-algorithm` | `theory` | 1947 | Dantzig, mid-1947 once he added an objective function |
| `hash-table` | `theory` | 1953 | Luhn's IBM memorandum, January 1953 |
| `linked-list` | `theory` | 1956 | Newell, Shaw and Simon, for IPL, 1955 and 1956 |
| `skip-list` | `linked-list` | 1989 | Pugh; moved from the scout's parent `b-tree` to `linked-list`, since a skip list is layered linked lists and Pugh pitched it as an alternative to balanced trees, not a descendant |
| `leveldb` | `lsm-tree` | 2011 | Dean and Ghemawat, from early 2011 |
| `apache-arrow` | `parquet` | 2016 | first release 10 October 2016 |
| `clickhouse` | `column-store` | 2016 | open source 15 June 2016 |
| `google-file-system` | `analytics` | 2003 | full author names from the Howard Gobioff article, since the GFS article gives only surnames |
| `valkey` | `redis` | 2024 | first release 28 March 2024 |
| `ucie` | `pci-express` | 2022 | 1.0 on 2 March 2022, 4.0 on 12 November 2026; kind `component` to match its sibling `cxl` |
| `jpeg-xl` | `jpeg` | 2021 | file format standardized 13 October 2021 |
| `ipfs` | `bittorrent` | 2015 | Benet, alpha in February 2015 |
| `tree-sitter` | `yacc` | 2018 | Brunsfeld, first released with Atom in 2018 |

Claims from the inbox that I left out because the article did not support them: that AWS, Google Cloud and Oracle back Valkey, and that GFS was presented at SOSP (the article only cites the 2003 paper). Creators were added for nine nodes; none for Arrow, ClickHouse, Valkey, UCIe or JPEG XL, which have no named individual creators.

## Skipped (1)

- Regular expression: already a node on the unmerged `agents/lineage-curator-2026-11-24-2` and its fixer branch. It stays in the inbox with a `skipped:` note.

## For a human

- Type check and all 148 tests pass. The branch merges into `main` cleanly and into `agents/lineage-curator-2026-11-26` cleanly. The three branches it does not merge with (`lineage-curator-2026-11-25-2`, `branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, `branch-fixer-2026-11-23-lineage-curator-2026-11-21`) already conflict with `main` on their own, in files this branch does not touch apart from `wiki.ts` and `creators.ts`.
- I put the new side table entries next to their parents' entries, not at the end of the file, so they are less likely to collide with other branches.
