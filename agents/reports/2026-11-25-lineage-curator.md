# Lineage curator, 2026-11-25

Branch `agents/lineage-curator-2026-11-25`, built on the unmerged `agents/tech-scout-2026-11-25` so its inbox could be read. 19 nodes added, 0 entries skipped. Type check and all 148 tests pass.

## Inbox files

- `agents/inbox/2026-11-24-2.md`: all ten entries added, file moved to `done/`.
- `agents/inbox/2026-11-24-web-reader.md`: all three entries added, file moved to `done/`.
- `agents/inbox/2026-11-22.md`: Word2Vec, held back on 22 November because of the layout precision test. Added now; the entry is appended to `done/2026-11-22.md` and the inbox file is removed.
- `agents/inbox/2026-11-25.md`: five of fifteen entries added and moved to `done/2026-11-25.md`. The other ten stay queued in the inbox file.
- Removed two stale copies: `agents/inbox/2026-11-22-2.md` and `agents/inbox/2026-11-23-2.md`. Every entry in them is already a node on `main` (processed copies are `done/2026-11-22-2.md`, `done/2026-11-23-2.md` and `done/2026-11-23-2-remainder.md`), except Kerberos, which is on `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`.
- Left alone: `2026-11-21.md` (handled by that branch fixer branch), `2026-11-24.md` (processed on the rejected `agents/lineage-curator-2026-11-24-2`, waiting for the branch fixer) and `2026-11-23.md` (Minecraft, still no honest parent).

## Added

Sources: one batched Wikipedia request for the intros of all 20 titles, five seconds later one batched request for the wikitext of ten of them, no 429. Two more sources were opened: the kernelnewbies page for Linux 5.1 (io_uring) and the arXiv record of paper 1706.03741 (RLHF). All 19 titles resolve; `Cerebras` redirects to `Cerebras Systems`, which is the title used.

| Node | Parent | Year |
| --- | --- | --- |
| `b-tree` | `isam` | 1970 |
| `lsm-tree` | `isam` | 1996 |
| `crdt` | `dynamo` | 2011 |
| `cgroups` | `linux` | 2007 |
| `io-uring` | `linux` | 2019 |
| `btrfs` | `zfs` | 2007 |
| `flutter` | `android` | 2017 |
| `godot` | `game-engine` | 2014 |
| `kinect` | `xbox` | 2010 |
| `cerebras-wse` | `tpu` | 2019 |
| `alphazero` | `alphago` | 2017 |
| `word2vec` | `backpropagation` | 2013 |
| `whisper` | `transformer` | 2022 |
| `rlhf` | `llm` | 2017 |
| `exchange-server` | `email` | 1996 |
| `web-2-0` | `web` | 2004 |
| `ladybird` | `web` | 2022 |
| `log4shell` | `systems-security` | 2021 |
| `usb4` | `usb` | 2019 |

Titles and creators are in a new section at the end of `WIKI_TITLES` and `CREATORS`. No portraits touched.

## Changes from the inbox

- Log4Shell: placed under `systems-security` instead of `heartbleed`, which sits under TLS. Log4Shell has nothing to do with TLS.
- Ladybird: placed under `web` next to WebKit instead of `mozilla-firefox`, as the web reader suggested, because its engine descends from no other browser.
- cgroups: the summary says kernel 2.6.24, released in January 2008, as the article does. The node year stays 2007, the year in the article infobox and of the rename.
- io_uring: the Wikipedia article does not state the kernel version. Linux 5.1 and 5 May 2019 come from kernelnewbies.org/Linux_5.1. Jens Axboe is credited as the author of the design paper the article cites.
- RLHF: the article gives no founding year in its prose. The 2017 date rests on the paper "Deep reinforcement learning from human preferences" (Christiano, Leike, Brown, Martic, Legg, Amodei, arXiv 12 June 2017), which the article lists and describes as OpenAI and DeepMind training Atari agents from human preferences. No creators entry, since the article credits no one with the technique as a whole.
- Cerebras: dated to the August 2019 announcement of WSE-1 and CS-1. Creators are the five company founders from the infobox.
- Kinect, Flutter, AlphaZero, Whisper, Exchange Server, USB4: no creators entry, the articles name companies or teams only.
- LSM tree: left under `isam` as queued. The scout note suggests moving it under `b-tree`; the article does not describe it as a descendant of the B-tree, so I did not.

## For a human

- The layout precision test in `test/layout.test.ts` is again the limit on where nodes can go. With all 19 nodes at their first parents the deepest x86 link (`intel-core` to `intel-core-i`) was off by 5.06e-10 against the 5e-10 limit, although no node was added to processors. With Btrfs under `linux` the test failed; under `zfs`, the parent the scout proposed, it passes. The error moves between 1e-10 and 5.5e-10 depending on unrelated subtrees, so the next run may hit it again. This is for `code-health` to settle; I did not touch the test.
- This branch depends on `agents/tech-scout-2026-11-25`, which is not reviewed yet. It edits that scout's inbox file by ancestry, so it merges cleanly once the scout branch is in.
- Flutter under `android` is a loose fit. A Dart node or a cross platform toolkit group would be a better home.
- Still queued from 25 November: Bloom filter (no fitting parent yet), Rowhammer, fully homomorphic encryption, Wi-Fi 7, NeRF, 3D Gaussian splatting, 3D XPoint, HarmonyOS, Fuchsia and H.266.
