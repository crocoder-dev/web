---
title: "What's \"use server\" in Next.js?"
description: ""
date: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editor: ["velimir"]
abstract: ""
image: "/images/use-server-nextjs.png"
draft: false
---

Server actions are a feature introduced in [Next.js 13.4](https://nextjs.org/blog/next-13-4) that provides a powerful way to handle server-side data mutations, reduce client-side JavaScript, and progressively enhance forms.

Server actions are created by defining an asynchronous function with the `"use server"` directive at the top of the function body. These functions should have serializable arguments and a serializable return value based on the [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components) protocol.

## Contents

## Enabling Server Actions

To start using Server Actions, you need to enable the experimental `serverActions` flag in your `next.config.js` file. Here’s how you can do it:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};
module.exports = nextConfig;
```

By setting `serverActions` to `true`, you are telling Next.js that you want to use this experimental feature in your application.

## Understanding "use server"

The "use server" directive is a crucial part of Server Actions. It ensures that the function it is used in is executed only on the server. This is important for security and performance reasons, as you wouldn’t want sensitive server-side logic to be exposed or run on the client-side.

Here is how you can write a Server Action:

```javascript
export default function ServerComponent() {
  async function serverAction() {
    'use server';
    // Server-side logic goes here
  }
}
```

`serverAction` is a function that will only run on the server as we defined the `"use server"` directive in the body of the function. 

The arguments and return value of this function need to be transmitted between the server and the client, so it's important for them to be serializable.

**Remember**: Any data you send to or get from this function has to go between the server and the client. `!important`



## Compared to the Traditional Approach

Before Server Actions, a common approach to handle server-side logic was to use API routes in Next.js. Here’s an example of how you might have done this:

**Without Server Actions (Using API Routes)**

```javascript
// pages/api/createAccount.js
export default async function handler(req, res) {
  const { name, email, password } = req.body;
  // Save to the database or perform other server-side operations
  res.status(200).json({ status: 'success' });
}

// components/SignupPage.js
import { useState } from 'react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) =>
    event.preventDefault();

    const response = await fetch('/api/createAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (response.ok) {
      const result = await response.json()
      console.log(result)
    } else {
      console.error('Error:', response.status)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Create Account</button>
    </form>
  )
}
```

We have a separate API route `/api/createAccount` to handle the server-side logic of creating an account. The client-side form submission is handled in `SignupPage`, where a POST request is sent to the API route with the form data.

**With Server Actions**

With Server Actions, you can simplify this process:

```javascript

// components/SignupPage.js
export default function SignupPage() {
  const createAccount = async (formData) => {
    "use server";
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    // Save to the database or perform other server-side operations
  };

  return (
    <form action={createAccount} method="POST">
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="password" name="password" />
      <button type="submit">Create Account</button>
    </form>
  );
}
```

The `createAccount` function is a Server Action that handles the server-side logic of creating an account. It is invoked directly from the form submission, colocating the server and client code.

## Conclusion

The "use server" directive in Next.js stands out as a formidable instrument, streamlining the React application development process by seamlessly integrating server-side logic execution from the client side. 

This feature falls under the umbrella of Server Actions, which, it is important to note, is still in its experimental phase and it becomes stable in [Next.js 14](https://nextjs.org/blog/next-14). Despite this, it undeniably marks a progressive stride in simplifying the development workflow, enhancing the ease of crafting robust and efficient applications using Next.js. 

While there are minimal downsides to the server actions, one noticeable aspect is that the code might initially come across as unconventional and somewhat peculiar. However, a closer and more thorough examination reveals that this uniqueness actually contributes to a more streamlined and efficient code structure, ultimately benefiting the development process.
