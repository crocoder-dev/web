---
title: "From simple Golang docker image to production-ready perfection"
description: ""
createdAt: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editors: ["velimir"]
abstract: ""
image: ""
draft: false
---

Ahoy there, fellow Gophers! Welcome to our exciting Dockerizing adventure, where we'll transform a simple Golang Docker image into a production-ready masterpiece. As aspiring Docker captains, we'll navigate through increasing complexity, optimizing our images step by step. So, tighten your ship's rigging, and let's set sail!

## Contents

## A Humble Beginning

Our journey commences with a basic Golang Dockerfile:

```docker
FROM golang

WORKDIR /app 

COPY . .

RUN go mod download

CMD ["go", "run", "./main.go"]
```

In this Dockerfile, we use the official Golang base image, set the working directory to /app, copy the application files, download module dependencies using ```go mod download```, and finally run our Golang application with go run.

## Pinning Versions and Embracing Debian 

To ensure stability and consistency, we'll pin the Golang version and switch to Debian for more robust build utilities:

```docker

# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

COPY . .

RUN go mod download

CMD ["go", "run", "./main.go"]
```

By specifying the Golang version, we ensure our image is built with the same version every time, reducing the risk of unexpected behavior.

## Compiling for Performance

To enhance runtime performance, we'll compile the Golang application during the build stage:

```docker

# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

COPY . .

RUN go mod download

# During this stage, we compile our application ahead of time, avoiding any runtime surprises.
# The resulting binary, web-app-golang, will be our steadfast companion in the final leg of our journey.
RUN go build -o web-app-golang

CMD ["./web-app-golang"]
```

By compiling the application beforehand, we eliminate the need to compile it at runtime, leading to faster startup times.

## Safeguarding with Layer Caching

To optimize caching and speed up the installation of dependencies, we'll copy only the necessary files:

```docker

# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

# We optimize our path to discovery, selecting only the files required to install dependencies. 🧭
# With this choice, we unlock the potential of better layer caching, improving our image's efficiency.
COPY go.mod go.sum ./

RUN go mod download

COPY . .

# During this stage, we compile our application ahead of time, avoiding any runtime surprises.
# The resulting binary, web-app-golang, will be our steadfast companion in the final leg of our journey.
RUN go build -o web-app-golang

CMD ["./web-app-golang"]
```

By copying only the go.mod and go.sum files before running ```go mod download```, we utilize Docker's caching mechanism effectively, reducing build times.

## A Two-Stage Expedition

To create a smaller and more secure image, we'll embark on a two-stage journey:

```docker
# We establish a separate stage for building the app.
# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

# We optimize our path to discovery, selecting only the files required to install dependencies. 🧭
# With this choice, we unlock the potential of better layer caching, improving our image's efficiency.
COPY go.mod go.sum ./

RUN go mod download

COPY . .

# During this stage, we compile our application ahead of time, avoiding any runtime surprises.
# The resulting binary, web-app-golang, will be our steadfast companion in the final leg of our journey.
# We strategically add flags to statically link our binary.
RUN go build \
  -ldflags="-linkmode external -extldflags -static" \
  -tags netgo \
  -o web-app-golang

# The scratch base image welcomes us as a blank canvas for our prod stage.
FROM scratch

WORKDIR /

# We transport the binary to our deployable image
COPY --from=build /app/web-app-golang web-app-golang

CMD ["/web-app-golang"]
```

The two-stage approach allows us to build the binary in one stage and use a minimal scratch image for the deployable container. This significantly reduces the image size and eliminates any unnecessary components, making it more secure.

## Setting Sail with Environment Configurations

To configure our Golang application for various environments, we'll add environment variables and port configurations:

```docker

# We establish a separate stage for building the app.
# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

# We optimize our path to discovery, selecting only the files required to install dependencies. 🧭
# With this choice, we unlock the potential of better layer caching, improving our image's efficiency.
COPY go.mod go.sum ./

RUN go mod download

COPY . .

# During this stage, we compile our application ahead of time, avoiding any runtime surprises.
# The resulting binary, web-app-golang, will be our steadfast companion in the final leg of our journey.
# We strategically add flags to statically link our binary.
RUN go build \
  -ldflags="-linkmode external -extldflags -static" \
  -tags netgo \
  -o web-app-golang

# The scratch base image welcomes us as a blank canvas for our prod stage.
FROM scratch

WORKDIR /

# We transport the binary to our deployable image
COPY --from=build /app/web-app-golang web-app-golang

# By exposing port 3000, we signal to the Docker environment the intended entry point for our application.
EXPOSE 3000

CMD ["/web-app-golang"]
```

By indicating the expected port ```EXPOSE 3000```, we ensure our application runs optimally in various environments.

## Anchoring with Non-Root Users

For heightened security, we'll anchor our ship with a non-root user:

