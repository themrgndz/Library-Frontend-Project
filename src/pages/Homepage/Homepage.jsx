import React, { useState } from 'react'; 
import Container from '../../components/Homepage/Container/Container';
import Footer from '../../components/Homepage/Footbar/Footer';
import Navbar from '../../components/Homepage/Navbar/Navbar';
import './Homepage.css';

const Homepage = () => {
  const [searchResults, setSearchResults] = useState([]); // Arama sonuçlarını state'de tutuyoruz
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [error, setError] = useState(null); // Hata durumu

  const handleSearch = (searchTerm) => {
    setLoading(true); // Yükleniyor durumunu başlat
    setError(null); // Hata durumunu sıfırla

    fetch(`https://localhost:5001/api/book/search?search=${encodeURIComponent(searchTerm)}`) // Doğru URL oluştur
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setSearchResults(data);
        setLoading(false); // Yükleniyor durumunu kapat
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setError('Arama sonuçları alınırken bir hata oluştu.'); // Hata mesajı ayarla
        setLoading(false); // Yükleniyor durumunu kapat
      });
  };

  return (
    <div className="Homepage">
      <div>
        <Navbar onSearch={handleSearch} /> {/* onSearch fonksiyonu Navbar'a geçildi */}
      </div>
      <div className="content">
        {error && <p className="error">{error}</p>} {/* Hata mesajı */}
        <Container searchResults={searchResults} /> {/* Arama sonuçları Container'a geçildi */}
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
