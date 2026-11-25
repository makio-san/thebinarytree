branch: agents/lineage-curator-2026-11-25
reviewed-head: aa300a1438beac0c833b00c2cbce465753216538
verdict: approve

19 nodes added. Built on `agents/tech-scout-2026-11-25`, whose two commits it contains; that branch is approved in this run too.

## Checked

- Whole diff against `main`: seven branch files, `wiki.ts`, `creators.ts`, inbox moves and the two reports. No stray files, no secrets, no node_modules.
- All 5 commits authored and committed as `makio-san <killbillbeatrixx@gmail.com>`; Conventional Commits with a scope and a sentence; no Claude trailer or co-author; no em or en dashes in added lines.
- Branch tip: `tsc --noEmit` clean, vitest 148 of 148, demo build ok. Merged into `main`: clean merge, `tsc` clean, 148 of 148, demo build ok.
- Inbox housekeeping: every entry in the removed `2026-11-22-2.md` and `2026-11-23-2.md` is already a node on `main`, except Kerberos, as the report says. The ten entries the report lists as still queued are the ten left in `agents/inbox/2026-11-25.md`.
- Facts, opened on Wikipedia in this run (intros for 16 titles, wikitext for 7):
  - Ladybird: began in SerenityOS in 2019, separate project since September 2022 by Andreas Kling, engine not based on Chromium, Gecko or WebKit, alpha released in 2026. Matches.
  - Btrfs: Chris Mason, 2007, on-disk format stable since November 2013 (Linux 3.13). Matches.
  - Exchange Server: 4.0 released 2 April 1996, successor to Microsoft Mail 3.5, MAPI and SMTP. Matches.
  - Kinect: PrimeSense, Project Natal at E3 2009, released 4 November 2010, eight million units in 60 days. Matches.
  - Log4Shell: unnoticed since 2013, Chen Zhaojun of Alibaba Cloud, 24 November 2021, CVSS 10, LDAP and JNDI. Matches.
  - cgroups: Google, 2006 as process containers, renamed late 2007, kernel 2.6.24 in January 2008, written by Paul Menage and Rohit Seth. Matches.
  - B-tree (Bayer and McCreight at Boeing Research Labs), LSM tree (four authors, 1996), CRDT (2011, four authors, collaborative editing), Godot (Linietsky and Manzur, Buenos Aires, MIT License, public in 2014), AlphaZero (preprint 5 December 2017, Stockfish and Elmo), Whisper (September 2022), Flutter (described 2015, released May 2017), USB4 (2019, Thunderbolt 3, USB-C only, 20, 40 and 80 Gbit/s), Web 2.0 (DiNucci 1999, O'Reilly and Dougherty 2004), Word2Vec (five authors at Google, 2013), io_uring (Linux 5.1, 2019, Jens Axboe), RLHF (OpenAI and DeepMind, Atari, June 2017). All match.
- No wrong fact found. Parents all exist; the report is open about the loose ones.

## For the merger and a human

- This branch and `agents/branch-fixer-2026-11-25-lineage-curator-2026-11-24-2` each merge cleanly into `main`, but merging both gives conflicts in `src/data/wiki.ts`, `src/data/creators.ts` and `src/data/branches/networks.ts`. Whichever goes second will need the branch fixer or a hand merge.
- The Kerberos inbox entry is removed here while Kerberos itself exists only on the stuck `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`. If that branch never lands, Kerberos has to be queued again.
- Flutter under `android`, Word2Vec under `backpropagation` and CRDT under `dynamo` are loose fits, as the curator says for the first.
- The layout precision test sits right at its limit (5.06e-10 against 5e-10 in the curator's first attempt). That is for `code-health`.
