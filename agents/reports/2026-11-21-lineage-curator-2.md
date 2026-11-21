# Lineage curator, 2026-11-21 (second run)

## What I did

Branched from `agents/tech-scout-2026-11-21-2`, which is not merged yet, so I could read its inbox `agents/inbox/2026-11-21-2.md`. This morning's lineage curator branch (`agents/lineage-curator-2026-11-21`) is also unmerged; it does not touch any of these ids, so the two should merge cleanly apart from the inbox and report files.

I re-opened sources for all 13 entries: rfc-editor.org metadata for RFC 15, 821, 854, 958, 1064, 1436, 5849 and 6749, and the Wikipedia articles (two batched requests of 13 and 10 titles, five seconds apart, no 429). All 13 Wikipedia titles resolve with no redirect.

Added 13 nodes, each with a Wikipedia title, and creators for 11:

| Node | Parent | Year |
| --- | --- | --- |
| Telnet | arpanet | 1969 |
| SMTP | email | 1982 |
| IMAP | email | 1986 |
| NTP | tcp-ip | 1985 |
| Gopher | tcp-ip | 1991 |
| OAuth | http-1-1 | 2007 |
| Heartbleed | tls | 2014 |
| Stuxnet | systems-security | 2010 |
| Lotus 1-2-3 | visicalc | 1983 |
| Microsoft Excel | visicalc | 1985 |
| MATLAB | fortran | 1984 |
| LaTeX | tex | 1984 |
| LSTM | backpropagation | 1997 |

Type check and all 131 tests pass.

## Changes from the inbox

- Heartbleed: no creators entry. Neel Mehta and Codenomicon discovered the bug; they did not make it, and the table is for makers. The summary names them as finders instead. The "underfunded library" line was dropped as opinion.
- Stuxnet: no creators, as the scout suggested. The summary says it is widely reported to be American and Israeli and that neither has admitted it, which is how Wikipedia puts it, in place of the unsourced "first widely known cyberweapon".
- Gopher: "spread faster than the early web" softened to "caught on while the web was still new". Licence fees confirmed as February 1993. Creators are the five Wikipedia names for the 1991 release; RFC 1436 also lists D. Johnson.
- MATLAB: confirmed on Wikipedia (late 1970s origin, Little and Bangert's C rewrite, commercial release in 1984). The claim about avoiding Fortran was not in the source, so the summary says "interactive matrix calculator for his students" instead.
- Excel: "took the market from Lotus" pinned to the Lotus 1-2-3 article ("surpassed by Microsoft in the early 1990s").
- LaTeX: kind `concept` to match TeX, not `language`.
- OAuth: parent `http-1-1` (Wikipedia: designed specifically to work with HTTP). Eran Hammer-Lahav is credited as Eran Hammer, the name Wikipedia uses.
- Telnet: creator Steve Carr (C. Stephen Carr in RFC 15). RFC 854 itself is by Postel and Reynolds.

## Skipped

Nothing.

## For a human

- MATLAB rests on Wikipedia alone (MathWorks' history page was not fetched).
- Gopher, Telnet and Stuxnet creator choices above are judgement calls.
- New people for the portrait agent: Steve Carr, Mark Crispin, David L. Mills, Mark McCahill, Farhad Anklesaria, Paul Lindner, Daniel Torrey, Bob Alberti, Blaine Cook, Chris Messina, Larry Halff, David Recordon, Eran Hammer, Mitch Kapor, Jonathan Sachs, Jabe Blumenthal, Doug Klunder, Cleve Moler, Jack Little, Steve Bangert, Sepp Hochreiter, Jürgen Schmidhuber.
