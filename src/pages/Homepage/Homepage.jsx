import React, { useState } from 'react';
import Container from '../../components/Homepage/Container/Container';
import Footer from '../../components/Homepage/Footbar/Footer';
import Navbar from '../../components/Homepage/Navbar/Navbar';
import './Homepage.css';

const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]); // Arama sonuçlarını state'de tutuyoruz

  const handleSearch = (searchTerm) => {
    // Arama işlemini gerçekleştirmek için fetchBooks fonksiyonunu kullanıyoruz
    fetch(`http://localhost:8080/MyLibrary/list?search=${encodeURIComponent(searchTerm)}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data))
      .catch((error) => console.error('Error fetching search results:', error));
  };

  return (
    <div className="Homepage">
      <div>
        <Navbar onSearch={handleSearch} /> {/* onSearch fonksiyonu Navbar'a geçildi */}
      </div>
      <div className="content">
        <Container searchResults={searchResults} /> {/* Arama sonuçları Container'a geçildi */}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
