---
title: "structuredClone() - the simplest way to clone an object in JavaScript"
description: ""
date: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editor: ["velimir"]
abstract: ""
image: "/images/how-to-clone-object-in-javascript.png"
draft: false
---

Cloning an object in JavaScript refers to the process of creating a copy of an existing object or value. This process allows developers to manipulate or store objects or values separately, or to prevent changes to one object from affecting another.

However, there are different types of cloning methods available, and it's essential to be aware of the limitations and capabilities of each cloning method and choose the appropriate one based on the specific needs of the project.

## Shallow and Deep clone

In JavaScript, when you clone a value, it's usually shallow, which means that changes to deeply nested values will be visible in both the clone and the original. You can create a [shallow clone](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy) using the object spread operator. If you add or change a property directly on the shallow clone, it only affects the clone, not the original. However, if you add or change a deeply nested property, it affects both the clone and the original.

A [deep clone](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy), on the other hand, copies an object's properties one by one but invokes itself recursively when it finds a reference to another object, creating a clone of that object as well. This can be important to make sure that two pieces of code don't accidentally share an object and unknowingly manipulate each other's state.

It's important to note that deep cloning can be more resource-intensive than shallow cloning, especially for large objects. Therefore, you should choose the appropriate clone method based on your specific needs.

## Shallow cloning

The [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) in JavaScript is a useful tool for creating a new object that is based on an existing object.

When used with an object, it iterates over the enumerable properties of the original object and copies them one by one to a new object. The new object has the same properties and values as the original object, but it is a distinct object in memory.

```js
const copiedObject = { ...originalObject };
```

If the original object contains any nested objects, the spread operator will create references to those nested objects rather than copying them.

This means that changes made to the nested objects in the new object will also affect the original object because both objects are referencing the same underlying nested objects in memory.

## Deep cloning

When working with JavaScript, developers often need to make copies of objects or values in order to manipulate or store them separately. [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) and [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) are two built-in methods in JavaScript that can be used to create a deep clone of an object.

The process of deep cloning an object creates a completely new object with its own set of properties and values so that any changes made to the clone do not affect the original object.

```js
const copiedObject = JSON.parse(JSON.stringify(originalObject));
```

However, **`JSON.stringify()`** and **`JSON.parse()`** have some limitations. They cannot be used to clone functions, which can be problematic in certain cases. Additionally, they cannot be used to clone objects that have circular references, which are objects that reference themselves in a loop.

Finally, symbols or objects with properties that are symbols cannot be cloned using these methods. Therefore, developers need to be aware of these limitations and consider alternative methods, such as custom deep-cloning algorithms provided by libraries like [Lodash](https://lodash.com/).

## Structured cloning

The [structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) method was introduced not that long ago and is used to create a deep copy of an object in JavaScript.

It's similar to **`JSON.stringify()`** and **`JSON.parse()`**, but it has some advantages over these methods. For example, structured cloning can handle more complex objects than JSON, such as objects that contain binary data or cyclic object graphs.

However, there are still some limitations to structured cloning. It cannot handle prototypes, functions, and some values like Error and DOM nodes.

```js
const copiedObject = structuredClone(originalObject);
```
It's important to note that the **`structuredClone()`** method is not supported in every browser. While it is supported in modern versions of Firefox, Chrome, and Safari, it is not currently supported in Internet Explorer or Microsoft Edge.

Additionally, some older browsers may not support it either. As with any web technology, it's important to test for [browser compatibility](https://caniuse.com/mdn-api_structuredclone) before using it in production.
