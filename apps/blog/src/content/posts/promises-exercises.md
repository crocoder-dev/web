---
title: "Promises - Code Exercises"
description: "Explore JavaScript Promises with exercises on random resolution, chained arithmetic, parallel data fetching, fastest response, and cancellation. Improve your async skills with concise code and clear explanations. Learn effective methods for handling promises, simplifying errors, and creating resilient, maintainable code."
createdAt: 1705592903000
updatedAt: 1705592903000
authors: ["david"]
category: "Learn Javascript"
editors: ["velimir"]
abstract: "This article dives into the world of JavaScript Promises with hands-on exercises, exploring essential concepts like random resolution, chained arithmetic operations, and parallel data fetching. The blog post equips developers with practical solutions for managing asynchronous tasks efficiently, streamlining error handling, and enhancing code readability. The blog includes a unique interview question by ThePrimeagen that challenges the reader to design an asynchronous request queue with a three-task concurrency limit."
image: "/images/promises-exercises.png"
draft: false
---

Promises in JavaScript are an essential tool for managing asynchronous operations with ease and clarity. They assure that a certain piece of work will be done at a later time. This is incredibly useful for tasks that need to wait for something else to finish, like fetching data from a website.

Instead of juggling multiple callbacks, which can quickly become unwieldy and hard to follow, promises allow developers to chain operations in a linear and readable manner. This is done through **`.then()`** for successful operations, and **`.catch()`** for handling errors. This not only enhances code readability but also streamlines error handling, making the code more robust and maintainable.

Also take a look at these exercises:

