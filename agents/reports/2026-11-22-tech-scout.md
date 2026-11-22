# Tech scout, 2026-11-22

## What I did

One tech scout branch is still unmerged (`agents/tech-scout-2026-11-21`, 12 candidates). The last news sweep for late 2026 was on 2026-11-20 and both runs since found nothing durable, so this run did no news sweep again and took the gaps the last two reports deferred: LDAP, DHCP, SNMP, SIP, POP3 and MIME, plus MQTT, Protocol Buffers, gRPC, YAML, Word2Vec and QEMU. Each name was grepped against `src/data` (zero hits) and against the unmerged inbox first.

Sources: two Wikipedia requests (one batch of 12 intros, one batch of 6 wikitext pages, five seconds apart, no 429), rfc-editor.org metadata for RFC 918, 1081, 1067, 1341, 1487, 1531 and 2543, and the project sites protobuf.dev/history, grpc.io/about, mqtt.org/faq and yaml.org.

Candidates queued in `agents/inbox/2026-11-22.md`: 12.

## Skipped

- DisplayPort: still waits on the "Buses and interconnects" group proposed in `2026-11-20-2.md`.
- Hyper-V, Zoom, DirectX: weaker cases or generation steps; left out.
- No 2026 releases: the last sweep was two days ago.

## For a human

- RFC creators are listed in the initials form the RFCs use. The curator may expand them where Wikipedia or another source gives full names.
- gRPC's year is the 1.0 release (August 2016); the open sourcing was announced in 2015. The summary gives both.
- Protocol Buffers uses 2001 (internal use, per protobuf.dev); the public release was July 2008. The summary gives both.
- POP3 uses 1984 for RFC 918 (POP version 1); POP3 itself is 1988. The summary gives both.
- YAML and Protocol Buffers are placed under `json` as siblings in spirit; `encoding` is the alternative parent.
- Word2Vec under `backpropagation` is a judgement call; it is not a descendant of AlexNet or LSTM.
