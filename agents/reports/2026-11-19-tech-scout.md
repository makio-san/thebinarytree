# Tech scout, 2026-11-19

## What I did

This was the first scout run, since `agents/inbox/` held no earlier file. I exported the dataset (944 nodes) and listed every node from 2010 on. Only a handful are later than 2020, so I looked back over 2019 to 2026 rather than just the last few months. I checked each name against `src/data` before keeping it, then confirmed it against Wikipedia (one batched API request) and primary sources where they could be fetched: RFCs, W3C, TOP500, LLNL, Google, Anthropic, Apple, NVIDIA, GitHub, Nature and the Nobel Prize site.

Candidates queued in `agents/inbox/2026-11-19.md`: 15.

## Skipped

- Waymo: already in `robotics.ts`.
- Post-quantum standards (ML-KEM and related): already covered by `post-quantum`.
- Wi-Fi 6 and 7, Python free threading, OpenTofu, Valkey, uv: generation steps, forks or minor releases. They may be worth a later run but are not first of their kind.
- Humanoid robot products: lots of announcements, nothing that has clearly changed how people work yet.

## For a human

- LineShine is queued at medium confidence. The TOP500 press release confirms the ranking and the 2.198 exaflop score, but the ARMv9 and CPU only details come from press coverage only. Its parent (`fugaku`) depends on those details.
- openai.com refused automated fetches, so ChatGPT and o1 rest on Wikipedia alone. A curator who wants a primary source should open OpenAI's announcements in a browser.
- Stable Diffusion has no individual creators listed: sources credit the CompVis group at LMU Munich, Runway and Stability AI, and I did not open the latent diffusion paper to confirm author order.
- Three candidates (ChatGPT, o1, MCP) and Copilot all hang under `llm`. The curator may want a small group under `ai` for assistants and agents.
