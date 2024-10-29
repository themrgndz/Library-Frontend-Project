import React, { useState } from 'react';
import axios from 'axios';
import BookCover from '../../components/Detail/BookCover/BookCover';
import './create.css';

const BookCreate = () => {
  const [bookInstance, setBookInstance] = useState({
    title: '',
    authorName: '',
    publisherName: '',
    publicationYear: '',
    pageCount: '',
    language: '',
    categoryName: '',
    isbn: '',
    stock: '',
    description: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookInstance({ ...bookInstance, [name]: value });
  };

  const handleCreateBook = async () => {
    try {
      const response = await axios.post('https://localhost:5001/api/book', bookInstance);
      alert(`Kitap "${response.data.title}" başarıyla oluşturuldu!`);
      // Alanları sıfırlama
      setBookInstance({
        title: '',
        authorName: '',
        publisherName: '',
        publicationYear: '',
        pageCount: '',
        language: '',
        categoryName: '',
        isbn: '',
        stock: '',
        description: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error("Error creating book:", error);
      alert("Kitap oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="container mt-4 text-light">
      <div className="text-right mb-3">
        <a href="/homepage" className="btn btn-outline-light">Return to homepage</a>
      </div>
      <div className="ana p-4 bg-dark rounded shadow">
        <div className="row">
          <div className="col-md-4">
            <BookCover imageUrl={bookInstance.imageUrl || "default-image.jpg"} title={bookInstance.title || "New Book Title"} />
            <button
              className="btn btn-outline-primary mt-3 w-100 text-light"
              onClick={handleCreateBook}
            >
              Create Book
            </button>
          </div>
          <div className="col-md-8">
            <h2 className="text-light">{bookInstance.title || "New Book Title"}</h2>
            <div className="book-create-form">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={bookInstance.title}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="authorName"
                placeholder="Author"
                value={bookInstance.authorName}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="publisherName"
                placeholder="Publisher"
                value={bookInstance.publisherName}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="publicationYear"
                placeholder="Publication Year"
                value={bookInstance.publicationYear}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="pageCount"
                placeholder="Page Count"
                value={bookInstance.pageCount}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="language"
                placeholder="Language"
                value={bookInstance.language}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="categoryName"
                placeholder="Category"
                value={bookInstance.categoryName}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={bookInstance.isbn}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="stock"
                placeholder="Stock"
                value={bookInstance.stock}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={bookInstance.description}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={bookInstance.imageUrl}
                onChange={handleChange}
                className="form-control mt-2 bg-secondary text-light border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCreate;
