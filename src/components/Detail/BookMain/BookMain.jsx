import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import SimilarBooks from '../SimilarBooks/SimilarBooks';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./style.css";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookInstance, setBookInstance] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const [showModal, setShowModal] = useState(false); 
  const [selectedUser, setSelectedUser] = useState('');
  const [dueDate, setDueDate] = useState('');

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

  const handleBorrowBook = () => {
    setShowModal(true); 
  };

  const handleConfirmBorrow = async () => {
    try {
      await axios.post(`https://localhost:5001/api/borrow`, {
        bookId: bookInstance.id,
        userId: selectedUser,
        dueDate: dueDate,
      });
      setShowModal(false);
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
      alert("An error occurred while updating the book.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedBook(prevState => ({
      ...prevState,
      [name]: 
        name === "pageCount" || name === "publicationYear" || name === "stock" 
          ? parseInt(value, 10)
          : value
    }));
  };

  if (!bookInstance) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="text-right mb-3">
        <a href="/" className="btn btn-success">Return to homepage</a>
      </div>
      <div className="ana p-4">
        <div className="row">
          <div className="col-md-4">
            <BookCover imageUrl={bookInstance.imageUrl} title={bookInstance.title} />
            <button 
              className="btn btn-outline-success w-100 mt-2" 
              onClick={handleBorrowBook}
            >
              Borrow
            </button>
            <div>
              {isEditing ? (
                <>
                  <button className="btn btn-success w-100 mt-2" onClick={handleSaveChanges}>Save Changes</button>
                  <button className="btn btn-secondary w-100 mt-2" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <>
                  <button 
                    className="btn btn-outline-primary w-100 mt-2" 
                    onClick={handleEditBook}
                  >
                    Edit Book
                  </button>
                  <button 
                    className="btn btn-outline-danger w-100 mt-2" 
                    onClick={handleDeleteBook}
                  >
                    Throw To Trash
                  </button>
                </>
              )}
            </div>
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

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="borrowModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="borrowModalLabel">Borrow Book</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="userSelect">Select User</label>
                <select
                  id="userSelect"
                  className="form-control"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select a user</option>
                  <option value="1">User 1</option>
                  <option value="2">User 2</option>
                  <option value="3">User 3</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="dueDate">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={handleConfirmBorrow}>Confirm Borrow</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
