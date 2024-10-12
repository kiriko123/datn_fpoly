import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import './ProductList.css';
import { callFetchProduct } from '../../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortQuery, setSortQuery] = useState('sort=id,desc');

  useEffect(() => {
    console.log("Fetching products. Current page:", currentPage, "Sort query:", sortQuery);
    fetchProducts();
  }, [currentPage, sortQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = `page=${currentPage}&size=${productsPerPage}&${sortQuery}`; // Chỉnh sửa để page bắt đầu từ 0
      console.log("Fetching products with query:", query);
      const res = await callFetchProduct(query);
      console.log("API response:", res.data);
      if (res && res.data) {
        setProducts(res.data.result);
        setTotal(res.data.meta.total); // Sử dụng total từ meta
        console.log("Total products:", res.data.meta.total);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    console.log("Changing to page:", pageNumber);
    setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    // window.scrollTo(0, 0); // Bỏ qua cuộn lên đầu trang
  };

  const handleSort = (sortType) => {
    let sortQuery;
    switch(sortType) {
      case 'newest':
        sortQuery = 'sort=createdAt,desc';
        break;
      case 'priceAsc':
        sortQuery = 'sort=price,asc';
        break;
      case 'priceDesc':
        sortQuery = 'sort=price,desc';
        break;
      case 'bestselling':
        sortQuery = 'sort=sold,desc';
        break;
      default:
        sortQuery = 'sort=id,desc';
    }
    console.log("Sorting changed to:", sortQuery);
    setSortQuery(sortQuery);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi sắp xếp
  };

  return (
    <div className="product-list-container">
      <h2>Sản phẩm nổi bật</h2>
      <div className="filter-options">
        <span>Sắp xếp theo</span>
        <button onClick={() => handleSort('newest')} className={sortQuery === 'sort=createdAt,desc' ? 'active' : ''}>Mới nhất</button>
        <button onClick={() => handleSort('bestselling')} className={sortQuery === 'sort=sold,desc' ? 'active' : ''}>Bán chạy</button>
        <select onChange={(e) => handleSort(e.target.value)} value={sortQuery.replace('sort=', '')}>
          <option value="price,asc">Giá tăng dần</option>
          <option value="price,desc">Giá giảm dần</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
              />
            ))}
          </div>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={total}
            currentPage={currentPage}
            handlePagination={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductList;
