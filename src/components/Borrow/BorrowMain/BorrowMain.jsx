import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Yeni ekleme

const BorrowMain = ({ bookId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [book, setBook] = useState(null);
    const navigate = useNavigate(); // useNavigate'i başlatıyoruz

    useEffect(() => {
        const fetchUsers = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(`https://localhost:5001/api/user/search?username=${searchTerm}`);
                    setUsers(response.data);
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            } else {
                setUsers([]);
            }
        };

        const debounceTimeout = setTimeout(() => {
            fetchUsers();
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    useEffect(() => {
        const fetchBook = async () => {
            if (bookId) {
                try {
                    const response = await axios.get(`https://localhost:5001/api/book/${bookId}`);
                    setBook(response.data);
                } catch (error) {
                    console.error("Error fetching book:", error);
                }
            }
        };

        fetchBook();
    }, [bookId]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const updateBookStock = async (bookId, amount) => {
        try {
            const response = await axios.post(`https://localhost:5001/api/book/updateStock`, {
                bookId: bookId,
                amount: amount,
            });
            console.log("Stok güncellemesi başarılı:", response.data);
        } catch (error) {
            console.error("Stok güncelleme hatası:", error);
        }
    };

    const handleConfirmBorrow = async () => {
        if (selectedUser) {
            const borrowData = {
                userId: selectedUser.userId,
                bookId: parseInt(bookId, 10), 
                borrowDate: new Date().toISOString().split('T')[0], 
                dueDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0], 
                returned: false
            };

            try {
                const response = await axios.post('https://localhost:5001/api/borrow', borrowData);
                console.log("Ödünç alma isteği başarılı:", response.data);

                await updateBookStock(bookId, -1); // Stok sayısını azalt

                // İşlem başarılı olduğunda anasayfaya yönlendir
                navigate('/'); // Anasayfaya yönlendirme
            } catch (error) {
                console.error("Ödünç alma onaylama hatası:", error.response ? error.response.data : error.message);
            }
        } else {
            console.error("Ödünç almak için kullanıcı seçin.");
        }
    };

    return (
        <div className='BorrowContainer'>
            <div style={styles.container}>
                <div style={styles.bookDetails}>
                    {book && (
                        <>
                            <h2>Book Details</h2>
                            <p><strong>Title:</strong> {book.title}</p>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>ISBN:</strong> {book.isbn}</p>
                            <p><strong>Stock:</strong> {book.stock}</p>
                        </>
                    )}
                </div>
                <div style={styles.searchSection}>
                    <label htmlFor="search" style={styles.label}>Search User</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Enter username"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.input}
                    />
                    <ul style={styles.userList}>
                        {users.map((user) => (
                            <li 
                                key={user.userId} 
                                style={user.userId === (selectedUser && selectedUser.userId) ? styles.selectedUserItem : styles.userItem}
                                onClick={() => handleUserClick(user)}
                            >
                                {user.username} ({user.email})
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedUser && (
                    <div style={styles.userDetails}>
                        <h2>User Details</h2>
                        <p><strong>Username:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>User ID:</strong> {selectedUser.userId}</p>
                    </div>
                )}
                <button onClick={handleConfirmBorrow} style={styles.confirmButton}>
                    Confirm Borrow
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '20px',
    },
    bookDetails: {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    searchSection: {
        marginBottom: '20px',
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '4px',
    },
    label: {
        display: 'block',
        marginBottom: '10px',
        fontSize: '18px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    userList: {
        listStyleType: 'none',
        padding: '0',
    },
    userItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
    },
    selectedUserItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        cursor: 'pointer',
        backgroundColor: '#f0f8ff',
        color: '#007bff',
        fontWeight: 'bold',
        borderRadius: '4px',
    },
    userDetails: {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    confirmButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default BorrowMain;
