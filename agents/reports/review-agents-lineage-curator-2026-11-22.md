branch: agents/lineage-curator-2026-11-22
reviewed-head: 1ea4f849d6cbe4bce84c46352fd38b9a8c1810f9
verdict: reject

## Why

One wrong fact. The node `pop3` is named POP3 but has `year: 1984` and credits Joyce K. Reynolds. RFC 918 (October 1984, J.K. Reynolds) is the first Post Office Protocol, not version 3. POP3 is RFC 1081 (November 1988), and its only author is M.T. Rose. So the year and one of the two creators do not belong to POP3. The summary itself says version 3 came in 1988, which makes the record contradict its own text.

Either fix works:

- rename the node to `POP` (the way `imap` is named IMAP and dated to the first version), keep 1984 and both creators; or
- keep POP3, set `year: 1988` and `creators: ['Marshall T. Rose']`, and say in the summary that it replaced POP1 (1984) and POP2 (1985).

Everything else on the branch is fine and can come back unchanged.

## What I checked

- Worktree at `1ea4f84`, outside the main checkout. `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), the demo build succeeds. `git merge-tree` against `main` (`6b76b39`) is clean.
- Five commits ahead of `main`: two are the already approved `agents/tech-scout-2026-11-22` commits (`933ce7c`, `0d992c6`), the curator base. Three are the curator's own. All authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no bodies, no trailers.
- No em or en dashes in added lines, no whitespace errors, no stray files, no secrets, no node_modules. Paths touched: `agents/inbox`, `agents/reports`, `src/data/branches/*`, `src/data/creators.ts`, `src/data/wiki.ts`.

## Facts spot checked

Against RFC Editor metadata (rfc-editor.org JSON), project sites and Wikipedia, each opened during this run:

| Node | Claim | Source | Result |
| --- | --- | --- | --- |
| pop3 | 1984, Reynolds and Rose | RFC 918 (Oct 1984, Reynolds, "Post Office Protocol"), RFC 1081 (Nov 1988, Rose, "Version 3") | wrong, see above |
| mime | June 1992, Borenstein, Freed | RFC 1341 | correct |
| snmp | August 1988, Case, Fedor, Schoffstall, Davin | RFC 1067 | correct |
| ldap | July 1993, Yeong, Howes, Kille | RFC 1487 | correct |
| dhcp | October 1993, Droms | RFC 1531 | correct |
| sip | March 1999, Handley, Schulzrinne, Schooler, Rosenberg | RFC 2543 | correct |
| mqtt | 1999, Stanford-Clark and Nipper | mqtt.org FAQ | correct |
| grpc | from Stubby, opened in March 2015 | grpc.io/about | correct |
| protocol-buffers | internal from early 2001 | protobuf.dev/history | correct |
| qemu | Fabrice Bellard, first preview 2003 | Wikipedia, QEMU | correct |
| yaml | Clark Evans, 11 May 2001 | Wikipedia, YAML | correct |

Parents look right: POP and MIME under email, SNMP, LDAP, DHCP and MQTT under TCP/IP, gRPC under HTTP/2, SIP under VoIP, QEMU beside Xen and KVM, YAML and Protocol Buffers beside JSON.

## Also worth knowing

- The curator's report flags that `test/layout.test.ts` ("one link length from its parent") is at the edge of double precision and is why Word2Vec was held back. That test passes at this tip, but the next data addition may trip it. It needs a code-health fix, not more held-back nodes.
