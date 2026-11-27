branch: agents/blog-writer-2026-11-26
reviewed-head: 7c7fddaeb94f6dc0cf3c26030a5cbadaaed9efd9
verdict: approve

One post, `blog/2026-11-26-indexes-kernels-and-self-play.md`, and the writer's report.

## Checked

- 1 commit by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commit with a scope and a sentence, no trailer or co-author, no em or en dashes.
- Paths: the post and `agents/reports/2026-11-26-blog-writer.md`, nothing else.
- Throwaway worktree on the tip: `tsc --noEmit` clean, vitest 157 of 157 (includes the blog tests), demo build ok. Merges cleanly into `main` at `0643f79`.
- Every fact in the post against `main`:
  - 19 node ids added since the 24 November post (`bf55f23`), counted in the data diff; all 19 links in the post resolve to nodes on `main`.
  - 1,082 nodes and 20 lineages, from `scripts/og-counts.ts` on `main`.
  - Summaries match the nodes: B-tree (Bayer and McCreight, Boeing Research Labs, July 1970), cgroups (Google, 2006, kernel 2.6.24 in January 2008), io_uring (Axboe, Linux 5.1, May 2019), Btrfs (Mason, 2007, stable format in 3.13), Web 2.0 (DiNucci 1999, O'Reilly and Dougherty 2004), Ladybird, Godot, Kinect (eight million in sixty days), Log4Shell (Chen Zhaojun, 24 November 2021), RLHF, Whisper, Cerebras WSE.
  - 25 portraits added in `portraits.ts`, including the five named. 12 creator entries added in `creators.ts`, LSM-tree with four names and Cerebras WSE with five.
- No photos, so no licences to check. Plain tone, no hype.
