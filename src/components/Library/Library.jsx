import React, { useEffect, useState } from 'react';
import Card from '../Cart/Card';

const Library = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/books'); // API'den kitapları al
      const data = await response.json();
      setBooks(data); // Gelen verileri state'e ata
    };

    fetchBooks();
  }, []);

  return (
    <div className="library">
      <h1>Kütüphane</h1>
      <div className="card-container">
        {books.map((book) => (
          <Card 
            key={book.id}
            imageSrc={book.imageUrl} 
            title={book.title} 
            description={book.description} 
            stock={book.stock} 
            buttonText="Detaylar" 
            id={book.id} // Kitap ID'sini geçir
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
