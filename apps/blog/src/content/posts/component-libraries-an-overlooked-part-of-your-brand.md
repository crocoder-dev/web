---
title: "Internal component libraries - an overlooked part of your brand"
description: ""
date: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editor: ["velimir"]
abstract: ""
image: ""
draft: false
---

Whether you are delivering a new product to the target market or improving an existing one to drive sales, chances are you are actively investing in your product’s UI/UX design. After all, good design means doing good business - it shows credibility, facilitates trust, and makes the user feel involved.

The hefty price tag which comes along with high-quality design is a justified expense for companies large and small because of the straightforward value it brings to the products. There are hundreds of small details which make up a visually stunning, easy, and pleasant to use UI. Those details have a visible effect on lower customer acquisition costs, increased customer retention, and other equally critical metrics used to measure how well a product is doing.

Design is also widely regarded as a tool that can facilitate reaching the desired perception of a product or, in other words, help create and maintain the ever-so-important promise of a brand.

## Design systems vs. component libraries

As a result of their work, a design team will produce product pages, prototypes, and specifications, one of which is the design system - a collection of reusable functional elements. This specification is a single source of truth for components and patterns alike and shows clear standards which product teams use to create a consistent experience across a range of products. It’s the core of the entire design and an important aspect of its brand identity.

![An iMac displaying a design system on the screen](/images/component-libraries-an-overlooked-part-of-your-brand/design-system-on-a-mac.png)

Once you have the design system specification, it makes sense to implement something similar in the code to reduce duplication, improve cross-team collaboration, and drive product scalability - all while making sure the UI is consistent.

In my opinion, a component library is related to a design system much in the same way a car is to its blueprint, or an object is to its class. Both are building blocks used to create products, each in its own domain - the design system allows quick and consistent creation of designs, while component libraries allow their consumers swift and consistent UI implementation. Even though they do not need to be (and usually are not!) a one-to-one match in terms of exact components, a component library is an implementation of the design system and should be viewed as a means to help a company maintain its brand.

## Using third-party component libraries

Investing in UI/UX can be a bit tricky. You can have all the right people, new bright and shiny specifications, but if they do not come to life the way they are supposed to, the investment will not have the desired return. That's why I find it strange when companies spend lots of money and time (hey, more money!) perfecting their design and the overall user experience of the product but are not keen on spending nearly as much when it comes to design implementation.

I have heard one too many times that you should pick and choose your development battles as an argument to diminish the value of building an internal component library. Every time there was a single underlying idea behind it - the effort that needs to be invested in building an internal component library is too high compared to what is gained. Therefore, building internal component libraries is a waste of time because there are some great existing third-party options out there. These component libraries are presented as low-effort options which increase developer velocity and solve all your UI implementation problems.

But is that really the case?

## How good are third-party component libraries for your brand (and your dev team)?

I find favoring third-party solutions somewhat short-sighted, considering the emphasis most businesses put on branding and the amount of money they put into design. When deciding on your approach, you should account for several factors, but I’d suggest focusing on the most relevant ones from a programmer’s perspective: development velocity, maintenance effort, and flexibility.

Third-party libraries are effective when aiming for development velocity, but unless they look exactly like your product should, they always need to be modified to match your UI and UX goals. It seems deceptively easy to modify and debug third-party component libraries but your team will need to deep dive into how that third-party library was made to achieve that same look and feel described by your design system. This is true for both modifying components as well as debugging issues within them, and there is just no other way around it. Your development team will need to become experts in using the third-party component library and know much more than the average consumer if they wish to keep delivering new features at a high velocity.

An existing component library can perhaps give you momentum in the beginning if you are willing to look past some design discrepancies, but as soon as you start to harmonize all those hundreds of small details present in your design, you will notice a significant drop in development velocity.

![A man in a white t-shirt sitting in a booth while struggling with something on his laptop](/images/component-libraries-an-overlooked-part-of-your-brand/struggling-with-the-ui.png)

Additionally, third-party component libraries tend to cover more cases than you might need. They have substantial code complexity hidden inside because they are codebases covering a range of features (yup, even for legacy browsers) and developers maintaining them are professionals with a specific skill set who might introduce different abstractions from the ones you and your team are used to. When building something yourself, you limit what components you want to implement, how they will behave, and decide which abstractions and concepts to use.

Deep diving into someone else’s code takes not only time (as mentioned before) but also substantial effort. Because of the hidden code complexity, I have found that, in practice, it’s easier to write and maintain your own internal component library code, which almost always includes a subset of components and their functionalities compared to a third-party one.

The reason *why* it’s easier lies in the fact that it does not need to cover every browser and every conceivable use-case, it just needs to cover your use-cases as specified in your design system.

!["A man in a blue plaid shirt doing some work organization by setting different sticky notes next to each other](/images/component-libraries-an-overlooked-part-of-your-brand/work-organization.png)

Another unwanted consequence of using third-party libraries is working with the constraints set by developers outside your team. Maybe these constraints are tied to how the code functions, giving headaches to your team by introducing some complex abstractions. Perhaps the constraint is a design or a performance-related trade-off built into the component library impacting the majority of your customers.

All in all, these constraints will impact your product development. Most of them will bother the development team, but whenever there is a problem your development team cannot solve, the before-mentioned issue will spill into the design team, forcing them to rethink their solution. A series of compromises will be required time and time again, and something that was initially supposed to help you will add to more implementation problems and change how your product looks and feels, which has the potential to damage the perception of your brand.

## Conclusion / My two cents

Remember - your digital product is a touchpoint to your brand, and if we’re considering a SaaS product, it’s the only touchpoint for the vast majority of your customers.

The experience your customers have with your digital product can either reinforce perceptions of the brand or break them down. Minuscule discrepancies in design can do a lot of damage if you are trying to position yourself as a trustworthy, high-quality, or premium product.

It’s not only about visuals but the behavior as well - how customers interact and engage with your product is going to be important too. A design system is a specification describing the visuals and user interaction. Properly translating components from the design system into code is crucial for maintaining your brand perception. It may seem simple and quick to use a third-party component library instead of developing an internal one, but in practice, this is not the case whenever your own UI has noticeable dissimilarities with third-party components.

If you are spending money on custom UI/UX, you should also be spending money in the development department to implement an internal component library, which will help you bring those designs to life.

Only by building your own component library will you possess enough flexibility to ensure the components used to build your product match the design system specification in a way that does not damage your brand.
