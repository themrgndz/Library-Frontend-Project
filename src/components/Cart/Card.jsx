import React from 'react';
import './Card.css';

const Card = ({ imageSrc, title, description, stock, buttonText }) => {
  
  const MAX_DESCRIPTION_LENGTH = 55; // Maksimum karakter sayısı

  const truncatedDescription = description.length > MAX_DESCRIPTION_LENGTH 
    ? description.slice(0, MAX_DESCRIPTION_LENGTH) + '...' 
    : description;
  
  return (
    <div className="card bg-dark">
      <img src={imageSrc} alt={title} className="card-image" />
      <div className="card-body">
        <h2>{title}</h2>
        <p>{truncatedDescription}</p>
        <p><strong>Remaining stock:</strong> {stock}</p>
        <button className="card-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default Card;
