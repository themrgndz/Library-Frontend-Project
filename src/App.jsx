import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./pages/Homepage";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/detail" element={<Detail/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;