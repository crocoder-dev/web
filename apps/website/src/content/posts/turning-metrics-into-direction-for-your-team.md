---
title: "Turning Metrics into Direction for Your Team"
description: "Discover why real software engineering goes beyond AI-generated code. This in-depth article explores the rise of \"vibe coding,\" the risks of skipping foundational learning, and why experience, critical thinking, and deep system understanding still matter in the age of LLMs like ChatGPT and Copilot."
createdAt: 1743797373628
updatedAt: 1743797373628
authors: ["david"]
category: "DEVELOPER EXPERIENCE"
editors: ["velimir"]
abstract: "This article explores the growing tension between AI-assisted software development and the deep, experiential knowledge required to build and maintain sustainable systems. Drawing from over 15 years of experience, the author reflects on the value of struggling through complex, undocumented problems—the kind that can’t be solved by LLMs or Google alone—and emphasizes that real expertise is forged through repeated failure, critical thinking, and architectural insight.As tools like GitHub Copilot and ChatGPT become ubiquitous, many developers—especially those early in their careers—are embracing “vibe coding,” a workflow where code is generated with minimal understanding. While this approach can be productive for quick hacks or prototyping, it poses serious risks when applied to long-term, production-grade systems. The article cautions against letting AI tools short-circuit the learning process, warning that skipping the foundational struggles can lead to shallow expertise and brittle codebases. Through a mix of personal narrative, data analysis, and industry observations, the piece argues that while AI is a powerful accelerator, it cannot replace the human judgment, experience, and design thinking that define great software engineering. The call to action is clear: use the tools, but don’t let them think for you. True mastery comes not from generating code quickly, but from understanding why things work—and how to fix them when they don’t."
image: "/images/typescript-enums-good-bad-and-ugly.png"
draft: false
---

I’ve seen this many times: Company spends weeks, maybe months or even quarters, implementing new tooling, integrating dashboards, and setting up analytics. Finally, they had real data about our engineering process. The engineering metrics dashboards are ready. The numbers were all there, but suddenly they realize the real challenge...


*What do you actually do with all this information?*

That’s what this article is about. My goal is to help you put those dashboards and engineering metrics to use. We’ll walk through why a single number doesn’t magically fix your team’s problems and how each datapoint is more like a clue in a detective story. By the end, you’ll have a clear sense of what to look for, how to interpret it, and how to make it actionable.

I’m also including plenty of examples along the way, concrete mini-stories from real situations I have been involved in or witnessed, because it’s all too easy to say, “Focus on code review metrics,” without showing how they come into play in everyday life. These scenarios will help you bridge the gap between theory and practice, and hopefully spark your own ideas for tackling the challenges your team faces.

## Contents

## Metrics are Clues

Let’s be real, a single metric won’t fully capture your team’s performance, no matter how shiny it looks on the chart. Software development is about people, processes, product constraints, user needs... far too many factors to bundle into one simple number.

Instead, think of metrics like the clues in a detective novel, each one illuminates a piece of the puzzle. A slight uptick or downward trend can guide you to ask, "Hey, why is **Cycle Time** suddenly higher this sprint? Are PR reviews taking longer, or did we just tackle bigger features?"

- **Story time:** A team I have worked with once noticed that the time from “PR opened” to “PR merged” (**Time to Merge**) spiked from 2 day to over 5 days. At first, we assumed we were just extra busy. But after digging deeper and chatting with team members, we uncovered that a new security check in our CI pipeline added extra friction. The metric alone didn’t tell us why, but it gave us a clear signal: “Look here.”

The best part of having data is that it gives you a neutral, shared starting point for conversations. Metrics don’t solve problems outright, but they focus your attention on where to start.


## Where to Begin

A practical way to start is to focus on the most pressing pain points. Talk to your team about the biggest blockers or frustrations, they’ll be your north star for picking a single metric that really matters. For instance, if long code reviews keep slowing you down, measure time to first review, share the data often, and let everyone know you’re looking to improve it.

Every few weeks, assess the progress. Celebrate small wins if things get better. If they don’t, look deeper into what’s still in the way, sometimes just identifying the pain point isn’t enough. Once you see clear improvement or feel the issue is under control, switch your attention to the next area of friction.

While this approach keeps things simple, you’ll still want to steer clear of common pitfalls:

- If you track a dozen different metrics from the start, important signals can get lost. Focus on just one or two metrics at a time.

- Tools and dashboards can’t fix company culture, deeper process or mindset issues. Make sure your team trusts each other and understands that data is there to help, not to punish.

## Some Targets Go Wrong