- [JavaScript DOM](https://www.crocoder.dev/blog/the-dom-exercises/)
- [Callbacks](https://www.crocoder.dev/blog/callbacks-exercises/)
- [Map, Filter, Reduce](https://www.crocoder.dev/blog/map-filter-reduce-exercises/)
- [React Hooks](https://www.crocoder.dev/blog/how-to-write-custom-react-hooks/)

## Contents

## 50% of the time works 100% of the time

Create a JavaScript Promise that, after a delay of 2 seconds, either resolves with the message "Hello World" or rejects with the error message "Error occurred". 

The outcome (resolve or reject) should be determined by a random condition, ensuring a 50/50 chance of either occurring each time the code runs.

::title Helpful links

- [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)
- [Promise() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)
- [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)


::title Input

```javascript
randomPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
```

::title Result

```javascript
// 50% of the time console.logs
"Hello World"

// 50% of the time console.errors
"Error occurred"
```

::details Show Solution

```javascript
const randomPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Randomly decide whether to resolve or reject
    const shouldResolve = Math.random() > 0.5;

    if (shouldResolve) {
      resolve("Hello World");
    } else {
      reject("Error occurred");
    }
  }, 2000);
});

randomPromise
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });
```

The Promise is constructed with an executor function that invokes **`setTimeout`** to simulate a 2-second asynchronous operation.

Within the **`setTimeout`** callback, a random boolean **`shouldResolve`** is determined using **`Math.random() > 0.5`**. This expression has a 50% chance to evaluate a value as either true or false.

The Promise is resolved with "Hello World" if shouldResolve is true, and rejected with "Error occurred" if false. **`Promise.then()`** and **`Promise.catch()`** methods are attached to the Promise to handle its resolution and rejection, respectively.

Each execution of this code has an equal probability of either resolving or rejecting the Promise, demonstrating the handling of different Promise states in a single code structure.

::enddetails


## Chain some Math with Promises

Input a number, double it, increase it by 10, and then multiply by 3.

Each operation should be in a separate Promise and then chained together.

::title Helpful links

- [Promise() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)
- [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

::title Input

```javascript
const value = 5;

double(value)
  .then(addTen)
  .then(multiplyByThree)
  .then((result) => {
    console.log(result);
  });

```

  </Column>

  <Column>

::title Result

```javascript
40
```

::details Show Solution

```javascript

const value = 5;

const double = (value) => new Promise((resolve) => resolve(value * 2));

const addTen = (value) => new Promise((resolve) => resolve(value + 10));

const multiplyByThree = (value) => new Promise((resolve) => resolve(value * 3));

double(value)
  .then(addTen)
  .then(multiplyByThree)
  .then((result) => {
    console.log(result);
  });

```

::enddetails

Each function returns a Promise that performs an arithmetic operation and resolves immediately. 

The initial value is passed through the chain, undergoing each operation sequentially. 

The final result is logged, demonstrating the cumulative effect of the chained operations.


## Fetch data in parallel

Using fetchSimulator simulate fetching data from three different URLs in parallel. 

Each "fetch" will be represented by a Promise that resolves after a delay taken from the delays array. 

Use **`Promise.all`** to wait for all these Promises to resolve and then process the results.

::title Helpful links

- [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

::title Input

```javascript

const delays = [800, 1200, 1000];

const fetchSimulator = (url, delay) => {
    return new Promise(resolve => setTimeout(() => resolve(`Data from ${url}`), delay));
};

```

::details Show Solution

```javascript
const delays = [800, 1200, 1000];

const fetchSimulator = (url, delay) => {
  return new Promise(resolve => setTimeout(() => resolve(`Data from ${url}`), delay));
};

const data1 = fetchSimulator('https://crocoder.dev/data1', delays[0]);
const data2 = fetchSimulator('https://crocoder.dev/data2', delays[1]);
const data3 = fetchSimulator('https://crocoder.dev/data3', delays[2]);

Promise.all([data1, data2, data3])
  .then((responses) => {
    console.log('All data fetched:', responses);
  });

```
Three simulated fetch requests are created with different delays. **`Promise.all`** is used to wait for all these Promises to resolve.

Once all Promises resolve, their results are processed together, showcasing the ability of **`Promise.all`** to synchronize multiple asynchronous operations.

::enddetails


## The fastest response wins

Using fetchSimulator simulate fetching data from three different URLs with a twist. 

Each "fetch" will be represented by a Promise that resolves after a delay taken from the delays array. 

Use **`Promise.race`** to get the fastest response!

::title Helpful links

- [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

::title Input

```javascript

const delays = [800, 1200, 1000];

const fetchSimulator = (url, delay) => {
    return new Promise(resolve => setTimeout(() => resolve(`Data from ${url}`), delay));
};


```

::details Show Solution

```javascript
const delays = [800, 1200, 1000];

const fetchSimulator = (url, delay) => {
  return new Promise(resolve => setTimeout(() => resolve(`Data from ${url}`), delay));
};

const data1 = fetchSimulator('https://crocoder.dev/data1', delays[0]);
const data2 = fetchSimulator('https://crocoder.dev/data2', delays[1]);
const data3 = fetchSimulator('https://crocoder.dev/data3', delays[2]);

Promise.race([data1, data2, data3])
  .then((response) => {
    console.log('This is the fastest response:', response);
  });

```
Each Promise is set to resolve after a different duration. 

**`Promise.race()`** is used to wait for only the first Promise to resolve. Once the first Promise resolves, its result is processed. 

This demonstrates how **`Promise.race()`** can be used to handle scenarios where only the first completion (or error) in a group of asynchronous operations is of interest.

::enddetails


## Cancel a running Promise

Create a Promise that simulates a data fetching operation with a delay. Introduce a cancellation token that can be used to cancel the Promise before it resolves. 

If the operation is cancelled, the Promise should reject with a "Cancelled" message; otherwise, it should resolve normally.

Cancel it!

::title Helpful links

- [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Promise() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)
- [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

::title Input

```javascript
function createCancellationToken() {
    let cancel;
    const token = new Promise((_, reject) => {
        cancel = () => reject(new Error('Cancelled'));
    });
    return { token, cancel };
}

const { token, cancel } = createCancellationToken();

const fetchPromise = fetchData(token);

// Simulate user cancellation after 1.5 seconds
setTimeout(() => {
    cancel();
}, 1500);

fetchPromise
    .then(data => console.log(data))
    .catch(error => console.error(error.message));
```

::details Show Solution

```javascript
function createCancellationToken() {
    let cancel;
    const token = new Promise((_, reject) => {
        cancel = () => reject(new Error('Cancelled'));
    });
    return { token, cancel };
}

function fetchData(cancellationToken) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 3000);

        cancellationToken.token.catch(() => {
            reject(new Error('Operation cancelled'));
        });
    });
}

const { token, cancel } = createCancellationToken();

const fetchPromise = fetchData({ token });

// Simulate user cancellation after 1.5 seconds
setTimeout(() => {
    cancel();
}, 1500);

fetchPromise
    .then(data => console.log(data))
    .catch(error => console.error(error.message));
```
The **`createCancellationToken`** function is designed to generate a cancellation token along with a `cancel` function. This `cancel` function, upon invocation, leads to the rejection of the token's associated promise. 

Concurrently, the `fetchData` function is structured to accept this cancellation token as a parameter, returning a Promise that signifies the ongoing data retrieval process.

Within `fetchData`, a delay is emulated through a timeout, and simultaneously, a monitoring mechanism is established on the cancellation token. 

In scenarios where the token's promise faces rejection, i.e., is cancelled, the function takes action to both clear the data fetching timeout and reject the fetch promise. 

This fetch promise embodies the asynchronous nature of the data-fetching task. The cancellation token is an integral part of this operation, as it is fed into the fetch promise. 

In a typical flow, after a wait of 1.5 seconds, the `cancel` function is executed. This action triggers the rejection of the token's promise, consequently aborting the data fetch process. 

To manage the outcomes of the fetch promise, the `.then` and `.catch` methods are employed for handling its resolved and rejected states, respectively.

::enddetails


## ThePrimeagen's interview question

This exercise is a [ThePrimeagen's interview question](https://www.youtube.com/watch?v=3v_oXH3y5uM&t=304): Create an asynchronous request queue that manages the execution of tasks, ensuring that no more than three tasks run simultaneously.

Design a queue system that accepts promise factories (functions that return promises) and manages their execution. The queue should execute these promise factories but must limit the number of concurrently running tasks to three. When one task is completed, the next task in the queue should start.

Steps to implement

Implement a queue (can use an array for simplicity) to hold the promise factories.

Create a function to manage the execution of tasks. This function should handle the invocation of promise factories and maintain the count of concurrently running tasks.

Ensure that no more than three tasks are running at any given time. When a task is completed, the next task in the queue (if any) should start.

Create several promise factories that simulate async tasks with different durations.

Add these factories to the queue and test if the queue correctly limits the concurrency and processes tasks in the order they were added.

::title Helpful links

- [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [Promise() constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)
- [Promise.prototype.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
- [Promise.prototype.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)


::details Show Solution

```javascript
class AsyncQueue {
    constructor(concurrencyLimit) {
        this.tasks = [];
        this.runningTasks = 0;
        this.concurrencyLimit = concurrencyLimit;
    }

    // Function to add tasks to the queue
    enqueue(task) {
        this.tasks.push(task);
        this.runNext();
    }

    // Function to execute the next task
    runNext() {
        if (this.runningTasks < this.concurrencyLimit && this.tasks.length) {
            const task = this.tasks.shift();
            this.runningTasks++;
            task().then(() => {
                this.runningTasks--;
                this.runNext();
            });
        }
    }
}

// Creating the queue with a concurrency limit of 3
const queue = new AsyncQueue(3);

// Promise factory function
const createTask = (duration) => {
    return () => new Promise(resolve => {
        console.log(`Task started (Duration: ${duration}ms)`);
        setTimeout(() => {
            console.log(`Task completed (Duration: ${duration}ms)`);
            resolve();
        }, duration);
    });
};

// Adding tasks to the queue
for (let i = 1; i <= 10; i++) {
    queue.enqueue(createTask(i * 1000));
}
```
The **`AsyncQueue`** class manages and regulates task execution, maintaining a concurrency limit of no more than three tasks at any given time. This is achieved through its enqueue method, which plays a crucial role in adding new tasks to the queue. Once a task is enqueued, the enqueue method promptly invokes the **`runNext`** function to assess whether the task can be initiated immediately. The **`runNext`** method checks the current count of active tasks; if this count falls below the predefined concurrency limit, the method proceeds to launch the next task in line, simultaneously updating the count of running tasks.

Each task within this system is essentially a promise factory, designed to simulate an asynchronous operation. This is typically represented through the use of **`setTimeout`**, which allows each task to log both its initiation and completion, thereby mimicking the behavior of an asynchronous process. The completion of a task is a critical event, as it triggers the decrement of the running task count, creating room for additional tasks to be executed. Subsequently, the runNext method is called again to potentially initiate the next queued task, if available.

This entire mechanism, as embodied by the **`AsyncQueue`** class, exemplifies a prevalent and practical pattern in software development. It is particularly relevant in scenarios requiring meticulous management of asynchronous tasks, where the control over task execution and the limitation of concurrency are of paramount importance. The use of queues and promise factories in this context is not only effective but also illustrates a common approach to handling similar challenges in various programming environments.

::enddetails

