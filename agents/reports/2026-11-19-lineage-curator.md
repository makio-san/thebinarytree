# Lineage curator, 2026-11-19

Inbox: `agents/inbox/2026-11-19.md`, read from the unmerged `agents/tech-scout-2026-11-19` branch, which this branch is built on. All fifteen entries confirmed and added; nothing skipped. The file is moved to `agents/inbox/done/`.

## Added

| Node id | Parent | Source re-opened |
| --- | --- | --- |
| `chatgpt` | `llm` | Wikipedia, ChatGPT |
| `github-copilot` | `llm` | Wikipedia, GitHub Copilot (announced 29 June 2021) |
| `openai-o1` | `llm` | Wikipedia, OpenAI o1 (preview 12 September 2024) |
| `model-context-protocol` | `llm` | Wikipedia, Model Context Protocol (creators, Linux Foundation donation) |
| `alphafold-2` | `alphago` | Wikipedia, AlphaFold (CASP14, 2024 Nobel) |
| `stable-diffusion` | `ai` | Wikipedia, Stable Diffusion |
| `nvidia-blackwell` | `nvidia-h100` | Wikipedia, Blackwell (GTC, 18 March 2024) |
| `el-capitan` | `frontier-machine` | Wikipedia and LLNL announcement (1.742 exaflops) |
| `lineshine` | `fugaku` | TOP500 news item for June 2026 |
| `google-willow` | `sycamore` | Google blog (3x3, 5x5, 7x7 halving) and Wikipedia, Willow processor |
| `http-3` | `http-2` | Wikipedia, HTTP/3 and QUIC (RFC 9114, RFC 9000) |
| `webgpu` | `webgl` | Chrome developer blog (Chrome 113) and Wikipedia |
| `webauthn` | `public-key` | Wikipedia, WebAuthn (Recommendation 4 March 2019) |
| `apple-vision-pro` | `wearables` | Apple Newsroom (US availability 2 February) and Wikipedia |
| `nintendo-switch-2` | `switch` | Wikipedia, Nintendo Switch 2 (5 June 2025) |

Creators added: Model Context Protocol (David Soria Parra, Justin Spahr-Summers), AlphaFold 2 (John Jumper, Demis Hassabis), HTTP/3 and QUIC (Jim Roskind, for QUIC). The others are company products and have no entry, as the creators table asks. All fourteen Wikipedia titles resolved in one batched query; LineShine has no article and no title.

## Choices made

- LineShine: TOP500 confirms the rank, the 2.198 exaflops and that it is CPU only, but describes a custom Chinese processor and does not mention ARMv9. The summary keeps only the TOP500 facts. It stays under `fugaku` as the CPU only line; it could move to sit under `el-capitan` if the supercomputer chain is meant to follow the number one position instead.
- Stable Diffusion: the August 2022 date could not be confirmed (the Stability AI page did not render without JavaScript, and the Wikipedia text gives only the year), so the summary says 2022 only. No origin, since the work was split between Munich, Runway and Stability AI.
- Google Willow uses the title `Willow processor`; the scout's `Willow (processor)` does not exist.

## For a human to look at

- `llm` still maps to the Wikipedia title `ChatGPT` (set for its picture in c5407b6). Now that ChatGPT has its own node, `llm` could point to `Large language model`, which resolves, if its lead image is acceptable.
- Type check and the full test suite (131 tests) pass.
