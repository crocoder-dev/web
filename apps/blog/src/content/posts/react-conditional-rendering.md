---
title: "Stop using && in React Conditional Rendering"
description: ""
createdAt: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editors: ["velimir"]
abstract: ""
image: "/images/react-conditional-rendering.png"
draft: false
---

Conditional rendering is a technique in React that allows you to show or hide certain parts of your user interface depending on certain conditions. This means that you can display different content or components based on what's happening in your application at any given moment.

For example, let's say you're building a website that users can log in to and view their profile information. When a user is not logged in, you might want to show a login form. But when a user is logged in, you might want to show their profile information.

Let's take a look at an example of conditional rendering in React.

## Contents

## The CrocDemo component

```tsx
import React from 'react';

const CrocDemo: React.FC = () => {
  const crocodiles = ['Lyle', 'Snappy', 'Mr. Vile'];

  const dodos = [];

  return (
    <>
        <div>{crocodiles.length && `crocodiles: ${crocodiles.map(() => '🐊').join(' ')}`}</div>
        <div>{dodos.length && `dodos: ${dodos.map(() => '🦤').join(' ')}`}</div> 
    </>
  );
};

```

This code defines a React component called CrocDemo.

Inside the component, there are two arrays defined: **`crocodiles`** and **`dodos`**. The crocodiles array contains the names of three crocodiles, and the dodos array is empty. Of course that's the case, because dodos are extinct.

The component then returns some JSX code that includes two div elements. The first div element displays the names of the crocodiles, and the second div element displays the names of the dodos.

The interesting part of this code is how the names are displayed. The div elements use a technique called conditional rendering to decide whether to display the names or not.

The first div element checks if the length of the crocodiles array is greater than zero. If it is, the div element displays the text "crocodiles:" followed by a series of crocodile emojis (🐊). The emojis are created using the map function, which generates a new array of emojis based on the number of crocodiles in the original array. The join function is then used to join the emojis into a single string, which is displayed inside the div element.

The second div element follows the same pattern, but it checks if the length of the dodos array is greater than zero. Since the dodos array is empty, the div element will not display anything.

So, the end result is that the CrocDemo component displays the names of the crocodiles (with emojis) if there are any crocodiles in the crocodiles array, and it displays nothing for the dodos array.

Well at least it should display nothing for the dodos array.

crocodiles: 🐊 🐊 🐊  
0

Hmmm... There seems to be a random zero where we expect nothing to be displayed. Why is that?

Let's try to understand what's going on by using the **`&&`** operator with different [falsy values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy). 

```tsx
    /* This won't render anything ✅ */
    <>{false && <div>👋</div>}</>

    /* This will render 0 😡 */
    <>{0 && <div>👋</div>}</>

    /* This won't render anything ✅ */
    <>{""  && <div>👋</div>}</>

    /* This won't render anything ✅ */
    <>{null && <div>👋</div>}</>

    /* This won't render anything ✅ */
    <>{undefined && <div>👋</div>}</>

    /* This will render NaN 😡 */
    <>{NaN && <div>👋</div>}</>
```
In JavaScript, the **`&&`** operator checks if both the left and right operands are true. If the left operand is false, the right operand is never checked, and the **`&&`** operator returns the left operand.

In the expression **`{0 && <div>👋</div>}`**, the left operand is 0, which is a false value in JavaScript. Since the left operand is false, the right operand **`<div>👋</div>`** is never checked. Instead, the **`&&`** operator returns the left operand, which is 0. 

When React tries to render the component, it interprets the 0 as a string and renders it on the page. 😡😡😡

The same goes for NaN. 

```tsx
    /* This will render NaN 😡 */
    <>{NaN && <div>👋</div>}</>
```

So, how do we fix this?

## Use the ternary operator

There are a few ways to fix this problem. The first (and the best) way is to use the ternary operator. The ternary operator is a conditional operator that checks if a condition is true or false. If the condition is true, it returns the first operand. If the condition is false, it returns the second operand.

```tsx
    /* This won't render anything ✅ */
    <>{0 ? <div>👋</div> : null}</>

    /* This won't render anything ✅ */
    <>{NaN ? <div>👋</div> : null}</>

```

## Convert falsy values to Boolean

Alternatively, we can cast all our falsly values to Boolean or use the **`!!`** operator. 
The **`!!`** operator is used to convert a value to a Boolean. It is essentially a shorthand way of converting a truthy or falsy value to true or false.

```tsx
    /* This won't render anything ✅ */
    <>{Boolean(0) && <div>👋</div>}</>

    /* This won't render anything ✅ */
    <>{Boolean(NaN) && <div>👋</div>}</>

    /* This won't render anything ✅ */
    <>{!!0 && <div>👋</div>}</>

    /* This won't render anything ✅ */
    <>{!!NaN && <div>👋</div>}</>
```

## Conclusion

Conditional rendering is a technique in React that allows you to show or hide certain parts of your user interface based on certain conditions. This can be useful when you want to display different content or components based on what's happening in your application.

However, there is a catch when using the **`&&`** operator with falsy values like 0 and NaN, which can accidentally cause unexpected rendering.

To fix this, we can use the ternary operator or convert falsy values to Boolean. These techniques will help ensure that your React components render exactly what you expect.
