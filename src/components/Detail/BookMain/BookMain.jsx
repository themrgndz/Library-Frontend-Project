import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import SimilarBooks from '../SimilarBooks/SimilarBooks';

import "./style.css"

const BookDetail = () => {
  const { id } = useParams();
  const [bookInstance, setBookInstance] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/MyLibrary/api/books/${id}`);
        console.log("Single book data:", response.data);
        setBookInstance(response.data);
        const allBooksResponse = await axios.get('http://localhost:8080/MyLibrary/api/books');
        const similar = allBooksResponse.data.filter(book => book.id !== parseInt(id)).slice(0, 4);
        setSimilarBooks(similar);

      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [id]);

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
            <BookCover imageUrl={bookInstance.image_url} title={bookInstance.title} />
            <button className="btn btn-outline-warning mt-3 w-100">Favorite</button>
            <button className="btn btn-outline-success mt-2 w-100">Borrow</button>
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
