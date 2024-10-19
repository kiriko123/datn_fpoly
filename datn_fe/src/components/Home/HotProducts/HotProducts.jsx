import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HotProductHeader from './HotProductHeader';
import HotProductCard from './HotProductCard';
import HotProductButton from './HotProductButton';
import { callFetchProduct } from '../../../services/api';
import './HotProducts.css';

const HotProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const convertSlug = (str) => {
        return str.toLowerCase()
            .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w\-]+/g, '') // Xóa ký tự không phải chữ cái, số hoặc dấu gạch ngang
            .replace(/\-\-+/g, '-') // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
            .replace(/^-+|-+$/g, ''); // Xóa dấu gạch ngang ở đầu và cuối
    };

    const handleRedirectProduct = (product) => {
        const slug = convertSlug(product.name);
        navigate(`/product/${slug}?id=${product.id}`);

        //Cuộn lên đầu trang khi lọc xongs
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    useEffect(() => {
        const fetchHotProducts = async () => {
            try {
                const response = await callFetchProduct('hot=true&active=true');
                console.log('API Response:', response);
                if (response && response.data) {
                    if (Array.isArray(response.data.result)) {
                        const filteredProducts = response.data.result.filter(product => product.hot && product.active);
                        setProducts(filteredProducts.slice(0, 4)); // Chỉ lấy 4 sản phẩm hot và active
                    } else {
                        console.error('response.data.result is not an array:', response.data.result);
                    }
                }
            } catch (error) {
                console.error('Error fetching hot products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHotProducts();
    }, []);

    return (
        <div>
            <HotProductHeader />
            <div className="product-container">
                {loading ? (
                    <div>Loading...</div>
                ) : products.length === 0 ? (
                    <div>No hot products available.</div> // Hiển thị nếu không có sản phẩm hot
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
