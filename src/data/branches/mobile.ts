import type { ComputerDatum } from '../types'

/**
 * Portable and mobile computing, from the Dynabook sketch to the watch.
 */
export const mobile: ComputerDatum = {
  id: 'mobile',
  name: 'Portable and Mobile',
  era: 'mobile',
  kind: 'group',
  summary:
    'The computer moving from the desk to the bag, and from the bag to the pocket. Alan Kay described it in 1972; it arrived thirty five years later.',
  children: [
    {
      id: 'dynabook',
      name: 'Dynabook',
      year: 1972,
      era: 'mobile',
      kind: 'concept',
      origin: 'USA',
      summary:
        'Alan Kay’s description of a thin, wireless, touch driven personal computer a child could carry. Never built, but the target for every portable device since.',
      facts: ['The first full description of the tablet'],
    },
    {
      id: 'portables',
      name: 'Portable Computers',
      era: 'mobile',
      kind: 'group',
      summary: 'Heavy but movable, and then genuinely light.',
      children: [
        {
          id: 'ibm-5100',
          name: 'IBM 5100',
          year: 1975,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary: 'A 25 kilogram portable computer with a screen and tape storage.',
        },
        {
          id: 'osborne-1',
          name: 'Osborne 1',
          year: 1981,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first commercially successful portable: 11 kilograms, a 5 inch screen, and the shape of a suitcase.',
        },
        {
          id: 'grid-compass',
          name: 'GRiD Compass',
          year: 1982,
          era: 'personal',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first clamshell design, with the lid as the screen. NASA flew it on the Space Shuttle.',
          children: [
            {
              id: 'toshiba-t1100',
              name: 'Toshiba T1100',
              year: 1985,
              era: 'personal',
              kind: 'machine',
              origin: 'Japan',
              summary:
                'The first mass produced, battery powered, PC compatible laptop, and the start of today’s laptop market.',
            },
            {
              id: 'thinkpad-700c',
              name: 'IBM ThinkPad 700C',
              year: 1992,
              era: 'modern',
              kind: 'machine',
              origin: 'USA / Japan',
              summary:
                'A black box, a red pointing stick, and a colour screen. It became the benchmark for the business laptop.',
            },
          ],
        },
        {
          id: 'netbook',
          name: 'Netbook',
          year: 2007,
          era: 'modern',
          kind: 'machine',
          origin: 'Taiwan',
          summary:
            'The small cheap laptop wave that started with the Asus Eee PC, and disappeared when tablets arrived.',
        },
      ],
    },
    {
      id: 'handhelds',
      name: 'Handhelds',
      era: 'mobile',
      kind: 'group',
      summary: 'Pocket devices for notes and appointments.',
      children: [
        {
          id: 'psion-organiser',
          name: 'Psion Organiser',
          year: 1984,
          era: 'mobile',
          kind: 'device',
          origin: 'England',
          summary: 'Counted as the first commercial handheld computer: a programmable diary.',
          children: [
            {
              id: 'psion-series-5',
              name: 'Psion Series 5',
              year: 1997,
              era: 'mobile',
              kind: 'device',
              origin: 'England',
              summary:
                'A sliding real keyboard and the EPOC operating system made it the best handheld of its time.',
              children: [
                {
                  id: 'symbian',
                  name: 'Symbian',
                  year: 1998,
                  era: 'mobile',
                  kind: 'os',
                  origin: 'England',
                  summary:
                    'Grown out of EPOC, the first widespread smartphone operating system. It dominated the market in the mid 2000s.',
                },
              ],
            },
          ],
        },
        {
          id: 'newton',
          name: 'Apple Newton MessagePad',
          year: 1993,
          era: 'mobile',
          kind: 'device',
          origin: 'USA',
          summary:
            'The first mass market device with handwriting recognition. The recognition worked badly enough to be mocked, but it pushed ARM and the PDA idea forward.',
        },
        {
          id: 'palm-pilot',
          name: 'Palm Pilot',
          year: 1996,
          era: 'mobile',
          kind: 'device',
          origin: 'USA',
          summary:
            'A device that did few things well. Graffiti input and desktop synchronisation finally made the PDA sell.',
        },
      ],
    },
    {
      id: 'phones',
      name: 'Phones',
      era: 'mobile',
      kind: 'group',
      summary: 'The telephone turning into a computer.',
      children: [
        {
          id: 'motorola-dynatac',
          name: 'Motorola DynaTAC 8000X',
          year: 1983,
          era: 'mobile',
          kind: 'device',
          origin: 'USA',
          summary: 'The first handheld mobile phone sold: a kilogram, and 30 minutes of talk time.',
        },
        {
          id: 'ibm-simon',
          name: 'IBM Simon',
          year: 1994,
          era: 'mobile',
          kind: 'device',
          origin: 'USA',
          summary:
            'Generally counted as the first smartphone, with a touch screen, fax, and email. It was only sold for six months.',
        },
        {
          id: 'nokia-9000',
          name: 'Nokia 9000 Communicator',
          year: 1996,
          era: 'mobile',
          kind: 'device',
          origin: 'Finland',
          summary:
            'A phone that opened to a keyboard and a wide screen. The first serious attempt at the internet in a pocket.',
          children: [
            {
              id: 'nokia-3310',
              name: 'Nokia 3310',
              year: 2000,
              era: 'mobile',
              kind: 'device',
              origin: 'Finland',
              summary: 'Became an icon for durability and battery life, with over 100 million sold.',
            },
          ],
        },
        {
          id: 'blackberry',
          name: 'BlackBerry',
          year: 1999,
          era: 'mobile',
          kind: 'device',
          origin: 'Canada',
          summary:
            'Push email and a real keyboard. The device that started the habit of checking your pocket at work.',
        },
        {
          id: 'iphone',
          name: 'iPhone',
          year: 2007,
          era: 'modern',
          kind: 'device',
          origin: 'USA',
          summary:
            'A multi-touch screen with no stylus, and a full browser. Handing the keypad over to software rebuilt the whole industry.',
          facts: ['Capacitive multi-touch screen', 'The App Store followed a year later, in 2008'],
          children: [
            {
              id: 'app-store',
              name: 'App Store',
              year: 2008,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Distributing software centrally, in small packages. It changed the economics of software.',
            },
            {
              id: 'htc-dream',
              name: 'HTC Dream',
              year: 2008,
              era: 'modern',
              kind: 'device',
              origin: 'Taiwan',
              summary:
                'The first phone to run Android. The open platform model took most of the market within a few years.',
            },
            {
              id: 'ipad',
              name: 'iPad',
              year: 2010,
              era: 'modern',
              kind: 'device',
              origin: 'USA',
              summary:
                'The closest anyone came to the Dynabook, and the device that actually created the tablet category.',
            },
            {
              id: 'siri',
              name: 'Siri',
              year: 2011,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'A voice assistant spun off from SRI International in 2007, sold as a free iPhone app, bought by Apple in April 2010 and built into the iPhone 4S in October 2011. It made talking to a phone ordinary, and Google Now, Cortana and Alexa followed.',
            },
          ],
        },
      ],
    },
    {
      id: 'wearables',
      name: 'Wearable and Embedded',
      era: 'modern',
      kind: 'group',
      summary: 'Where the computer disappears.',
      children: [
        {
          id: 'ubiquitous-computing',
          name: 'Ubiquitous Computing',
          year: 1988,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Mark Weiser’s idea at PARC: the best technology is the technology you do not notice. The internet of things continues it.',
        },
        {
          id: 'apple-watch',
          name: 'Apple Watch',
          year: 2015,
          era: 'modern',
          kind: 'device',
          origin: 'USA',
          summary: 'The product that took the wrist worn computer mainstream.',
        },
        {
          id: 'apple-vision-pro',
          name: 'Apple Vision Pro',
          year: 2024,
          era: 'modern',
          kind: 'device',
          origin: 'USA',
          summary:
            'A head worn computer driven by eyes and hands instead of controllers, showing the room through cameras. Released in the US in February 2024, and Apple’s first new product category since the Watch.',
        },
        {
          id: 'raspberry-pi',
          name: 'Raspberry Pi',
          year: 2012,
          era: 'modern',
          kind: 'machine',
          origin: 'England',
          summary:
            'A 35 dollar single board computer built to revive programming in schools. The spirit of the BBC Micro, on an ARM processor.',
          facts: ['Over forty million sold'],
        },
        {
          id: 'arduino',
          name: 'Arduino',
          year: 2005,
          era: 'modern',
          kind: 'machine',
          origin: 'Italy',
          summary:
            'An open hardware board so that people who are not electronics engineers can program a microcontroller.',
        },
      ],
    },
  ],
}
