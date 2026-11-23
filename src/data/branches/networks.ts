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
          children: [
            {
              id: 'smtp',
              name: 'SMTP',
              year: 1982,
              era: 'network',
              kind: 'network',
              origin: 'USA',
              summary:
                'The protocol mail servers still use to hand messages to each other, specified by Jon Postel in RFC 821 in August 1982. It built on the mail exchange ARPANET had used since 1971.',
            },
            {
              id: 'imap',
              name: 'IMAP',
              year: 1986,
              era: 'network',
              kind: 'network',
              origin: 'USA',
              summary:
                'Mark Crispin designed it in 1986 so mail could stay on the server and be managed from several clients, where POP only downloaded it. Version 2 became RFC 1064 in 1988, and almost every mail client speaks it today.',
            },
          ],
        },
        {
          id: 'telnet',
          name: 'Telnet',
          year: 1969,
          era: 'network',
          kind: 'network',
          origin: 'USA',
          summary:
            'The first way to log in to a remote computer over ARPANET, proposed by Steve Carr in RFC 15 in September 1969 and standardised as RFC 854 in 1983. It sent everything, passwords included, in plain text, which is why SSH replaced it.',
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
              id: 'ntp',
              name: 'NTP',
              year: 1985,
              era: 'network',
              kind: 'network',
              origin: 'USA',
              summary:
                'David Mills’s protocol for keeping computer clocks in step over a network, published as RFC 958 in 1985. It is one of the oldest internet protocols still in use.',
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
            {
              id: 'gopher',
              name: 'Gopher',
              year: 1991,
              era: 'network',
              kind: 'network',
              origin: 'USA',
              summary:
                'A menu driven system for finding and fetching documents across the internet, released at the University of Minnesota in 1991. It caught on while the web was still new, until the university announced licence fees for its server in 1993.',
            },
            {
              id: 'ipv6',
              name: 'IPv6',
              year: 1995,
              era: 'network',
              kind: 'network',
              summary:
                'The successor to IPv4, first specified in RFC 1883 in December 1995 with 128 bit addresses so the internet would not run out. It became a full Internet Standard in 2017.',
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
              children: [
                {
                  id: 'heartbleed',
                  name: 'Heartbleed',
                  year: 2014,
                  era: 'modern',
                  kind: 'concept',
                  summary:
                    'A missing bounds check in OpenSSL’s TLS heartbeat code that let anyone read a server’s memory, disclosed and fixed on 7 April 2014. Neel Mehta at Google and a team at Codenomicon found it independently.',
                },
                {
                  id: 'lets-encrypt',
                  name: 'Let’s Encrypt',
                  year: 2016,
                  era: 'modern',
                  kind: 'concept',
                  summary:
                    'A free, automated certificate authority run by the nonprofit Internet Security Research Group, out of beta in April 2016. It made HTTPS the default on the web and is now the largest certificate authority in the world.',
                },
                {
                  id: 'tls-1-3',
                  name: 'TLS 1.3',
                  year: 2018,
                  era: 'modern',
                  kind: 'network',
                  summary:
                    'The 2018 revision of TLS, RFC 8446, which cut the handshake to one round trip and dropped old, weak ciphers. It is the version QUIC and HTTP/3 are built on.',
                },
              ],
            },
            {
              id: 'http-2',
              name: 'HTTP/2',
              year: 2015,
              era: 'modern',
              kind: 'network',
              summary: 'Multiplexing and header compression over a single connection.',
              children: [
                {
                  id: 'http-3',
                  name: 'HTTP/3 and QUIC',
                  year: 2022,
                  era: 'modern',
                  kind: 'network',
                  summary:
                    'HTTP carried over QUIC, a transport built on UDP instead of TCP. QUIC became RFC 9000 in May 2021 and HTTP/3 became RFC 9114 in June 2022, the first time the web moved off TCP.',
                },
              ],
            },
            {
              id: 'oauth',
              name: 'OAuth',
              year: 2007,
              era: 'modern',
              kind: 'concept',
              summary:
                'A way to let one site act on your account at another without handing over your password. It began at Twitter in November 2006, OAuth Core 1.0 came out in October 2007, and OAuth 2.0 became RFC 6749 in 2012.',
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
              id: 'pagerank',
              name: 'PageRank',
              year: 1996,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Larry Page and Sergey Brin ranked a page by the number and weight of the links pointing at it. Developed at Stanford in 1996, it was the first ranking algorithm Google used.',
            },
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
