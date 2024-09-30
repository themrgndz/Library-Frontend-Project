import React, { useState } from 'react';
import "./searchbar.css"

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching:', searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button className="Button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
