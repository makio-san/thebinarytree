# Fact-checker, 2026-11-27

Slice: the whole `security` branch (`src/data/branches/security.ts`, 40 nodes including 6 groups), with its entries in `creators.ts` and `wiki.ts`. Not listed in the audit log before.

## Method

- Wikipedia titles: all 39 titles used by the branch in one batched `action=query` request (`redirects=1`, disambiguation page prop). All resolve to standard articles; none is a disambiguation page. `Diffie-Hellman key exchange` and `Ronald Rivest` redirect, which is fine.
- Facts: the full plain text of 38 articles, one request every 4.5 seconds. Three HTTP 429 answers came back; each time the script waited for the Retry-After value and carried on.
- Tone: no em or en dashes and no marketing words in the branch after the edits. Every leaf has a summary.
- `tsc --noEmit` passes and `vitest run` passes (157 tests).

## Fixed

| Node | Was | Now | Source |
| --- | --- | --- | --- |
| `one-time-pad` | year 1917 with no earlier date | summary says Frank Miller described it in 1882 and it was reinvented in 1917 by Vernam (XOR cipher) and Mauborgne (random, never reused key) | https://en.wikipedia.org/wiki/One-time_pad |
| `lorenz` | "Breaking it needed Colossus" | broken first by hand, then with Robinson machines and the Colossus computers; names German High Command traffic | https://en.wikipedia.org/wiki/Lorenz_cipher |
| `des` | "The first public standard cipher, and the first to be studied openly by everyone" (not in the source) | IBM cipher based on Feistel's Lucifer, federal standard January 1977, academic scrutiny shaped the understanding of block ciphers; the 1998 break was the EFF DES cracker | https://en.wikipedia.org/wiki/Data_Encryption_Standard |
| `md5` | year 1992 with no other date | summary says designed by Rivest in 1991 to replace MD4, specified in 1992 as RFC 1321 | https://en.wikipedia.org/wiki/MD5 |
| `creeper` | Thomas's moving program "counted as the first worm" | Ray Tomlinson's later self copying version is the one counted as the first worm | https://en.wikipedia.org/wiki/Creeper_and_Reaper |
| `morris-worm` | "The first worm to disrupt the internet at large"; "created the first coordinated response team" | one of the first worms spread over the internet and the first to draw wide media attention; led DARPA to fund CERT/CC, the first team to use the name | https://en.wikipedia.org/wiki/Morris_worm, https://en.wikipedia.org/wiki/Computer_emergency_response_team |
| `zero-trust` | year 2010 with no other date | summary says the term first appeared in a 1994 thesis (Stephen Paul Marsh) and Kindervag gave it this meaning in 2010 | https://en.wikipedia.org/wiki/Zero_trust_architecture |
| `spectre` | "it cost every processor real speed to mitigate" | made public January 2018, a flaw in a technique used across modern processors; patches cost 2 to 14 percent in some Intel benchmarks | https://en.wikipedia.org/wiki/Spectre_(security_vulnerability), https://en.wikipedia.org/wiki/Meltdown_(security_vulnerability) |

## Doubts, not changed

- `wireguard` year 2015: the article's history starts with code snapshots from 30 June 2016 and does not give 2015. The infobox, which the plain text does not include, may; a human should check.
- `firewall` year 1988: the article says the first paper on firewall technology was published in 1987 by DEC engineers. Other accounts date Jeff Mogul's DEC paper to 1988 or 1989, so I left it.
- `sandbox` year 1993: the article opened gives no origin date.
- `two-factor` year 1986 and creator Kenneth Weiss, plus "The single most effective defence against stolen passwords": the multi-factor and RSA SecurID articles opened give neither the year, Weiss, nor the superlative. Source or soften.
- `password-hashing` year 1976 and creators Robert Morris and Ken Thompson: the `Crypt (C)` article says the salt came in Seventh Edition Unix (1979) and does not name the authors or 1976. The Morris and Thompson paper "Password Security: A Case History" is usually dated 1979. Worth checking.
- `chacha20` "which is why phones and embedded devices use it": not in the Salsa20 article.
- `aes` "Implemented in hardware on essentially every processor": the article mentions AES-NI on Intel Core and AMD Ryzen only.
- `spectre` creators list Daniel Gruss; the Spectre article lists Horn and Kocher with Genkin, Hamburg, Lipp and Yarom, and Gruss among the Meltdown discoverers. The node covers both, so it may be fine.
- `buffer-overflow` creator James P. Anderson: the Anderson Report documented the technique in 1972; he is credited as describer, not inventor.

## Wikipedia titles worth a look

`rsa` (`Ron Rivest`) and `md5` (`Ronald Rivest`) resolve to the same article, although `RSA cryptosystem` and `MD5` exist. `pgp` points at `Phil Zimmermann` (`Pretty Good Privacy` exists) and `morris-worm` at `Robert Tappan Morris` (`Morris worm` exists). Not changed, because the titles may have been chosen for their lead images; run `npm run audit:wiki` before switching.

## Not checked

The other branches. Next run could take `processors` or `operating-systems`.
