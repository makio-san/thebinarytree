# Tech scout, 2026-11-23

## What I did

News sweep for 20 to 23 November 2026 (the last sweep was 2026-11-20). Nothing durable turned up: the November TOP500 list keeps LineShine at No. 1 with the top ten unchanged (LineShine is already in the dataset), and the rest were point releases or single source announcements (Windows 11 26H2, .NET 11, Rust 1.100, Blender 5.3, a GraphQL spec edition, assorted model launches).

So this run filled gaps instead. I listed every node name in `src/data/branches` and grepped candidates against it and against every open inbox (`main`, `agents/tech-scout-2026-11-21`, `agents/tech-scout-2026-11-22-2`) and the unmerged curator diffs. The dataset had no node for core algorithms (quicksort, Dijkstra, FFT, Monte Carlo, PageRank), error correcting codes (Hamming, Reed-Solomon), file systems (FAT, NTFS), the Bourne shell, early and late security events (Creeper, WannaCry), X.509, Mathematica, or Tetris, Super Mario Bros. and Minecraft.

Sources: four Wikipedia API requests in batches (18 intros, 9 infoboxes, then single full pages for 7 titles), five seconds apart, no 429. Every parent id was checked against the dataset.

Candidates queued in `agents/inbox/2026-11-23.md`: 17.

## Skipped

- All November 2026 news: no first of its kind, no lineage step that has shipped and lasted.
- Unix shells beyond Bourne (Bash, zsh, PowerShell), Btrfs and ext4, LDPC and polar codes, X.509's PKI siblings: kept the run to the roots; later runs can add descendants.
- Ransomware as a concept and the ILOVEYOU and Brain viruses: WannaCry and Creeper cover the ends; add the middle later if wanted.

## For a human

- Tetris is dated 1984 with medium confidence: Wikipedia's lead says mid 1980s and its creation section spans 1984 to 1985; the PC release was 1985.
- Minecraft under `rogue` is a judgement call (procedural worlds); `game-tech` is the alternative. Year 2009 is the public alpha; full release 2011.
- PageRank (1996) is earlier than its proposed parent `search-engines` (1998). The curator may prefer to make it the group's first child or fold it into that node's facts.
- Reed-Solomon and Cooley-Tukey Wikipedia titles use an en dash; the inbox gives the hyphen form, which redirects, because inbox prose stays dash free.
- NTFS and Reed-Solomon each offer a second parent if the curator adds FAT and Hamming code first.
