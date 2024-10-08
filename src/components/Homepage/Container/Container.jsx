import React, { useState } from 'react';

const Container = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      description,
      imageUrl,
      stock,
    };

    console.log('Book Data:', bookData);

    try {
      const response = await fetch('http://localhost:8080/MyLibrary/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Hata: ${errorData.error}`);
        throw new Error('Ağ hatası');
      }

      const data = await response.json();
      setMessage('Başarılı: Kitap başarıyla eklendi!');
      console.log('Başarılı:', data);

      setTitle('');
      setDescription('');
      setImageUrl('');
      setStock(0);
    } catch (error) {
      console.error('Hata:', error);
      setMessage('Kitap eklenirken bir hata oluştu.');
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Kitap Başlığı</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Açıklama</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label>Resim URL'si</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <label>Stok</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Kitap Ekle</button>
      </form>
    </div>
  );
};

export default Container;
