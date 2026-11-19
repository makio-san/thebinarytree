# Lineage curator, 2026-11-19 (second run)

Inbox: `agents/inbox/2026-11-19-2.md`, read from the unmerged `agents/tech-scout-2026-11-19-2` branch, which this branch is built on (it sits directly on the current `main`). All fifteen entries confirmed and added; nothing skipped. The file is moved to `agents/inbox/done/`.

## Added

| Node id | Parent | Source re-opened |
| --- | --- | --- |
| `gan` | `backpropagation` | Wikipedia, Generative adversarial network; arXiv 1406.2661 |
| `tensorflow` | `alexnet` | Wikipedia, TensorFlow (released 9 November 2015, DistBelief) |
| `resnet` | `alexnet` | Wikipedia, Residual neural network; arXiv 1512.03385 (authors) |
| `pytorch` | `alexnet` | Wikipedia, PyTorch (authors, released September 2016) |
| `llama` | `llm` | Wikipedia, Llama (released 24 February 2023); arXiv 2302.13971 |
| `deepseek-r1` | `openai-o1` | Wikipedia, DeepSeek (AI) (R1 on 20 January 2025, App Store); arXiv 2501.12948 |
| `sword-of-damocles` | `sketchpad` | Wikipedia, Ivan Sutherland's head-mounted 3D display |
| `oculus-rift` | `sword-of-damocles` | Wikipedia, Oculus Rift (DK1 28 March 2013, CV1 2016) |
| `project-jupyter` | `python` | Wikipedia, Project Jupyter (formed July 2014) |
| `lets-encrypt` | `tls` | Wikipedia, Let's Encrypt (public beta 3 December 2015 to 12 April 2016) |
| `tls-1-3` | `tls` | RFC 8446 header (E. Rescorla, August 2018) and Wikipedia |
| `wireguard` | `chacha20` | Wikipedia, WireGuard (author, 2015, Linux 5.6) |
| `ebpf` | `linux` | Wikipedia, eBPF (authors, 2014, Linux 3.18) |
| `finfet` | `mosfet` | Wikipedia, Fin field-effect transistor (inventors, 1999, Intel 22 nm 2011) |
| `euv-lithography` | `integrated-circuit` | Wikipedia, EUV lithography (infobox: 2019 high volume manufacturing) |

Creators added for GAN, ResNet, PyTorch, Sword of Damocles, Oculus Rift, Project Jupyter, TLS 1.3, WireGuard, eBPF and FinFET. TensorFlow, Llama, DeepSeek-R1, Let's Encrypt and EUV lithography have no entry because sources credit large teams or organisations. All fifteen Wikipedia titles resolved in one batched query (three Wikimedia requests in total, five seconds apart).

## Choices made

- FinFET: dated 1999, the infobox invention year (Hu's Berkeley group with Hisamoto), not the scout's 2011. Wikipedia says Intel announced Tri-Gate at 22 nm in 2011 and shipped from 2012, so the scout's "first shipped in 2011" was dropped.
- DeepSeek-R1: titled `DeepSeek (AI)`. The scout's `DeepSeek (chatbot)` and `DeepSeek-R1` both redirect there. The scout's claim about NVIDIA's market value was left out because no opened source stated it.
- Sword of Damocles: id `sword-of-damocles`, not `the-sword-of-damocles`. Oculus Rift hangs under it.
- TLS 1.3 shares the `Transport Layer Security` title, since there is no separate article; the parent `tls` maps to `HTTPS`.
- Origins only where an opened source supports them. ResNet, Oculus Rift, Project Jupyter, Let's Encrypt, TLS 1.3, WireGuard, eBPF, FinFET and EUV have none.
- Summaries trimmed to what the sources state (for example, WireGuard's "replaced IPsec and OpenVPN in many products" became "designed to be lighter and faster than").

## For a human

- WireGuard: the Wikipedia infobox says 2015, but the article also mentions code snapshots from 30 June 2016. 2015 is used; worth a check against wireguard.com.
- EUV lithography: the 2019 date rests on the Wikipedia infobox alone, as the scout noted.
- Apple Vision Pro still sits under `mobile/wearables`; it could move under the new virtual reality line. Left alone, as it belongs to another branch.
- PyTorch, TensorFlow and ResNet sit side by side under `alexnet` with `transformer`. No new group was made.

Type check and all 131 tests pass.
