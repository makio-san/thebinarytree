# Lineage curator, 2026-11-25, second run

Branch `agents/lineage-curator-2026-11-25-2`, built on the unmerged `agents/tech-scout-2026-11-25-2` so its inbox could be read. 16 nodes added, 0 entries skipped. Type check clean and all 148 tests pass.

## Inbox files

- `agents/inbox/2026-11-25-2.md`: all fifteen entries added, file moved to `done/`.
- `agents/inbox/2026-11-25-web-reader.md`: its one entry (TSMC) added, file moved to `done/`.
- Not oldest first, on purpose. `agents/inbox/2026-11-25.md` still shows all fifteen entries on `main`, but five of them are nodes on the approved and not yet merged `agents/lineage-curator-2026-11-25`, which also rewrites that file. Touching it here would have made a conflict, so its ten remaining entries wait for the next run.
- Left alone, as in the first run today: `2026-11-21.md` (on the stuck branch fixer branch), `2026-11-22.md`, `2026-11-22-2.md`, `2026-11-23-2.md`, `2026-11-24-2.md` and `2026-11-24-web-reader.md` (handled or removed on `agents/lineage-curator-2026-11-25`), `2026-11-24.md` (on `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2`) and `2026-11-23.md` (Minecraft, still no honest parent).

## Added

Sources: one batched Wikipedia request for the intros of 17 titles (the 16 below and `Foundry model`), five seconds later one batched request for the wikitext of eleven of them. Both returned 200, no 429. All 16 titles resolve without a redirect.

| Node | Parent | Year |
| --- | --- | --- |
| `alohanet` | `packet-switching` | 1971 |
| `x-25` | `packet-switching` | 1976 |
| `nfs` | `local-networks` | 1984 |
| `minitel` | `online-services` | 1980 |
| `chroot` | `research-unix-v6` | 1979 |
| `ext4` | `linux` | 2008 |
| `infiniband` | `beowulf` | 1999 |
| `support-vector-machine` | `perceptron` | 1992 |
| `actor-model` | `theory` | 1973 |
| `csp` | `theory` | 1978 |
| `dbase` | `relational` | 1978 |
| `hypercard` | `hypertext` | 1987 |
| `perlin-noise` | `graphics-documents` | 1983 |
| `signal-protocol` | `diffie-hellman` | 2013 |
| `webrtc` | `websocket` | 2011 |
| `tsmc` | `integrated-circuit` | 1987 |

Titles and creators are in a new `Scout inbox 2026-11-25 (second run) and web reader inbox 2026-11-25` section placed just before the `Scout inbox 2026-11-23` section in `WIKI_TITLES` and `CREATORS`, not at the end of the tables, so they stay clear of the sections the two waiting curator branches add. No portraits touched.

## Changes from the inbox

- InfiniBand: dated 1999, not 2000. The article says it originated in 1999 from the merger of Future I/O and Next Generation I/O; I found no sentence in it for "version 1.0 of the specification in 2000", so that claim is dropped. The TOP500 sentence comes from the article intro.
- chroot: "the oldest ancestor of the container" is dropped, since the article does not say it. The summary says instead that FreeBSD expanded the idea into the jail in 2000, which it does say. Era `network` to match its sibling, the Bourne shell.
- WebRTC: the article infobox says released 2011 and cites Google's source code release of 31 May 2011. The summary says 2011 without the month, and adds the Global IP Solutions purchase of 2010 from the article.
- ext4: the article lists seven developers in the infobox and calls Theodore Ts'o the principal developer and the ext3 maintainer who announced the plan. Credited to Ts'o alone. "Android adopted it from version 2.3" became "Google chose it for Android 2.3", which is what the article reports.
- Signal Protocol: the last sentence, on elliptic curve Diffie-Hellman, is from the article intro and is there to justify the parent.
- Support vector machine: era `micro`, like its sibling backpropagation, instead of `network`.
- Actor model and CSP: era `theory`, like every other child of `theory`, instead of `micro`.
- TSMC: named `TSMC and the Foundry Model`, with the company article as the title. The foundry model article confirms that Morris Chang conceived the model and lists Nvidia and Qualcomm as fabless companies.
- No creators entry for X.25, Minitel, NFS, chroot, InfiniBand and WebRTC: the articles name organisations or committees. The chroot infobox names Bill Joy, but the text only says "one source suggests" he added it to BSD in 1982, so he is left out.
- No `origin` on dBase, Perlin noise, the Signal Protocol, X.25, CSP, the actor model, InfiniBand, ext4 and WebRTC, because the text I opened does not place them in one country.

## For a human

- The layout precision test passed this time with a node added under `integrated-circuit`, but the earlier reports show it sits at its limit. It may fail when this branch is merged together with the other waiting curator branches.
- This branch touches `networks.ts`, `operating-systems.ts`, `frontier.ts`, `wiki.ts` and `creators.ts`, which `agents/lineage-curator-2026-11-25` and `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` also touch. The side table sections are in a different place, but the branch files may still need a hand merge.
- Loose parents: dBase under `relational` (it predates SQL on microcomputers and is not a strict relational system), WebRTC under `websocket` (a sibling in purpose, not a descendant) and InfiniBand under `beowulf`. All three are the scout's choice, kept for want of a better home.
- Still queued: the ten entries of `agents/inbox/2026-11-25.md` listed in the first report of today.
