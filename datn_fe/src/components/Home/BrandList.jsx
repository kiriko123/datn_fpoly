import React, { useEffect, useState } from 'react';
import { callFetchListBrand } from '../../services/api';
import './BrandList.css';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await callFetchListBrand();
      if (res && res.data && Array.isArray(res.data.result)) {
        const activeBrands = res.data.result.filter(brand => brand.active === true);
        setBrands(activeBrands);
        console.log('Thương hiệu:', activeBrands);
      } else {
        console.error('Invalid data format received from API');
        setBrands([]);
      }
    } catch (error) {
      console.error('Error fetching brands:', error);
      setBrands([]);
    }
  };

  const handleBrandClick = (brandName) => {
    console.log('Thương hiệu được chọn:', brandName);
  };

  return (
    <div className="brand-list">
      {brands.map((brand) => (
        <div
          key={brand.name}
          className={`brand-item ${brand.name.toLowerCase()}`}
          onClick={() => handleBrandClick(brand.name)}
        >
          <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/brand/${brand.thumbnail}`} alt={brand.name} />
        </div>
      ))}
    </div>
  );
};

export default BrandList;
