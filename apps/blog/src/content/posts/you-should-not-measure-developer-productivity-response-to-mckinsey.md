---
title: "No, you shouldn't measure developer productivity.."
description: ""
createdAt: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editors: ["velimir"]
abstract: ""
image: "/images/you-should-not-measure-developer-productivity-response-to-mckinsey.png"
draft: false
---

### ...or at least don't measure it as McKinsey proposes.

In the blazingly fast world of software development, a [recent article by McKinsey](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/yes-you-can-measure-software-developer-productivity) named **"Yes, you can measure software developer productivity"** about software development productivity has sparked intense debate. It's generated strong reactions from software engineers, project managers, and industry experts. It's like a hot potato at a picnic, everyone's tossing their opinions around!  

Now, it's my turn to join the conversation and dive into the article's content. While I can acknowledge a few valid points made by McKinsey, these instances are few and far between, and they fail to address the core issues at hand. In alignment with the prevailing sentiment, I firmly believe that this article falls short and misses the mark, certainly steering us in the wrong direction.

## The Role of Measurement

Before we start dissecting the McKinsey article, it's crucial to emphasize the significance of measurement in software engineering. Measuring productivity, output, and outcomes isn't the enemy here; it's a valuable tool for improving our processes and results.  I've always advocated for metrics that align with positive outcomes and have solid empirical backing, such as the DORA metrics.

However, the key lies in what we choose to measure and why. McKinsey's suggestion to measure individual developer productivity seems a bit off-base.

## Obsessed with Individual Productivity

The fundamental flaw in the McKinsey article is its obsession with measuring individual developer productivity. This fixation on individual output perpetuates the myth of the "rockstar programmer" – the notion that software development success hinges on the brilliance of individual developers. This belief is not only misguided but also detrimental to the collaborative nature of software engineering.

Software development is a team sport, and true success is achieved through effective team contributions, not individual heroics. I often share stories of how my courses or insights have contributed to team success, but attempting to measure my individual productivity in that context is nonsensical. The same applies to any developer's contributions within a team.

It's not about being a rockstar; it's about being an indispensable part of a stellar team.

## Evaluating Proposed Metrics

The McKinsey article introduces various metrics beyond the DORA metrics, seemingly aimed at measuring individual productivity, team effectiveness, and system-level performance. However, many of these metrics lack solid empirical support.

Customer satisfaction is undoubtedly crucial, but it's a multifaceted metric that depends on the software's purpose and its intended audience. It can't be distilled into a single measurement due to its variability.

Similarly, reliability is context-specific. What's considered reliable in one application may not hold true for another. It's a subjective measure that can't be universally applied.

Code reviews are undeniably important, but measuring code review velocity doesn't quite add up. Focusing on the speed of code reviews can lead to superficial reviews that don't provide much value to the author of the pull request.

The McKinsey report suggests measuring productivity at the system, team, and individual levels, categorizing metrics into three groups: DORA metrics, space metrics, and additional metrics created by McKinsey. However, this classification seems arbitrary and doesn't align with the complexities of software development.

The other metrics proposed by McKinsey, such as velocity, story points completed, and interruptions, are overly simplistic and miss the nuances of software engineering. These metrics risk incentivizing developers to game the system and prioritize short-term gains over long-term productivity improvements.

## Understanding Organizational Performance Beyond Metrics

Even the DORA metrics, as they stand, are trailing indicators of velocity and stability. More insights can be gleaned from observing how the metrics change over time than from comparing your organization's metrics to industry percentiles.

To truly understand what's happening in your organization, you need more context than just saying "a bigger metric value is better." For instance, a lower deployment frequency may signal underlying problems with CI/CD or resource allocation, while a higher deployment frequency may not necessarily indicate success without assessing the value delivered to customers.

In essence, a bundle of metrics doesn't provide the full organizational picture.

## The Pitfalls of Fixating on Metrics

Goodhart's Law cautions that when a metric becomes a target, people will optimize for it, often at the expense of other important considerations. Just like when playing a game, focusing solely on achieving a high score can overshadow the actual enjoyment of the game itself.

If we evaluate developer productivity solely by measuring lines of code written, developers may prioritize quantity over code quality and readability. So, we practically get spaghetti code. Similarly, using the number of pull requests reviewed as a metric can lead to excessively long review times and unhelpful comments.

This is a reminder to both you and McKinsey consultants that excessive focus on a single metric can encourage gaming the system rather than achieving broader, more important goals.

## Conclusion

The McKinsey article discussing software development productivity has sparked controversy within the software engineering community, and for good reasons. The article's insistence on assessing individual developer productivity using questionable metrics reflects a misunderstanding of the collaborative nature of software development. It's crucial to carefully select metrics, tailor them to the context, and base them on solid evidence, as exemplified by the DORA metrics. To advance our software development practices, we should resist the allure of simplistic measurements and instead embrace a comprehensive, evidence-driven approach that values teamwork and continuous improvement.

However, this conversation is far from over; it's just getting started. As software engineers, we must continue to delve into and refine our understanding of what constitutes meaningful measurement in our field. While this journey presents its fair share of challenges, it is through these challenges that we will uncover the genuine essence of software development productivity.
