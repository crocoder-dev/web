---
title: "Vibe Coding, or Why It's the Best Time to Learn Coding"
description: "Discover why real software engineering goes beyond AI-generated code. This in-depth article explores the rise of \"vibe coding,\" the risks of skipping foundational learning, and why experience, critical thinking, and deep system understanding still matter in the age of LLMs like ChatGPT and Copilot."
createdAt: 1743697609140
updatedAt: 1743697609140
authors: ["david"]
category: "AFTER WORK TALKS"
editors: ["velimir"]
abstract: "This article explores the growing tension between AI-assisted software development and the deep, experiential knowledge required to build and maintain sustainable systems. Drawing from over 15 years of experience, the author reflects on the value of struggling through complex, undocumented problems—the kind that can’t be solved by LLMs or Google alone—and emphasizes that real expertise is forged through repeated failure, critical thinking, and architectural insight.As tools like GitHub Copilot and ChatGPT become ubiquitous, many developers—especially those early in their careers—are embracing “vibe coding,” a workflow where code is generated with minimal understanding. While this approach can be productive for quick hacks or prototyping, it poses serious risks when applied to long-term, production-grade systems. The article cautions against letting AI tools short-circuit the learning process, warning that skipping the foundational struggles can lead to shallow expertise and brittle codebases. Through a mix of personal narrative, data analysis, and industry observations, the piece argues that while AI is a powerful accelerator, it cannot replace the human judgment, experience, and design thinking that define great software engineering. The call to action is clear: use the tools, but don’t let them think for you. True mastery comes not from generating code quickly, but from understanding why things work—and how to fix them when they don’t."
image: "/images/vibe-coding-or-why-is-this-the-best-time-to-learn-coding.png"
draft: false
---
<script client:load src="/chart.min.js"></script>

<script client:load async src="/tex-mml-chtml.js"></script>

I've been a software developer for 15 years now, and what keeps me hooked is solving hard, complex problems. The trickiest issues I run into are the ones that LLMs (or even Google) can’t really help with, problems that are barely documented and rarely come up.  

The only reason I can tackle them is because I’ve spent years running into walls, breaking things, and digging deep to understand how different technologies and patterns actually work. If I hadn’t hit those walls over and over again, I wouldn’t have the experience I need to solve the problems I face today.

I’m a software developer, but I don't exclusively write code. I spend time explaining technology and our team’s work to stakeholders, figuring out how to scale the system and make it more reliable, and planning architecture changes. All of this is still very much software development, but my main focus isn’t cranking out code. Instead, it’s reducing the amount of code we *need* to write in the future by designing the system smartly and making sure the team is aligned on that vision.

That means a lot of my work happens in conversations, design docs, and whiteboard sessions rather than just in an IDE. It’s about making decisions that will save us from unnecessary complexity down the road. Writing code is easy, but maintaining and evolving a system over time is the real challenge.  

While I think LLMs are great for brainstorming, debugging, writing boilerplate code or acting as a rubber duck, I don’t rely on them to solve the hardest problems. Instead, I rely on my own experience: years of dealing with edge cases, learning from past mistakes, and understanding how different technologies fit together. LLMs can suggest code, but they don’t understand *why* a system needs to be designed a certain way, and that’s where experience makes all the difference.

