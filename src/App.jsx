import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footbar/Footer.jsx';
import Container from './components/Container/Container.jsx';
function App() {
  return (
    <div className="App">
      <main>
        <Navbar/>
        <div>
          <Container/>
        </div>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
export default App;
