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

You've trained an AI that can generate audio and video. You expose it through a simple API, and users are left waiting while the model runs. 

Sometimes the wait is 30 seconds. Sometimes it's 90. Tabs close, connections drop, and jobs restart. 

What worked in development feels fragile in production.

## Why a simple synchronous API call fails

What looks like the easy path, client sends a request, waits, and finally gets the result, breaks down in real usage. Media generation time varies unpredictably. That variability ties up resources, causes head-of-line blocking, and makes load balancing ineffective. The client has to stay connected the entire time; if the connection drops, the work is lost or has to be restarted, which frustrates users and wastes compute.

Because nothing is returned until the job completes, users get no feedback, which makes perceived latency feel even worse and encourages repeated retries that amplify load. Long-running jobs prevent shorter ones from getting through unless you build complex prioritization into an inherently rigid request/response model. Error handling is brittle: failures usually mean starting over, and naive retry logic can create cascading spikes. There's no straightforward way to give premium users priority, recover mid-job, or surface partial progress, so the experience feels slow, fragile, and opaque.

Here's what to do to make your model feel like a real product instead of a demo.

## Each generation request should be an asynchronous job

When a user asks for media, don't block the request. Enqueue the work (we used AWS SQS; you can also use RabbitMQ, Google Pub/Sub, or another durable queue). Return a job token immediately. That token lets you resume if the connection drops, retry failures, and apply different policies for different kinds of jobs, premium users, short previews, or heavy-resolution work when load is high.

You don't need to wait for the entire file to finish. As soon as a chunk is ready (a few seconds of audio or initial video frames), push it over a WebSocket to the client. The player starts playback, the user sees or hears something, and confidence builds. First sound or frame should appear in about five to seven seconds, while the rest continues generating in the background.

Not all jobs are the same. Batch smaller, fast jobs together, delay or throttle high-cost media when the system is saturated, and let important users get priority. This isn't simple round-robin; it's about balancing latency, fairness, and system pressure in real time.

Issue scoped tokens when a job is created. Sign URLs for each chunk. If a WebSocket drops, let the client reconnect and pick up where it left off. Failures should degrade gracefully, nothing should require the user to start over.

Glue the pieces with serverless compute. You can use AWS Lambda to validate tokens, poll the queue, invoke the model, package chunks, and push them over WebSockets. Lambdas scale with demand and keep cost tied to actual work instead of idle infrastructure.


## We can help

You could go build this yourself. The thing is: we already built it for a client.

In ten weeks, we took their internal generative media model and turned it into a product-grade pipeline. What could have been a blocking API call with unpredictable latency is an asynchronous streaming system. They got first bits in under seven seconds. Thousands of concurrent jobs ran without losing state on reconnect, and even the 99th percentile of long-running jobs stayed smooth from start to finish. It stopped feeling like a prototype and started feeling like something real users relied on.

![Generative AI Architecture Diagram](/images/building-streamable-scalabe-architecture-for-ai-media-generation/diagram.jpg)

If your media generation pipeline still feels slow, brittle, or hard to scale, you don't have to figure it all out alone. We've done this. 

Let's get your system to the point where users stop waiting and start engaging.

