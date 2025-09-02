---
title: "Using Lago to Create a Flexible Billing System"
description: "Billing systems shouldn’t break when your business changes. Startups need flexibility, not lock-in. This post shows how we built a billing foundation that adapts as fast as the product—switching models in days, not months. Powered by open-source tools, designed for change."
createdAt: 1753226376766
updatedAt: 1753226376766
authors: ["stefan"]
category: "CASE STUDY"
editors: ["velimir"]
abstract: "Startups thrive on agility, but their billing systems often don’t. While product roadmaps and pricing models shift rapidly in pursuit of growth and product–market fit, billing infrastructure tends to lag behind, creating friction just when flexibility is needed most. In this post, we unpack how we helped Submix, a real-time audio collaboration platform, build a future-proof billing foundation tailored to constant change. By leveraging Lago, an open-source, usage-based billing engine, we delivered a system designed for adaptability, not rigidity. The result: seamless transitions between pricing models, faster go-to-market iterations, and full ownership over billing logic and data. For fast-moving teams, treating billing as a strategic lever, not an afterthought, can unlock speed, resilience, and long-term optionality."
image: "/images/using-lago-to-create-a-flexible-billing-system-2.png"
draft: false
---

In fast-moving startups, change isn’t an exception, it’s the default. Business models evolve, pricing strategies shift, and product roadmaps pivot to meet new market demands. But too often, billing systems lag behind, becoming blockers instead of facilitators.

This blog post breaks down how we implemented a flexible billing foundation for our client, Submix. We built it around an existing open-source solution, tailored to support growth, experimentation, and evolving business models. I’ll also share how we evaluated options, the key choices we made, and how we delivered a solution that’s as agile as the business it supports.

## Contents

## The Startup Challenge: Adapting to Fast-Evolving Business Needs

Submix is a platform designed to simplify **real-time audio collaboration** for musicians, producers, and creators.

At the heart of the platform is the **Submix Sessions** app, a desktop application built for **high-quality audio and video calls**, featuring professional-grade **audio routing**, **MIDI data exchange** from DAWs or hardware gear, and **dedicated voice channels** that ensure clear communication without interfering with the music. Submix also allows users to join these calls directly through their **web browser**, offering greater flexibility and accessibility.

Additionally, Submix features a **marketplace** where users can book a call with specific collaborators and attend those calls using the app or browser.

As their technical partner, we recognized that their monetization strategy would likely evolve over time as they gained deeper insights into their market and customer behavior. With that in mind, we proposed a flexible billing foundation that could evolve quickly and support frequent shifts in pricing models and business needs.

That decision proved to be the right one.

### From Fixed to Flexible: How Pricing Evolved

Initially, Submix used a **simple pay-per-call model**. Users could purchase individual or bundled call sessions directly through the platform’s **marketplace** and access them using the Submix Sessions app.

This simple model suited their **B2C strategy** well, as predictability and ease of use were critical for attracting early adopters. But as the product evolved, and new features launched, it became clear that a more dynamic billing approach would be required to support their growth.

<blockquote style="quotes: none; font-style: normal;">
<p>💡 Before a startup finds a market fit, pricing models will inevitably shift. Recognizing this, the Submix team supported our vision for a billing foundation designed for adaptability from day one, understanding that it's what separates momentum from setbacks.</p>
</blockquote>

As Submix gained deeper insight into the individual creator market, new opportunities emerged, reinforcing their commitment to their core user base with more flexible usage patterns and payment requirements.

To accommodate these shifts, they introduced a **fixed-price subscription model**, where users paid a flat monthly fee for a set number of minutes in live call sessions. Once the limit was reached, access to the Submix Sessions app was blocked, with no option to extend usage.

The pricing model continued to evolve; first with **overage charges** layered onto the subscriptions, and later transitioning to a **fully usage-based, pay-as-you-go** system for individual users that offers maximum flexibility. **Free trial periods** were also introduced to lower the barrier for new users and encourage onboarding.

<blockquote style="quotes: none; font-style: normal;">
<p>💡  Choosing the right billing foundation early on allowed us to pivot from fixed pricing to flat-fee subscriptions, and later on to hybrid and usage-based models. All this in just days, without major rework. Our future selves were grateful.</p>
</blockquote>

## Why We Chose Lago: Flexibility Without Lock-In

When Submix needed to introduce a subscription billing model, their marketplace was powered by Medusa v1, an open-source commerce engine that, at the time, didn’t support subscription payments out of the box or offer production ready plugins for it.

That limitation, combined with our expectation of future pricing complexity, led us to explore dedicated billing platforms that could integrate with our stack and grow with the business.

<blockquote>
  <div>
    <p>CroCoder have been a great partner during the growth of Submix, and the development of our billing system is a great example of their approach to working with us. They're proactive, anticipate our needs, and bring a wealth of knowledge and experience. We trusted their recommendation to use Lago for our billing system, which turned out to be the right call for a future-proof system.</p>
  </div>
  <p style="quotes: none; font-style: normal;">
    — Douglas Barr, Co-Founder and CTO at Submix
  </p>
