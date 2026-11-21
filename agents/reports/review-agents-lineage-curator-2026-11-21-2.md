branch: agents/lineage-curator-2026-11-21-2
reviewed-head: ed413a6cb99aa1c797d33c11d5ad6a3330be0c62
verdict: approve

## Reasons

All 13 new nodes have the year, creators and parent their sources give, the build is green, and the commits follow the rules. The curator also fixed every weak point in the scout's inbox before writing the data (see the scout review).

## What I checked

- Throwaway worktree at the tip: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, demo build succeeded. Merges into the current `main` (d472cec) with no conflict, and also merges cleanly with `agents/lineage-curator-2026-11-21`.
- Four commits, all by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with a scope and a sentence, no trailers. The first two are the scout's commits from `agents/tech-scout-2026-11-21-2`, which this branch is built on. No em or en dashes in added lines, no secrets, no stray files. The inbox ends up only in `agents/inbox/done/`.
- Parents, read from the built dataset: telnet under arpanet, smtp and imap under email, ntp and gopher under tcp-ip, oauth under http-1-1, heartbleed under tls, stuxnet under systems-security, lotus-1-2-3 and microsoft-excel under visicalc, matlab under fortran, latex under tex, lstm under backpropagation. All match the report.
- Facts re-verified from sources I opened myself:
  - Telnet: rfc-editor.org RFC 15 metadata, C.S. Carr, September 1969.
  - IMAP: RFC 1064 metadata, M.R. Crispin, July 1988, version 2.
  - NTP: RFC 958 metadata, D.L. Mills, September 1985.
  - OAuth: Wikipedia. Began November 2006 with Blaine Cook at Twitter; Cook, Chris Messina, Larry Halff and David Recordon; Eran Hammer joined later; OAuth Core 1.0 on 3 October 2007; RFC 6749 in October 2012.
  - Microsoft Excel: Wikipedia. Project begun in 1983, led by Jabe Blumenthal with Doug Klunder; released for the Macintosh on 30 September 1985.
  - LaTeX: Wikipedia. Leslie Lamport at SRI International in the early 1980s, released 1984 and 1985.
  - Stuxnet: Wikipedia. Uncovered 17 June 2010, four zero day flaws, Siemens controllers, neither the US nor Israel has admitted it.
  - Gopher: Wikipedia. Released mid 1991 at the University of Minnesota by McCahill, Anklesaria, Lindner, Torrey and Alberti; licence fees announced February 1993.
  - Heartbleed: Wikipedia. Fix released and bug disclosed on 7 April 2014; found independently by Neel Mehta of Google and by Codenomicon.
  - MATLAB: Wikipedia. Cleve Moler, first version late 1970s, John (Jack) Little and Steve Bangert rewrote it in C, first sold in 1984.

## Notes for a human (not blocking)

- Merging this branch also brings in the scout's two commits, which land the inbox in `done/`. The scout branch on its own is rejected (Heartbleed finders listed as creators), but that inbox is archived here with the error already corrected in the data and recorded in the curator report.
- MATLAB rests on Wikipedia alone, as the curator says.
- The new creators need portraits; the list is in the curator report.
