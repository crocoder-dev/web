---
title: "How We Migrated an Enterprise App from AngularJS to React Without Downtime"
description: "Discover how we helped sevdesk migrate from AngularJS to React with zero downtime or feature freezes. Learn how incremental refactoring, team enablement, and smart process alignment led to lasting success."
createdAt: 1754055975883
updatedAt: 1754055975883
authors: ["ante"]
category: "Case Study"
editors: ["velimir"]
abstract: "Migrating a live product to a new framework isn’t just a technical challenge—it’s an organizational one. In this post, I share how we partnered with sevdesk to navigate the end of AngularJS support and transition their accounting software to React without downtime, feature freezes, or disrupting users. From introducing hybrid architectures to embedding knowledge transfer through workshops, pair programming, and team mentoring, we focused on enabling sevdesk’s developers to own the new codebase. This story highlights why successful migrations depend not only on clean code, but on shared ownership, developer motivation, and changes that stick long after the migration is done."
iimage: "/images/from-angular-to-react.png"
draft: false
---

Migrating from one framework to another is never a simple task, especially when it involves a live product used by thousands of customers. When a client reached out to us, they were facing the end of support for AngularJS and needed a plan to modernize their app without disrupting the user experience. This is the story of how we partnered with them to navigate a high-stakes migration to React, without downtime, feature freezes, or loss of momentum.

## Contents

## The client’s concerns

Our client was **sevdesk**, a company that offers online accounting and invoicing software. It is trusted by over 130 000 companies and users to help manage finances, create invoices, track expenses, and handle accounting tasks without needing advanced accounting knowledge.

Since the end of support for AngularJS/Angular 1.6, sevdesk faced a major turning point. Without new patches, AngularJS applications became exposed to increasing security risks, especially as new browser vulnerabilities emerged. This posed a serious problem since the app handles sensitive financial data.

Most third-party libraries dropped support for AngularJS, meaning that developers would have to stop updating dependencies to avoid breaking changes or maintain their own forks. This may seem like a minor inconvenience, but outdated dependencies can lead to additional security issues. On the other hand, maintaining forked libraries adds extra complexity and a risk of future incompatibilities with other libraries. 
Another pressing issue was the shift in the developer landscape, as knowledge of AngularJS became a *legacy skill*. Finding new developers became more difficult, raising concerns about long-term maintainability and limiting the growth of the company.

Considering the risks of continuing with AngularJS, sevdesk decided that the migration was crucial for the future of the company and chose to adopt React instead of Angular due to its long-term advantages. Since their development team lacked experience working with React and was facing significant changes to both the product and the company, sevdesk reached out to us to help execute this large-scale migration as smoothly as possible.

## Migration Risks and the Importance of Knowledge Transfer

Poorly planned migration strategies can introduce significant risks. Dividing internal resources into separate teams for maintenance and migration can stretch capacity thin, leading to slower progress on both fronts. While involving external teams may seem efficient, it can result in a disconnect between those maintaining the current system and those executing the migration. More critically, if the migration is heavily reliant upon an external team without adequate knowledge transfer, the internal team may struggle to maintain and update the new system once the external team departs. In the worst-case scenario, this leads to wasted time and resources, and a product that is harder to support than the one it replaced.

Moreover, it's important to recognize that few organizations have the luxury of completely stopping application development during a migration. Long feature freezes are rarely feasible, so successful migrations must be designed to occur incrementally and with minimal disruption to ongoing development. To ensure sevdesk avoided these risks, we worked hand-in-hand with their developers to execute the migration in a way that safeguarded development stability and ensured future maintainability.

## Our goals and requirements

Since our end goal was to ensure that the development team is equipped to maintain the app well into the future, we knew that simply delivering the migration wasn’t enough. That’s why we made knowledge transfer our top priority.

In order to minimize disruption, we needed a clear understanding of the requirements and the development team's workflow. To gain this insight and fully grasp the motivation behind the migration, we began with an introductory period to familiarize ourselves with the project and the developers.

