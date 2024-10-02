import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footbar/Footer"
import BookList from './components/BookList/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <main>
        <Navbar/>
          <div>
            <div>----------</div>
              <div className="bg-light text-dark">
                <BookList/>
              </div>
            <div>----------</div>
          </div>
          <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
export default App;