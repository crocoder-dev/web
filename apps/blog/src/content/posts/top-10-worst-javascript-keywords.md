---
title: "Top 10 worst JavaScript keywords"
description: "A who's who of coding nightmares that will make you miss Internet Explorer 7. Discover these 'gems' and their quirky charms, and learn how to tame them into submission. Perfect for a laugh, or a cry, depending on your debugging skills!"
createdAt: 1700742891471
updatedAt: 1700742891471
authors: ["david"]
category: "Learn Javascript"
editors: ["velimir"]
abstract: "This article presents a critical examination of the most problematic JavaScript keywords that often lead to bugs and frustration among developers. The author shares personal experiences and insights into the quirks of these keywords, especially when dealing with legacy issues like Internet Explorer 7 support. The keywords critiqued include instanceof, loose equality (== and !=), delete, new Function, void, this, arguments, var, eval, and with. Each keyword is discussed in detail, outlining its limitations, unexpected behaviors, and why it can be considered one of the worst features of JavaScript. The article also provides alternative methods and best practices to avoid the pitfalls associated with these keywords, ultimately guiding developers towards writing cleaner and more maintainable JavaScript code."
image: "/images/top-10-worst-javascript-keywords.png"
draft: false
---

Could you run this code?

```javascript
Array(16).join('wat' - 1) + ' Batman!'
```

It should light up the mood a bit because this article isn't about JavaScript quirks. It's about the objectively worst and most annoying features of the language.

I have encountered an uncountable amount of bugs written in the code because of these keywords. My hair got gray when I needed to support Internet Explorer 7, where all the modern JavaScript keywords weren't available.

