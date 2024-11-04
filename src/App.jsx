import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./pages/Homepage/Homepage";
import BookDetail from "./pages/Detail/Detail";
import Borrow from "./pages/Borrow/Borrow"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/detail/:id" element={<BookDetail />} />
          <Route path="/borrow/:bookId" element={<Borrow/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