Additionally, the app needed to remain fully operational, with zero downtime, as something like that could lead to a negative user experience and potential client loss. Secondly, there would be no feature freeze, meaning feature development would continue alongside the migration process. This was something that impacted our decision regarding the migration strategy because there was a potential risk that the development team could get overwhelmed trying to keep up with everything.

## Our approach

We see ourselves as the client’s teammates, partners even, and not just outsiders. We integrate into the client’s process with care and attention to their existing ways of working. We aim to be as involved as possible by familiarizing ourselves with their development team’s domain and working methods. By reviewing their roadmap, we gain insight into upcoming changes and features, ensuring we remain up to date with the status of the project.

We participate in their retrospectives and planning sessions to ensure alignment and effective preparation for upcoming tasks. We also actively communicate with their developers, providing support and guidance in implementing new features and in future planning. On the technical side, we take significant measures to ensure that feature development and migration work happen on the same codebase, preventing divergences and minimizing integration risks. This helps us maintain a positive and productive collaboration with both the developers and the client.

When it comes to sharing knowledge, we recognize that not everyone learns at a fixed pace. We present the developers with multiple approaches and encourage them to engage with the ones they find most helpful, including workshops, group coding sessions, and pair programming.

Whenever we are tasked with large codebase initiatives, we are always on the lookout for developers who are eager to learn and collaborate, as their motivation and involvement are essential for driving successful migrations and ensuring that the resulting systems remain maintainable long after our work is done.

By fostering this kind of mutual trust and continuous learning, we leave teams better equipped to evolve confidently even after our engagement has ended.

## Getting to Know the teams

At the time, sevdesk developers were divided into smaller teams and everyone had a clear sense of ownership over their respective domains within the app. We met with every team to gain a better understanding of their domain, the upcoming features they were responsible for implementing, and how we could best support them. However, the complexity of the migration introduced coordination challenges that could not be fully addressed within the existing team structure. To address this without disrupting the development team, we proposed the creation of a new team dedicated to the migration and all React-related tasks—the Core team. The Core team consisted of two developers from CroCoder and additional developers assigned by sevdesk to help with the migration.

## How We Drove the Outcome

### Handling Feature Development During the Migration

Our development started with creating a new component library and rewriting old AngularJS components in React. Since there was no feature freeze, other developers continued adding new features to the app while we simultaneously rewrote the components. The addition of new features required new components, but adding them to the existing Angular component library didn’t make sense, as it would result in unnecessary code that would ultimately be replaced later. That is why we came up with a solution that would allow the developers to continue adding new features in the Angular app and use the new React components at the same time. Enter the Angular Wrapper.

The Angular Wrapper is a component we created in Angular to wrap React components, allowing them to be used as if they were native Angular components. This hybrid approach allowed both frameworks to exist at the same time, enabling an incremental transition from the old framework to the new one within the existing codebase. Using this tool allowed us to continue rewriting old components and building new ones directly in the React component library. As a result, new features were built in React, reducing the need for rewrites and helping developers gradually get up to speed with React through hands-on feature development.

### Making the Shift Easier for Developers

Aside from the technical changes that had to be made, we needed to focus on mentoring the developers to learn React, and quickly. To get an idea of the developers’ knowledge of React, we created a poll where they assessed how familiar they are with the framework. The results showed that not a lot of developers had any experience with React, meaning we needed to start with the basics and gradually work our way to more complex aspects. The maintenance and updates of the app made this more challenging, as it left the developers with limited time to focus on learning. This is where our approach of identifying motivated developers came into play: those eager to learn were mentored first, which enabled them to support their teammates with React-related tasks and help spread the knowledge across the organization.

### React Workshops

We organized a range of workshops, from React 101 to more advanced topics, repeating each session to accommodate different schedules and ensure everyone could attend. These sessions provided a theoretical foundation through presentations and code examples, while also helping us identify developers eager to learn and support the migration. Their motivation was key to successful knowledge transfer; without their engagement, the project risked becoming difficult to maintain after our involvement ended.

### Knowledge Sharing Through Group Sessions

At sevdesk, a company-wide decision allowed developers to take one day each month away from product work to focus on projects of their own choosing. We adopted this concept and proposed organizing group coding sessions on that day. Unlike the more theoretical workshops, these interactive sessions focused on coding in React. We covered the basics such as creating simple pages, building components, managing state, navigating between pages, etc.

