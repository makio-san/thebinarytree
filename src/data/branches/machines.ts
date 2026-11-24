import type { ComputerDatum } from '../types'

/**
 * Real machines, from relays to the last of the big iron.
 *
 * The chain that matters here is relay -> vacuum tube -> stored program ->
 * transistor -> integrated circuit. Each step is roughly ten times smaller and
 * faster than the one before, and each one lets a machine that used to fill a
 * hall move into a cabinet.
 */
export const machines: ComputerDatum = {
  id: 'machines',
  name: 'Computers',
  era: 'tube',
  kind: 'group',
  summary:
    'Relay to tube, tube to transistor, transistor to integrated circuit. Each step made the machine about ten times smaller and ten times faster.',
  children: [
    {
      id: 'electromechanical',
      name: 'Electromechanical',
      era: 'tube',
      kind: 'group',
      summary: 'The first generation, computing with relays and moving parts.',
      children: [
        {
          id: 'zuse-z1',
          name: 'Zuse Z1',
          year: 1938,
          era: 'tube',
          kind: 'machine',
          origin: 'Germany',
          summary:
            'Konrad Zuse built it in his parents’ living room. Binary, floating point, and a program read from punched film, but too mechanical to run reliably.',
          children: [
            {
              id: 'zuse-z3',
              name: 'Zuse Z3',
              year: 1941,
              era: 'tube',
              kind: 'machine',
              origin: 'Germany',
              summary:
                'The first working programmable, fully automatic computer: 2600 relays, program on tape. Destroyed in the bombing of Berlin in 1943.',
              facts: ['22 bit floating point', 'An addition took about 0.8 seconds', 'No conditional branching'],
              children: [
                {
                  id: 'zuse-z4',
                  name: 'Zuse Z4',
                  year: 1945,
                  era: 'tube',
                  kind: 'machine',
                  origin: 'Germany',
                  summary:
                    'Moved to the Alps at the end of the war, leased to ETH Zürich in 1950. Continental Europe’s first working commercial computer.',
                },
                {
                  id: 'plankalkul',
                  name: 'Plankalkül',
                  year: 1945,
                  era: 'theory',
                  kind: 'language',
                  origin: 'Germany',
                  summary:
                    'Zuse’s high level language, with array and record types. Zuse never implemented it, it was only republished in full in 1972, and its first compiler came in 1975.',
                },
              ],
            },
          ],
        },
        {
          id: 'harvard-mark-i',
          name: 'Harvard Mark I',
          year: 1944,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A 15 metre electromechanical machine designed by Howard Aiken and built by IBM. Grace Hopper programmed it.',
          facts: ['765,000 components', 'Program read from punched paper tape'],
        },
        {
          id: 'bell-relay',
          name: 'Bell Relay Computers',
          year: 1940,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'George Stibitz’s Complex Number Computer became the first machine operated remotely, over a teletype line.',
        },
      ],
    },
    {
      id: 'first-electronic',
      name: 'First Electronic Machines',
      era: 'tube',
      kind: 'group',
      summary: 'No moving parts: arithmetic done in vacuum tubes.',
      children: [
        {
          id: 'abc',
          name: 'Atanasoff-Berry Computer',
          year: 1942,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'First machine to combine binary arithmetic, electronic computation, and refreshed capacitor memory. Not programmable; it only solved linear systems.',
          facts: ['Capacitor memory on a rotating drum', 'The ancestor of DRAM refresh'],
        },
        {
          id: 'bombe',
          name: 'Bombe',
          year: 1940,
          era: 'tube',
          kind: 'machine',
          origin: 'England',
          summary:
            'The electromechanical machine at Bletchley Park that eliminated Enigma settings. Designed by Turing and Welchman.',
        },
        {
          id: 'colossus',
          name: 'Colossus Mark 1',
          year: 1943,
          era: 'tube',
          kind: 'machine',
          origin: 'England',
          summary:
            'Tommy Flowers built the first large electronic digital machine, 1600 tubes aimed at the Lorenz cipher. Its existence stayed secret into the 1970s.',
          facts: ['Programmed with switches and plugs', 'Read 5000 characters per second'],
          children: [
            {
              id: 'colossus-mark-2',
              name: 'Colossus Mark 2',
              year: 1944,
              era: 'tube',
              kind: 'machine',
              origin: 'England',
              summary:
                '2400 tubes and five times the speed. Used to read German high command traffic before the Normandy landings.',
            },
          ],
        },
        {
          id: 'eniac',
          name: 'ENIAC',
          year: 1945,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Eckert and Mauchly’s 18,000 tube, 30 ton machine. The first large general purpose electronic computer, programmed by cables and switches.',
          facts: [
            '5000 additions per second',
            'Changing the program took days',
            'Its first programmers were six women mathematicians',
          ],
          children: [
            {
              id: 'monte-carlo',
              name: 'Monte Carlo Method',
              year: 1946,
              era: 'tube',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Answering hard problems by repeated random sampling. Stanislaw Ulam had the idea at Los Alamos in 1946, and von Neumann and Metropolis ran the first fully automated Monte Carlo calculations on ENIAC in 1948.',
            },
            {
              id: 'edvac',
              name: 'EDVAC',
              year: 1949,
              era: 'tube',
              kind: 'machine',
              origin: 'USA',
              summary:
                'The ENIAC team’s successor. Stored the program in memory, using mercury delay lines.',
            },
            {
              id: 'binac',
              name: 'BINAC',
              year: 1949,
              era: 'tube',
              kind: 'machine',
              origin: 'USA',
              summary:
                'Eckert-Mauchly’s first commercial delivery. Ran two processors in parallel and compared their results for reliability.',
            },
          ],
        },
      ],
    },
    {
      id: 'stored-program',
      name: 'Stored Program',
      era: 'tube',
      kind: 'group',
      summary:
        'The program becomes data in memory rather than wiring. Self modifying code starts here.',
      children: [
        {
          id: 'manchester-baby',
          name: 'Manchester Baby',
          year: 1948,
          era: 'tube',
          kind: 'machine',
          origin: 'England',
          summary:
            'The first machine to run a program held in memory: 32 words in a Williams tube, and a first program of 17 instructions.',
          facts: ['Memory on a cathode ray tube', '32 x 32 bits'],
          children: [
            {
              id: 'manchester-mark-1',
              name: 'Manchester Mark 1',
              year: 1949,
              era: 'tube',
              kind: 'machine',
              origin: 'England',
              summary:
                'The full scale Baby. First use of magnetic drum backing store and of an index register.',
              children: [
                {
                  id: 'ferranti-mark-1',
                  name: 'Ferranti Mark 1',
                  year: 1951,
                  era: 'tube',
                  kind: 'machine',
                  origin: 'England',
                  summary:
                    'The commercial version of the Manchester design, and the first general purpose electronic computer offered for sale.',
                },
              ],
            },
          ],
        },
        {
          id: 'edsac',
          name: 'EDSAC',
          year: 1949,
          era: 'tube',
          kind: 'machine',
          origin: 'England',
          summary:
            'Maurice Wilkes built it at Cambridge. The subroutine library and the first assembler-like tooling were born on this machine.',
          facts: ['Mercury delay line memory', 'The first subroutine library'],
        },
        {
          id: 'ias-machine',
          name: 'IAS Machine',
          year: 1952,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'von Neumann’s machine at Princeton. Its design was published freely, so copies were built worldwide.',
        },
        {
          id: 'whirlwind',
          name: 'Whirlwind',
          year: 1951,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'One of the first computers to work in real time, at MIT. The second machine to use magnetic core memory, after MIT’s own Memory Test Computer.',
          facts: ['Magnetic core memory', 'Light pen input on the screen'],
          children: [
            {
              id: 'sage',
              name: 'SAGE',
              year: 1958,
              era: 'transistor',
              kind: 'machine',
              origin: 'USA',
              summary:
                'A continent wide air defence network. The first large scale trial of real time networking, operator consoles, and modems.',
            },
          ],
        },
        {
          id: 'csirac',
          name: 'CSIRAC',
          year: 1949,
          era: 'tube',
          kind: 'machine',
          origin: 'Australia',
          summary:
            'The southern hemisphere’s first stored program computer, and the first machine known to play music. The only first generation machine preserved intact.',
        },
        {
          id: 'mesm',
          name: 'MESM',
          year: 1950,
          era: 'tube',
          kind: 'machine',
          origin: 'USSR',
          summary:
            'Sergey Lebedev’s team built it near Kyiv: the first universally programmable electronic computer in the Soviet Union. First test run in November 1950, first useful calculations in January 1951.',
        },
        {
          id: 'leo-i',
          name: 'LEO I',
          year: 1951,
          era: 'tube',
          kind: 'machine',
          origin: 'England',
          summary:
            'The Lyons catering company modelled it closely on EDSAC. The first computer used for business work: bakery valuations from September 1951, then payroll and stock.',
        },
        {
          id: 'univac-i',
          name: 'UNIVAC I',
          year: 1951,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first commercial computer produced in series in the US. Predicting the 1952 election live on television introduced the public to computing.',
          facts: ['46 units sold', 'The first commercial machine to use magnetic tape'],
        },
      ],
    },
    {
      id: 'mainframes',
      name: 'Mainframes',
      era: 'transistor',
      kind: 'group',
      summary: 'Large machines at the centre of an institution, running around the clock.',
      children: [
        {
          id: 'ibm-701',
          name: 'IBM 701',
          year: 1952,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'IBM’s first commercial scientific computer and its first mainframe built in series, based on the IAS machine. Announced in 1952.',
          children: [
            {
              id: 'ibm-704',
              name: 'IBM 704',
              year: 1954,
              era: 'tube',
              kind: 'machine',
              origin: 'USA',
              summary:
                'The first mass produced computer with floating point hardware, plus core memory and three index registers. Fortran and Lisp were both first developed for this machine.',
              children: [
                {
                  id: 'ibm-709',
                  name: 'IBM 709',
                  year: 1958,
                  era: 'tube',
                  kind: 'machine',
                  origin: 'USA',
                  summary: 'A refined 704, with channel architecture separating I/O from the processor.',
                  children: [
                    {
                      id: 'ibm-7090',
                      name: 'IBM 7090',
                      year: 1959,
                      era: 'transistor',
                      kind: 'machine',
                      origin: 'USA',
                      summary:
                        'The transistorised 709, six times faster. NASA tracked the Mercury and Gemini flights on these.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'ibm-650',
          name: 'IBM 650',
          year: 1953,
          era: 'tube',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A mid range drum memory machine, announced in 1953 and first installed in late 1954. Almost 2000 were built, making it the first mass produced computer, and it put computing into universities.',
          children: [
            {
              id: 'turkey-first-computer',
              name: 'First Computer in Turkey',
              year: 1960,
              era: 'tube',
              kind: 'machine',
              origin: 'Turkey',
              summary:
                'An IBM 650 installed at the General Directorate of Highways in Ankara is generally cited as the first computer in Turkey, used for road engineering calculations.',
              facts: ['1960, Ankara', 'Universities followed in the mid 1960s'],
            },
          ],
        },
        {
          id: 'ibm-1401',
          name: 'IBM 1401',
          year: 1959,
          era: 'transistor',
          kind: 'machine',
          origin: 'USA',
          summary:
            'An affordable transistorised data processing machine for smaller businesses. Over ten thousand installed; it moved the punched card world onto magnetic tape.',
        },
        {
          id: 'burroughs-b5000',
          name: 'Burroughs B5000',
          year: 1961,
          era: 'transistor',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Stack architecture, hardware descriptors, and programming only in a high level language. Far ahead of its time.',
        },
        {
          id: 'atlas',
          name: 'Atlas',
          year: 1962,
          era: 'transistor',
          kind: 'machine',
          origin: 'England',
          summary:
            'Built by Manchester and Ferranti. Virtual memory and paging first ran here, and the idea of an operating system matured with it.',
          facts: ['One level store, that is virtual memory', 'Interrupt driven job management'],
        },
        {
          id: 'system-360',
          name: 'IBM System/360',
          year: 1964,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A family of machines sharing one instruction set, announced in 1964 and delivered from 1965. Software became independent of hardware, and compatibility became a product feature.',
          facts: ['Made the 8 bit byte standard', 'Development cost IBM close to 5 billion dollars'],
          children: [
            {
              id: 'system-370',
              name: 'IBM System/370',
              year: 1970,
              era: 'integrated',
              kind: 'machine',
              origin: 'USA',
              summary:
                'The successor to System/360, announced in 1970 without virtual memory. Dynamic address translation added it in 1972.',
              children: [
                {
                  id: 'system-390',
                  name: 'System/390',
                  year: 1990,
                  era: 'modern',
                  kind: 'machine',
                  origin: 'USA',
                  summary: 'ESA/390 brought fibre optic ESCON channels and Sysplex clustering to the mainframe.',
                  children: [
                    {
                      id: 'ibm-z',
                      name: 'IBM Z',
                      year: 2000,
                      era: 'modern',
                      kind: 'machine',
                      origin: 'USA',
                      summary:
                        'The current mainframe family, still backwards compatible with the 1964 System/360 instruction set. Card and banking transactions still run here.',
                      facts: ['Over 60 years of instruction set continuity'],
                    },
                  ],
                },
              ],
            },
            {
              id: 'tomasulo-algorithm',
              name: "Tomasulo's Algorithm",
              year: 1967,
              era: 'integrated',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Register renaming in hardware, reservation stations and a common data bus let the floating point unit of the IBM System/360 Model 91 run instructions out of order. Robert Tomasulo developed it at IBM in 1967.',
            },
          ],
        },
        {
          id: 'apollo-guidance',
          name: 'Apollo Guidance Computer',
          year: 1966,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first computer based on silicon integrated circuits. It landed on the Moon with 2048 words of writable memory and a program woven into core rope.',
          facts: ['Software manufactured by weaving core memory', 'Written by Margaret Hamilton’s team'],
        },
      ],
    },
    {
      id: 'minicomputers',
      name: 'Minicomputers',
      era: 'integrated',
      kind: 'group',
      summary:
        'Machines that fit in a cabinet rather than a room, affordable by a single department. They moved computing out of the data centre and into the lab.',
      children: [
        {
          id: 'tx-0',
          name: 'TX-0',
          year: 1956,
          era: 'transistor',
          kind: 'machine',
          origin: 'USA',
          summary:
            'MIT Lincoln Laboratory’s transistorised machine, and the first home of interactive use and hacker culture.',
          children: [
            {
              id: 'pdp-1',
              name: 'DEC PDP-1',
              year: 1959,
              era: 'transistor',
              kind: 'machine',
              origin: 'USA',
              summary:
                'An interactive machine with a display and a typewriter that one person sat down at, sold for 120,000 dollars. Shown as a prototype in December 1959, first delivered in November 1960.',
              children: [
                {
                  id: 'spacewar',
                  name: 'Spacewar!',
                  year: 1962,
                  era: 'transistor',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'A two player space game with gravity, written for the PDP-1. It spread to other PDP-1 sites and led directly to the first commercial arcade games.',
                },
              ],
            },
          ],
        },
        {
          id: 'pdp-8',
          name: 'DEC PDP-8',
          year: 1965,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A 12 bit machine the size of a small fridge at 18,500 dollars. The first minicomputer to sell for under 20,000 dollars, with over 50,000 sold.',
          facts: ['Only 8 basic instructions', 'Put computers into labs and factories'],
        },
        {
          id: 'pdp-11',
          name: 'DEC PDP-11',
          year: 1970,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Orthogonal instruction set, unified bus, memory mapped I/O. Unix and C matured on it, and its design inspired the Intel x86 and the Motorola 68000.',
          facts: ['About 600,000 sold', 'Home of the first portable Unix'],
          children: [
            {
              id: 'vax-11-780',
              name: 'DEC VAX-11/780',
              year: 1977,
              era: 'micro',
              kind: 'machine',
              origin: 'USA',
              summary:
                '32 bit virtual addressing on a minicomputer. For years it was the unit of measurement in performance comparisons.',
              children: [
                {
                  id: 'alpha-21064',
                  name: 'DEC Alpha 21064',
                  year: 1992,
                  era: 'modern',
                  kind: 'processor',
                  origin: 'USA',
                  summary:
                    'A RISC processor designed as 64 bit from the start. The fastest of its day, cut short when DEC was sold.',
                },
              ],
            },
          ],
        },
        {
          id: 'data-general-nova',
          name: 'Data General Nova',
          year: 1969,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A plain, cheap 16 bit mini whose processor fit on two large circuit boards. It started the price war that put pressure on DEC.',
        },
        {
          id: 'hp-2116a',
          name: 'HP 2116A',
          year: 1966,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'HP’s first computer, built to control laboratory instruments. Measurement and computation converging.',
        },
        {
          id: 'nord-1',
          name: 'Norsk Data NORD-1',
          year: 1968,
          era: 'integrated',
          kind: 'machine',
          origin: 'Norway',
          summary: 'One of the more successful examples of the European minicomputer industry.',
        },
      ],
    },
  ],
}
