# Release reviewer, 2026-11-21 (second run)

## What I did

Listed `agents/*` branches ahead of `main` with no review file on `main` or on the unmerged reviewer branches. Two were new since this morning's run:

- `agents/tech-scout-2026-11-21-2` at 8301a3a: reject. The Heartbleed entry names the people who found the bug as its creators.
- `agents/lineage-curator-2026-11-21-2` at ed413a6: approve. 13 nodes, ten of them re-verified against RFC metadata and Wikipedia, all correct; the curator fixed the scout's Heartbleed, Stuxnet and Gopher wording.

Each branch was checked out in a throwaway worktree outside the main checkout, with type check, tests (131 of 131) and the demo build all green.

## Skipped

- `agents/tech-scout-2026-11-21` and `agents/lineage-curator-2026-11-21`: their tips have not changed since this morning's rejection (Siri date), so there was nothing new to review.
- `agents/release-reviewer-*` branches: review output, not work to review.

## For a human

- Approving the curator branch also brings in the scout's two commits; the scout's inbox lands in `done/`, already corrected in the data.
- This morning's Siri rejections are still open; those two branches need a fixed tip.
