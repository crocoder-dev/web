---
title: "Excluding Properties with TypeScript's Omit"
description: ""
date: 2024-07-01T05:00:00Z
authors: ["CroCoder"]
draft: false
---

Let's dive into the world of TypeScript and acquaint ourselves with the clever tool known as Omit. This little rascal is your reliable ally when you're cooking up a fresh type and want to leave out a couple of properties from a preexisting type.

## How to use Omit

Imagine you've got this type describing someone's particulars – you know, their name, age, and email:

```typescript
type Person = {
    name: string;
    age: number;
    email: string;
};
```

Now, picture this: you want a type that's almost identical to `Person`, but minus the email part.

Behold the magic:

```typescript
type PersonWithoutEmail = Omit<Person, 'email'>;

```

What we're doing here is crafting a fresh type called `PersonWithoutEmail` using the Omit tool. It's as if we're saying, "Hey, I'd like a version of `Person`, but without that 'email' thing, alright?"

And check this out:

```typescript
const person: PersonWithoutEmail = {
    name: 'Alice',
    age: 30,
    // We're not bothering with 'email' here!
};

console.log(person); // Output: { name: 'Alice', age: 30 }
```

With Omit, you've got yourself a brand new `PersonWithoutEmail` object – email not included. 

## Omit and unions don't play well

Omit can sometimes act a little quirky when dealing with unions. But don't fret, there is a simple solution.

Imagine you've got a union of types:

```typescript
type Union = { username: string; password: string } | { email: string; }
```

You might think you can just use Omit to get rid of, let's say, the "password" property from this union. You don't want to leak the user's password on accident. But hang onto your hats! Omit might not give you exactly what you expect.

Let's give it a whirl:

```typescript
type BadResult = Omit<Union, "password">;
```

You'd imagine it'd drop "password" from both parts of the union, right? But hold up, TypeScript's got some quirks. Our new type BadResult is equivalent to `{}`. Weird...

Enter DistributiveOmit, our star of the show! This little champ uses a conditional type to make sure that the omit action happens separately on each member of the union.

Check this out:

```typescript
type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never;

type GoodResult = DistributiveOmit<Union, "password">;
```

Now, we're cooking with gas! DistributiveOmit ensures that the omit operation takes place individually on each part of the union.


## Omit plays well with extending interfaces

Did you know that the 'Omit' utility type can turn you into a customization wizard for your interfaces? You can extend those interfaces, give 'em a twist, and even swap out toppings (properties) without breaking a sweat!

Let's break it down with an example that'll make your coding taste buds tingle:

Imagine we've got a delectable `Toppings` type for all you shawarma enthusiasts:

```typescript
type Toppings = 'pickles' | 'french fries' | 'tahini sauce' | 'hot sauce' | 'not ketchup'; 
```

And then, say hello to our trusty `Shawarma` interface, in all it's rotisserie glory:

```typescript
interface Shawarma {
    protein: 'chicken';
    toppings: Toppings[];
}
```

But wait, there's more! TypeScript is about to sprinkle some magic. Enter the valiant `VeganShawarma` interface. 🌱🍽️ We're extending it from `Shawarma` with a twist! We're using the 'Omit' utility type to remove the 'protein' property from the 'Shawarma' and swap it with our tofu delight.

```typescript
interface VeganShawarma extends Omit<Shawarma, 'protein'> {
    protein: 'tofu';
}
```

Did you catch that? With a dash of 'Omit', we're crafting a fresh interface. We're keeping everything from the `Shawarma`, but with a little twist: swapping out the 'protein' for 'tofu'. Voilà! You've just whipped up a `VeganShawarma` that's like the shawarma's cool but judgy cousin.

## Omit isn't strict at all

We've stumbled upon a rather interesting phenomenon: those moments when you're almost expecting the tsserver to prompt an error, but TypeScript LSP just isn't interested in doing anything today.

Picture this: you've got this cool type setup with a `Person`:

```typescript
type Person = {
  name: string;
  email: string;
}
```

Now, your inquisitive side takes over, and you decide to fashion a `NameOnly` type using Omit. You're thinking, "Let's drop 'email' and, oh, why not toss in some 'anyOtherRandomCrap' just for fun?"

```typescript
type NameOnly = Omit<Person, 'email' | 'anyOtherRandomCrap'>;
```

Now, here's the twist: You're half expecting TypeScript to raise its hand and say, "Hold on, that 'anyOtherRandomCrap' isn't even in `Person`!" But guess what? TypeScript seems pretty chill about the whole random shenanigans. 

But buckle up, because here comes `StrictOmit`!

```typescript
type StrictOmit<T, K extends keyof T> = Omit<T, K>;
```

This little gem is like a "strict mode" for Omit. It's got your back and says, "Hey, if you're gonna omit stuff, let's make sure that stuff actually exists in the type you're playing with."

So now, if you go for StrictOmit:

```typescript
type NameOnly = StrictOmit<Person, 'email' | 'anyOtherRandomCrap'>;
```
Boom! TypeScript is gonna give you a heads-up, saying, "Hold your horses! That 'anyOtherRandomCrap' isn't part of the `Person` type."

## Make a rule to use StrictOmit rather than Omit

We've unlocked the magic of StrictOmit, and now we're setting up our guardians, 

You want your fellow developers to tap into this power and craft types that are harmonious, clean, and robust. But how do you guide them in the right direction? 

Let's play around with the ESLint rules and help steer our fellow developers toward this newfound treasure trove.

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    "@typescript-eslint/ban-types": [
      "error",
      {
        "types": {
          "Omit": "Use StrictOmit instead",
        },
        "extendDefaults": true
      }
    ]
}
```

The `@typescript-eslint/ban-types` now warns every developer to use StrictOmit rather than Omit. You can downrank "error" to "warn" if you don't want to be on that breaks the build. 

## Conclusion

TypeScript's Omit stands out as a dynamic tool for fine-tuning type definitions. It offers the ability to craft tailored types by excluding certain properties, enhancing flexibility. Its role in managing unions, extending interfaces creatively, and enforcing strictness through StrictOmit underscores its versatility. Leveraging these features empowers developers to create more resilient and precise type systems.
