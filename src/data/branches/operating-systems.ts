import type { ComputerDatum } from '../types'

/**
 * Operating systems, arranged by actual descent rather than by vendor.
 *
 * The two big trunks are Multics -> Unix (which forks into practically
 * everything running on a server or a phone today) and CP/M -> DOS -> Windows.
 * NeXTSTEP is where the Unix trunk quietly grows back into the desktop.
 */
export const operatingSystems: ComputerDatum = {
  id: 'operating-systems',
  name: 'Operating Systems',
  era: 'network',
  kind: 'group',
  summary:
    'Two trunks: Multics to Unix, and CP/M to Windows. Almost every system running today descends from one of them.',
  children: [
    {
      id: 'early-os',
      name: 'First Operating Systems',
      era: 'transistor',
      kind: 'group',
      summary: 'The idea of queueing work and keeping the machine busy.',
      children: [
        {
          id: 'gm-naa-io',
          name: 'GM-NAA I/O',
          year: 1956,
          era: 'transistor',
          kind: 'os',
          origin: 'USA',
          summary:
            'Written for the IBM 704, the first operating system to finish one job and load the next automatically.',
        },
        {
          id: 'ctss',
          name: 'CTSS',
          year: 1961,
          era: 'integrated',
          kind: 'os',
          origin: 'USA',
          summary:
            'The first usable time sharing system, at MIT. Several people using one machine at once started here, and so did the earliest form of email.',
        },
        {
          id: 'os-360',
          name: 'OS/360',
          year: 1966,
          era: 'integrated',
          kind: 'os',
          origin: 'USA',
          summary:
            'The operating system for System/360. Its delays and complexity made Fred Brooks write "The Mythical Man-Month".',
        },
        {
          id: 'multics',
          name: 'Multics',
          year: 1969,
          era: 'integrated',
          kind: 'os',
          origin: 'USA',
          summary:
            'A very ambitious joint project of MIT, Bell Labs, and GE. It introduced virtual memory, a hierarchical file system, and dynamic linking, but stayed heavy.',
          facts: ['The first operating system written in a high level language', 'Protection rings'],
        },
      ],
    },
    {
      id: 'unix-line',
      name: 'The Unix Line',
      era: 'network',
      kind: 'group',
      summary: 'Simplicity and composition of small tools. The infrastructure of the next fifty years.',
      children: [
        {
          id: 'unix',
          name: 'Unix',
          year: 1969,
          era: 'network',
          kind: 'os',
          origin: 'USA',
          summary:
            'Ken Thompson and Dennis Ritchie wrote it on a spare PDP-7 after Bell Labs left Multics. Everything is a file, each tool does one thing, and pipes join them.',
          facts: ['Rewritten in C in 1973, making it portable', 'Pipes, a shell, a hierarchical file system'],
          children: [
            {
              id: 'research-unix-v6',
              name: 'Research Unix V6',
              year: 1975,
              era: 'network',
              kind: 'os',
              origin: 'USA',
              summary:
                'The first release to spread outside Bell Labs. Universities got it with source and taught from it.',
              children: [
                {
                  id: 'bsd',
                  name: 'BSD',
                  year: 1977,
                  era: 'network',
                  kind: 'os',
                  origin: 'USA',
                  summary:
                    'Berkeley’s Unix distribution. vi, the C shell, and most importantly the TCP/IP stack came from here.',
                  children: [
                    {
                      id: 'bsd-4-2',
                      name: '4.2BSD',
                      year: 1983,
                      era: 'network',
                      kind: 'os',
                      origin: 'USA',
                      summary:
                        'The socket interface and TCP/IP. The software side of the internet largely spread with this release.',
                      children: [
                        {
                          id: 'freebsd',
                          name: 'FreeBSD',
                          year: 1993,
                          era: 'modern',
                          kind: 'os',
                          summary:
                            'The open source BSD known for stability and network throughput. Netflix serves its content from it.',
                        },
                        {
                          id: 'netbsd',
                          name: 'NetBSD',
                          year: 1993,
                          era: 'modern',
                          kind: 'os',
                          summary: 'The branch that focuses on portability, and runs on a great many architectures.',
                        },
                        {
                          id: 'openbsd',
                          name: 'OpenBSD',
                          year: 1996,
                          era: 'modern',
                          kind: 'os',
                          summary:
                            'The branch that puts security and code cleanliness first. OpenSSH came out of this project.',
                        },
                      ],
                    },
                    {
                      id: 'sunos',
                      name: 'SunOS',
                      year: 1982,
                      era: 'network',
                      kind: 'os',
                      origin: 'USA',
                      summary: 'The BSD based system on Sun workstations, and the birthplace of NFS.',
                      children: [
                        {
                          id: 'solaris',
                          name: 'Solaris',
                          year: 1992,
                          era: 'modern',
                          kind: 'os',
                          origin: 'USA',
                          summary:
                            'Sun’s move to a System V base. ZFS, DTrace, and container-like zones came from here.',
                        },
                      ],
                    },
                    {
                      id: 'nextstep',
                      name: 'NeXTSTEP',
                      year: 1989,
                      era: 'personal',
                      kind: 'os',
                      origin: 'USA',
                      summary:
                        'A Mach kernel, a BSD layer, and an object oriented interface in Objective-C. The first web browser and web server were written on it.',
                      children: [
                        {
                          id: 'mac-os-x',
                          name: 'Mac OS X',
                          year: 2001,
                          era: 'modern',
                          kind: 'os',
                          origin: 'USA',
                          summary:
                            'Apple bought NeXTSTEP and moved it to the Mac. Unix landed under a mainstream desktop for the first time.',
                          children: [
                            {
                              id: 'macos',
                              name: 'macOS',
                              year: 2016,
                              era: 'modern',
                              kind: 'os',
                              summary: 'The same system under its current name.',
                            },
                            {
                              id: 'ios',
                              name: 'iOS',
                              year: 2007,
                              era: 'mobile',
                              kind: 'os',
                              origin: 'USA',
                              summary:
                                'The build prepared for the iPhone: touch interface, an app store, and a strict permission model.',
                              children: [
                                {
                                  id: 'ipados',
                                  name: 'iPadOS',
                                  year: 2019,
                                  era: 'modern',
                                  kind: 'os',
                                  summary: 'Split off for tablet specific multitasking.',
                                },
                                {
                                  id: 'watchos',
                                  name: 'watchOS',
                                  year: 2015,
                                  era: 'modern',
                                  kind: 'os',
                                  summary: 'The branch for the watch.',
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
                  id: 'xenix',
                  name: 'Xenix',
                  year: 1980,
                  era: 'network',
                  kind: 'os',
                  origin: 'USA',
                  summary:
                    'The Unix Microsoft licensed. For a while it was the most widely installed Unix variant.',
                },
                {
                  id: 'minix',
                  name: 'MINIX',
                  year: 1987,
                  era: 'network',
                  kind: 'os',
                  origin: 'Netherlands',
                  summary:
                    'Andrew Tanenbaum’s small Unix-like system, shipped with his textbook. Because the source was readable, it inspired a student.',
                  children: [
                    {
                      id: 'linux',
                      name: 'Linux',
                      year: 1991,
                      era: 'modern',
                      kind: 'os',
                      origin: 'Finland',
                      summary:
                        'The kernel Linus Torvalds started as a hobby. Combined with the GNU tools it became a complete system and spread from servers to phones.',
                      facts: [
                        'The first announcement: "just a hobby, won’t be big and professional"',
                        'Most internet servers run Linux today',
                      ],
                      children: [
                        {
                          id: 'slackware',
                          name: 'Slackware',
                          year: 1993,
                          era: 'modern',
                          kind: 'os',
                          summary: 'The oldest Linux distribution still maintained.',
                        },
                        {
                          id: 'debian',
                          name: 'Debian',
                          year: 1993,
                          era: 'modern',
                          kind: 'os',
                          summary:
                            'Community governed and known for its package manager. The ancestor of hundreds of distributions.',
                          children: [
                            {
                              id: 'ubuntu',
                              name: 'Ubuntu',
                              year: 2004,
                              era: 'modern',
                              kind: 'os',
                              summary:
                                'The distribution aimed at making Linux usable on the desktop, and very common on cloud servers too.',
                            },
                          ],
                        },
                        {
                          id: 'red-hat',
                          name: 'Red Hat Linux',
                          year: 1994,
                          era: 'modern',
                          kind: 'os',
                          summary:
                            'The company and distribution that established the commercially supported Linux model. RHEL, Fedora, and CentOS are from this line.',
                        },
                        {
                          id: 'android',
                          name: 'Android',
                          year: 2008,
                          era: 'mobile',
                          kind: 'os',
                          summary:
                            'A mobile system on the Linux kernel, and now the most used operating system in the world.',
                          facts: ['First device: HTC Dream, 2008'],
                        },
                        {
                          id: 'ebpf',
                          name: 'eBPF',
                          year: 2014,
                          era: 'modern',
                          kind: 'concept',
                          summary:
                            'Small programs, checked by a verifier, that run inside the Linux kernel without kernel modules, first exposed through the bpf system call in Linux 3.18. It now underpins networking, tracing and security tools across the cloud.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 'system-v',
              name: 'Unix System V',
              year: 1983,
              era: 'network',
              kind: 'os',
              origin: 'USA',
              summary:
                'AT&T’s commercial Unix. Most of the enterprise Unixes that followed used this base.',
              children: [
                {
                  id: 'aix',
                  name: 'AIX',
                  year: 1986,
                  era: 'network',
                  kind: 'os',
                  origin: 'USA',
                  summary: 'IBM’s Unix for POWER processors.',
                },
                {
                  id: 'hp-ux',
                  name: 'HP-UX',
                  year: 1984,
                  era: 'network',
                  kind: 'os',
                  origin: 'USA',
                  summary: 'HP’s enterprise Unix.',
                },
                {
                  id: 'irix',
                  name: 'IRIX',
                  year: 1988,
                  era: 'network',
                  kind: 'os',
                  origin: 'USA',
                  summary: 'SGI’s Unix for graphics workstations.',
                },
              ],
            },
            {
              id: 'plan-9',
              name: 'Plan 9',
              year: 1992,
              era: 'modern',
              kind: 'os',
              origin: 'USA',
              summary:
                'The people who wrote Unix trying again. Every resource is reached through a file system, and UTF-8 was designed in this project.',
            },
          ],
        },
      ],
    },
    {
      id: 'dos-windows',
      name: 'CP/M, DOS, and Windows',
      era: 'personal',
      kind: 'group',
      summary: 'The commercial operating system line of the personal computer.',
      children: [
        {
          id: 'cpm',
          name: 'CP/M',
          year: 1974,
          era: 'personal',
          kind: 'os',
          origin: 'USA',
          summary:
            'Gary Kildall wrote it for 8080 machines. A BIOS layer abstracted hardware differences so the same software ran on different machines.',
          children: [
            {
              id: 'qdos',
              name: '86-DOS',
              year: 1980,
              era: 'personal',
              kind: 'os',
              origin: 'USA',
              summary:
                'Tim Paterson’s CP/M-like system for the 8086. Microsoft bought it.',
              children: [
                {
                  id: 'ms-dos',
                  name: 'MS-DOS',
                  year: 1981,
                  era: 'personal',
                  kind: 'os',
                  origin: 'USA',
                  summary:
                    'The operating system of the IBM PC. Licensing it to IBM while keeping the rights set the direction of the industry.',
                  children: [
                    {
                      id: 'windows-1',
                      name: 'Windows 1.0',
                      year: 1985,
                      era: 'personal',
                      kind: 'os',
                      origin: 'USA',
                      summary: 'A graphical shell on top of DOS. Windows could not even overlap.',
                      children: [
                        {
                          id: 'windows-3',
                          name: 'Windows 3.0',
                          year: 1990,
                          era: 'personal',
                          kind: 'os',
                          origin: 'USA',
                          summary:
                            'The release that made the graphical interface genuinely usable on a PC. Tens of millions of copies sold.',
                          children: [
                            {
                              id: 'windows-95',
                              name: 'Windows 95',
                              year: 1995,
                              era: 'modern',
                              kind: 'os',
                              origin: 'USA',
                              summary:
                                'A Start button, a taskbar, long file names, and bundled TCP/IP. The release that made the computer a mainstream consumer product.',
                            },
                            {
                              id: 'windows-98',
                              name: 'Windows 98',
                              year: 1998,
                              era: 'modern',
                              kind: 'os',
                              origin: 'USA',
                              summary: 'USB support, and the browser folded into the system.',
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'dr-dos',
                      name: 'DR-DOS',
                      year: 1988,
                      era: 'personal',
                      kind: 'os',
                      summary: 'Digital Research’s MS-DOS compatible rival.',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'os2',
          name: 'OS/2',
          year: 1987,
          era: 'personal',
          kind: 'os',
          origin: 'USA',
          summary:
            'A joint IBM and Microsoft project. Technically ahead, but the partnership broke and Windows took the market.',
        },
        {
          id: 'windows-nt',
          name: 'Windows NT 3.1',
          year: 1993,
          era: 'modern',
          kind: 'os',
          origin: 'USA',
          summary:
            'A kernel written by Dave Cutler’s team, entirely independent of DOS and coming out of the VMS tradition. The real ancestor of today’s Windows.',
          facts: ['32 bit and multiprocessor from the start', 'Protection and file system designed seriously'],
          children: [
            {
              id: 'windows-2000',
              name: 'Windows 2000',
              year: 2000,
              era: 'modern',
              kind: 'os',
              summary: 'The NT kernel on the enterprise desktop, with Active Directory.',
              children: [
                {
                  id: 'windows-xp',
                  name: 'Windows XP',
                  year: 2001,
                  era: 'modern',
                  kind: 'os',
                  summary:
                    'Merged the home and business lines onto the NT kernel, and stayed in use for over a decade.',
                  children: [
                    {
                      id: 'windows-7',
                      name: 'Windows 7',
                      year: 2009,
                      era: 'modern',
                      kind: 'os',
                      summary: 'Vista tidied up, and the release enterprises stuck with for a long time.',
                      children: [
                        {
                          id: 'windows-10',
                          name: 'Windows 10',
                          year: 2015,
                          era: 'modern',
                          kind: 'os',
                          summary: 'A single continuously updated release.',
                          children: [
                            {
                              id: 'windows-11',
                              name: 'Windows 11',
                              year: 2021,
                              era: 'modern',
                              kind: 'os',
                              summary: 'The current release, with a Linux subsystem and tighter hardware requirements.',
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
      id: 'other-os',
      name: 'Other Lines',
      era: 'personal',
      kind: 'group',
      summary: 'Systems that mattered on their own terms, whether or not they survived.',
      children: [
        {
          id: 'vms',
          name: 'VMS',
          year: 1977,
          era: 'network',
          kind: 'os',
          origin: 'USA',
          summary:
            'The operating system of the DEC VAX, still remembered for clustering and uptime. Its architect went on to write Windows NT.',
        },
        {
          id: 'mac-system-1',
          name: 'Macintosh System 1',
          year: 1984,
          era: 'personal',
          kind: 'os',
          origin: 'USA',
          summary:
            'The system that took the graphical interface, the trash can, and the desktop mainstream. It fitted on a 400 KB floppy.',
          children: [
            {
              id: 'mac-os-9',
              name: 'Mac OS 9',
              year: 1999,
              era: 'modern',
              kind: 'os',
              summary: 'The last classic Mac OS, still without memory protection or pre-emption.',
            },
          ],
        },
        {
          id: 'amiga-os',
          name: 'AmigaOS',
          year: 1985,
          era: 'personal',
          kind: 'os',
          summary:
            'One of the first to bring pre-emptive multitasking to a personal computer, in 256 KB of memory.',
        },
        {
          id: 'beos',
          name: 'BeOS',
          year: 1995,
          era: 'modern',
          kind: 'os',
          summary:
            'Designed from scratch for multiprocessing and multimedia. It never found a commercial foothold.',
        },
        {
          id: 'qnx',
          name: 'QNX',
          year: 1982,
          era: 'network',
          kind: 'os',
          origin: 'Canada',
          summary:
            'A real time microkernel, widely used in car infotainment systems and medical devices.',
        },
      ],
    },
  ],
}
