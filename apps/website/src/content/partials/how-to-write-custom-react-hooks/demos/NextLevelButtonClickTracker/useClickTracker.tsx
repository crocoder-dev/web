import { useState, useCallback } from 'react';
interface UseClickTrackerState {
  count: number;
  lastClicked: number | null;
}
export const useClickTracker = (): [UseClickTrackerState, () => void] => {
  const [state, setState] = useState<UseClickTrackerState>({
    count: 0,
    lastClicked: null,
  });
  const incrementCount = useCallback(() => {
    setState(prevState => ({
      count: prevState.count + 1,
      lastClicked: Date.now(),
    }));
  }, [setState]);
  return [state, incrementCount];
};