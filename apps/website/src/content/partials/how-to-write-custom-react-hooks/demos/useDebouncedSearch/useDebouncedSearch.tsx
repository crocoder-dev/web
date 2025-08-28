import { useState, useEffect } from "react";

export const useDebouncedSearch = (
  value: string,
  search: (value: string) => void,
  wait: number,
) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(handler);
    };
  }, [value, wait]);

  useEffect(() => {
    search(debouncedValue);
  }, [debouncedValue, search]);

  return [debouncedValue];
};
