import React from 'react';
import { Image, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import BrandList from '../../components/Home/BrandList';

const About = () => {
    const { t } = useTranslation();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="about-page">
            <div className="max-w-6xl mx-auto px-4">
                <div className="w-full">
                    <Image
                        src={`${backendUrl}/storage/slider/banner.jpg`}
                        alt={t('about_title')}
                        width="100%"
                        preview={false}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }}
                    />
                </div>
                <div className="mt-16 text-left">
                    <h2 className="text-3xl mb-8">{t('about_title')}</h2>
                </div>
                <div className="about-content text-left">
                    <p className="mb-4">{t('about_content_1')}</p>
                    <p className="mb-4">{t('about_content_2')}</p>
                    <p className="mb-4">{t('about_content_3')}</p>
                    <p className="mb-4">{t('about_content_4')}</p>
                </div>

                <div className="mt-16 text-left">
                    <h2 className="text-3xl mb-8">{t('why_choose_us')}</h2>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={8}>
                            <div className="relative">
                                <Image
                                    src={`${backendUrl}/storage/product/gaming-razer-deathadder-v2.jpg`}
                                    alt={t('high_quality_products')}
                                    width="100%"
                                    preview={false}
                                    className="rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4">
                                    <h3>{t('high_quality_products')}</h3>
                                </div>
                            </div>
                            <p className="mt-4">{t('high_quality_description')}</p>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="relative">
                                <Image
                                    src={`${backendUrl}/storage/slider/dichvu1.jpg`}
                                    alt={t('excellent_service')}
                                    width="100%"
                                    preview={false}
                                    className="rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4">
                                    <h3>{t('excellent_service')}</h3>
                                </div>
                            </div>
                            <p className="mt-4">{t('excellent_service_description')}</p>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="relative">
                                <Image
                                    src={`${backendUrl}/storage/slider/giaohang2.jpg`}
                                    alt={t('fast_safe_delivery')}
                                    width="100%"
                                    preview={false}
                                    className="rounded-lg"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4">
                                    <h3>{t('fast_safe_delivery')}</h3>
                                </div>
                            </div>
                            <p className="mt-4">{t('fast_safe_delivery_description')}</p>
                        </Col>
                    </Row>
                </div>

                <div className="mt-16 text-left">
                    <h2 className="text-3xl mb-8">{t('warranty_policy')}</h2>
                    <p>{t('warranty_description')}</p>
                    <ul className="list-disc ml-6">
                        {t('warranty_terms', { returnObjects: true }).map((term, index) => (
                            <li key={index} className="mb-2">{term}</li>
                        ))}
                    </ul>
                </div>

                <div className="mt-16 text-left">
                    <h2 className="text-3xl mb-8">{t('our_partners')}</h2>
                    <BrandList />
                </div>
            </div>
        </div>
    );
};

export default About;
