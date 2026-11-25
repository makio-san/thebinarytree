import type { ComputerDatum } from '../types'

/**
 * Data: how it was organised before anyone called it a database, how the
 * relational model settled the question for thirty years, and how scale
 * unsettled it again.
 */
export const dataStores: ComputerDatum = {
  id: 'data',
  name: 'Data and Databases',
  era: 'integrated',
  kind: 'group',
  summary:
    'Storing data is easy; finding it again is the problem. The relational model answered it for thirty years, and scale reopened the question.',
  children: [
    {
      id: 'pre-relational',
      name: 'Before the Relational Model',
      era: 'integrated',
      kind: 'group',
      summary: 'Structures where the access path was part of the data.',
      children: [
        {
          id: 'file-processing',
          name: 'Sequential File Processing',
          year: 1955,
          era: 'transistor',
          kind: 'concept',
          summary:
            'Sort the tape, read it once, write a new tape. Every report was a batch job, and the order of the file was the index.',
        },
        {
          id: 'isam',
          name: 'ISAM',
          year: 1966,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Indexed sequential access on disk: read a record by key without scanning. The first practical random access to business data.',
          children: [
            {
              id: 'b-tree',
              name: 'B-tree',
              year: 1970,
              era: 'integrated',
              kind: 'concept',
              origin: 'USA',
              summary:
                'A balanced tree whose nodes hold many keys each, so a large sorted index stays shallow and a key is found in a few disk reads. Rudolf Bayer and Edward McCreight invented it at Boeing Research Labs and first circulated the paper in July 1970.',
            },
            {
              id: 'lsm-tree',
              name: 'Log-Structured Merge-Tree',
              year: 1996,
              era: 'modern',
              kind: 'concept',
              summary:
                'An index that takes new records in memory and merges them to disk in batches, written sequentially. Patrick O’Neil and three colleagues described it in 1996 for files with a very high volume of inserts.',
            },
          ],
        },
        {
          id: 'ims',
          name: 'IBM IMS',
          year: 1968,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Built for the Apollo programme’s parts list. A hierarchical database where a query had to follow the tree the designer chose, and still runs in banks today.',
          facts: ['Written for Apollo bill-of-materials tracking'],
        },
        {
          id: 'codasyl',
          name: 'CODASYL Network Model',
          year: 1969,
          era: 'integrated',
          kind: 'concept',
          summary:
            'Records linked by explicit sets, so a record could have several parents. More flexible than a hierarchy, but the program still navigated pointer by pointer.',
        },
        {
          id: 'mumps',
          name: 'MUMPS',
          year: 1966,
          era: 'integrated',
          kind: 'language',
          origin: 'USA',
          summary:
            'A language with a hierarchical database built into it, written at Massachusetts General Hospital. Much of the world’s medical record software still sits on it.',
        },
      ],
    },
    {
      id: 'relational',
      name: 'The Relational Model',
      era: 'network',
      kind: 'group',
      summary: 'Say what you want, not how to find it.',
      children: [
        {
          id: 'codd-model',
          name: 'Codd’s Relational Model',
          year: 1970,
          era: 'network',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Edgar Codd proposed storing data as relations and querying it with algebra, so the physical layout became the system’s problem rather than the programmer’s. The most consequential paper in data management.',
          facts: ['Data independence: the query survives a change of storage'],
          children: [
            {
              id: 'system-r',
              name: 'IBM System R',
              year: 1974,
              era: 'network',
              kind: 'concept',
              origin: 'USA',
              summary:
                'The research prototype that proved a relational system could be fast. SQL, the cost-based optimiser and transaction logging all came out of it.',
              children: [
                {
                  id: 'db2',
                  name: 'IBM Db2',
                  year: 1983,
                  era: 'micro',
                  kind: 'concept',
                  origin: 'USA',
                  summary: 'System R turned into a product for the mainframe.',
                },
              ],
            },
            {
              id: 'ingres',
              name: 'Ingres',
              year: 1974,
              era: 'network',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Berkeley’s relational system, developed in the open. Its code and its people seeded much of the industry.',
              children: [
                {
                  id: 'postgres',
                  name: 'PostgreSQL',
                  year: 1996,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'The successor to Ingres, extensible by design. Now the default choice for a general purpose relational database.',
                },
                {
                  id: 'sybase',
                  name: 'Sybase',
                  year: 1987,
                  era: 'micro',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'Client-server relational database. Microsoft licensed its code, which became SQL Server.',
                  children: [
                    {
                      id: 'sql-server',
                      name: 'Microsoft SQL Server',
                      year: 1989,
                      era: 'micro',
                      kind: 'concept',
                      origin: 'USA',
                      summary: 'The Sybase engine on OS/2, and later the Windows database.',
                    },
                  ],
                },
              ],
            },
            {
              id: 'oracle-db',
              name: 'Oracle Database',
              year: 1979,
              era: 'micro',
              kind: 'concept',
              origin: 'USA',
              summary:
                'The first commercially successful SQL database, built from Codd’s papers and System R’s published design.',
            },
            {
              id: 'acid',
              name: 'ACID Transactions',
              year: 1983,
              era: 'micro',
              kind: 'concept',
              summary:
                'Atomicity, consistency, isolation, durability: the guarantee that a half-finished change never becomes visible. What makes a database trustworthy rather than merely fast.',
            },
          ],
        },
        {
          id: 'mysql',
          name: 'MySQL',
          year: 1995,
          era: 'modern',
          kind: 'concept',
          origin: 'Sweden',
          summary:
            'Fast, simple and free. It carried the first generation of database-backed websites.',
        },
        {
          id: 'sqlite',
          name: 'SQLite',
          year: 2000,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A relational database as a library writing to one file, with no server. Probably the most widely deployed database engine in existence: it ships inside phones, browsers and aircraft.',
          facts: ['Public domain', 'Tested to a level closer to avionics than to typical software'],
        },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics and Warehousing',
      era: 'modern',
      kind: 'group',
      summary: 'Separating the questions you ask from the transactions you record.',
      children: [
        {
          id: 'data-warehouse',
          name: 'Data Warehouse',
          year: 1988,
          era: 'micro',
          kind: 'concept',
          summary:
            'A separate copy of the data, restructured for asking questions. Reporting queries and live transactions want opposite things from a layout.',
        },
        {
          id: 'olap',
          name: 'OLAP',
          year: 1993,
          era: 'modern',
          kind: 'concept',
          summary: 'Precomputed aggregates across dimensions, so a summary is a lookup.',
        },
        {
          id: 'column-store',
          name: 'Column Stores',
          year: 2005,
          era: 'modern',
          kind: 'concept',
          summary:
            'Store a table by column rather than by row. An analytic query touches a few columns of many rows, and this makes that read sequential.',
          children: [
            {
              id: 'parquet',
              name: 'Apache Parquet',
              year: 2013,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                "An open columnar file format begun jointly by Twitter and Cloudera on the record shredding scheme of Google's Dremel paper. Version 1.0 came out in July 2013, and it became a top level Apache project in 2015.",
            },
            {
              id: 'duckdb',
              name: 'DuckDB',
              year: 2019,
              era: 'modern',
              kind: 'concept',
              origin: 'Netherlands',
              summary:
                'An embedded column store for analytical queries, built at CWI in Amsterdam and presented in 2019. It does for analysis what SQLite did for small transactional databases: a whole database in one library, no server.',
            },
          ],
        },
        {
          id: 'mapreduce',
          name: 'MapReduce',
          year: 2004,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A pattern for computing over data spread across thousands of unreliable machines, where failure is normal rather than exceptional.',
          children: [
            {
              id: 'hadoop',
              name: 'Hadoop',
              year: 2006,
              era: 'modern',
              kind: 'concept',
              summary: 'The open implementation, and the start of the industry around big data.',
            },
            {
              id: 'spark',
              name: 'Apache Spark',
              year: 2014,
              era: 'modern',
              kind: 'concept',
              origin: 'USA',
              summary:
                'Kept intermediate results in memory instead of writing them to disk between stages, which made iterative work practical.',
            },
          ],
        },
        {
          id: 'apache-kafka',
          name: 'Apache Kafka',
          year: 2011,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'A distributed log for streams of events, open sourced by LinkedIn in January 2011 and later an Apache project. It made processing data as it arrives, rather than in nightly batches, a normal part of company infrastructure.',
        },
      ],
    },
    {
      id: 'nosql',
      name: 'Giving Up Guarantees for Scale',
      era: 'modern',
      kind: 'group',
      summary:
        'When one machine is not enough, something has to give. These systems chose which guarantee to drop.',
      children: [
        {
          id: 'cap-theorem',
          name: 'CAP Theorem',
          year: 2000,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'When the network partitions, a distributed store must choose between staying consistent and staying available. Not a limitation of engineering but of the situation.',
        },
        {
          id: 'bigtable',
          name: 'Bigtable',
          year: 2006,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Google’s sparse, sorted, distributed map. It dropped the relational model to get linear scaling and a predictable layout.',
          children: [
            {
              id: 'hbase',
              name: 'HBase',
              year: 2008,
              era: 'modern',
              kind: 'concept',
              summary: 'The open reimplementation of Bigtable on Hadoop.',
            },
          ],
        },
        {
          id: 'dynamo',
          name: 'Amazon Dynamo',
          year: 2007,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Chose availability over consistency, with conflicts resolved after the fact. Written because a shopping cart must accept a write even when part of the system is down.',
          children: [
            {
              id: 'cassandra',
              name: 'Apache Cassandra',
              year: 2008,
              era: 'modern',
              kind: 'concept',
              summary: 'Dynamo’s replication with Bigtable’s data model.',
            },
            {
              id: 'dynamodb',
              name: 'DynamoDB',
              year: 2012,
              era: 'modern',
              kind: 'concept',
              summary: 'The managed service version, sold by the request rather than the server.',
            },
            {
              id: 'crdt',
              name: 'Conflict-Free Replicated Data Types',
              year: 2011,
              era: 'modern',
              kind: 'concept',
              summary:
                'Data structures that every replica can update on its own and that merge without coordination, so all copies end up the same. Formally defined in 2011 by Marc Shapiro, Nuno Preguiça, Carlos Baquero and Marek Zawirski, with collaborative text editing as an early motive.',
            },
          ],
        },
        {
          id: 'memcached',
          name: 'Memcached',
          year: 2003,
          era: 'modern',
          kind: 'concept',
          summary:
            'A distributed cache in front of the database. The cheapest way to make a busy site fast, and the reason many databases never had to scale.',
          children: [
            {
              id: 'redis',
              name: 'Redis',
              year: 2009,
              era: 'modern',
              kind: 'concept',
              origin: 'Italy',
              summary:
                'An in-memory store with real data structures rather than just strings, which made it a queue and a lock service as well as a cache.',
            },
          ],
        },
        {
          id: 'mongodb',
          name: 'MongoDB',
          year: 2009,
          era: 'modern',
          kind: 'concept',
          summary:
            'Documents instead of rows, so the stored shape matches the object in the program. Popular for exactly that reason and criticised for the same one.',
        },
        {
          id: 'elasticsearch',
          name: 'Elasticsearch',
          year: 2010,
          era: 'modern',
          kind: 'concept',
          origin: 'Netherlands',
          summary:
            'A distributed search index built on Lucene. Full text search became something you could add to anything.',
        },
        {
          id: 'newsql',
          name: 'Distributed SQL',
          year: 2012,
          era: 'modern',
          kind: 'concept',
          summary:
            'Google Spanner and its successors took the guarantees back, using synchronised clocks to get global transactions. The relational model returning at scale.',
        },
      ],
    },
  ],
}
