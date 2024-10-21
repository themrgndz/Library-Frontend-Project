import React from 'react';

const App = () => {
  const handleButtonClick = async () => {
    const bookData = {
      "title": "Sample Book Title",
      "author": "Sample Author",
      "publisher": "Sample Publisher",
      "publication_year": 2023,
      "page_count": 300,
      "language": "English",
      "category": "Fiction",
      "isbn": "978-1-23-129812-7",
      "stock": 10,
      "description": "Sample description",
      "image_url": "https://example.com/image.jpg"
    };

    try {
      const response = await fetch('https://localhost:5001/api/book', {  // URL güncellendi
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        console.log('Book data successfully posted!');
      } else {
        console.log('Failed to post book data. Status:', response.status);  // Hata durumunda status kodunu göster
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handleButtonClick}>
        Send Book Data
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default App;