A friend told me about a company they worked for that set a hard but a hidden from engineers target of "X pull request (PR) per week" per engineer. As soon as this was found out, PR count skyrocketed, yet output quality plummeted. People took normal-sized PRs and split them into tiny PRs just to meet the quota. The metric was reached, but the actual velocity of meaningful work tanked.

This is the classic pitfall of using a lagging indicator, an end-result metric that doesn’t tie back to the cause. I covered this in more detail in my post ["No, you shouldn't measure developer productivity.."](https://www.crocoder.dev/blog/you-should-not-measure-developer-productivity-response-to-mckinsey).  

When you push on a lagging indicator, folks often find creative ways to "hit the target" without changing the underlying problems. 

On the other hand, leading indicators act more like a compass. They measure aspects of your daily work that can predict future outcomes. For instance, if your team members keep reporting that they’re blocked by test flakiness, that’s a leading indicator that your **Deployment frequency** or code quality might take a hit soon. If you want to improve delivery speed or stability over the next quarter, focusing on these leading indicators (like the reliability of your CI pipeline) makes more sense than simply setting a big, lofty goal like, "Double our **Deployment frequency**!"

## Surveys and "Just-in-time" feedback

Many teams still rely on a quarterly or bi-annual survey to gather what people think about the code review process, deployment pipeline, or daily annoyances. Surveys definitely have value, but they can miss the nuances of daily life. What if a gnarly bug fix overshadowed the rest of a good quarter?

That’s where real-time feedback comes in. Some teams now use mini-surveys that pop up when, say, a developer merges a PR or completes a deploy: “How smooth was this for you?” or “Did you run into any unexpected obstacles?” These micro check-ins capture context in the moment.

- **Story time:** We tried this in a team by integrating a lightweight bot right in the Slack. Every time someone merged a PR, the bot asked, "On a scale of 1 to 7, how painful was the review process?". After a few merges, we started noticing patterns. We had a lot of six and sevens whenever a particular service was involved. That feedback pointed us to a problematic serrvice we probably would have missed in an quaterly survey.

It’s like checking your heart rate immediately after a run, instead of waiting until the next day when you can barely remember how you felt.

## Making Metrics Actionable

Let’s say you notice that your **Cycle Time** is inching upwards every week. If you do nothing, it’ll just keep climbing while frustration grows.. 

If you declare, "We need to reduce **Cycle Time** by half!” you might be missing context, maybe the project scope just got bigger, or reviewers are out on vacation.

Instead, reflect and respond in stages. 

In your bi-weekly retro, bring the metric to the agenda: “We’re seeing an extra two days on average. What changed?” 

Sometimes the answer is straightforward, people are juggling emergencies or the QA phase is a bottleneck. From there, try small tweaks like assigning a "review buddy" or splitting larger tasks into smaller merges. Run each adjustment as an experiment, watch the numbers, and iterate accordingly.

To make this process work, it helps to have a framework. Here’s a simple three-step approach that turns these conversations into meaningful action:

**Clarify Your Use Case**

Decide why you’re collecting data in the first place. Are you a leader who needs a broad picture of efficiency, or a platform team showing how internal tooling affects dev workflows? Understanding your use case drives which metrics to track and how to interpret them.

**Fold Metrics into Your Existing Processes**

Don’t let the data live in isolation. Bring it up during retrospectives, stand-ups, and team check-ins. Recognize wins when the numbers improve, and brainstorm solutions together when you see a dip.

**Focus on Learning, Not Blame**

Use data to encourage curiosity, ask “What slowed us down?” instead of “Who slowed us down?” When the team sees metrics as a shared tool for growth rather than a scorecard for mistakes, honest feedback and real progress become possible.

By tying your metrics to your team’s workflow rituals, like stand-ups, retrospectives, and sprint planning, you transform them from static numbers into dynamic conversations.

## Final Thoughts

Having a dashboard full of fresh data is exciting. But it’s just the beginning. The true power of metrics unfolds when they become part of your storytelling, about what’s slowing you down, what’s improving, and what still needs attention. The next time you see a suspicious spike or a worrying dip in your charts, lean into the story it’s hinting at. Dig deeper, talk with your team, and figure out what’s really going on.

Metrics can’t replace conversations, but they can make those conversations far more illuminating. When used well, they transform from a static report card into a constant feedback loop, one that helps you and your team find new ways to grow, tweak processes, and build software that truly makes a difference.

Ultimately, metrics work best in a culture of curiosity and transparency. You’ll make real progress when the entire team sees them as a friendly guide, not a harsh judge.

So, you have the numbers. Now, it’s time to tell the story and let the next chapter of your team’s improvement begin.
