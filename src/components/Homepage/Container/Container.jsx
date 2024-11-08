import React, { useEffect, useState } from 'react';
import BookCard from '../Cart/Card';

const fetchBooksFromAPI = async (searchTerm = '') => {
  const url = searchTerm
    ? `http://192.168.1.184:5001/api/book/search?search=${encodeURIComponent(searchTerm)}`
    : 'http://192.168.1.184:5001/api/book';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('An error occurred while loading books: ' + response.statusText);
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
  }, [searchResults]);

  if (loading) {
    return <p>Loading...</p>;
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
          <BookCard key={book.bookId} book={book} />
        ))}
      </div>

      {/* Pagination buttons */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <style jsx>{`
        /* Pagination Container */
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 20px;
          gap: 10px;
        }

        /* Pagination Buttons */
        .pagination-button {
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
        }

        /* Pagination Button Hover Effect */
        .pagination-button:hover {
          background-color: #0056b3;
        }

        /* Disabled Pagination Buttons */
        .pagination-button:disabled {
          background-color: rgb(25, 25, 25);
          cursor: not-allowed;
        }

        /* Page Info Text */
        .pagination-info {
          font-size: 16px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Container;
