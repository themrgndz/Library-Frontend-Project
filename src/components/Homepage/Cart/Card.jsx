import React from 'react';

const Card = ({ book }) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-4">
      <a href={`detail/${book.id}`} className="text-decoration-none">
        <div className="card bg-dark text-light">
          <img src={book.image_url} className="card-img-top" alt={book.title} />
          <div className="card-body">
            <h5 className="card-title text-light">{book.title}</h5>
            <p className="card-text text-light">{book.description}</p>
            <p className="card-text text-light">Remaining stock: {book.stock}</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Card;
