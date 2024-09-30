import React from 'react';
import './Card.css'; // CSS dosyasını içe aktar

const Card = ({ imageSrc, title, description, stock, buttonText }) => {
  return (
    <div className="card">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-body">
        <h2>{title}</h2>
        <p>{description}</p>
        <p><strong>Remaining stock:</strong> {stock}</p>
        <button className="card-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default Card;
