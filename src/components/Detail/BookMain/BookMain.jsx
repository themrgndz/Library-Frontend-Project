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
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch book data
        const bookResponse = await axios.get(`https://localhost:5001/api/book/${id}`);
        setBookInstance(bookResponse.data);
        setEditedBook(bookResponse.data);

        // Fetch all books to get similar ones
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

      try {
        // Fetch users
        const userResponse = await axios.get('https://localhost:5001/api/user');
        setUsers(userResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleBorrowBook = () => {
    setShowModal(true);
  };

  const handleConfirmBorrow = async () => {
    try {
      // Kullanıcı seçimi için kullanıcının ID'sini gönderiyoruz
      const response = await axios.post(`https://localhost:5001/api/borrow`, {
        UserId: selectedUser,
        BookId: bookInstance.id,
        BorrowDate: new Date().toISOString(),
        DueDate: dueDate,
      });
      console.log(response.data);
      alert("Book borrowed successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error borrowing book:", error);
      alert("An error occurred while borrowing the book.");
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

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="borrowModalLabel" aria-hidden={!showModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="borrowModalLabel">Borrow Book</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="searchUser">Search User</label>
                <input 
                  type="text" 
                  id="searchUser" 
                  className="form-control mb-2" 
                  placeholder="Search for a user..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <label htmlFor="userSelect">Select User</label>
                <select 
                  id="userSelect" 
                  className="form-control" 
                  value={selectedUser} 
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select a user</option>
                  {filteredUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.username}</option>
                  ))}
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
