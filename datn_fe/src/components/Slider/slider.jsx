import React, { useEffect, useState } from 'react';
import { Carousel, Image, Spin } from 'antd';
import { callFetchListSlider } from "../../services/api.js";
import './slider.css'; // Nhập file CSS để áp dụng các kiểu
import { useNavigate } from 'react-router-dom';

const SliderHome = () => {
    const [slider, setSlider] = useState(null); // Chỉ lưu một slider
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        navigate('/product');
    }

    useEffect(() => {
        const fetchLatestSlider = async () => {
            setLoading(true);
            try {
                const res = await callFetchListSlider("page=1&size=1&sort=createdAt,desc"); // Sắp xếp theo createdAt giảm dần
                if (res && res.data) {
                    setSlider(res.data.result[0]); // Lấy slider mới nhất
                }
            } catch (error) {
                console.error("Error fetching sliders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestSlider();
    }, []);

    if (loading) {
        return <Spin size="small" />;
    }

    if (!slider) {
        return <div>No slider available</div>; // Trường hợp không có dữ liệu slider
    }

    return (
        <div className="slider-container">
            <div className="text-column">
                <h2>Laptop và Phụ Kiện Hiệu Suất Cao</h2>
                <p>Khám phá các dòng laptop và phụ kiện chất lượng từ những thương hiệu hàng đầu. Nâng cao hiệu quả công việc với công nghệ tốt nhất cho mọi nhu cầu.</p>
                <button className="slider-button" onClick={handleBuyNow}>MUA NGAY</button>
            </div>
            <div className="image-column">
                {/* Hình ảnh ở đây */}
                <Carousel autoplay autoplaySpeed={3000} dots>
                    <div key={slider.id}>
                        <Image
                            src={`${import.meta.env.VITE_BACKEND_URL}/storage/slider/${slider.imgUrl}`}
                            alt={slider.title}
                        />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default SliderHome;
