---
title: "How We Rebuilt a Legacy UI With Zero Downtime: A Case Study in Component Libraries and Frontend Guidance"
description: "Find out how we embedded within frontend teams to lead a zero-downtime UI migration from the inside. This case study explores our bottom-up approach to migrations providing early guidance to create a shared component library."
createdAt: 1754640512840
updatedAt: 1754640512840
authors: ["gloria"]
category: "CASE STUDY"
editors: ["velimir"]
abstract: "Modernizing a legacy UI often means trade-offs: slowdowns, rewrites, or risky downtime. This post shows how our development team helped enterprise clients like Searchmetrics (now Conductor) and Mister Spex avoid all three. We collaborated directly with in-house engineers to deliver a zero-downtime migration, replacing brittle legacy UIs with modern frameworks, introducing a shared component library, and building lasting frontend governance from within."
image: "/images/how-we-rebuilt-a-legacy-ui-with-zero-downtime.png"
draft: false
---

Modernizing a **legacy frontend** can feel like trying to fix a moving car. One wrong move, and you risk regressions, delayed roadmaps, or frustrated users. But it doesn’t have to be that way.

At least, that’s what we set out to prove.

For the teams at **Searchmetrics (now Conductor)** and **Mister Spex**, modernization meant replacing aging UI layers that were built on tightly coupled templates and out-of-date frameworks with scalable, component-based architectures using **React** or **Next.js**. It meant a better developer experience, faster iteration, and a more consistent look and feel. And it all had to be done without halting product delivery or disrupting the experience for thousands of end users.

In this post, we’ll walk you through how we helped those teams reach their goals.

Our approach at both companies wasn’t to pause the roadmap or rewrite everything at once. Instead, we treated migration as a part of the product. We embedded ourselves in their frontend chapters, co-built a shared component library, and used **hybrid techniques** to roll out the new stack gradually and safely.

The result? The migrated code was already integrated into product development, proved resilient after we stepped away, and gave the teams everything they needed to continue evolving their codebase.

## Contents

## Starting with Migration Strategy, Not Code

When we’re brought in as a team to support a client’s migration, we don’t jump straight into writing code. Instead, we start by listening. We work closely with tech leadership to understand the goals, the pain points, and what the priorities are from day one.

That’s exactly how we began at both Searchmetrics and Mister Spex. We embedded early by joining planning sessions with the engineering leads, the PMs, and the QA teams to map out the real constraints of the migration.

From those early conversations, we shaped a **migration strategy** grounded in reality. We identified high-risk legacy zones, planned for gradual rollout, and chose modern stacks based on the client’s long-term direction, and not just following trends.

We deliberately avoided full rewrites or giant PRs that would sit in limbo. Instead, we took a layered, progressive approach whenever possible: stabilizing legacy code, extracting shared patterns, and replacing them with cleaner, modernized versions—one system at a time.

---

## Shipping While Migrating

It’s easy to assume a major frontend migration entails pausing **product delivery**. But from our experience working with teams like those at Mister Spex and Searchmetrics, this doesn’t have to be the case. Even framework-level changes can happen alongside feature work when migration is integrated into the roadmap rather than treated as a separate project.

To embed migration into the existing codebase, we built seamless bridges between old and new stacks. **Hybrid components** were rendered within legacy templates, **wrapper layers** ensured backward compatibility with new code, and smart **feature flags** allowed us to release new versions only when they were truly ready. This approach kept the migration work incorporated into ongoing development, ensured it was integrated into daily workflows, and ultimately helped it get delivered.

<blockquote style="quotes: none; font-style: normal;">
  <p>
    💡 If you are interested in how we handle framework migrations, you can read about our experience migrating from Angular to React at <strong>sevdesk</strong>: 
    <a href="/blog/migrating-an-enterprise-app-from-angularjs-to-react" target="_blank" rel="noopener noreferrer">“Migrating an Enterprise App from AngularJS to React”</a>.
  </p>
</blockquote>

---

## Enabling the Frontend Chapter

Of course, modernizing code is only half the story. To make the change sustainable, we had to modernize how frontend teams worked together.

That’s why we invested heavily in **chapter enablement**, working side-by-side with internal engineers, not just handing over documentation. We ran brown-bag sessions on migration strategy and component design and paired regularly with developers across all teams to share context and unblock real issues in real time. The goal wasn’t just to teach patterns but rather to co-develop them in the flow of real work.

