import React, { useEffect, useState } from 'react';
import BookCard from '../Cart/Card';
import '../Container/container.css';

const fetchBooksFromAPI = async (searchTerm = '') => {
  const url = searchTerm
    ? `https://localhost:5001/api/book`
    : 'https://localhost:5001/api/book';

  const response = await fetch(url, {
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

const Container = ({ searchResults }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = searchResults.length > 0 ? searchResults : await fetchBooksFromAPI();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [searchResults]); // Arama sonuçları değiştiğinde yeniden yükleniyor

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container main">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="row">
        {currentBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Sayfa geçiş butonları */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <span className="pagination-info">
          Sayfa {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default Container;
