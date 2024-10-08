import React, { useState } from "react";

const AddBookForm = () => {
  // Form input state'leri
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    publicationYear: "",
    pageCount: "",
    language: "",
    category: "",
    isbn: "",
    stock: "",
    description: "",
    imageUrl: ""
  });

  // Input değişikliklerini takip et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Formu gönderme işlevi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST isteği yapıyoruz
      const response = await fetch("http://localhost:8080/MyLibrary/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      const data = await response.json(); // JSON verisini almak için bekliyoruz

      if (response.ok) {
        alert("Kitap başarıyla kaydedildi!");
        console.log("Added:", data); // Başarılı ekleme sonrası veriyi konsola yazdırıyoruz
        // Formu sıfırlama
        setBook({
          title: "",
          author: "",
          publisher: "",
          publicationYear: "",
          pageCount: "",
          language: "",
          category: "",
          isbn: "",
          stock: "",
          description: "",
          imageUrl: ""
        });
      } else {
        alert(`Hata: ${data.message}`);
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Kitap kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <div>
      <h2>Kitap Ekle</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </label>
        <label>
          Author:
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </label>
        <label>
          Publisher:
          <input type="text" name="publisher" value={book.publisher} onChange={handleChange} />
        </label>
        <label>
          Publication Year:
          <input type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} />
        </label>
        <label>
          Page Count:
          <input type="number" name="pageCount" value={book.pageCount} onChange={handleChange} />
        </label>
        <label>
          Language:
          <input type="text" name="language" value={book.language} onChange={handleChange} />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={book.category} onChange={handleChange} />
        </label>
        <label>
          ISBN:
          <input type="text" name="isbn" value={book.isbn} onChange={handleChange} required />
        </label>
        <label>
          Stock:
          <input type="number" name="stock" value={book.stock} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={book.description} onChange={handleChange}></textarea>
        </label>
        <label>
          Image URL:
          <input type="text" name="imageUrl" value={book.imageUrl} onChange={handleChange} />
        </label>
        <button type="submit">Kitap Ekle</button>
      </form>
    </div>
  );
};

export default AddBookForm;
