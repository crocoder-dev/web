import React from 'react';
import { useClickCounter } from './useClickCounter';
const SimpleButtonClickTracker: React.FC = () => {
  const [count, increment] = useClickCounter();
  return (
    <>
      <p>Button has been clicked {count} times</p>
      <button onClick={increment}>Click me</button>
    </>
  );
};
export default SimpleButtonClickTracker;