import React, { useState } from "react";
import "./save.css"; // Stil dosyasını dahil edelim

function App() {
  const [loading, setLoading] = useState(false); // Yüklenme durumunu kontrol et

  const handleSubmit = async () => {
    setLoading(true); // Butona basılınca yükleme başlasın

    // POST edilecek veriler
    const bookData = {
      title: "Example Book",
      author: "John Doe",
      publisher: "Example Publisher",
      publication_year: 2023,
      page_count: 350,
      language: "English",
      category: "Fiction",
      isbn: "1234567890123",
      stock: 10,
      description: "This is a sample description for the book.",
      image_url: "http://example.com/book-image.jpg",
    };

    try {
      // POST isteği
      const response = await fetch("http://localhost:8080/MyLibrary/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      // Yanıtın içerik tipini kontrol edelim
      const contentType = response.headers.get("content-type");

      // Eğer sunucu JSON döndürüyor ise
      if (contentType && contentType.includes("application/json")) {
        const jsonResponse = await response.json();
        if (response.ok) {
          alert("Book data has been successfully posted!");
        } else {
          alert(`Failed to post book data: ${JSON.stringify(jsonResponse)}`);
        }
      } else {
        // HTML veya başka bir şey döndüğünde
        const textResponse = await response.text(); // Yanıtı text olarak al
        console.log("Received non-JSON response:", textResponse);
        alert(`Unexpected response from server: ${textResponse}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while posting the data.");
    } finally {
      setLoading(false); // Yükleme durumu bitirilsin
    }
  };

  return (
    <div className="App">
      <button className="post-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send Book Data"}
      </button>
    </div>
  );
}

export default App;