Back in 2007, we didn't know better. We have used the tools that were there. As JavaScript developers, we had a saying back in the time: *"At least our company doesn't use [Silverlight](https://en.wikipedia.org/wiki/Microsoft_Silverlight)."*


## Contents


## instanceof

The `instanceof` keyword doesn't really suck, but it does have its limitation and weird behaviors.  
`instanceof` is used to verify whether the prototype property of a constructor appears anywhere in the prototype chain of an object and that often can yield unexpected results if the prototype chain has been modified. 🙄

```javascript

function Dog(name) {
  this.name = name;
}

let dog = new Dog("Rex");

// Alter the prototype chain
function Bird(name) {}
Dog.prototype = Object.create(Bird.prototype);

// instanceof fails because the prototype chain was altered
console.log(dog instanceof Dog); // false

```

`instanceof` is not reliable for primitive data types such as strings, numbers, or booleans, because these types are not objects and do not have a prototype chain.

```javascript
let meaningOfLife = 42;

// instanceof fails with primitives
console.log(meaningOfLife instanceof Number); // false
```

Considering JavaScript's dynamic nature, what it's more important is whether an object can perform the tasks required—this concept, known as "duck typing," prioritizes an object's capabilities over its inheritance structure. `instanceof` if usually used in niche situations where you are actively manipulating prototype.

## == and !=


While `==` is not a keyword, I dislike it so much that I put it on The worst keyword list. The `==` and `!=` operators are often considered bad because they perform type coercion, which means they convert the types of the values being compared if they are not the same.

For example, when you compare `"0" == 0`, it returns true because the string `"0"` is coerced into a number before the comparison. Similarly, `true == 1` also returns `true` because true is coerced to the number `1`.

It's generally recommended to use the `===` and `!==` operators instead, which are known as the "strict equality" and "strict inequality" operators, respectively. These operators do not perform type coercion, and they only return true if the values being compared have the same type and value. So, with strict equality, `"0" === 0` would return `false`, which is more intuitive and predictable.

The only reason this is not higher on the list is because Kyle Simpson is a [great advocate for type coercions in JS](https://frontendmasters.com/teachers/kyle-simpson/).

## delete

The delete keyword's behavior is counterintuitive and almost always problematic. It's limited to object properties and doesn't touch immutable values like strings or numbers, nor does it work as expected with variables.

When you try to delete an array element, it merely sets that element to `undefined` without altering the array's size. Delete doesn't free up memory if the property being deleted references an object that's still referenced elsewhere.

Performance-wise, using delete can cause JavaScript engines to de-optimize due to alterations in the object's structure.
All of these quirks make delete awful for managing data structures efficiently in JavaScript.

Delete has some great alternatives, for object you can reassign properties:

```javascript

let user = {
  name: 'Alice',
  age: 25,
  email: 'alice@acme.com'
};

// Instead of delete user.age, we can set it to undefined
user.age = undefined;

console.log(user); // Output will show age as undefined

```

Or even better, use `Map`:

```javascript
let map = new Map();
map.set('name', 'Alice');
map.set('age', 25);
map.set('email', 'alice@acme.com');

// When you want to remove 'age'
map.delete('age'); // This is efficient in a Map

console.log(map); // Map will now contain the 'name' and 'email key
// Map(2) {'name' => 'Alice', 'email' => 'alice@acme.com'}
```

For arrays you can use `Array.splice()`:

```javascript
let numbers = [1, 2, 3, 4, 5];

// To remove the element at index 2 (the number 3)
numbers.splice(2, 1); // First argument is the index, second is the number of elements to remove

console.log(numbers); // Output will be [1, 2, 4, 5]
```

or `Array.filter()`

```javascript
let numbers = [1, 2, 3, 4, 5];

// To create a new array without the number 3
let filteredNumbers = numbers.filter(number => number !== 3);

console.log(filteredNumbers); // Output will be [1, 2, 4, 5]
```

## new Function

I will guess that you have probably not seen this used anywhere in code before.

```javascript
var add = new Function('a', 'b', 'return a + b');

// Now we can call the function
const result = add(2, 3)); // Output will be 5
```

How about just using a regular, old, and trusty function?

```javascript
function add(a, b) {
  return a + b;
}
```

The downsides are many, I will just list some of them:

**Security Risks**: Since it can run any code if you use user input to create the function, it can potentially lead to security vulnerabilities, like arbitrary code execution.

**Performance**: Functions created with `new Function` are not optimized by JavaScript engines as much as regular functions because they are generated at runtime.

**Debugging Difficulties**: Code created with `new Function`are harder to debug, as they do not show up properly in stack traces and it's not as straightforward as named functions written directly in your codebase.

**Scope Limitation**: Functions created using `new Function` do not have access to the local scope where they are created; they only have access to their scope and the global scope, which limits their usefulness in modular and scoped JavaScript code.

**Readability**: It makes code harder to read and maintain because it's not immediately clear what the hell is the function doing, especially if the function body is constructed from concatenated strings or other dynamic means.

The `new Function` is this low on the list just because it has a far more evil twin called `eval`.

The one, uh, seemingly useful thing about `new Function` is that you can easily create a function factory. Of course, you can create a function factory without it.

```javascript
function makeMultiplier(multiplier) {
  return function (x) {
    return x * multiplier;
  };
}

// Create a function that will multiply its input by 2
var double = makeMultiplier(2);

console.log(double(3)); // Outputs: 6
console.log(double(4)); // Outputs: 8

// Create a function that will multiply its input by 10
var tenTimes = makeMultiplier(10);

console.log(tenTimes(3)); // Outputs: 30
console.log(tenTimes(4)); // Outputs: 40
```

Personally, I find this code easier to read and understand than having the whole body of the function stringified.

## void

The `void` keyword has a pretty niche role, cementing its position of being an oddball between all other keywords. 

It's used to process an expression and then spit out `undefined`.

If you are scratching your head, wondering why there is a need to go out of your way to get `undefined`, you are not alone.

```javascript
function myFunction() {
  void 0; // Explicitly return undefined.
}

// When the function is called, it returns undefined.
const result = myFunction();
console.log(result); // Outputs: undefined
```

It doesn't do wonders for readability either; unless you're in the know, void won't make much sense at a glance. And when you're trying to get the same outcome that `void` offers, there's usually another way to do it that doesn't involve `void` at all.

```javascript 
function myFunction() {
    return undefined; // Explicitly return undefined.
}

// When the function is called, it returns undefined.
const result = myFunction();
console.log(result); // Outputs: undefined
```
The one weird example where is fine to use `void` is within a hyperlink to execute JavaScript code without affecting the current page:

```html
<a href="javascript:void(0)" onclick="console.log('Link clicked without navigating away');">
  Click Me!
</a>
```
I mean, it's fine if you don't care about UX people yelling at you.




## this

Ah yes, `this`, my old nemesis, the source of countless bugs, the keyword that every developer greet with a weary sigh.

So, why does `this` get such a bad rap? Well, it's all about context. `this` can change its value depending on where and how you call your function.

Is it a method? Is `this` an object? Is it a regular function? Oops, `this` is now the global context (or `undefined` in strict mode). Used in an event handler? Surprise, `this` is the element that fired the event!

It's not that scary when you get the hang of it. There's `.bind()`, a magic binding spell that binds `this` to whatever object you dictate: 

```javascript
function greet() {
    console.log(`Hello, I am ${this.name}`);
}

const greeter = { name: 'Bindy McBindFace' };
const boundGreet = greet.bind(greeter);

boundGreet(); // Outputs: 'Hello, I am Bindy McBindFace'
```

Alternatively, if you need to work with `this` on the fly, for immediate invocation use `.call()` to spread out arguments one by one, or `.apply()` to squeeze them into a single array.

```javascript
function introduce(language, hobby) {
    console.log(`Hello, I am ${this.name}, I love ${language} and ${hobby}`);
}

const user = { name: 'Caller McCallFace' };
introduce.call(user, 'JavaScript', 'coding'); 
// Outputs: 'Hello, I am Caller McCallFace, I love JavaScript and coding'
introduce.apply(user, ['JavaScript', 'coding']); // Does the same as call
```

Even better, just use arrow functions:

```javascript
const hero = {
    name: 'Dynamic Duo',
    regularFunction: function() {
        console.log(this.name); // Here, 'this' refers to 'hero'
    },
    arrowFunction: () => {
      console.log(this.name); 
      // 'this' is taken from the surrounding scope where 'arrowFunction' is defined
    }
};

hero.regularFunction(); // Outputs: 'Dynamic Duo'
hero.arrowFunction(); // Outputs: nil if global scope doesn't have a 'name' property
```

In my opinion, it's best to not use `this` at all.

## arguments

The arguments keyword in JavaScript kinda works but is frustratingly clunky. It's a bit of a dinosaur in the modern JavaScript world. It's an array-like object that contains all the arguments passed to a function. 

But here's the thing: it only looks like an array, which means you can't use all those array methods like slice or forEach directly on it.

If you want to use it in arrow functions, you are out of luck, `arguments` is shunned by these modern functions!

Instead, you can use the rest parameters.

```javascript
// Define a function using rest parameters to collect arguments
function collectIngredients(...ingredients) {
  console.log(ingredients); // This will be an array of all arguments passed
}

// Now you can pass as many ingredients as you want
collectIngredients('eggs', 'flour', 'sugar', 'chocolate');
// Output: ['eggs', 'flour', 'sugar', 'chocolate']
```

Simple, concise and without the problems mentioned before.

## var

`var` is my favorite keyword to stumble upon in legacy code.

```javascript
if (true) {
  var globalPartyCrasher = "I'm everywhere!";
}

console.log(globalPartyCrasher); // "I'm everywhere!"
```

`var` doesn't care about your code blocks. 😎

```javascript
var cat = "Whiskers";
console.log(cat); // Whiskers

var cat = "Salem";
console.log(cat); // Salem - Whiskers is no more.

function adoptCat() {
  var cat = "Garfield";
  console.log(cat); // Garfield - Inside the function, Garfield has taken over.
}

adoptCat();
console.log(cat); // Salem - Back outside, Salem reigns again.
```
`cat` can be redeclared and reassigned without any complaints from var, which can lead to some unexpected results if you're not careful.

I mean, back in the day we only had `var` at our disposal. We were using it, but we weren't happy.

Today in modern JavaScript we have `let` and `const`. Please use them over `var`.

## eval

`eval` is pure evil. I don't want to elaborate. Here is a not-so-fictional story about it.

Once upon a codebase in the year 2006, nestled in the dark corners of the World Wide Web, there existed a humble website. It was the pride and joy of a fledgling developer who, in his naivety, summoned the eval function to execute dynamically generated code snippets. This was a time of experimentation, where the dangers of executing unchecked user input were not fully understood by all.

It began as a whisper, a mere line of code: `eval(userInput)`. The developer had intended it to be a shortcut, a convenient way to add interactive features to the website. Little did he know, he had etched the beginnings of a digital Necronomicon.

Users came, interacting with the site, feeding it pieces of code, expressions of creativity in an innocent play. But among them lurked a shadow, a figure with knowledge arcane, who saw through the veil of innocence that covered the website. With a few keystrokes, this user crafted an incantation, a string of characters that when whispered to the eval function, would unleash chaos.

The eval function, like an ancient deity awoken from its slumber, accepted the offering without judgment. It ran the malicious code, and the website's defenses crumbled like ancient ruins under the might of an earthquake. The server's heartbeat quickened, data spilled like blood from a wound, and the barrier between the site and the abyss eroded.

The code, now a malevolent force, spread through the website's veins, injecting itself into every user session, every page, every corner of the once-peaceful digital realm. It morphed, and replicated, and before long, it was not just the website that was haunted—the infection spread to the machines of every visitor, a digital plague born from a single line of eval.

The developer watched in horror as his creation turned into a puppet for the shadow user's maleficent intent. The website, once a source of pride, became an eldritch abomination, consuming data and privacy in an insatiable frenzy. It was a lesson learned too late; the eval function was not just a tool, but a portal to digital damnation when fed the forbidden fruit of unsanitized input.

In the aftermath, the web whispered tales of the cursed site, cautionary lore passed among developers. The eval function became a symbol of hubris, a relic of the past that served as a warning: some shortcuts lead not to glory, but to the haunted depths of a nightmare.

And so, the eval keyword was shunned, spoken of in hushed tones as the summoner of chaos, the bane of security, the specter of unpredictability—a relic best left in the shadows of the past, never to be invoked again.

⚰️


## with

`with` is a Pandora's box that I don't want to revisit. I am not sure whose brainchild this was, but this is one of the worst ideas after "the billion dollar mistake" `null`. It's deprecated for a really good reason.

In the time before Google, developers wanted to deconstruct an object. So they used `with`.

```javascript
var mysteryBox = {
  color: 'the color of the universe',
  size: 'enigma',
  contents: 'pandora\'s assortment'
};

with (mysteryBox) {
  console.log(color);  // outputs: the color of the universe
  console.log(size);   // outputs: enigma
  console.log(contents); // outputs: pandora's assortment
}

```

But wait what if we initialize a size variable outside the `with` scope?

```javascript
var size = 'bigger on the inside';

with (mysteryBox) {
  console.log(size);   // outputs: enigma, NOT bigger on the inside
}
```

Well why stop there, we can use nested `with`!

```javascript

var outerBox = {
  color: 'blue',
  size: 'large',
  innerBox: {
    color: 'red',
    size: 'small'
  }
};

with (outerBox) {
  console.log(color); // outputs: blue
  console.log(size); // outputs: large

  with (innerBox) {
    console.log(color); // outputs: red
    console.log(size); // outputs: small
  }
}
```

Using nested with statements in JavaScript is like trying to juggle chainsaws while blindfolded—not impossible, but not recommended and pretty dangerous.

You shouldn't use `with`, you don't need to use `with`, the browser will scream at you for using `with`. Just don't do it.

Destructure your objects when needed.

```javascript
const { color, size, contents } = mysteryBox;
```

That's all.


## Conclusion

The JavaScript keyword landscape is a bit like a wild party where everyone's invited, including some guests you wish had stayed home.

Raise a glass to the quirks of JavaScript, a language where even the worst features have a place... preferably in a dusty corner of our legacy codebases. Cheers! 🥂
