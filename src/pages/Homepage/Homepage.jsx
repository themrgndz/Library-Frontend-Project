import React, { useState } from 'react'; 
import Container from '../../components/Homepage/Container/Container';
import Footer from '../../components/Homepage/Footbar/Footer';
import Navbar from '../../components/Homepage/Navbar/Navbar';
import './Homepage.css';

const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSearch = (searchTerm) => {
    setLoading(true); 
    setError(null);

    fetch(`https://192.168.1.184/api/book/search?search=${encodeURIComponent(searchTerm)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setError('Arama sonuçları alınırken bir hata oluştu.');
        setLoading(false);
      });
  };

  return (
    <div className="Homepage">
      <div>
        <Navbar onSearch={handleSearch} />
      </div>
      <div className="content">
        {error && <p className="error">{error}</p>}
        <Container searchResults={searchResults} />
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
