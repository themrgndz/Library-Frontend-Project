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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await axios.get(`https://192.168.1.184:5001/api/book/${id}`);
        setBookInstance(bookResponse.data);
        setEditedBook(bookResponse.data);

        const allBooksResponse = await axios.get('https://192.168.1.184:5001/api/book');
        const filteredBooks = allBooksResponse.data.filter(book => book.id !== parseInt(id));
        const randomBooks = [];
        while (randomBooks.length < 4 && filteredBooks.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredBooks.length);
          randomBooks.push(filteredBooks.splice(randomIndex, 1)[0]);
        }
        setSimilarBooks(randomBooks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteBook = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://localhost:5001/api/book/${id}`);
        navigate('/');
      } catch (error) {
        console.error("Error deleting book:", error);
        alert("An error occurred while deleting the book.");
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
                {['title', 'author', 'publisher', 'publicationYear', 'pageCount', 'isbn', 'category', 'language', 'stock', 'imageUrl'].map((field, index) => (
                  <input 
                    key={index}
                    type={field === 'publicationYear' || field === 'pageCount' || field === 'stock' ? "number" : "text"}
                    name={field} 
                    value={editedBook[field] || ''} 
                    onChange={handleInputChange} 
                    className="form-control mb-2"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                  />
                ))}
                <textarea 
                  name="description" 
                  value={editedBook.description || ''} 
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
