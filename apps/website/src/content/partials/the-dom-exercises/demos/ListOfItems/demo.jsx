/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

const LI = ({ children, handler }) => <li key={children} onClick={handler}>{children}</li>;

const ListOfItemsDemo = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState(['Map, filter, reduce', 'The DOM', 'Callbacks']);

  return (
    <div className='border rounded-md p-4'>
      Click on the item to change the text, or click on the button to create a new item.
      <ul>
        {items.map((item) => (
          <LI
            key={item}
            handler={() => {
              // eslint-disable-next-line no-alert
              const t = prompt('Enter new text:');
              if (t) {
                const newItems = items.map((i) => (i === item ? t : i));
                setItems(newItems);
              }
            }}
          >
            {item}

          </LI>
        ))}
      </ul>
      <div className='flex gap-2 flex-wrap'>
        <input className='rounded min-w-52 max-w-full' type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button
          className='rounded p-2 bg-slate-300 hover:bg-slate-200'
          type="button"
          onClick={() => {
            setItems(
              (it) => [...it, text],
            );
            setText('');
          }}
        >
          Create New
        </button>
      </div>
    </div>
  );
};

export default ListOfItemsDemo;
