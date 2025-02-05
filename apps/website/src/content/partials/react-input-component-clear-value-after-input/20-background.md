
## Background

Let’s provide some context; one of our developers was working on a project where he wanted to create a form for a web application using components from our CroCoder component library. He noticed that he couldn't change or clear the value of the HTML `<input>` element via the parent component. As a result, after submitting the form, the website visitor would still see the values they have entered displayed in the HTML `<input>` element, even though the Input component would interpret the HTML `<input>` element as empty.

Underneath is a demo of how our component worked before the implemented fix. We added a small console next to the form, so that you can see the state inside of the component. Type something in the form and submit it. You should see the console correctly display whatever you wrote in the input. However, you will also see that the HTML `<input>` element's value will not clear, and if you try resubmitting it, the console will show that the state of the input fields considers them empty, even when they aren't.
