import React from 'react';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate hook'u import ediliyor
import SearchBar from '../SearchBar/Searchbar';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate(); // useNavigate hook'u kullanılıyor

  // Profil butonuna tıklandığında Profile sayfasına yönlendirme
  const handleProfileClick = () => {
    navigate('/Profile'); 
  };

  // Logout butonuna tıklandığında anasayfaya yönlendirme
  const handleLogoutClick = () => {
    navigate('/'); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-bottom">
      <div className="container-fluid">
        <a className="navbar-brand mx-3" href="./">Uzmar Library</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* SearchBar burada form yapısında kullanılıyor */}
          <form className="d-flex ms-auto" role="search" onSubmit={(e) => e.preventDefault()}>
            <SearchBar onSearch={onSearch} /> {/* SearchBar onSearch prop'u ile çağrılıyor */}
          </form>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Button text="Profile" onClick={handleProfileClick} />
            </li>
            <li className="nav-item">
              <Button text="Logout" onClick={handleLogoutClick} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
