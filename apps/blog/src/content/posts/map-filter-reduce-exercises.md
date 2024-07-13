---
title: "Map, Filter, Reduce - Code Exercises"
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

It's really hard to test your programming knowledge after you have completed a tutorial or a lecture. We have prepared some exercises to help out beginner devs to solidify their understanding of **Map, Filter, Reduce**, and other useful array methods. Every exercise has a brief description of the problem, starting code, links to relevant MDN docs, and expected results. Try to solve the problems without taking a peek at the solution.

If you need some additional help, you can check out our [Arrays video](https://youtu.be/pkRW2RJ2LzQ) from **#lockdown learning** series in which we discuss **Map, Filter and Reduce** or contact the author of the article directly.

---

As a **JavaScript** developer, you will come across arrays. Arrays of numbers, arrays of objects, arrays of arrays of objects, multi-dimensional arrays, and you will need to simplify, transform or manipulate them.

You could use 'nested for loops' to solve most of the problems you will encounter, but that leaves the code hard to read and understand.

I would like to prove to you that by using **Map, Filter, and Reduce** array methods, not only will the code be more readable, but you will also be able to analyze the problem better and write the code with ease.

## Array squared

Square the value of every element in the array. Presume that you will only get numbers in the input array.

Helpful links

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Math.pow()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)

Input

```javascript
const input = [1, 2, 3, 4, 5];
```

Result

```javascript
[1, 4, 9, 16, 25];
```

Solution

```javascript
const input = [1, 2, 3, 4, 5];

input.map(function (num) {
  return Math.pow(num, 2);
});

// or written with Arrow function
input.map((num) => Math.pow(num, 2));
```
This code defines an array called input which contains the numbers 1 through 5. It then uses the **`map()`** method to iterate through each element of the array, which are numbers.

For each number, it applies the function passed to it, which is **`Math.pow(num, 2)`**, raising the number to the power of 2. Then it returns the new array with the squared value of each element of the input array.

The second version is the same as the first version but it uses **`Arrow function`** instead of anonymous function.

## Sum of every positive element

If the given input is an array of numbers, return the sum of all the positives ones. If the array is empty or there aren't any positive numbers, return 0.

Helpful links

- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

Input

```javascript
const input = [1, -4, 12, 0, -3, 29, -150];
```

Result

```javascript
42;
```

Solution

```javascript
const input = [1, -4, 12, 0, -3, 29, -150];

input
  .filter(function (num) {
    return num > 0;
  })
  .reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);

// or written with Arrow function
input
  .filter((num) => num > 0)
  .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
```

This code is using two higher-order functions, **`filter`** and **`reduce`**, to filter an array of numbers and then sum the remaining numbers.

The code first filters the input array to only include numbers greater than 0 using **`filter`** method and the callback function checks if the number is greater than 0. Then, it uses the reduce method to iterate through the filtered array and add each number to the **`accumulator`** (starting at 0), returning the sum of all the numbers greater than 0 in the input array.

The code is also written with **`Arrow function`** which are shorthand for writing function expressions that behave similarly to regular functions while being more concise.

## Calculate median and mean

Calculate the mean and median values of the number elements from the input array.

Helpful links

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [Math.abs()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)

Input

```javascript
const input = [12, 46, 32, 64];
```

Result

```javascript
  { mean: 38.5, median: 39 }
```

Solution

```javascript
const input = [12, 46, 32, 64];
input.sort((a, b) => a - b);

input.reduce(
  (accumulator, currentValue, index, array) => {
    accumulator.mean += currentValue / array.length;

    if (array.length % 2 === 0) {
      // if the array has an even number of elements
      if (index === array.length / 2 - 1) {
        accumulator.median += currentValue;
      } else if (index === array.length / 2) {
        accumulator.median += currentValue;
        accumulator.median /= 2;
      }
    } else {
      // if the array has an odd number of elements
      if (index === (array.length - 1) / 2) {
        accumulator.median = currentValue;
      }
    }

    return accumulator;
  },
  { mean: 0, median: 0 }
);
```

This code is working with an array of numbers and it is performing two operations on the array: sorting it, and then calculating its mean and median.

