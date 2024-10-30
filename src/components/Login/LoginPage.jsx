import React, { useState } from 'react';
import './login.css'; // CSS'i buraya dahil ediyoruz

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Şifre doğrulama için
  const [activeForm, setActiveForm] = useState('login'); // 'login', 'forgot', 'register' formları için
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı için

  // Form alanlarını temizleyen fonksiyon
  const clearFormFields = () => {
    setIdentifier('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = {
      identifier,
      password,
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.role === 'admin') {
            window.location.href = '/admin-dashboard';
          } else {
            window.location.href = '/user-dashboard';
          }
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const userData = {
      identifier,
      password,
    };

    // Şifreler eşleştiyse kayıt işlemini başlat
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Registration successful!');
          setActiveForm('login'); // Kayıt başarılıysa login formuna geçiş yap
          clearFormFields(); // Form alanlarını temizle
        } else {
          setErrorMessage('Registration failed: ' + data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('An error occurred during registration.');
      });
  };

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    clearFormFields(); // Formlar arası geçişlerde alanları temizle
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'login':
        return (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="identifier">Username / Email:</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                placeholder="Username / Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
          </form>
        );
      case 'forgot':
        return (
          <form>
            <div className="form-group">
              <label htmlFor="identifier">Enter your email to reset password:</label>
              <input
                type="email"
                className="form-control"
                id="identifier"
                placeholder="Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Reset Password</button>
          </form>
        );
      case 'register':
        return (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="identifier">Username / Email:</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                placeholder="Username / Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary btn-block">Register</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Uzmar Library</h2>
        {renderForm()}
        <div className="mt-3 row">
          {activeForm === 'login' && (
            <>
              <a href="#" className="col text-center" onClick={() => handleFormChange('forgot')}>Forgot Password</a>
              <a href="#" className="col text-center" onClick={() => handleFormChange('register')}>Register</a>
            </>
          )}
          {(activeForm === 'forgot' || activeForm === 'register') && (
            <a href="#" className="col text-center" onClick={() => handleFormChange('login')}>Back to Login</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
