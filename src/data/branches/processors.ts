import type { ComputerDatum } from '../types'

/**
 * Components and processors.
 *
 * This is the branch where the family tree metaphor is most literal: an
 * instruction set architecture really is inherited, and x86 and ARM are both
 * unbroken chains of backwards compatibility running for four decades.
 */
export const processors: ComputerDatum = {
  id: 'processors',
  name: 'Components and Processors',
  era: 'micro',
  kind: 'group',
  summary:
    'Tube to transistor, transistor to chip. Descent is literal on this branch: an instruction set really is inherited.',
  children: [
    {
      id: 'components',
      name: 'Basic Components',
      era: 'transistor',
      kind: 'group',
      summary: 'The physical parts that switch and remember.',
      children: [
        {
          id: 'vacuum-tube',
          name: 'Vacuum Tube',
          year: 1904,
          era: 'tube',
          kind: 'component',
          summary:
            'The first electronic element able to switch and amplify. Fast, but hot, bulky, and short lived.',
        },
        {
          id: 'transistor',
          name: 'Transistor',
          year: 1947,
          era: 'transistor',
          kind: 'component',
          origin: 'USA',
          summary:
            'Bardeen, Brattain, and Shockley demonstrated the point contact transistor at Bell Labs. It does the tube’s job cold, small, and durable.',
          facts: ['Nobel Prize in Physics, 1956', 'Opened the semiconductor era'],
          children: [
            {
              id: 'tradic',
              name: 'TRADIC',
              year: 1954,
              era: 'transistor',
              kind: 'machine',
              origin: 'USA',
              summary: 'The first fully transistorised computer: 700 transistors, 100 watts.',
            },
            {
              id: 'mosfet',
              name: 'MOSFET',
              year: 1959,
              era: 'transistor',
              kind: 'component',
              origin: 'USA',
              summary:
                'The field effect transistor developed by Mohamed Atalla and Dawon Kahng. Almost every transistor made today is one of these.',
              facts: ['The most manufactured object in history'],
              children: [
                {
                  id: 'finfet',
                  name: 'FinFET',
                  year: 1999,
                  era: 'modern',
                  kind: 'component',
                  summary:
                    'A transistor whose channel stands up as a fin with the gate wrapped around it, built at Berkeley by Chenming Hu’s group and Digh Hisamoto in 1999 from Hisamoto’s 1989 design. Intel announced it as Tri-Gate at 22 nm in 2011, and it became the transistor of leading chips for a decade.',
                },
              ],
            },
          ],
        },
        {
          id: 'core-memory',
          name: 'Magnetic Core Memory',
          year: 1951,
          era: 'transistor',
          kind: 'component',
          summary:
            'Bits held in the magnetisation of small ferrite rings. Main memory for twenty years, and it survives a power cut.',
        },
        {
          id: 'integrated-circuit',
          name: 'Integrated Circuit',
          year: 1958,
          era: 'integrated',
          kind: 'component',
          origin: 'USA',
          summary:
            'Jack Kilby put multiple components on one piece of semiconductor; Robert Noyce found the planar, manufacturable form a year later. The birth of the chip.',
          facts: ['Kilby, Nobel Prize in Physics 2000', 'Noyce’s planar process enabled mass production'],
          children: [
            {
              id: 'fpga',
              name: 'FPGA',
              year: 1985,
              era: 'micro',
              kind: 'component',
              origin: 'USA',
              summary:
                'A chip whose logic blocks and the wiring between them can be programmed after manufacture. Xilinx produced the first commercially viable one, the XC2064, with 64 configurable logic blocks, in 1985.',
            },
            {
              id: 'moores-law',
              name: "Moore's Law",
              year: 1965,
              era: 'integrated',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Gordon Moore observed that the component count per chip doubles at a regular interval. Not a law of nature but a target the industry set itself.',
            },
            {
              id: 'euv-lithography',
              name: 'EUV Lithography',
              year: 2019,
              era: 'modern',
              kind: 'concept',
              summary:
                'Chip patterning with 13.5 nm extreme ultraviolet light, in high volume manufacturing from 2019. As of 2025 ASML is the only company selling the machines, which leading 5 nm and 3 nm chips depend on.',
            },
          ],
        },
        {
          id: 'dram',
          name: 'DRAM',
          year: 1970,
          era: 'micro',
          kind: 'component',
          origin: 'USA',
          summary:
            'The Intel 1103 held a bit in one transistor and one capacitor. It wiped core memory off the market and is still main memory today.',
          children: [
            {
              id: 'high-bandwidth-memory',
              name: 'High Bandwidth Memory',
              year: 2013,
              era: 'modern',
              kind: 'component',
              summary:
                'DRAM dies stacked on top of each other and set beside the processor, for far more bandwidth than memory on a board. JEDEC adopted it in October 2013, AMD’s Fiji GPUs shipped it first in 2015, and it now feeds the large AI accelerators.',
            },
          ],
        },
        {
          id: 'flash-memory',
          name: 'Flash Memory',
          year: 1984,
          era: 'modern',
          kind: 'component',
          origin: 'Japan',
          summary:
            'Fujio Masuoka developed erasable non volatile memory at Toshiba. The basis of the phone and the SSD.',
        },
      ],
    },
    {
      id: 'intel-line',
      name: 'Intel and x86',
      era: 'micro',
      kind: 'group',
      summary: 'Four decades of unbroken backwards compatibility.',
      children: [
        {
          id: 'intel-4004',
          name: 'Intel 4004',
          year: 1971,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'The first product to compress a computer’s processing unit onto one chip. Designed for a Japanese calculator order by Federico Faggin’s team.',
          facts: ['2300 transistors', '4 bit, 740 kHz', 'ENIAC-class throughput, palm sized'],
          children: [
            {
              id: 'intel-8008',
              name: 'Intel 8008',
              year: 1972,
              era: 'micro',
              kind: 'processor',
              origin: 'USA',
              summary: 'The first 8 bit microprocessor, originally designed for a terminal project.',
              children: [
                {
                  id: 'intel-8080',
                  name: 'Intel 8080',
                  year: 1974,
                  era: 'micro',
                  kind: 'processor',
                  origin: 'USA',
                  summary:
                    'The chip that made the personal computer possible, and the processor under the Altair 8800 and CP/M.',
                  children: [
                    {
                      id: 'intel-8085',
                      name: 'Intel 8085',
                      year: 1976,
                      era: 'micro',
                      kind: 'processor',
                      origin: 'USA',
                      summary: 'Single 5 volt supply. Widely used in embedded systems for years.',
                    },
                    {
                      id: 'intel-8086',
                      name: 'Intel 8086',
                      year: 1978,
                      era: 'micro',
                      kind: 'processor',
                      origin: 'USA',
                      summary:
                        'The start of the x86 instruction set. Today’s desktop and server processors are still its descendants.',
                      facts: ['29,000 transistors', '16 bit, 5 MHz'],
                      children: [
                        {
                          id: 'intel-8088',
                          name: 'Intel 8088',
                          year: 1979,
                          era: 'micro',
                          kind: 'processor',
                          origin: 'USA',
                          summary:
                            'A cheaper 8086 with an 8 bit data bus. The IBM PC picked it, and that decided x86’s future.',
                        },
                        {
                          id: 'intel-80286',
                          name: 'Intel 80286',
                          year: 1982,
                          era: 'micro',
                          kind: 'processor',
                          origin: 'USA',
                          summary: 'Protected mode and 16 MB of addressing. The processor of the IBM PC/AT.',
                          children: [
                            {
                              id: 'intel-80386',
                              name: 'Intel 80386',
                              year: 1985,
                              era: 'micro',
                              kind: 'processor',
                              origin: 'USA',
                              summary:
                                '32 bit x86, paged virtual memory, and virtual 8086 mode. Modern PC operating systems became possible with this chip.',
                              children: [
                                {
                                  id: 'intel-80486',
                                  name: 'Intel 80486',
                                  year: 1989,
                                  era: 'micro',
                                  kind: 'processor',
                                  origin: 'USA',
                                  summary:
                                    'On chip cache, on chip floating point, and a pipeline. Over a million transistors.',
                                  children: [
                                    {
                                      id: 'pentium',
                                      name: 'Intel Pentium',
                                      year: 1993,
                                      era: 'modern',
                                      kind: 'processor',
                                      origin: 'USA',
                                      summary:
                                        'Superscalar x86, issuing two instructions at once. Also where the brand name replaced the part number.',
                                      children: [
                                        {
                                          id: 'pentium-pro',
                                          name: 'Pentium Pro',
                                          year: 1995,
                                          era: 'modern',
                                          kind: 'processor',
                                          origin: 'USA',
                                          summary:
                                            'Out of order execution and internal RISC-like micro-operations. Twenty years of x86 core design descend from it.',
                                          children: [
                                            {
                                              id: 'pentium-4',
                                              name: 'Pentium 4',
                                              year: 2000,
                                              era: 'modern',
                                              kind: 'processor',
                                              origin: 'USA',
                                              summary:
                                                'The NetBurst architecture pushed clock speed to its limit. Hitting the thermal wall forced a change of direction.',
                                              children: [
                                                {
                                                  id: 'intel-core',
                                                  name: 'Intel Core',
                                                  year: 2006,
                                                  era: 'modern',
                                                  kind: 'processor',
                                                  origin: 'USA',
                                                  summary:
                                                    'Core count and efficiency instead of clock speed. The multicore desktop era starts here.',
                                                  children: [
                                                    {
                                                      id: 'intel-core-i',
                                                      name: 'Core i series',
                                                      year: 2008,
                                                      era: 'modern',
                                                      kind: 'processor',
                                                      origin: 'USA',
                                                      summary:
                                                        'The memory controller and the graphics core moved inside the processor.',
                                                    },
                                                  ],
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
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
      id: 'eight-bit-processors',
      name: '8 Bit Rivals',
      era: 'micro',
      kind: 'group',
      summary: 'The cheap chips that carried the home computer generation.',
      children: [
        {
          id: 'motorola-6800',
          name: 'Motorola 6800',
          year: 1974,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary: 'A clean, regular instruction set. Engineers who left the team went on to build the 6502.',
          children: [
            {
              id: 'mos-6502',
              name: 'MOS 6502',
              year: 1975,
              era: 'micro',
              kind: 'processor',
              origin: 'USA',
              summary:
                'Sold at a sixth of its rivals’ price. It sat inside the Apple II, the Commodore 64, Atari machines, and the NES, and made the home computer possible.',
              facts: ['Launch price 25 dollars', 'Around 3500 transistors'],
              children: [
                {
                  id: 'wdc-65c816',
                  name: 'WDC 65C816',
                  year: 1983,
                  era: 'micro',
                  kind: 'processor',
                  origin: 'USA',
                  summary:
                    'The 16 bit compatible successor to the 6502, used in the Apple IIGS and the Super Nintendo.',
                },
              ],
            },
          ],
        },
        {
          id: 'zilog-z80',
          name: 'Zilog Z80',
          year: 1976,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'Federico Faggin left Intel and built a chip that ran 8080 software but did more. The processor of the ZX Spectrum, MSX, and countless embedded devices.',
          facts: ['Some variants are still in production'],
        },
        {
          id: 'tms1000',
          name: 'TI TMS1000',
          year: 1974,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'The first microcontroller, combining processor, memory, and I/O on one chip. It went into everything from calculators to toys.',
        },
      ],
    },
    {
      id: 'motorola-68k',
      name: 'The Motorola 68000 Line',
      era: 'micro',
      kind: 'group',
      summary: 'The processor behind the 1980s workstation and the graphical desktop.',
      children: [
        {
          id: 'mc68000',
          name: 'Motorola 68000',
          year: 1979,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'A regular architecture that showed the programmer 32 bits and a wide address space. Used by the Macintosh, Amiga, Atari ST, and Sun workstations.',
          facts: ['68,000 transistors', '16 MB linear address space'],
          children: [
            {
              id: 'mc68020',
              name: 'Motorola 68020',
              year: 1984,
              era: 'micro',
              kind: 'processor',
              origin: 'USA',
              summary: 'A full 32 bit data bus and an on chip instruction cache.',
              children: [
                {
                  id: 'mc68040',
                  name: 'Motorola 68040',
                  year: 1990,
                  era: 'modern',
                  kind: 'processor',
                  origin: 'USA',
                  summary:
                    'Integrated floating point and memory management. The last strong desktop generation of the 68k line.',
                },
              ],
            },
            {
              id: 'dragonball',
              name: 'DragonBall',
              year: 1995,
              era: 'mobile',
              kind: 'processor',
              origin: 'USA',
              summary: 'A low power 68000 core. It sat inside the Palm handhelds.',
            },
          ],
        },
      ],
    },
    {
      id: 'risc',
      name: 'The RISC Line',
      era: 'micro',
      kind: 'group',
      summary:
        'Shrink the instruction set and trust the compiler. Simple instructions, fixed length, deep pipelines.',
      children: [
        {
          id: 'ibm-801',
          name: 'IBM 801',
          year: 1980,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'The first serious research project behind RISC, prompted by the finding that real programs barely use complex instructions.',
        },
        {
          id: 'berkeley-risc',
          name: 'Berkeley RISC',
          year: 1981,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'David Patterson’s project. Register windows came from here, and so did SPARC.',
          children: [
            {
              id: 'sparc',
              name: 'SPARC',
              year: 1987,
              era: 'modern',
              kind: 'processor',
              origin: 'USA',
              summary:
                'Sun’s openly specified RISC architecture. It carried the Unix workstation and server market for a long time.',
            },
          ],
        },
        {
          id: 'mips',
          name: 'MIPS',
          year: 1985,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary:
            'John Hennessy’s design, exposing the pipeline to software. Used in SGI workstations, the PlayStation, and networking gear.',
          children: [
            {
              id: 'mips-r4000',
              name: 'MIPS R4000',
              year: 1991,
              era: 'modern',
              kind: 'processor',
              origin: 'USA',
              summary: 'One of the first 64 bit microprocessors to ship.',
            },
          ],
        },
        {
          id: 'power',
          name: 'IBM POWER',
          year: 1990,
          era: 'modern',
          kind: 'processor',
          origin: 'USA',
          summary: 'The commercial product of the 801 research, and the processor of RS/6000 workstations.',
          children: [
            {
              id: 'powerpc',
              name: 'PowerPC',
              year: 1992,
              era: 'modern',
              kind: 'processor',
              origin: 'USA',
              summary:
                'The Apple, IBM, and Motorola alliance. Macs used it from 1994 to 2006, as did the GameCube and the Xbox 360.',
            },
          ],
        },
        {
          id: 'arm1',
          name: 'Acorn ARM1',
          year: 1985,
          era: 'micro',
          kind: 'processor',
          origin: 'England',
          summary:
            'A plain 25,000 transistor RISC designed by two engineers at Acorn. Low power was not a goal but a consequence of needing a cheap plastic package.',
          facts: ['Worked on the first attempt', 'Power draw came out far below expectations'],
          children: [
            {
              id: 'arm2',
              name: 'ARM2',
              year: 1986,
              era: 'micro',
              kind: 'processor',
              origin: 'England',
              summary: 'The processor of the Acorn Archimedes, with a multiplier added.',
              children: [
                {
                  id: 'arm6',
                  name: 'ARM6',
                  year: 1991,
                  era: 'mobile',
                  kind: 'processor',
                  origin: 'England',
                  summary:
                    'The first core licensed after ARM Ltd was founded. The Apple Newton used it.',
                  children: [
                    {
                      id: 'arm7tdmi',
                      name: 'ARM7TDMI',
                      year: 1994,
                      era: 'mobile',
                      kind: 'processor',
                      origin: 'England',
                      summary:
                        'The core that made the mobile phone possible. Billions were produced; the Game Boy Advance used it too.',
                      children: [
                        {
                          id: 'arm-cortex-a',
                          name: 'ARM Cortex-A',
                          year: 2005,
                          era: 'modern',
                          kind: 'processor',
                          origin: 'England',
                          summary:
                            'The application processor family of the smartphone era. Most processors in the world today are from this line.',
                          children: [
                            {
                              id: 'apple-a4',
                              name: 'Apple A4',
                              year: 2010,
                              era: 'modern',
                              kind: 'processor',
                              origin: 'USA',
                              summary:
                                'Apple’s first in house system on chip, used in the iPad and the iPhone 4.',
                              children: [
                                {
                                  id: 'apple-m1',
                                  name: 'Apple M1',
                                  year: 2020,
                                  era: 'modern',
                                  kind: 'processor',
                                  origin: 'USA',
                                  summary:
                                    'The chip that moved the Mac from x86 to ARM. Unified memory and low power draw made ARM credible on the desktop.',
                                  facts: ['Memory in the same package as the processor', '5 nanometre process'],
                                },
                              ],
                            },
                          ],
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
          id: 'risc-v',
          name: 'RISC-V',
          year: 2010,
          era: 'modern',
          kind: 'processor',
          origin: 'USA',
          summary:
            'A royalty free, open instruction set that started at Berkeley. Spreading fast because you can design a processor without paying for a licence.',
        },
      ],
    },
    {
      id: 'amd-line',
      name: 'AMD',
      era: 'modern',
      kind: 'group',
      summary: 'The second source for x86, and then its rival.',
      children: [
        {
          id: 'am386',
          name: 'AMD Am386',
          year: 1991,
          era: 'micro',
          kind: 'processor',
          origin: 'USA',
          summary: 'A compatible 386 that arrived after long litigation, and started price competition.',
          children: [
            {
              id: 'athlon',
              name: 'AMD Athlon',
              year: 1999,
              era: 'modern',
              kind: 'processor',
              origin: 'USA',
              summary:
                'AMD’s own design. It passed 1 GHz before Intel, and desktop leadership changed hands for the first time.',
              children: [
                {
                  id: 'amd64',
                  name: 'AMD64 / Opteron',
                  year: 2003,
                  era: 'modern',
                  kind: 'processor',
                  origin: 'USA',
                  summary:
                    'A 64 bit extension to x86 that still ran old software quickly. Intel eventually adopted it; it is today’s 64 bit PC standard.',
                },
                {
                  id: 'amd-zen',
                  name: 'AMD Zen',
                  year: 2017,
                  era: 'modern',
                  kind: 'processor',
                  origin: 'USA',
                  summary:
                    'A chiplet approach that made high core counts cheap, and restored the balance in the server market.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
