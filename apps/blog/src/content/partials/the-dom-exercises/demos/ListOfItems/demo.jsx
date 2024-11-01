/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

const LI = ({ children, handler }) => <li key={children} onClick={handler}>{children}</li>;

const ListOfItemsDemo = () => {
  const [text, setText] = useState('');
  const [items, setItems] = useState(['Map, filter, reduce', 'The DOM', 'Callbacks']);

  return (
    <div>
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
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <button
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
      </ul>
    </div>
  );
};

export default ListOfItemsDemo;
