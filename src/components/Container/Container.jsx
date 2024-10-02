import React, { useEffect, useState } from 'react';
import Card from '../Cart/Card.jsx';

const Container = () => {
  const [books, setBooks] = useState([]); // Kitapları tutacak state
  const [loading, setLoading] = useState(true); // Yükleme durumunu kontrol etmek için
  const [error, setError] = useState(null); // Hataları yakalamak için

  useEffect(() => {
    // API isteğini burada yapıyoruz
    fetch('http://localhost:8080/api/books') // Doğru endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('API isteği başarısız oldu');
        }
        return response.json(); // Veriyi JSON formatında alıyoruz
      })
      .then(data => {
        console.log("API'den gelen veri:", data); // Konsola gelen veriyi yazdır
        setBooks(data); // Veriyi state'e kaydediyoruz
        setLoading(false); // Yükleme tamamlandığında durumu değiştiriyoruz
      })
      .catch(error => {
        console.error('Veri çekme hatası:', error); // Hataları konsola yazdır
        setError(error.message); // Hata durumunu state'e kaydediyoruz
        setLoading(false); // Yükleme tamamlandığında durumu değiştiriyoruz
      });
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>; // Veri yüklenirken gösterilecek
  }

  if (error) {
    return <p style={{ color: 'red' }}>Hata: {error}</p>; // Hata mesajını ekrana göster
  }

  return (
    <div className="container">
      <div className="CategoryDiv"></div>
      <div className="card-container">
        {books.length > 0 ? ( // Eğer kitaplar varsa
          books.map((book, index) => (
            <Card
              key={index}
              imageSrc={book.image_url} // API'den gelen kitap verileri
              title={book.title}
              description={book.description}
              stock={book.stock}
              buttonText="Details"
            />
          ))
        ) : (
          <p>Hiç kitap bulunamadı</p> // Eğer kitap yoksa bu mesajı göster
        )}
      </div>
    </div>
  );
};

export default Container;
