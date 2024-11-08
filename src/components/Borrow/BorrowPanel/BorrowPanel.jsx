// BorrowPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from '../UserList/UserList';
import BorrowList from '../BorrowList/BorrowList';

const BorrowPanel = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [borrowList, setBorrowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);
  const [currentBorrowPage, setCurrentBorrowPage] = useState(0);
  const [borrowsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://192.168.1.184:5001/api/user');
        const userData = Array.isArray(response.data) ? response.data : [];
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(0);
  };

  const handleUserClick = async (user) => {
    setSelectedUserId(user.userId);

    try {
      const response = await axios.get(`https://192.168.1.184:5001/api/borrow/user/${user.userId}`);
      setBorrowList(response.data);
      setCurrentBorrowPage(0);
    } catch (error) {
      console.error('Error fetching borrow information:', error);
      setBorrowList([]);
    }
  };

  const handleDeleteBorrow = async (borrowId) => {
    try {
      await axios.delete(`https://192.168.1.184:5001/api/borrow/${borrowId}`);
      setBorrowList(borrowList.filter((borrow) => borrow.borrowId !== borrowId));
      console.log(`Borrow with ID ${borrowId} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting borrow with ID ${borrowId}:`, error);
    }
  };

  const handleUpdateBorrow = async (borrowId, updatedData) => {
    const existingBorrow = borrowList.find(borrow => borrow.borrowId === borrowId);
  
    if (!existingBorrow) {
      console.error(`Borrow with ID ${borrowId} not found.`);
      return;
    }
  
    const fullUpdatedData = {
      ...existingBorrow,
      ...updatedData
    };
  
    try {
      await axios.put(`https://192.168.1.184:5001/api/borrow/${borrowId}`, fullUpdatedData);
  
      // Güncelleme işleminden sonra ilgili kullanıcının borç listesini yeniden alalım
      if (selectedUserId) {
        handleUserClick({ userId: selectedUserId });
      }
  
      console.log(`Borrow with ID ${borrowId} updated successfully`);
    } catch (error) {
      console.error(`Error updating borrow with ID ${borrowId}:`, error);
    }
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleBorrowPageChange = (selectedPage) => {
    setCurrentBorrowPage(selectedPage.selected);
  };

  return (
    <div className="container mt-4 text-center">
      <div className="row">
        <UserList 
          users={users} 
          filteredUsers={filteredUsers} 
          search={search} 
          handleSearchChange={handleSearchChange} 
          handleUserClick={handleUserClick} 
          currentPage={currentPage} 
          usersPerPage={usersPerPage} 
          handlePageChange={handlePageChange} 
        />

        <BorrowList 
          borrowList={borrowList} 
          selectedUserId={selectedUserId} 
          currentBorrowPage={currentBorrowPage} 
          borrowsPerPage={borrowsPerPage} 
          handleBorrowPageChange={handleBorrowPageChange} 
          handleDeleteBorrow={handleDeleteBorrow} 
          handleUpdateBorrow={handleUpdateBorrow} 
        />
      </div>
    </div>
  );
};

export default BorrowPanel;
