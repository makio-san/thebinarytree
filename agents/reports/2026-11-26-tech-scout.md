# Tech scout, 2026-11-26

## What I did

I searched the web for anything new since the 25 November runs. The sweep found one durable item, AMD Zen 6, whose first chips (Epyc 9006, Venice) were announced in July and are reported to be shipping this month. The rest was point releases and phones. The other fourteen entries fill gaps.

I checked about 190 well known names against `src/data` and against the inbox files on main and on every remote branch. No duplicates among the kept names.

Gaps found: hardware security (Trusted Platform Module, Intel SGX), file systems (XFS, APFS), Unix tooling (zsh, RPM), connectivity (DOCSIS, ICQ), coding theory (turbo codes, LDPC), parallel computing (OpenCL) and data structures and storage (RocksDB, red-black tree, consistent hashing).

Sources: three Wikipedia API requests five seconds apart (two batches of intros, one batch of 20 full pages) with a generic client name. No 429. Every proposed parent id exists on main. I changed no dataset file, so the type check and tests ran on an unchanged tree.

Candidates queued in `agents/inbox/2026-11-26.md`: 15.

## Skipped

- Apple M6 (released 22 September 2026, first Apple chip on a 2 nm process): the tree has only the M1, and M2 to M5 are absent, so one more generation alone did not qualify. A human may want the 2 nm milestone.
- GPT-6, Claude Fable 5.2, Wear OS 7, iOS 27.3: seen only as headlines in search results, not opened, and mostly version steps.
- LevelDB, Apache ZooKeeper, IPFS, simplex algorithm: the article text I read gave no clear first year. LevelDB should come before RocksDB if a later run confirms 2011.
- CHERI: prototypes date from 2012, but it began on MIPS and no parent in the tree fits well.
- Apache Arrow (2016), ClickHouse (2016), Tree-sitter (2018, Max Brunsfeld): confirmed, left for the next run to keep this file at 15.
- Still open from earlier runs: ext4, SSE and AVX, Signal Protocol, UCIe, JPEG XL, Valkey, ultra-wideband, skip list.

## For a human

- AMD Zen 6 is medium confidence. The Wikipedia article confirms the 23 July 2026 announcement. That the chips are shipping (server makers from 10 November 2026) comes only from search result summaries of press coverage. The one article I tried to open, on techzine.eu, returned 403, and I did not work around it. The curator should open AMD's own announcement before adding the node.
- DOCSIS under `ethernet` and ICQ under `usenet` are loose fits. The tree has no cable or modem node and no instant messaging node that I could find.
- RPM sits under `linux` because Red Hat Linux is not in the tree.
- Intel SGX sits under `intel-core-i`. `systems-security` is the alternative, next to the Trusted Platform Module.
- Consistent hashing sits under `integrity` for want of a distributed systems group, the same compromise as the Bloom filter. `dynamo` uses it but is ten years younger.
- XFS uses 1994, the year it shipped in IRIX 5.3. It was created in 1993.
- The summary for the red-black tree avoids the en dash in the Wikipedia title. The `wikipedia` field uses the hyphen form, which redirects.
