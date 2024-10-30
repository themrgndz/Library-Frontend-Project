import React, { useState, useEffect } from 'react';

// Debounce fonksiyonu
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debounceSearch = debounce((term) => {
    if (term) {
      onSearch(term);
    } else {
      onSearch('');
    }
  }, 300);

  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="d-flex align-items-center">
      <input
        type="search"
        className="form-control me-2 rounded-pill border-0 shadow-sm"
        placeholder="Search..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
