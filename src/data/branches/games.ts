import type { ComputerDatum } from '../types'

/**
 * Games and consoles.
 *
 * Not a footnote to the hardware branches. Games drove consumer 3D graphics,
 * which produced the GPU, which is what machine learning now runs on. The line
 * from Spacewar to a datacentre full of accelerators is short and direct.
 */
export const games: ComputerDatum = {
  id: 'games',
  name: 'Games and Consoles',
  era: 'personal',
  kind: 'group',
  summary:
    'Not a footnote. Games drove consumer 3D hardware, which became the GPU, which is what machine learning runs on today.',
  children: [
    {
      id: 'early-games',
      name: 'Before the Industry',
      era: 'transistor',
      kind: 'group',
      summary: 'Games written because a machine was sitting there.',
      children: [
        {
          id: 'nimrod',
          name: 'Nimrod',
          year: 1951,
          era: 'tube',
          kind: 'machine',
          origin: 'England',
          summary:
            'A cabinet built for an exhibition to play the game of Nim. Probably the first machine made specifically to play a game in public.',
        },
        {
          id: 'tennis-for-two',
          name: 'Tennis for Two',
          year: 1958,
          era: 'transistor',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A side-on tennis game with real ball physics on an oscilloscope, built for a laboratory open day.',
        },
        {
          id: 'ohh-mummy',
          name: 'Text Adventures',
          year: 1976,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Colossal Cave Adventure: a world described in prose and navigated by typing. It made the parser a game mechanic and started interactive fiction.',
          children: [
            {
              id: 'zork',
              name: 'Zork',
              year: 1977,
              era: 'network',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Written on a PDP-10, then squeezed onto home machines by compiling to a small virtual machine. Portability solved the way it usually is.',
            },
            {
              id: 'rogue',
              name: 'Rogue',
              year: 1980,
              era: 'micro',
              kind: 'concept',
              origin: 'USA',
              summary:
                'A dungeon generated fresh each time, with permanent death. An entire genre still carries its name.',
            },
          ],
        },
      ],
    },
    {
      id: 'arcade',
      name: 'Arcade',
      era: 'micro',
      kind: 'group',
      summary: 'Purpose built hardware, one game per cabinet.',
      children: [
        {
          id: 'computer-space',
          name: 'Computer Space',
          year: 1971,
          era: 'micro',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first coin-operated video game, built entirely from discrete logic with no processor at all. Too complicated to catch on.',
        },
        {
          id: 'pong',
          name: 'Pong',
          year: 1972,
          era: 'micro',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Also no processor, just logic gates. Simple enough that anyone could play without instructions, which was the whole lesson.',
        },
        {
          id: 'space-invaders',
          name: 'Space Invaders',
          year: 1978,
          era: 'micro',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'Ran on an Intel 8080. The difficulty curve was an accident of the hardware speeding up as sprites were destroyed, and it was kept.',
          facts: ['The speed-up was a hardware limitation that became a design feature'],
        },
        {
          id: 'pac-man',
          name: 'Pac-Man',
          year: 1980,
          era: 'micro',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'Four ghosts with four different pursuit rules, which is why the maze feels like it has intent.',
        },
        {
          id: 'donkey-kong',
          name: 'Donkey Kong',
          year: 1981,
          era: 'micro',
          kind: 'machine',
          origin: 'Japan',
          summary: 'Told a story through screens rather than text, and made the platform game a form.',
        },
      ],
    },
    {
      id: 'consoles',
      name: 'Home Consoles',
      era: 'personal',
      kind: 'group',
      summary: 'A computer sold as a toy, and cheap because it only had to do one thing.',
      children: [
        {
          id: 'odyssey',
          name: 'Magnavox Odyssey',
          year: 1972,
          era: 'micro',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first home console. No processor and no sound; plastic overlays taped to the television supplied the graphics.',
        },
        {
          id: 'atari-2600',
          name: 'Atari 2600',
          year: 1977,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'A 6507 with 128 bytes of RAM and no frame buffer: the program had to draw each scanline as the beam passed. Interchangeable cartridges created the software market.',
          facts: ['128 bytes of RAM', 'Graphics were generated in step with the electron beam'],
          children: [
            {
              id: 'video-game-crash',
              name: 'The 1983 Crash',
              year: 1983,
              era: 'personal',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Unchecked cartridge quality collapsed consumer trust and the North American market with it. Every console since has controlled what may be published on it.',
            },
          ],
        },
        {
          id: 'nes',
          name: 'Nintendo Entertainment System',
          year: 1983,
          era: 'personal',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'Rebuilt the market after the crash with a licensing lockout chip and a dedicated graphics processor. 6502 derived, with hardware scrolling and sprites.',
          children: [
            {
              id: 'game-boy',
              name: 'Game Boy',
              year: 1989,
              era: 'micro',
              kind: 'machine',
              origin: 'Japan',
              summary:
                'Beat colour rivals with battery life and a huge library. Deliberately weaker hardware, and it outsold everything.',
            },
            {
              id: 'snes',
              name: 'Super Nintendo',
              year: 1990,
              era: 'modern',
              kind: 'machine',
              origin: 'Japan',
              summary:
                'A 65C816 with hardware sprite rotation and scaling. Cartridges could add chips of their own, including one for 3D.',
            },
          ],
        },
        {
          id: 'mega-drive',
          name: 'Sega Mega Drive',
          year: 1988,
          era: 'micro',
          kind: 'machine',
          origin: 'Japan',
          summary: 'A 68000 at home, and the console that made speed a selling point.',
        },
        {
          id: 'playstation',
          name: 'Sony PlayStation',
          year: 1994,
          era: 'modern',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'MIPS based, with hardware 3D and a CD drive. It moved games from sprites to polygons and from cartridges to discs in one step.',
          children: [
            {
              id: 'playstation-2',
              name: 'PlayStation 2',
              year: 2000,
              era: 'modern',
              kind: 'machine',
              origin: 'Japan',
              summary:
                'The best selling console ever made, and a DVD player, which is how it entered many homes.',
            },
          ],
        },
        {
          id: 'xbox',
          name: 'Microsoft Xbox',
          year: 2001,
          era: 'modern',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Essentially a PC in a box: x86, an NVIDIA chip, and a hard disk. It brought online play with it as standard.',
        },
        {
          id: 'switch',
          name: 'Nintendo Switch',
          year: 2017,
          era: 'modern',
          kind: 'machine',
          origin: 'Japan',
          summary:
            'An ARM tablet that docks to a television, ending the split between handheld and console.',
        },
      ],
    },
    {
      id: 'game-tech',
      name: 'Techniques and Engines',
      era: 'modern',
      kind: 'group',
      summary: 'What games had to invent, which everything else then borrowed.',
      children: [
        {
          id: 'sprite',
          name: 'Hardware Sprites',
          year: 1977,
          era: 'personal',
          kind: 'concept',
          summary:
            'Movable images composited by the display hardware, not the processor. It is how 8 bit machines animated anything at all.',
        },
        {
          id: 'scanline-racing',
          name: 'Racing the Beam',
          year: 1977,
          era: 'personal',
          kind: 'concept',
          summary:
            'With no memory for a frame buffer, the program changed registers as the electron beam swept. Programming in step with a moving physical process.',
        },
        {
          id: 'wolfenstein-3d',
          name: 'Ray Casting',
          year: 1992,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Wolfenstein 3D faked 3D by casting one ray per screen column through a 2D map. Fast enough on a 386, and it looked like a room.',
          children: [
            {
              id: 'doom',
              name: 'Doom',
              year: 1993,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Binary space partitioning to decide what to draw, and network play. Distributed as shareware, which is how it got everywhere.',
              children: [
                {
                  id: 'quake',
                  name: 'Quake',
                  year: 1996,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'True polygonal 3D with a client-server network model. It created the market for 3D accelerator cards.',
                },
              ],
            },
          ],
        },
        {
          id: 'opengl',
          name: 'OpenGL',
          year: 1992,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A vendor neutral 3D API from SGI’s IRIS GL. It let one program address any graphics card.',
          children: [
            {
              id: 'direct3d',
              name: 'Direct3D',
              year: 1996,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary: 'Microsoft’s answer, and the API most PC games actually shipped against.',
            },
            {
              id: 'webgl',
              name: 'WebGL',
              year: 2011,
              era: 'modern',
              kind: 'concept',
              summary:
                'OpenGL ES in the browser, with no plugin. It is what draws the tree you are looking at.',
            },
            {
              id: 'vulkan',
              name: 'Vulkan',
              year: 2016,
              era: 'modern',
              kind: 'concept',
              summary:
                'A deliberately low level replacement: more work for the programmer, in exchange for the driver not guessing.',
            },
          ],
        },
        {
          id: 'shader',
          name: 'Programmable Shaders',
          year: 2001,
          era: 'modern',
          kind: 'concept',
          summary:
            'Replace the fixed pipeline with small programs run per vertex and per pixel. The step that turned a graphics card into a general parallel processor.',
        },
        {
          id: 'game-engine',
          name: 'Game Engines',
          year: 1998,
          era: 'modern',
          kind: 'concept',
          summary:
            'Unreal and its successors separated the engine from the game, so most studios stopped writing renderers. Now used for film and architecture too.',
        },
      ],
    },
  ],
}
