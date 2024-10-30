import React, { useState } from 'react';

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

  // Searchbar.jsx
const handleSearch = (e) => {
  e.preventDefault(); // Form gönderimini engelle
  const term = searchTerm.trim(); // Arama terimini al
  if (term) {
    onSearch(term); // onSearch ile arama terimini gönder
  } else {
    alert('Lütfen bir arama terimi girin.'); // Uyarı ver
  }
};

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
      <button className="btn btn-outline-success" onClick={handleSearch}>
        Ara
      </button>
    </div>
  );
};

export default SearchBar;
