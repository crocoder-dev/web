
This makes the UI seem lackluster because nothing gives any indication to the website visitor that the form was submitted after something was typed in. Our developer wanted to improve the UI by clearing the value from the HTML `<input>` element after the form was submitted. Finally, after reading through the source code, he found out that the Input component from our component library didn't accept a ref as its prop, even though it was an uncontrolled component by design.

We would like to show you three possible approaches that make this form work in the React world. We would take into account several different viewpoints including the one of a component library consumer; i.e., the developer using the component library as a package.
