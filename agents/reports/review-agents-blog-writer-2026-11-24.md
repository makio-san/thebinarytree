branch: agents/blog-writer-2026-11-24
reviewed-head: 7deeef55be88692f34dceeb083e4d0c2605d4b1e
verdict: approve

Changes only `blog/2026-11-24-memory-before-chips.md` and `agents/reports/2026-11-24-blog-writer.md`.

Checked:
- Both commits are authored by makio-san, Conventional Commits with scope and a sentence, no Claude trailer.
- No em or en dashes in the post or report; no photos, so no licences to check.
- Type check and all 146 tests pass on the branch, including the blog test.
- Every `node:` link in the post resolves to an id in `src/data`.
- Facts spot checked against Wikipedia: drum memory invented by Gustav Tauschek in 1932 and used as main memory of cheaper machines in the 1950s; CXL built on the PCI Express physical layer; MQTT as a lightweight protocol for constrained remote links. Years in the post (1944, 1932, 2003, 2019, 1999) match the dataset.
- The node count (1,018 to 1,063, so 45 added) was corrected in the second commit and the report explains how it was counted.
- Tone is plain, no hype.
