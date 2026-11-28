# Lineage curator, 2026-11-28 (second run)

Branch `agents/lineage-curator-2026-11-28-2`, built on the unmerged `agents/tech-scout-2026-11-28-2` so its inbox could be read, with the unmerged `agents/lineage-curator-2026-11-28` merged in so the two data runs stack instead of conflicting in `wiki.ts` and `creators.ts`. 16 nodes added, nothing skipped. Type check clean and all 161 tests pass, including the layout precision test.

## Inbox files

- `2026-11-28-2.md`: all fourteen added, moved to `done/2026-11-28-2.md`.
- `2026-11-28-web-reader.md`: RDRAND added, moved to `done/`.
- `2026-11-28.md`: Microsoft HoloLens, queued by the first run, added and appended to `done/2026-11-28.md`. Maple stays skipped.
- Left alone, as in earlier runs: `2026-11-21.md`, `2026-11-24.md`, `2026-11-25-2.md`, `2026-11-25-web-reader.md` and `2026-11-27-2.md` (handled on waiting curator or fixer branches), `2026-11-26-2.md` (regular expression, on a waiting branch) and `2026-11-23.md` (Minecraft, no honest parent).

## Added

Sources: one batched Wikipedia request for the intros of all 16 titles, one for their lead wikitext and infoboxes, and one for the full wikitext of nine of them, five seconds apart. All returned 200, no 429. Every stored title resolves directly, with no redirect.

| Node | Parent | Year |
| --- | --- | --- |
| `snowflake` | `data-warehouse` | 2012 |
| `apache-iceberg` | `hadoop` | 2017 |
| `apache-flink` | `analytics` group | 2011 |
| `caffe` | `alexnet` | 2013 |
| `onnx` | `pytorch` | 2017 |
| `langchain` | `llm` | 2022 |
| `openmp` | `supercomputers` group | 1997 |
| `beagleboard` | `wearables` group | 2008 |
| `kaios` | `mozilla-firefox` | 2017 |
| `zephyr` | `linux-foundation` | 2016 |
| `gnu-guix` | `gnu-project` | 2013 |
| `apache-maven` | `make` | 2004 |
| `gradle` | `apache-maven` | 2008 |
| `eslint` | `javascript` | 2013 |
| `rdrand` | `intel-core-i` | 2012 |
| `hololens` | `kinect` | 2016 |

Titles and creators are in new sections at the end of `WIKI_TITLES` and `CREATORS`. No portraits touched.

## Changes from the inbox

- Apache Iceberg: under `hadoop`, not `parquet`. The article ties it to the limits of Apache Hive tables (Hive runs on Hadoop) and does not mention Parquet.
- Apache Flink: beside Kafka in the `analytics` group, not under `hadoop`. The article derives it from the Stratosphere engine, not from Hadoop. Origin Germany (TU Berlin).
- Gradle: under Maven rather than `make`; the article says it builds on Ant and Maven. "Standard build system for Android" dropped, not in the text I opened.
- RDRAND: under `intel-core-i` beside Intel SGX, not `aes`. The article places it in Ivy Bridge and the Intel 64 and IA-32 instruction sets. The AES conditioning claim is not in the text I opened and was dropped.
- BeagleBoard: "four years before the Raspberry Pi" dropped; the article does not say it.
- LangChain: "became a common way" dropped; Robust Intelligence added from the article.
- Snowflake, Caffe, ONNX, OpenMP, HoloLens: one extra sourced fact each (founders' Oracle and Vectorwise backgrounds, Caffe2 merged into PyTorch, Toffee and Linux Foundation AI, MPI pairing, the 3,000 dollar Development Edition and HoloLens 2).
- `origin` only where the article names a place or the maker is a well known US company; left out for LangChain, Maven, ESLint and Guix.
- No creators entry for ONNX, OpenMP, Flink, KaiOS, Zephyr, BeagleBoard, RDRAND or HoloLens: the articles credit companies or a board, not people.

## For a human

- This branch stacks on two unmerged branches, `agents/tech-scout-2026-11-28-2` and `agents/lineage-curator-2026-11-28`. Merge those first; if the first curator branch is rejected, this one needs a rebuild.
- Loose parents: KaiOS under Firefox (the browser) because Firefox OS is not in the tree; BeagleBoard and OpenMP in groups rather than under a node; Zephyr under the Linux Foundation as its host. A real time systems group would suit Zephyr, FreeRTOS and VxWorks together.
- The layout precision test passed with all 16 in, but it remains the limit on stacked data runs (see the first 2026-11-28 report).
