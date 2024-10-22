import React from "react";
import { Image, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import BrandList from "../../components/Home/BrandList";
import AboutSlider from "./slider.jsx";

const About = () => {
    const { t } = useTranslation();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="mt-10">
            <div className="max-w-6xl mx-auto px-4">
                {/* Image Slider */}
                <AboutSlider />

                {/* About Section */}
                <div className="mt-16 text-left">
                    <h2 className="text-3xl font-semibold mb-8">{t("about_title")}</h2>
                    <div className="text-gray-700 space-y-4">
                        <p>{t("about_content_1")}</p>
                        <p>{t("about_content_2")}</p>
                        <p>{t("about_content_3")}</p>
                        <p>{t("about_content_4")}</p>
                    </div>
                </div>

                {/* Why Choose Us Section */}
                <div className="mt-16">
                    <h2 className="text-3xl font-semibold mb-8">{t("why_choose_us")}</h2>
                    <Row gutter={[24, 24]}>
                        {[
                            {
                                img: "gaming-razer-deathadder-v2.jpg",
                                title: t("high_quality_products"),
                                description: t("high_quality_description"),
                            },
                            {
                                img: "dichvu1.jpg",
                                title: t("excellent_service"),
                                description: t("excellent_service_description"),
                            },
                            {
                                img: "giaohang2.jpg",
                                title: t("fast_safe_delivery"),
                                description: t("fast_safe_delivery_description"),
                            },
                        ].map((item, index) => (
                            <Col xs={24} md={8} key={index}>
                                <div className="relative">
                                    <Image
                                        src={`${backendUrl}/storage/product/${item.img}`}
                                        alt={item.title}
                                        className="rounded-lg"
                                        preview={false}
                                        style={{ width: "100%" }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4">
                                        <h3 className="font-semibold text-lg">{item.title}</h3>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-700">{item.description}</p>
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Warranty Policy */}
                <div className="mt-16">
                    <h2 className="text-3xl font-semibold mb-8">{t("warranty_policy")}</h2>
                    <p className="text-gray-700">{t("warranty_description")}</p>
                    <ul className="list-disc ml-6 text-gray-700 mt-4 space-y-2">
                        {t("warranty_terms", { returnObjects: true }).map((term, index) => (
                            <li key={index}>{term}</li>
                        ))}
                    </ul>
                </div>

                {/* Our Partners */}
                <div className="mt-16">
                    <h2 className="text-3xl font-semibold mb-8">{t("our_partners")}</h2>
                    <BrandList />
                </div>
            </div>
        </div>
    );
};

export default About;
