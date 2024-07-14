---
title: "What should be included in an internal component library"
description: ""
date: 1645837875000
updatedAt: 1645837875000
authors: ["danica"]
category: "AWS"
editor: ["velimir"]
abstract: ""
image: ""
draft: false
---

When working on internal component libraries, countless developers are reluctant to make decisive decisions - worrying about the overall impact their choices might have. This fear is not unfounded because internal component libraries are usually used and maintained by several teams that have a lot of autonomy over coding styles, who might have various opinions on scope and standards. These teams might even differ in size, consisting of a wide range of differently skilled members - hence building something a junior developer can use could be entirely different from a codebase intended for skilled seniors. With such a discrepancy, it’s only natural that the question of *which components should be included in our internal component library* is a tough one to answer.

As someone who’s been there, I know component libraries are not a one size fits all project. It takes time and effort to create a codebase that can be used by developers to build incredible products for their end users. While working with various teams I managed to gather important insight on building component libraries. Even though there might be numerous factors to account for, I wish to share some tips on how I approach this issue. Hopefully this will help you in deciding which components to include in your internal component library.

## Pay attention to your design (system)

One of the first things I do when working on implementing an internal component library is reach out to the design team and ask them to see all of their designs. If a company already has a design system specification, I will have my work cut out for me, and even if there is no design system, I will take a detailed look at the product designs.

Designs are what I inspect first in order to gain more clarity when determining component implementation. Observing all of the UI elements and their behavior in one place allows me to notice which of them could be a single component in terms of code and it helps me decide if it would make sense to expose such a component for all to use via the component library.

It may also help to take a look at the used nomenclature - having the same language between design and development departments helps when dealing with design and code inconsistencies that tend to happen regardless of how good both teams are. Keeping the nomenclature consistent can help prevent duplication of UI patterns in the code (having both a pill and a tag, for example).

If you are building your company's internal component library for the first time, creating a list of components that are going to be included is much easier when using the design files that you have at your disposal.

Alternatively, if you are working on a feature and you are considering implementing a new component as part of the the internal component library, going through the design files will help you discern if there already is a UI element that is similar to what you are building, eliminating the need for a new component altogether.

Ask yourself:
    - Is this component already a part of our design system?
    - Is this component present in our app’s design? Is it visible on multiple pages/layouts?
    - Can this component be constructed by using some of our existing components (quickly and easily) without creating large and messy code?

    If the answer to all of these questions is yes, you might have a good internal component library candidate.

## Check existing component libraries

Before jumping into code, it makes sense to check other existing component libraries, especially if your team is familiarized with a particular third-party component library. You do this for two reasons: to check which components exist in their codebase and to examine their API.

Going through existing component libraries makes it easier to outline which components you might want to add to your internal solution. You can cross-compare the design files and the list of components you wish to implement with a third-party component library. Doing this can help you identify any functionality gaps you might have because of missing UI elements. It also helps with categorizing visually similar internal library components into one.

Taking a detailed look at the API will help you decide how to expose a certain functionality in your codebase. Inspecting the API may be advisable in order to minimize your team's learning gap or to impose definite standards.

Keep in mind that the intention of this tip is not to blindly follow third-party implementation choices but to learn from their findings.

Ask yourself:
    - Is this component a part of other third-party component libraries?
    - Is this component a part of a package that exports a single component (like Airbnb Datepicker)?
    - When looking at our designs and comparing functionalities that we want to build to the ones in a third-party codebase, is there a significant match?

    If the answer to all of these questions is yes, you might have a good internal component library candidate.

## When applicable, make use of third-party components

Even though you are building an internal component library, this does not imply you need to implement every component and every behavior from scratch. If most components from a third-party suit your case, use what you can and focus your implementation efforts on those that are not easy to style or have different behavior.

Interactive tables or date pickers are good examples. These components are reasonably complex to implement, so unless your product’s key functionality revolves around them, it makes sense to introduce a dependency that implements them well (like [Airbnb Datepicker](https://react-dates.github.io/react-dates/?path=/story/daterangepicker-drp--default) 😀).

To limit the effect of the dependency on your code, implement a wrapper around the component hiding this dependency from your internal component library consumers. The wrapper will ensure that the API of that component is consistent with the ones your team built themselves and it will make it easier to switch up different third-party implementations should you need to do that.

Ask yourself:
    - Is there a third-party component library that matches our design system which has this component? (Alternatively, if the design is not a factor in our application and we don’t have custom UI/UX - do our developers know of a third-party component library that that has this component and are familiarized with it?)
    - Is this component outside of our domain, meaning, is it vital for implementing core features of our application?

    If the answer to all of these questions is no, you might have a good internal component library candidate.

## Utilize existing design pattern and widget guides

Web users expect components that look a certain way to also behave in a certain way. For example, clicking on a `<select>` should present the user with a list of options, and swiping in a gallery should display the subsequent image.

The components you implement should cover keyboard and touchpad-specific use cases and be accessible to everyone. This process is more straightforward when following a guide that lists all of the details in a single place and provides code examples that can be tested.

In addition to allowing you to be more thorough, the guide can also show you which components are well-known and frequent patterns or widgets that probably should be included in internal component libraries.

One of my favorite things to check is the [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/). If a design contains a look and feel equivalent of a widget specified in the guide, I usually recommend including such a component to the internal component library.

Ask yourself:
    - Is this component a part of standard patterns covered by the specifications (such as the ARIA Authoring Practices Guide)?
    - Would this component be a custom implementation of an HTML element (for example Select)?

    If the answer to all of these questions is yes, you might have a good internal component library candidate.

## Don't think of the internal component library as a shared folder

Make sure you and everyone on your team understand that the internal component library is not a shared folder. The primary idea behind a component library is not to reduce code duplication (although it is a nice side effect), but to provide developers with reusable UI patterns.

Typically, what happens during development with regards to a shared folder: people working on the project notice a similar code structure or behavior of different components, after which they extract them into a single location - making the code more easily available for others to use. This type of extraction can, and probably will happen to component libraries but do not let [The Rule of Three](https://blog.codinghorror.com/rule-of-three/) (of code duplication) influence your component picks. When considering whether or not to include a component to your internal component library, you should focus on *if someone could use this*, not *if someone used it (enough times)*.

For example, let’s say you have a gallery in an e-commerce project. This gallery might only be used for product display when a development team gets the design specification. However, this should not be a discriminatory factor for excluding it from the internal component library. A gallery, at its core, is a component for displaying multiple images - a pattern general enough to be used repeatedly, and as such, I’d argue, should be a part of the internal component library regardless of the number of times it is used across the design. Focus on the purpose of the component rather than *what team will use it* or *how many times it will be used*.

Ask yourself:
    - Can we envision the component being used by multiple developers? (Notice we are not asking ARE they using it)
    - Is this a UI pattern recurrent enough (from a product perspective) so that it makes sense to abstract and standardize it?

    If the answer to all of these questions is yes, you might have a good internal component library candidate.

## Conclusion

Every component library is different just as every team is different. The best internal component libraries are the ones that accommodate the developers that are using them to build products. When deciding on the contents of your internal component library make sure to integrate the expertise you have in the domain as well as the knowledge of the teams using it.

When in doubt, check the existing component libraries but do not follow their code blindly. Use it for guidance, not as a rule. No one knows your codebase and team members better than you. ❤️
