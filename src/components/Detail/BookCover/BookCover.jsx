import React from 'react';

const BookCover = ({ imageUrl, title }) => {
  return (
    <div className="book-cover-wrapper">
      <img src={imageUrl} alt={`${title} Cover`} className="book-cover" />
    </div>
  );
};

export default BookCover;
