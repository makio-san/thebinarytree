# Lineage curator, 2026-11-28

Branch `agents/lineage-curator-2026-11-28`, built on the unmerged `agents/tech-scout-2026-11-28` so its inbox could be read. 19 nodes added, 1 entry skipped, 1 confirmed and queued. Type check clean and all 161 tests pass.

## Inbox files

- `2026-11-25.md`: Bloom filter added under `hash-table`, which is on `main` now. File moved to `done/`.
- `2026-11-26.md`: RocksDB (under `leveldb`) and consistent hashing (under `hash-table`) added, both now that `agents/lineage-curator-2026-11-26-2` is merged. File moved to `done/`.
- `2026-11-27.md`: Linux namespaces and PyPI added. World of Warcraft stays skipped.
- `2026-11-27-web-reader.md`: Euclidean algorithm added. File moved to `done/`.
- `2026-11-28.md`: thirteen of fifteen added and moved to `done/2026-11-28.md`. Maple is skipped, Microsoft HoloLens is queued.
- Left alone, as in earlier runs: `2026-11-21.md`, `2026-11-24.md`, `2026-11-25-2.md`, `2026-11-25-web-reader.md` and `2026-11-27-2.md` (handled on waiting curator or fixer branches), `2026-11-26-2.md` (regular expression, already on a waiting branch) and `2026-11-23.md` (Minecraft, no honest parent).

## Added

Sources: two batched Wikipedia requests for the intros of 21 titles (11 and 10), and two for their wikitext, five seconds apart. All returned 200, no 429. Every stored title resolves directly, with no redirect.

| Node | Parent | Year |
| --- | --- | --- |
| `rocksdb` | `leveldb` | 2012 |
| `bloom-filter` | `hash-table` | 1970 |
| `consistent-hashing` | `hash-table` | 1997 |
| `euclidean-algorithm` | `theory` | -300 |
| `linux-namespaces` | `linux` | 2002 |
| `chromeos` | `linux` | 2011 |
| `inferno` | `plan-9` | 1996 |
| `the-multiprogramming-system` | `early-os` | 1965 |
| `tops-20` | `other-os` | 1976 |
| `vxworks` | `other-os` | 1987 |
| `gnu-hurd` | `other-os` | 1990 |
| `freertos` | `other-os` | 2003 |
| `risc-os` | `acorn-archimedes` | 1987 |
| `pypi` | `python` | 2003 |
| `theano` | `ai` | 2007 |
| `keras` | `tensorflow` | 2015 |
| `gpt-3` | `llm` | 2020 |
| `llama-cpp` | `llama` | 2023 |
| `esp32` | `arduino` | 2016 |

Titles and creators are in a new `Scout inboxes 2026-11-25 to 2026-11-28 (remainders), web reader inbox 2026-11-27` section at the end of `WIKI_TITLES` and `CREATORS`. New nodes are appended as the last child of their parent. No portraits touched.

## Changes from the inbox

- Linux namespaces: under `linux` beside `cgroups`, not under `cgroups`. Namespaces came five years earlier (kernel 2.4.19, 2002); the article treats the two as partners, not parent and child.
- Bloom filter: era `theory` like its parent, not `integrated`. The summary now says why Bloom wanted it (error-free hashing needed too much memory) and gives his hyphenation example, both from the article.
- Consistent hashing: names Lewin and Leighton as the Akamai founders, as the article does.
- Theano: kept in the `ai` group as the scout proposed, because the article ties it to no node in the tree. "Frameworks that came later followed its approach" is dropped (not in the article); the Aesara and PyTensor forks and the September 2017 end-of-development message are from the article.
- Keras: adds that it once ran on Theano and other backends, from the article.
- GPT-3: no creators entry. The paper has 31 authors; naming only the first would mislead.
- llama.cpp: "C and C++" dropped; the text I opened does not say. Ollama and LM Studio named as the article does.
- VxWorks: adds that it grew out of enhancements to VRTX, from the article.
- RISC OS: dated 25 September 1987 as Arthur 1.20, renamed with version 2 in April 1989, from the article.
- THE: "strict layers" became the article's point that higher layers depend only on lower ones.
- `origin` only where the text I opened places the work (Netherlands, England, Canada, and USA for MIT, Facebook, Google, Bell Labs, DEC and OpenAI).

## Skipped

- Maple: year and Gonnet confirmed, lineage not. It was written in B and C as a cheaper alternative to the Lisp based Macsyma, so `lisp` would be a false parent (Mathematica sits there because its language is Lisp based). A computer algebra group would give it a home.

## Queued, not skipped

- Microsoft HoloLens: confirmed (Development Edition 30 March 2016, tracking traced to Kinect). With all 20 nodes in, the layout precision test failed again (5.8e-10 against 5e-10). Dropping it, the newest entry, passes; dropping llama.cpp, Keras or Theano instead does not. Add it under `kinect` next run.

## For a human

- The layout precision test (`toBeCloseTo(1.1, 9)` in `test/layout.test.ts`) is still the limit on every data run, as reported on 2026-11-27. It needs a `code-health` look; until then each waiting data branch can turn red when merged with another.
- This branch depends on `agents/tech-scout-2026-11-28`, which is not reviewed yet.
- Loose parents: ESP32 under `arduino` (the article lists an Arduino core and many Arduino-style boards, but ESP32 is a chip, not a board), and `arduino` itself sits in `wearables`. Theano in `ai` at the top level.
- Four `other-os` additions (TOPS-20, VxWorks, GNU Hurd, FreeRTOS) would fit better under a real time group and under Mach and TENEX once those exist; Mach waits on `agents/lineage-curator-2026-11-24-2`.
