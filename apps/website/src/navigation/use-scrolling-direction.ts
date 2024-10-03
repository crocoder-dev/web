import { useState, useEffect } from 'react';
import throttle from './throttle/throttle';

type ScrollDirection = 'up' | 'down';

export const useScrollingDirection = () => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('up');

  useEffect(() => {
    let oldScrollY = 0;

    function onScroll() {
      setScrollDirection(window.scrollY > oldScrollY ? 'down' : 'up');
      oldScrollY = window.scrollY;
    }

    const throttledScroll = throttle(onScroll, 50);

    document.addEventListener('scroll', throttledScroll);
    return () => document.removeEventListener('scroll', throttledScroll);
  }, []);

  return scrollDirection;
}