import type { ComputerDatum } from '../types'

/**
 * The high end: supercomputers, graphics hardware that became general purpose
 * compute, machine learning, and quantum machines.
 */
export const frontier: ComputerDatum = {
  id: 'frontier',
  name: 'Supercomputing, Graphics, and AI',
  era: 'modern',
  kind: 'group',
  summary:
    'The high end. From speeding up one processor to running thousands at once, and from there to graphics hardware becoming general purpose compute.',
  children: [
    {
      id: 'supercomputers',
      name: 'Supercomputers',
      era: 'integrated',
      kind: 'group',
      summary: 'The fastest machine of each era, almost always for scientific work.',
      children: [
        {
          id: 'cdc-6600',
          name: 'CDC 6600',
          year: 1964,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Seymour Cray’s design, ten times faster than its rivals and the fastest computer in the world for about five years. Offloading I/O to separate peripheral processors starts here.',
          facts: ['Around 3 MFLOPS', 'Generally counted as the first supercomputer'],
          children: [
            {
              id: 'cdc-7600',
              name: 'CDC 7600',
              year: 1969,
              era: 'integrated',
              kind: 'machine',
              origin: 'USA',
              summary: 'A deeper pipeline, and five times the speed.',
              children: [
                {
                  id: 'cray-1',
                  name: 'Cray-1',
                  year: 1976,
                  era: 'micro',
                  kind: 'machine',
                  origin: 'USA',
                  summary:
                    'Built in a horseshoe to shorten its wiring, liquid cooled, and it took vector processing mainstream. 160 MFLOPS.',
                  facts: ['The horseshoe shape reduced wire delay', 'Liquid cooled with Freon'],
                  children: [
                    {
                      id: 'cray-x-mp',
                      name: 'Cray X-MP',
                      year: 1982,
                      era: 'micro',
                      kind: 'machine',
                      origin: 'USA',
                      summary: 'A multiprocessor vector machine, with two and four shared memory processors.',
                      children: [
                        {
                          id: 'cray-2',
                          name: 'Cray-2',
                          year: 1985,
                          era: 'micro',
                          kind: 'machine',
                          origin: 'USA',
                          summary:
                            'Fully immersed in cooling fluid, and at 1.9 GFLOPS the fastest of its day.',
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
          id: 'illiac-iv',
          name: 'ILLIAC IV',
          year: 1972,
          era: 'integrated',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first large parallel machine, applying one instruction to different data across 64 processors. A difficult project, but it opened the way for parallel computing.',
        },
        {
          id: 'connection-machine',
          name: 'Connection Machine CM-1',
          year: 1985,
          era: 'micro',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Danny Hillis connected 65,536 simple processors in a hypercube. Its black cube with red status lights became an emblem of the era.',
          facts: ['Each processor one bit wide', 'The symbol of massively parallel computing'],
        },
        {
          id: 'beowulf',
          name: 'Beowulf Cluster',
          year: 1994,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Building a supercomputer at NASA out of ordinary PCs on a network. It made high performance computing cheap, and it is the logic of today’s data centres.',
        },
        {
          id: 'asci-red',
          name: 'ASCI Red',
          year: 1996,
          era: 'modern',
          kind: 'machine',
          origin: 'USA',
          summary: 'The first machine past a trillion operations per second.',
          children: [
            {
              id: 'earth-simulator',
              name: 'Earth Simulator',
              year: 2002,
              era: 'modern',
              kind: 'machine',
              origin: 'Japan',
              summary:
                'A vector machine built for climate modelling. Its arrival at the top of the list caused serious debate in the US.',
              children: [
                {
                  id: 'blue-gene-l',
                  name: 'IBM Blue Gene/L',
                  year: 2004,
                  era: 'modern',
                  kind: 'machine',
                  origin: 'USA',
                  summary:
                    'Used a large number of low power processors, and made energy efficiency a headline metric.',
                  children: [
                    {
                      id: 'roadrunner',
                      name: 'IBM Roadrunner',
                      year: 2008,
                      era: 'modern',
                      kind: 'machine',
                      origin: 'USA',
                      summary:
                        'The first machine past a petaflop, a hybrid design pairing Opteron and Cell processors.',
                      children: [
                        {
                          id: 'fugaku',
                          name: 'Fugaku',
                          year: 2020,
                          era: 'modern',
                          kind: 'machine',
                          origin: 'Japan',
                          summary:
                            'Built from ARM based A64FX processors, and ARM’s arrival at the top of supercomputing.',
                          children: [
                            {
                              id: 'frontier-machine',
                              name: 'Frontier',
                              year: 2022,
                              era: 'modern',
                              kind: 'machine',
                              origin: 'USA',
                              summary:
                                'The first machine officially past an exaflop, built from AMD processors and accelerators.',
                              facts: ['10^18 floating point operations per second'],
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
      id: 'graphics',
      name: 'Graphics Hardware',
      era: 'modern',
      kind: 'group',
      summary: 'Hardware built to draw triangles turning into general purpose compute.',
      children: [
        {
          id: 'sketchpad',
          name: 'Sketchpad',
          year: 1963,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Ivan Sutherland’s program for drawing on a screen with a light pen and declaring constraints. The start of computer graphics and CAD.',
        },
        {
          id: 'voodoo',
          name: '3dfx Voodoo',
          year: 1996,
          era: 'modern',
          kind: 'component',
          origin: 'USA',
          summary:
            'The card that made 3D acceleration cheap on the PC, moving games from software to hardware texturing.',
        },
        {
          id: 'geforce-256',
          name: 'NVIDIA GeForce 256',
          year: 1999,
          era: 'modern',
          kind: 'component',
          origin: 'USA',
          summary:
            'Moved transform and lighting onto the card as well, and the term GPU stuck with the product.',
          children: [
            {
              id: 'geforce-8800',
              name: 'NVIDIA GeForce 8800',
              year: 2006,
              era: 'modern',
              kind: 'component',
              origin: 'USA',
              summary:
                'A unified shader architecture. For the first time a graphics card resembled a general purpose parallel processor.',
              children: [
                {
                  id: 'cuda',
                  name: 'CUDA',
                  year: 2007,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'A platform for programming the GPU in a C-like language. Scientific computing and then deep learning were built on it.',
                  children: [
                    {
                      id: 'nvidia-v100',
                      name: 'NVIDIA V100',
                      year: 2017,
                      era: 'modern',
                      kind: 'component',
                      origin: 'USA',
                      summary:
                        'Dedicated tensor cores for matrix multiplication, and the first generation designed for AI training.',
                      children: [
                        {
                          id: 'nvidia-a100',
                          name: 'NVIDIA A100',
                          year: 2020,
                          era: 'modern',
                          kind: 'component',
                          origin: 'USA',
                          summary: 'Became the standard hardware for training large models.',
                          children: [
                            {
                              id: 'nvidia-h100',
                              name: 'NVIDIA H100',
                              year: 2022,
                              era: 'modern',
                              kind: 'component',
                              origin: 'USA',
                              summary:
                                'An accelerator specialised for transformer models, and the workhorse of the large language model era.',
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
          id: 'tpu',
          name: 'Google TPU',
          year: 2016,
          era: 'modern',
          kind: 'component',
          origin: 'USA',
          summary:
            'A chip designed for nothing but neural network arithmetic: giving up generality to buy efficiency.',
        },
      ],
    },
    {
      id: 'ai',
      name: 'Artificial Intelligence',
      era: 'modern',
      kind: 'group',
      summary: 'Seventy years of moving from writing rules to learning from data.',
      children: [
        {
          id: 'dartmouth-workshop',
          name: 'Dartmouth Workshop',
          year: 1956,
          era: 'transistor',
          kind: 'concept',
          origin: 'USA',
          summary:
            'The meeting where the term "artificial intelligence" appeared. The field was planned as a summer project.',
        },
        {
          id: 'perceptron',
          name: 'Perceptron',
          year: 1958,
          era: 'transistor',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Frank Rosenblatt’s single layer network that learned its weights from data. Demonstrating its limits stalled the field for years.',
          children: [
            {
              id: 'backpropagation',
              name: 'Backpropagation',
              year: 1986,
              era: 'micro',
              kind: 'concept',
              summary:
                'The method that made multilayer networks trainable came into wide use, and put neural networks back on the agenda.',
              children: [
                {
                  id: 'lenet',
                  name: 'LeNet-5',
                  year: 1998,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'Yann LeCun’s convolutional network, reading handwritten digits on bank cheques in production.',
                  children: [
                    {
                      id: 'alexnet',
                      name: 'AlexNet',
                      year: 2012,
                      era: 'modern',
                      kind: 'concept',
                      origin: 'Canada',
                      summary:
                        'A deep convolutional network trained on GPUs won the image recognition contest by a wide margin, and started the deep learning wave.',
                      children: [
                        {
                          id: 'transformer',
                          name: 'Transformer',
                          year: 2017,
                          era: 'modern',
                          kind: 'concept',
                          origin: 'USA',
                          summary:
                            'An architecture based only on attention. Dropping sequential processing made it parallelisable, which opened the door to scale.',
                          facts: ['The common basis of today’s large language models'],
                          children: [
                            {
                              id: 'llm',
                              name: 'Large Language Models',
                              year: 2020,
                              era: 'modern',
                              kind: 'concept',
                              summary:
                                'Capability rising predictably with model and data size, and text generation becoming an everyday tool.',
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
          id: 'expert-systems',
          name: 'Expert Systems',
          year: 1965,
          era: 'integrated',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Encoding a specialist’s knowledge as rules. Commercially successful in the 1980s, then buried under maintenance cost.',
        },
        {
          id: 'deep-blue',
          name: 'Deep Blue',
          year: 1997,
          era: 'modern',
          kind: 'machine',
          origin: 'USA',
          summary:
            'The first computer to beat a reigning world chess champion in match conditions, evaluating 200 million positions a second on custom hardware.',
        },
        {
          id: 'alphago',
          name: 'AlphaGo',
          year: 2016,
          era: 'modern',
          kind: 'concept',
          origin: 'England',
          summary:
            'Beat one of the world’s best Go players. Combining search with learning was a change of method where brute force was not enough.',
        },
      ],
    },
    {
      id: 'quantum',
      name: 'Quantum Computing',
      era: 'modern',
      kind: 'group',
      summary: 'Replacing the bit with the qubit to get different scaling on certain problems.',
      children: [
        {
          id: 'feynman-quantum',
          name: 'Quantum Simulation Proposal',
          year: 1982,
          era: 'micro',
          kind: 'concept',
          origin: 'USA',
          summary:
            'Richard Feynman argued that simulating quantum systems efficiently on a classical computer is not possible, and that it would take a quantum machine.',
        },
        {
          id: 'shor-algorithm',
          name: "Shor's Algorithm",
          year: 1994,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary:
            'An algorithm that factors large numbers quickly on a quantum computer. Threatening public key cryptography is what made the field serious.',
        },
        {
          id: 'grover-algorithm',
          name: "Grover's Algorithm",
          year: 1996,
          era: 'modern',
          kind: 'concept',
          origin: 'USA',
          summary: 'A quadratic speedup for unstructured search.',
        },
        {
          id: 'dwave-one',
          name: 'D-Wave One',
          year: 2011,
          era: 'modern',
          kind: 'machine',
          origin: 'Canada',
          summary:
            'The first commercially sold quantum machine. Not general purpose, but a quantum annealer for optimisation.',
        },
        {
          id: 'ibm-quantum',
          name: 'IBM Quantum Experience',
          year: 2016,
          era: 'modern',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Put a quantum processor on the cloud for anyone to use, and took the field out of the academic lab.',
        },
        {
          id: 'sycamore',
          name: 'Google Sycamore',
          year: 2019,
          era: 'modern',
          kind: 'machine',
          origin: 'USA',
          summary:
            'Announced as performing a specific, narrow computation beyond the reach of classical machines. The claim was debated for a long time afterwards.',
        },
      ],
    },
  ],
}
