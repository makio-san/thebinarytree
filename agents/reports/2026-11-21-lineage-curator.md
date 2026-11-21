# Lineage curator, 2026-11-21

Processed `agents/inbox/2026-11-21.md` (branched from the unmerged `agents/tech-scout-2026-11-21`). All twelve entries were confirmed and added. The file is now in `agents/inbox/done/`.

## Added (12 nodes)

| Node | Parent | Year | Checked against |
| --- | --- | --- | --- |
| X Window System (`x-window-system`) | `unix` | 1984 | Wikipedia, X Window System (origin, Scheifler and Gettys, X11 since September 1987) |
| SCSI (`scsi`) | `hard-disk` | 1986 | Wikipedia, SCSI (SASI 1981, Boucher, ANSI X3.131-1986) |
| Serial ATA (`serial-ata`) | `hard-disk` | 2003 | Wikipedia, SATA (announced 2000, revision 1.0 and Barracuda SATA V in January 2003) |
| FireWire (`firewire`) | `macintosh` | 1995 | Wikipedia, FireWire (Apple from 1986, with Sony and Panasonic, IEEE 1394-1995) |
| HDMI (`hdmi`) | `displays` | 2003 | Wikipedia, HDMI (founders, work began 16 April 2002, introduced 2003) |
| Thunderbolt (`thunderbolt`) | `peripherals` | 2011 | Wikipedia, Thunderbolt (interface) (Light Peak, 24 February 2011, USB-C from version 3) |
| Turing Test (`turing-test`) | `ai` | 1950 | Wikipedia, Turing test; Crossref for Mind LIX.236.433, October 1950 |
| ELIZA (`eliza`) | `turing-test` | 1966 | Wikipedia, ELIZA; Crossref for the CACM paper, 1966 |
| File Transfer Protocol (`ftp`) | `arpanet` | 1971 | RFC 114 itself (A. Bhushan, 16 April 1971); Wikipedia for RFC 765 and RFC 959 |
| Kerberos (`kerberos`) | `symmetric` | 1989 | Wikipedia, Kerberos (protocol) (Miller and Neuman, v4 on 24 January 1989, Windows 2000 default) |
| Secure Shell (`ssh`) | `public-key` | 1995 | Wikipedia, SSH (Ylönen 1995, SSH-2 standardised 2006) |
| Siri (`siri`) | `iphone` | 2011 | Wikipedia, Siri (SRI spin off, app in December 2010, iPhone 4S October 2011) |

Wikipedia titles for all twelve were checked to resolve in one batched request. Two inbox titles were redirects and the canonical titles are used instead: `IEEE 1394` is stored as `FireWire`, `Secure Shell` as `SSH`.

Creators added for X, SCSI, HDMI (the eight founders as listed by Wikipedia, a consortium), FTP, Kerberos, SSH, the Turing test and ELIZA. No creators for Serial ATA, FireWire, Thunderbolt and Siri, which are corporate or working group products.

## Choices a human should look at

- The "Buses and interconnects" group proposed in `2026-11-20-2.md` does not exist on `main` or on any curator branch, so the scout's fallback parents were used: SCSI and Serial ATA under Hard Disk, FireWire under the Macintosh, HDMI under Display and Output, and Thunderbolt directly under Input, Output, and Storage. If that group is added later, these five should move into it.
- The Kerberos summary drops the inbox's "work began in 1986" phrasing in favour of the confirmed public v4 date. ELIZA is placed under the Turing test rather than directly under AI.
- `agents/inbox/2026-11-20-2.md` (on the unmerged `agents/tech-scout-2026-11-20-2`) has not been processed by any curator run. It was left alone here because it is not the newest inbox file.

## Skipped

None.

Type check and the full test suite (131 tests) pass.
