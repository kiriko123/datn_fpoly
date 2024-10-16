import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HotCategoryHeader from './HotCategoryHeader';
import HotCategoryCard from './HotCategoryCard';
import { callFetchListCategory } from '../../../services/api';
import './HotCategories.css';

const HotCategories = () => {
    const [categories, setCategories] = useState([]); // Đổi tên biến từ products thành categories
    const [loading, setLoading] = useState(true); // Thêm loading state
    const navigate = useNavigate(); // Khởi tạo navigate

    const handleRedirectCategory = (category) => {
        // Cập nhật bộ lọc và điều hướng đến trang sản phẩm
        const filter = `filter=category.active:'true' and brand.active:'true' and active:'true' and quantity > 0 and category.id:'${category.id}'`;
        navigate(`/product?filter=${encodeURIComponent(filter)}`); // Điều hướng đến trang sản phẩm với bộ lọc
    };

    useEffect(() => {
        const fetchHotCategories = async () => {
            try {
                const response = await callFetchListCategory('hot=true');
                console.log('API Response:', response); // In ra để kiểm tra cấu trúc dữ liệu
                if (response && response.data) {
                    // Kiểm tra xem response.data.result có phải là mảng không
                    if (Array.isArray(response.data.result)) {
                        // Lấy 3 danh mục hot
                        setCategories(response.data.result.slice(0, 3)); // Sửa để lấy từ response.data.result
                    } else {
                        console.error('response.data.result is not an array:', response.data.result);
                    }
                }
            } catch (error) {
                console.error('Error fetching hot categories:', error);
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchHotCategories();
    }, []);

    return (
        <div>
            <HotCategoryHeader />
            <div className="product-container">
                {loading ? ( // Kiểm tra trạng thái loading
                    <div>Loading...</div>
                ) : (
                    categories.map((category) => (
                        <HotCategoryCard 
                            key={category.id} 
                            category={category}
                            onClick={() => handleRedirectCategory(category)} // Gọi hàm khi nhấp vào danh mục
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default HotCategories;
