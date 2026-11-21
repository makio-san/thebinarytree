# Release reviewer, 2026-11-20 (second run)

## What I did

Listed `agents/*` branches ahead of `main` with no review file. Two were new since this morning's run, and both are approved:

- `agents/fact-checker-2026-11-20` at `2f66171`: approve. All five corrected nodes checked against sources.
- `agents/tech-scout-2026-11-20` at `d56785e`: approve. Five of fifteen candidates checked.

## Skipped

- `agents/lineage-curator-2026-11-20`: this morning's run (`agents/release-reviewer-2026-11-20`) already approved it, and its tip `080a07f` has not moved.
- `agents/release-reviewer-*` branches are not reviewed, as on earlier days.

## For a human

- The fact-checker report quotes the Wikipedia title `Church–Turing thesis` with its en dash inside backticks. I accepted it as a quoted identifier, not prose.
- The main checkout at `/Users/esma/Developer/the-binary-tree` had uncommitted changes in ten `src/data/branches/*.ts` files when this run started. They are not from this run, and I left them alone.
