import React, { useEffect, useState } from 'react';
import { Carousel, Image, Spin } from 'antd';
import { callFetchListSlider } from "../../services/api.js";
import './slider.css'; // Nhập file CSS để áp dụng các kiểu
import { useNavigate } from 'react-router-dom';

const SliderHome = () => {
    const [slider, setSlider] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleBuyNow = () => {
        navigate('/product');
    }

    useEffect(() => {
        const fetchLatestSlider = async () => {
            setLoading(true);
            try {
                const res = await callFetchListSlider("page=1&size=5"); // Sắp xếp theo createdAt giảm dần
                if (res && res.data) {
                    setSlider(res.data.result); // Lấy slider mới nhất
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
        <Carousel autoplay autoplaySpeed={4000} dots>
        {slider.map((item) => (
            <div key={slider.id}>
                <div className="slider-container">
                    <div className="text-column">
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <button className="slider-button" onClick={handleBuyNow}>MUA NGAY</button>
                    </div>
                    <div className="image-column">
                        <Image
                            src={`${import.meta.env.VITE_BACKEND_URL}/storage/slider/${item.imgUrl}`}
                            alt={item.title}
                        />
                    </div>
                </div>
            </div>
        ))}
    </Carousel>

    );
};

export default SliderHome;
