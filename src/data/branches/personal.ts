import type { ComputerDatum } from '../types'

/**
 * Personal computers: the moment a machine stops belonging to an institution
 * and starts belonging to a person.
 */
export const personal: ComputerDatum = {
  id: 'personal',
  name: 'Personal Computers',
  era: 'personal',
  kind: 'group',
  summary:
    'The point at which a machine belongs to a person rather than an institution. From kits sold by mail to markets of millions in ten years.',
  children: [
    {
      id: 'first-personal',
      name: 'First Attempts',
      era: 'personal',
      kind: 'group',
      summary: 'The products that put a microprocessor on a desk.',
      children: [
        {
          id: 'kenbak-1',
          name: 'Kenbak-1',
          year: 1971,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'It had no microprocessor; its logic was discrete. Generally counted as the first personal computer, with around 40 sold.',
        },
        {
          id: 'micral-n',
          name: 'Micral N',
          year: 1973,
          era: 'personal',
          kind: 'machine',
          origin: 'France',
          summary:
            'The first commercial microcomputer sold assembled rather than as a kit, built around the Intel 8008.',
        },
        {
          id: 'xerox-alto',
          name: 'Xerox Alto',
          year: 1973,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Built at PARC, never sold, and decisive anyway. A windowed graphical interface, a mouse, Ethernet, a WYSIWYG editor, and a laser printer, all in one place.',
          facts: ['Bitmapped display', 'Mouse and windows', 'Around 2000 built'],
          children: [
            {
              id: 'xerox-star',
              name: 'Xerox Star',
              year: 1981,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'The Alto ideas as a product: desktop metaphor, icons, folders. Too expensive to sell, but the direct model for the Lisa and the Macintosh.',
            },
          ],
        },
        {
          id: 'altair-8800',
          name: 'MITS Altair 8800',
          year: 1975,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'An 8080 based kit on the cover of Popular Electronics. No screen and no keyboard, just switches and lights. Hobbyists piled in and the industry started.',
          facts: ['Gave rise to the S-100 bus standard'],
          children: [
            {
              id: 'altair-basic',
              name: 'Altair BASIC',
              year: 1975,
              era: 'personal',
              kind: 'language',
              origin: 'USA',
              summary:
                'The interpreter Bill Gates and Paul Allen wrote for the Altair, and Microsoft’s first product.',
            },
            {
              id: 'homebrew-club',
              name: 'Homebrew Computer Club',
              year: 1975,
              era: 'personal',
              kind: 'group',
              origin: 'USA',
              summary:
                'The hobbyist meetup in Silicon Valley where the Apple I was first shown.',
            },
          ],
        },
        {
          id: 'imsai-8080',
          name: 'IMSAI 8080',
          year: 1975,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary: 'A better built rival to the Altair, and a large part of why CP/M spread.',
        },
      ],
    },
    {
      id: 'apple-line',
      name: 'The Apple Line',
      era: 'personal',
      kind: 'group',
      summary: 'From a garage to the personal computer as a household object.',
      children: [
        {
          id: 'apple-i',
          name: 'Apple I',
          year: 1976,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Steve Wozniak’s board, which you could attach a screen and keyboard to. It had no case; around 200 were built.',
          children: [
            {
              id: 'apple-ii',
              name: 'Apple II',
              year: 1977,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'Colour graphics, eight expansion slots, and a finished case. It took the personal computer out of the hobby world and stayed in production for sixteen years.',
              facts: ['6502 processor', 'Reached the office through VisiCalc'],
              children: [
                {
                  id: 'visicalc',
                  name: 'VisiCalc',
                  year: 1979,
                  era: 'personal',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'The first spreadsheet. People bought an Apple II to run it: the first case of software selling hardware.',
                },
              ],
            },
            {
              id: 'apple-iii',
              name: 'Apple III',
              year: 1980,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'A business oriented machine with cooling problems, and Apple’s first serious failure.',
            },
            {
              id: 'apple-lisa',
              name: 'Apple Lisa',
              year: 1983,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'One of the first commercial personal computers with a graphical interface. A 10,000 dollar price ended its sales, but its ideas moved to the Macintosh.',
            },
            {
              id: 'macintosh',
              name: 'Apple Macintosh',
              year: 1984,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'The machine that took the mouse and the graphical interface mainstream: 68000, 128 KB of memory, and no command line in sight.',
              facts: ['9 inch monochrome display', 'The mouse came in the box'],
              children: [
                {
                  id: 'firewire',
                  name: 'FireWire (IEEE 1394)',
                  year: 1995,
                  era: 'personal',
                  kind: 'component',
                  origin: 'USA',
                  summary:
                    'A fast serial bus Apple began in 1986 and finished with Sony and Panasonic as IEEE 1394-1995. It carried camcorder video in real time with no host controller, but USB, which came later, won the mass market.',
                },
                {
                  id: 'mac-ii',
                  name: 'Macintosh II',
                  year: 1987,
                  era: 'personal',
                  kind: 'machine',
                  origin: 'USA',
                  summary: 'Colour and expansion slots. It settled into the centre of desktop publishing.',
                },
                {
                  id: 'powerbook-100',
                  name: 'PowerBook',
                  year: 1991,
                  era: 'mobile',
                  kind: 'machine',
                  origin: 'USA',
                  summary:
                    'Pushing the keyboard back to leave a palm rest and a pointing device in the middle. Today’s laptop layout comes from here.',
                },
                {
                  id: 'imac-g3',
                  name: 'iMac G3',
                  year: 1998,
                  era: 'modern',
                  kind: 'machine',
                  origin: 'USA',
                  summary:
                    'One piece, coloured, translucent; no floppy drive, but USB. The product that turned Apple around.',
                  children: [
                    {
                      id: 'intel-mac',
                      name: 'Intel Mac',
                      year: 2006,
                      era: 'modern',
                      kind: 'machine',
                      origin: 'USA',
                      summary:
                        'The Mac moved from PowerPC to x86, with Rosetta translating old software.',
                      children: [
                        {
                          id: 'apple-silicon-mac',
                          name: 'Apple Silicon Mac',
                          year: 2020,
                          era: 'modern',
                          kind: 'machine',
                          origin: 'USA',
                          summary:
                            'A second large migration, to ARM with the M1. Again a translation layer, again backwards compatibility.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'next-computer',
          name: 'NeXT Computer',
          year: 1988,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The black cube from the company Steve Jobs founded after leaving Apple. It did not sell, but its software became the basis of Mac OS X and the first web server ran on one.',
        },
      ],
    },
    {
      id: 'home-computers',
      name: 'Home Computers',
      era: 'personal',
      kind: 'group',
      summary: 'Cheap machines that plugged into a television and loaded programs from tape.',
      children: [
        {
          id: 'commodore-pet',
          name: 'Commodore PET 2001',
          year: 1977,
          era: 'personal',
          kind: 'machine',
          origin: 'Canada / USA',
          summary:
            'Screen, keyboard, and tape drive in one body. One of the three big assembled computers of 1977.',
          children: [
            {
              id: 'vic-20',
              name: 'Commodore VIC-20',
              year: 1980,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary: 'The first computer to sell a million units. It was cheap and plugged into a TV.',
              children: [
                {
                  id: 'commodore-64',
                  name: 'Commodore 64',
                  year: 1982,
                  era: 'personal',
                  kind: 'machine',
                  origin: 'USA',
                  summary:
                    'The best selling single computer model in history. Its SID sound chip and hardware sprites produced a whole game and demo culture.',
                  facts: ['Estimates run from 12 to 17 million units', '64 KB of memory, 6510 processor'],
                },
                {
                  id: 'amiga-1000',
                  name: 'Commodore Amiga 1000',
                  year: 1985,
                  era: 'personal',
                  kind: 'machine',
                  origin: 'USA',
                  summary:
                    'Custom graphics and sound coprocessors, and pre-emptive multitasking. Unmatched in video and graphics work for years.',
                  children: [
                    {
                      id: 'amiga-500',
                      name: 'Amiga 500',
                      year: 1987,
                      era: 'personal',
                      kind: 'machine',
                      origin: 'USA',
                      summary: 'The home version of the Amiga, and a huge gaming machine in Europe.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'trs-80',
          name: 'TRS-80 Model I',
          year: 1977,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Sold in Radio Shack stores. Distribution alone made it the best seller of its first year.',
        },
        {
          id: 'atari-800',
          name: 'Atari 400 / 800',
          year: 1979,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary: 'A capable home computer with custom graphics chips inherited from console work.',
          children: [
            {
              id: 'atari-st',
              name: 'Atari ST',
              year: 1985,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'Built in MIDI ports made it the standard in music studios. A 68000 at a low price.',
            },
          ],
        },
        {
          id: 'zx80',
          name: 'Sinclair ZX80',
          year: 1980,
          era: 'personal',
          kind: 'machine',
          origin: 'England',
          summary: 'The first computer sold under 100 pounds. It put computing into British homes.',
          children: [
            {
              id: 'zx81',
              name: 'Sinclair ZX81',
              year: 1981,
              era: 'personal',
              kind: 'machine',
              origin: 'England',
              summary: 'Simplified down to a single custom chip. Over 1.5 million sold.',
              children: [
                {
                  id: 'zx-spectrum',
                  name: 'ZX Spectrum',
                  year: 1982,
                  era: 'personal',
                  kind: 'machine',
                  origin: 'England',
                  summary:
                    'Colour graphics and a rubber keyboard. The machine a British generation learned to program on, and the start of a large games industry.',
                },
              ],
            },
          ],
        },
        {
          id: 'bbc-micro',
          name: 'BBC Micro',
          year: 1981,
          era: 'personal',
          kind: 'machine',
          origin: 'England',
          summary:
            'Built by Acorn for the BBC computer literacy project. It went into schools and kept alive the company where ARM was born.',
          children: [
            {
              id: 'acorn-archimedes',
              name: 'Acorn Archimedes',
              year: 1987,
              era: 'personal',
              kind: 'machine',
              origin: 'England',
              summary: 'The first desktop computer with an ARM processor, and the fastest home machine of its day.',
            },
          ],
        },
        {
          id: 'msx',
          name: 'MSX',
          year: 1983,
          era: 'personal',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'The idea of different manufacturers building to one hardware standard. It spread across Japan, Korea, Brazil, and the Netherlands.',
        },
        {
          id: 'amstrad-cpc',
          name: 'Amstrad CPC 464',
          year: 1984,
          era: 'personal',
          kind: 'machine',
          origin: 'England',
          summary: 'Monitor and tape deck in the box: ready to work out of one carton.',
        },
        {
          id: 'nec-pc-9801',
          name: 'NEC PC-9801',
          year: 1982,
          era: 'personal',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'Dominated the Japanese market for more than a decade, carrying custom hardware for Japanese character display.',
        },
      ],
    },
    {
      id: 'ibm-pc-line',
      name: 'IBM PC and Clones',
      era: 'personal',
      kind: 'group',
      summary: 'How an open architecture pulled the whole industry onto one standard.',
      children: [
        {
          id: 'ibm-pc-5150',
          name: 'IBM PC 5150',
          year: 1981,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'IBM built it in a year from off the shelf parts and published the architecture. Openness grew the market and cost IBM control of it.',
          facts: ['Intel 8088, 16 KB of memory', 'Technical documentation published'],
          children: [
            {
              id: 'ibm-pc-xt',
              name: 'IBM PC XT',
              year: 1983,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary: 'The hard disk became standard.',
            },
            {
              id: 'ibm-pc-at',
              name: 'IBM PC/AT',
              year: 1984,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'An 80286 and the AT bus. The keyboard layout and expansion slot standards stuck.',
            },
            {
              id: 'compaq-portable',
              name: 'Compaq Portable',
              year: 1983,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'Clean room reimplementation of the BIOS produced the first legal clone, and opened the door to the clone industry.',
              children: [
                {
                  id: 'pc-clone',
                  name: 'PC Compatibles',
                  year: 1986,
                  era: 'personal',
                  kind: 'machine',
                  summary:
                    'Dozens of manufacturers driving the same architecture down in price. Today’s desktop PC is the product of that competition.',
                },
              ],
            },
            {
              id: 'ibm-ps2',
              name: 'IBM PS/2',
              year: 1987,
              era: 'personal',
              kind: 'machine',
              origin: 'USA',
              summary:
                'IBM’s attempt to take back control with a closed architecture. It failed, but VGA and the PS/2 connectors stayed.',
            },
          ],
        },
      ],
    },
    {
      id: 'workstations',
      name: 'Workstations',
      era: 'personal',
      kind: 'group',
      summary: 'Desktop machines for engineers: more powerful than a PC, and running Unix.',
      children: [
        {
          id: 'sun-1',
          name: 'Sun-1',
          year: 1982,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Grew out of the Stanford University Network design. A desktop where networking and Unix were standard.',
        },
        {
          id: 'sgi-iris',
          name: 'SGI IRIS',
          year: 1984,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Hardware accelerated 3D graphics. Film effects and scientific visualisation ran on these machines for years.',
        },
        {
          id: 'symbolics-lisp-machine',
          name: 'Symbolics Lisp Machine',
          year: 1981,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A computer whose hardware was designed for Lisp, and the tool of the first big wave of AI research.',
        },
      ],
    },
  ],
}
