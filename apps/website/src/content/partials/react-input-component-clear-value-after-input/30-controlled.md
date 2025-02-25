
## Input as a controlled component

The most obvious solution to this problem is to transform the Input component into a controlled one by adding a state to the parent component itself. This way the rendered HTML `<input>` element would be driven by the parent component’s state, which would allow us to alter the input value, delete it, pass it to other UI elements, etc. In this solution the onChange event handler would return the input value to the parent component, and the parent component would be able to track the changes within the HTML `<input>` element saving the input value to its state.

```jsx
/*
    Input component that is exported from component library
    
    Controlled component's input element should receive 
    value and onChange props for Input component to function properly
    
    The inputValue should be stored in the parent's component state 
  */
const InputComponent = ({ label, inputValue, onInputChange }) => {
  return (
    <div>
      <span>{label}</span>
      <input value={inputValue} onChange={onInputChange} />
    </div>
  );
};
```

```jsx
/*
    The parent component code that will be implemented 
    in the consumer's web app

    Input value should be stored in component's state,
    onChange handler should set the Input value  
  */
const ParentFormComponent = () => {
  const [emailInputValue, setEmailInputValue] = useState("");

  const handleEmailChange = useCallback(
    (e) => {
      setEmailInputValue(e.target.value);
    },
    [setEmailInputValue]
  );

  const [nameInputValue, setNameInputValue] = useState("");

  const handleNameChange = useCallback(
    (e) => {
      setNameInputValue(e.target.value);
    },
    [setNameInputValue]
  );

  /*
      Getting the values from each input is straightforward;
      just get it from the component's state
    */
  const handleSubmit = useCallback(() => {
    console.log(
      `{
         email: ${emailInputValue || null},
         name: ${nameInputValue || null} 
        }`
    );
    setEmailInputValue("");
    setNameInputValue("");
  }, [emailInputValue, nameInputValue]);

  return (
    <>
      <InputComponent
        label="E-mail"
        inputValue={emailInputValue}
        onInputChange={handleEmailChange}
      />
      <InputComponent
        label="Name"
        inputValue={nameInputValue}
        onInputChange={handleNameChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};
```

React docs recommend the controlled component approach to implement forms. The biggest upside of the controlled Input component is that form data isn't handled by the DOM, but as you can see in the previous code, the form data is handled by the parent form component.

This approach forces the component library consumer to implement state management and change handlers in the parent form component for each Input component instance. Even though this is the usual way of handling forms, it can get annoying implementing so much boilerplate code. In addition, there is no business logic present in the Input component.
