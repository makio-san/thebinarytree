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
                              children: [
                                {
                                  id: 'el-capitan',
                                  name: 'El Capitan',
                                  year: 2024,
                                  era: 'modern',
                                  kind: 'machine',
                                  origin: 'USA',
                                  summary:
                                    'An HPE Cray machine at Lawrence Livermore built on AMD processors, verified at 1.742 exaflops in November 2024. It displaced Frontier and stayed the fastest computer in the world until June 2026.',
                                },
                              ],
                            },
                            {
                              id: 'lineshine',
                              name: 'LineShine',
                              year: 2026,
                              era: 'modern',
                              kind: 'machine',
                              origin: 'China',
                              summary:
                                'A system at the National Supercomputing Center in Shenzhen that debuted at number one on the June 2026 TOP500 list at 2.198 exaflops. The first machine past two exaflops on CPUs alone, with no accelerators.',
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
          id: 'jupiter',
          name: 'JUPITER',
          year: 2025,
          era: 'modern',
          kind: 'machine',
          origin: 'Germany',
          summary:
            'Europe’s first exascale supercomputer, inaugurated at Forschungszentrum Jülich in September 2025. Its booster, built by Eviden, holds about 24,000 NVIDIA GH200 Grace Hopper superchips.',
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
          children: [
            {
              id: 'sword-of-damocles',
              name: 'The Sword of Damocles',
              year: 1968,
              era: 'integrated',
              kind: 'device',
              origin: 'USA',
              summary:
                'Ivan Sutherland’s head mounted display, hung from the ceiling on a tracking arm, and the first working augmented or virtual reality system. The nickname was a joke about the arm; he called it simply the head-mounted display.',
              children: [
                {
                  id: 'oculus-rift',
                  name: 'Oculus Rift',
                  year: 2013,
                  era: 'modern',
                  kind: 'device',
                  summary:
                    'Palmer Luckey’s low cost virtual reality headset, shipped to developers as DK1 in March 2013, with the consumer version following in 2016. It restarted consumer VR.',
                },
              ],
            },
          ],
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
                              children: [
                                {
                                  id: 'nvidia-blackwell',
                                  name: 'NVIDIA Blackwell',
                                  year: 2024,
                                  era: 'modern',
                                  kind: 'component',
                                  origin: 'USA',
                                  summary:
                                    'The architecture after Hopper, announced at GTC in March 2024 and named after the statistician David Blackwell. The next generation of hardware for training large models.',
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: 'opencl',
                      name: 'OpenCL',
                      year: 2009,
                      era: 'modern',
                      kind: 'concept',
                      summary:
                        'An open standard for programs that run across CPUs, GPUs and other accelerators from any vendor. Apple wrote the initial proposal, the Khronos Group approved version 1.0 in December 2008, and it first shipped with Mac OS X Snow Leopard in August 2009.',
                    },
                    {
                      id: 'nvlink',
                      name: 'NVLink',
                      year: 2016,
                      era: 'modern',
                      kind: 'component',
                      summary:
                        'Nvidia’s short range link between GPUs, and between GPUs and CPUs. Unlike PCI Express, one device can use several links and form a mesh instead of going through a hub. Announced in March 2014 and first built into the Pascal P100 in 2016; since 2018 a switch lets many GPUs share it.',
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
          children: [
            {
              id: 'cerebras-wse',
              name: 'Cerebras Wafer Scale Engine',
              year: 2019,
              era: 'modern',
              kind: 'processor',
              origin: 'USA',
              summary:
                'An AI processor that takes up an entire silicon wafer. Cerebras, founded in 2015, announced the first generation and its CS-1 system in August 2019.',
            },
          ],
        },
        {
          id: 'ray-tracing',
          name: 'Ray Tracing',
          year: 1968,
          era: 'integrated',
          kind: 'concept',
          summary:
            'Making an image by modelling the paths light takes through a scene. Arthur Appel published the first use of a computer to trace rays for shaded pictures in 1968, and since 2018 graphics cards accelerate it in real time.',
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
                  id: 'lstm',
                  name: 'LSTM',
                  year: 1997,
                  era: 'modern',
                  kind: 'concept',
                  summary:
                    'Sepp Hochreiter and Jürgen Schmidhuber’s recurrent network with gated memory cells, published in Neural Computation in 1997. It carries information across thousands of steps, and ran speech recognition and machine translation until transformers took over.',
                },
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
                              children: [
                                {
                                  id: 'chatgpt',
                                  name: 'ChatGPT',
                                  year: 2022,
                                  era: 'modern',
                                  kind: 'concept',
                                  origin: 'USA',
                                  summary:
                                    'A chatbot on OpenAI’s GPT models that reached 100 million monthly users two months after launch. It turned language models from a research topic into something everyone tried, and started the investment boom that followed.',
                                },
                                {
                                  id: 'github-copilot',
                                  name: 'GitHub Copilot',
                                  year: 2021,
                                  era: 'modern',
                                  kind: 'component',
                                  origin: 'USA',
                                  summary:
                                    'Code completion from a language model, inside the editor, announced by GitHub and OpenAI in June 2021. The first widely used tool to put a model into everyday programming.',
                                },
                                {
                                  id: 'openai-o1',
                                  name: 'OpenAI o1',
                                  year: 2024,
                                  era: 'modern',
                                  kind: 'concept',
                                  origin: 'USA',
                                  summary:
                                    'The first of OpenAI’s reasoning models, which spend time thinking before they answer. Spending more compute at answer time, not only at training time, became a standard technique after it.',
                                  children: [
                                    {
                                      id: 'deepseek-r1',
                                      name: 'DeepSeek-R1',
                                      year: 2025,
                                      era: 'modern',
                                      kind: 'concept',
                                      origin: 'China',
                                      summary:
                                        'An open weight reasoning model trained largely with reinforcement learning, released by the Chinese lab DeepSeek in January 2025. It performed comparably to OpenAI o1 on reasoning tasks and became the most downloaded free app on the US App Store within a week.',
                                    },
                                  ],
                                },
                                {
                                  id: 'model-context-protocol',
                                  name: 'Model Context Protocol',
                                  year: 2024,
                                  era: 'modern',
                                  kind: 'concept',
                                  origin: 'USA',
                                  summary:
                                    'An open standard from Anthropic for connecting models to tools and data through one protocol instead of a custom connector for each. OpenAI and Google DeepMind adopted it, and in December 2025 it was given to a fund under the Linux Foundation.',
                                },
                                {
                                  id: 'llama',
                                  name: 'Llama',
                                  year: 2023,
                                  era: 'modern',
                                  kind: 'concept',
                                  origin: 'USA',
                                  summary:
                                    'Meta’s family of large language models with downloadable weights, first offered to researchers in February 2023 and later under licenses that allow commercial use. It started the open weight model ecosystem.',
                                },
                                {
                                  id: 'claude',
                                  name: 'Claude',
                                  year: 2023,
                                  era: 'modern',
                                  kind: 'concept',
                                  origin: 'USA',
                                  summary:
                                    'Anthropic’s family of large language models, first released on 14 March 2023 and trained against a written constitution. It is also used heavily for writing software, through agentic coding tools.',
                                },
                                {
                                  id: 'gemini',
                                  name: 'Gemini',
                                  year: 2023,
                                  era: 'modern',
                                  kind: 'concept',
                                  summary:
                                    'Google DeepMind’s multimodal model family, announced on 6 December 2023 as the successor to PaLM 2. It was built to take text, images, audio and video from the start.',
                                },
                                {
                                  id: 'qwen',
                                  name: 'Qwen',
                                  year: 2023,
                                  era: 'modern',
                                  kind: 'concept',
                                  origin: 'China',
                                  summary:
                                    'Alibaba Cloud’s family of mostly open weight language models, first released as a beta in April 2023. Permissive licences and small sizes made it a common base for fine tuned models.',
                                },
                                {
                                  id: 'rlhf',
                                  name: 'Reinforcement Learning from Human Feedback',
                                  year: 2017,
                                  era: 'modern',
                                  kind: 'concept',
                                  summary:
                                    'Train a reward model on what people prefer, then optimise an agent against it. A 2017 paper from OpenAI and DeepMind trained Atari agents from human preferences this way, and the same idea was later used to teach language models to follow instructions.',
                                },
                              ],
                            },
                            {
                              id: 'whisper',
                              name: 'Whisper',
                              year: 2022,
                              era: 'modern',
                              kind: 'concept',
                              origin: 'USA',
                              summary:
                                'OpenAI’s speech recognition and transcription model, released as open source in September 2022. An encoder-decoder transformer that transcribes many languages and translates several of them into English.',
                            },
                          ],
                        },
                        {
                          id: 'tensorflow',
                          name: 'TensorFlow',
                          year: 2015,
                          era: 'modern',
                          kind: 'concept',
                          origin: 'USA',
                          summary:
                            'Google Brain’s machine learning library, released as open source in November 2015 as the successor to its internal DistBelief system. It put large scale neural network training in everyone’s hands.',
                        },
                        {
                          id: 'resnet',
                          name: 'ResNet',
                          year: 2015,
                          era: 'modern',
                          kind: 'concept',
                          summary:
                            'Residual connections, which add a layer’s input back to its output, let networks hundreds of layers deep train, and won ImageNet in 2015. The same skip connection sits inside every transformer.',
                        },
                        {
                          id: 'pytorch',
                          name: 'PyTorch',
                          year: 2016,
                          era: 'modern',
                          kind: 'concept',
                          origin: 'USA',
                          summary:
                            'A deep learning library for Python from Facebook’s AI lab, now Meta’s, built around eager tensors and automatic differentiation and first released in September 2016. It became the default framework for research and for most large language models.',
                        },
                        {
                          id: 'nerf',
                          name: 'Neural Radiance Field',
                          year: 2020,
                          era: 'modern',
                          kind: 'concept',
                          summary:
                            'A neural network that learns a three-dimensional scene from ordinary two-dimensional photos and can then render it from new viewpoints. The original paper appeared in 2020 and many variants have followed.',
                          children: [
                            {
                              id: 'gaussian-splatting',
                              name: '3D Gaussian Splatting',
                              year: 2023,
                              era: 'modern',
                              kind: 'concept',
                              summary:
                                'A radiance field method that turns a set of photos into a three-dimensional scene and renders it in real time. Splatting dates from Lee Westover’s work in the early 1990s, and Bernhard Kerbl and Georgios Kopanas at Inria proposed the 3D Gaussian version in 2023.',
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                {
                  id: 'gan',
                  name: 'Generative Adversarial Networks',
                  year: 2014,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'Canada',
                  summary:
                    'Two networks trained against each other, one generating samples and one judging whether they look real. Ian Goodfellow’s group at Montréal proposed it in 2014, and it was the first generative model to produce convincing synthetic photographs.',
                },
                {
                  id: 'word2vec',
                  name: 'Word2Vec',
                  year: 2013,
                  era: 'modern',
                  kind: 'concept',
                  origin: 'USA',
                  summary:
                    'A technique from Google that learns a vector for each word from the words around it, so that words used alike land close together. It was cheap enough to train on very large text corpora, which made word embeddings common in language processing.',
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
          children: [
            {
              id: 'alphafold-2',
              name: 'AlphaFold 2',
              year: 2020,
              era: 'modern',
              kind: 'concept',
              origin: 'England',
              summary:
                'DeepMind’s protein structure predictor, which won the CASP14 assessment in 2020 with accuracy far above every other entry. Hassabis and Jumper shared the 2024 Nobel Prize in Chemistry for it.',
            },
            {
              id: 'alphazero',
              name: 'AlphaZero',
              year: 2017,
              era: 'modern',
              kind: 'concept',
              origin: 'England',
              summary:
                'DeepMind’s program that learned chess, shogi and Go by playing only against itself, with no opening books or endgame tables. The preprint of 5 December 2017 reported wins over the engines Stockfish and Elmo.',
            },
          ],
        },
        {
          id: 'stable-diffusion',
          name: 'Stable Diffusion',
          year: 2022,
          era: 'modern',
          kind: 'concept',
          summary:
            'A latent diffusion model that draws images from text, released in 2022 with its weights. Because it ran on an ordinary consumer GPU, image generation stopped being something only a few labs could do.',
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
          children: [
            {
              id: 'google-willow',
              name: 'Google Willow',
              year: 2024,
              era: 'modern',
              kind: 'machine',
              origin: 'USA',
              summary:
                'A 105 qubit superconducting chip announced in December 2024. The first to show error correction improving as it grew: each step from a 3 by 3 to a 5 by 5 to a 7 by 7 grid halved the error rate.',
            },
          ],
        },
        {
          id: 'quantinuum-helios',
          name: 'Quantinuum Helios',
          year: 2025,
          era: 'modern',
          kind: 'machine',
          summary:
            'A trapped-ion quantum computer launched in November 2025, its 98 qubits single barium ions held above a chip. Quantinuum reports the highest gate fidelities of any commercial machine.',
        },
        {
          id: 'quantum-error-correction',
          name: 'Quantum Error Correction',
          year: 1995,
          era: 'modern',
          kind: 'concept',
          summary:
            'Protecting quantum information from noise by spreading one logical qubit across several physical ones, so errors can be found and undone. Peter Shor’s nine qubit code of 1995 was the first quantum code.',
        },
        {
          id: 'trapped-ion-quantum',
          name: 'Trapped-Ion Quantum Computer',
          year: 1995,
          era: 'modern',
          kind: 'concept',
          summary:
            'Qubits stored in single charged atoms, held in place by electromagnetic fields and coupled with lasers. Ignacio Cirac and Peter Zoller proposed the first scheme for a controlled-NOT gate with trapped ions in 1995, and the basic operations of a quantum computer have been shown with the highest accuracy on this platform.',
        },
      ],
    },
  ],
}
