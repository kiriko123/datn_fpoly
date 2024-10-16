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

    // const convertSlug = (str) => {
    //     return str.toLowerCase()
    //         .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    //         .replace(/[^\w\-]+/g, '') // Xóa ký tự không phải chữ cái, số hoặc dấu gạch ngang
    //         .replace(/\-\-+/g, '-') // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
    //         .replace(/^-+|-+$/g, ''); // Xóa dấu gạch ngang ở đầu và cuối
    // };

    const handleRedirectCategory = (category) => {
        const slug = convertSlug(category.name); // Chuyển đổi tên danh mục thành slug
        navigate(`/category/${slug}`); // Điều hướng đến trang chi tiết danh mục
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
