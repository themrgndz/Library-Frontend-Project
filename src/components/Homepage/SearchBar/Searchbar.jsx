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

const fetchBooks = async (searchTerm) => {
  const url = `https://localhost:5001/api/book/search?search=${encodeURIComponent(searchTerm)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.statusText);
  }

  const data = await response.json();
  return data;
};

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debounceSearch = debounce((term) => {
    if (term) {
      onSearch(term);
    }
  }, 300);

  useEffect(() => {
    debounceSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="d-flex">
      <input
        type="search"
        className="form-control me-2 bg-light"
        placeholder="Kitap ara..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-outline-success" onClick={() => onSearch(searchTerm)}>
        Ara
      </button>
    </div>
  );
};

export default SearchBar;
