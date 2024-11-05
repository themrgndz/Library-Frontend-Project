import React from 'react';
import './BorrowNavbar.css';

const Navbar = () => {
  const handleHomeClick = () => {
    window.location.href = './'; // Anasayfaya yönlendirme
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand mx-3" href="./" onClick={handleHomeClick}>
            Uzmar Library
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
