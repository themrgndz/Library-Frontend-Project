import React, { useEffect, useState } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]); // Kitapları tutmak için state
  const [loading, setLoading] = useState(true); // Yükleniyor durumu

  // API'den veriyi çekmek için useEffect kullanıyoruz
  useEffect(() => {
    // API isteği yapmak için fetch kullanıyoruz
    fetch('http://localhost:8080/MyLibrary/api/books', { // Grails API endpoint'i
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('API isteğinde bir hata oluştu');
      }
      return response.json();
    })
    .then((data) => {
      setBooks(data); // Gelen veri state'e set ediliyor
      setLoading(false); // Yükleme işlemi tamamlandı
    })
    .catch((error) => {
      console.error('Hata:', error);
      setLoading(false);
    });
  }, []); // [] bu sayede component sadece bir kez yüklenirken çağrılır.

  // Veriler yüklenirken gösterilecek içerik
  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  // Verileri render etme
  return (
    <div>
      <h1>Kitap Listesi</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> - {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
