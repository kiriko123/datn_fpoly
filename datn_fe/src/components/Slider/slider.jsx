import React, { useEffect, useState } from 'react';
import { Carousel, Image, Spin } from 'antd';
import { callFetchListSlider } from "../../services/api.js";
import './slider.css'; // Nhập file CSS để áp dụng các kiểu

const SliderHome = () => {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSliders = async () => {
            setLoading(true);
            try {
                const res = await callFetchListSlider("page=1&size=5"); // Lấy 5 slider đầu tiên
                if (res && res.data) {
                    setSliders(res.data.result);
                }
            } catch (error) {
                console.error("Error fetching sliders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSliders();
    }, []);

    if (loading) {
        return <Spin size="small" />;
    }

    return (
        <div className="slider-container"> {/* Thêm div để kiểm soát kích thước */}
            <Carousel autoplay autoplaySpeed={1000} dots>
                {sliders.map(slider => (
                    <div key={slider.id}>
                        <Image
                            width="100%"
                            height="100%" // Đặt chiều cao là 100%
                            src={`${import.meta.env.VITE_BACKEND_URL}/storage/slider/${slider.imgUrl}`}
                            alt={slider.title}
                            style={{ objectFit: 'cover', height: '20rem' }} // Đặt chiều cao cụ thể cho ảnh
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default SliderHome;
