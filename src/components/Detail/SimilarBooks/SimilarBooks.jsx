import React from 'react';

const SimilarBooks = ({ similarBooks }) => {
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h5>Similar Books</h5>
      </div>
      {similarBooks.map(similarBook => (
        <div className="col-md-3 similar-books" key={similarBook.id}>
          <div className="book-cover-wrapper">
            <a href={`/detail/${similarBook.id}`}>
              <img src={similarBook.image_url} alt={`${similarBook.title} Cover`} className="book-cover" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimilarBooks;
