# Branch fixer, 2026-11-23

First branch fixer run. Six branches had a latest review with `verdict: reject`. Every tip on origin still matched its `reviewed-head`, and no earlier branch fixer branch or report existed.

## Fixed

### agents/lineage-curator-2026-11-22, on `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-22`

- Review: the `pop3` node was named POP3 but dated 1984 and credited to Joyce K. Reynolds, which belong to the first Post Office Protocol.
- Change: took the reviewer's first option. The node is now named `POP` (like `imap`, dated to the first version). Year 1984 and both creators stay. The summary now says version 3 came from Marshall Rose as RFC 1081 in 1988. The id stays `pop3` so the wiki and creators entries keep working.
- Sources opened: rfc-editor.org metadata for RFC 918 (Post Office Protocol, J.K. Reynolds, October 1984) and RFC 1081 (Post Office Protocol: Version 3, M.T. Rose, November 1988).
- This report is committed on this branch.

### agents/tech-scout-2026-11-21, on `agents/branch-fixer-2026-11-23-tech-scout-2026-11-21`

- Review: the Siri entry said the app came out in December 2010, which cannot be right because Apple bought Siri in April 2010.
- Change: the inbox entry now says the app was sold as a free iPhone app, bought by Apple in April 2010 and built into the iPhone 4S in October 2011. The exact launch month of the app is left out because no source I opened gave it. Sources and a note on the Wikipedia contradiction were added to the entry.
- Sources opened: SRI International, sri.com/hoi/siri ("In April 2010, Apple acquired Siri", spun off in 2007); iClarified, 28 April 2010, reporting the acquisition from the FTC filing while the app was available in the App Store. Wikipedia's Siri article was also opened and contradicts itself (December 2010 app, then an April 2011 acquisition), so it is not used as a source.

### agents/lineage-curator-2026-11-21, on `agents/branch-fixer-2026-11-23-lineage-curator-2026-11-21`

- Review: the same Siri error in `src/data/branches/mobile.ts`, a stray copy of `agents/inbox/2026-11-20-2.md` under a misleading commit message, and a base on the rejected scout branch.
- Changes:
  - merged the corrected scout fix branch above with a normal merge commit, so the curator branch now sits on the fixed scout work;
  - corrected the Siri summary to the same facts and sources as above;
  - removed `agents/inbox/2026-11-20-2.md` with `git rm`. The file on `main` is identical, and the merge base does not have it, so `git merge-tree` against `main` keeps main's copy. Checked.
- Not fixable without rewriting: the message of `d2458332` still says it moves the inbox while it actually adds the stray file. History is left as it is; the reviewer can judge the content.
- Not touched: the reviewer's small note about some `creators.ts` and `wiki.ts` lines sitting above the next section comment. It was not a reason for rejection.

All three branches: `tsc --noEmit` clean, `vitest run` 131 of 131 passed, `git merge-tree` against `main` clean. Commits authored by makio-san with no trailers.

## Left

- `agents/tech-scout-2026-11-21-2`: already contained in `main`. Nothing to do.
- `agents/code-health-2026-11-22`: superseded by `agents/code-health-2026-11-22-2`, which is approved. There is nothing to fix; a human can delete it once the `-2` branch is merged.
- `agents/tech-scout-2026-11-22-2`: not reached, three branches per run. The reviewer's fix is to take only the scout's two commits (`e59a01d`, `d96ef00`) onto a fresh branch. Doing that within the no rewrite rule means either cherry-picks onto a new branch from `main` or reverting the code-health commits on top of the rejected branch; the next run should pick it up. Also note that Kerberos is queued in both `agents/inbox/2026-11-21.md` and `agents/inbox/2026-11-22-2.md`.

## For a human

- The fixer branches for the two 2026-11-21 branches overlap: the curator fixer contains the scout fixer. Merging the curator fixer alone brings in both.
