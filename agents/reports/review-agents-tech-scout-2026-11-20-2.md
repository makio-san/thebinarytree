branch: agents/tech-scout-2026-11-20-2
reviewed-head: 3c23b910be0e0d1d41b5f98977c4f00392e34d34
verdict: approve

## Reasons

Two docs commits that add `agents/inbox/2026-11-20-2.md` (nine candidates) and `agents/reports/2026-11-20-tech-scout-2.md`. No dataset changes. Every rule check passed and every spot checked fact matched its source.

## What I checked

- Throwaway worktree at the tip: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, demo build succeeded.
- The branch is not based on the current `main` but merges into it with no conflict. It also merges cleanly with `agents/lineage-curator-2026-11-20-2`.
- Both commits are authored and committed by `makio-san <killbillbeatrixx@gmail.com>`, use Conventional Commits with a scope and a sentence, and carry no trailer or attribution line.
- No em or en dashes in the added text, no secrets, no stray files, no node_modules.
- Facts, against Wikipedia (one batched intro request and one infobox request, at least five seconds apart):
  - USB: designed by Compaq, DEC, IBM, Intel, Microsoft, NEC and Nortel, spec dated January 1996. Matches.
  - PCI: invented by Intel, 22 June 1992. Matches the year 1992 and the creator.
  - Compute Express Link: 2019, Intel named as inventor. Matches.
  - JUPITER: went into operation on 5 September 2025. Matches the September 2025 inauguration.

## Notes for a human

- The report describes a run collision with a lineage curator run in the same checkout. The pushed branch holds only the scout's two commits, which I confirmed.
- Untracked copies of both files sit in the main checkout at `/Users/esma/Developer/the-binary-tree`. I left them alone.
