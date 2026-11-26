---
title: Reading list for 26 November
date: 2026-11-26
summary: A week in which machines proved old theorems, read alongside the chips that made it possible and a DNS resolver that left a country.
---

Five pieces from the last three days. Three are about machine made proofs of problems that are decades old, written by people who have worked on those problems. The other two cover the hardware under it all and a quarrel over who gets to filter the internet's phone book.

## What are AI chips, and what's so special about Nvidia's?

*Jeffrey Young, on The Conversation, 24 November*

![A GeForce 256 graphics card with a small fan over its chip](https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/VisionTek_GeForce_256.jpg/960px-VisionTek_GeForce_256.jpg "Photo: Hyins, public domain, via Wikimedia Commons")

A researcher in high performance computing follows the graphics chip from shaders through [CUDA](node:cuda) in 2007 and [AlexNet](node:alexnet) in 2012 to the [transformer](node:transformer) and today's data centres. "GPUs now power the most visible advances in generative artificial intelligence, but they began as modestly priced add-on cards for video games and video rendering." Quoted under CC BY-ND 4.0. [Read it on The Conversation](https://theconversation.com/what-are-ai-chips-and-whats-so-special-about-nvidias-297128)

## VP ≠ VNP

*Lance Fortnow, on Computational Complexity, 24 November*

![Leslie Valiant speaking at a lectern](https://thumb.wikimedia.org/wikipedia/commons/thumb/6/66/Leslie_Valiant_%2834913684313%29.jpg/960px-Leslie_Valiant_%2834913684313%29.jpg "Photo: Dennis Hamilton, CC BY 2.0, via Wikimedia Commons")

A complexity theorist explains the question Leslie Valiant posed in the late 1970s, why the permanent of a matrix is so much harder than its determinant, and what a machine checked proof from Anthropic does and does not say about P and NP. The clearest short account of a result that grew out of [complexity theory](node:complexity-theory) and [NP-completeness](node:cook-levin). [Read it on Computational Complexity](https://blog.computationalcomplexity.org/2026/11/vp-vnp.html)

## I've been drinking wine in my kitchen

*Scott Aaronson, on Shtetl-Optimized, 24 November*

The same result seen from inside the field, by someone who has spent a career on it and is openly shaken. He compares the two labs' proofs, notes that both end in diagonalization, an old trick, and adds a new linear time algorithm for minimum spanning trees whose authors credit an AI model with the main ideas. [Read it on Shtetl-Optimized](https://scottaaronson.blog/?p=10362)

## From solving to 'digesting': How mathematicians can adapt to the dramatic changes AI has brought to their field

*David Manderscheid, on The Conversation, 24 November*

A mathematician of 45 years asks what is left for people when a proof arrives 250,000 pages long and checked by software. His answer is understanding: mathematics "is about understanding why the solutions and proofs work and then extending that mathematics to new contexts." He uses compressed sensing in MRI scanners to show why that matters. Quoted under CC BY-ND 4.0. [Read it on The Conversation](https://theconversation.com/from-solving-to-digesting-how-mathematicians-can-adapt-to-the-dramatic-changes-ai-has-brought-to-their-field-295539)

## Quad9 Service Deactivation in France

*Quad9, on the Quad9 blog, 24 November*

A public [DNS](node:dns) resolver explains why it has stopped answering queries from France rather than block names under a court order won by a sports rights holder. It is frank about the weak point of its own move: locating users by IP address is imprecise, so some people will be blocked by mistake and others missed. [Read it on quad9.net](https://quad9.net/news/blog/quad9-service-deactivation-in-france/)
