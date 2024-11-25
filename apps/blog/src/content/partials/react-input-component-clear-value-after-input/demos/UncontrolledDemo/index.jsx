import { useCallback, useState, useRef } from 'react';

const InputComponent = ({ label, inputRef, id }) => (
  <div>
    <label htmlFor={id}>
      {label}
      <input className='rounded min-w-52 max-w-full' id={id} ref={inputRef} />
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
    <div className='flex flex-col gap-2'>
      <InputComponent id="email" label="E-mail" inputRef={emailInputRef} />
      <InputComponent id="name" label="Name" inputRef={nameInputRef} />
      <button className='rounded p-2 bg-slate-300 hover:bg-slate-200' type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const UncontrolledDemo = () => {
  const [consoleOutputs, setConsoleOutputs] = useState([
    'Try submitting the form!',
  ]);

  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 border rounded-md'>
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
