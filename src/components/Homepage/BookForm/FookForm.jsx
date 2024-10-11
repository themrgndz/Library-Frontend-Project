import React, { useState } from 'react';

const Container = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      title,
      description,
      imageUrl,
      stock,
    };

    try {
      const response = await fetch('http://localhost:8080/MyLibrary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Hata yanıtı:', errorText);
        throw new Error('Ağ hatası');
      }

      const data = await response.json();
      console.log('Başarılı:', data);

      // Formu temizle
      setTitle('');
      setDescription('');
      setImageUrl('');
      setStock(0);
    } catch (error) {
      console.error('Hata:', error);
      alert('Error'); // Kullanıcıya hata mesajı göstermek
    }
  };

  return (
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
      </div>
      <div>
        <label>Resim URL</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div>
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
  );
};

export default Container;
