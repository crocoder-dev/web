---
title: "The CrowdStrike and Microsoft Incident"
description: "CrowdStrike's Falcon Sensor update caused \"blue screens of death\" on millions of Windows systems."
createdAt: 1721473493000
updatedAt: 1721554208034
authors: ["david"]
category: "AWS"
editors: ["velimir"]
draft: false
abstract: "On July 19, 2024, CrowdStrike's Falcon Sensor update caused widespread disruptions on millions of Windows systems, leading to \"blue screens of death\" and boot loops. The issue, an erorr in the C++ code of a system driver, impacted aviation, media, banking, and healthcare sectors, grounding flights and disrupting emergency services. This incident highlights a failure in CrowdStrike's development and deployment processes, as such errors should be caught by automated code sanitization tools. It underscores the importance of rigorous testing, CI/CD practices, and phased rollouts to prevent widespread disruptions in critical systems. Robust testing and deployment strategies are essential, even with memory-safe programming languages."
image: "/images/crowdstrike-microsoft-incident-breakdown.png"



On July 19th, 2024, CrowdStrike released a critical update for their Falcon Sensor vulnerability scanner, which led to widespread disruptions across millions of Microsoft Windows systems.

This update caused numerous Windows machines to experience "blue screens of death" and enter a boot loop. The incident affected almost every sector, including aviation, media, banking, and healthcare, grounding commercial flights, and disrupting emergency services.

### Technical Issue

At first, it looked like there was an error related to [NULL pointer dereference](https://cwe.mitre.org/data/definitions/476.html) in the C++ code. But at further decompiling of the code you can see the NULL check before the dereference. The program was reading pointers from a table in a loop, and some were invalid. Probably this is an error in parsing of a configuration file, which left [some entries uninitialized](https://cwe.mitre.org/data/definitions/824.html).

Usually, errors like this are caught by automated code sanitization tools. These tools detect and fix common coding errors during development, providing immediate feedback to developers and helping them catch errors early and thoroughly analyze the code.

That's why it is so strange to see this kind of error pushed to production, especially in a system driver.

### Opinion: The Importance of Testing and Deployment Practices

This doesn't seem like a problem of a single developer writing faulty code but rather a failure of all guardrails and safety nets provided by CI/CD, review processes, automated tools, testing, and deployment strategies.

Many developers have pointed out and criticized the software development department in CrowdStrike for not catching this issue with tests before deploying the update. While testing is crucial in any codebase, no system catches 100% of bugs, and they can slip through even with the most rigorous testing.

Critical updates should be rolled out slowly as a "canary," starting with a small random sample of users. If the update causes issues in this initial phase, the rollout should be stopped immediately to prevent a broader impact. Such a phased approach has been a standard practice for decades and is crucial for mitigating risks associated with software updates.

The lack of guardrails and safety nets for your developers and the butchering of the whole release process is embarrassing.

### Conclusion

This incident didn't happen because of a single developer's mistake and certainly didn't happen because of using a non-memory-safe language like C++. Memory-safe programming languages like Rust can save you from NULL pointer dereference and accessing uninitialized variables, but they can't compensate for poor testing and deployment strategies. This incident was a systematic failure at every layer of the company, which allowed a critical bug to slip through and cause widespread disruptions.

At least the fact that CrowdStrike succeeded where Y2K failed is somewhat impressive.
