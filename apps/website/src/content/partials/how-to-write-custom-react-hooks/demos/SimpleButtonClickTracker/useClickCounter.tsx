import { useState } from "react";
export const useClickCounter = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount((prevCount) => prevCount + 1);
  return [count, increment] as const;
};
