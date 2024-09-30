import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Container from "./components/Container/Container"
import Footer from "./components/Footbar/Footer"
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
/*


<Library/>
*/