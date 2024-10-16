import React from 'react';
import './HotProductHeader.css';

const HotProductHeader = () => {
  return (
    <div className="title">
        <div className="spinner"></div> {/* Added spinner before title */}
        <h2>Hot Products</h2>
        <div className="underline"></div>
    </div>
  )
}

export default HotProductHeader