# Web reader inbox, 2026-11-28, processed

One candidate named in a piece read this morning that the tree lacks. The name was searched in `src/data` and in the inboxes (open and done) first, and the facts below come from the Wikipedia article, not from the post that led to it.

## RDRAND
- year: 2012
- kind: concept
- era: modern
- parent: aes
- creators: Intel
- wikipedia: RDRAND
- summary: An Intel processor instruction, first in Ivy Bridge chips around 2012, that returns random numbers from a generator on the chip seeded by a hardware entropy source. Its output is conditioned with AES and fed to a NIST SP 800-90A generator. AMD added it in 2015, and the companion RDSEED instruction, from Broadwell, gives lower level access to the entropy source.
- sources: https://en.wikipedia.org/wiki/RDRAND
- confidence: high
- found via: https://medium.com/@rosstramontano/p-np-now-what-the-mathematics-was-the-easy-part-e8b4907b3426
- note: the tree has `one-time-pad` and `aes` in `src/data/branches/security.ts` but nothing on hardware random number generation. Parent `aes` is a suggestion because the generator conditions its output with AES; the curator may prefer to hang it under `symmetric` or near `one-time-pad`. Creators is the company, since Wikipedia names no individual designers.
- added: 2026-11-28 lineage-curator (second run), under `intel-core-i` beside Intel SGX, not `aes`. The article places it in Ivy Bridge processors (third generation Core i) and the Intel 64 and IA-32 instruction sets; the AES conditioning claim is not in the text I opened and was dropped.