</blockquote>

### Our Evaluation Priorities

We approached the decision around selecting a billing platform with a long-term architectural perspective in mind. Key priorities shaped our evaluation process:

- **Flexibility:** from a fixed subscription model to a usage-based one, with minimal rework
- **Ease of Integration:** including Medusa and our internal systems
- **Open Architecture:** to avoid vendor lock-in and retain control over the billing data as well as the logic
- **Deployment Options:** supporting both cloud and self-hosted options

### Why Lago Was the Right Fit

Lago stood out for its open-source foundation, deployment flexibility, and native support for **usage-based billing**. Its payment processor-agnostic design gave us the freedom to choose Stripe payments initially, while preserving the option to integrate additional payment providers later.

It gave us the technical control we needed without introducing complexity, and served as a solid foundation that could support experimentation, growth, and long-term maintainability.

<blockquote style="quotes: none; font-style: normal;">
<p>💡 Choosing Lago gave us the freedom to build around the business, rather than forcing the business to conform to the tool.</p>
</blockquote>

## How We Engineered the Billing Solution Around Lago

Lago handled much of the billing logic itself, but a critical part of our work was designing the architecture around it. We made sure that usage was accurately tracked, processed in near real-time, and seamlessly connected to payments and invoicing.

When a user initiates a subscription purchase, the process unfolds in several stages. First, we create the Lago customer, which is our system's representation of the user. This Lago customer is then linked to a corresponding customer profile in Stripe. Following this setup, checkout and payment process is initiated. Our system then listens for confirmation from the payment processor. Upon successful payment, we store all relevant data within our system and grant access to the Submix Sessions app.

![Architecture Diagram](/images/using-lago-to-create-a-flexible-billing-system/stefan-submix-diagram.png)

During live call sessions, user activity, such as entering or leaving a call, is captured in real time. These events pass through a processing layer where they are collected and stored. Once the session ends, we aggregate and transform the usage data into structured metrics, which are then sent to Lago for billing. This ensures all time-based usage is accurately recorded and attributed to the correct participants. Even though we initially focused on **time spent inside a call**, the extensible system that we built allows Submix to track **additional metrics**, like **specific feature usage**, if future pricing models require it.

Users can track their usage data directly within the app. This data is pulled from our processed billing records, providing clear, up-to-date feedback aligned with their subscription status.

<blockquote style="quotes: none; font-style: normal;">
<p>💡 Our approach at Crocoder prioritizes future-proof and adjustable solutions. This was clearly demonstrated in the system that we built for Submix, which allows them to evolve their pricing models or billing processes without major rework.</p>
</blockquote>

## Outcomes & Benefits

By designing Submix’s billing solution around Lago, and integrating it with the wider platform, ensured long-term benefits that continue to drive value for their business and technical teams:

### Fast Rollout of New Billing Models

Because of the architectural flexibility, Submix was able to shift from per-session purchases to fixed monthly subscriptions, and later to overage-based and fully usage-based models, all within days. When usage-based billing was introduced, no major rework was needed thanks to the broad capabilities of Lago in conjunction with our established usage tracking. Adding overage logic and reconfiguring pricing rules was fast and non-disruptive. These rapid rollouts were a direct result of  designing for change from day one.

### Highly Flexible Billing Adjustments

Pricing rules can be fine-tuned with ease, from trial durations, to usage thresholds, to **custom subscription terms for individual customers**.

### Cost Reduction Through Self-Hosting

Lago offers both robust cloud and self-hosted options. We deployed and managed the self-hosted version to align with Submix’s infrastructure strategy, reducing cost while retaining full control.

### Developer Velocity

Developers can simulate billing flows locally, test quickly, and release with confidence.

<blockquote style="quotes: none; font-style: normal;">
<p>💡 While business change is a constant reality for startups, experience has taught us precisely why architectural flexibility yields the highest returns.</p>
</blockquote>

## Final Thoughts: Billing as a Product Differentiator

Billing doesn’t have to be a bottleneck. With the right foundation, it can drive flexibility, reduce costs, and accelerate product delivery.

By building a system around Lago and carefully integrating it with the rest of the Submix platform, we delivered a strategy that balances technical flexibility, business agility, and operational control.

More importantly, this project highlights a key lesson for any evolving product: investing in **future-ready billing architecture** early on can unlock faster iteration, smoother pivots, and lower long-term costs. Startups often go through major shifts while finding product–market fit. It’s a pattern we’ve come to expect and design for.

For teams navigating evolving pricing models, experimenting with usage-based billing, or looking to avoid vendor lock-in, a flexible billing foundation isn’t just a technical choice, it’s a strategic advantage.
