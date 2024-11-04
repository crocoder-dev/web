import { useCallback, useState, useRef } from 'react';

const InputComponent = ({ label, inputRef, id }) => (
  <div>
    <label htmlFor={id}>
      {label}
      <input className='rounded ml-2' id={id} ref={inputRef} />
    </label>
  </div>
);

const ParentComponent = ({ setConsoleOutputs }) => {
  const emailInputRef = useRef(null);

  const nameInputRef = useRef(null);

  const handleSubmit = useCallback(() => {
    setConsoleOutputs((t) => [
      ...t,
      `{ email: ${emailInputRef.current.value || null}, name: ${
        nameInputRef.current.value || null
      } }`,
    ]);
    emailInputRef.current.value = '';
    nameInputRef.current.value = '';
    if (emailInputRef.current.style['background-color'] === 'red') {
      emailInputRef.current.style = 'background-color:blue;';
    } else {
      emailInputRef.current.style = 'background-color:red;';
    }
    nameInputRef.current.type = 'button';
    nameInputRef.current.value = 'I am now a button';
  }, [setConsoleOutputs, emailInputRef, nameInputRef]);

  return (
    <>
      <InputComponent id="email" label="E-mail" inputRef={emailInputRef} />
      <br />
      <InputComponent id="name" label="Name" inputRef={nameInputRef} />
      <br />
      <button type="button" style={{ height: '30px' }} onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

const UncontrolledDemo = () => {
  const [consoleOutputs, setConsoleOutputs] = useState([
    'Try submitting the form!',
  ]);

  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 border rounded'>
      <div className='flex-1'>
        <div>
          <ParentComponent setConsoleOutputs={setConsoleOutputs} />
        </div>
      </div>
      <ul className='flex-1 m-0'>
        {consoleOutputs.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  );
};

export default UncontrolledDemo;
