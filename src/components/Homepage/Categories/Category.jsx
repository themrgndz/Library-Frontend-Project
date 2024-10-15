import React from 'react';

const CategoryCard = ({ category, onClick }) => {
  return (
    <div className="category-card" onClick={() => onClick(category)}>
      <p>{category.name}</p>
    </div>
  );
};

export default CategoryCard;
