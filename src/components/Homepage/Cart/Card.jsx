import React from 'react';

const Card = ({ book }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-4">
      <a href={`detail/${book.bookId}`} className="text-decoration-none">
        <div className="card bg-dark text-light">
          <img src={book.imageUrl} className="card-img-top" alt={book.title} />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text"><strong>Stok Durumu:</strong> {book.stock}</p>
            <p className="card-text"><strong>Açıklama:</strong> {book.description}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
