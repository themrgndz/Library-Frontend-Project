import React, { useState } from 'react';
import axios from 'axios';

const AddData = () => {
    // State for each entity
    const [author, setAuthor] = useState({ Name: '', Biography: '', BirthYear: '', DeathYear: '' });
    const [book, setBook] = useState({ Title: '', AuthorId: '', PublisherId: '', CategoryId: '', PublicationYear: '', PageCount: '', ISBN: '', Language: '', Stock: '', ImageUrl: '', Description: '' });
    const [category, setCategory] = useState({ Name: '', Description: '' });
    const [publisher, setPublisher] = useState({ Name: '', Address: '', ContactEmail: '', PhoneNumber: '' });
    const [reservation, setReservation] = useState({ UserID: '', BookID: '', ReservationDate: '', ReturnDate: '' });
    const [role, setRole] = useState({ RoleName: '', Description: '' });
    const [user, setUser] = useState({ Username: '', PasswordHash: '', Email: '' });
    const [userRole, setUserRole] = useState({ UserID: '', RoleID: '' });

    // Handlers
    const handleAuthorChange = (e) => setAuthor({ ...author, [e.target.name]: e.target.value });
    const handleBookChange = (e) => setBook({ ...book, [e.target.name]: e.target.value });
    const handleCategoryChange = (e) => setCategory({ ...category, [e.target.name]: e.target.value });
    const handlePublisherChange = (e) => setPublisher({ ...publisher, [e.target.name]: e.target.value });
    const handleReservationChange = (e) => setReservation({ ...reservation, [e.target.name]: e.target.value });
    const handleRoleChange = (e) => setRole({ ...role, [e.target.name]: e.target.value });
    const handleUserChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const handleUserRoleChange = (e) => setUserRole({ ...userRole, [e.target.name]: e.target.value });

    const handleAuthorSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/authors', author);
        setAuthor({ Name: '', Biography: '', BirthYear: '', DeathYear: '' });
    };

    const handleBookSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/books', book);
        setBook({ Title: '', AuthorId: '', PublisherId: '', CategoryId: '', PublicationYear: '', PageCount: '', ISBN: '', Language: '', Stock: '', ImageUrl: '', Description: '' });
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/categories', category);
        setCategory({ Name: '', Description: '' });
    };

    const handlePublisherSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/publishers', publisher);
        setPublisher({ Name: '', Address: '', ContactEmail: '', PhoneNumber: '' });
    };

    const handleReservationSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/reservations', reservation);
        setReservation({ UserID: '', BookID: '', ReservationDate: '', ReturnDate: '' });
    };

    const handleRoleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/roles', role);
        setRole({ RoleName: '', Description: '' });
    };

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/users', user);
        setUser({ Username: '', PasswordHash: '', Email: '' });
    };

    const handleUserRoleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('https://localhost:5001/api/userroles', userRole);
        setUserRole({ UserID: '', RoleID: '' });
    };

    return (
        <div>
            <h2>Yazar Ekle</h2>
            <form onSubmit={handleAuthorSubmit}>
                <input type="text" name="Name" placeholder="Yazar Adı" value={author.Name} onChange={handleAuthorChange} required />
                <input type="text" name="Biography" placeholder="Biyografi" value={author.Biography} onChange={handleAuthorChange} />
                <input type="number" name="BirthYear" placeholder="Doğum Yılı" value={author.BirthYear} onChange={handleAuthorChange} />
                <input type="number" name="DeathYear" placeholder="Ölüm Yılı" value={author.DeathYear} onChange={handleAuthorChange} />
                <button type="submit">Yazar Ekle</button>
            </form>

            <h2>Kitap Ekle</h2>
            <form onSubmit={handleBookSubmit}>
                <input type="text" name="Title" placeholder="Kitap Başlığı" value={book.Title} onChange={handleBookChange} required />
                <input type="number" name="AuthorId" placeholder="Yazar ID" value={book.AuthorId} onChange={handleBookChange} />
                <input type="number" name="PublisherId" placeholder="Yayınevi ID" value={book.PublisherId} onChange={handleBookChange} />
                <input type="number" name="CategoryId" placeholder="Kategori ID" value={book.CategoryId} onChange={handleBookChange} />
                <input type="number" name="PublicationYear" placeholder="Yayın Yılı" value={book.PublicationYear} onChange={handleBookChange} />
                <input type="number" name="PageCount" placeholder="Sayfa Sayısı" value={book.PageCount} onChange={handleBookChange} />
                <input type="text" name="ISBN" placeholder="ISBN" value={book.ISBN} onChange={handleBookChange} />
                <input type="text" name="Language" placeholder="Dil" value={book.Language} onChange={handleBookChange} />
                <input type="number" name="Stock" placeholder="Stok" value={book.Stock} onChange={handleBookChange} />
                <input type="text" name="ImageUrl" placeholder="Görüntü URL" value={book.ImageUrl} onChange={handleBookChange} />
                <input type="text" name="Description" placeholder="Açıklama" value={book.Description} onChange={handleBookChange} />
                <button type="submit">Kitap Ekle</button>
            </form>

            <h2>Kategori Ekle</h2>
            <form onSubmit={handleCategorySubmit}>
                <input type="text" name="Name" placeholder="Kategori Adı" value={category.Name} onChange={handleCategoryChange} required />
                <input type="text" name="Description" placeholder="Açıklama" value={category.Description} onChange={handleCategoryChange} />
                <button type="submit">Kategori Ekle</button>
            </form>

            <h2>Yayınevi Ekle</h2>
            <form onSubmit={handlePublisherSubmit}>
                <input type="text" name="Name" placeholder="Yayınevi Adı" value={publisher.Name} onChange={handlePublisherChange} required />
                <input type="text" name="Address" placeholder="Adres" value={publisher.Address} onChange={handlePublisherChange} />
                <input type="email" name="ContactEmail" placeholder="İletişim E-posta" value={publisher.ContactEmail} onChange={handlePublisherChange} />
                <input type="text" name="PhoneNumber" placeholder="Telefon Numarası" value={publisher.PhoneNumber} onChange={handlePublisherChange} />
                <button type="submit">Yayınevi Ekle</button>
            </form>

            <h2>Rezervasyon Ekle</h2>
            <form onSubmit={handleReservationSubmit}>
                <input type="number" name="UserID" placeholder="Kullanıcı ID" value={reservation.UserID} onChange={handleReservationChange} required />
                <input type="number" name="BookID" placeholder="Kitap ID" value={reservation.BookID} onChange={handleReservationChange} required />
                <input type="date" name="ReservationDate" placeholder="Rezervasyon Tarihi" value={reservation.ReservationDate} onChange={handleReservationChange} />
                <input type="date" name="ReturnDate" placeholder="İade Tarihi" value={reservation.ReturnDate} onChange={handleReservationChange} />
                <button type="submit">Rezervasyon Ekle</button>
            </form>

            <h2>Rol Ekle</h2>
            <form onSubmit={handleRoleSubmit}>
                <input type="text" name="RoleName" placeholder="Rol Adı" value={role.RoleName} onChange={handleRoleChange} required />
                <input type="text" name="Description" placeholder="Açıklama" value={role.Description} onChange={handleRoleChange} />
                <button type="submit">Rol Ekle</button>
            </form>

            <h2>Kullanıcı Ekle</h2>
            <form onSubmit={handleUserSubmit}>
                <input type="text" name="Username" placeholder="Kullanıcı Adı" value={user.Username} onChange={handleUserChange} required />
                <input type="password" name="PasswordHash" placeholder="Şifre" value={user.PasswordHash} onChange={handleUserChange} required />
                <input type="email" name="Email" placeholder="E-posta" value={user.Email} onChange={handleUserChange} />
                <button type="submit">Kullanıcı Ekle</button>
            </form>

            <h2>Kullanıcı Rolü Ekle</h2>
            <form onSubmit={handleUserRoleSubmit}>
                <input type="number" name="UserID" placeholder="Kullanıcı ID" value={userRole.UserID} onChange={handleUserRoleChange} required />
                <input type="number" name="RoleID" placeholder="Rol ID" value={userRole.RoleID} onChange={handleUserRoleChange} required />
                <button type="submit">Kullanıcı Rolü Ekle</button>
            </form>
        </div>
    );
};

export default AddData;
