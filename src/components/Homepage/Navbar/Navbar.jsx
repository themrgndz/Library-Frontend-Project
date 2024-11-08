import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar/Searchbar';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: 'https://marketplace.canva.com/EAF7F9-yBas/1/0/1003w/canva-gri-tonları-ve-turuncu-karanlık-gaz-lambası-fotoğrafı-kitap-kapağı-FNig_YUbce4.jpg',
    author: '',
    publisher: '',
    publicationYear: '',
    pageCount: '',
    language: '',
    category: '',
    isbn: '',
    stock: '',
    description: ''
  });

  const [books, setBooks] = useState([]);
  const navigate = useNavigate(); // React Router hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksResponse = await fetch('https://192.168.1.184:5001/api/books');
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddBookClick = () => {
    setIsAddBookModalOpen(true);
  };

  const handleCloseAddBookModal = () => {
    setIsAddBookModalOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      ...formData,
      publicationYear: parseInt(formData.publicationYear),
      pageCount: parseInt(formData.pageCount),
      stock: parseInt(formData.stock),
      isbn: formData.isbn
    };

    console.log("Data to submit:", dataToSubmit);

    try {
      const response = await fetch('https://192.168.1.184:5001/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });

      if (response.ok) {
        alert('Book added successfully!');
        handleCloseAddBookModal();
      } else {
        const responseData = await response.json();
        console.error('Response:', responseData);
        alert(`Failed to add book: ${responseData.message || 'Check the form'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book');
    }
  };

  const handleBorrowClick = () => {
    navigate('/borrow'); // Navigate to /borrowpage
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand mx-3" to="/">Uzmar Library</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex ms-auto" role="search" onSubmit={(e) => e.preventDefault()}>
              <SearchBar onSearch={onSearch} />
            </form>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Button text="Add Book" onClick={handleAddBookClick} />
              </li>
              <li className="nav-item">
                <Button text="Borrow" onClick={handleBorrowClick} />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Add Book Modal */}
      <div className={`modal fade ${isAddBookModalOpen ? 'show' : ''}`} style={{ display: isAddBookModalOpen ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="addBookModalTitle" aria-hidden={!isAddBookModalOpen}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="addBookModalTitle">Add New Book</h5>
              <button type="button" className="btn-close btn-close-white" onClick={handleCloseAddBookModal} aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex">
              <img src={formData.imageUrl} alt="Book Cover" className="book-cover img-fluid my-auto" style={{ height: '100%', width: 'auto', maxWidth: '60%' }} />
              <div className="book-details ms-4" style={{ flex: 1 }}>
                {Object.keys(formData).map((key) => (
                  key !== 'imageUrl' && (
                    <div className="mb-2" key={key}>
                      <label className="form-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                      {key === 'description' ? (
                        <textarea name={key} value={formData[key]} onChange={handleInputChange} className="form-control form-control-sm" />
                      ) : (
                        <input type="text" name={key} value={formData[key]} onChange={handleInputChange} className="form-control form-control-sm" />
                      )}
                    </div>
                  )
                ))}
                <div className="mb-2">
                  <label className="form-label">Image URL:</label>
                  <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="form-control form-control-sm" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success btn-sm" onClick={handleSubmit}>Add Book</button>
            </div>
          </div>
        </div>
      </div>

      {isAddBookModalOpen && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Navbar;
