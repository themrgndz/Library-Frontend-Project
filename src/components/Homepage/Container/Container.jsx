import React, { useEffect, useState } from 'react';

// API çağrısını daha düzenli bir şekilde yapmak için fonksiyon
const fetchBooksFromAPI = async () => {
  const response = await fetch('http://localhost:8080/MyLibrary', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 302) {
    throw new Error('Sunucu bir yönlendirme yapmaya çalıştı, lütfen URL\'yi kontrol edin.');
  }

  if (!response.ok) {
    throw new Error('Kitaplar yüklenirken bir hata oluştu: ' + response.statusText);
  }

  const data = await response.json();
  return data;
};

const Container = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchBooksFromAPI();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  if (loading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div>
      <h2>Kitap Listesi</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata varsa kullanıcıya göster */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {books.map((book) => (
          <div key={book.id} style={styles.card} className='bg-dark'>
            <img src={book.imageUrl || 'default-image-url.jpg'} alt={book.title} style={styles.image} /> {/* Resim yoksa default resim */}
            <h3>{book.title}</h3>
            <p><strong>Açıklama:</strong> {book.description}</p>
            <p><strong>Stok:</strong> {book.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    width: '200px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
};

export default Container;
