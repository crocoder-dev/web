---
title: "AGI is nowhere near, LLMs don't reason"
description: "LLMs don’t think. Despite the hype, AGI isn't ner. AI models are powerful pattern matchers, great for tasks like summarizing and code, but not for real logic or abstract thought."
createdAt: 1749720448687
updatedAt: 1749720448687
authors: ["david"]
category: "AWS"
editors: ["velimir"]
draft: false
abstract: "Large language models may appear intelligent, but they don’t truly think, they simulate reasoning by remixing patterns they’ve seen before. While recent AI advancements have sparked excitement about general intelligence, the reality is that these models struggle with genuinely novel, complex problems that require abstract logic or original thought. Their strength lies in recognizing and reproducing patterns, making them highly effective for tasks like summarizing content, generating text, or completing code, but fundamentally limited when it comes to reasoning or creative problem-solving. Understanding this distinction is crucial for building AI-powered systems that play to the models’ strengths without overestimating their capabilities."
image: "/images/agi-is-nowhere-near-llms-do-not-reason.png"
---

Hey, remember when devs few years ago were telling everyone that LLMs can't think?

You probably don't, because all the AGI hypebeast people took over the megaphone.

Well, Apple recently released a research paper titled ["The Illusion of Thinking,"](https://machinelearning.apple.com/research/illusion-of-thinking) which highlights something I've been saying about AI models for a while:

**They don't truly reason**, they're just excellent at recognizing patterns.

Apple gave to a few advanced "reasoning" models, like DeepSeek-R1, Claude 3.7 Sonnet, and Gemini Thinking, multiple logical problems of increasing complexity. The results weren't surprising to me: simple problems were handled fine, slightly harder ones gave mixed outcomes, but once the tasks became complex and nuanced, the models totally sh*t the bed, even with additional computational power or clear instructions.

As soon as problems get too novel or unfamiliar, these models weren't helpful at all. You would expect that from something that's awesome at pattern recognition but not doing any actual reasoning.

These models aren't faulty, our expectations are straight off. Models can't generalize ideas or categorize concepts as humans do, nor can they invent completely new solutions from abstract thinking.

Instead, **they remix and replay patterns they've already learned.**

But that’s okay! LLMs and similar models are still incredibly valuable. They rock at tasks like summarizing content, completing code snippets, and other pattern-driven jobs. The key is just being clear on their limitations.

If you’re building something using AI models, lean on them for tasks where pattern matching is powerful. Don’t rely on them for genuinely new logical reasoning.

**AI models are tools**, they simulate thinking but don't genuinely think.

