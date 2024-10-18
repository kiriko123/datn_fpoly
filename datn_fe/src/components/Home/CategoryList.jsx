import React, { useEffect, useState } from 'react';
import { callFetchListCategory } from '../../services/api';
// New code
import { useNavigate } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await callFetchListCategory();
      if (res && res.data && Array.isArray(res.data.result)) {
        const activeCategories = res.data.result.filter(category => category.active === true);
        setCategories(activeCategories);
        console.log('Danh mục:', activeCategories);
      } else {
        console.error('Invalid data format received from API');
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  // const handleBrandClick = (brandName) => {
  //   console.log('Thương hiệu được chọn:', brandName);
  //   // New code
  //   // Điều hướng đến trang sản phẩm và truyền thương hiệu
  //   navigate(`/product?brand=${encodeURIComponent(brandName)}`);
  // };

  const handleCategoryClick = (categoryName) => {
    navigate('/product', { state: { category: categoryName } });
  };

  return (
    <div className="category-list">
      {categories.map((category) => (
          <div
              key={category.name}
              className={`category-item ${category.name.toLowerCase()}`}
              onClick={() => handleCategoryClick(category.name)}
          >
            {/*<img src={`${import.meta.env.VITE_BACKEND_URL}/storage/category-thumbnail/${category.thumbnail}`} alt={category.name} />*/}
            <span>{category.name}</span>
          </div>
      ))}
    </div>
  );
};

export default CategoryList;
