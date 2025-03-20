## Input as an uncontrolled component

But what if you want to keep your Input component uncontrolled? Another solution we want to show you is adding the ability to pass a ref via props to the rendered HTML `<input>` element. The parent component passes the ref to the Input component to access and change the HTML `<input>` element’s value via `ref.current`.

```jsx
/*
  Input component that is exported from component library
  
  Uncontrolled component's input element should receive 
  ref prop for Input component to function properly
*/
const InputComponent = ({ label, inputRef }) => {
  return (
    <div>
      <span>{label}</span>
      <input ref={inputRef} />
    </div>
  );
};
```

```jsx
/*
  The parent component code that will be implemented
  in the consumer's web app
*/
const ParentFormComponent = () => {
  const emailInputRef = useRef(null);

  const nameInputRef = useRef(null);

  /*
    You can get and set the values of each input element 
    by getting or setting refInstance.current.value
  */
  const handleSubmit = useCallback(() => {
    console.log(
      `{
         email: ${emailInputRef.current.value || null},
         name: ${nameInputRef.current.value || null}
        }`
    );
    emailInputRef.current.value = "";
    nameInputRef.current.value = "";
  }, []);

  return (
    <>
      <InputComponent label="E-mail" inputRef={emailInputRef} />
      <InputComponent label="Name" inputRef={nameInputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
```

However, this solution would give the parent component the ability to easily change some HTML `<input>` element attributes like style, class and even the type of the input, which could bring about some unexpected consequences.

For example, try submitting this form: