// BorrowList.js
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const BorrowList = ({ borrowList, selectedUserId, currentBorrowPage, borrowsPerPage, handleBorrowPageChange, handleDeleteBorrow, handleUpdateBorrow }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedBorrow, setEditedBorrow] = useState({ borrowDate: '', dueDate: '' });
  const [newBorrow, setNewBorrow] = useState({ bookId: '', borrowDate: '', dueDate: '' });
  const [showAddBorrowForm, setShowAddBorrowForm] = useState(false);

  const startEditing = (borrow) => {
    setEditMode(borrow.borrowId);
    const borrowDate = new Date(borrow.borrowDate);
    const dueDate = new Date(borrow.dueDate);
    
    setEditedBorrow({
      borrowDate: borrowDate.toLocaleDateString('en-CA'),
      dueDate: dueDate.toLocaleDateString('en-CA')
    });
  };

  const saveEdit = (borrowId) => {
    handleUpdateBorrow(borrowId, editedBorrow);
    setEditMode(null);
  };

  const cancelEdit = () => {
    setEditMode(null);
  };

  const handleAddNewBorrow = async () => {
    const borrowData = {
      userId: parseInt(selectedUserId),
      bookId: parseInt(newBorrow.bookId),
      borrowDate: newBorrow.borrowDate, 
      dueDate: newBorrow.dueDate,       
      returned: false,
    };
    console.log('Selected User ID:', selectedUserId);
    console.log('------------------------------------')
    console.log('Type of Selected User ID:', typeof selectedUserId);
    console.log('------------------------------------')
    console.log('Sending POST request with data:', borrowData);
  
    try {
      const response = await fetch('http://192.168.1.184:5001/api/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(borrowData),
      });
  
      const responseData = await response.json();
      console.log('Response from server:', responseData);
  
      if (response.ok) {
        setNewBorrow({ bookId: '', borrowDate: '', dueDate: '' });
        setShowAddBorrowForm(false);
      } else {
        console.error('Error adding borrow:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding borrow:', error);
    }
  };
  
  const indexOfLastBorrow = (currentBorrowPage + 1) * borrowsPerPage;
  const indexOfFirstBorrow = indexOfLastBorrow - borrowsPerPage;
  const currentBorrows = borrowList.slice(indexOfFirstBorrow, indexOfLastBorrow);

  return (
    <div className="col-md-8">
      <div>
        <h3>{selectedUserId ? `Borrow List for User ID ${selectedUserId}` : 'Select a user to see borrow list'}</h3>

        {selectedUserId && (
          <>
            <button className="btn btn-primary mb-2" onClick={() => setShowAddBorrowForm(!showAddBorrowForm)}>
              {showAddBorrowForm ? 'Cancel' : 'Add Borrow'}
            </button>
            {showAddBorrowForm && (
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Book ID"
                  value={newBorrow.bookId}
                  onChange={(e) => setNewBorrow({ ...newBorrow, bookId: e.target.value })}
                  className="form-control mb-2"
                />
                <input
                  type="date"
                  value={newBorrow.borrowDate}
                  onChange={(e) => setNewBorrow({ ...newBorrow, borrowDate: e.target.value })}
                  className="form-control mb-2"
                />
                <input
                  type="date"
                  value={newBorrow.dueDate}
                  onChange={(e) => setNewBorrow({ ...newBorrow, dueDate: e.target.value })}
                  className="form-control mb-2"
                />
                <button className="btn btn-success" onClick={handleAddNewBorrow}>
                  Add Borrow
                </button>
              </div>
            )}
          </>
        )}

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBorrows.length > 0 ? (
              currentBorrows.map((borrow) => (
                <tr key={borrow.borrowId}>
                  <td>{borrow.book ? borrow.book.title : 'Book not found'}</td>
                  <td>
                    {editMode === borrow.borrowId ? (
                      <input
                        type="date"
                        value={editedBorrow.borrowDate}
                        onChange={(e) => setEditedBorrow({ ...editedBorrow, borrowDate: e.target.value })}
                      />
                    ) : (
                      new Date(borrow.borrowDate).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editMode === borrow.borrowId ? (
                      <input
                        type="date"
                        value={editedBorrow.dueDate}
                        onChange={(e) => setEditedBorrow({ ...editedBorrow, dueDate: e.target.value })}
                      />
                    ) : (
                      new Date(borrow.dueDate).toLocaleDateString()
                    )}
                  </td>
                  <td>
                    {editMode === borrow.borrowId ? (
                      <>
                        <button className="btn btn-success btn-sm" onClick={() => saveEdit(borrow.borrowId)}>
                          Save
                        </button>
                        <button className="btn btn-secondary btn-sm ms-2" onClick={cancelEdit}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => startEditing(borrow)}>
                        Edit
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDeleteBorrow(borrow.borrowId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No borrows found</td>
              </tr>
            )}
          </tbody>
        </table>
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
  );
};

export default BorrowList;
