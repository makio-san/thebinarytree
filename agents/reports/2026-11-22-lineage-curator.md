# Lineage curator, 2026-11-22

Branch: `agents/lineage-curator-2026-11-22`, cut from `agents/tech-scout-2026-11-22` (not merged yet) so the inbox file was readable.

Inbox: `agents/inbox/2026-11-22.md`, twelve candidates. Eleven added, one held back.

## Added

| Node | Parent | Year | Checked against |
| --- | --- | --- | --- |
| POP3 (`pop3`) | email | 1984 | RFC 918 (Oct 1984, J.K. Reynolds), RFC 1081 (Nov 1988, M.T. Rose), Wikipedia |
| MIME (`mime`) | email | 1992 | RFC 1341 (Jun 1992, Borenstein, Freed), Wikipedia |
| SNMP (`snmp`) | tcp-ip | 1988 | RFC 1067 (Aug 1988, Case, Fedor, Schoffstall, Davin), Wikipedia |
| LDAP (`ldap`) | tcp-ip | 1993 | RFC 1487 (Jul 1993, Yeong, Howes, Kille), Wikipedia |
| DHCP (`dhcp`) | tcp-ip | 1993 | RFC 1531 (Oct 1993, Droms), Wikipedia |
| MQTT (`mqtt`) | tcp-ip | 1999 | mqtt.org FAQ (Stanford-Clark and Nipper, 1999), Wikipedia (oil pipelines, satellite links, OASIS and ISO/IEC 20922) |
| gRPC (`grpc`) | http-2 | 2016 | grpc.io/about (Stubby, March 2015), Wikipedia (1.0 in August 2016) |
| SIP (`sip`) | voip | 1999 | RFC 2543 (Mar 1999, Handley, Schulzrinne, Schooler, Rosenberg), Wikipedia |
| QEMU (`qemu`) | virtualization-cloud, beside Xen and KVM | 2003 | Wikipedia (Fabrice Bellard, first preview release 2003) |
| YAML (`yaml`) | encoding, beside JSON | 2001 | Wikipedia (Clark Evans, draft of 11 May 2001, with Ingy döt Net and Oren Ben-Kiki) |
| Protocol Buffers (`protocol-buffers`) | encoding, beside JSON | 2001 | protobuf.dev/history (early 2001), Wikipedia (public release 7 July 2008) |

All eleven Wikipedia titles resolve (one batched query; `gRPC` normalises to `GRPC`). Creators use full names where Wikipedia gives them. SNMP keeps the RFC's initials because I could not confirm the full names. Protocol Buffers and gRPC have no creators entry, because the sources credit Google and no individuals.

## Choices that differ from the inbox

- YAML and Protocol Buffers go beside JSON in the Encoding and Standards group, not under it. Neither one came from JSON: YAML was proposed in the same year, and Protobuf is an unrelated binary format.
- I reworded the summaries to match the house voice and added RFC months.

## Held back

- **Word2Vec.** The facts are confirmed, but with all twelve nodes added, `test/layout.test.ts` "places every child exactly one link length from its parent" fails. The `intel-core -> intel-core-i` link at depth 14 is off by 5.8e-10, and the limit is 5e-10. The new nodes have nothing to do with that link. Any change to the tree moves this rounding error: removing any one of the twelve nodes, except gRPC, brings it back under the limit. With Word2Vec left out, the largest error is about 1.1e-10. Word2Vec stays in the inbox with a `skipped:` note.

## For a human

1. **The layout guard is at the edge of double precision.** The x86 chain sits about 4e-7 from the boundary, so `1 - |p|^2` is only good to about 1e-10. Each data addition can push the error across 5e-10 or back under it. Either loosen the check to 8 digits or make the deep chain numerically sturdier. This belongs to code-health or a human, not the curator. I did not touch the test or the layout code.
2. **Shared working folder.** During this run, another agent switched branches in `/Users/esma/Developer/the-binary-tree` at the same time. My first two commits landed on local `main`. I moved them to this branch and reset local `main` to `origin/main` with `git reset --keep`. Nothing reached `origin/main`. From then on I worked in a separate worktree, `/Users/esma/Developer/lc-wt-2026-11-22`. Agents should each use their own worktree, as the release reviewer already does.
