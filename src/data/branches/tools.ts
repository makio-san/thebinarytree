import type { ComputerDatum } from '../types'

/**
 * The software people write software with, and the agreements that let any of it
 * interoperate.
 */
export const tools: ComputerDatum = {
  id: 'tools',
  name: 'Tools and Standards',
  era: 'network',
  kind: 'group',
  summary:
    'The programs people write programs with, and the agreements without which none of it would interoperate.',
  children: [
    {
      id: 'compilers-tools',
      name: 'Compilers and Build',
      era: 'network',
      kind: 'group',
      summary: 'Turning source into something a machine will run.',
      children: [
        {
          id: 'assembler',
          name: 'Assembler',
          year: 1949,
          era: 'tube',
          kind: 'concept',
          summary: 'The first program written to save people from writing machine code by hand.',
        },
        {
          id: 'linker',
          name: 'Linker and Loader',
          year: 1951,
          era: 'tube',
          kind: 'concept',
          summary:
            'Compile pieces separately and join them later. Without it every change means recompiling everything, which is why it arrived almost immediately.',
        },
        {
          id: 'dragon-book',
          name: 'Parsing Theory',
          year: 1965,
          era: 'integrated',
          kind: 'concept',
          summary:
            'LR and LL parsing turned "write a compiler" from a research project into an engineering task with a known method.',
        },
        {
          id: 'yacc',
          name: 'yacc and lex',
          year: 1975,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Generate a parser from a grammar rather than writing one. A domain specific language for making languages.',
        },
        {
          id: 'make',
          name: 'make',
          year: 1976,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Rebuild only what changed, decided by file timestamps. Nearly fifty years on, most build systems are still arguing with its model rather than replacing it.',
          children: [
            {
              id: 'cmake',
              name: 'CMake',
              year: 2000,
              era: 'modern',
              kind: 'concept',
              summary:
                'A meta build tool that writes the build files for Make, Ninja, Xcode or Visual Studio from one description. Work began at Kitware in 1999 to build the Insight Toolkit, a medical imaging library, on many platforms, and it was first released in 2000.',
            },
            {
              id: 'bazel',
              name: 'Bazel',
              year: 2015,
              era: 'modern',
              kind: 'concept',
              summary:
                'An open source port of Blaze, the build tool Google began in 2006 for speed and correctness in one very large monorepo. First released in March 2015, with rules written in Starlark, a dialect of Python.',
            },
          ],
        },
        {
          id: 'gcc',
          name: 'GCC',
          year: 1987,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A free compiler good enough to build an operating system, which is what made a free operating system possible at all.',
        },
        {
          id: 'llvm',
          name: 'LLVM',
          year: 2003,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A compiler as a reusable library around a typed intermediate representation. Swift, Rust, Clang and most new languages start here rather than from scratch.',
          children: [
            {
              id: 'clang',
              name: 'Clang',
              year: 2007,
              era: 'modern',
              kind: 'concept',
              summary:
                'A C and C++ front end built for tooling, with error messages that tell you what to do. It raised the bar for every compiler.',
            },
            {
              id: 'wasm',
              name: 'WebAssembly',
              year: 2017,
              era: 'modern',
              kind: 'concept',
              summary:
                'A portable, sandboxed binary instruction format. Compiled languages in the browser at near-native speed, and increasingly outside it.',
            },
          ],
        },
      ],
    },
    {
      id: 'editors',
      name: 'Editors and Typesetting',
      era: 'network',
      kind: 'group',
      summary: 'Where the text actually gets written.',
      children: [
        {
          id: 'ed',
          name: 'ed',
          year: 1969,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A line editor for a teletype, where showing the file cost paper. Its command language survives in sed, grep and vi.',
        },
        {
          id: 'vi',
          name: 'vi',
          year: 1976,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A visual editor for a slow terminal, which is why it separates moving from typing. Still installed on essentially every Unix machine.',
          children: [
            {
              id: 'vim',
              name: 'Vim',
              year: 1991,
              era: 'modern',
              kind: 'concept',
              origin: 'Netherlands',
              summary: 'vi extended, and the modal editing model that refuses to die.',
            },
          ],
        },
        {
          id: 'emacs',
          name: 'Emacs',
          year: 1976,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'An editor that is really a Lisp environment with a text buffer. The opposite bet from vi: extend everything rather than do one thing.',
        },
        {
          id: 'tex',
          name: 'TeX',
          year: 1978,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Donald Knuth wrote it because he could not bear how his own books were being typeset. Still the standard for mathematics, and famously close to bug free.',
          facts: ['Version numbers converge on pi'],
          children: [
            {
              id: 'latex',
              name: 'LaTeX',
              year: 1984,
              era: 'micro',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Leslie Lamport’s macros on top of TeX, written at SRI International in the early 1980s, so authors mark up structure and TeX handles the layout. Most mathematics and computer science papers are still written in it.',
            },
          ],
        },
        {
          id: 'vscode',
          name: 'Visual Studio Code',
          year: 2015,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A web technology editor that became the default. The Language Server Protocol it introduced decoupled language support from the editor.',
        },
        {
          id: 'wordstar',
          name: 'WordStar',
          year: 1978,
          era: 'personal',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Rob Barnaby’s word processor for CP/M, published by MicroPro. It dominated microcomputers in the early and mid 1980s until WordPerfect overtook it from 1985.',
        },
      ],
    },
    {
      id: 'version-control',
      name: 'Version Control',
      era: 'network',
      kind: 'group',
      summary: 'Keeping the history of a change, and merging two of them.',
      children: [
        {
          id: 'sccs',
          name: 'SCCS',
          year: 1972,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary: 'The first version control system: revisions of a single file, with locking.',
          children: [
            {
              id: 'rcs',
              name: 'RCS',
              year: 1982,
              era: 'micro',
              kind: 'concept',
              summary: 'Faster deltas, still one file at a time.',
              children: [
                {
                  id: 'cvs',
                  name: 'CVS',
                  year: 1990,
                  era: 'modern',
                  kind: 'concept',
                  summary:
                    'RCS extended to a whole project with concurrent edits. It made open source collaboration at a distance practical.',
                  children: [
                    {
                      id: 'subversion',
                      name: 'Subversion',
                      year: 2000,
                      era: 'modern',
                      kind: 'concept',
                      summary: 'CVS done properly: atomic commits, and directories under version control.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'bitkeeper',
          name: 'BitKeeper',
          year: 1998,
          era: 'modern',
          kind: 'concept',
          summary:
            'Distributed version control, used by the Linux kernel until its licence became a problem. That problem produced Git.',
          children: [
            {
              id: 'git',
              name: 'Git',
              year: 2005,
              era: 'modern',
              kind: 'concept',
              origin: 'Finland / USA',
              summary:
                'Written in ten days when the kernel lost BitKeeper. A content-addressed object store with history as a graph, which made branching cheap and therefore normal.',
              facts: ['Every commit is named by the hash of its content', 'Branching costs nothing'],
              children: [
                {
                  id: 'github',
                  name: 'GitHub',
                  year: 2008,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'Git plus a social layer. The pull request turned reviewing a change into the unit of collaboration.',
                },
              ],
            },
            {
              id: 'mercurial',
              name: 'Mercurial',
              year: 2005,
              era: 'modern',
              kind: 'concept',
              summary: 'Started the same week as Git, for the same reason, with a gentler interface.',
            },
          ],
        },
      ],
    },
    {
      id: 'encoding',
      name: 'Encoding and Standards',
      era: 'transistor',
      kind: 'group',
      summary: 'Agreements about what the bits mean.',
      children: [
        {
          id: 'baudot',
          name: 'Baudot Code',
          year: 1870,
          era: 'mechanical',
          kind: 'concept',
          origin: 'France',
          summary: 'Five bits per character for the telegraph, and the ancestor of every character set since.',
        },
        {
          id: 'ascii',
          name: 'ASCII',
          year: 1963,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Seven bits, 128 characters, and enough agreement that two machines could exchange text at all. Its lack of anything but English shaped computing for forty years.',
        },
        {
          id: 'ebcdic',
          name: 'EBCDIC',
          year: 1964,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'IBM’s incompatible alternative, derived from punched card codes. Still alive on mainframes, and still a source of conversion bugs.',
        },
        {
          id: 'unicode',
          name: 'Unicode',
          year: 1991,
          era: 'modern',
          kind: 'concept',
          summary:
            'One code point per character for every script. It ended the era where opening a file in the wrong country produced gibberish.',
          children: [
            {
              id: 'utf-8',
              name: 'UTF-8',
              year: 1992,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Designed by Thompson and Pike on a diner placemat. Backwards compatible with ASCII, self-synchronising, and now how almost all text is stored.',
              facts: ['ASCII text is already valid UTF-8'],
            },
          ],
        },
        {
          id: 'ieee-754',
          name: 'IEEE 754',
          year: 1985,
          era: 'micro',
          kind: 'concept',
          summary:
            'One definition of floating point arithmetic, including what happens at the edges. Before it, the same program gave different answers on different machines.',
        },
        {
          id: 'posix',
          name: 'POSIX',
          year: 1988,
          era: 'micro',
          kind: 'concept',
          summary:
            'A standard for what a Unix must provide, so source could move between them. The reason "Unix-like" means anything.',
        },
        {
          id: 'iso-8601',
          name: 'ISO 8601',
          year: 1988,
          era: 'micro',
          kind: 'concept',
          summary:
            'Dates written largest unit first, so lexical order is chronological order. A small standard that removes a whole class of bug.',
        },
        {
          id: 'json',
          name: 'JSON',
          year: 2001,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A subset of JavaScript literals used as a data format. It won over XML by being small enough to read and write by hand.',
        },
        {
          id: 'yaml',
          name: 'YAML',
          year: 2001,
          era: 'modern',
          kind: 'concept',
          summary:
            'A data format that marks nesting with indentation instead of brackets, first proposed by Clark Evans in May 2001 and designed with Ingy döt Net and Oren Ben-Kiki. It became the usual format for configuration files, from CI pipelines to Kubernetes.',
        },
        {
          id: 'protocol-buffers',
          name: 'Protocol Buffers',
          year: 2001,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Google’s compact binary format for structured data, described once in a schema and compiled into code for each language. Used inside Google from early 2001 and released as open source in July 2008.',
        },
      ],
    },
  ],
}
