import type { ComputerDatum } from '../types'

/**
 * Networks. The branch where computing stops being about a machine and starts
 * being about the space between machines.
 */
export const networks: ComputerDatum = {
  id: 'networks',
  name: 'Networks and the Internet',
  era: 'network',
  kind: 'group',
  summary:
    'Where computing stops being about a machine and starts being about the space between machines. From packet switching to the web.',
  children: [
    {
      id: 'packet-switching',
      name: 'Packet Switching',
      era: 'network',
      kind: 'group',
      summary: 'Sending data as independent pieces rather than over a continuous circuit.',
      children: [
        {
          id: 'baran-davies',
          name: 'The Packet Switching Idea',
          year: 1964,
          era: 'network',
          kind: 'concept',
          summary:
            'Paul Baran arrived at it in the US for survivability, Donald Davies in Britain for efficiency, independently. The word "packet" is Davies’s.',
        },
        {
          id: 'queueing-theory',
          name: 'Network Queueing Theory',
          year: 1961,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Leonard Kleinrock modelled delay and queueing in data networks, giving packet networks their mathematical basis.',
        },
      ],
    },
    {
      id: 'arpanet',
      name: 'ARPANET',
      year: 1969,
      era: 'network',
      kind: 'network',
      origin: 'USA',
      summary:
        'The first packet switched network, between four universities. The first thing transmitted was "LO", because the system crashed partway through "LOGIN".',
      facts: ['First four nodes: UCLA, SRI, UCSB, Utah', 'Interface Message Processors as the network layer'],
      children: [
        {
          id: 'email',
          name: 'Email',
          year: 1971,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Ray Tomlinson got messages working between machines over the network, and picked the @ sign to separate user from host.',
        },
        {
          id: 'tcp-ip',
          name: 'TCP/IP',
          year: 1974,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'Vint Cerf and Bob Kahn’s protocol family for joining dissimilar networks. The network is dumb and the intelligence sits at the edges: that is how the internet works.',
          facts: ['ARPANET moved fully to TCP/IP in 1983', 'The end to end principle'],
          children: [
            {
              id: 'dns',
              name: 'DNS',
              year: 1983,
              era: 'network',
              kind: 'network',
              origin: 'USA',
              summary:
                'A distributed naming system, built once a single hand maintained host list stopped scaling.',
            },
            {
              id: 'nsfnet',
              name: 'NSFNET',
              year: 1985,
              era: 'network',
              kind: 'network',
              origin: 'USA',
              summary:
                'The backbone connecting universities. It replaced ARPANET and set up the transition to a commercial internet.',
            },
            {
              id: 'bgp',
              name: 'BGP',
              year: 1989,
              era: 'network',
              kind: 'network',
              summary:
                'The protocol by which independent networks announce routes to each other, and the routing backbone of the internet today.',
            },
          ],
        },
      ],
    },
    {
      id: 'local-networks',
      name: 'Local Networks',
      era: 'network',
      kind: 'group',
      summary: 'Connecting machines inside one building.',
      children: [
        {
          id: 'ethernet',
          name: 'Ethernet',
          year: 1973,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'Robert Metcalfe and David Boggs developed it at Xerox PARC. Rather than preventing collisions it detects them and retries, which turned out to be the practical answer.',
          facts: ['First rate 2.94 Mbit/s', '400 Gbit/s versions exist today'],
        },
        {
          id: 'token-ring',
          name: 'Token Ring',
          year: 1985,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'IBM’s ring topology local network. More predictable, but it could not withstand Ethernet’s price.',
        },
        {
          id: 'wifi',
          name: 'Wi-Fi',
          year: 1997,
          era: 'modern',
          kind: 'network',
          summary:
            'The 802.11 standard made wireless local networking uniform. Laptops and phones being genuinely portable depends on it.',
        },
        {
          id: 'bluetooth',
          name: 'Bluetooth',
          year: 1998,
          era: 'modern',
          kind: 'network',
          origin: 'Sweden',
          summary: 'A short range personal area standard, named after a Danish king.',
        },
      ],
    },
    {
      id: 'web',
      name: 'World Wide Web',
      year: 1989,
      era: 'modern',
      kind: 'network',
      origin: 'Switzerland / England',
      summary:
        'Tim Berners-Lee designed HTTP, HTML, and the URL at CERN to link documents. Releasing it royalty free in 1993 is the real reason it spread.',
      facts: ['The first server ran on a NeXT machine', 'Placed in the public domain in 1993'],
      children: [
        {
          id: 'mosaic',
          name: 'NCSA Mosaic',
          year: 1993,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The browser that showed text and images in the same window, and took the web out of specialist hands.',
          children: [
            {
              id: 'netscape',
              name: 'Netscape Navigator',
              year: 1994,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'The browser that commercialised the web. Cookies, SSL, and JavaScript all came from it.',
              children: [
                {
                  id: 'mozilla-firefox',
                  name: 'Mozilla Firefox',
                  year: 2004,
                  era: 'modern',
                  kind: 'concept',
                  summary:
                    'Grew out of the open sourcing of the Netscape code, and restarted browser competition.',
                },
              ],
            },
            {
              id: 'internet-explorer',
              name: 'Internet Explorer',
              year: 1995,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Bundling it with Windows took nearly the whole market, and led to a major antitrust case.',
            },
          ],
        },
        {
          id: 'http-1-1',
          name: 'HTTP/1.1',
          year: 1997,
          era: 'modern',
          kind: 'network',
          summary:
            'Persistent connections and virtual hosting. The transport of the web for twenty years.',
          children: [
            {
              id: 'tls',
              name: 'TLS / HTTPS',
              year: 1999,
              era: 'modern',
              kind: 'network',
              summary:
                'Netscape’s SSL became a standard, and encrypted connections are now the default.',
            },
            {
              id: 'http-2',
              name: 'HTTP/2',
              year: 2015,
              era: 'modern',
              kind: 'network',
              summary: 'Multiplexing and header compression over a single connection.',
            },
          ],
        },
        {
          id: 'search-engines',
          name: 'Search Engines',
          year: 1998,
          era: 'modern',
          kind: 'concept',
          summary:
            'Using link structure as a ranking signal moved the web from browsable to searchable.',
          children: [
            {
              id: 'chrome',
              name: 'Google Chrome',
              year: 2008,
              era: 'modern',
              kind: 'concept',
              summary:
                'A browser running each tab in its own process, with the fast V8 JavaScript engine. It made web applications competitive with desktop software.',
            },
          ],
        },
      ],
    },
    {
      id: 'online-services',
      name: 'Online Services and Cloud',
      era: 'modern',
      kind: 'group',
      summary: 'Computation moving off your own machine and onto rented ones.',
      children: [
        {
          id: 'usenet',
          name: 'Usenet',
          year: 1980,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'A distributed discussion network with no central server, and the first large example of online community culture.',
        },
        {
          id: 'bbs',
          name: 'BBS',
          year: 1978,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'Bulletin boards running on a single machine, reached by dialling in. Online life before the internet.',
        },
        {
          id: 'aws',
          name: 'Amazon Web Services',
          year: 2006,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'S3 and EC2 made a server something you rent by the hour, and cloud computing became an industry.',
          children: [
            {
              id: 'docker',
              name: 'Docker',
              year: 2013,
              era: 'modern',
              kind: 'concept',
              summary:
                'Packaged the Linux kernel’s isolation features into something usable: shipping an application with its dependencies.',
              children: [
                {
                  id: 'kubernetes',
                  name: 'Kubernetes',
                  year: 2014,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'A container orchestrator derived from Google’s internal systems, and now the standard way to run distributed applications.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
