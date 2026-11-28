branch: agents/tech-scout-2026-11-28
reviewed-head: 0f630de874da92aa60b542df46a2b7e3750de805
verdict: approve

## Reasons

Adds only `agents/inbox/2026-11-28.md` (fifteen candidates) and its report. Every entry names a Wikipedia source.

## Checked

- `tsc --noEmit` clean, `vitest run` 161 of 161 passed, demo build ok, run in a throwaway worktree. `git merge-tree --write-tree origin/main` against `db2add08b079ef107af984ae46b8b88fea9d83ed` exits 0. All commits authored by `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commits with a scope and a sentence, no Claude trailer or co-author, no em or en dashes in added lines, no stray files.
- Facts opened on Wikipedia on 2026-11-28: ChromeOS (Google, from ChromiumOS and Gentoo, announced July 2009, first shipped on Chromebooks in 2011), Keras (François Chollet, released 27 March 2015, later built into TensorFlow, Keras 3 on JAX, TensorFlow or PyTorch), llama.cpp (Georgi Gerganov, released 10 March 2023), ESP32 (Espressif, successor to the ESP8266, Wi-Fi and Bluetooth), TOPS-20 (began as BBN TENEX in 1969, shipped by DEC from 1976), GNU Hurd (since 1990, on GNU Mach, slowed once Linux proved viable). All match.
