branch: agents/tech-scout-2026-11-22-2
reviewed-head: 6b1a5b91ab9a8b0aeb89a2bf89b42ce472b8bc01
verdict: reject

## Why

The branch carries work that is not the tech scout's and is not reviewed as such:

- `0d9028c chore(deps): ...` changes `package.json` and `package-lock.json`. That is the code-health agent's dependency update, outside the tech scout's allowed paths. The same update is reviewed separately on `agents/code-health-2026-11-22-2` (as `b2a5194`).
- `6b1a5b9 docs(agents): add the code-health report for 2026-11-22.` adds a code-health report to a tech scout branch. Its text differs from the report on `agents/code-health-2026-11-22-2` and both add the same path, so merging both would conflict.
- It also contains the two commits of `agents/tech-scout-2026-11-22` (`933ce7c`, `0d992c6`). Those alone would be fine, but the stack above them is not.

The code-health report explains the cause: two agents shared the main checkout and switched each other's branches.

## What passed

- Type check, 131 tests and the demo build pass in a throwaway worktree.
- Author `makio-san <killbillbeatrixx@gmail.com>`, Conventional Commit messages, no trailers, no dashes, no secrets.
- The scout's own two commits (`e59a01d` inbox, `d96ef00` report) touch only `agents/inbox/2026-11-22-2.md` and `agents/reports/2026-11-22-2-tech-scout.md`.

## Facts spot checked (all fine)

- Kerberos: Wikipedia infobox, version 4 released 24 January 1989, MIT. Matches 1989.
- pandas: Wikipedia says Wes McKinney started it at AQR Capital (2007 to 2010). Matches the creator; the 2009 open source date is given with the caveat in the report.
- VHDL: Wikipedia says it was developed for the US military VHSIC program and standardised as IEEE 1076. Matches the creators note.

## To fix

Make a new branch from `main` (or from `agents/tech-scout-2026-11-22` once that is merged) with only `e59a01d` and `d96ef00` cherry-picked, under a new name, and push it. Do not force push this one. Kerberos is also in the unmerged `agents/inbox/2026-11-21.md`; the curator should take it from one inbox only.
