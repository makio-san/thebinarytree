branch: agents/tech-scout-2026-11-22
reviewed-head: 0d992c6f491a07a3ce9d73fc37039c2d9c74c433
verdict: approve

## Why

Two commits, both docs only: the inbox `agents/inbox/2026-11-22.md` (twelve candidates) and the scout report. Nothing outside the scout's allowed paths. The branch merges into `main` (`15c370c`) cleanly.

## What I checked

- Type check, 131 tests and the demo build pass in a throwaway worktree with `npm ci` from the branch lockfile.
- Author is `makio-san <killbillbeatrixx@gmail.com>` on both commits. Messages are Conventional Commits with a scope and a sentence. No trailers, no Claude attribution, no em or en dashes, no secrets, no stray files.
- Every proposed parent exists in `src/data`: `email`, `tcp-ip`, `voip`, `json`, `http-2`, `virtualization-cloud`, `backpropagation`.

## Facts re-checked against sources I opened

- POP3: RFC 918, October 1984, J.K. Reynolds; RFC 1081, November 1988, M.T. Rose (rfc-editor.org JSON). Matches.
- MIME: RFC 1341, June 1992, N. Borenstein and N. Freed. Matches.
- SNMP: RFC 1067, August 1988, J.D. Case, M. Fedor, M.L. Schoffstall, J. Davin. Matches.
- LDAP: RFC 1487, July 1993, W. Yeong, T. Howes, S. Kille. Matches.
- DHCP: RFC 1531, October 1993, R. Droms. Matches.
- SIP: RFC 2543, March 1999, Handley, Schulzrinne, Schooler, Rosenberg. Matches.
- Protocol Buffers: protobuf.dev/history says Proto1 was developed starting in early 2001. Matches.
- MQTT: mqtt.org FAQ says Andy Stanford-Clark (IBM) and Arlen Nipper (Arcom) invented it in 1999. Matches.
- QEMU: Wikipedia infobox author Fabrice Bellard, first preview release 2003. Matches.
- YAML: Wikipedia infobox released 11 May 2001. Matches.
- Word2Vec: Wikipedia names Mikolov, Chen, Corrado, Sutskever and Dean at Google, 2013. Matches.

## Notes for the curator

- Placing YAML and Protocol Buffers under `json` and Word2Vec under `backpropagation` are judgement calls, flagged in the scout report. They are not wrong facts.
