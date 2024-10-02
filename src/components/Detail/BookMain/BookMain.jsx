import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import SimilarBooks from '../SimilarBooks/SimilarBooks';
import './style.css';

const BookDetail = () => {
  const [bookInstance, setBookInstance] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/MyLibrary/api/books');
        // İlk kitabı alıyoruz (örneğin, id'si 1 olan)
        setBookInstance(response.data[0]);
        // Benzer kitapları almak için farklı bir endpoint veya aynı verinin benzer kısımlarını kullanabilirsiniz.
        setSimilarBooks(response.data.slice(1, 5)); // Örneğin ilk 5 benzer kitap
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, []);

  if (!bookInstance) {
    return <div>Loading...</div>; // Veri yüklenirken bir yükleniyor mesajı gösterelim
  }

  return (
    <div className="container mt-4">
      <div className="text-right mb-3">
        <a href="/home" className="btn btn-success">Return to homepage</a>
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
