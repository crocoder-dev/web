---
title: "Microsoft's TypeScript Compiler Rewrite in Go is About More Than Speed"
description: ""
createdAt: 1741731756996
updatedAt: 1741731756996
authors: ["david"]
category: "AFTER WORK TALKS"
editors: ["velimir"]
abstract: ""
image: "/images/copy-paste-copilot.png"
draft: false
---

Microsoft's recent decision to [rewrite the TypeScript compiler using Go](https://devblogs.microsoft.com/typescript/typescript-native-port/) (Golang) got a lot of us talking, and honestly, for good reason. We, developers, are pretty attached to our tools, and whenever a big change is announced, we naturally wonder if this is really the best move?

First off, let's briefly acknowledge the obvious: rewriting a compiler is no small feat. It's like rebuilding a plane while still in flight. But Microsoft isn't just chasing trendy tech here. There's method behind the madness, and Go makes a surprisingly good fit for something like TypeScript.

Go isn't flashy. It's simple, straightforward, and practical. Go means choosing simplicity, clarity, and maintainability. For a compiler, especially one as widely used as TypeScript, clarity and maintainability are everything. Go’s minimalist syntax and clear structures mean contributors old and new can jump into the codebase faster and with less friction.

Concurrency is another natural fit. TypeScript's compiler does lots of heavy lifting: parsing, type checking, generating code... Doing multiple things at once? Go thrives in that environment. It’s literally built for it. Goroutines make juggling tasks easier, cleaner, and less error-prone.

The community around Go adds another layer of confidence. It’s mature, supportive, and packed with tooling designed to help developers do their best work. When you're managing something as foundational as TypeScript, having a supportive community and great tools can make all the difference.

Yes, Microsoft’s original announcement highlighted significant performance improvements, but honestly, the story here is bigger than compiler speed. It's about creating a sustainable, approachable, and developer-friendly future for TypeScript.

And personally, I'm here for it.

