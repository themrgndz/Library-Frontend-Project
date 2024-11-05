import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';

const BorrowPanel = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [borrowList, setBorrowList] = useState([]);

  // Pagination state for users
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(10);

  // Pagination state for borrow list
  const [currentBorrowPage, setCurrentBorrowPage] = useState(0);
  const [borrowsPerPage] = useState(10);

  // Fetch user data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:5001/api/user');
        const userData = Array.isArray(response.data) ? response.data : [];
        setUsers(userData);
        setFilteredUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(0); // Reset to the first page when searching
  };

  // Fetch borrow list for selected user
  const handleUserClick = async (user) => {
    setSelectedUserId(user.userId);

    try {
      const response = await axios.get(`https://localhost:5001/api/borrow/user/${user.userId}`);
      setBorrowList(response.data);
      console.log('Borrow List:', response.data);
      setCurrentBorrowPage(0); // Reset borrow page to first when selecting a user
    } catch (error) {
      console.error('Error fetching borrow information:', error);
      setBorrowList([]);
    }
  };

  // Calculate current users to display
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate current borrows to display
  const indexOfLastBorrow = (currentBorrowPage + 1) * borrowsPerPage;
  const indexOfFirstBorrow = indexOfLastBorrow - borrowsPerPage;
  const currentBorrows = borrowList.slice(indexOfFirstBorrow, indexOfLastBorrow);

  // Handle page change for users
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  // Handle page change for borrows
  const handleBorrowPageChange = (selectedPage) => {
    setCurrentBorrowPage(selectedPage.selected);
  };

  return (
    <div className="container mt-4">
      <h2>Borrow Panel</h2>

      <div className="row">
        {/* User List Section */}
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="userSearch">Search User:</label>
            <input
              type="text"
              className="form-control"
              id="userSearch"
              placeholder="Enter username..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr key={user.userId} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                    <td>{user.username}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="1">No users found</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* User Pagination Component */}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={Math.ceil(filteredUsers.length / usersPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>

        {/* Borrow List Section - Always visible */}
        <div className="col-md-8">
          <div className="mt-5">
            <h3>{selectedUserId ? `Borrow List for User ID ${selectedUserId}` : 'Select a user to see borrow list'}</h3>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Book Title</th>
                  <th>Borrow Date</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {currentBorrows.length > 0 ? (
                  currentBorrows.map((borrow) => (
                    <tr key={borrow.borrowId}>
                      <td>{borrow.book ? borrow.book.title : 'Book not found'}</td>
                      <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
                      <td>{new Date(borrow.dueDate).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No borrows found</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Borrow Pagination Component */}
            {selectedUserId && (
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={Math.ceil(borrowList.length / borrowsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handleBorrowPageChange}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowPanel;
