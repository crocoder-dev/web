::details Show Solution

```javascript
const app = document.getElementById("list-app");

// Create the necessary elements
const list = document.createElemeent("ul");
const input = document.createElement("input");
input.setAttribute("type", "text");
const addButton = document.createElement("button");
addButton.innerHTML = "Create New";

// Add event listeners to the elements
addButton.addEventListener("click", function() {
    const newItem = document.createElement("li");
    newItem.innerHTML = 'New item';
    list.appendChild(newItem);
    input.value = "";
});

list.addEventListener("click", function(event) {
    if (event.target.tagName === "li") {
        const text = prompt("Enter new text:");
        event.target.innerHTML = text;
    }
});

app.appendChild(input);
app.appendChild(addButton);
```

In this code snippet, we created three elements: **`list`** which is an unordered list, **`input`** which is a text input, and **`addButton`** which is a button element.

We use the **`setAttribute`** method to set the type of the input to "text". Then, we use the **`addEventListener`** method to add event listeners to the elements. When the user clicks the add button, the function inside the event listener will create a new **`li`** element, set its text to the value of the input, and append it to the list. When the user clicks on an item in the list, the function inside the event listener will prompt the user for new text and set the text of the item to the new text.

Finally, we use the **`appendChild`** method to add the elements to the body of the web page.

Please note that this is just a simplified example. You might want to add some error handling, validation, and more features when building your own application.

::enddetails