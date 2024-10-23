import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AboutSlider = () => {
    const [images, setImages] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(
                    "https://api.unsplash.com/search/photos",
                    {
                        params: {
                            query: "laptop",
                            client_id: "0sRx_iHuuBVk40GaLS1PkOCcoFxrXGDbQRtKh0MhDe0",
                        },
                    }
                );
                setImages(response.data.results);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, []);

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section className="relative">
            <div className="relative overflow-hidden bg-fixed">
                <div className="w-full h-[500px] relative">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`absolute inset-0 transition-opacity duration-700 ${
                                index === activeIndex ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <img
                                src={image.urls.full}
                                alt={image.alt_description || `Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Controls */}
                <div className="absolute top-0 left-0 z-10 flex justify-between w-full h-full">
                    <button
                        className="flex items-center justify-center w-12 h-12 bg-black bg-opacity-50 text-white"
                        onClick={handlePrevClick}
                    >
                        ❮
                    </button>
                    <button
                        className="flex items-center justify-center w-12 h-12 bg-black bg-opacity-50 text-white"
                        onClick={handleNextClick}
                    >
                        ❯
                    </button>
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                                index === activeIndex ? "bg-white" : "bg-gray-400"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSlider;
