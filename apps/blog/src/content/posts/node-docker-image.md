---
title: "A Dockerfile for BLAZINGLY FAST Dockerized Node.js apps"
description: ""
date: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editor: ["velimir"]
abstract: ""
image: "/images/node-docker-image.png"
draft: false
---

If you're tired of your Node.js app's Docker image being slower than a snail on a salt lick and more insecure than a password that's just the word "password", then you've come to the right place.

We have seen our fair shake of Dockerfiles that look like this:

```docker
FROM node

COPY . .

RUN npm install

CMD "npm" "start"
```

Even though this simple Dockerfile works, it's not even close to the best way to create a Docker image for your Node.js app.

In this article, we'll take you through some of the best practices for creating a Dockerfile that can make your Node.js app more efficient. We'll cover topics like setting the Docker base image tag, avoiding npm scripts, properly handling signals, and running containers as a non-root user.

By following these practices, you can create a Docker image that's faster, more secure, and more easily managed, so you can focus on developing your Node.js app rather than worrying about its deployment.

## Contents

## Explicitly set the Docker base image tag

If you set a tag for your base image, it ensures that the same image will always be used when building your Docker image. This means that your Docker image will behave consistently no matter where it is used.

I personally suggest using the latest LTS or current version of Node.js pinned to the minor version (as of March 13th that would be v18.15 or v19.7, but be sure to check out node at [hub.docker](https://hub.docker.com/_/node)). This ensures that you always get the latest security patches and bug fixes, along with a consistent build.

I recommend using the Alpine version of the Node.js image. This version is smaller and is easier to build compared to the default Debian-based image.

Additionally, using a smaller image reduces the attack surface area, making it more difficult for attackers to exploit any vulnerabilities. This approach also helps prevent issues that may occur after applying updates that may cause problems with our application to the base image.

After applying all of these steps, we should get a Dockerfile that looks something like this:

```docker
FROM node:19.7-alpine3.16

COPY . .

RUN npm install

CMD "npm" "start"
```

## Don't use npm scripts to run your node app

To give you full context with regards to this, I need to take a detour and explain how signals work in Linux and Unix systems.

If you are confident in your knowledge about how signals work, you can skip to [this section](#the-better-cmd-option) to get the updated **Dockerfile**.

### The signals problem explained in painful detail

In Linux and Unix systems, you can send signals to a running program or service to interact with it. It's a bit like a semaphore light that tells you when to stop or start driving. There are lots of different signals, and each of them has an assigned number.

Signal 15 named SIGTERM is used to tell a process to shut down. Signal 9, SIGKILL is the most well-known because it lets you forcefully terminate a process.

If you want to run and stop Dockerized Node.js applications properly, your app should receive these signals appropriately and shouldn't ignore them. 

When you run your Dockerized Node.js application using npm start, npm will start your application and then wait for it to exit. This means that if you send a signal to your container, it will be sent to npm, not your application. This is a problem because npm does not handle signals, so it will not be able to properly shut down your application.

### An example that proves the npm scripts problem

So let's run an example that shows this issue.

Create a new folder and write **`server.js`** that sets up an HTTP server that listens on port 3000. It also registers a handler function to handle the **SIGHUP** signal. SIGHUP was originally designed to notify the process of a serial line drop, similar to old telephony stuff.

```javascript
const http = require('http');

function handle(signal) {
  console.log(`Received signal: ${signal}`);
}
process.on('SIGHUP', handle);

const server = http.createServer();

server.listen(3000);
```

The **`require('http')`** statement loads the built-in HTTP module in Node.js, which provides an easy way to create HTTP servers and clients.

The **`handle(signal)`** function is called whenever the process receives the SIGHUP signal. The **`console.log()`** statement logs a message indicating that the signal has been received.

The **`process.on('SIGHUP', handle)`** statement registers the **`handle()`** function to be called when the SIGHUP signal is received by the process.

Finally, the **`http.createServer()`** statement creates an HTTP server that listens on port 3000.

After we have saved **`server.js`**, let's run **`npm init -f`**. This should generate our **`package.json`**.


```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```
The important thing is that our **`package.json`** has a start script like in the previous code snippet.

Let's create a **`Dockerfile`** file with our current **`Dockerfile`** setup.

```docker
FROM node:19.7-alpine3.16

COPY . .

RUN npm install

CMD "npm" "start"
```

Now let's open a terminal and run some commands.

```bash
docker build . -t npm-start-test-image

docker run --name npm-start-test-container npm-start-test

# open another terminal (or tab) 
docker kill --signal=SIGHUP npm-start-test-container
```

The first command **`docker build . -t npm-start-test-image`** builds a Docker image from the Dockerfile in the current directory **`(.)`** and tags it with the name "npm-start-test-image".

The second command **`docker run -d --name npm-start-test-container npm-start-test`** starts a container from the image named "npm-start-test-image", in detached mode **`(-d)`**, and names it "npm-start-test-container".

Finally, the third command **`docker kill --signal=SIGHUP npm-start-test-container`** sends a SIGHUP signal to the running container named "npm-start-test-container" using the docker kill command. The "--signal=SIGHUP" option specifies that the signal being sent is the SIGHUP.

And after running our last command, one would expect that the SIGHUP signal will be handled by our application, but it won't. That's because the npm scripts are not forwarding signals properly.

We can fix this issue by changing our **`Dockerfile`** to use **`CMD "node" "server.js"`** instead of **`CMD "npm" "start"`**.

```docker
FROM node:19.7-alpine3.16

COPY . .

RUN npm install

CMD "node" "server.js"
```

By re-running the before-mentioned bash scripts, we can see that the SIGHUP signal is now forwarded properly, and is logged by our Dockerized Node.js app.

### More issues with signals not being handled properly

In Docker, there are two ways to specify the CMD directive in the Dockerfile - shellform notation **`CMD "node" "server.js"`** and execform notation **`CMD ["node", "server.js"]`**. With the shellform notation, a shell interpreter wraps the process, which can cause problems with signal forwarding. The execform notation, on the other hand, directly spawns a process without a shell interpreter, ensuring signals are properly forwarded.

In a Unix-like operating system, the process with PID 1 is usually the init process, which is the first process that is started by the kernel during the boot process. The init process is responsible for starting and stopping other system processes, as well as performing other system initialization tasks.

When a Docker container is started, the process that is specified in the Dockerfile with the CMD or ENTRYPOINT directive is started with PID 1. This is because the Docker runtime treats the process specified in CMD or ENTRYPOINT as the container's main process, which is equivalent to the init process in a traditional Unix system.

Running the container's main process as PID 1 can cause some issues when handling certain signals because the kernel treats PID 1 differently from other process identifiers. To avoid unexpected behavior, it is recommended to use a tool like [dumb-init](https://github.com/Yelp/dumb-init) or [tini](https://github.com/krallin/tini) to run the container's main process as a child process of an init-like process, which can handle signals properly.


### The better CMD option

So let's put together everything we have discussed so far, and create a **`Dockerfile`** that will run our Node.js app.

We will be using [dumb-init](https://github.com/Yelp/dumb-init) as our init-like process.

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

COPY . .

RUN npm install

CMD ["dumb-init", "node", "server.js"]
```

## Specify which files should be copied and where

To make your Dockerfile more reliable and easier to understand, it's a good idea to use absolute paths for your WORKDIR. This ensures that your file paths are always correct, no matter where your container is running.

Another tip is to use WORKDIR instead of using multiple instructions like **`RUN ["cd ..", "&&", "node", "server.js"]`**. These can be confusing and difficult to maintain. With WORKDIR, you can set the working directory for all subsequent instructions in your Dockerfile, making it clear and simple to follow.

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["dumb-init", "node", "server.js"]
```

It's important to split the **`COPY`** command in the Dockerfile for performance reasons.

When you run the docker build command, Docker first checks if any of the previously built layers can be reused from the cache. This saves time and speeds up the overall build process.

In the current Dockerfile, the COPY command copies everything in the current directory to the container's working directory. This means that all the application source code, as well as the package.json file, are copied. If you make any changes to your source code and run the docker build again, Docker will have to rebuild the entire image from scratch, including running npm install. This can take a long time and slow down your development process.

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src/ .

CMD ["dumb-init", "node", "server.js"]
```

In the updated Dockerfile, the first COPY command only copies the package.json and package-lock.json files to the container's working directory. This means that Docker can reuse the cache for the npm install step if there are no changes to package.json. This saves time and speeds up the overall build process. After running npm install, the second COPY command copies only the relevant parts of the code to the container's working directory. This ensures that Docker can still use the cache for any unchanged layers and further speeds up the build process.

To make your Dockerfile faster and more efficient, it's best to split the COPY command and only copy the files that are necessary for your application. This helps to save time and resources by preventing Docker from rebuilding the entire image from scratch every time you make changes to your source code.

## Run containers as a non-root user

When you run Docker containers as the default "root" user, it means that any process running inside the container has unrestricted access to the underlying host system. This could be a security risk if a container is compromised or if a malicious user gains access to it. Running as root would allow them to potentially execute harmful commands or access sensitive system files on the host. Additionally, running as root could cause accidental damage to the host system.

To avoid these risks, it's important to run Docker containers as a non-root user. By doing this, you can prevent the container from accessing or modifying system files outside of its own container. This helps to isolate the container and improve the overall security of your system.

To run a Docker container as a non-root user, you can specify a non-root user in the Dockerfile or when running the container using the --user flag. Just make sure that any files or directories mounted into the container have the correct permissions for the non-root user to access and modify them.

Base Node.js docker image has already a user called node. You can use it to run your application.

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node ./src/ .

CMD ["dumb-init", "node", "server.js"]
```

## Set NODE_ENV=production

Although it may appear redundant, specifying this environment variable is quite necessary.

Most Node.js developers associate this setting with installing production-related dependencies, but it has other effects that you need to know about.

Some Node.js frameworks and libraries will only use their best performance and security configurations when NODE_ENV is set to production. This is important to remember, even if you don't agree with how frameworks work.

For example, [Express documentation](https://expressjs.com/en/advanced/best-practice-performance.html#set-node_env-to-production) recommends setting this variable to improve performance and security. If you forget to do this, you might experience a significant impact on performance, as explained in this great [blog post by Dynatrace](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/).

Furthermore, we only want to install production dependencies, but we don't want to update package-lock.json file. In this case, we can use **`npm ci`** command instead of **`npm install`**.

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only-production

USER node

COPY --chown=node:node ./src/ .

CMD ["dumb-init", "node", "server.js"]
```

## Indicate which ports to EXPOSE

Let other Dockerized Node.js app users know which port the application expects to be listening on by including that information in the Dockerfile. You'll still need to make sure that the port is available when the application runs, but this will help users understand what to expect!

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only-production

USER node

COPY --chown=node:node ./src/ .

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```

## Use Cache Mounts

When you build a Docker image, you use a Dockerfile which has a series of steps. Each step creates a new layer, which is like a file system that contains the changes made in that step. Docker uses layer caching to speed up the build process by reusing files from previous layers if they haven't changed.

However, there are some cases where Docker can't use layer caching, such as when a file is changed in a later step. This means Docker has to recreate all of the layers after the change, even if they haven't actually been modified. This can slow down the build process.

To solve this problem, Docker introduced a feature called [cache mount](https://docs.docker.com/build/cache/). With cache mount, you can mount a directory from your computer's file system into the Docker container while you're building the image. Any files in that directory can be used by Docker to speed up the build process. This means you can cache dependencies or build artifacts outside of the Docker build context, which can make the build process much faster.

Let's update our Dockerfile to use cache mount for npm dependencies.

```docker
FROM node:19.7-alpine3.16

RUN apk update && apk add --no-cache dumb-init

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production

COPY ./src/ .

USER node

COPY --chown=node:node ./src/ .

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```

Just one more things, you should enable [BuildKit](https://docs.docker.com/build/buildkit/#getting-started) to use cache mount.

## Use multi-stage builds

Multi-stage environments in Docker are a means to make images smaller and faster. 

Normally, Docker images include everything needed to build and run an application, which can make them big and slow. With multi-stage environments, the Dockerfile is split into different stages, each of which builds and packages a different part of the application. Each stage can use a different base image and only include the necessary files, which makes the images smaller and faster. For example, one stage might compile the source code and package it, and another stage might package the binary file into a minimal image with only the necessary dependencies to run the application. This makes the images more efficient and easier to manage.

Let's take a look at the updated multi-stage Dockerfile and then discuss it afterwards.

```docker
FROM node:19.7-alpine3.16 as base

RUN apk update && apk add --no-cache dumb-init

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

CMD ["dumb-init", "node", "server-dev.js"]

FROM base as production

ENV NODE_ENV production

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production

USER node

COPY --chown=node:node ./src/ .

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```

The "base stage" is the first step in building our project's container image. It sets up the foundation of the image by using a pre-existing image called **`node:19.7-alpine3.16`**, which is a small and efficient version of Node.js. We also install a program called dumb-init, which helps manage processes within the container. Finally, we create a working directory at **/usr/src/app** and copy our project's package.json and package-lock.json files there.

Next, we have a "dev stage" that builds on top of the base stage. This stage is meant for development and makes it faster to install dependencies by caching the **node_modules** directory. We use a technique called "cache mounting" to accomplish this. We also copy our source code and everything else (like config, eslint, etc.) from the root directory into the container.

Finally, we have a "production stage" that's similar to the dev stage but meant for running our project in a production environment. It also uses cache mounting to speed up the dependency installation process. We run a different command called **`npm ci`** to install the production dependencies. Additionally, we change the user of the container to "node" so as to run it with reduced privileges.

To build the Docker image, you can run the following command:

```bash
docker build -t dockerized-node-app .
```
This will build the image and tag it with the name **`dockerized-node-app`**.

To run the dev stage of the container, you can use the following command:

```bash
docker run -it --rm -p 3000:3000 dockerized-node-app:dev
```

This will start a container using the dev stage of the dockerized-node-app image.

To run the production stage of the container, you can use the following command:

```bash
docker run -it --rm -p 3000:3000 dockerized-node-app:production
```

This will start a container using the production stage of the dockerized-node-app image and expose port 3000 to the host.

## Improved, copy-pastable, blazingly fast Dockerfile

Here you are! Copy-paste this Dockerfile and you are good to go.

Just beware, you still need to add your own source code and other stuff. 😁😁😁

```docker
FROM node:19.7-alpine3.16 as base

RUN apk update && apk add --no-cache dumb-init

WORKDIR /usr/src/app

COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

CMD ["dumb-init", "node", "server-dev.js"]

FROM base as production

ENV NODE_ENV production

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci --only=production

USER node

COPY --chown=node:node ./src/ .

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]
```
Cheers!
