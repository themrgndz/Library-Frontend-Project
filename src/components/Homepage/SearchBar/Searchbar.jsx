import React, { useState } from 'react';

const fetchBooks = async (searchTerm) => {
  const url = `http://localhost:8080/MyLibrary/list?search=${encodeURIComponent(searchTerm)}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.statusText);  // Daha fazla hata detayı ekledik
  }

  const data = await response.json();
  return data;
};

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();  // Form yerine bir div ile işleyelim
    try {
      const results = await fetchBooks(searchTerm);
      onSearch(results);
    } catch (error) {
      console.error('Arama sırasında bir hata oluştu:', error);
      alert('Arama sırasında bir hata oluştu: ' + error.message);
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
