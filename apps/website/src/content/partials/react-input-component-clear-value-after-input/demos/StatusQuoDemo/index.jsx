import { useCallback, useState } from 'react';

const StatusQuoDemo = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consoleOutputs, setConsoleOutputs] = useState([
    'Try submitting the form!',
  ]);

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  const handleNameChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName],
  );

  const handleSubmit = useCallback(() => {
    setConsoleOutputs((t) => [
      ...t,
      `{ email: ${email || null}, name: ${name || null} }`,
    ]);
    setEmail('');
    setName('');
  }, [setConsoleOutputs, setEmail, setName, email, name]);

  return (
    <div className='flex flex-col md:flex-row gap-4 p-4 border rounded-md'>
      <div className='flex flex-col gap-2 flex-1'>
        <div>Contact CroCoder</div>
        <input className='rounded min-w-52 max-w-full' type="email" placeholder='E-mail' required onChange={handleEmailChange} />
        <input className='rounded min-w-52 max-w-full' type="text" placeholder='Your name' required onChange={handleNameChange} />
        <button className='rounded p-2 bg-slate-300 hover:bg-slate-200' onClick={handleSubmit}>Submit</button>
      </div>
      <ul className='flex-1 m-0'>
        {consoleOutputs.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
    </div>
  );
};

export default StatusQuoDemo;
