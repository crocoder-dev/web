## Change first and last item from an unordered list

Change the text in the first and the last list item element in every unordered list element on this page. Change it to `'first'` and `'last'`.

<NonHSubtitle>Helpful links</NonHSubtitle>

- [Document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)
- [Pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements)
- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)


```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<ul>
  <li>a</li>
  <li>b</li>
  <li>c</li>
</ul>
<ul>
  <li>👻</li>
  <li>👽</li>
  <li>🦁</li>
</ul>
```
::title Result

```html
<div>
  <ul>
    <li>first</li>
    <li>2</li>
    <li>last</li>
  </ul>
  <ul>
    <li>first</li>
    <li>b</li>
    <li>last</li>
  </ul>
  <ul>
    <li>first</li>
    <li>👽</li>
    <li>last</li>
  </ul>
</div>
```

::details Show Solution

```javascript
const firstLis = [...document.querySelectorAll("ul > li:first-child")];
const lastLis = [...document.querySelectorAll("ul > li:last-child")];

firstLis.forEach((li) => (li.textContent = "first"));

lastLis.forEach((li) => (li.textContent = "last"));
```

This code is using JavaScript to select and manipulate HTML elements. The first line uses the **`querySelectorAll`** method to find all the first children **`li`** elements within **`ul`** elements and spread them into an array **`firstLis`**.

The second line does the same for all the last children **`li`** elements within **`ul`** elements and spread them into an array **`lastLis`**. Then, the **`forEach`** method is used to iterate over both arrays and modify the **`textContent`** property of each **`li`** element to be "first" for the elements in **`firstLis`** and "last" for the elements in **`lastLis`**.

::enddetails
