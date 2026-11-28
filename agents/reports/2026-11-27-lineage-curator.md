# Lineage curator, 2026-11-27

Branch `agents/lineage-curator-2026-11-27`, built on the unmerged `agents/tech-scout-2026-11-27` so its inbox could be read. 17 nodes added, 2 entries skipped, 3 confirmed and queued. Type check clean and all 157 tests pass.

## Inbox files

- `agents/inbox/2026-11-26.md`: three of its five remaining entries added (OpenCL, red-black tree, ICQ) and appended to `done/2026-11-26.md`. RocksDB is queued, consistent hashing is skipped, both with notes.
- `agents/inbox/2026-11-26-web-reader.md`: both entries (Lean, Strassen algorithm) added, file moved to `done/`.
- `agents/inbox/2026-11-27.md`: twelve of fifteen added and moved to `done/2026-11-27.md`. Linux namespaces and PyPI are queued, World of Warcraft is skipped.
- Left alone, as in earlier runs: `2026-11-21.md`, `2026-11-24.md`, `2026-11-25-2.md`, `2026-11-25-web-reader.md` and `2026-11-26-2.md` (all handled on waiting curator or fixer branches) and `2026-11-23.md` (Minecraft, no honest parent).

## Added

Sources: one batched Wikipedia request for the intros of 22 titles (20, then 2 five seconds later), one batched request for the wikitext of 21 articles, and one final batched request to check the 17 stored titles. All returned 200, no 429. All 17 titles resolve; `Red-black tree` uses a hyphen and redirects to the en dash title, as the wiki test requires.

| Node | Parent | Year |
| --- | --- | --- |
| `opencl` | `cuda` | 2009 |
| `nvlink` | `cuda` | 2016 |
| `red-black-tree` | `b-tree` | 1978 |
| `cockroachdb` | `newsql` | 2017 |
| `icq` | `online-services` | 1996 |
| `nat` | `tcp-ip` | 1994 |
| `lean` | `ml` | 2013 |
| `cpan` | `perl` | 1995 |
| `strassen-algorithm` | `complexity-theory` | 1969 |
| `kolmogorov-complexity` | `information-theory` | 1963 |
| `cmake` | `make` | 2000 |
| `bazel` | `make` | 2015 |
| `quantum-error-correction` | `quantum` | 1995 |
| `trapped-ion-quantum` | `quantum` | 1995 |
| `ray-tracing` | `graphics` | 1968 |
| `roff` | `unix` | 1970 |
| `cpu-cache` | `system-360` | 1968 |

Titles and creators are in a new `Scout inboxes 2026-11-26 (remainder) and 2026-11-27, web reader inbox 2026-11-26` section at the end of `WIKI_TITLES` and `CREATORS`. New nodes are appended as the last child of their parent. No portraits touched.

## Changes from the inbox

- ICQ: placed directly in the `online-services` group beside Usenet and BBS, not under `usenet`. The article names IRC as the chat of the time and does not tie ICQ to Usenet. Origin Israel, which the article gives for Mirabilis. The shutdown in June 2024 is added from the article.
- NVLink: under `cuda` beside the V100, not under `nvidia-v100`. The article says it first shipped with the Pascal P100 in 2016, a year before the V100.
- roff: dated 1970, not 1971. The article says Ken Thompson transliterated it for the PDP-7 Unix around 1970 and again for the PDP-11 in 1971. Credited to Thompson alone: the article does not mention Joe Ossanna, who wrote nroff and troff. "Manual pages are still written in its markup" is dropped; the article only says it printed the manuals of Unix Versions 1 to 3.
- NAT: "became how most homes reach the Internet" became "by 2004 it was widespread", the article's claim.
- CMake: the summary names the Insight Toolkit, which the article says CMake was built for.
- CockroachDB: the summary uses the article's history (founders had used Bigtable and Spanner, project on GitHub in February 2014, first release 2017).
- Quantum error correction: "every serious quantum computer since is judged by how well it does this" is dropped. The nine qubit Shor code of 1995 is confirmed by the article's code table.
- Trapped-ion quantum computer: "the most accurate gates of any platform" became the article's wording, that the basic operations have been shown with the highest accuracy on this platform.
- Lean: "a small kernel" is dropped. Lean 4 is dated by the 2021 paper by de Moura and Sebastian Ullrich that the article cites.
- Kolmogorov complexity: "Solomonoff and Chaitin reached it independently" became "it also carries the names of Ray Solomonoff and Gregory Chaitin", from the article's alternative names. Creators: Kolmogorov alone.
- CPU cache: kept the scout's wording; Atlas 2 and System/360 Model 85 (manual dated June 1968) are from the article.
- Ray tracing: "following rays between the eye, the objects and the lights" became "modelling the paths light takes through a scene"; the article's lead speaks of light transport.
- No creators entry for OpenCL, NVLink, NAT, Bazel and CPU cache: the articles name companies or no one.
- No `origin` except on ICQ, because the text I opened does not place the others in one country.

## Skipped

- Consistent hashing: year, authors and the Akamai link are confirmed, the lineage is not, as with the Bloom filter yesterday. `integrity` holds cryptographic hashes. It belongs under `hash-table`, which is on the unmerged `agents/lineage-curator-2026-11-26-2`.
- World of Warcraft: confirmed, but no honest parent, as with Minecraft. `games` holds hardware and techniques, and the article names EverQuest, which the tree lacks, as its model.

## Queued, not skipped

- RocksDB: confirmed (Borthakur, first commit diverging from LevelDB on 10 May 2012). Its real parent is `leveldb`, which is on the unmerged `agents/lineage-curator-2026-11-26-2`, and adding it under `lsm-tree` conflicted with that branch on the same lines. Place it under `leveldb` once that branch is merged.
- Linux namespaces and PyPI: both confirmed (Al Viro's mount namespace in kernel 2.4.19 in 2002; PEP 301 finalized November 2002, launched 2003). With all 20 confirmed nodes in, the layout precision test failed (`intel-core-i` to `intel-sgx`, off by 7e-10 against a 5e-10 tolerance). Dropping any single node made it pass, but which counts pass is not monotonic: 19 nodes failed with a different gap (1.1e-9). I held back the last two entries of the newest file to keep the tree green.

## For a human

- The layout precision test in `test/layout.test.ts` (`toBeCloseTo(1.1, 9)`) is now the main limit on how many nodes a run can add, and it reacts to the total node count, not just the x86 chain. Every waiting data branch is a gamble on the merged result. It wants a `code-health` look: either the numerics in `hyperbolicDistance` near the boundary or a tolerance that matches what the deepest chain can hold.
- This branch merges cleanly into `main`, `agents/lineage-curator-2026-11-26-2` and `agents/web-reader-2026-11-27`, and a trial merge with `agents/lineage-curator-2026-11-26-2` passes all 157 tests. I did not trial the older conflicting branches (`lineage-curator-2026-11-25-2` and the two fixer branches); `lineage-curator-2026-11-25-2` already conflicts with `main` on its own in `networks.ts` and `operating-systems.ts`.
- This branch depends on `agents/tech-scout-2026-11-27`, which is not reviewed yet.
- Loose parents: CPU cache under `system-360` (the Model 85 is one early example, the Atlas 2 another), roff under `unix`, CPAN under `perl` and NVLink under `cuda`, which in this tree stands for Nvidia's compute GPUs.
- A data structures group (hash table, Bloom filter, consistent hashing) and an online worlds group (MUD, EverQuest, World of Warcraft, Minecraft) would give four skipped entries a home. Both are jobs for the `lineage-architect`.
