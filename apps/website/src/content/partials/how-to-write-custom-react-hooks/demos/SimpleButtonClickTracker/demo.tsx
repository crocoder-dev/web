import React from "react";
import { useClickCounter } from "./useClickCounter";
const SimpleButtonClickTracker: React.FC = () => {
  const [count, increment] = useClickCounter();
  return (
    <div className="border rounded-md p-4">
      <p>Button has been clicked {count} times</p>
      <button
        className="rounded p-2 bg-slate-300 hover:bg-slate-200"
        onClick={increment}
      >
        Click me
      </button>
    </div>
  );
};
export default SimpleButtonClickTracker;
