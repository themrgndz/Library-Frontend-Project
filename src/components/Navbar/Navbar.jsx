import React from 'react';
import SearchBar from '../Searchbar/Searchbar';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const handleProfileClick = () => {
    console.log('Giris yapildi...');
  };

  const handleLogoutClick = () => {
    console.log('Cikis yapildi...');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-bottom">
  <div className="container-fluid">
    <a className="navbar-brand mx-3" href="./homepage">Uzmar Library</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <form className="d-flex ms-auto" role="search">
        <SearchBar />
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