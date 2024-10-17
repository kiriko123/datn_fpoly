import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate và useLocation
import HotCategoryHeader from './HotCategoryHeader';
import HotCategoryCard from './HotCategoryCard';
import { callFetchListCategory } from '../../../services/api';
import './HotCategories.css';

const HotCategories = () => {
    const [categories, setCategories] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate(); 
    const { search } = useLocation(); // Lấy URL params hiện tại

    const handleRedirectCategory = (category) => {
        // Lấy các filter hiện có từ URL
        const params = new URLSearchParams(search);
        const currentFilter = params.get('filter') || "category.active:'true' and brand.active:'true' and active:'true' and quantity > 0";
    
        // Thêm filter mới cho category
        const newFilter = `${currentFilter} and category.name:'${category.name}'`;
        
        // Điều hướng đến trang sản phẩm với bộ lọc kết hợp
        navigate(`/product?filter=${encodeURIComponent(newFilter)}`);
    };  
    

    useEffect(() => {
        const fetchHotCategories = async () => {
            try {
                const response = await callFetchListCategory('hot=true');
                if (response && response.data && Array.isArray(response.data.result)) {
                    setCategories(response.data.result.slice(0, 3)); 
                } else {
                    console.error('response.data.result is not an array:', response.data.result);
                }
            } catch (error) {
                console.error('Error fetching hot categories:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchHotCategories();
    }, []);

    return (
        <div>
            <HotCategoryHeader />
            <div className="product-container">
                {loading ? ( 
                    <div>Loading...</div>
                ) : (
                    categories.map((category) => (
                        <HotCategoryCard 
                            key={category.id} 
                            category={category}
                            onClick={() => handleRedirectCategory(category)} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default HotCategories;
