import React, { useEffect, useState } from 'react';
import BookCard from '../Cart/Card';

const fetchBooksFromAPI = async () => {
  const response = await fetch('http://localhost:8080/MyLibrary/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Kitaplar yüklenirken bir hata oluştu: ' + response.statusText);
  }

  const data = await response.json();
  return data;
};

const Container = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksFromAPI();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="container main">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="row">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Container;
