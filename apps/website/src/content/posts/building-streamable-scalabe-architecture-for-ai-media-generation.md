---
title: "Building a Streamable, Scalable Architecture for AI media generation"
description: ""
createdAt: 1752743682557
updatedAt: 1752743682557
authors: ["david"]
category: "AWS"
editors: ["velimir"]
draft: false
abstract: ""
image: "/images/block-russia-using-cloudfront.jpg"
---

You've built the model. It works. It's awesome! It generates audio and video that people actually want to use. That’s a huge win, and it's not easy. 

But there’s a gap between "we have a model" and "people are experiencing it in a product."

That’s where things get tricky. And it's also where we come in.

---

One of our clients had a serious breakthrough in generative media. Their inhouse trained AI model could generate polished, compelling audio and video. But they didn't have a way to deliver that magic to users.

They weren't alone. This happens a lot. You nail the ML problem, but you're stuck on:

 - How to send the result to users without them waiting forever

 - How to avoid users bouncing when generation feels slow or uncertain

 - How to make the system stable when job times vary wildly

The temptation? Wrap the model in an API call and call it a day.

But the truth is: synchronous architectures just don’t cut it for this.

## Where Synchronous Architecture Breaks

It sounds simple enough: send a request, wait for the model to generate, return the result.

Except:

 - Generating media can take 30 to 90+ seconds

 - If the user disconnects, the job is gone

 - There’s no streaming, so you wait for everything or nothing

 - Load balancing doesn’t help much when some jobs are 4x longer than others and it's extremely diffcult to figure what prompt will take long

Even worse, any one of these issues can cause a bad experience that makes the product feel broken.

## The Solution: Async and Stream-First

We worked with the team to build a system that leans into what media generation really needs. Here's the core of what we set up:

### Async Job Queue

Every request turns into a job. It lives on the backend. That means:

 - You don’t lose work if the tab closes

 - You can retry failures

 - We can prioritize and schedule intelligently

Progressive Streaming

We don’t wait until the file is finished. As soon as we have a piece, we stream it.

 - Users hear or see something in ~5-7 seconds

 - Playback starts while the rest of the media is being generated

 - UX stays smooth and responsive

### Smarter Scheduling

Instead of treating all jobs the same, we batch and prioritize based on real needs:

- Premium users

- Job complexity (length, resolution, modality)

- System load

It’s not just round-robin, or least connections strategy, it’s fair and flexible.

### Proper Authentication

Every part of the flow; submit, track, stream is secured:

- Scoped tokens

- Signed URLs

- Safe reconnections

No weird hacks. Just a real authentication model that fits the async lifecycle.

## What Happened Next

After 10 weeks, here’s what we launched with them:

- Time-to-first-frame under 7 seconds

- Thousands of concurrent jobs with zero loss on reconnect

- Streaming previews worked even for 99 percentile long-running jobs

It felt fast. It felt responsive. And most importantly, it felt like a product, not a demo.

## Why This Works

We didn’t just make the model usable, we made it feel good to use.

- Asynchronous architecture gives us resilience

- Streaming gives users confidence

- Job queues give us control

- Auth gives us safety

The result? A real system that meets people where they are, on flaky mobile, low-bandwidth networks, or high-concurrency days.


## You Don’t Have to Build It Alone

If you’ve got a powerful model and a vision for what it could be, but you’re stuck on turning it into a real product - talk to us.

We’ve done this. We can help you go from "Look what cool stuff we made" to "Try it now."

No fragile hacks. No fake streaming. Just the right pieces, built the right way.

Let’s make it work, for real users, in the real world.
