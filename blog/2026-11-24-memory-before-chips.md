---
title: Memory before chips, and the plumbing around it
date: 2026-11-24
summary: Since the last post the tree grew from 1,018 to 1,063 nodes, from mercury delay lines to Compute Express Link, and the fact checker corrected the machines branch.
---

Since the last post, on 23 November, 45 nodes have reached the tree, and it now has 1,063. This post follows four threads through them: the oldest kinds of computer memory, the wires that connect a processor to the rest of the machine, the protocols that carry mail and measurements, and the Python libraries behind scientific computing.

## Memory that was not a chip

Early computers stored bits in odd places. [Delay-line memory](node:delay-line-memory) kept them as pulses circulating through a column of mercury. J. Presper Eckert turned radar delay lines into computer memory from 1944, and EDSAC began work with 16 of them. The [Williams tube](node:williams-tube) kept them as charged dots on a cathode ray tube, and the Manchester Baby was built to test it.

[Drum memory](node:drum-memory) is older still. Gustav Tauschek invented it in 1932. It served as main memory for cheaper machines in the 1950s, until core memory took over. [EPROM](node:eprom) from 1971 and [Tomasulo's algorithm](node:tomasulo-algorithm) from 1967 sit in the same part of the tree.

## A branch for buses

A new group, Buses and Interconnects, describes the slots, lanes and cables that connect a processor to everything else. It starts with [PCI](node:pci) and [USB](node:usb). [PCI Express](node:pci-express) rebuilt PCI as serial point to point lanes. Version 1.0a came out in 2003, and it replaced PCI, PCI-X and AGP.

Its newest child is [Compute Express Link](node:cxl). It runs over the PCI Express physical layer, so processors can share memory with accelerators. Version 1.0 appeared in March 2019.

## Protocols and the Python stack

The networks branch took in [POP](node:pop3), [MIME](node:mime), [SNMP](node:snmp), [LDAP](node:ldap), [DHCP](node:dhcp) and [MQTT](node:mqtt). MQTT was written in 1999 by Andy Stanford-Clark and Arlen Nipper to monitor oil pipelines over expensive satellite links.

The languages branch gained the libraries that scientific Python stands on: [NumPy](node:numpy), [pandas](node:pandas) and [scikit-learn](node:scikit-learn). Next to them are [APL](node:apl), [Forth](node:forth), [Verilog](node:verilog) and [VHDL](node:vhdl).

## What the fact checker fixed

On 24 November the fact checker went through the whole machines branch against Wikipedia. It changed many small claims. A few examples:

- The [Zuse Z3](node:zuse-z3) had 2,600 relays, not 2,000. An addition took about 0.8 seconds.
- [MESM](node:mesm) moved from 1951 to 1950. The claim that it was continental Europe's first stored program computer is made only by some authors, so the summary now says what is certain.
- [System/390](node:system-390) brought fibre optic ESCON channels and Sysplex clustering. The old text said Fibre Channel, which is a different and later standard.
- [Whirlwind](node:whirlwind) was one of the first real time computers, and the second machine with core memory, not the first.

Corrections like these are small, but a tree that people use as a reference has to get them right.
