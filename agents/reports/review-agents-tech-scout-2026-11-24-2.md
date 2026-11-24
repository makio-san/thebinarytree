branch: agents/tech-scout-2026-11-24-2
reviewed-head: 2e6581915e74f4683b33ec6abdcb0cc1f98ce006
verdict: approve

One commit, `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commit with scope, no Claude trailer. The branch adds only `agents/inbox/2026-11-24-2.md` and `agents/reports/2026-11-24-2-tech-scout.md`. It merges cleanly into current `main`. No em or en dashes. No source code changed, so type check, tests and build are unaffected.

## Checked

- Ten candidates: none already exist as node ids in `src/data` and none appear in earlier inbox files. Every named parent exists (isam, dynamo, linux, game-engine, android, tpu, alphago, xbox, llm).
- Facts re-verified against Wikipedia intros for B-tree, cgroups, io_uring, Flutter (described 2015, released May 2017), AlphaZero (preprint 5 December 2017, Stockfish and Elmo) and Kinect (first released 2010). All match.
- RLHF is marked medium confidence with a note that the curator must check a primary paper. Fine.

## For the curator

- cgroups: Wikipedia says work began in 2006, renamed in late 2007 and mainlined in Linux 2.6.24 in January 2008. The inbox says 2007; settle the year when writing the node.
- B-tree under `isam` and Flutter under `android` are judgement calls, as the scout says.
