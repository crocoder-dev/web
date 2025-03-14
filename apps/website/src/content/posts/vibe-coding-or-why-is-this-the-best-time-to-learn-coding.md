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


![Tweet](/images/vibe-coding-or-why-is-this-the-best-time-to-learn-coding/tweet.png)

<iframe width="315" height="315" 
    src="https://www.youtube.com/embed/42S4YPUK8N4" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
</iframe>

Seriously, this is really scary. It is projected that approximately every five years the amount of software engineers that are in the field doubles. That usually means that somewhere between six years or less is more than the median amount of experience levels. Meaning that more than half the people are on this side than the other side. Which means within the next two to three years, more people that are software engineers will be vibe coders, that don't actually know what software does, then there will be actual engineers it's never been a better time to learn to code.


Yes, AI is here. You're going to be screwed unless you take action. Don't sell your early years fro for productivity instead of learning. If you sell your early years to like you are productive, your mid years are going to be filled with sadness because you never got anywhere past whatever the can do right? So if you offload your technical expertise to a model when you're good or when you're learning this is how good you are. You won't be able to exceed this unless uf you go beyond. So my recommendation yes, students AI is out and it is here, and it's likely going to be here forever. I don't see it changing anytime soon. I think we're just going to constantly be inundated with this. You're screwed unless you take action. Do not let your skill ceiling be dictated by a model

<div>
  <canvas id="developers"></canvas>
</div>

<div>
  <canvas id="vibe"></canvas>
  </div>

<script client:load src="https://cdn.jsdelivr.net/npm/chart.js"></script>


<script client:load>
  (() => {
  const ctx = document.getElementById('vibe');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 2030 - 2016 + 1 }, (_, i) => (2016 + i).toString()),
      datasets: [
        {
          label: 'world developer population in millions',
          data: [
            21.00, 22.00, 23.00, 24.25, 25.50, 26.20, 26.90, 
            27.80, 28.70, 27.55, 26.45, 25.39, 24.38, 23.40, 22.47
          ],        
          borderWidth: 2,
          segment: {
            borderDash: ctx => {
              if (ctx.p0DataIndex > 7) {
                return [6, 4];
              }
            }
          },
        },
        {
            label: 'developers with less than 5 years that rely heavly on AI',
            data: [
              NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, 0,  
              2.25, 4.30, 6.31, 8.27, 10.19, 12.08
            ],
            borderWidth: 2,
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
      labels: Array.from({ length: 2030 - 2016 + 1 }, (_, i) => (2016 + i).toString()),
      datasets: [{
        label: 'world developer population in millions',
        data: [
          21.00, 22.00, 23.00, 24.25, 25.50, 26.20, 26.90, 
          27.80, 28.70, 29.81, 30.75, 31.70, 32.65, 33.59, 34.54
        ],
        borderWidth: 2,
        segment: {
          borderDash: ctx => {
            console.log(ctx, ctx.p0DataIndex)
            if (ctx.p0DataIndex > 7) {
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

Aaaaa
