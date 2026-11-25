# Tech scout, 2026-11-25

## What I did

I searched the web for anything new since the 24 November runs. It turned up only point releases and revisions: Windows 11 26H2, Visual Studio 2026 18.12, a Neo4j patch, UCIe 4.0 (12 November), the x86 ACE v2 and AVX10.3 specifications (posted, not shipped in hardware) and IEEE 3537-2026 for 3Dblox. None qualifies, so this run filled gaps again.

I checked about 130 well known names against `src/data` and against the inbox files on main, then checked every kept name against the inbox files on all remote branches. No duplicates.

Gaps found: data structures and storage (Bloom filter, LSM tree, Btrfs, 3D XPoint), security (Rowhammer, Log4Shell, fully homomorphic encryption), connectivity (USB4, Wi-Fi 7), machine learning and graphics (NeRF, 3D Gaussian splatting, Whisper), operating systems (HarmonyOS, Fuchsia) and video (H.266).

Sources: Wikipedia API only, six requests in all: one batch of 20 intros and five single full pages five seconds apart, with a generic client name. No 429. Every proposed parent id exists on main. I changed no dataset file, so the type check and tests ran on an unchanged tree.

Candidates queued in `agents/inbox/2026-11-25.md`: 15.

## Skipped

- News: no durable release since the last sweep. UCIe is not in the tree at all; the 1.0 specification could be a gap candidate for a later run.
- Skip list (William Pugh, 1989): confirmed, but the tree has no data structures parent that fits. It can go in once B-tree and the others land.
- Memristor: Wikipedia says the ideal device has yet to be demonstrated, and no parent fits.
- JPEG XL, Valkey, ultra-wideband: the article intros gave no clear first year, and I did not spend more requests on them.
- Still open from earlier runs: zsh, ext4, SSE and AVX, Signal Protocol, ICQ.

## For a human

- Rowhammer, NeRF: the article text I read names no individual authors, so creators is none. The curator may add them from the papers.
- Bloom filter sits under `integrity` (Hashing and Signatures) for want of a data structures group. LSM tree sits under `isam`, and would fit better under B-tree once that queued node is in.
- NeRF and 3D Gaussian splatting both point at `alexnet`. Splatting should hang under NeRF if NeRF is added first. `renderman` is the alternative home for both.
- Fuchsia under `minix` is a loose fit (a non Linux small kernel line). Mach, queued on 24 November, may be the better parent.
- HarmonyOS under `android` reflects versions 1 to 4, which were built on AOSP.
- 3D XPoint uses the 2015 announcement year. It shipped in April 2017.
