import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  // Formdaki alanlar için state'leri tanımlıyoruz
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [language, setLanguage] = useState('');
  const [category, setCategory] = useState('');
  const [isbn, setIsbn] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  // Kitap ekleme işlemi için form submit fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newBook = {
      title,
      author,
      publisher,
      publicationYear: parseInt(year),
      pageCount: parseInt(pageCount),
      language,
      category,
      isbn,
      stock: parseInt(stock),
      imageUrl,
      description
    };

    try {
      // API'ye POST isteği gönderiliyor
      const response = await axios.post('http://localhost:5001/api/book', newBook);
      setMessage('Kitap başarıyla eklendi!');
      // Formu sıfırlıyoruz
      setTitle('');
      setAuthor('');
      setPublisher('');
      setYear('');
      setPageCount('');
      setLanguage('');
      setCategory('');
      setIsbn('');
      setStock('');
      setImageUrl('');
      setDescription('');
    } catch (error) {
      setMessage('Kitap eklenirken bir hata oluştu.');
      console.error('Kitap eklenirken hata:', error);
    }
  };

  return (
    <div>
      <h2>Kitap Ekle</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kitap Adı:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Yazar:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div>
          <label>Yayınevi:</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        </div>
        <div>
          <label>Yayın Yılı:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div>
          <label>Sayfa Sayısı:</label>
          <input type="number" value={pageCount} onChange={(e) => setPageCount(e.target.value)} required />
        </div>
        <div>
          <label>Dil:</label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        </div>
        <div>
          <label>Kategori:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div>
          <label>Stok Adedi:</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </div>
        <div>
          <label>Kapak Görseli URL:</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label>Açıklama:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Kitap Ekle</button>
      </form>
    </div>
  );
};

export default AddBook;
