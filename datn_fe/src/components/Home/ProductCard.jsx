import React from 'react';
import './ProductCard.css';
import { FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  if (!product) return null;

  const { thumbnail, name, price, discount } = product;
  const discountedPrice = price - (price * discount / 100);

  return (
    <div className="product-card">
      <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/product/${thumbnail}`} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <div className="product-price">
        <span className="current-price">{discountedPrice.toLocaleString('vi-VN')}đ</span>
      </div>
      <div className="original-price-discount">
        <span className="original-price">{price.toLocaleString('vi-VN')}đ</span>
        {discount > 0 && <span className="discount">-{discount}%</span>}
      </div>
      <button className="add-to-cart">
        Thêm vào giỏ hàng
        <FaShoppingCart className="cart-icon" />
      </button>
    </div>
  );
};

export default ProductCard;
