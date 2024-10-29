import React from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../../AuthContext'; // AuthContext'i içe aktar
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // AuthContext'ten logout fonksiyonunu al

  const handleProfileClick = () => {
    navigate('/Profile'); 
  };

  const handleLogoutClick = () => {
    logout(); // Çıkış yap
    navigate('/'); // Giriş sayfasına yönlendir
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-bottom">
      <div className="container-fluid">
        <a className="navbar-brand mx-3" href="./">Uzmar Library</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
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
