import React, { useState } from 'react';
import "./searchbar.css"
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Aranıyor:', searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Ara..."
      />
      <button className="Button" onClick={handleSearch}>Ara</button>
    </div>
  );
};

export default SearchBar;
