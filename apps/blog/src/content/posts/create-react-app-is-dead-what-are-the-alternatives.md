---
title: "Create React App is dead! What are the alternatives?"
description: ""
createdAt: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "Learn Javascript"
editors: ["velimir"]
abstract: ""
image: "/images/create-react-app-is-dead-what-are-the-alternatives.jpg"
draft: false
---


[Create React App (CRA)](https://github.com/facebook/create-react-app) was once the go-to tool for creating new React projects. It provided a simple and easy-to-use command-line interface (CLI) for setting up new React codebases, complete with a development server, automatic transpilation, and more. 

However, it seems that the days of CRA are numbered, with over [400 open pull requests](https://github.com/facebook/create-react-app/pulls) and a lack of recent updates. 

Allow me to show you some CRA alternatives that we personally use at CroCoder. Alternatives that have advanced features, a more flexible and customizable development experience, and are actively maintained.

**UPDATE:** React team doesn't recommend CRA for new projects anymore. [Read the full explanation here](https://react.dev/learn/start-a-new-react-project#building-with-a-full-featured-framework).

**UPDATE:** Dan Abramov (member of the React Core team) explained the future plans to turn Create React App into a launcher. Dan also shares the past and current vision for CRA. [Read the full explanation here](https://github.com/reactjs/reactjs.org/pull/5487#issuecomment-1409720741).

## Contents

## Vite + React

[Vite](https://vitejs.dev/) + React is a great alternative to Create React App (CRA) because it offers superior performance and faster development time. Unlike CRA, which can experience progressive speed and performance deterioration as an application grows in size and complexity, Vite is built on top of esbuild (a JavaScript bundler written in Go), which bundles dependencies 10-100 times faster than JavaScript-based bundlers. Additionally, Vite uses the browser's native ESM to parse and compile code as it is requested. Vite also provides extensive plugin compatibility and faster updates compared to CRA, making it a more efficient and effective choice for building React applications.

Another benefit of using Vite + React is that it allows for faster build times. Vite uses the browser's native ESM to parse and compile code on-demand, eliminating the need for a separate build step. This means that you can see changes immediately upon starting development, without having to wait for a build to finish. Additionally, Vite allows for absolute imports, which makes it easier to manage and organize your codebase. In contrast, CRA uses relative imports, which can lead to longer and more complex import paths.

Furthermore, Vite supports environment variables that can be used to configure your application based on the environment it is running in, which can be very useful in both development and production.

Overall, Vite + React is a great alternative to Create React App because it offers faster development times, better performance, and more efficient build processes. It also provides extensive plugin compatibility and support for absolute imports and environment variables, making it a more powerful and flexible option for building React applications.

The website that you are reading right now was built by using Vite + React, and we are more than pleased with it. With minimal configuration, we have managed to add a static build + [Islands architecture](https://www.patterns.dev/posts/islands-architecture/) support, and we are now able to deploy it to Vercel in a matter of minutes. 

Check out the [Vite docs](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) and try it out yourself!

```bash
# Create Vite + React app using npm
npm create vite@latest vite-react-app -- --template react-ts

# Create Vite + React app using yarn
yarn create vite --template react-ts

# Create Vite + React app using pnpm
pnpm create vite --template react-ts
```


## Next.js

[Next.js](https://nextjs.org/) is a frontend framework that is built on top of React and is designed to improve the performance, user experience, and SEO of web applications. It provides an out-of-the-box solution for server-side rendering (SSR) of React components, which allows for simple indexable HTML to be sent to the user, making it easier for web crawlers to read the text content of the application, thereby improving its visibility in search engines. 

Next.js also offers features for incremental static regeneration (ISR) and static site generation (SSG), which can improve the speed of a website but is less suitable for interactive web applications that take a lot of user input. 

It is considered to be one of the most popular tools in the React ecosystem and is used by many leading companies.

Another advantage of Next.js is that it provides a simple, easy-to-use development environment that allows developers to focus on their code rather than configuring build tools. It comes with a built-in development server, Hot Module Replacement (HMR), and automatic code splitting, which can speed up development time.

In summary, Next.js is a popular frontend framework that provides an out-of-the-box solution for server-side rendering of React components, which can improve the performance, UX as well as SEO of web applications. It offers features for incremental static regeneration and static site generation, it's built on top of React and is compatible with popular React tools. It is production-ready and it also provides a simple development environment.

Create your own Next.js starter and read the [Next.js docs](https://nextjs.org/docs/getting-started) to learn more about it!

```bash
# Create Next.js app using npm
npx create-next-app@latest --ts

# Create Next.js app using yarn
yarn create next-app --typescript

# Create Next.js app using pnpm
pnpm create next-app --ts
```

## T3 Stack 

The T3 Stack is a web development stack that focuses on simplicity, modularity, and full-stack type safety. The core components of the stack include Next.js, a JavaScript framework for server-side rendering of React components, and TypeScript. Other popular additions to the stack include Tailwind CSS, a utility-first CSS framework, and tRPC, a library for building type-safe remote procedures. 

The stack is designed to be modular, which means that developers can swap out different pieces as needed for their specific project. Stack is also opinionated, and follows a set of core beliefs such as solving specific problems, bleeding responsibly, and considering type safety as non-optional.

I can't recommend the T3 Stack enough, it feels like a breath of fresh air in the React ecosystem.

If you haven't used it before, you should definitely give it a try. Learn more about it in the [T3 Stack docs](https://create.t3.gg/en/introduction), and if you want to set up your monorepo by using t3 Stack project, take a look at [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo).

```bash
# Create T3 Stack app using npm
npm create t3-app@latest

# Create T3 Stack app using yarn
yarn create t3-app

# Create T3 Stack app using pnpm
pnpm create t3-app
```

## Conclusion

Ultimately, the decline of Create React App should not be seen as a negative thing. It simply means that the community has evolved and progressed, and there are now better and more advanced tools available for building React applications.

One of the key benefits of using an alternative to Create React App is that they often provide more advanced features and capabilities. These features can help improve the performance and scalability of your React application, making it a better choice for production use.

Another benefit of using an alternative to Create React App is that they often have a more active and engaging community. For example, Next.js has a large and active community, with many developers sharing their experiences and solutions through online tutorials and forums. This can be incredibly valuable for developers who are new to React or who are looking for help and support with specific issues or challenges.

In summary, while Create React App may be "dead", the React ecosystem is still alive and well. There are many alternatives available that can provide an equally good or even better development experience, and it's worth considering them for your next React project. Whether you choose Next.js, Vite + React, or another alternative, you can be confident that you're using a tool that is well-supported, actively maintained, and built using the best contemporary professional practices.
