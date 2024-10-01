import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper';

import './slider.css';
import { callGetSliders, callUploadFile } from '../../services/api';

function Slider() {
    const [sliders, setSliders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSliders();
    }, []);

    const fetchSliders = async () => {
        try {
            const response = await callGetSliders();
            console.log('Slider data:', response.data);
            setSliders(response.data || []);
        } catch (error) {
            console.error('Error fetching sliders:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="heading"></h1>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={1}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="swiper_container"
            >
                {loading ? (
                    <p>Loading sliders...</p>
                ) : (
                    sliders.length > 0 ? (
                        sliders.map((slider) => (
                            <SwiperSlide key={slider.id}>
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_URL}/storage/avatar/${slider.imgUrl}` || 'defaultImage.jpg'}
                                    alt={slider.title}
                                    style={{
                                        width: '100%',
                                        height: '400px',
                                        objectFit: 'cover',
                                    }}
                                />
                            </SwiperSlide>

                        ))
                    ) : (
                        <p>No sliders available.</p>
                    )
                )}

                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </Swiper>
        </div>
    );
}

export default Slider;