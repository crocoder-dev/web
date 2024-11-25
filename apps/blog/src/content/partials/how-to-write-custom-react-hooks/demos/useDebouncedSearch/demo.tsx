// Use the hook in a component
import React, { useState } from 'react';
import { useDebouncedSearch } from './useDebouncedSearch';

const UseDebouncedSearchDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    console.log(`Searching for: ${value}`);
  };

  const [debouncedSearchTerm] = useDebouncedSearch(searchTerm, handleSearch, 500);


  return (
    <div className='border rounded-md p-4'>
      <input
        className='rounded min-w-52 max-w-full'
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <p>Debounced search term: {debouncedSearchTerm}</p>
    </div>
  );
};

export default UseDebouncedSearchDemo;