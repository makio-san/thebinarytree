# Lineage curator, 2026-11-26

Branch `agents/lineage-curator-2026-11-26`, built on the unmerged `agents/tech-scout-2026-11-26` so its inbox could be read. 19 nodes added, 1 entry skipped, 5 left queued. Type check clean and all 148 tests pass.

## Inbox files

- `agents/inbox/2026-11-25.md`: nine of its ten remaining entries added and appended to `done/2026-11-25.md`. Bloom filter stays in the inbox with a `skipped:` note.
- `agents/inbox/2026-11-26.md`: the first ten of fifteen entries added and moved to `done/2026-11-26.md`. OpenCL, RocksDB, red-black tree, consistent hashing and ICQ stay queued for the next run; that keeps this run at about 20 entries.
- Left alone, as in earlier runs: `2026-11-21.md` (on `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`, approved but conflicting), `2026-11-24.md` (on `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`, approved but conflicting), `2026-11-23.md` (Minecraft, still no honest parent) and `2026-11-25-web-reader.md` (TSMC, already a node on the approved `agents/lineage-curator-2026-11-25-2`).

## Added

Sources: one batched Wikipedia request for the intros of 20 titles, five seconds later one for the other five, then one batched request for the wikitext of eleven articles. All returned 200, no 429. All 19 titles resolve without a redirect.

| Node | Parent | Year |
| --- | --- | --- |
| `rowhammer` | `dram` | 2014 |
| `homomorphic-encryption` | `rsa` | 2009 |
| `wifi-7` | `wifi` | 2024 |
| `nerf` | `alexnet` | 2020 |
| `gaussian-splatting` | `nerf` | 2023 |
| `xpoint-3d` | `flash-memory` | 2015 |
| `harmonyos` | `android` | 2019 |
| `fuchsia` | `other-os` | 2016 |
| `h266` | `h265` | 2020 |
| `amd-zen-6` | `amd-zen` | 2026 |
| `tpm` | `systems-security` | 2003 |
| `intel-sgx` | `intel-core-i` | 2015 |
| `xfs` | `irix` | 1994 |
| `apfs` | `macos` | 2017 |
| `zsh` | `bourne-shell` | 1990 |
| `rpm` | `linux` | 1995 |
| `docsis` | `modem` | 1997 |
| `ldpc` | `hamming-code` | 1960 |
| `turbo-code` | `hamming-code` | 1993 |

Titles and creators are in a new `Scout inboxes 2026-11-25 (remainder) and 2026-11-26` section at the end of `WIKI_TITLES` and `CREATORS`. No portraits touched.

## Changes from the inbox

- Fuchsia: placed under `other-os` instead of `minix`. The article says it runs on its own Zircon kernel and names no ancestor, so it sits with the other systems written from scratch.
- 3D Gaussian splatting: placed under `nerf` instead of `alexnet`. The article calls it a radiance field method and it is not a neural network.
- DOCSIS: placed under `modem` in the telecom branch instead of `ethernet`. The article says version 1.0 took functional elements from earlier proprietary cable modems; it says nothing that ties it to Ethernet.
- Turbo codes and LDPC codes: placed under `hamming-code`, beside Reed-Solomon, instead of under it. Neither descends from Reed-Solomon. LDPC is named `LDPC Codes` and turbo codes carry origin France, which the article gives for the authors' school.
- AMD Zen 6: the article gives 256 cores for the dense Zen 6c variant of the Epyc 9006 and 96 for Venice itself, so the summary says "along with a dense variant of up to 256 cores". The article infobox lists a server launch on 10 November 2026; the node is dated to the 2026 announcement and the summary does not claim a ship date.
- Rowhammer: "research presented in June 2014" became "a 2014 analysis named the effect", which is the article's wording. The Project Zero date, 9 March 2015, is in the article.
- Trusted Platform Module: kind `component` instead of `concept`, since it is a chip.
- RPM: era `modern`, like its parent Linux and its siblings, instead of `network`. The summary names Troan and Ewing, as the article does.
- HarmonyOS: "dropped Android app support" became "removed all Android code", the article's wording.
- Wi-Fi 7: "the successor to Wi-Fi 6" became "built upon Wi-Fi 6", the article's wording.
- The id of 3D XPoint is `xpoint-3d`, because no id in the tree starts with a digit.
- No creators entry for NeRF: the article cites the 2020 paper by Mildenhall and others but credits no one in its prose. None for the other nodes whose articles name companies or committees only.
- No `origin` except on zsh, LDPC and turbo codes, where the text I opened places the work in one country.

## Skipped

- Bloom filter: year and creator are confirmed, the lineage is not. `integrity` holds cryptographic hashes and signatures, and the tree has no hash table or data structures group.

## For a human

- A data structures group (hash table, Bloom filter, red-black tree, consistent hashing) would give four queued entries a home. That is a job for the `lineage-architect`.
- This branch depends on `agents/tech-scout-2026-11-26`, which is not reviewed yet.
- `agents/lineage-curator-2026-11-25-2` is approved and not merged. It touches the same branch files; I kept every insertion at least a few lines away from its hunks (RPM is the first child of `linux` because that branch appends ext4 at the end), so the branch files should merge cleanly. `wiki.ts` and `creators.ts` should too, since that branch writes before the 2026-11-23 section and this one at the end.
- The two approved branch fixer branches still conflict with `main` and append to the end of `wiki.ts` and `creators.ts`, where this branch also writes. Whoever resolves them will meet this section as well.
- The layout precision test passed with a node under `intel-core-i`, the deepest x86 link earlier reports warned about. It may still fail on the merged result with the other waiting branches.
- Loose parents kept from the scout: NeRF under `alexnet`, 3D XPoint under `flash-memory` (a different memory technology, the same shelf), Intel SGX under `intel-core-i`.
