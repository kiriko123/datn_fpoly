import React from 'react';
import './HotCategoryHeader.css';

const HotCategoryHeader = () => {
  return (
    <div className="title">
        <div className="spinner"></div> {/* Added spinner before title */}
        <h2>Hot Categories</h2>
        <div className="underline"></div>
    </div>
  )
}

export default HotCategoryHeader