import type { ComputerDatum } from '../types'

/**
 * How people got data in and out. Often the part that decided whether a machine
 * was usable at all.
 */
export const peripherals: ComputerDatum = {
  id: 'peripherals',
  name: 'Input, Output, and Storage',
  era: 'personal',
  kind: 'group',
  summary:
    'Whether a machine was usable was usually decided not by its processor but by this layer between it and the person.',
  children: [
    {
      id: 'input-devices',
      name: 'Input Devices',
      era: 'personal',
      kind: 'group',
      summary: 'From the punched card to the touch screen.',
      children: [
        {
          id: 'teletype',
          name: 'Teletype',
          year: 1930,
          era: 'mechanical',
          kind: 'device',
          summary:
            'A keyboard and printer pair inherited from telegraphy. The first computer terminals were these, and the name tty comes from them.',
        },
        {
          id: 'light-pen',
          name: 'Light Pen',
          year: 1955,
          era: 'transistor',
          kind: 'device',
          origin: 'USA',
          summary:
            'The first way to point at a position by touching the screen directly, used on Whirlwind and in Sketchpad.',
        },
        {
          id: 'mouse',
          name: 'Mouse',
          year: 1964,
          era: 'integrated',
          kind: 'device',
          origin: 'USA',
          summary:
            'Douglas Engelbart and Bill English built it from two wheels in a wooden box. It turned out to be the most practical way to map hand motion onto the screen.',
          facts: ['The 1968 demonstration is remembered as "The Mother of All Demos"'],
          children: [
            {
              id: 'optical-mouse',
              name: 'Optical Mouse',
              year: 1999,
              era: 'modern',
              kind: 'device',
              summary: 'An image sensor replaced the ball, and the mouse stopped needing cleaning.',
            },
          ],
        },
        {
          id: 'trackpad',
          name: 'Trackpad',
          year: 1994,
          era: 'modern',
          kind: 'device',
          summary:
            'The surface that made the mouse unnecessary on a laptop, and the primary pointing device once it learned multi-finger gestures.',
        },
        {
          id: 'touchscreen',
          name: 'Touch Screen',
          year: 1965,
          era: 'integrated',
          kind: 'device',
          origin: 'England',
          summary:
            'E. A. Johnson’s work on the capacitive touch screen. Forty years later it became the main interface of the phone.',
          children: [
            {
              id: 'multi-touch',
              name: 'Multi-touch',
              year: 1984,
              era: 'modern',
              kind: 'device',
              summary:
                'Surfaces that track more than one finger at once, making pinch and spread possible.',
            },
          ],
        },
        {
          id: 'barcode',
          name: 'Barcode',
          year: 1974,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The first widespread way of tying a physical object to a database record. The first item scanned was a pack of chewing gum.',
        },
      ],
    },
    {
      id: 'displays',
      name: 'Display and Output',
      era: 'personal',
      kind: 'group',
      summary: 'Ways of seeing the result.',
      children: [
        {
          id: 'crt-display',
          name: 'Cathode Ray Tube',
          year: 1951,
          era: 'tube',
          kind: 'device',
          summary:
            'The display technology that arrived with Whirlwind, and stayed the standard for fifty years.',
        },
        {
          id: 'bitmap-display',
          name: 'Bitmapped Display',
          year: 1973,
          era: 'personal',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Every screen dot backed by a bit in memory. First done on the Alto; the graphical interface is impossible without it.',
        },
        {
          id: 'lcd-display',
          name: 'LCD Display',
          year: 1971,
          era: 'micro',
          kind: 'device',
          summary:
            'The liquid crystal display started in calculators and watches and made the laptop and the phone portable.',
        },
        {
          id: 'laser-printer',
          name: 'Laser Printer',
          year: 1971,
          era: 'micro',
          kind: 'device',
          origin: 'USA',
          summary:
            'Gary Starkweather developed it at Xerox. Desktop publishing, where the page matches the screen, became possible with it.',
          children: [
            {
              id: 'postscript',
              name: 'PostScript',
              year: 1984,
              era: 'micro',
              kind: 'language',
              origin: 'USA',
              summary:
                'A language that describes a page as drawing commands. Device independent printing, and the ancestor of PDF.',
            },
          ],
        },
      ],
    },
    {
      id: 'storage',
      name: 'Storage',
      era: 'transistor',
      kind: 'group',
      summary: 'Keeping data after the power goes off.',
      children: [
        {
          id: 'punched-tape',
          name: 'Punched Tape',
          year: 1940,
          era: 'mechanical',
          kind: 'component',
          summary: 'Paper tape for programs and data, used from Zuse through to the minicomputers.',
        },
        {
          id: 'magnetic-tape',
          name: 'Magnetic Tape',
          year: 1951,
          era: 'tube',
          kind: 'component',
          summary:
            'Tape arrived with UNIVAC. It is still used for backup and archive, because it is still the cheapest.',
        },
        {
          id: 'hard-disk',
          name: 'Hard Disk',
          year: 1956,
          era: 'transistor',
          kind: 'component',
          origin: 'USA',
          summary:
            'IBM 350 RAMAC: the size of two refrigerators, holding 3.75 MB. The start of random access persistent storage.',
          facts: ['Fifty 24 inch platters for 5 MB', 'Leased for thousands of dollars a month'],
          children: [
            {
              id: 'winchester-drive',
              name: 'Winchester Drive',
              year: 1973,
              era: 'micro',
              kind: 'component',
              origin: 'USA',
              summary:
                'Head and disk sealed into one unit. The direct ancestor of every hard disk since.',
            },
          ],
        },
        {
          id: 'floppy-disk',
          name: 'Floppy Disk',
          year: 1971,
          era: 'micro',
          kind: 'component',
          origin: 'USA',
          summary:
            'Cheap removable magnetic media. It made software something you could sell in a box, and it survives as the save icon.',
          children: [
            {
              id: 'file-allocation-table',
              name: 'File Allocation Table',
              year: 1977,
              era: 'micro',
              kind: 'concept',
              origin: 'USA',
              summary:
                'A simple file system Marc McDonald wrote for floppy disks in a forerunner of Microsoft’s Standalone Disk BASIC. Grown through FAT12, FAT16, FAT32 and exFAT, it still formats most USB drives and SD cards.',
            },
            {
              id: 'floppy-3-5',
              name: '3.5 inch Floppy',
              year: 1982,
              era: 'micro',
              kind: 'component',
              origin: 'Japan',
              summary: 'A hard shell and 1.44 MB. The standard for twenty years.',
            },
          ],
        },
        {
          id: 'cd-rom',
          name: 'CD-ROM',
          year: 1985,
          era: 'micro',
          kind: 'component',
          origin: 'Netherlands / Japan',
          summary:
            '650 MB of optical media. It made multimedia software, encyclopedias, and large games distributable.',
          children: [
            {
              id: 'dvd',
              name: 'DVD',
              year: 1996,
              era: 'modern',
              kind: 'component',
              summary: 'Seven times the capacity in the same size, and the standard for video distribution.',
            },
          ],
        },
        {
          id: 'usb-flash',
          name: 'USB Flash Drive',
          year: 2000,
          era: 'modern',
          kind: 'component',
          summary:
            'Flash memory plus USB. It buried the floppy and optical media within a few years.',
        },
        {
          id: 'ssd',
          name: 'SSD',
          year: 2007,
          era: 'modern',
          kind: 'component',
          summary:
            'Solid state storage with no moving parts. Cutting random access latency a thousandfold changed how fast software feels.',
          children: [
            {
              id: 'nvm-express',
              name: 'NVM Express',
              year: 2011,
              era: 'modern',
              kind: 'component',
              summary:
                'A storage interface designed for flash rather than spinning disks, with many deep command queues over PCI Express. Version 1.0 came out on 1 March 2011, from a working group chaired by Intel’s Amber Huffman.',
            },
          ],
        },
        {
          id: 'raid',
          name: 'RAID',
          year: 1988,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Combining cheap disks for both speed and durability. The basis of data centre storage.',
        },
        {
          id: 'drum-memory',
          name: 'Drum Memory',
          year: 1932,
          era: 'mechanical',
          kind: 'component',
          origin: 'Austria',
          summary:
            'A rotating magnetic cylinder, invented by Gustav Tauschek in 1932. It was main memory for the cheaper, slower computers of the 1950s until core memory took over, then secondary storage until hard disks replaced it.',
        },
      ],
    },
    {
      id: 'interfaces',
      name: 'Interface Ideas',
      era: 'personal',
      kind: 'group',
      summary: 'The design of how we talk to a computer.',
      children: [
        {
          id: 'memex',
          name: 'Memex',
          year: 1945,
          era: 'theory',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Vannevar Bush described a machine holding personal trails between documents. The intellectual root of hypertext.',
        },
        {
          id: 'nls',
          name: 'NLS',
          year: 1968,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Douglas Engelbart’s system: mouse, hypertext, screen sharing, and collaborative editing in one demonstration. A description of forty years later.',
        },
        {
          id: 'wimp',
          name: 'Window, Icon, Menu, Pointer',
          year: 1973,
          era: 'personal',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The four elements of the graphical interface, worked out at PARC. The desktop metaphor is built on them.',
        },
        {
          id: 'hypertext',
          name: 'Hypertext',
          year: 1965,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Ted Nelson’s name for non linear text, and the basic mechanism of the web.',
        },
        {
          id: 'command-line',
          name: 'Command Line',
          year: 1964,
          era: 'integrated',
          kind: 'concept',
          summary:
            'Send text, get text back. Sixty years on it is still one of the most productive interfaces, because it composes.',
        },
      ],
    },
    {
      id: 'buses',
      name: 'Buses and Interconnects',
      era: 'personal',
      kind: 'group',
      summary: 'The slots, lanes and cables that connect a processor to everything else.',
      children: [
        {
          id: 'pci',
          name: 'PCI',
          year: 1992,
          era: 'personal',
          kind: 'component',
          origin: 'USA',
          summary:
            'Intel’s local bus for expansion cards, independent of any one processor’s own bus. It displaced ISA and VESA Local Bus slots in PCs, replaced NuBus in the Power Macintosh, and stayed the standard card slot until PCI Express.',
          children: [
            {
              id: 'pci-express',
              name: 'PCI Express',
              year: 2003,
              era: 'modern',
              kind: 'component',
              summary:
                'PCI rebuilt as serial point to point lanes instead of a shared parallel bus. PCI-SIG published version 1.0a in 2003; it replaced PCI, PCI-X and AGP and now connects graphics cards, network adapters and SSDs.',
              children: [
                {
                  id: 'cxl',
                  name: 'Compute Express Link',
                  year: 2019,
                  era: 'modern',
                  kind: 'component',
                  summary:
                    'A cache coherent link built on the PCI Express physical layer, so processors can share memory with accelerators and reach memory beyond the DIMM slots. Version 1.0 came out in March 2019, the month nine companies including Intel, Google and Microsoft formed its consortium.',
                },
              ],
            },
          ],
        },
        {
          id: 'usb',
          name: 'USB',
          year: 1996,
          era: 'modern',
          kind: 'component',
          origin: 'USA',
          summary:
            'One plug and one protocol for keyboards, mice, printers and drives, with power on the same cable. USB 1.0 came out in January 1996 from seven companies including Intel, Compaq and Microsoft, and replaced serial, parallel and game ports.',
        },
      ],
    },
  ],
}