First, the **`sort`** method is used to sort the input array in ascending order. The function passed to the sort method compares two elements of the array, 'a' and 'b', and returns a negative number if 'a' should come before 'b', a positive number if 'b' should come before 'a', and 0 if they are equal. In this case, the function simply subtracts 'b' from 'a', so that the array is sorted in ascending order. The **`reduce`** method is then used to iterate through the sorted array and calculate the mean and median.

Furthermore, the function first adds the **`currentValue`** divided by the array length to the **`mean`** property of the accumulator object. Then, it uses an **`if`** statement to check if the current element is the median of the array. If so, it assigns the current element to the median property of the accumulator object.

Finally, the function returns the **`accumulator`** object with the updated mean and median values, after iterating through the entire array.


## Get name initials

The given input is a string of multiple words with a single space between each of them. Abbreviate the name and return the name initials.

Helpful links

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [String.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

Input

```javascript
const input = "George Raymond Richard Martin";
```

Result

```javascript
"GRRM";
```

Solution

```javascript
const input = "George Raymond Richard Martin";

input
  .split(" ")
  .map(function (word) {
    return word[0];
  })
  .join("");

// or written with Arrow function
input
  .split(" ")
  .map((word) => word[0])
  .join("");
```

This code is working with a string of words and it is performing three operations on the string: splitting it, mapping the first letter of each word, and then joining them back together.

First, the **`split`** method is used to split the input string into an array of words using a space **`(" ")`** as the separator. Then, the **`map`** method is used to iterate through the array of words and create a new array by applying a function to each word. The function passed to the **`map`** method takes one argument, word, which is the current element being processed, and it returns the first letter of the word by using the bracket notation to access the first character of the string.

Finally, the **`join`** method is used to join all the elements of the new array of first letters back into a single string, with no separator.

The code is also written with **`Arrow function`** which are shorthand for writing function expressions that behave similarly to regular functions while being more concise.

## Age difference from the youngest and oldest

Find the difference in age between the oldest and youngest family members, and return their respective ages and the age difference.

Helpful links

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Math.min()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)
- [Math.max()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

Input

```javascript
const input = [
  {
    name: "John",
    age: 13,
  },
  {
    name: "Mark",
    age: 56,
  },
  {
    name: "Rachel",
    age: 45,
  },
  {
    name: "Nate",
    age: 67,
  },
  {
    name: "Jennifer",
    age: 65,
  },
];
```

Result

```javascript
[13, 67, 54];
```

Solution

```javascript
const input = [
  {
    name: "John",
    age: 13,
  },
  {
    name: "Mark",
    age: 56,
  },
  {
    name: "Rachel",
    age: 45,
  },
  {
    name: "Nate",
    age: 67,
  },
  {
    name: "Jennifer",
    age: 65,
  },
];

const ages = input.map((person) => person.age);

[Math.min(...ages), Math.max(...ages), Math.max(...ages) - Math.min(...ages)];
```

This code is working with an array of objects, each representing a person with properties name and age. It performs three operations: mapping the age of each person, calculating the minimum, maximum, and range of the ages.

First, the **`map`** method is used to iterate through the array of objects, and create a new array by applying a function to each person object. The function passed to the **`map`** method takes one argument, person, which is the current element being processed, and it returns the value of the age property of the person object.

The **`Math.min`** method is then used with the spread operator **`(...)`** to find the minimum value of the ages array, followed by the **`Math.max`** method to find the maximum value.

Finally, the difference between the max and min is calculated and returned in an array.


## Numeronyms

Devs like to abbreviate everything: k8s means Kubernetes, a11y means accessibility, l10n means localization. You get the Dev numeronyms by taking the first and the last letter and counting the number of letters in between. Words that have less than 4 letters aren't abbreviated, because that would just be odd. The input is a sentence, and you should abbreviate every word that is 4 letters long or longer. There won't be any punctuation in the sentence. g2d l2k e6e

Helpful links

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
- [String.prototype.join()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

Input 

```javascript
const input = "Every developer likes to mix kubernetes and javascript";
```

Result

```javascript
"E3y d7r l3s to mix k8s and j8t";
```

Solution

```javascript
const input = "Every developer likes to mix kubernetes and javascript";

const createNumeronym = (word) =>
  word[0] + (word.length - 2) + word[word.length - 1];

input
  .split(" ")
  .map(function (word) {
    if (word.length >= 4) {
      return createNumeronym(word);
    }
    return word;
  })
  .join(" ");

// or written with Arrow function and Conditional operator
input
  .split(" ")
  .map((word) => (word.length >= 4 ? createNumeronym(word) : word))
  .join(" ");
```

This code defines a function called **`createNumeronym`** that takes in a word as an argument, and returns a new word consisting of the first letter, the length of the word minus 2, and the last letter of the original word. It then takes a string input, which is "Every developer likes to mix kubernetes and javascript", split it into an array of words using **`.split(" ")`**.

In order to iterate through each word in the array it uses **`.map()`**, and for each word that has a length of 4 or more characters, it calls the **`createNumeronym`** function on that word, and replaces it with the returned value. For words that are shorter than 4 characters, it keeps the original word.

Finally, it uses the **`join()`** method to join the array of modified words back into a single string.

The second version is the same as the first version but it uses **`Arrow function`** and **`Conditional operator`**.


## n! with Map and Reduce

If the given input is a number, you should return the factorial of that number. The factorial of a natural number n is the product of the positive integers less than or equal to n. So, 2! = 2, 3! = 6, 4! = 24 and so on.

Helpful links

- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.fill()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

Input

```javascript
const input = 6;
```
Result

```javascript
720;
```

Solution

```javascript
const input = 6;

const array = new Array(input).fill(null);
// array is [null, null, null, null, null, null]

array
  .map(function (currentValue, index) {
    return index + 1;
  })
  .reduce(function (accumulator, currentValue) {
    return accumulator * currentValue;
  });

// or written with Arrow function
new Array(input)
  .fill(null)
  .map((currentValue, index) => index + 1)
  .reduce((accumulator, currentValue) => accumulator * currentValue);
```

This code is working with a number input, it creates an array of that length filled with null values and then performs two operations on that array: mapping each element to its **`index`** + 1, and then reducing the array to the product of all its elements.

First, new **`Array(input).fill(null)`** creates a new array with the length of input and fills it with null values. Then, the **`map`** method is used to iterate through the array and create a new array by applying a function to each element. The function passed to the **`map`** method takes two arguments, **`currentValue`** and **`index`**, and it returns the value of the **`index`** plus 1, effectively mapping each element to its **`index`** + 1.

Finally, the **`reduce`** method is used to iterate through the new array and calculate the product of all its elements. The function passed to the **`reduce`** method takes two arguments, **`accumulator`** and **`currentValue`**, and it multiplies the **`currentValue`** to the **`accumulator`** and returns the new value of the **`accumulator`**.

The code is also written with **`Arrow function`** which are shorthand for writing function expressions that behave similarly to regular functions while being more concise.

## Count elements in array of arrays

Count the occurrences of distinct elements in the given 2D array. The given input is an array, the elements of which are arrays of strings. The result is an object whose property names are the values from the arrays and their value is the number of their occurrences.

Helpful links

- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

Input

```javascript
const input = [
  ["a", "b", "c"],
  ["c", "d", "f"],
  ["d", "f", "g"],
];
```

Result

```javascript
  {
    a: 1,
    b: 1,
    c: 2,
    d: 2,
    f: 2,
    g: 1,
  }
```

Solution

```javascript
const input = [
  ["a", "b", "c"],
  ["c", "d", "f"],
  ["d", "f", "g"],
];

input.flat().reduce((accumulator, currentValue) => {
  if (accumulator[currentValue]) {
    accumulator[currentValue] += 1;
  } else {
    accumulator[currentValue] = 1;
  }
  return accumulator;
}, {});
```

This code is working with an array of arrays, flattening it and then counting the occurrences of each character in the flattened array.

First, the **`flat`** method is used to flatten the array of arrays into a single array of characters. Then, the **`reduce`** method is used to iterate through the flattened array and count the occurrences of each character. The function passed to the **`reduce`** method takes two arguments, **`accumulator`** and **`currentValue`**.

The function checks if the **`currentValue`** already exists in the **`accumulator`** object, if it does, it increments the value by 1 and if not, it assigns the value 1 to that key, effectively counting the occurrences of each character in the flattened array.

Finally, the function returns the **`accumulator`** object with the count of each character in the flattened array.

## High performing students

You are given an array of objects representing a group of students, each with a name and an array of test scores. Your task is to use map, filter, and reduce to calculate the average test score for each student, and then return an array of objects containing only the students who have an average score above 90.

Helpful links
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Input

```javascript
const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob", scores: [75, 80, 85] },
  { name: "Charlie", scores: [90, 95, 85] },
  { name: "Jack", scores: [100, 100, 100] }
];
```
Result

```javascript
[ 
  { name: 'Jack', average: 100 }
]
```
Solution

```javascript
const students = [
  { name: "Alice", scores: [90, 85, 92] },
  { name: "Bob", scores: [75, 80, 85] },
  { name: "Charlie", scores: [90, 95, 85] },
  { name: "Jack", scores: [100, 100, 100] }
];

// Use map to calculate the average test score for each student
const studentAverages = students.map(student => {
  const sum = student.scores.reduce((acc, score) => acc + score);
  return { name: student.name, average: sum / student.scores.length };
});

// Use filter to only select students with an average above 90
const highPerformers = studentAverages.filter(student => student.average > 90);
```

This code is working with an array of objects representing students and their test scores, it performs two operations: calculating the average test score for each student and then filtering the students with an average test score above 90.

First, the **`map`** method is used to iterate through the array of students, and create a new array by applying a function to each **`student`** object. The function passed to the **`map`** method takes one argument, **`student`**, which is the current element being processed.

It calculates the sum of all the test scores using the **`reduce`** method on the scores array and then returns an object with the student's name and average test score which is the sum of scores divided by the number of scores. Then, the **`filter`** method is used to iterate through the array of student averages, and create a new array by applying a function to each **`student`** object.

The function passed to the **`filter`** method takes one argument, **`student`**, which is the current element being processed, and it returns a Boolean value that indicates whether the student's average test score is greater than 90 or not.

## High Priced Product Categories

You are given an array of objects representing a collection of products, each with a name, price, and category. Your task is to use map, filter, and reduce to calculate the average price of products in each category, and then return an array of objects containing only the categories that have an average price above 50.

Helpful links
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Array.prototype.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)


Input

```javascript
const products = [
  { name: "Product 1", price: 20, category: "Electronics" },
  { name: "Product 2", price: 30, category: "Clothes" },
  { name: "Product 3", price: 40, category: "Electronics" },
  { name: "Product 4", price: 50, category: "Clothes" },
  { name: "Product 5", price: 60, category: "Clothes" },
  { name: "Product 6", price: 70, category: "Electronics" },
  { name: "Product 7", price: 80, category: "Clothes" },
  { name: "Product 8", price: 90, category: "Electronics" },
];
```
Result
```javascript
[ 
  { category: 'Clothes', average: 55 },
  { category: 'Electronics', average: 55 }
]
```

Solution
```javascript
const products = [
  { name: "Product 1", price: 20, category: "Electronics" },
  { name: "Product 2", price: 30, category: "Clothes" },
  { name: "Product 3", price: 40, category: "Electronics" },
  { name: "Product 4", price: 50, category: "Clothes" },
  { name: "Product 5", price: 60, category: "Clothes" },
  { name: "Product 6", price: 70, category: "Electronics" },
  { name: "Product 7", price: 80, category: "Clothes" },
  { name: "Product 8", price: 90, category: "Electronics" },
];

/* Use map to create a dictionary with category as the key
and an array of products as the value */
const productsByCategory = products.reduce((acc, product) => {
  const category = product.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(product);
  return acc;
}, {});

// Use map to calculate the average price for each category
const avgPriceByCategory = Object.keys(productsByCategory).map(category => {
  const sum = productsByCategory[category].reduce((acc, product) => acc + product.price, 0);
  return { category: category, average: sum / productsByCategory[category].length };
});

// Use filter to only select categories with an average above a certain threshold
const highPricedCategories = avgPriceByCategory.filter(category => category.average > 50);
```

This code is using JavaScript's **`reduce`** and **`map`** methods to process an array of products and group them by category, calculate the average price of each category, and then **`filter`** the categories that have an average price greater than 50.

It starts by using the **`reduce`** method on the array of products and an empty object as an initial **`accumulator`**. The **`callback`** function passed to **`reduce`** takes in two arguments: an **`accumulator`** object and the current **`product`**.

It assigns the product's category to a variable category, and checks if the **`accumulator`** object already contains a key for this category. If it doesn't, it creates a new key on the **`accumulator`** object with an empty array as its value. It then pushes the current **`product`** into the array of the corresponding category and returns the **`accumulator`** object.

In the end, **`productsByCategory`** will be an object where each key is a category name, and the value is an array of products that belong to that category.

Next, it uses **`Object.keys(productsByCategory)`** to extract the keys (category names) of the **`productsByCategory`** object and then **`map`** method to iterate over these keys and calculate the average price of products in each category. It calculates the sum of prices of all products in each category using **`reduce`** method and divides this sum with the number of products in that category.

Finally, it filters the categories that have an average price greater than 50 using **`filter`** method.


## HR VS IT Department

You are given an array of objects representing a collection of employees, each with a name, salary, and department. Your task is to use map, filter, and reduce to calculate the average salary for each department and then return an array of objects containing only the departments that have an average salary above 65000.

Helpful links
- [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
- [Array.prototype.push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
- [Array.prototype.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Input

```javascript
const employees = [
  { name: "John", salary: 50000, department: "IT" },
  { name: "Jane", salary: 60000, department: "HR" },
  { name: "Bob", salary: 55000, department: "IT" },
  { name: "Sophie", salary: 75000, department: "HR" },
  { name: "Mike", salary: 65000, department: "IT" },
  { name: "Emily", salary: 80000, department: "HR" },
  { name: "David", salary: 70000, department: "IT" },
];
```
Result

```javascript
[
  { department: 'HR', average: 71666 }
]
```

Solution
```javascript
const employees = [
  { name: "John", salary: 50000, department: "IT" },
  { name: "Jane", salary: 60000, department: "HR" },
  { name: "Bob", salary: 55000, department: "IT" },
  { name: "Sophie", salary: 75000, department: "HR" },
  { name: "Mike", salary: 65000, department: "IT" },
  { name: "Emily", salary: 80000, department: "HR" },
  { name: "David", salary: 70000, department: "IT" },
];

/* Use reduce to create a dictionary with department as the key
and an array of employee objects as the value */
const employeesByDepartment = employees.reduce((acc, employee) => {
  const department = employee.department;
  if (!acc[department]) {
    acc[department] = [];
  }
  acc[department].push(employee);
  return acc;
}, {});

// Use map to calculate the average salary for each department
const avgSalaryByDepartment = Object.keys(employeesByDepartment).map(department => {
  const sum = employeesByDepartment[department].reduce((acc, employee) => acc + employee.salary, 0);
  return { department: department, average: sum / employeesByDepartment[department].length };
});

// Use filter to only select departments with an average above a certain threshold
const highPaidDepartments = avgSalaryByDepartment.filter(department => department.average > 65000);
```

This code is working with an array of objects representing employees and their salaries and department. It performs three operations: creating a dictionary with **`department`** as the key and an array of **`employee`** objects as the value, calculating the average salary for each department, and filtering the departments with an average salary above a certain threshold.

First, the **`reduce`** method is used to iterate through the array of employees, and create a dictionary object by applying a function to each **`employee`** object. The function passed to the **`reduce`** method takes two arguments, **`acc`** and **`employee`**, where **`acc`** is the **`accumulator`** object, initially set to an empty object, and **`employee`** is the current element being processed.

The function first gets the department from the current **`employee`** object, and if the department does not exist in the **`accumulator`** object, it creates an array for that department. Then it pushes the current **`employee`** object to the array for that department. Finally, it returns the **`accumulator`** object with the updated **`department`** and **`employee`** arrays.

The **`Object.keys`** method is then used to get all the departments from the **`accumulator`** object, then the **`map`** method is used to iterate through the departments and create a new array by applying a function to each **`department`**. The function passed to the **`map`** method takes one argument, **`department`**, which is the current element being processed.

It first calculates the sum of all the salary of employees in that department using the **`reduce`** method on the **`department`** array and then returns an object with the department name and average salary which is the sum of salary divided by the number of employees in that **`department`**.

Finally, the **`filter`** method is used to iterate through the array of department averages, and create a new array by applying a function to each **`department`** object. The function passed to the **`filter`** method takes one argument, **`department`**, which is the current element being processed, and it returns a Boolean value that indicates whether the department's average salary is greater than 65000 or not.
