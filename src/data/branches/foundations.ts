import type { ComputerDatum } from '../types'

/**
 * Mechanical calculation and the theory that turned it into computing.
 *
 * Two sub-branches, because they really are two lineages: one of gears and
 * punched cards that gets steadily better at arithmetic, and one of pure
 * argument that works out what a machine could compute at all. They only meet
 * around 1945.
 */
export const foundations: ComputerDatum = {
  id: 'foundations',
  name: 'Mechanics and Theory',
  era: 'mechanical',
  kind: 'group',
  summary:
    'Machines that calculate with gears and punched cards, and the mathematics that describes what such a machine could compute. Two lineages that only meet around 1945.',
  children: [
    {
      id: 'mechanical-calculators',
      name: 'Mechanical Calculators',
      era: 'mechanical',
      kind: 'group',
      summary: 'Hand cranked arithmetic, built out of gears.',
      children: [
        {
          id: 'abacus',
          name: 'Abacus',
          year: -2700,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Mesopotamia',
          summary:
            'The first widespread calculating aid, holding place value in the position of its beads. Representing a number by position starts here.',
          facts: ['Encodes place value physically', 'In continuous use for millennia'],
        },
        {
          id: 'antikythera',
          name: 'Antikythera Mechanism',
          year: -100,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Ancient Greece',
          summary:
            'A bronze gear train that predicted solar and lunar positions and eclipses. The oldest known analogue computer.',
          facts: ['Around thirty bronze gears', 'Recovered from a shipwreck in 1901'],
        },
        {
          id: 'napiers-bones',
          name: "Napier's Bones",
          year: 1617,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Scotland',
          summary:
            'John Napier reduced multiplication to addition with a set of numbered rods. Logarithms made tangible.',
        },
        {
          id: 'slide-rule',
          name: 'Slide Rule',
          year: 1622,
          era: 'mechanical',
          kind: 'machine',
          origin: 'England',
          summary:
            'Sliding logarithmic scales multiply and divide. The standard engineering tool for 350 years, still aboard the Apollo missions.',
        },
        {
          id: 'schickard',
          name: 'Schickard Calculating Clock',
          year: 1623,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Germany',
          summary:
            'Wilhelm Schickard described a calculating clock to Kepler that paired an adding mechanism with rotating Napier rods to help with all four operations. The copy being built for Kepler burned before it was finished.',
        },
        {
          id: 'pascaline',
          name: 'Pascaline',
          year: 1642,
          era: 'mechanical',
          kind: 'machine',
          origin: 'France',
          summary:
            'Blaise Pascal began it at eighteen for his father’s tax work and showed it publicly in 1645. The first calculator whose gearing could propagate a chain of carries.',
          facts: ['Around twenty were built', 'Addition and subtraction'],
        },
        {
          id: 'stepped-reckoner',
          name: 'Leibniz Stepped Reckoner',
          year: 1673,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Germany',
          summary:
            'Leibniz moved multiplication and division into gearing with his stepped drum. The same Leibniz also wrote up the binary number system.',
          facts: ['The stepped drum stayed in use for 300 years', 'Binary described in 1703'],
        },
        {
          id: 'arithmometer',
          name: 'Arithmomètre',
          year: 1851,
          era: 'mechanical',
          kind: 'machine',
          origin: 'France',
          summary:
            'Thomas de Colmar patented it in 1820 and put it into series production in 1851, the first calculator to get there. Office arithmetic left the human for the first time.',
        },
        {
          id: 'odhner',
          name: 'Odhner Arithmometer',
          year: 1890,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Russia / Sweden',
          summary:
            'Willgodt Odhner invented it in Saint Petersburg in 1873 and began production in 1890. Small and durable, built around a variable toothed wheel. The backbone of accounting offices until mid century.',
        },
        {
          id: 'curta',
          name: 'Curta',
          year: 1948,
          era: 'mechanical',
          kind: 'machine',
          origin: 'Liechtenstein',
          summary:
            'Curt Herzstark finished the design while imprisoned at Buchenwald. A precision mechanical calculator that fits in a palm.',
          facts: ['Used for navigation maths in rally racing'],
        },
      ],
    },
    {
      id: 'punched-cards',
      name: 'The Punched Card Line',
      era: 'mechanical',
      kind: 'group',
      summary: 'Storing a program, and then data, as holes in card stock.',
      children: [
        {
          id: 'jacquard-loom',
          name: 'Jacquard Loom',
          year: 1804,
          era: 'mechanical',
          kind: 'machine',
          origin: 'France',
          summary:
            'A chain of punched cards decides the weave. The idea of a machine reading its behaviour from a replaceable record starts here.',
          facts: ['A direct influence on Babbage and Hollerith'],
        },
        {
          id: 'hollerith',
          name: 'Hollerith Tabulator',
          year: 1890,
          era: 'mechanical',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Cut the US census from years to months. The first successful data processing machine to read cards by electrical contact.',
          children: [
            {
              id: 'ctr',
              name: 'CTR',
              year: 1911,
              era: 'mechanical',
              kind: 'group',
              origin: 'USA',
              summary: 'The merger that absorbed Hollerith’s company.',
              children: [
                {
                  id: 'ibm-company',
                  name: 'IBM',
                  year: 1924,
                  era: 'mechanical',
                  kind: 'group',
                  origin: 'USA',
                  summary:
                    'CTR renamed itself International Business Machines. The centre of gravity of the industry for the next fifty years.',
                },
              ],
            },
          ],
        },
        {
          id: 'powers-samas',
          name: 'Powers-Samas',
          year: 1915,
          era: 'mechanical',
          kind: 'machine',
          origin: 'England',
          summary:
            'IBM’s most serious European rival in punched card work. Read cards mechanically rather than electrically.',
        },
      ],
    },
    {
      id: 'babbage-line',
      name: 'The Babbage Line',
      era: 'mechanical',
      kind: 'group',
      summary: 'The first complete design for a programmable general purpose machine.',
      children: [
        {
          id: 'difference-engine',
          name: 'Difference Engine',
          year: 1822,
          era: 'mechanical',
          kind: 'machine',
          origin: 'England',
          summary:
            'Charles Babbage designed a machine to tabulate polynomials by finite differences. Government funding stopped before it was finished.',
          facts: ['A working example was built from the drawings in London in 1991'],
          children: [
            {
              id: 'scheutz-engine',
              name: 'Scheutz Difference Engine',
              year: 1853,
              era: 'mechanical',
              kind: 'machine',
              origin: 'Sweden',
              summary:
                'A father and son turned Babbage’s idea into a machine that actually ran, sold, and printed tables.',
            },
          ],
        },
        {
          id: 'analytical-engine',
          name: 'Analytical Engine',
          year: 1837,
          era: 'mechanical',
          kind: 'machine',
          origin: 'England',
          summary:
            'A complete computer design: arithmetic unit, memory, conditional branching, and a punched card program. Never built.',
          facts: ['Separate mill and store', 'Conditional branching and loops'],
          children: [
            {
              id: 'lovelace-notes',
              name: 'Lovelace Notes',
              year: 1843,
              era: 'theory',
              kind: 'concept',
              origin: 'England',
              summary:
                'Ada Lovelace appended notes to her translation on the Analytical Engine, giving a sequence of operations for Bernoulli numbers and arguing the machine could work on symbols, not only numbers.',
              facts: ['The first published algorithm in detail'],
            },
          ],
        },
      ],
    },
    {
      id: 'analog-computing',
      name: 'Analogue Computing',
      era: 'mechanical',
      kind: 'group',
      summary: 'Computing on a continuous physical quantity rather than on digits.',
      children: [
        {
          id: 'tide-predictor',
          name: 'Tide Predicting Machine',
          year: 1872,
          era: 'mechanical',
          kind: 'machine',
          origin: 'England',
          summary:
            'Lord Kelvin’s machine plotted the tide curve mechanically as a sum of harmonic components.',
        },
        {
          id: 'differential-analyser',
          name: 'Differential Analyser',
          year: 1931,
          era: 'mechanical',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Vannevar Bush built it at MIT to solve differential equations with wheel and disc integrators. It produced ballistics tables during the Second World War.',
        },
        {
          id: 'norden-bombsight',
          name: 'Norden Bombsight',
          year: 1931,
          era: 'mechanical',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A special purpose analogue computer working on speed, wind, and altitude entirely in gearing.',
        },
      ],
    },
    {
      id: 'theory',
      name: 'Theoretical Foundations',
      era: 'theory',
      kind: 'group',
      summary: 'The work that defined what computation is, and where it stops.',
      children: [
        {
          id: 'boolean-algebra',
          name: 'Boolean Algebra',
          year: 1847,
          era: 'theory',
          kind: 'concept',
          origin: 'England',
          summary:
            'George Boole turned logic into algebra. Ninety years later that algebra became the language of circuit design.',
        },
        {
          id: 'hilbert-program',
          name: "Hilbert's Program",
          year: 1928,
          era: 'theory',
          kind: 'concept',
          origin: 'Germany',
          summary:
            'The question of whether all of mathematics could be decided mechanically. Chasing the answer produced computability theory.',
          children: [
            {
              id: 'godel-incompleteness',
              name: 'Gödel Incompleteness Theorems',
              year: 1931,
              era: 'theory',
              kind: 'concept',
              origin: 'Austria',
              summary:
                'Showed that any sufficiently strong consistent system contains true statements it cannot prove.',
            },
            {
              id: 'lambda-calculus',
              name: 'Lambda Calculus',
              year: 1936,
              era: 'theory',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Alonzo Church’s model of computation, built from function abstraction and application. The root of functional programming.',
            },
            {
              id: 'turing-machine',
              name: 'Turing Machine',
              year: 1936,
              era: 'theory',
              kind: 'concept',
              origin: 'England',
              summary:
                'Alan Turing defined computability with a tape, a head, and a finite state table. The same paper showed the halting problem is undecidable.',
              facts: ['A universal machine: the program is data too', 'The halting problem is undecidable'],
              children: [
                {
                  id: 'church-turing',
                  name: 'Church-Turing Thesis',
                  year: 1936,
                  era: 'theory',
                  kind: 'concept',
                  summary:
                    'The observation that independently invented definitions of computation all describe the same class. What the word "computable" came to mean.',
                },
              ],
            },
          ],
        },
        {
          id: 'shannon-thesis',
          name: "Shannon's Master's Thesis",
          year: 1937,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Claude Shannon showed that relay switching circuits can be designed with Boolean algebra. Digital circuit design starts with this thesis.',
        },
        {
          id: 'information-theory',
          name: 'Information Theory',
          year: 1948,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Shannon measured information in bits and defined channel capacity and the limit for error free transmission over noise.',
          facts: ['The word "bit" entered common use with this paper'],
          children: [
            {
              id: 'hamming-code',
              name: 'Hamming Code',
              year: 1950,
              era: 'theory',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Richard Hamming wanted punched card readers to fix their own errors. His codes correct any single flipped bit, and Hamming(7,4) does it with three parity bits for every four of data.',
              children: [
                {
                  id: 'reed-solomon',
                  name: 'Reed-Solomon Codes',
                  year: 1960,
                  era: 'theory',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'Irving Reed and Gustave Solomon built codes on symbols rather than single bits, so a whole burst of damage can be repaired. They sit inside CDs, DVDs, Blu-ray, QR codes, DSL and RAID 6.',
                },
                {
                  id: 'ldpc',
                  name: 'LDPC Codes',
                  year: 1960,
                  era: 'theory',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'Low-density parity-check codes, which Robert Gallager devised in his 1960 doctoral dissertation at MIT. They were ignored for decades because decoding was too costly, came back in the mid 1990s, and are now used from wireless links to flash storage.',
                },
                {
                  id: 'turbo-code',
                  name: 'Turbo Codes',
                  year: 1993,
                  era: 'network',
                  kind: 'concept',
                  origin: 'France',
                  summary:
                    'Error correcting codes that were the first practical ones to come close to the Shannon limit. The patent was filed in 1991 with Claude Berrou as sole inventor, the paper by Berrou, Alain Glavieux and Punya Thitimajshima followed in 1993, and 3G and 4G mobile networks use them.',
                },
              ],
            },
            {
              id: 'kolmogorov-complexity',
              name: 'Kolmogorov Complexity',
              year: 1963,
              era: 'theory',
              kind: 'concept',
              summary:
                'The information in a string measured as the length of the shortest program that prints it. Andrey Kolmogorov first published on it in 1963, it also carries the names of Ray Solomonoff and Gregory Chaitin, and no single program can compute it exactly for infinitely many strings.',
            },
          ],
        },
        {
          id: 'von-neumann-architecture',
          name: 'von Neumann Architecture',
          year: 1945,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The first draft report on EDVAC described a single memory holding both program and data. The basis of most processors since.',
          facts: ['The stored program idea', 'The bottleneck between processor and memory'],
        },
        {
          id: 'harvard-architecture',
          name: 'Harvard Architecture',
          year: 1944,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Separate memory paths for program and data. Still alive in embedded processors and in cache design.',
        },
        {
          id: 'cybernetics',
          name: 'Cybernetics',
          year: 1948,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Norbert Wiener put feedback and control in one framework covering both animals and machines.',
        },
        {
          id: 'dijkstra-algorithm',
          name: "Dijkstra's Algorithm",
          year: 1956,
          era: 'theory',
          kind: 'concept',
          origin: 'Netherlands',
          summary:
            'Shortest paths from one node to every other in a weighted graph. Edsger Dijkstra conceived it in 1956 and published it in 1959, and link state routing such as OSPF and IS-IS still runs it.',
        },
        {
          id: 'quicksort',
          name: 'Quicksort',
          year: 1959,
          era: 'theory',
          kind: 'concept',
          origin: 'England',
          summary:
            'Tony Hoare’s divide and conquer sort: pick a pivot, split the rest around it, recurse. Developed in 1959, published in 1961, and still one of the most used sorting algorithms.',
        },
        {
          id: 'cooley-tukey-fft',
          name: 'Cooley-Tukey FFT',
          year: 1965,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'James Cooley and John Tukey showed how to compute a discrete Fourier transform in N log N steps by splitting it into smaller ones. Gauss had found the trick long before, but their 1965 paper is what made FFTs popular.',
        },
        {
          id: 'complexity-theory',
          name: 'Complexity Theory',
          year: 1965,
          era: 'theory',
          kind: 'concept',
          summary:
            'Solvable is not enough; how many steps it takes matters. The classes P and NP came out of that question.',
          children: [
            {
              id: 'cook-levin',
              name: 'NP-completeness',
              year: 1971,
              era: 'theory',
              kind: 'concept',
              summary:
                'Stephen Cook showed satisfiability to be among the hardest problems in NP. Whether P equals NP is still open.',
            },
            {
              id: 'strassen-algorithm',
              name: 'Strassen Algorithm',
              year: 1969,
              era: 'theory',
              kind: 'concept',
              summary:
                'Volker Strassen showed in 1969 that two matrices can be multiplied in fewer steps than the schoolbook method needs, proving the obvious algorithm was not optimal. It set off the long search for the true cost of matrix multiplication.',
            },
          ],
        },
      ],
    },
  ],
}
