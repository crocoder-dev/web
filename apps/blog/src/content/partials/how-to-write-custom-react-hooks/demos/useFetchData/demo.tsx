import React from 'react';
import { useFetchData } from './useFetchData';

const UseFetchDataDemo: React.FC = () => {
  const [data, error, loading] = useFetchData('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className='border rounded-md p-4'>
      <ul>
        {data.slice(0, 5).map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseFetchDataDemo;