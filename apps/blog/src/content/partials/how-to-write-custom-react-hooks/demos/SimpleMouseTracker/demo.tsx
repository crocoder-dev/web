import React from 'react';
import { useMousePosition } from './useMousePosition';
const SimpleMouseTracker: React.FC = () => {
  const [position] = useMousePosition();
  return (
    <div className='border rounded-md p-4'>
      <p>X: {position.x}</p>
      <p>Y: {position.y}</p>
    </div>
  );
};

export default SimpleMouseTracker;