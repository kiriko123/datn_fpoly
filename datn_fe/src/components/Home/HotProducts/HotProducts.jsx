import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import HotProductHeader from './HotProductHeader';
import HotProductCard from './HotProductCard';
import HotProductButton from './HotProductButton';
import { callFetchProduct } from '../../../services/api';
import './HotProducts.css';

const HotProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm loading state
    const navigate = useNavigate(); // Initialize navigate

    const convertSlug = (str) => {
        return str.toLowerCase()
            .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w\-]+/g, '') // Xóa ký tự không phải chữ cái, số hoặc dấu gạch ngang
            .replace(/\-\-+/g, '-') // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
            .replace(/^-+|-+$/g, ''); // Xóa dấu gạch ngang ở đầu và cuối
    };

    const handleRedirectProduct = (product) => {
        const slug = convertSlug(product.name); // Chuyển đổi tên sản phẩm thành slug
        navigate(`/product/${slug}?id=${product.id}`); // Điều hướng đến trang chi tiết sản phẩm
    };

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                const response = await callFetchProduct('hot=true');
                console.log('API Response:', response); // In ra để kiểm tra cấu trúc dữ liệu
                if (response && response.data) {
                    // Kiểm tra xem response.data.result có phải là mảng không
                    if (Array.isArray(response.data.result)) {
                        // Lấy 4 sản phẩm hot
                        setProducts(response.data.result.slice(0, 4)); // Sửa để lấy từ response.data.result
                    } else {
                        console.error('response.data.result is not an array:', response.data.result);
                    }
                }
            } catch (error) {
                console.error('Error fetching hot products:', error);
            } finally {
                setLoading(false); // Đặt loading thành false khi hoàn thành
            }
        };

        fetchHotProducts();
    }, []);

    return (
        <div>
            <HotProductHeader />
            <div className="product-container">
                {loading ? ( // Kiểm tra trạng thái loading
                    <div>Loading...</div>
                ) : (
                    products.map((product) => (
                        <HotProductCard 
                            key={product.id} 
                            product={product}
                            onClick={() => handleRedirectProduct(product)}
                        />
                    ))
                )}
            </div>
            <HotProductButton />
        </div>
    );
}

export default HotProducts;