That’s why I’ve already written about [the dangers of accepting every Copilot suggestion blindly.](https://www.crocoder.dev/blog/copilot-copy-paste) Developers should already know that mindlessly accepting AI-generated code duplicates logic, makes refactoring a nightmare, introduce nonsensical code, and breaks flow with unnecessary context switches. 

And yet… I still see it happen. Code that clearly wasn’t written with long-term maintainability in mind, complexity that didn’t need to exist, and decisions made without understanding why the system needs to be designed a certain way. 

So, of course, no serious developer would suggest we just turn off our brains and completely trust AI-generated code without thinking critically about it and go with the flow. 

Right? RIGHT? Well...


## Vibe Coding

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


## Vibe Coding Junior Developers

Vibe Coding an feel like a rocket booster for beginners. You can skip straight to building cool things without wrestling with syntax or memorizing APIs. 

That’s undeniably appealing. Why spend hours digging into documentation when ChatGPT or Copilot can spit out the code you need in seconds?

But here’s the hidden cost: you miss out on the foundational struggles that make you a better developer in the long run. Struggling with a tricky bug or an unfamiliar framework isn’t just a headache, it’s where you build intuition and learn how everything fits together. 

It’s like skipping all your scales and jumping right into playing [Primus' Tommy the Cat](https://www.youtube.com/watch?v=r4OhIU-PmB8) in a concert hall; sure, it’s fun at first, but it catches up with you. 

Eventually, you’ll be stuck on a difficult passage without the fundamentals to push through.

The journey from junior to mid to senior is partly about leveling up your technical chops (knowing the language, frameworks, architectural patterns), but it’s also about learning to communicate and collaborate. Seniors have to explain the “why” behind the “what,” and they often do that in high-level conversations with non-technical stakeholders. If you haven’t seen how systems evolve over time, what patterns make them robust or what pitfalls cause them to fall apart, it’s hard to give valuable input in these conversations.


## Should You Become a Dev?

Firstly, let's listen to our favorite ex-Netflix developer turned [unhinged SSH-coffee salesman](https://www.terminal.shop/): ThePrimeagen.

<div style="display: flex; justify-content: center; width: 100%">
  <iframe width="270" height="480" 
    src="https://www.youtube.com/embed/42S4YPUK8N4" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>

> Seriously, this is really scary. It’s projected that about every five years, the number of software engineers doubles. More than half of all developers soon will have fewer than six years of experience. In the next two to three years, we’re going to see more ‘vibe coders’—people who don’t fully understand what the software does—than seasoned professionals. It’s never been a better time to learn to code.

That’s a pretty interesting take, and it aligns with some of my own thoughts. But before I fully buy into any claim, I like to check the numbers.

Primeagen’s video makes a few key assumptions:

1. The number of software engineers doubles every five years.

2. A majority of developers soon will have fewer than six years of experience.

3. In the next two to three years, we’re going to see more "vibe coders" than seasoned professionals.

4. It’s never been a better time to learn to code.

Whenever someone drops numbers like these, I like to dig into the data. 

So I looked at some [global developer population statistics from Statista.com](https://www.statista.com/statistics/627312/worldwide-developer-population/), and here's what I found:


| Year | Number of Developers (in millions) |
|------|------------------------------------|
| 2016 | 21.0 |
| 2018 | 23.9 |
| 2019 | 24.5 |
| 2020 | 25.5 |
| 2022 | 26.9 |
| 2024 | 28.7 |

I ran a linear regression on this data, and the projected numbers for the coming years look like this:

| Year | Projected Number of Developers (in millions)  |
|------|--------|
| 2025 | 29.60  |
| 2026 | 30.49  |
| 2027 | 31.38  |
| 2028 | 32.27  |
| 2029 | 33.16  |
| 2030 | 34.05  |

And I have plotted the data to a chart:

<div>
  <canvas id="developers"></canvas>
</div>

As you can see, the global developer population isn’t doubling every five years, it’s increasing at a rate of about 8% year-over-year. At that pace, it will take somewhere between eight and nine years for the total number of developers to double. So while the field is growing rapidly, it’s not quite as fast as the video suggests.

Now, what about experience levels? From my own experience, it feels true that a growing portion of developers have under six years of experience, but what does the math say?

To keep things simple, I assumed a global retirement rate of 6% and rounded the developer growth rate down to 8%. With those parameters, I built a rough model assuming a constant retirement probability. 
Feel free to review my "napkin math," and please don’t hesitate to reach out if you have a better way to model this.

::details SHOW THE NAPKIN MATH

<p>
  Suppose world's developer population grows at a continuous rate 
  <span>\(r\)</span> per year. This means the total number of developers
  at time <span>\(t\)</span> can be approximated by 
  <span>\(N(t) = N(0)\,e^{r\,t}\)</span>.
</p>

<p>
  At the same time, each individual developer retires at a constant 
  “separation” or “hazard” rate <span>\(\lambda\)</span>. That is, 
  once becomes a professional, a developer has a probability <span>\(\lambda\,dt\)</span> 
  of leaving in a small time interval <span>\(dt\)</span>.
</p>

<p>
  Consider developers who started working exactly <span>\(T\)</span> years ago, 
  i.e., at time <span>\(t - T\)</span>. The size of that year's “cohort” 
  was proportional to the world developer population at that time, which is
</p>

<p style="text-align: center;">
  <span>\(N(t - T) \propto e^{r\,(t - T)}.\)</span>
</p>

<p>
  Since each developer retires at rate <span>\(\lambda\)</span>, 
  the fraction of a given cohort still remaining after 
  <span>\(T\)</span> years is <span>\(e^{-\lambda\,T}\)</span>.
</p>

<p>
  At the current time <span>\(t\)</span>, the number of 
  still-working developers from that cohort is proportional to
</p>

<p style="text-align: center;">
  <span>\(e^{r(t - T)} \times e^{-\lambda\,T} = e^{r\,t}\;e^{-T(\lambda + r)}.\)</span>
</p>

<p>
  The total number of the developers at time <span>\(t\)</span> is 
  <span>\(\propto e^{r\,t}\)</span>. Thus, the fraction of the entire 
  population who have exactly <span>\(T\)</span> years of experience and still working is
</p>

<p style="text-align: center;">
  <span>\(\displaystyle
    \frac{e^{r\,t}\;e^{-T(\lambda + r)}}{e^{r\,t}} 
    = e^{-\,(\lambda + r)\,T}.
  \)</span>
</p>

<p>
  This is the survival function of an exponential distribution 
  with parameter <span>\(\lambda + r\)</span>. Therefore, in the 
  steady state, a developer randomly chosen from the global developer population 
  has years-of-experience distribution
</p>

<p style="text-align: center;">
  <span>\(\displaystyle
    T \sim \text{Exponential}(\lambda + r).
  \)</span>
</p>

<p>
  For an exponential distribution with rate 
  <span>\(\alpha\)</span>:
</p>

<ul>
  <li><span>\(\text{Mean} = \frac{1}{\alpha}\)</span></li>
  <li><span>\(\text{Median} = \frac{\ln(2)}{\alpha}\)</span></li>
</ul>

<p>
  In our case, 
  <span>\(\alpha = \lambda + r\)</span>, 
  so the median years of experience is
</p>

<p style="text-align: center;">
  <span>\(\displaystyle 
    \text{Median} = \frac{\ln(2)}{\lambda + r}.
  \)</span>
</p>

<p>
  If the annual separation rate is 6% (<span>\(\lambda = 0.06\)</span>) 
  and the annual growth rate is 8% (<span>\(r = 0.08\)</span>), 
  then
</p>

<p style="text-align: center;">
  <span>\(\lambda + r = 0.06 + 0.08 = 0.14.\)</span>
</p>

<p>
  Therefore, the median number of years of experience in the steady-state is
</p>

<p style="text-align: center;">
  <span>\(\displaystyle
    \frac{\ln(2)}{0.14} \approx 4.95 \text{ years}.
  \)</span>
</p>

::enddetails

The median experience level of all developers worldwide is currently around five years (probably closer to 6, because of my conservative math assumptions about both developer population growth and retirement rate) and it won't change at least until 2030.

For the sake of this discussion, let’s assume that "vibe coding" is more common among newer developers—those who started coding professionally within the last six years. That would mean a significant portion of the new developer population relies heavily on LLMs, Copilot, or pure "vibe coding."

If we split developers into "seasoned professionals" (6+ years of experience) and "vibe coders" (less than 6 years), and we use the projected numbers for developer growth and retirement, the distribution looks like this by 2030:

- Seasoned developers (6+ years experience): ~19.8 million

- Vibe coders (<6 years experience): ~14.25 million

That’s a ratio of about 0.72:1, not exactly a 1:1 ratio like Primeagen suggested, but pretty close.

<div>
  <canvas id="vibe"></canvas>
</div>

If current trends continue, nearly half of all developers by 2030 will have fewer than six years of experience, and a huge portion of those will be heavily relying or completely dependant on AI. That’s not just "using Copilot to autocomplete some boilerplate." We’re talking about developers who are building entire features, services, and systems without fully understanding what’s going on under the hood.

That means around 42 out of every 100 developers will be working with tools they don’t deeply understand, shipping code they didn’t fully write, and debugging systems they never actually designed.

And that should scare us a little.

Not because junior developers are bad, they’re not. We were all junior once. But because we’re unintentionally setting up a generation of developers to skip the pain that leads to understanding, and that pain matters.

## It’s Never Been a Better Time to Learn to Code

Yes, AI is here. And yes, it’s insanely powerful. If it helps you build full-stack apps in a weekend, write unit tests in seconds, and ship features faster than ever, that’s amazing.

But here’s the part nobody wants to say out loud: you’re going to be screwed unless you take action.

If you’re early in your career, this next part is for you.

Do not sell your early years for the illusion of productivity. Don’t trade learning for speed. Because if you spend your foundational years copying what the model spits out and optimizing for "looking productive," you’re going to hit a wall in your mid-career and it’s going to hurt.

Offloading your technical thinking to a model while you’re learning sets your ceiling. If the AI thinks for you now, don’t be surprised when you can’t outthink it later.

You’ll look around one day and realize you’ve been coding for five years, but you still don’t really understand how things work. You’ve built a bunch of stuff, but you don’t know how to scale it. You’ve shipped features, but you can’t debug production. You’ve "learned fast," but you haven’t learned deeply.

And that’s the trap.

LLMs make it easy to feel like a senior engineer long before you’ve actually built the experience. But you can’t fake understanding. You can’t bluff your way through a system outage or an architectural review. When real complexity hits, and it will, you either know how to handle it, or you don’t.

AI is here, and it’s not going anywhere. We’re not going back. The landscape has changed forever. And in that landscape, it’s never been easier to build, but it’s also never been easier to stunt your own growth without realizing it.

Use the tools. Just don’t let them use you.
Let them accelerate your learning. Just don’t let them replace it.

Because your long-term value as a developer isn’t in how quickly you can generate code. It’s in how well you can understand, design, debug, and think.

So if you want to be great at this you have to go beyond what the models can do. That means reading the docs. Understanding the internals. Sitting with a broken system until you know why it broke. Asking "why" five times. Learning the fundamentals the hard way.

That’s the path. There are no shortcuts. Not even the AI can give you those.

And the good news?

That path still exists. It’s still open. And if you take it, if you resist the urge to vibe code your way through the early years, you’ll be one of the few who actually gets it.

And that will make you invaluable.





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

