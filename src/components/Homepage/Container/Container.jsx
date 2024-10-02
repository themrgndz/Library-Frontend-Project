import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Card from '../Cart/Card';
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBooks = (searchTerm = '') => {
    const url = searchTerm 
      ? `http://localhost:8080/MyLibrary/api/books?search=${searchTerm}`
      : 'http://localhost:8080/MyLibrary/api/books';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('API Failed');
        }
        return response.json();
      })
      .then(data => {
        console.log("Data from API:", data);
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (searchTerm) => {
    setLoading(true);
    fetchBooks(searchTerm);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <>
    <Navbar onSearch={handleSearch} />
      <div className="container">
        <div className="card-container">
          {books.length > 0 ? (
            books.map((book, index) => (
              <Card
                key={index}
                imageSrc={book.image_url}
                title={book.title}
                description={book.description}
                stock={book.stock}
                buttonText="Details"
                onCardClick={() => navigate(`/detail/${book.id}`)}
              />
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Container;
