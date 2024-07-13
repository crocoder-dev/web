---
title: "Typescript Enums: The Good, The Bad, and The Ugly"
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

Enums, short for "enumerations," are a type of data structure commonly found in programming languages. An enum defines a set of named values, typically representing a collection of related constants or options.

Instead of using arbitrary values or strings to represent these options, you can use an enum to enforce type safety and provide a clear and predefined list of choices.

Before JavaScript gets their own [enums](https://github.com/rbuckton/proposal-enum), we are stuck with TypeScript.

TypeScript enums seem to fit right in with types, interfaces and all-around typesafety of TypeScript, but there are curiously underutilized in most **ts** codebases.

```typescript

enum TypeScript {
  Good,
  Bad,
  Ugly,
}

```

## The Good

In TypeScript, similarly to any other language, enum variants can be assigned to a number or a string value. These values can't be reassigned later in the code.

```typescript

enum Role {
  User = 10,
  Admin = 50
}

```
The cool part is that you can compare and manipulate enum variant values, so you can write something like:

```typescript

const userRole = Role.User;

if(userRole >= Role.Admin) {
  console.log("User is admin");
}

```

This way you can always compare the enum variant values create conditional statements based on them. For example, you can write an **`if`** statement that checks whether the **`userRole`** is greater than or equal to **`Role.Admin`**.


If you create a conditional statement using enums which can never be satisfied, like in the code below, **tsc** will throw an compile time error.

```typescript

const userRole = Role.User;

if(userRole !== Role.User || userRole !== Role.Admin) {
  // Error: This comparison appears to be unintentional 
  // because the types 'Role.User' and 'Role.Admin' have no overlap.
}

```

When creating discriminated unions, you can use an enum as their kinds. This way your conditional statements using discriminated unions don't need to have hardcoded values and can have all the upsides of enums.


```typescript

enum ShapeKind {
  Circle = "CIRCLE",
  Square = "SQUARE",
  Triangle = "TRIANGLE"
}
// 

// Shape type definition using discriminated unions
type Shape =
  | { kind: ShapeKind.Circle; radius: number }
  | { kind: ShapeKind.Square; x: number }
  | { kind: ShapeKind.Triangle; x: number; y: number };

// returns area of a shape
function area(s: Shape) {
  switch(s.kind) {
    case ShapeKind.Circle:
      return Math.PI * s.radius * s.radius;
    case ShapeKind.Square:
      return s.x * s.x;
    case ShapeKind.Triangle:
      return (s.x * s.y) / 2;
    default:
      throw new Error('Invalid shape');
  }
}
```

To summarize everything, the good things about enums are:

👉 They can be assigned either numeric or string values, and these values cannot be reassigned later in the code.

👉 Enum variant values can be compared and manipulated, allowing for the creation of conditional statements based on them.

👉 If a conditional statement using enums is constructed in a way that can never be satisfied, the TypeScript compiler (tsc) will throw a compile-time error, helping to catch potential issues.

👉 Enums can be utilized as kinds in discriminated unions, enabling conditional statements without hardcoding values and leveraging the benefits of enums.


## The Bad

Let's take the next example, and try to guess if **'???'** will be logged.

```typescript
enum TypeScript {
  Good,
  Bad,
  Ugly,
}

const ts = TypeScript.Bad;

if(ts) {
  console.log('???')
}

```

Of course, the answer is yes. But why is that?

If you don't assign enum variant values, they will be assigned to 0, 1, 2, etc.

Well that means that first enum variant value will be falsy, and every other value will be truthy. 😠


Remember how you can't reassign the enum variant values? Well, that's not entirely true. You can do it, but you shouldn't.

```typescript

enum TypeScript {
  Good,
  Bad,
  Ugly,
}

(TypeScript as any).Bestest = 3; // This works!

```

Can we try to make enums readonly or freeze them? 

```typescript

enum TypeScript {
  Good,
  Bad,
  Ugly,
}

Object.freeze(TypeScript); // This works!

(TypeScript as any).Bestest = 3; // This throws an error

```

How can we use **`Object.freeze`** on an enum?

Well, TypeScript enums are actually just syntactic sugar for objects, under the hood they are just objects with keys and values. 

Let's take a look at the compiled code:

```typescript

"use strict";
var TypeScript;
(function (TypeScript) {
    TypeScript[TypeScript["Good"] = 0] = "Good";
    TypeScript[TypeScript["Bad"] = 1] = "Bad";
    TypeScript[TypeScript["Ugly"] = 2] = "Ugly";
})(TypeScript || (TypeScript = {}));
Object.freeze(TypeScript);
TypeScript.Bestest = 3;

```

So our **`TypeScript`** enum is just an object that looks like:

```typescript

const TypeScript = {
  0: "Good",
  1: "Bad",
  2: "Ugly",
  Good: 0,
  Bad: 1,
  Ugly: 2,
}

```

TL;DR -> The bad things about enums are:

👉 TypeScript enums are essentially objects with keys and values.

👉 When enum variant values are not explicitly assigned, they are automatically assigned numeric values starting from 0. This means that the first enum value variant is falsy, while every other value is truthy.

👉 Although enum variant values are intended to be constants and should not be reassigned, it is technically possible to do so.


## The Ugly

If you have read the previous section, you can compare and manipulate enum variant values, so you can write something like:

```typescript

enum ShapeKind {
  Circle = "CIRCLE",
  Square = "SQUARE",
  Triangle = "TRIANGLE"
}

const circle = ShapeKind.Circle;

if(circle === "CIRCLE") {
  console.log("Circle");
}

```

In the **`if`** statement above, we are comparing an enum value with a string. This is a valid TypeScript code, but it's not a good practice.

Why you ask? Well, if you change the enum variant value, you will have to change the string value as well. This is a recipe for disaster.

So you can rewrite the whole thing like this:

```typescript

type ShapeKind = "CIRCLE" | "SQUARE" | "TRIANGLE";

if(circle === "CIRCLE") {
  console.log("Circle");
}

```

This way you can avoid using enums, and you can still have similar level of type safety.

In both of these examples, if you don't enforce enums, you will have random hardcoded strings in your codebase.

If you haven't noticed, enums are objects, so you can iterate over an enum.

```typescript

enum ResponseState {
  Loading,
  Failure,
  Success,
};

for (const r in ResponseState) {
  console.log(r);
}

```

You would expect this code to log **`Loading`**, **`Failure`**, **`Success`**, but it will log **`Loading`**, **`Failure`**, **`Success`**, **`0`**, **`1`**, **`2`**.

Take a look at the previous section, and you will see how an enum is compiled to an object.

We can stop devs accidentally iterating over enums by using **`const enum`** instead of **`enum`**.

```typescript

const enum ResponseState {
  Loading,
  Failure,
  Success,
};

const l = ResponseState.Loading;

```

The previous code will be compiled to:

```typescript

"use strict";
;
const l = 0 /* ResponseState.Loading */;

```

This way we can get enums without the runtime overhead, but... there are a lot of pitfalls with **`const enum`**. You should checkout [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/enums.html#const-enum-pitfalls) for more info.

👉 Comparing enums with hardcoded values: While it is possible to compare enum values with hardcoded values, it is generally not recommended.

👉 Enums in TypeScript are represented as objects, which means they can be iterated over.

👉 By using **`const enum`** instead of **`enum`**, you can eliminate the runtime overhead associated with enums. However, there are potential pitfalls and limitations with **`const enum`** that should be considered. 

## Type Envy: Enums in other languages

Let's take a moment to admire and be envious of the implementation of enums in other languages.

In java you can add getters to enums, private fields, constructors and assign tuple values to them. 

So you can write something like:

```java

enum States {
    //...
    MASSACHUSETTS("Massachusetts",  "MA",   6981974),
    MICHIGAN     ("Michigan",       "MI",   10077331);

    private final String full;
    private final String abbr;
    private final Integer population;

    private States(String full, String abbr, Integer population) {
        this.full = full;
        this.abbr = abbr;
        this.population = population;
    }

    public String getFullName() {
        return full;
    }

    public String getAbbreviatedName() {
        return abbr;
    }

    public Integer getPopulation(){
        return population;
    }
}

```

So you can initialize a state variable, and get the full name, abbreviated name and population of the state.

```java

States state = States.MASSACHUSETTS;
System.out.println(state.getFullName()); // Output: Massachusetts
System.out.println(state.getAbbreviatedName()); // Output: MA
System.out.println(state.getPopulation()); // Output: 6981974

```
Pretty nice, right? 🫶

Or even better in a certain crab language, enums are [algebraic data types](https://en.wikipedia.org/wiki/Algebraic_data_type).

Rather than having an enum inside a struct, you can put data directly into each enum variant. 

Afterwards, you can do cool stuff like [pattern matching on the enum variants](https://doc.rust-lang.org/book/ch06-00-enums.html) and extract the data from them.

```rust 

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
    UpdateUser(User)
}

struct User {
    username: String,
    email: String,
    age: i32
}

fn main() {
    let message_move = Message::Move { x: 10, y: 20 };
    let message_write = Message::Write(String::from("Hello, world!"));
    let message_change_color = Message::ChangeColor(255, 255, 255);
    let message_update_user = Message::UpdateUser(User {
        username: String::from("davidabram"),
        email: String::from("hello@crocoder.dev"),
        age: 33
    });
}

```
I feel envious of Rust enums, and I would love to have something similar in TypeScript.

Very nice! 🦀🦀🦀🦀🦀

## Conclusion

Enums are a useful data structure in programming languages. TypeScript enums are a fine tool for creating a set of related constants or options. Depending on the use case, **ts** enums go really quickly from useful to bad, to ugly.

Personally, I can't wait for JavaScript to get their own [enums](https://github.com/rbuckton/proposal-enum), so we can finally have a good implementation of enums in TypeScript. 
