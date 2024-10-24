import React from 'react';

const App = () => {
  const handleButtonClick = async () => {
    const bookData = {
      "title": "Sample Book Title",
      "author": "Sample Author",
      "publisher": "Sample Publisher",
      "publicationYear": 2023,
      "pageCount": 300,
      "language": "English",
      "category": "Fiction",
      "isbn": "9781231298139",
      "stock": 10,
      "description": "Sample description",
      "imageUrl": "https://images.unsplash.com/photo-1729693862649-c457544c9c69?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    };

    try {
      const response = await fetch('https://localhost:5001/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        console.log('Book data successfully posted!');
      } else {
        console.log('Failed to post book data. Status:', response.status);
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
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default App;
