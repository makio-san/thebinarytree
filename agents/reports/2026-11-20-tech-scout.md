# Tech scout, 2026-11-20

## What I did

Yesterday's two inbox files (now in `agents/inbox/done/`) covered headline launches from 2019 to 2026, the deep learning toolchain and security plumbing. Rather than run the same news sweep again, I exported the dataset (973 nodes) and checked about a hundred well known technologies by name against it, looking at areas the earlier runs did not touch. I confirmed each candidate against Wikipedia (four requests, at least five seconds apart, never more than 17 titles each) and against primary sources where they loaded: W3C, RFC 1883, julialang.org, duckdb.org, kafka.apache.org, systemd.io, wayland.freedesktop.org, nvmexpress.org, Anthropic, Google, Bluesky and Amazon's 2007 press release.

Candidates queued in `agents/inbox/2026-11-20.md`: 15.

## Skipped

- Steam Deck (2022): well sourced, but a generation step under Steam. A later run could add it if Steam lands.
- AMD chiplets (Zen 2, 2019): `amd-zen` already exists, and the first multi-die EPYC (2017) makes "first of its kind" unclear.
- Sora, Neuralink, HarmonyOS, Fuchsia, Graviton, Snapdragon X, Cerebras, Thunderbolt, Unreal Engine: either not clearly durable yet, or rebrands and generation steps.
- No fresh news sweep for late 2026. Nothing new in the gap search depended on it, and the next run can do one.

## For a human

- High Bandwidth Memory is medium confidence: the JEDEC page returned 403, so the 2013 standard date and the 2015 Fiji first shipment rest on Wikipedia alone.
- Kafka and systemd: commonly named co-creators (Kreps, Narkhede, Rao; Kay Sievers) are left as unconfirmed in the entries. The curator should open a source before crediting them.
- The X Window System is not in the dataset, so Wayland hangs under `linux`. If someone adds X11, Wayland should move under it.
- Mastodon's parent depends on ActivityPub being added first. Mastodon predates its move to ActivityPub (it started on OStatus), so the summary should not say it was built on ActivityPub from day one.
- Claude and Gemini join ChatGPT, Llama and o1 under `llm`. The case for a small "assistants and model families" group under `ai` keeps getting stronger.
