import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import SimilarBooks from '../SimilarBooks/SimilarBooks';

import "./style.css";

const BookDetail = () => {
  const { id } = useParams();
  const [bookInstance, setBookInstance] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/book/${id}`);
        console.log("Single book data:", response.data);
        setBookInstance(response.data);
        
        const allBooksResponse = await axios.get('https://localhost:5001/api/book');
        
        const filteredBooks = allBooksResponse.data.filter(book => book.id !== parseInt(id));
        const randomBooks = [];
        while (randomBooks.length < 4 && filteredBooks.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredBooks.length);
          randomBooks.push(filteredBooks.splice(randomIndex, 1)[0]);
        }

        setSimilarBooks(randomBooks);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [id]);

  // Favorilere ekleme fonksiyonu
  const handleAddToFavorites = async () => {
    try {
      await axios.post(`https://localhost:5001/api/favorites`, {
        bookId: bookInstance.id,
        // Kullanıcının kimliği ve diğer gerekli bilgileri ekleyebilirsin
      });
      alert(`${bookInstance.title} favorilerinize eklendi!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Favorilere ekleme sırasında bir hata oluştu.");
    }
  };

  // Kitabı ödünç alma fonksiyonu
  const handleBorrowBook = async () => {
    try {
      await axios.post(`https://localhost:5001/api/borrow`, {
        bookId: bookInstance.id,
        // Kullanıcının kimliği ve diğer gerekli bilgileri ekleyebilirsin
      });
      alert(`${bookInstance.title} başarıyla ödünç alındı!`);
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Kitabı ödünç alma sırasında bir hata oluştu.");
    }
  };

  if (!bookInstance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="text-right mb-3">
        <a href="/homepage" className="btn btn-success">Return to homepage</a>
      </div>
      <div className="ana p-4">
        <div className="row">
          <div className="col-md-4">
            <BookCover imageUrl={bookInstance.imageUrl} title={bookInstance.title} />
            <button 
              className="btn btn-outline-warning mt-3 w-100" 
              onClick={handleAddToFavorites}
            >
              Favorite
            </button>
            <button 
              className="btn btn-outline-success mt-2 w-100" 
              onClick={handleBorrowBook}
            >
              Borrow
            </button>
          </div>
          <div className="col-md-8">
            <h2>{bookInstance.title}</h2>
            <BookDetails bookInstance={bookInstance} />
          </div>
        </div>
        <SimilarBooks similarBooks={similarBooks} />
      </div>
    </div>
  );
};

export default BookDetail;
