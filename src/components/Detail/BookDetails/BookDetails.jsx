import React from 'react';

const BookDetails = ({ bookInstance }) => {

  if (!bookInstance) {
    return <p>No book details available.</p>;
  }

  return (
    <div className="row align-items-center">
      <div className="col">
        <p className="text-light">Author: <strong>{bookInstance.author}</strong></p>
        <p className="book-details">Publisher: <strong>{bookInstance.publisher}</strong></p>
        <p className="book-details">Publication Year: <strong>{bookInstance.publication_year}</strong></p>
        <p className="book-details">Page Count: <strong>{bookInstance.page_count}</strong></p>
        <p className="book-details">Language: <strong>{bookInstance.language}</strong></p>
        <p className="book-details">Category: <strong>{bookInstance.category}</strong></p>
        <p className="book-details">ISBN: <strong>{bookInstance.isbn}</strong></p>
      </div>
      <div className="col">
        <p className="text-center stock-label"><strong>Stock Count</strong></p>
        <p className="text-center stock-info"><strong>{bookInstance.stock}</strong></p>
      </div>
      <h5 className="mt-4">Description</h5>
      <p>{bookInstance.description}</p>
    </div>
  );
};

export default BookDetails;
