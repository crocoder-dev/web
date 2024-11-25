## Fruit list

You are given some names of different fruit and an unordered list html element; add a list item for each to the unordered list.

::title Helpful links

- [Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [Document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
- [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

```html
<ul></ul>
```

```javascript
const fruitList = ["apple", "banana", "tomato"];
```

::title Result

```html
<ul>
    <li>apple</li>
    <li>banana</li>
    <li>tomato</li>
  </ul>
```

::details Show Solution

```javascript
const fruitList = ["apple", "banana", "tomato"];

const ulElement = document.querySelector("ul");

fruitList.forEach((fruit) => {
  const itemElement = document.createElement("li");
  itemElement.textContent = fruit;
  ulElement.appendChild(itemElement);
});
```

This code creates a constant array **`fruitList`** with three elements, **`apple`**, **`banana`**, and **`tomato`**. It then selects an unordered list element from the HTML document using **`document.querySelector('ul')`**.

Using the **`forEach`** method on the **`fruitList`** array, the code creates a new list item element for each fruit in the list, sets its text content to the name of the fruit, and appends it as a child to the unordered list element. This will dynamically add the list of fruits as list items in the HTML document.

::enddetails