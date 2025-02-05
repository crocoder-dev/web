::details Show Solution

```javascript
const imageSrc = "https://crocoder.dev/icon.png";

const divElement = document.querySelector("div");

const imgElement = document.createElement("img");

imgElement.src = imageSrc;

divElement.appendChild(imgElement);
```

This code creates a constant **`imageSrc`** with a string value of an image URL. It then selects a div element from the HTML document using **`document.querySelector('div')`**.

The code then creates an **`img`** element using **`document.createElement('img')`** and sets its **`src`** attribute to the value of **`imageSrc`**. Finally, the code appends the **`img`** element as a child to the **`div`** element using **`divElement.appendChild(imgElement)`**. This will dynamically add the image from the URL specified in **`imageSrc`** as an element inside the **`div`** in the HTML document.

::enddetails