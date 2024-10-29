import React, { useState } from 'react';
import './login.css'; // CSS'i buraya dahil ediyoruz

const LoginPage = ({ setUserInfo }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeForm, setActiveForm] = useState('login'); // 'login', 'forgot', 'register' formları için
  const [errorMessage, setErrorMessage] = useState(''); // Hata mesajı için

  // Form alanlarını temizleyen fonksiyon
  const clearFormFields = () => {
    setIdentifier('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = { identifier, password };

    try {
      const response = await fetch('https://localhost:5001/api/user/login', { // API URL'sini güncelledik
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        // Kullanıcı bilgilerini saklama
        setUserInfo(data); // Kullanıcı bilgilerini profil sayfasına geçmek için
        window.location.href = '/homepage'; // Başarılı giriş sonrası yönlendirme
      } else {
        setErrorMessage(data.message || 'Giriş başarısız');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Şifreler uyuşmuyor');
      return;
    }

    const userData = { identifier, password };

    try {
      const response = await fetch('https://localhost:5001/api/user/register', { // API URL'sini güncelledik
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Kayıt başarılı! Giriş yapabilirsiniz.');
        setActiveForm('login'); // Kayıt başarılıysa login formuna geçiş yap
        clearFormFields(); // Form alanlarını temizle
      } else {
        setErrorMessage(data.message || 'Kayıt başarısız');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Kayıt sırasında bir hata oluştu.');
    }
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
              <label htmlFor="identifier">Kullanıcı Adı / E-posta:</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                placeholder="Kullanıcı Adı / E-posta"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Şifre:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Şifrenizi girin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary btn-block">Giriş Yap</button>
          </form>
        );
      case 'forgot':
        return (
          <form>
            <div className="form-group">
              <label htmlFor="identifier">Şifre sıfırlamak için e-posta girin:</label>
              <input
                type="email"
                className="form-control"
                id="identifier"
                placeholder="E-posta"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Şifreyi Sıfırla</button>
          </form>
        );
      case 'register':
        return (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="identifier">Kullanıcı Adı / E-posta:</label>
              <input
                type="text"
                className="form-control"
                id="identifier"
                placeholder="Kullanıcı Adı / E-posta"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Şifre:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Şifreyi Onayla:</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Şifrenizi onaylayın"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary btn-block">Kayıt Ol</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="text-center">Uzmar Kütüphanesi</h2>
        {renderForm()}
        <div className="mt-3 row">
          {activeForm === 'login' && (
            <>
              <a href="#" className="col text-center" onClick={() => handleFormChange('forgot')}>Şifremi Unuttum</a>
              <a href="#" className="col text-center" onClick={() => handleFormChange('register')}>Kayıt Ol</a>
            </>
          )}
          {(activeForm === 'forgot' || activeForm === 'register') && (
            <a href="#" className="col text-center" onClick={() => handleFormChange('login')}>Giriş Ekranına Dön</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
