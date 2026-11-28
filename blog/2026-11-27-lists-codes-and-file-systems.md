---
title: Lists, codes and file systems
date: 2026-11-27
summary: Since 26 November the tree grew from 1,082 to 1,114 nodes, with the hash table and the linked list, two families of error correcting codes, new file systems and stores, and a run of hardware security.
---

Since the last post, on 26 November, 32 nodes have reached the tree, and it now has 1,114 across 20 lineages. Nothing was removed. Several of the new nodes are among the oldest ideas in computing, and a run of others is about storage and hardware security.

## The oldest new nodes

The theoretical foundations gained four basic structures and one algorithm. The [Simplex Algorithm](node:simplex-algorithm) took shape in mid 1947, when George Dantzig was planning for the US Army Air Force. The [Hash Table](node:hash-table) goes back to an internal IBM memorandum by Hans Peter Luhn in January 1953. The [Linked List](node:linked-list) was built in 1955 and 1956 by Allen Newell, Cliff Shaw and Herbert Simon for their Information Processing Language. Its child, the [Skip List](node:skip-list), came from William Pugh in 1989 and gets balanced tree performance from random shortcut links.

Two families of error correcting codes arrived together. [LDPC Codes](node:ldpc) come from Robert Gallager's 1960 dissertation at MIT. They were set aside for decades because decoding cost too much, and came back in the mid 1990s. [Turbo Codes](node:turbo-code) from 1993 were the first practical codes to come close to the Shannon limit, and 3G and 4G networks use them.

## Where data rests

Seven nodes about storing data joined the data and operating system branches. The [Google File System](node:google-file-system) from 2003 kept every chunk on three cheap machines. [XFS](node:xfs) came from Silicon Graphics in 1994 and is now the default on Red Hat Enterprise Linux. The [Apple File System](node:apfs) replaced HFS+ in 2017. Next to them are [LevelDB](node:leveldb) by Jeff Dean and Sanjay Ghemawat, [ClickHouse](node:clickhouse) from Yandex, [Apache Arrow](node:apache-arrow) for tables in memory, and [Valkey](node:valkey), the BSD licensed fork of Redis from March 2024.

## Trust in hardware

Four nodes deal with what a machine can be trusted to keep secret. The [Trusted Platform Module](node:tpm) was first deployed in 2003. [Intel SGX](node:intel-sgx) arrived with Skylake in 2015 and keeps enclaves that even the operating system cannot read. [Rowhammer](node:rowhammer) showed in 2014 that reading the same DRAM rows over and over flips bits next to them. [Fully Homomorphic Encryption](node:homomorphic-encryption) lets a computer calculate on data it cannot read, a problem posed in 1978 and first plausibly solved by Craig Gentry in 2009.

## The rest

- [Neural Radiance Field](node:nerf) from 2020 and its child [3D Gaussian Splatting](node:gaussian-splatting) from 2023, which renders scenes from photos in real time.
- [JPEG XL](node:jpeg-xl), [H.266](node:h266), [Wi-Fi 7](node:wifi-7) and [DOCSIS](node:docsis).
- [Fuchsia](node:fuchsia) and [HarmonyOS](node:harmonyos), two newer operating systems, with [Z Shell](node:zsh) and the [RPM Package Manager](node:rpm).
- [3D XPoint](node:xpoint-3d), sold as Optane from 2017 until 2022.
- [Universal Chiplet Interconnect Express](node:ucie) and [AMD Zen 6](node:amd-zen-6), the newest hardware here.
- [InterPlanetary File System](node:ipfs) and [Tree-sitter](node:tree-sitter).

Fourteen of the new nodes name their creators, from Gallager and Berrou to the three authors of the Google File System paper.
