import React from 'react';
import './HotCategoryCard.css';

const HotCategoryCard = ({ category, onClick }) => {
  if (!category) return null;

  return (
      <div className="product-card" onClick={onClick}>
          <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${category.thumbnail}`} alt={category.name} className="product-image" />
          <div className="product-name">{category.name}</div>
      </div>
  );
};

export default HotCategoryCard;
