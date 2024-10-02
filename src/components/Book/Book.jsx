import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books');
                console.log('Fetched books:', response.data); // Doğru veriyi kontrol edin
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        
    
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
