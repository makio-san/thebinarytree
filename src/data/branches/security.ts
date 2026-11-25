import type { ComputerDatum } from '../types'

/**
 * Cryptography and security. The one branch where the adversary is part of the
 * design, which is why almost everything here is defined by what it survives
 * rather than by what it does.
 */
export const security: ComputerDatum = {
  id: 'security',
  name: 'Cryptography and Security',
  era: 'network',
  kind: 'group',
  summary:
    'The one branch designed against an adversary, so everything here is defined by what it survives rather than by what it does.',
  children: [
    {
      id: 'classical-crypto',
      name: 'Before Computers',
      era: 'mechanical',
      kind: 'group',
      summary: 'Ciphers done by hand, and then by machine.',
      children: [
        {
          id: 'caesar-cipher',
          name: 'Substitution Ciphers',
          year: -50,
          era: 'mechanical',
          kind: 'concept',
          summary:
            'Shift or shuffle the alphabet. Broken by letter frequency, which is the first cryptanalysis anyone works out.',
        },
        {
          id: 'vigenere',
          name: 'Vigenère Cipher',
          year: 1553,
          era: 'mechanical',
          kind: 'concept',
          origin: 'Italy',
          summary:
            'A repeating key shifts each letter differently. Held its reputation as unbreakable for three centuries before the key length proved findable.',
        },
        {
          id: 'one-time-pad',
          name: 'One-Time Pad',
          year: 1917,
          era: 'mechanical',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A truly random key as long as the message, used once. The only cipher proven unbreakable, and almost unusable for exactly the reason that makes it so.',
        },
        {
          id: 'enigma',
          name: 'Enigma',
          year: 1918,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Germany',
          summary:
            'Rotor machine giving a different substitution for every letter. Broken through operator habit and the fact that no letter ever encoded to itself.',
          facts: ['No letter ever mapped to itself, which narrowed the search enormously'],
        },
        {
          id: 'lorenz',
          name: 'Lorenz Cipher',
          year: 1941,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Germany',
          summary:
            'High command traffic, far stronger than Enigma. Breaking it needed Colossus, so cryptanalysis is what built the first electronic computers.',
        },
      ],
    },
    {
      id: 'symmetric',
      name: 'Symmetric Cryptography',
      era: 'network',
      kind: 'group',
      summary: 'Both sides hold the same key. Fast, and the key has to get there somehow.',
      children: [
        {
          id: 'des',
          name: 'DES',
          year: 1977,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The first public standard cipher, and the first to be studied openly by everyone. Its 56 bit key was arguably too short on the day it shipped and was brute forced in 1998.',
        },
        {
          id: 'aes',
          name: 'AES',
          year: 2001,
          era: 'modern',
          kind: 'concept',
          origin: 'Belgium',
          summary:
            'Chosen by open competition over five years, which is now how ciphers get standardised. Implemented in hardware on essentially every processor.',
          facts: ['Selected from fifteen public candidates', 'Instructions for it are built into modern CPUs'],
        },
        {
          id: 'chacha20',
          name: 'ChaCha20',
          year: 2008,
          era: 'modern',
          kind: 'concept',
          summary:
            'A stream cipher that is fast in software without special instructions, which is why phones and embedded devices use it.',
          children: [
            {
              id: 'wireguard',
              name: 'WireGuard',
              year: 2015,
              era: 'modern',
              kind: 'network',
              summary:
                'A small, fast VPN protocol built on Curve25519, ChaCha20 and Poly1305, merged into Linux 5.6 in March 2020. It was designed to be lighter and faster than IPsec and OpenVPN.',
            },
          ],
        },
      ],
    },
    {
      id: 'public-key',
      name: 'Public Key Cryptography',
      era: 'network',
      kind: 'group',
      summary:
        'Two different keys, one publishable. It solved the problem of talking privately to someone you have never met, which is the problem the internet has.',
      children: [
        {
          id: 'diffie-hellman',
          name: 'Diffie-Hellman Key Exchange',
          year: 1976,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Two parties agree a shared secret over a channel anyone can read. Published openly, which was itself a break with how cryptography had always been done.',
          children: [
            {
              id: 'signal-protocol',
              name: 'Signal Protocol',
              year: 2013,
              era: 'modern',
              kind: 'concept',
              summary:
                'A cryptographic protocol for end to end encrypted messaging and calls. Trevor Perrin and Moxie Marlinspike started it at Open Whisper Systems in 2013 for the TextSecure app, which became Signal, and WhatsApp later adopted it. Its handshake is built on elliptic curve Diffie-Hellman.',
            },
          ],
        },
        {
          id: 'rsa',
          name: 'RSA',
          year: 1977,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Encryption and signatures from the difficulty of factoring large numbers. It made the certificate, and therefore the padlock in the browser, possible.',
          children: [
            {
              id: 'x509',
              name: 'X.509',
              year: 1988,
              era: 'network',
              kind: 'concept',
              origin: 'International',
              summary:
                'The ITU standard format for public key certificates, first issued in July 1988 alongside the X.500 directory. Every TLS certificate behind HTTPS is an X.509 certificate.',
            },
          ],
        },
        {
          id: 'ecc',
          name: 'Elliptic Curve Cryptography',
          year: 1985,
          era: 'micro',
          kind: 'concept',
          summary:
            'The same guarantees with far smaller keys, which matters when the device is a phone or a smartcard.',
        },
        {
          id: 'pgp',
          name: 'PGP',
          year: 1991,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Strong encryption as a program anyone could download, which led to a criminal investigation of its author for arms export. Publishing the source as a book made the point.',
        },
        {
          id: 'post-quantum',
          name: 'Post-Quantum Cryptography',
          year: 2024,
          era: 'modern',
          kind: 'concept',
          summary:
            'Algorithms chosen to survive Shor’s. Being standardised now because traffic recorded today can be decrypted later.',
        },
        {
          id: 'webauthn',
          name: 'WebAuthn and Passkeys',
          year: 2019,
          era: 'modern',
          kind: 'concept',
          summary:
            'A W3C Recommendation since March 2019 for signing in to websites with a public key credential held by the device instead of a password. The credentials came to be called passkeys.',
        },
      ],
    },
    {
      id: 'integrity',
      name: 'Hashing and Signatures',
      era: 'network',
      kind: 'group',
      summary: 'Proving something has not changed, without hiding it.',
      children: [
        {
          id: 'md5',
          name: 'MD5',
          year: 1992,
          era: 'modern',
          kind: 'concept',
          summary:
            'A hash that was everywhere, then shown to allow collisions. Still used for checksums where nobody is attacking, which is a narrower set than people assume.',
        },
        {
          id: 'sha-2',
          name: 'SHA-2',
          year: 2001,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The hash family holding up the current internet: certificates, package managers, Git object names, Bitcoin.',
        },
        {
          id: 'merkle-tree',
          name: 'Merkle Tree',
          year: 1979,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Hash the leaves, then hash the hashes. Verifies one item out of millions without reading the rest, which is why Git, BitTorrent and every blockchain use it.',
        },
        {
          id: 'password-hashing',
          name: 'Password Hashing',
          year: 1976,
          era: 'network',
          kind: 'concept',
          summary:
            'Store a slow, salted hash rather than the password. Unix crypt introduced the salt; bcrypt and its successors added deliberate slowness.',
        },
      ],
    },
    {
      id: 'systems-security',
      name: 'Systems Security',
      era: 'network',
      kind: 'group',
      summary: 'The failures that keep recurring, and the defences that answer them.',
      children: [
        {
          id: 'tor',
          name: 'Tor',
          year: 2002,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'Onion routing came from the US Naval Research Laboratory in the mid 1990s. Paul Syverson, Roger Dingledine and Nick Mathewson launched the alpha of Tor in September 2002: traffic crosses volunteer relays in layers of encryption, so no single point sees both ends.',
        },
        {
          id: 'creeper',
          name: 'Creeper',
          year: 1971,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Bob Thomas wrote it at BBN as an experiment that moved between TENEX machines on the ARPANET. Counted as the first worm, and Reaper, written to remove it, as the first antivirus program.',
        },
        {
          id: 'morris-worm',
          name: 'Morris Worm',
          year: 1988,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The first worm to disrupt the internet at large, exploiting a buffer overflow and weak passwords. It created the first coordinated response team.',
        },
        {
          id: 'stuxnet',
          name: 'Stuxnet',
          year: 2010,
          era: 'modern',
          kind: 'concept',
          summary:
            'A worm uncovered in June 2010 that reprogrammed Siemens industrial controllers to wreck uranium centrifuges in Iran, using four zero day flaws. It is widely reported to be an American and Israeli weapon, though neither country has admitted it.',
        },
        {
          id: 'wannacry',
          name: 'WannaCry',
          year: 2017,
          era: 'modern',
          kind: 'concept',
          summary:
            'A ransomware worm that encrypted Windows machines in 150 countries in May 2017. It spread through EternalBlue, an NSA exploit leaked a month earlier, mostly on machines missing a patch that already existed.',
        },
        {
          id: 'buffer-overflow',
          name: 'Buffer Overflow',
          year: 1972,
          era: 'network',
          kind: 'concept',
          summary:
            'Write past the end of an array and you can overwrite the return address. Described in 1972, exploited ever since, and the reason memory safe languages are now a security argument.',
        },
        {
          id: 'firewall',
          name: 'Firewall',
          year: 1988,
          era: 'micro',
          kind: 'concept',
          summary:
            'Filter traffic at the boundary. The first assumption of a hard perimeter, which later turned out to be the wrong shape.',
        },
        {
          id: 'sandbox',
          name: 'Sandboxing',
          year: 1993,
          era: 'modern',
          kind: 'concept',
          summary:
            'Run untrusted code with almost no authority. What makes it safe to open a web page or install an app at all.',
        },
        {
          id: 'two-factor',
          name: 'Two-Factor Authentication',
          year: 1986,
          era: 'micro',
          kind: 'concept',
          summary:
            'Something you know plus something you hold. The single most effective defence against stolen passwords.',
        },
        {
          id: 'zero-trust',
          name: 'Zero Trust',
          year: 2010,
          era: 'modern',
          kind: 'concept',
          summary:
            'Stop treating the internal network as safe and authenticate every request. An admission that the perimeter model had failed.',
        },
        {
          id: 'spectre',
          name: 'Spectre and Meltdown',
          year: 2018,
          era: 'modern',
          kind: 'concept',
          summary:
            'Speculative execution leaks data through timing. A bug in the performance idea itself rather than in any one chip, and it cost every processor real speed to mitigate.',
        },
      ],
    },
  ],
}
