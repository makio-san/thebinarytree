---
title: Indexes, kernels and self-play
date: 2026-11-26
summary: Since 24 November the tree grew from 1,063 to 1,082 nodes, with the B-tree and the LSM-tree, three pieces of the Linux kernel, AlphaZero and Log4Shell, and 25 new portraits.
---

Since the last post, on 24 November, 19 nodes have reached the tree, and it now has 1,082 across 20 lineages. Nothing was removed. The new nodes fall into four groups: how databases keep data in order, what Linux added to its kernel, a handful of machine learning landmarks, and some odds and ends from the web, games and security.

## Trees inside the tree

The data stores branch gained two indexes. The [B-tree](node:b-tree) holds many keys in each node, so a large sorted index stays shallow and a key is found in a few disk reads. Rudolf Bayer and Edward McCreight invented it at Boeing Research Labs and circulated the paper in July 1970.

The [Log-Structured Merge-Tree](node:lsm-tree) from 1996 takes the opposite approach. It collects new records in memory and writes them to disk in sequential batches, for workloads with a very high volume of inserts. Next to them is [CRDT](node:crdt), data structures that replicas update on their own and merge without coordination, formally defined in 2011.

## Three things Linux learned

[cgroups](node:cgroups) limit and account for the CPU, memory and disk I/O of a group of processes. Engineers at Google started it in 2006 as process containers, and it was merged into kernel 2.6.24 in January 2008. [io_uring](node:io-uring) by Jens Axboe arrived in Linux 5.1 in May 2019. It moves asynchronous I/O onto two ring buffers shared between a program and the kernel. [Btrfs](node:btrfs), a copy-on-write file system that Chris Mason began in 2007, declared its on-disk format stable in Linux 3.13.

## Learning from data, and from itself

The frontier branch took in [Word2Vec](node:word2vec) from 2013, which made word vectors cheap enough to train on very large corpora. [Reinforcement Learning from Human Feedback](node:rlhf) dates from a 2017 paper that trained Atari agents on human preferences. [AlphaZero](node:alphazero) learned chess, shogi and Go by playing only against itself, and [Whisper](node:whisper) is OpenAI's open source speech recognition model from 2022. The [Cerebras Wafer Scale Engine](node:cerebras-wse) is a processor the size of an entire silicon wafer, announced in August 2019.

## The rest

- [Web 2.0](node:web-2-0): coined by Darcy DiNucci in 1999, made common by Tim O'Reilly and Dale Dougherty in 2004.
- [Ladybird](node:ladybird): a browser engine not based on Chromium, Gecko or WebKit, separate from SerenityOS since 2022.
- [Godot](node:godot): an MIT licensed game engine from Buenos Aires, public since 2014.
- [Kinect](node:kinect): sold eight million units in its first sixty days.
- [Microsoft Exchange Server](node:exchange-server), [Flutter](node:flutter) and [USB4](node:usb4).
- [Log4Shell](node:log4shell): a flaw in Log4j that had gone unnoticed since 2013 until Chen Zhaojun of Alibaba Cloud reported it on 24 November 2021.

## Faces

The portrait finder added 25 portraits. Among them are Tony Hoare, Edsger W. Dijkstra, Stanisław Ulam, Samuel Morse and Alexey Pajitnov. Twelve of the new nodes also list their creators by name, from the four authors of the LSM-tree paper to the five founders of Cerebras.
