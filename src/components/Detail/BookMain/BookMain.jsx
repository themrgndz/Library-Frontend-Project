import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import SimilarBooks from '../SimilarBooks/SimilarBooks';

import "./style.css";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookInstance, setBookInstance] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`https://localhost:5001/api/book/${id}`);
        console.log("Single book data:", response.data);
        setBookInstance(response.data);
        setEditedBook(response.data);
        
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

  const handleAddToFavorites = async () => {
    try {
      await axios.post(`https://localhost:5001/api/favorites`, {
        bookId: bookInstance.id,
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Favorilere ekleme sırasında bir hata oluştu.");
    }
  };

  const handleBorrowBook = async () => {
    try {
      await axios.post(`https://localhost:5001/api/borrow`, {
        bookId: bookInstance.id,
      });
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("Kitabı ödünç alma sırasında bir hata oluştu.");
    }
  };

  const handleDeleteBook = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:5001/api/book/${id}`);
        navigate('/');
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("Kitabı silme sırasında bir hata oluştu.");
      }
    }
  };

  const handleEditBook = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`https://localhost:5001/api/book/${id}`, editedBook);
      setBookInstance(editedBook);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Kitabı güncelleme sırasında bir hata oluştu.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prevState => ({ ...prevState, [name]: value }));
  };

  if (!bookInstance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="text-right mb-3">
        <a href="/" className="btn btn-success">Return to homepage</a>
        {isEditing ? (
          <>
            <button className="btn btn-success ml-2" onClick={handleSaveChanges}>Save Changes</button>
            <button className="btn btn-secondary ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button 
              className="btn btn-primary ml-2" 
              onClick={handleEditBook}
            >
              Edit Book
            </button>
            <button 
              className="btn btn-danger ml-2" 
              onClick={handleDeleteBook}
            >
              Throw To Trash
            </button>
          </>
        )}
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
            {isEditing ? (
              <div>
                <input 
                  type="text" 
                  name="title" 
                  value={editedBook.title} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Title"
                />
                <input 
                  type="text" 
                  name="author" 
                  value={editedBook.author} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Author"
                />
                <input 
                  type="text" 
                  name="publisher" 
                  value={editedBook.publisher} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Publisher"
                />
                <input 
                  type="number" 
                  name="publicationYear" 
                  value={editedBook.publicationYear} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Publication Year"
                />
                <input 
                  type="number" 
                  name="pageCount" 
                  value={editedBook.pageCount} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Page Count"
                />
                <input 
                  type="text" 
                  name="isbn" 
                  value={editedBook.isbn} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="ISBN"
                />
                <input 
                  type="text" 
                  name="category" 
                  value={editedBook.category} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Category"
                />
                <input 
                  type="text" 
                  name="language" 
                  value={editedBook.language} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Language"
                />
                <input 
                  type="number" 
                  name="stock" 
                  value={editedBook.stock} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Stock"
                />
                <input 
                  type="text" 
                  name="imageUrl" 
                  value={editedBook.imageUrl} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  placeholder="Image URL"
                />
                <textarea 
                  name="description" 
                  value={editedBook.description} 
                  onChange={handleInputChange} 
                  className="form-control mb-2"
                  rows="5"
                  placeholder="Description"
                />
              </div>
            ) : (
              <BookDetails bookInstance={bookInstance} />
            )}
          </div>
        </div>
        <SimilarBooks similarBooks={similarBooks} />
      </div>
    </div>
  );
};

export default BookDetail;
