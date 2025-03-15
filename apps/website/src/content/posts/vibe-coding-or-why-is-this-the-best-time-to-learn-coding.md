---
title: "Vibe Coding, or Why It's the Best Time to Learn Coding"
description: ""
createdAt: 1741983734185
updatedAt: 1741983734185
authors: ["david"]
category: "AFTER WORK TALKS"
editors: ["velimir"]
abstract: ""
image: "/images/copy-paste-copilot.png"
draft: false
---
<script client:load src="/chart.min.js"></script>

I've been a software developer for 15 years now, and what keeps me hooked is solving hard, complex problems. The trickiest issues I run into are the ones that LLMs (or even Google) can’t really help with, problems that are barely documented and rarely come up.  

The only reason I can tackle them is because I’ve spent years running into walls, breaking things, and digging deep to understand how different technologies and patterns actually work. If I hadn’t hit those walls over and over again, I wouldn’t have the experience I need to solve the problems I face today.

Even though I’m a software developer, I don't just write code. I spend time explaining technology and our team’s work to stakeholders, figuring out how to scale the system and make it more reliable, and planning architecture changes. All of this is still very much software development, but my main focus isn’t cranking out code. Instead, it’s reducing the amount of code we *need* to write in the future by designing the system smartly and making sure the team is aligned on that vision.

That means a lot of my work happens in conversations, design docs, and whiteboard sessions rather than just in an IDE. It’s about making decisions that will save us from unnecessary complexity down the road. Writing code is easy, but maintaining and evolving a system over time is the real challenge.  

While I think LLMs are great for brainstorming, debugging, or acting as a rubber duck, I don’t rely on them to solve the hardest problems. Instead, I rely on my own experience: years of dealing with edge cases, learning from past mistakes, and understanding how different technologies fit together. LLMs can suggest code, but they don’t understand *why* a system needs to be designed a certain way, and that’s where experience makes all the difference.