```docker
# We establish a separate stage for building the app.
# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

# Add non-root user
RUN useradd -u 1001 crocoder

WORKDIR /app 

# We optimize our path to discovery, selecting only the files required to install dependencies. 🧭
# With this choice, we unlock the potential of better layer caching, improving our image's efficiency.
COPY go.mod go.sum ./

# Cache mounts speed up the installation of existing dependencies,
# empowering our image to sail smoothly through vast dependency seas.
RUN --mount=type=cache,target=/go/pkg/mod \
  --mount=type=cache,target=/root/.cache/go-build \
  go mod download

COPY . .

# During this stage, we compile our application ahead of time, avoiding any runtime surprises.
# The resulting binary, web-app-golang, will be our steadfast companion in the final leg of our journey.
# We strategically add flags to statically link our binary.
RUN go build \
  -ldflags="-linkmode external -extldflags -static" \
  -tags netgo \
  -o web-app-golang

# The scratch base image welcomes us as a blank canvas for our prod stage.
FROM scratch

WORKDIR /

# We copy the passwd file, essential for our non-root user
COPY --from=build /etc/passwd /etc/passwd

# We transport the binary to our deployable image
COPY --from=build /app/web-app-golang web-app-golang

# Use non-root user
USER crocoder

# By exposing port 3000, we signal to the Docker environment the intended entry point for our application.
EXPOSE 3000

CMD ["/web-app-golang"]
```

By using a non-root user (crocoder), we reduce the risk of potential security vulnerabilities.

## A Multistage Adventure with Development Delights

As we sail through the development waters, we'll make our lives easier with delightful tools like "air" for hot reloading and "dlv" for debugging:

```docker
# We establish a separate stage for building the app.
# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

# We optimize our path to discovery, selecting only the files required to install dependencies. 🧭
# With this choice, we unlock the potential of better layer caching, improving our image's efficiency.
COPY go.mod go.sum ./

# Cache mounts speed up the installation of existing dependencies,
# empowering our image to sail smoothly through vast dependency seas.
RUN --mount=type=cache,target=/go/pkg/mod \
  --mount=type=cache,target=/root/.cache/go-build \
  go mod download

FROM build AS dev

# Setup air and delve, via go install enhances the development
# with hot reload capabilities and powerful debugging prowess
RUN go install github.com/cosmtrek/air@latest && \
  go install github.com/go-delve/delve/cmd/dlv@latest

COPY . .

CMD ["air", "-c", ".air.toml"]

# The scratch base image welcomes us as a blank canvas for our prod stage.
FROM scratch

WORKDIR /

# We copy the passwd file, essential for our non-root user
COPY --from=build /etc/passwd /etc/passwd

# We transport the binary to our deployable image
COPY --from=build /app/web-app-golang web-app-golang

# Use non-root user
USER crocoder

# By exposing port 3000, we signal to the Docker environment the intended entry point for our application.
EXPOSE 3000

CMD ["/web-app-golang"]
```
[Air](github.com/cosmtrek/air) is a fantastic tool that breathes life into our development environment. It facilitates hot reload, enabling us to witness our code changes come alive without manual intervention. With air, we shall experience the thrill of rapid development, as it monitors our codebase and gracefully restarts our application upon detecting any changes.

[Delve](github.com/go-delve/delve/) or dlv is a powerful debugger, guiding us through the depths of our codebase. Equipped with its brilliant capabilities, we can traverse our application, inspect variables, and pinpoint the source of any bugs that may attempt to challenge our progress. Delve stands as a stalwart sentinel, guarding against the shadows of uncertainty.

Now, our development voyage is smoother with hot reloading and debugging on the fly!

## Raising the Production Flag

Production awaits, and we'll tighten security and optimize our deployment with a final stage:

```docker
# We establish a separate stage for building the app.
# Next, we embrace the powerful and versatile Debian base image 🐳
# This choice grants us easier access to essential build utilities and a robust development environment.
FROM golang:1.20-bullseye AS build

WORKDIR /app 

# We optimize our path to discovery, selecting only the files required to install dependencies. 🧭
# With this choice, we unlock the potential of better layer caching, improving our image's efficiency.
COPY go.mod go.sum ./

# Cache mounts speed up the installation of existing dependencies,
# empowering our image to sail smoothly through vast dependency seas.
RUN --mount=type=cache,target=/go/pkg/mod \
  --mount=type=cache,target=/root/.cache/go-build \
  go mod download

FROM build AS dev

# Setup air and delve, via go install enhances the development
# with hot reload capabilities and powerful debugging prowess
RUN go install github.com/cosmtrek/air@latest && \
  go install github.com/go-delve/delve/cmd/dlv@latest

COPY . .

CMD ["air", "-c", ".air.toml"]

FROM build AS build-production

# Add non-root user
RUN useradd -u 1001 crocoder

COPY . .

# During this stage, we compile our application ahead of time, avoiding any runtime surprises.
# The resulting binary, web-app-golang, will be our steadfast companion in the final leg of our journey.
# We strategically add flags to statically link our binary.
RUN go build \
  -ldflags="-linkmode external -extldflags -static" \
  -tags netgo \
  -o web-app-golang

# The scratch base image welcomes us as a blank canvas for our prod stage.
FROM scratch

WORKDIR /

# We copy the passwd file, essential for our non-root user
COPY --from=build-production /etc/passwd /etc/passwd

# We transport the binary to our deployable image
COPY --from=build-production /app/web-app-golang web-app-golang

# Use non-root user
USER crocoder

# By exposing port 3000, we signal to the Docker environment the intended entry point for our application.
EXPOSE 3000

CMD ["/web-app-golang"]
```

Now, our ship is battle-ready for the production storm!

## Conclusion

Ahoy, brave sailors! We've weathered rough waters and perfected our Golang Docker image from simple to production-ready. From pinning versions, embracing Debian, and optimizing caching, to multistaging, and delightful development tools, our Dockerizing journey is complete.

You are now a skilled Docker captain, capable of steering your Golang applications toward smooth and secure deployments in any environment.

Set your sails high, navigate the production seas, and may your Golang Docker images sail with pride! Fair winds, and happy coding! 🚢🐹🐊