We also helped define **foundational standards**: folder structures that made sense, a linting setup that teams could agree on, and a testing strategy that didn’t feel like a burden. Rather than enforcing anything from our side, we built these practices together with the people who would use them daily.

And yes, we co-led the development of a **shared component library**: something simple, discoverable, and designed to scale. We set it up as a private package inside the existing monorepo to enable gradual adoption. We integrated it with **Storybook** for visual QA and smoother onboarding. Plus, we documented the contribution guidelines and changelogs to ensure it could be maintained effectively over time.

Searchmetrics already had a component library in place, but we helped transform it into a central pillar of the migration by refactoring key UI elements and expanding it to support multiple teams working on an enterprise product suite. We worked within familiar patterns, which made adoption easier and reduced friction.

Developers began using the improved library in new views almost immediately. It quickly became the go-to for building consistent interfaces, helping reduce **duplication** across the product.

<blockquote>
  <div>
    <p>The old library was difficult to maintain, as every change introduced bugs or made it hard to extend some of the components. Working with the Crocoder team, we were able to rethink the architecture, implement new core components quickly, and start using them alongside the existing ones. Development became faster and more consistent, especially with the new Storybook documentation, which made the library much easier for the team to adopt and extend. Throughout the process, they shared their knowledge with our teams to enable us to confidently maintain and evolve the library on our own.</p>
  </div>
  <p style="quotes: none; font-style: normal;">
    — Andreja Migles, Senior Software Engineer at Conductor (formerly Searchmetrics)
  </p>
</blockquote>

At Mister Spex, the process looked somewhat different. We built a component library **from the ground up** to support a newly introduced design system. Working closely with engineers across product teams, we focused on making components truly reusable despite the challenges of distributed ownership and differing service architectures.

Before this, duplication was commonplace: similar UI elements were implemented in slightly different ways across teams. The new library gave them a consistent foundation to build on, improving alignment and reducing rework.

<blockquote>
  <div>
    <p>The list of things I could praise about Danica’s work at Searchmetrics is not short. She took apart the whole design system to recreate it as an interactive component library—something we would never have time for among all the product features and improvements. And the outcome was outstanding: consistent, easy to use, and well documented. And on top of all that, it was always a joy to work with her.</p>
  </div>
  <p style="quotes: none; font-style: normal;">
    — Sarah Wachs, Senior Developer and Former Chapter Lead at Searchmetrics
  </p>
</blockquote>

---

## Long-Term Impact

By the end of the engagement, modern frameworks had become the norm, and the legacy systems had been fully phased out. Developers at Searchmetrics and Mister Spex were building faster and with fewer frustrations, using a shared component library that significantly improved efficiency, consistency, and ease of integration. With seamless alignment between design and code, teams were confidently shipping new features on a modern, unified foundation.

Beyond just technical gains, the biggest shift was the momentum. Migration stopped feeling like a one-off project and became part of how the teams worked. The frontend chapters gained solid footing, the libraries continued to evolve, and the teams took real ownership of the systems they helped build.

---

## What We Learned

We’ve experienced firsthand that **zero-downtime migrations are possible**, but only if you approach them as more than just a technical problem.

Here’s what worked for us:

- **Don’t pause delivery.** Integrate migration into the roadmap for better quality and long-term stability.
- **Introduce team alignment early.** A shared library is only as strong as the practices and people around it.
- **Build in layers.** Use hybrid patterns, wrapper bridges, and feature flags to avoid big-bang cutovers.
- **Embed in the team.** Real change happens when you’re part of the chapter, not an external advisor.

---

Modernizing a large frontend doesn’t have to mean hitting pause on everything else. As we saw with Searchmetrics (now Conductor) and Mister Spex, migration works best when it's treated as a part of the regular product development. It should be tied to real features, built alongside the roadmap, and shaped through close collaboration with the teams doing the work.

By co-developing a strategy tailored to the client’s needs, along with shared libraries, solid patterns, and internal support, teams are able to move beyond legacy code gradually, confidently, and without disruptions.

If your team is facing a legacy migration, let’s talk! We’ll help you modernize without slowing down—one component at a time.