That’s why I’ve already written about [the dangers of accepting every Copilot suggestion blindly.](https://www.crocoder.dev/blog/copilot-copy-paste) Developers should already know that mindlessly accepting AI-generated code duplicates logic, makes refactoring a nightmare, introduce nonsensical code, and breaks flow with unnecessary context switches. 

And yet… I still see it happen. Code that clearly wasn’t written with long-term maintainability in mind, complexity that didn’t need to exist, and decisions made without understanding why the system needs to be designed a certain way. 

So, of course, no serious developer would suggest we just turn off our brains and completely trust AI-generated code without thinking critically about it and go with the flow. 

Right? RIGHT? Well...

![Tweet](/images/vibe-coding-or-why-is-this-the-best-time-to-learn-coding/tweet.png)

Oh.

So, apparently, "vibe coding" is a thing now.

It's not just AI-assisted coding, it’s full-on "LLM, take the wheel". No keyboard, no reading diffs, no thinking too hard about errors, just vibes. 

And you know what? For some projects, that’s probably fine. If you’re hacking together a quick idea over the weekend, playing around with UI tweaks, or building something throwaway, this workflow makes a ton of sense. It's fast, fluid, and honestly kind of fun.

But... what happens when you need to understand your own code?

I get it, there’s a thrill in seeing something just work without fully grasping how. It’s like magic. But as someone who has spent years debugging, maintaining, and scaling real-world systems, I can’t help but see the tradeoffs. Code that "just works" without comprehension is a time bomb. The moment you need to fix or extend it, you’re suddenly dealing with a black box of AI-generated logic that you didn’t write and don’t really understand.

I’ve seen this play out before: teams shipping fragile, hard-to-maintain systems because they optimized for shipping fast instead of building sustainably. If you accept every AI-generated diff without reading it, copy-paste error messages without thinking, and blindly tweak things until it stops breaking… well, you might be able to build something, but maintaining it will be a nightmare.

And that’s the real issue. Again, writing code is the easy part. The hard part, the part that makes great developers valuable, is understanding why the system works the way it does, designing it so it remains simple and scalable, and being able to debug it when things inevitably go wrong.

So yeah, LLMs are great tools, but they don’t replace experience. They don’t replace critical thinking. They don’t replace understanding.

Use them. But don’t let them turn you into a human autocomplete button.



---

## STUFF

---


There's a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like "decrease the padding on the sidebar by half" because I'm too lazy to find it. I "Accept All" always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I'd have to really read through it for a while. Sometimes the LLMs can't fix a bug so I just work around it or ask for random changes until it goes away. It's not too bad for throwaway weekend projects, but still quite amusing. I'm building a project or webapp, but it's not really coding - I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.

<div style="display: flex; justify-content: center; width: 100%">
<iframe width="270" height="480" 
    src="https://www.youtube.com/embed/42S4YPUK8N4" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>
</div>

Seriously, this is really scary. It is projected that approximately every five years the amount of software engineers that are in the field doubles. That usually means that somewhere between six years or less is more than the median amount of experience levels. Meaning that more than half the people are on this side than the other side. Which means within the next two to three years, more people that are software engineers will be vibe coders, that don't actually know what software does, then there will be actual engineers it's never been a better time to learn to code.


Yes, AI is here. You're going to be screwed unless you take action. Don't sell your early years fro for productivity instead of learning. If you sell your early years to like you are productive, your mid years are going to be filled with sadness because you never got anywhere past whatever the can do right? So if you offload your technical expertise to a model when you're good or when you're learning this is how good you are. You won't be able to exceed this unless uf you go beyond. So my recommendation yes, students AI is out and it is here, and it's likely going to be here forever. I don't see it changing anytime soon. I think we're just going to constantly be inundated with this. You're screwed unless you take action. Do not let your skill ceiling be dictated by a model



I did some digging and I have found data about worlds and found this data:

[aaa](https://www.statista.com/statistics/627312/worldwide-developer-population/)


| Year | Number of Developers (in millions) |
|------|------------------------------------|
| 2016 | 21.0 |
| 2018 | 23.9 |
| 2019 | 24.5 |
| 2020 | 25.5 |
| 2022 | 26.9 |
| 2024 | 28.7 |

I have done some linear regression, and here are the projected numbers

| Year | Projected Number of Developers (in millions)  |
|------|--------|
| 2025 | 29.60  |
| 2026 | 30.49  |
| 2027 | 31.38  |
| 2028 | 32.27  |
| 2029 | 33.16  |
| 2030 | 34.05  |


with some guess work today the median years of experience is about 6~7 years, and it won't change in the next 5 years with my projections

<div>
  <canvas id="developers"></canvas>
</div>

<div>
  <canvas id="vibe"></canvas>
</div>

<script client:load>
  (() => {
  const ctx = document.getElementById('vibe');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 2030 - 2024 + 1 }, (_, i) => (2024 + i).toString()),
      datasets: [
        {
          label: 'the rest of developers',
          data: [28.70, 26.98, 25.36, 23.84, 22.41, 21.06, 19.80],        
          borderWidth: 2,
          segment: {
            borderDash: ctx => {
              if (ctx.p0DataIndex >= 0) {
                return [6, 4];
              }
            }
          },
        },
        {
            label: 'vibe coders',
            data: [
              0, 2.62, 5.13, 7.54, 9.86, 12.10, 14.25
            ],
            borderWidth: 2,
          segment: {
          borderDash: ctx => {
            console.log(ctx, ctx.p0DataIndex)
            if (ctx.p0DataIndex >= 0) {
              return [6, 4];
            }
          }
        },
        },
      ]
    },
    options: {
      interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
      },
      scales: {
        y: {
          stacked: true,
          suggestedMin: 15,
          suggestedMax: 40,
        }
      }
    }
  });
  })();
</script>

<script client:load>
  (() => {
  const ctx = document.getElementById('developers');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 2030 - 2018 + 1 }, (_, i) => (2018 + i).toString()),
      datasets: [{
        label: 'world developer population in millions',
        data: [23.00, 23.90, 24.50, 25.60, 26.40, 27.70, 28.70, 29.60, 30.49, 31.38, 32.27, 33.16, 34.05],
        borderWidth: 2,
        segment: {
          borderDash: ctx => {
            console.log(ctx, ctx.p0DataIndex)
            if (ctx.p0DataIndex > 5) {
              return [6, 4];
            }
          }
        },
      }]
    },
    options: {
      interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
      },
      scales: {
        y: {
          suggestedMin: 15,
          suggestedMax: 40,
        }
      }
    }
  });
  })();
</script>

