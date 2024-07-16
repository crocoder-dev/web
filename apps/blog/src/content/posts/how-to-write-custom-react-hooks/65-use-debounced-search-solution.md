Solution

```tsx
import { useState, useEffect } from 'react';

export const useDebouncedSearch = (
  value: string,
  search: (value: string) => void,
  wait: number
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

// Use the hook in a component
import React, { useState } from 'react';
import { useDebouncedSearch } from './useDebouncedSearch';

const SearchComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebouncedSearch(searchTerm, handleSearch, 500);

  const handleSearch = (value: string) => {
    console.log(`Searching for: ${value}`);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <p>Debounced search term: {debouncedSearchTerm}</p>
    </div>
  );
};

export default SearchComponent;
```

The custom hook **`useDebouncedSearch`** allows you to implement a debounced search feature in your component. It takes three parameters: **`value`**, **`search`**, and **`wait`**.

The hook uses two **`useEffect`** hooks to create the debouncing behavior. The first useEffect sets a timeout whenever the value or wait parameters change. The timeout updates the state **`debouncedValue`** with the latest value after waiting for wait milliseconds.

The second useEffect hook then executes the search function with the latest **`debouncedValue`** whenever it changes.

In the **`SearchComponent`** component, we use the **`useDebouncedSearch`** hook and pass in the input value, a **`handleSearch`** function, and a wait time of 500 milliseconds. The component also has a state **`searchTerm`** that updates with the input value.

The **`useDebouncedSearch`** hook returns the **`debouncedSearchTerm`** state, which we use to display in the component. The component also calls the **`handleSearch`** function with the debounced search term whenever it changes.

With this custom hook, the search function will only be executed after the user stops typing for 500 milliseconds, rather than being called with every keystroke.
