import React, { useState } from 'react';
import './searchbar.css';

const fetchBooks = (searchTerm = '') => {
  const url = searchTerm 
    ? `http://localhost:8080/MyLibrary/api/books?search=${encodeURIComponent(searchTerm)}`
    : 'http://localhost:8080/MyLibrary/api/books';
};

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm); 
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