Other developers would follow along, try coding something on their own, and ask questions whenever something was unclear. To ensure that every part of the code was properly migrated and maintainable in the future, we made sure to invite a few developers from each team to participate.

### Pair programming

Pair programming turned out to be a highly effective method for hands-on coding support in this project. Initially, developers were hesitant to ask for help, so we took the initiative by offering guidance on new features and React. After a few programming sessions, developers started reaching out on their own, asking for support and assistance with adding new components.

## The Turning Point

When it comes to large initiatives and changes, it may take some time to see the fruits of your labor, but that doesn’t mean you are on the wrong track. Our efforts proved effective when two developers from the same team reached out to us requesting new components. Unlike before, when such tasks were assigned to the Core team, they now wanted to build the components themselves with our support. This was a huge step forward, as it showcased the willingness and motivation of the developers to start coding in React and participate in the migration. After a few pair-programming sessions, the first components not created by the Core team were added to the new component library. Because of this, the two developers continued working on maintaining these components independently.

Following this, an increasing number of developers from different teams started reaching out to us, eager to try coding in React with our support. In some cases, the learning process was faster, in others slower, but the end result was the same: they successfully contributed to the migration. This led to more teams having developers capable of maintaining the new React code without relying solely on the Core team.

As the number of developers who grasped the basics of React increased, the task of educating the rest of the developers also shifted from the Core team. This reassured us that we were on the right path to finalize the migration, and that the developers will be able to maintain and improve the code on their own.

## Key Takeaways

When migrating from one framework to another, there’s no one-size-fits-all solution. Each project has its own unique challenges shaped by the development team, existing architecture, and long-term goals. 

Key elements of a successful migration include:

- Creating a strategy tailored to your specific needs that aligns with both your team and product
- Remaining flexible throughout the process and being prepared for unexpected issues or changes
- Prioritizing a smooth experience by focusing on both developer workflows and end-user satisfaction

By getting to know the client, the development team, and the product, we were able to plan out the migration strategy that worked for sevdesk. We helped them to carry out a smooth migration with zero downtime, no feature freezes, all while maintaining a high-quality developer and user experience. During our collaboration, we emphasized that technical excellence must go hand in hand with organizational changes and adaptations—without this alignment, improvements tend to be short-lived. Alongside the migration, we shared our knowledge of React and best practices with the development team, equipping them with the tools needed to maintain and upgrade the product well into the future.

