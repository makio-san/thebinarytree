import type { ComputerDatum } from '../types'

/**
 * Programming languages. Nesting follows influence, which for languages is the
 * closest thing there is to descent: ALGOL -> CPL -> BCPL -> B -> C is a real
 * chain of people rewriting the last language to fit a smaller machine.
 */
export const languages: ComputerDatum = {
  id: 'languages',
  name: 'Programming Languages',
  era: 'integrated',
  kind: 'group',
  summary:
    'Fifty years of turning away from machine code. The ALGOL to C chain advanced by squeezing each language onto a smaller machine.',
  children: [
    {
      id: 'early-languages',
      name: 'First Languages',
      era: 'tube',
      kind: 'group',
      summary: 'The idea of translating readable instructions into machine code.',
      children: [
        {
          id: 'assembly',
          name: 'Assembly',
          year: 1949,
          era: 'tube',
          kind: 'language',
          summary:
            'Mnemonics in place of numeric opcodes. The first assembler ran on EDSAC; the only language family that maps one to one onto the machine.',
        },
        {
          id: 'a-0',
          name: 'A-0',
          year: 1952,
          era: 'tube',
          kind: 'language',
          origin: 'USA',
          summary:
            'Grace Hopper’s system for UNIVAC, the first known compiler. It showed that a program could translate a program.',
        },
        {
          id: 'autocode',
          name: 'Autocode',
          year: 1952,
          era: 'tube',
          kind: 'language',
          origin: 'England',
          summary: 'One of the first attempts at a high level language, written for the Manchester machines.',
        },
      ],
    },
    {
      id: 'fortran-line',
      name: 'The Fortran Line',
      era: 'transistor',
      kind: 'group',
      summary: 'The language of scientific computation.',
      children: [
        {
          id: 'fortran',
          name: 'Fortran',
          year: 1957,
          era: 'transistor',
          kind: 'language',
          origin: 'USA',
          summary:
            'John Backus’s team wrote the first widely used high level language for the IBM 704. It was accepted because its output competed with hand written assembly.',
          facts: ['Still used in weather and fluid dynamics codes'],
          children: [
            {
              id: 'fortran-77',
              name: 'Fortran 77',
              year: 1978,
              era: 'micro',
              kind: 'language',
              summary: 'Structured control flow and a character type arrived.',
              children: [
                {
                  id: 'fortran-90',
                  name: 'Fortran 90',
                  year: 1991,
                  era: 'modern',
                  kind: 'language',
                  summary: 'Array operations, modules, and free form source.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'lisp-line',
      name: 'The Lisp Line',
      era: 'transistor',
      kind: 'group',
      summary: 'Languages in which code is also data.',
      children: [
        {
          id: 'lisp',
          name: 'Lisp',
          year: 1958,
          era: 'transistor',
          kind: 'language',
          origin: 'USA',
          summary:
            'John McCarthy derived it from the lambda calculus. It introduced recursion, garbage collection, the conditional expression, and programs that write programs.',
          facts: ['Code and data share one structure', 'The first language with garbage collection'],
          children: [
            {
              id: 'scheme',
              name: 'Scheme',
              year: 1975,
              era: 'micro',
              kind: 'language',
              origin: 'USA',
              summary:
                'Lisp reduced to something small and consistent. Tail call optimisation and lexical scope became part of the standard.',
            },
            {
              id: 'common-lisp',
              name: 'Common Lisp',
              year: 1984,
              era: 'micro',
              kind: 'language',
              summary: 'An effort to unify scattered Lisp dialects into one standard.',
            },
            {
              id: 'clojure',
              name: 'Clojure',
              year: 2007,
              era: 'modern',
              kind: 'language',
              summary:
                'A Lisp on the JVM built around immutable data structures, designed for concurrency.',
            },
          ],
        },
      ],
    },
    {
      id: 'algol-line',
      name: 'The ALGOL Line',
      era: 'integrated',
      kind: 'group',
      summary: 'Most of today’s languages take their syntax from here.',
      children: [
        {
          id: 'algol-60',
          name: 'ALGOL 60',
          year: 1960,
          era: 'integrated',
          kind: 'language',
          summary:
            'The first language with block structure, recursion, and a formal grammar. Barely used itself, but it influenced nearly everything.',
          facts: ['Syntax defined in BNF', 'An improvement on almost all of its successors'],
          children: [
            {
              id: 'cpl',
              name: 'CPL',
              year: 1963,
              era: 'integrated',
              kind: 'language',
              origin: 'England',
              summary: 'A Cambridge and London collaboration. Too large ever to get a full compiler.',
              children: [
                {
                  id: 'bcpl',
                  name: 'BCPL',
                  year: 1967,
                  era: 'integrated',
                  kind: 'language',
                  origin: 'England',
                  summary:
                    'CPL made portable and plain. Curly brace blocks and the hello world tradition start here.',
                  children: [
                    {
                      id: 'b-language',
                      name: 'B',
                      year: 1969,
                      era: 'network',
                      kind: 'language',
                      origin: 'USA',
                      summary: 'Ken Thompson’s attempt to fit BCPL onto a small machine.',
                      children: [
                        {
                          id: 'c-language',
                          name: 'C',
                          year: 1972,
                          era: 'network',
                          kind: 'language',
                          origin: 'USA',
                          summary:
                            'Dennis Ritchie added a type system to B. Unix was rewritten in it, and it became the common language of systems programming and still is.',
                          facts: ['Close to the hardware but portable', 'Most kernels today are written in C'],
                          children: [
                            {
                              id: 'cpp',
                              name: 'C++',
                              year: 1985,
                              era: 'micro',
                              kind: 'language',
                              origin: 'Denmark / USA',
                              summary:
                                'Bjarne Stroustrup added classes and templates to C. Its zero cost abstraction principle made it the language of games, browsers, and financial infrastructure.',
                              children: [
                                {
                                  id: 'java',
                                  name: 'Java',
                                  year: 1995,
                                  era: 'modern',
                                  kind: 'language',
                                  origin: 'USA',
                                  summary:
                                    'Solved portability by running on a virtual machine. The default for enterprise server software for a long time.',
                                  facts: ['Write once, run anywhere', 'Garbage collection by default'],
                                  children: [
                                    {
                                      id: 'csharp',
                                      name: 'C#',
                                      year: 2000,
                                      era: 'modern',
                                      kind: 'language',
                                      origin: 'USA',
                                      summary:
                                        'Microsoft’s language for .NET. It started close to Java and then went its own way.',
                                    },
                                    {
                                      id: 'kotlin',
                                      name: 'Kotlin',
                                      year: 2011,
                                      era: 'modern',
                                      kind: 'language',
                                      origin: 'Russia / Czechia',
                                      summary:
                                        'Runs alongside Java on the JVM, shorter and null safe. The default for Android development.',
                                    },
                                    {
                                      id: 'scala',
                                      name: 'Scala',
                                      year: 2004,
                                      era: 'modern',
                                      kind: 'language',
                                      origin: 'Switzerland',
                                      summary:
                                        'Combined object oriented and functional styles on the JVM.',
                                    },
                                  ],
                                },
                                {
                                  id: 'rust',
                                  name: 'Rust',
                                  year: 2010,
                                  era: 'modern',
                                  kind: 'language',
                                  origin: 'USA',
                                  summary:
                                    'Ownership and borrowing give memory safety at compile time without a garbage collector. Used in kernels and browser engines.',
                                },
                              ],
                            },
                            {
                              id: 'objective-c',
                              name: 'Objective-C',
                              year: 1984,
                              era: 'micro',
                              kind: 'language',
                              origin: 'USA',
                              summary:
                                'Smalltalk style message passing bolted onto C. The language of NeXTSTEP, then macOS and iOS applications.',
                              children: [
                                {
                                  id: 'swift',
                                  name: 'Swift',
                                  year: 2014,
                                  era: 'modern',
                                  kind: 'language',
                                  origin: 'USA',
                                  summary:
                                    'Apple’s safe and readable replacement for Objective-C.',
                                },
                              ],
                            },
                            {
                              id: 'go',
                              name: 'Go',
                              year: 2009,
                              era: 'modern',
                              kind: 'language',
                              origin: 'USA',
                              summary:
                                'An attempt to get back C’s simplicity and fast compilation. Concurrency through goroutines; most cloud infrastructure is written in it.',
                            },
                            {
                              id: 'zig',
                              name: 'Zig',
                              year: 2016,
                              era: 'modern',
                              kind: 'language',
                              summary:
                                'Systems programming with no hidden control flow and no hidden allocation. Aimed squarely at replacing C.',
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
              id: 'simula',
              name: 'Simula 67',
              year: 1967,
              era: 'integrated',
              kind: 'language',
              origin: 'Norway',
              summary:
                'The language that invented classes and objects, and the start of object oriented programming.',
              children: [
                {
                  id: 'smalltalk',
                  name: 'Smalltalk',
                  year: 1972,
                  era: 'micro',
                  kind: 'language',
                  origin: 'USA',
                  summary:
                    'Alan Kay’s team at Xerox PARC. Everything is an object and everything is a message. The graphical interface and the integrated development environment came from here.',
                },
              ],
            },
            {
              id: 'pascal',
              name: 'Pascal',
              year: 1970,
              era: 'integrated',
              kind: 'language',
              origin: 'Switzerland',
              summary:
                'Niklaus Wirth’s disciplined, readable teaching language. A generation learned to program in it.',
              children: [
                {
                  id: 'turbo-pascal',
                  name: 'Turbo Pascal',
                  year: 1983,
                  era: 'micro',
                  kind: 'language',
                  summary:
                    'Editor and compiler in one product, compiling in seconds. Its low price made PC programming widespread.',
                  children: [
                    {
                      id: 'delphi',
                      name: 'Delphi',
                      year: 1995,
                      era: 'modern',
                      kind: 'language',
                      summary: 'Visual interface design joined to Object Pascal.',
                    },
                  ],
                },
                {
                  id: 'modula-2',
                  name: 'Modula-2',
                  year: 1978,
                  era: 'micro',
                  kind: 'language',
                  origin: 'Switzerland',
                  summary: 'Wirth’s successor, focused on modules and separate compilation.',
                },
              ],
            },
            {
              id: 'ada',
              name: 'Ada',
              year: 1980,
              era: 'micro',
              kind: 'language',
              summary:
                'Designed for the US Department of Defense: strongly typed, with concurrency in the language. Still used in avionics and rail software.',
            },
          ],
        },
      ],
    },
    {
      id: 'business-languages',
      name: 'Business Languages',
      era: 'transistor',
      kind: 'group',
      summary: 'Languages designed for record processing and reporting.',
      children: [
        {
          id: 'cobol',
          name: 'COBOL',
          year: 1959,
          era: 'transistor',
          kind: 'language',
          origin: 'USA',
          summary:
            'Near English syntax for processing business records. Billions of lines are still running in banking and insurance.',
          facts: ['Grace Hopper’s FLOW-MATIC was a direct influence'],
        },
        {
          id: 'rpg',
          name: 'RPG',
          year: 1959,
          era: 'transistor',
          kind: 'language',
          summary: 'IBM’s report generation language, long lived on midrange systems.',
        },
        {
          id: 'sql',
          name: 'SQL',
          year: 1974,
          era: 'network',
          kind: 'language',
          origin: 'USA',
          summary:
            'Developed at IBM on top of Codd’s relational model. You state what you want and the system decides how to find it.',
          facts: ['Declarative: what, not how', 'The common language of data access for fifty years'],
        },
      ],
    },
    {
      id: 'teaching-languages',
      name: 'Teaching and Home Computer Languages',
      era: 'personal',
      kind: 'group',
      summary: 'The first languages most people ever met.',
      children: [
        {
          id: 'basic',
          name: 'BASIC',
          year: 1964,
          era: 'integrated',
          kind: 'language',
          origin: 'USA',
          summary:
            'Kemeny and Kurtz wrote it at Dartmouth so that non specialists could program too. It later shipped built into nearly every home computer.',
          children: [
            {
              id: 'visual-basic',
              name: 'Visual Basic',
              year: 1991,
              era: 'modern',
              kind: 'language',
              summary:
                'Building a Windows application by dragging a form together. A large share of internal business software was written in it.',
            },
          ],
        },
        {
          id: 'logo',
          name: 'Logo',
          year: 1967,
          era: 'integrated',
          kind: 'language',
          origin: 'USA',
          summary:
            'Seymour Papert designed it to teach children programming. Turtle graphics.',
          children: [
            {
              id: 'scratch',
              name: 'Scratch',
              year: 2007,
              era: 'modern',
              kind: 'language',
              origin: 'USA',
              summary: 'Programming by snapping blocks together, the Logo tradition in its current form.',
            },
          ],
        },
      ],
    },
    {
      id: 'functional-logic',
      name: 'Functional and Logic Languages',
      era: 'micro',
      kind: 'group',
      summary: 'Languages that state expressions and rules rather than steps.',
      children: [
        {
          id: 'prolog',
          name: 'Prolog',
          year: 1972,
          era: 'micro',
          kind: 'language',
          origin: 'France',
          summary:
            'You write facts and rules, and the system resolves the query. The main language of logic programming.',
        },
        {
          id: 'ml',
          name: 'ML',
          year: 1973,
          era: 'micro',
          kind: 'language',
          origin: 'England',
          summary:
            'Written for a theorem prover. Type inference and pattern matching spread from here into every modern language.',
          children: [
            {
              id: 'ocaml',
              name: 'OCaml',
              year: 1996,
              era: 'modern',
              kind: 'language',
              origin: 'France',
              summary: 'ML with object support and a fast native compiler.',
            },
            {
              id: 'haskell',
              name: 'Haskell',
              year: 1990,
              era: 'modern',
              kind: 'language',
              summary:
                'Purely functional and lazily evaluated, with side effects constrained by the type system.',
            },
            {
              id: 'fsharp',
              name: 'F#',
              year: 2005,
              era: 'modern',
              kind: 'language',
              summary: 'The ML tradition carried onto .NET.',
            },
          ],
        },
        {
          id: 'erlang',
          name: 'Erlang',
          year: 1986,
          era: 'micro',
          kind: 'language',
          origin: 'Sweden',
          summary:
            'Written at Ericsson for telephone exchanges. Lightweight processes, message passing, and code replacement while running.',
          children: [
            {
              id: 'elixir',
              name: 'Elixir',
              year: 2011,
              era: 'modern',
              kind: 'language',
              origin: 'Brazil',
              summary: 'Modern syntax and tooling on the Erlang virtual machine.',
            },
          ],
        },
      ],
    },
    {
      id: 'scripting',
      name: 'Scripting Languages',
      era: 'modern',
      kind: 'group',
      summary: 'Languages that skip the compile step.',
      children: [
        {
          id: 'awk',
          name: 'AWK',
          year: 1977,
          era: 'network',
          kind: 'language',
          origin: 'USA',
          summary: 'A small language for line by line text processing, and an emblem of the Unix tool culture.',
          children: [
            {
              id: 'perl',
              name: 'Perl',
              year: 1987,
              era: 'micro',
              kind: 'language',
              origin: 'USA',
              summary:
                'Text processing and system administration in one language. The glue of the early web.',
              children: [
                {
                  id: 'php',
                  name: 'PHP',
                  year: 1995,
                  era: 'modern',
                  kind: 'language',
                  origin: 'Canada / Denmark',
                  summary:
                    'A server language embedded inside HTML. Much of the web was written in it for a long time.',
                },
                {
                  id: 'ruby',
                  name: 'Ruby',
                  year: 1995,
                  era: 'modern',
                  kind: 'language',
                  origin: 'Japan',
                  summary:
                    'A language that treats programmer happiness as a design criterion. Rails made web development fast.',
                },
              ],
            },
          ],
        },
        {
          id: 'python',
          name: 'Python',
          year: 1991,
          era: 'modern',
          kind: 'language',
          origin: 'Netherlands',
          summary:
            'Guido van Rossum’s language, putting readability first. Indentation is part of the syntax; today it is the common language of data and machine learning.',
          facts: ['Indentation defines blocks', 'Became the default for scientific computing'],
          children: [
            {
              id: 'project-jupyter',
              name: 'Project Jupyter',
              year: 2014,
              era: 'modern',
              kind: 'concept',
              summary:
                'Interactive notebooks that mix code, results and prose, spun off from IPython in 2014 and named for Julia, Python and R. The notebook became the standard working surface of data science.',
            },
          ],
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          year: 1995,
          era: 'modern',
          kind: 'language',
          origin: 'USA',
          summary:
            'Brendan Eich wrote it at Netscape in ten days. Being the browser’s only language made it the most widely deployed runtime in the world.',
          children: [
            {
              id: 'nodejs',
              name: 'Node.js',
              year: 2009,
              era: 'modern',
              kind: 'concept',
              summary:
                'Took the V8 engine out of the browser and onto the server. One language on both sides.',
            },
            {
              id: 'typescript',
              name: 'TypeScript',
              year: 2012,
              era: 'modern',
              kind: 'language',
              origin: 'USA',
              summary:
                'Adds a compile time type system to JavaScript, and became the default for large front end projects.',
            },
          ],
        },
        {
          id: 'lua',
          name: 'Lua',
          year: 1993,
          era: 'modern',
          kind: 'language',
          origin: 'Brazil',
          summary:
            'A small language designed to be embedded. Common in game engines and networking equipment.',
        },
        {
          id: 'r-language',
          name: 'R',
          year: 1993,
          era: 'modern',
          kind: 'language',
          origin: 'New Zealand',
          summary: 'A language and environment built for statistics and graphics.',
        },
      ],
    },
  ],
}
