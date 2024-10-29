import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; 

import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/Profile/Profile";
import BookDetail from "./pages/Detail/Detail";
import Login from "./pages/Login/Login";
import PrivateRoute from './PrivateRoute';
import Create from './pages/Create/Create'

function App() {
  const [userInfo, setUserInfo] = useState(null); // Kullanıcı bilgilerini saklamak için state

  return (
    <div className="App">
      <AuthProvider> 
        <Router>
          <Routes>
            <Route 
              path="/" 
              element={<Login setUserInfo={setUserInfo} />} // setUserInfo fonksiyonunu Login bileşenine geçiriyoruz
            />
            <Route 
              path="/homepage" 
              element={<PrivateRoute component={Homepage} />} 
            />
            <Route 
              path="/profile" 
              element={
                <PrivateRoute 
                  component={(props) => <Profile {...props} userInfo={userInfo} />} // Kullanıcı bilgilerini Profile bileşenine geçiriyoruz
                />} 
            />
            <Route 
              path="/create" 
              element={<PrivateRoute component={Create} />} 
            />
            <Route 
              path="/detail/:id" 
              element={<PrivateRoute component={BookDetail} />} 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
