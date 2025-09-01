import React from "react";
import { useClickTracker } from "./useClickTracker";
const NextLevelButtonClickTracker: React.FC = () => {
  const [state, incrementCount] = useClickTracker();
  return (
    <div className="border rounded-md p-4">
      <p>Button has been clicked {state.count} times</p>
      <p>
        Last clicked at:{" "}
        {state.lastClicked
          ? new Date(state.lastClicked).toLocaleString()
          : "Never"}
      </p>
      <button
        className="rounded p-2 bg-slate-300 hover:bg-slate-200"
        onClick={incrementCount}
      >
        Click me
      </button>
    </div>
  );
};
export default NextLevelButtonClickTracker;
