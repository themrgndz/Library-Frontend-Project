// Navbar.js
import React, { useState } from 'react';
import SearchBar from '../SearchBar/Searchbar';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: 'https://marketplace.canva.com/EAFKTWp2UfQ/1/0/1003w/canva-mavi-renkli-yalnızlık-temalı-kitap-kapağı-YpytBongs-w.jpg',
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

  const handleAddBookClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      const response = await fetch('https://localhost:5001/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSubmit)
      });

      if (response.ok) {
        alert('Book added successfully!');
        handleCloseModal();
      } else {
        const responseData = await response.json();
        console.error('Response:', responseData);
        alert(`Failed to add book: ${responseData.message || 'Check to form'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding book');
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded-bottom">
        <div className="container-fluid">
          <a className="navbar-brand mx-3" href="./">Uzmar Library</a>
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
            </ul>
          </div>
        </div>
      </nav>

      <div className={`modal fade ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalTitle" aria-hidden={!isModalOpen}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitle">Add New Book</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex">
              <img src={formData.imageUrl} alt="Book Cover" className="book-cover img-fluid my-auto" />
              
              <div className="book-details ms-4">
                <p>Title: <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>imageURL: <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Author: <input type="text" name="author" value={formData.author} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Publisher: <input type="text" name="publisher" value={formData.publisher} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Publication Year: <input type="text" name="publicationYear" value={formData.publicationYear} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Page Count: <input type="text" name="pageCount" value={formData.pageCount} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Language: <input type="text" name="language" value={formData.language} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Category: <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>ISBN: <input type="text" name="isbn" value={formData.isbn} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Stock: <input type="text" name="stock" value={formData.stock} onChange={handleInputChange} className="form-control mb-2" /></p>
                <p>Description: <textarea name="description" value={formData.description} onChange={handleInputChange} className="form-control mb-2" /></p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={handleSubmit}>Add Book</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
