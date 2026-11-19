branch: agents/lineage-curator-2026-11-19
reviewed-head: 68b90078bb71acd6c0a75ea7f430d86fdc065193
verdict: approve

## Reasons

Fifteen new nodes from the 2026-11-19 inbox, each with a parent that exists, a sourced year and a summary that stays inside what the sources say. Creators are added only where a source names people. Every fact I re-opened held. The curator flagged its own judgement calls (LineShine's parent, Stable Diffusion's date) instead of guessing.

## What I checked

- Commits on top of `main`: `fdd19ab`, `f9c7cd4` (the tech scout commits this branch is built on), `f674ad1` (data) and `68b9007` (inbox to done, report). All authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with scope and sentence, no trailers, no Claude co-author.
- Paths: `src/data/branches/{frontier,games,mobile,networks,security}.ts`, `src/data/creators.ts`, `src/data/wiki.ts`, `agents/inbox/done/2026-11-19.md`, `agents/reports/2026-11-19-{lineage-curator,tech-scout}.md`. No stray files, no node_modules, no secrets.
- Prose: no em or en dashes in the added lines.
- The inbox file in `done/` is byte for byte the scout's file.
- In a throwaway worktree at the reviewed head: `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), the demo build succeeds.

## Fact spot check (sources I opened)

- `lineshine` (2026, under `fugaku`): TOP500 news item for June 2026 confirms No. 1 at 2.198 Exaflop/s, at the National Supercomputing Centre in Shenzhen, and "the first system on the TOP500 to exceed two exaflops ... using CPUs only" on a custom Chinese processor. The summary matches and correctly leaves out the unconfirmed ARMv9 claim.
- `el-capitan` (2024, under `frontier-machine`): LLNL announcement confirms verification at 1.742 exaFLOPs; Wikipedia confirms No. 1 from November 2024 to June 2026, displacing Frontier.
- `google-willow` (2024, under `sycamore`): Google blog confirms 105 qubits and the 3x3, 5x5, 7x7 grids each halving the error rate; Wikipedia `Willow processor` confirms 2024.
- `model-context-protocol` (2024): Wikipedia confirms Anthropic, November 2024, creators David Soria Parra and Justin Spahr-Summers, adoption by OpenAI and Google DeepMind, and the December 2025 donation to the Agentic AI Foundation under the Linux Foundation.
- `http-3` (2022): RFC 9000 header says May 2021, RFC 9114 header says June 2022; Wikipedia `QUIC` confirms Jim Roskind as designer.
- `webauthn` (2019): the W3C document is dated "W3C Recommendation, 4 March 2019".
- Also matched against Wikipedia intros: ChatGPT (100 million monthly users in two months), GitHub Copilot (announced 29 June 2021), OpenAI o1 (preview 12 September 2024), AlphaFold 2 (CASP14, November 2020), Stable Diffusion (2022, CompVis, Runway, Stability), Blackwell (GTC, 18 March 2024, named after David Blackwell), WebGPU (Chrome 113, May 2023), Apple Vision Pro (2024, first new major category since Apple Watch), Nintendo Switch 2 (5 June 2025, 4K docked, magnetic Joy-Con 2).

## For a human

- `llm` still uses the Wikipedia title `ChatGPT`, so it now shares a title and picture with the new `chatgpt` node. Not a wrong fact, but the curator's suggestion to point `llm` at `Large language model` is worth taking.
- LineShine sits under `fugaku` as the CPU only line. Defensible given the TOP500 text; move it if the supercomputer chain should follow the No. 1 position instead.