If you need support planning your own migration, feel free to <ins>[contact us](Migrating from one framework to another is never a simple task, especially when it involves a live product used by thousands of customers. When a client reached out to us, they were facing the end of support for AngularJS and needed a plan to modernize their app without disrupting the user experience. This is the story of how we partnered with them to navigate a high-stakes migration to React, without downtime, feature freezes, or loss of momentum.

## Contents

## The client’s concerns

Our client was **sevdesk**, a company that offers online accounting and invoicing software. It is trusted by over 130 000 companies and users to help manage finances, create invoices, track expenses, and handle accounting tasks without needing advanced accounting knowledge.

Since the end of support for AngularJS/Angular 1.6, sevdesk faced a major turning point. Without new patches, AngularJS applications became exposed to increasing security risks, especially as new browser vulnerabilities emerged. This posed a serious problem since the app handles sensitive financial data.

Most third-party libraries dropped support for AngularJS, meaning that developers would have to stop updating dependencies to avoid breaking changes or maintain their own forks. This may seem like a minor inconvenience, but outdated dependencies can lead to additional security issues. On the other hand, maintaining forked libraries adds extra complexity and a risk of future incompatibilities with other libraries. 
Another pressing issue was the shift in the developer landscape, as knowledge of AngularJS became a *legacy skill*. Finding new developers became more difficult, raising concerns about long-term maintainability and limiting the growth of the company.

Considering the risks of continuing with AngularJS, sevdesk decided that the migration was crucial for the future of the company and chose to adopt React instead of Angular due to its long-term advantages. Since their development team lacked experience working with React and was facing significant changes to both the product and the company, sevdesk reached out to us to help execute this large-scale migration as smoothly as possible.

## Migration Risks and the Importance of Knowledge Transfer

Poorly planned migration strategies can introduce significant risks. Dividing internal resources into separate teams for maintenance and migration can stretch capacity thin, leading to slower progress on both fronts. While involving external teams may seem efficient, it can result in a disconnect between those maintaining the current system and those executing the migration. More critically, if the migration is heavily reliant upon an external team without adequate knowledge transfer, the internal team may struggle to maintain and update the new system once the external team departs. In the worst-case scenario, this leads to wasted time and resources, and a product that is harder to support than the one it replaced.

Moreover, it's important to recognize that few organizations have the luxury of completely stopping application development during a migration. Long feature freezes are rarely feasible, so successful migrations must be designed to occur incrementally and with minimal disruption to ongoing development. To ensure sevdesk avoided these risks, we worked hand-in-hand with their developers to execute the migration in a way that safeguarded development stability and ensured future maintainability.

## Our goals and requirements

Since our end goal was to ensure that the development team is equipped to maintain the app well into the future, we knew that simply delivering the migration wasn’t enough. That’s why we made knowledge transfer our top priority.

In order to minimize disruption, we needed a clear understanding of the requirements and the development team's workflow. To gain this insight and fully grasp the motivation behind the migration, we began with an introductory period to familiarize ourselves with the project and the developers.

Additionally, the app needed to remain fully operational, with zero downtime, as something like that could lead to a negative user experience and potential client loss. Secondly, there would be no feature freeze, meaning feature development would continue alongside the migration process. This was something that impacted our decision regarding the migration strategy because there was a potential risk that the development team could get overwhelmed trying to keep up with everything.

## Our approach

We see ourselves as the client’s teammates, partners even, and not just outsiders. We integrate into the client’s process with care and attention to their existing ways of working. We aim to be as involved as possible by familiarizing ourselves with their development team’s domain and working methods. By reviewing their roadmap, we gain insight into upcoming changes and features, ensuring we remain up to date with the status of the project.

We participate in their retrospectives and planning sessions to ensure alignment and effective preparation for upcoming tasks. We also actively communicate with their developers, providing support and guidance in implementing new features and in future planning. On the technical side, we take significant measures to ensure that feature development and migration work happen on the same codebase, preventing divergences and minimizing integration risks. This helps us maintain a positive and productive collaboration with both the developers and the client.

When it comes to sharing knowledge, we recognize that not everyone learns at a fixed pace. We present the developers with multiple approaches and encourage them to engage with the ones they find most helpful, including workshops, group coding sessions, and pair programming.

Whenever we are tasked with large codebase initiatives, we are always on the lookout for developers who are eager to learn and collaborate, as their motivation and involvement are essential for driving successful migrations and ensuring that the resulting systems remain maintainable long after our work is done.

By fostering this kind of mutual trust and continuous learning, we leave teams better equipped to evolve confidently even after our engagement has ended.

## Getting to Know the teams

At the time, sevdesk developers were divided into smaller teams and everyone had a clear sense of ownership over their respective domains within the app. We met with every team to gain a better understanding of their domain, the upcoming features they were responsible for implementing, and how we could best support them. However, the complexity of the migration introduced coordination challenges that could not be fully addressed within the existing team structure. To address this without disrupting the development team, we proposed the creation of a new team dedicated to the migration and all React-related tasks—the Core team. The Core team consisted of two developers from CroCoder and additional developers assigned by sevdesk to help with the migration.

## How We Drove the Outcome

### Handling Feature Development During the Migration

Our development started with creating a new component library and rewriting old AngularJS components in React. Since there was no feature freeze, other developers continued adding new features to the app while we simultaneously rewrote the components. The addition of new features required new components, but adding them to the existing Angular component library didn’t make sense, as it would result in unnecessary code that would ultimately be replaced later. That is why we came up with a solution that would allow the developers to continue adding new features in the Angular app and use the new React components at the same time. Enter the Angular Wrapper.

The Angular Wrapper is a component we created in Angular to wrap React components, allowing them to be used as if they were native Angular components. This hybrid approach allowed both frameworks to exist at the same time, enabling an incremental transition from the old framework to the new one within the existing codebase. Using this tool allowed us to continue rewriting old components and building new ones directly in the React component library. As a result, new features were built in React, reducing the need for rewrites and helping developers gradually get up to speed with React through hands-on feature development.

### Making the Shift Easier for Developers

Aside from the technical changes that had to be made, we needed to focus on mentoring the developers to learn React, and quickly. To get an idea of the developers’ knowledge of React, we created a poll where they assessed how familiar they are with the framework. The results showed that not a lot of developers had any experience with React, meaning we needed to start with the basics and gradually work our way to more complex aspects. The maintenance and updates of the app made this more challenging, as it left the developers with limited time to focus on learning. This is where our approach of identifying motivated developers came into play: those eager to learn were mentored first, which enabled them to support their teammates with React-related tasks and help spread the knowledge across the organization.

### React Workshops

We organized a range of workshops, from React 101 to more advanced topics, repeating each session to accommodate different schedules and ensure everyone could attend. These sessions provided a theoretical foundation through presentations and code examples, while also helping us identify developers eager to learn and support the migration. Their motivation was key to successful knowledge transfer; without their engagement, the project risked becoming difficult to maintain after our involvement ended.

### Knowledge Sharing Through Group Sessions

At sevdesk, a company-wide decision allowed developers to take one day each month away from product work to focus on projects of their own choosing. We adopted this concept and proposed organizing group coding sessions on that day. Unlike the more theoretical workshops, these interactive sessions focused on coding in React. We covered the basics such as creating simple pages, building components, managing state, navigating between pages, etc.

Other developers would follow along, try coding something on their own, and ask questions whenever something was unclear. To ensure that every part of the code was properly migrated and maintainable in the future, we made sure to invite a few developers from each team to participate.

### Pair programming

Pair programming turned out to be a highly effective method for hands-on coding support in this project. Initially, developers were hesitant to ask for help, so we took the initiative by offering guidance on new features and React. After a few programming sessions, developers started reaching out on their own, asking for support and assistance with adding new components.

## The Turning Point

When it comes to large initiatives and changes, it may take some time to see the fruits of your labor, but that doesn’t mean you are on the wrong track. Our efforts proved effective when two developers from the same team reached out to us requesting new components. Unlike before, when such tasks were assigned to the Core team, they now wanted to build the components themselves with our support. This was a huge step forward, as it showcased the willingness and motivation of the developers to start coding in React and participate in the migration. After a few pair-programming sessions, the first components not created by the Core team were added to the new component library. Because of this, the two developers continued working on maintaining these components independently.

Following this, an increasing number of developers from different teams started reaching out to us, eager to try coding in React with our support. In some cases, the learning process was faster, in others slower, but the end result was the same: they successfully contributed to the migration. This led to more teams having developers capable of maintaining the new React code without relying solely on the Core team.

As the number of developers who grasped the basics of React increased, the task of educating the rest of the developers also shifted from the Core team. This reassured us that we were on the right path to finalize the migration, and that the developers will be able to maintain and improve the code on their own.

## Key Takeaways

When migrating from one framework to another, there’s no one-size-fits-all solution. Each project has its own unique challenges shaped by the development team, existing architecture, and long-term goals. 

Key elements of a successful migration include:

- Creating a strategy tailored to your specific needs that aligns with both your team and product
- Remaining flexible throughout the process and being prepared for unexpected issues or changes
- Prioritizing a smooth experience by focusing on both developer workflows and end-user satisfaction

By getting to know the client, the development team, and the product, we were able to plan out the migration strategy that worked for sevdesk. We helped them to carry out a smooth migration with zero downtime, no feature freezes, all while maintaining a high-quality developer and user experience. During our collaboration, we emphasized that technical excellence must go hand in hand with organizational changes and adaptations—without this alignment, improvements tend to be short-lived. Alongside the migration, we shared our knowledge of React and best practices with the development team, equipping them with the tools needed to maintain and upgrade the product well into the future.

If you need support planning your own migration, feel free to <ins>[contact us](https://www.crocoder.dev/#book-a-call-section)</ins>!
