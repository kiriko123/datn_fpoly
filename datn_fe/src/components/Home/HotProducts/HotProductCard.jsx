import React from 'react';
import './HotProductCard.css';
import { FaSearch } from 'react-icons/fa';

const HotProductCard = ({ product, onClick }) => {
  if (!product) return null;

    return (
        <div className="product-card" onClick={onClick}>
            <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/product/${product.thumbnail}`} alt={product.name} className="product-image" />
            <div className="product-name">{product.name}</div>
            
        </div>
    );
};

export default HotProductCard;
