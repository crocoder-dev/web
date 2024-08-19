Solution

```tsx
import { useState, useEffect } from 'react';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const useFetchData = (url: string) => {
  const [data, setData] = useState<Post[] | null>(null);
  const [error, setError] = useState<{message: string} | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return [data, error, loading] as const;
};

// Use the hook in a component
import React from 'react';
import { useFetchData } from './useFetchData';

const DataFetcher: React.FC = () => {
  const [data, error, loading] = useFetchData('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};

export default DataFetcher;
```

The code is a custom React hook named **`useFetchData`** that makes it easier to fetch data from a specified URL and display it in a React component.

The hook uses the **`useState`** hook to manage the state of the data being fetched, an error that may occur, and whether the data is currently being loaded.

The hook uses the **`useEffect`** hook to make an asynchronous call to fetch the data from the URL. If the fetch is successful, it updates the state with the fetched data. If there is an error, it updates the state with the error. It also updates the loading state while the data is being fetched.

In a component, the hook is used by calling **`useFetchData`** and passing in the URL to fetch data from. The hook returns an array with the data, error, and loading state, which can be destructured into separate variables.

The component then uses conditional rendering to display either a "Loading..." message, an error message, or the fetched data. The fetched data is displayed as a list of items, each item being a title from the data.
