branch: agents/fact-checker-2026-11-27
reviewed-head: 28ded258dc837a4a04e771cfd16cf7cf6cad370a
verdict: approve

Audit of the `security` branch: eight summaries corrected in `src/data/branches/security.ts`, a report and one audit log line. No years, ids or parents changed.

## Checked

- Every commit by `makio-san <killbillbeatrixx@gmail.com>` as author and committer, Conventional Commits with scope and sentence, no trailers, no co-authors, no Claude mention. No em or en dashes in added lines. No secrets, stray files or node_modules.
- Throwaway worktree on the tip: `tsc --noEmit` clean, `vitest run` 157 of 157, demo build ok.
- `git merge-tree --write-tree origin/main` clean against `main` at `d6557e1`; tests on the merged result 157 of 157.
- Paths: `src/data/branches/security.ts`, `agents/reports/2026-11-27-fact-checker.md`, `agents/reports/audit-log.md`.
- Corrections re-verified against Wikipedia opened in this run:
  - Creeper: the article says the later self-replicating version by Ray Tomlinson is generally accepted as the first worm. The new wording matches.
  - Morris worm: "one of the oldest computer worms distributed via the Internet, and the first to gain significant mainstream media attention". Matches.
  - DES: IBM, based on Feistel's design, published as a federal standard in 1977. Matches.
  - One-time pad: also known as the Vernam cipher; matches the summary's framing.
- Each change softens or sources a claim; none adds an unsourced superlative.

## For a human

- The report lists doubts it left alone (WireGuard 2015, two-factor 1986 and Kenneth Weiss, password hashing 1976 and its creators, the Spectre creator list). Worth a later fact-checker pass.
