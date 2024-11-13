import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/category');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Kategoriler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center my-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Kategoriler</h2>
      <Row className="g-4">
        {categories.map((category) => (
          <Col key={category.id} xs={6} md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={category.imageUrl} 
                alt={category.name}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <Card.Body className="text-center">
                <Card.Title>{category.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
