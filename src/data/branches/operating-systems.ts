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
          children: [
            {
              id: 'mvs',
              name: 'MVS',
              year: 1974,
              era: 'micro',
              kind: 'os',
              origin: 'USA',
              summary:
                'Multiple Virtual Storage, IBM’s successor to OS/360 for the System/370, first released in 1974. It became the most used system on IBM mainframes, and by design its programs still run unchanged on z/OS, its descendant through OS/390.',
            },
          ],
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
                  id: 'bourne-shell',
                  name: 'Bourne Shell',
                  year: 1979,
                  era: 'network',
                  kind: 'language',
                  origin: 'USA',
                  summary:
                    'Stephen Bourne’s replacement for the Thompson shell, begun at Bell Labs in 1976 and shipped as the default shell of Version 7 Unix. POSIX sh syntax comes from it, and /bin/sh still points to it or a compatible shell.',
                  children: [
                    {
                      id: 'bash',
                      name: 'Bash',
                      year: 1989,
                      era: 'network',
                      kind: 'language',
                      origin: 'USA',
                      summary:
                        'Brian Fox’s free replacement for the Bourne shell, written for the GNU Project in 1989. Its syntax is a superset of the Bourne shell’s, and it is the default login shell of many Linux distributions.',
                    },
                    {
                      id: 'zsh',
                      name: 'Z Shell',
                      year: 1990,
                      era: 'network',
                      kind: 'language',
                      origin: 'USA',
                      summary:
                        'A Unix shell that keeps most of the Bourne shell’s syntax and adds features from ksh and tcsh, such as programmable completion and extended globbing. Paul Falstad wrote it in 1990 as a student at Princeton, and it is now the default interactive shell of macOS.',
                    },
                  ],
                },
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
                          children: [
                            {
                              id: 'zfs',
                              name: 'ZFS',
                              year: 2005,
                              era: 'modern',
                              kind: 'concept',
                              origin: 'USA',
                              summary:
                                'A file system and volume manager in one, designed at Sun by a team led by Jeff Bonwick, Bill Moore and Matthew Ahrens. It was published as open source with OpenSolaris in 2005, reached Solaris 10 in 2006, and lives on as OpenZFS.',
                              children: [
                                {
                                  id: 'btrfs',
                                  name: 'Btrfs',
                                  year: 2007,
                                  era: 'modern',
                                  kind: 'concept',
                                  summary:
                                    'A copy-on-write file system and volume manager in one, created by Chris Mason in 2007 to give Linux pooling, snapshots and integrity checking. Its on-disk format was declared stable in Linux 3.13 in November 2013.',
                                },
                              ],
                            },
                          ],
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
                              children: [
                                {
                                  id: 'apfs',
                                  name: 'Apple File System',
                                  year: 2017,
                                  era: 'modern',
                                  kind: 'concept',
                                  summary:
                                    'Apple’s replacement for HFS+, built for solid state storage with encryption and snapshots. It arrived on iOS 10.3 on 27 March 2017 and on the Mac with macOS 10.13 on 25 September 2017.',
                                },
                              ],
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
                          id: 'rpm',
                          name: 'RPM Package Manager',
                          year: 1995,
                          era: 'modern',
                          kind: 'concept',
                          summary:
                            'The package format and package manager that Erik Troan and Marc Ewing wrote for Red Hat Linux in 1995. It became the baseline package format of the Linux Standard Base and is used by Fedora, openSUSE, CentOS and many other distributions.',
                        },
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
                          children: [
                            {
                              id: 'flutter',
                              name: 'Flutter',
                              year: 2017,
                              era: 'modern',
                              kind: 'concept',
                              origin: 'USA',
                              summary:
                                'Google’s open source toolkit for building apps for Android, iOS, the web and the desktop from one codebase, with apps written in Dart. First described in 2015 and released in May 2017, it draws every pixel with its own rendering engine.',
                            },
                            {
                              id: 'harmonyos',
                              name: 'HarmonyOS',
                              year: 2019,
                              era: 'modern',
                              kind: 'os',
                              summary:
                                'Huawei’s operating system for phones, tablets, watches, televisions and personal computers. From 2019 to 2024 it was built on the Android Open Source Project together with OpenHarmony, and HarmonyOS NEXT then removed all Android code.',
                            },
                          ],
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
                        {
                          id: 'wayland',
                          name: 'Wayland',
                          year: 2008,
                          era: 'modern',
                          kind: 'os',
                          summary:
                            'A display protocol in which the compositor is the display server, started in 2008 as a simpler and more secure replacement for the X Window System. Fedora and other major distributions now use it by default.',
                        },
                        {
                          id: 'systemd',
                          name: 'systemd',
                          year: 2010,
                          era: 'modern',
                          kind: 'os',
                          summary:
                            'The init system and service manager that runs as process 1 on nearly every Linux distribution since about 2015. It replaced shell script startup and brought logging, devices and logins under one suite.',
                        },
                        {
                          id: 'cgroups',
                          name: 'cgroups',
                          year: 2007,
                          era: 'modern',
                          kind: 'component',
                          origin: 'USA',
                          summary:
                            'The Linux kernel feature that limits, accounts for and isolates the CPU, memory and disk I/O of a group of processes. Engineers at Google began it in 2006 as process containers; it was renamed control groups in late 2007 and merged into kernel 2.6.24, released in January 2008.',
                        },
                        {
                          id: 'io-uring',
                          name: 'io_uring',
                          year: 2019,
                          era: 'modern',
                          kind: 'component',
                          summary:
                            'A Linux interface for asynchronous I/O built on two ring buffers shared between the program and the kernel, one for requests and one for completions. Jens Axboe wrote the design, and it was merged in Linux 5.1 in May 2019 after earlier attempts to fix asynchronous I/O had failed.',
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
                  children: [
                    {
                      id: 'xfs',
                      name: 'XFS',
                      year: 1994,
                      era: 'network',
                      kind: 'concept',
                      summary:
                        'A 64-bit journaling file system that Silicon Graphics created in 1993 and introduced with IRIX 5.3 in 1994. It was released under the GPL in 1999, ported to Linux in 2001, and is the default file system of Red Hat Enterprise Linux.',
                    },
                  ],
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
              id: 'ntfs',
              name: 'NTFS',
              year: 1993,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'The journaling file system that shipped with Windows NT 3.1 and replaced FAT. Over its versions it added access control lists, encryption, compression and shadow copies.',
            },
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
        {
          id: 'fuchsia',
          name: 'Fuchsia',
          year: 2016,
          era: 'modern',
          kind: 'os',
          summary:
            'Google’s open source, capability-based operating system on its own Zircon kernel instead of Linux. The code appeared publicly in August 2016 and it first shipped in 2021 on the first-generation Nest Hub.',
        },
      ],
    },
  ],
}
