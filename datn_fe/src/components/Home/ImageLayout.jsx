import React from 'react';
import './ImageLayout.css';
import banner1 from '../../assets/images/banner1.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';

const ImageLayout = () => {
  return (
    <div className="image-layout">
      <div className="image-container large-image">
        <img src={banner3} alt="Powered to Perform" />
      </div>
      <div className="image-container small-image top">
        <img src={banner1} alt="Gaming Laptops" />
      </div>
      <div className="image-container small-image bottom">
        <img src={banner4} alt="Best Performance" />
      </div>
    </div>
  );
};

export default ImageLayout;
