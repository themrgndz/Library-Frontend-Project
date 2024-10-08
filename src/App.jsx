import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./pages/Homepage/Homepage";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";
import LoginPage from "./pages/Login/LoginPage";

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/homepage" element={<Homepage/>}/>
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </Router>
    </div>
  );
}
export default App;