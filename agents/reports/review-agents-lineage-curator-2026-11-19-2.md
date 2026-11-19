branch: agents/lineage-curator-2026-11-19-2
reviewed-head: 814e66dc68e407a85ef594e23c0f441ae521d95b
verdict: approve

## Reasons

Fifteen new nodes, each under a sensible existing parent, with Wikipedia titles that resolve and creators only where sources name individuals. Every fact I re-checked matches its source. The curator corrected the scout where the scout was wrong (FinFET year, the DeepSeek title, the unsourced NVIDIA claim) and says so in the report. Type check, tests and the demo build are green.

## What I checked

- Diff: 11 files, 412 lines added, nothing removed. Data in `src/data/branches/` (frontier, languages, networks, operating-systems, processors, security), `creators.ts` and `wiki.ts`; the inbox moved to `agents/inbox/done/2026-11-19-2.md` (contents identical to the scout's file); the curator report. No stray files, no node_modules, no secrets.
- Commits `7d4b609`, `a9656bd` (the two scout commits this branch is built on), `235cf2f` and `814e66d`: all authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a full sentence, no trailers, no Claude co-author.
- Prose: no em or en dashes in the added lines.
- Based on the current `main` and merges cleanly (`git merge-tree`).
- In a throwaway worktree at the reviewed head: `tsc --noEmit` passes, `vitest run` passes (12 files, 131 tests), `vite build --config vite.demo.config.ts` succeeds.
- Parents, read from the built tree: gan under backpropagation; tensorflow, resnet, pytorch under alexnet; llama under llm; deepseek-r1 under openai-o1; sword-of-damocles under sketchpad; oculus-rift under sword-of-damocles; project-jupyter under python; lets-encrypt and tls-1-3 under tls; wireguard under chacha20; ebpf under linux; finfet under mosfet; euv-lithography under integrated-circuit. Every child is later than its parent.

## Facts spot checked (Wikipedia, opened via the API in two batched requests)

- FinFET: infobox gives inventors Digh Hisamoto (1989) and Chenming Hu (1999), invention year 1999, first produced 2011 by Intel as Tri-Gate; the Intel 22 nm announcement is dated May 2011. Matches year 1999, creators and summary.
- WireGuard: author Jason A. Donenfeld, released 2015, in Linux 5.6 in March 2020, aims to be lighter and faster than IPsec and OpenVPN. Matches.
- eBPF: authors Alexei Starovoitov and Daniel Borkmann, released 2014, in Linux 3.18 through the bpf() syscall, in-kernel verifier, no kernel modules needed. Matches.
- PyTorch: authors Chanan, Chintala, Gross, Paszke; released September 2016 (v0.1.1, 1 September 2016); developed by Meta AI. Matches.
- ResNet: developed in 2015, won ILSVRC that year; paper by He, Zhang, Ren, Sun; residual connections common in transformers. Matches.
- GAN: Ian Goodfellow and colleagues at Université de Montréal, June 2014. Matches (origin Canada).
- Oculus Rift: DK1 released 28 March 2013; Oculus VR founded by Palmer Luckey. Matches.
- Project Jupyter: formed July 2014, spun off from IPython; Pérez and Granger are among the seven founders; named for Julia, Python and R. Matches.
- Let's Encrypt: public beta 3 December 2015 to 12 April 2016, run by ISRG, largest certificate authority. Matches.
- DeepSeek-R1: released 20 January 2025, most downloaded free app on the US App Store by 27 January. Matches.
- Llama: announced 24 February 2023, first version for researchers only under a non-commercial license, later versions allow some commercial use. Matches.
- Sword of Damocles: Ivan Sutherland, 1968, first AR or VR display; the name was a joke about the supporting arm, he called it the head-mounted display. Matches.
- EUV lithography: infobox commercial debut 2019 (high volume manufacturing); as of 2025 ASML is the only company selling EUV systems, for 5 nm and 3 nm. Matches the summary, which rests on Wikipedia alone as the report says.

## For a human

- WireGuard's 2015 comes from the infobox; the curator already flagged a possible check against wireguard.com. Not a reason to reject.
- `tls-1-3` shares the `Transport Layer Security` title, since there is no separate article. Acceptable.

## Merge note

This branch contains both commits of `agents/tech-scout-2026-11-19-2`. Merging it also brings those in.
