import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Çerez kütüphanesini içe aktar
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://localhost:5001/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Giriş başarılı:', data);
        Cookies.set('token', data.token, { expires: 1 }); // 1 gün süreli
        navigate('/homepage');
      } else if (response.status === 401) {
        setError('Geçersiz kullanıcı adı veya şifre.');
      } else {
        setError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error('Giriş hatası:', err);
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <Container fluid className="login-container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} className="bg-dark text-white p-5 rounded form-container">
          <h2 className="text-center mb-4 display-4">Uzmar Library</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="username">
              <Form.Label className="h5">Kullanıcı Adı</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                type="text"
                placeholder="Kullanıcı adınızı girin"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="password" className="mt-4">
              <Form.Label className="h5">Şifre</Form.Label>
              <Form.Control
                className="bg-dark text-light"
                type="password"
                placeholder="Şifrenizi girin"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            {error && <div className="text-danger mt-3">{error}</div>}

            <Button variant="primary" type="submit" className="mt-5 w-100 btn-lg">
              Giriş Yap
            </Button>
          </Form>

          <div className="text-center mt-4">
            <a href="/signup" className="text-light h5">Henüz hesabınız yok mu? Kaydolun</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
