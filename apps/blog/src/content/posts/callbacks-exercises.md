---
title: "Callbacks - Code Exercises"
description: ""
date: 1645837875000
updatedAt: 1645837875000
authors: ["david"]
category: "AWS"
editor: ["velimir"]
abstract: ""
image: "/images/callback-hell.jpg"
draft: false
---

It's really hard to test your programming knowledge after you have completed a tutorial or a lecture. We have prepared some exercises to help out beginner devs to solidify their understanding of **callbacks**. Every exercise has a brief description of the problem, starting code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution.

If you need some additional help, you can check out our [Functions video](https://youtu.be/VkjE7CebnPQ) from the **#lockdown learning** series in which we discuss **functions and callbacks** or contact the author of the article directly.

---

**Callbacks** are a critical concept in **JavaScript** and you won't get very far without knowing how to use them. They are often as confusing to experienced developers as well as to beginners. A **callback** is nothing more than a function that is passed into another function as an argument to be executed later.

They are so common in **JavaScript**, you certainly used **callbacks** without knowing what they were called. You probably wrote a similar snippet multiple times:

```javascript
const button = document.querySelector("button");

button.addEventListener("click", (e) => {
  this.classList.add("clicked");
});
```

The second parameter passed into addEventListener is a **callback**. I have compiled some exercises to improve your understanding of callbacks. Try not to skip them as some code is reused in later exercises.

---


## Contents

## Is this number odd?

Write a function that returns true or false for a given number. We will reuse this function, so make it reusable.

::title Helpful links

- [Remainder (%)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)


::title Function calls

```javascript
isOdd(4);
isOdd(5);
```
::title Result

```javascript
false;
true;
```

::details Show Solution

```javascript
const isOdd = (num) => num % 2 === 1;
```

::enddetails

---

## Exclaim

Write a function that returns the given string with a concatenated exclamation ! at the end. We will reuse this function, so make it reusable.

Helpful links

- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

::title Function calls

```javascript
exclaim("Adrian");
exclaim(exclaim("Adrian"));
```
::title Result

```javascript
"Adrian!";
"Adrian!!";
```
::details Show Solution

```javascript
const exclaim = (str) => `${str}!`;

exclaim("Adrian");
exclaim(exclaim("Adrian"));
```

::enddetails

---

## Double the chars!

Write a function that duplicates each char in a string. If I pass 'abc' to the function, it should return 'aabbcc'. We will reuse this function, so make it reusable.

Helpful links

- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [String.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)


::title Function calls

```javascript
doubleChars("Adrian");
doubleChars("ssssnake");
```

::title Result

```javascript
"AAddrriiaann";
"ssssssssnnaakkee";
```

::details Show Solution

```javascript
const doubleChars = (str) =>
  str
    .split("")
    .map((c) => `${c}${c}`)
    .join("");

doubleChars("Adrian");
doubleChars("ssssnake");
```

::enddetails

---

## At least two elements

Write a function called **atLeastTwo** that receives an array and a callback as its arguments. If at least two elements from the array return a truthy value when passed as an argument to the callback, **atLeastTwo** should return true. If there aren't at least two elements from the array that return a truthy value when passed as arguments to the callback, **atLeastTwo** should return false.

Helpful links

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

::title Function calls

```javascript
atLeastTwo([1, 2, 3, 4, 5], isOdd);
atLeastTwo([2, 4, 6], isOdd);
atLeastTwo([1, 2, 3, 4, 5], (t) => t > 3);
```

::title Result

```javascript
true;
false;
true;
```

::details Show Solution

```javascript
const isOdd = (num) => {
  return num % 2 === 1;
};

const atLeastTwo = (array, callback) => array.filter(callback).length >= 2;

atLeastTwo([1, 2, 3, 4, 5], isOdd);

atLeastTwo([2, 4, 6], isOdd);

atLeastTwo([1, 2, 3, 4, 5], (t) => t > 3);
```

::enddetails

---

## Group by

Write a **groupBy** function that groups elements from an array by the returned value from the callback when an element from the array is passed as an argument.

This is a really common pattern when manipulating arrays.

Helpful links

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

::title Function calls

```javascript
const input = [
  {
    name: "John",
    yearOfBirth: 1988,
    placeOfBirth: "New York",
  },
  {
    name: "Nancy",
    yearOfBirth: 1963,
    placeOfBirth: "New York",
  },
  {
    name: "John",
    yearOfBirth: 1980,
    placeOfBirth: "Toronto",
  },
];

// 1
groupBy(input, (t) => t.name);

// 2
groupBy(input, (t) => isOdd(t.yearOfBirth));
```

::title Result

```javascript
  // 1
  {
    John: [
      {
        name: 'John',
        yearOfBirth: 1988,
        placeOfBirth: 'New York',
      },
      {
        name: 'John',
        yearOfBirth: 1980,
        placeOfBirth: 'Toronto',
      }
    ],
    Nancy: [
      {
        name: 'Nancy',
        yearOfBirth: 1963,
        placeOfBirth: 'New York',
      }
    ]
  }

  // 2
  {
    false: [
      {
        name: 'John',
        yearOfBirth: 1988,
        placeOfBirth: 'New York',
      },
      {
        name: 'John',
        yearOfBirth: 1980,
        placeOfBirth: 'Toronto',
      }
    ],
    true: [
      {
        name: 'Nancy',
        yearOfBirth: 1963,
        placeOfBirth: 'New York',
      }
    ]
  }
```

::details Show Solution

```javascript
const input = [
  {
    name: "John",
    yearOfBirth: 1988,
    placeOfBirth: "New York",
  },
  {
    name: "Nancy",
    yearOfBirth: 1963,
    placeOfBirth: "New York",
  },
  {
    name: "John",
    yearOfBirth: 1980,
    placeOfBirth: "Toronto",
  },
];

const isOdd = (num) => {
  return num % 2 === 1;
};

const groupBy = (array, callback) => {
  array.reduce((accumulator, currentValue) => {
    const key = callback(currentValue);

    if (accumulator[key]) {
      accumulator[key].push(currentValue);
    } else {
      accumulator[key] = [currentValue];
    }

    return accumulator;
  }, {});
};

groupBy(input, (t) => t.name);

groupBy(input, (t) => isOdd(t.yearOfBirth));
```

::enddetails

---

## Repeat the function x times

Write a **repeat** function that receives 3 arguments: a string, number of repetitions, and a callback that will be repeated. The **repeat** function should pass the string to the callback as an argument and repeat the callback x times, with the result of the previous repetition as an argument.

Helpful links

- [For loop](https://developer.mozilla.org/en-US/docs/Glossary/loop#for_loop)
- [Recursion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)


::title Function calls

```javascript
repeat("infinite power", 3, exclaim);
repeat("triple", 2, doubleChars);
repeat("trogdor", 3, (t) => `°${t}°`);
```
::title Result

```javascript
"infinite power!!!";
"tttrrriiipppllleee";
"°°°trogdor°°°";
```
::details Show Solution

```javascript
const repeatRecursive = (input, num, callback) => {
  if (num === 0) return input;
  return repeatRecursive(callback(input), num - 1, callback);
};

const repeat = (input, num, callback) => {
  let result = input;
  for (i = 0; i < num; i++) {
    result = callback(result);
  }
  return result;
};

repeat("infinite power", 3, exclaim);
repeat("triple", 2, doubleChars);
repeat("trogdor", 3, (t) => `°${t}°`);
```

::enddetails
