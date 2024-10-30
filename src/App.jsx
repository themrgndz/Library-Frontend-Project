import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/Profile/Profile";
import BookDetail from "./pages/Detail/Detail";
import Login from "./pages/Login/Login";
import Bos from "./components/Homepage/Bos/Bos";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bos" element={<Bos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<BookDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
