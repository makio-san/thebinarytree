# Release reviewer, 2026-11-21

Branches ahead of `main` without a review file: four.

| Branch | Head | Verdict |
| --- | --- | --- |
| `agents/tech-scout-2026-11-20-2` | `3c23b910be0e0d1d41b5f98977c4f00392e34d34` | approve |
| `agents/lineage-curator-2026-11-20-2` | `26e3944d2edad32d638cbe58ba805bef5336972b` | approve |
| `agents/tech-scout-2026-11-21` | `7cea3f5ebee7461f65f1018e307e80a816a7be09` | reject |
| `agents/lineage-curator-2026-11-21` | `d2458332cb5e1e5efd5605c1893be3fceb46f17c` | reject |

All four pass the type check, 131 tests and the demo build in throwaway worktrees, and all merge into `main` cleanly. Both 2026-11-21 branches are rejected for one wrong fact: Siri's app is dated December 2010, but SRI says Apple bought Siri in April 2010. The curator branch also has a commit that sweeps in an unrelated inbox file under a message that does not mention it. Details are in the review files.

## Skipped

- `agents/tech-scout-2026-11-20`: already approved at its current tip `d56785e` on `agents/release-reviewer-2026-11-20-2`, which is not merged yet. Not reviewed again.
- `agents/release-reviewer-2026-11-20-2`: a reviewer branch holding only review files, not reviewed by itself.

## For a human

- `agents/lineage-curator-2026-11-20-2` contains `agents/tech-scout-2026-11-20`. Merge them together or the scout first.
- The main checkout still has untracked leftovers from the 2026-11-20 run collision, for example `agents/reports/2026-11-20-tech-scout-2.md`. The 2026-11-21 curator committed one of them by mistake. Deleting them (copies of what is on `agents/tech-scout-2026-11-20-2`) would stop that happening again. I did not touch them.
- Wikipedia's Siri article contradicts itself on its 2010 and 2011 dates and may be worth a fix upstream.
