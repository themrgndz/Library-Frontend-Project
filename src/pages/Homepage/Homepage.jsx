import React from 'react';
import Container from '../../components/Homepage/Container/Container'
import Footer from '../../components/Homepage/Footbar/Footer'
import Navbar from '../../components/Homepage/Navbar/Navbar'
import "./Homepage.css"

const Homepage = () => {
  return (
    <div className='Homepage'>
      <div>
        <Navbar />
      </div>
      <div className='content'>
        <Container />
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
