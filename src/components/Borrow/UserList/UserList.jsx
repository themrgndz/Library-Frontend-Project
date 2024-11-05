// UserList.js
import React from 'react';
import ReactPaginate from 'react-paginate';

const UserList = ({ users, filteredUsers, search, handleSearchChange, handleUserClick, currentPage, usersPerPage, handlePageChange }) => {
  // Calculate current users to display
  const indexOfLastUser = (currentPage + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
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
  );
};

export default UserList;
