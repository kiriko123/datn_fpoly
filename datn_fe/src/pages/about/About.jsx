import React from 'react';
import { Image, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import './About.css'; // Import CSS file
import BrandList from '../../components/Home/BrandList';

const About = () => {
    const { t } = useTranslation(); // Use translation hook
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className="about-page"> {/* Thay đổi class bao bọc */}
            <div className="about-container">
                <div className="image-container">
                    <Image
                        src={`${backendUrl}/storage/slider/banner.jpg`}
                        alt={t('about_title')}
                        width="100%"
                        preview={false}
                        onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url.jpg'; }}
                    />
                </div>
                <div style={{ marginTop: '60px', textAlign: 'left' }}>
                    <h2 style={{ fontSize: '30px', marginBottom: '30px' }}>{t('about_title')}</h2>
                </div>
                <div className="about-content">
                    <p>{t('about_content_1')}</p>
                    <p>{t('about_content_2')}</p>
                    <p>{t('about_content_3')}</p>
                    <p>{t('about_content_4')}</p>
                </div>
    
                <div style={{ marginTop: '60px', textAlign: 'left' }}>
                    <h2 style={{ fontSize: '30px', marginBottom: '30px' }}>{t('why_choose_us')}</h2>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} md={8}>
                            <div className="image-wrapper">
                                <Image
                                    src={`${backendUrl}/storage/product/gaming-razer-deathadder-v2.jpg`}
                                    alt={t('high_quality_products')}
                                    width="100%"
                                    preview={false}
                                    style={{ borderRadius: '8px' }}
                                />
                                <div className="overlay">
                                    <h3>{t('high_quality_products')}</h3>
                                </div>
                            </div>
                            <p>{t('high_quality_description')}</p>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="image-wrapper">
                                <Image
                                    src={`${backendUrl}/storage/slider/dichvu1.jpg`}
                                    alt={t('excellent_service')}
                                    width="100%"
                                    preview={false}
                                    style={{ borderRadius: '8px' }}
                                />
                                <div className="overlay">
                                    <h3>{t('excellent_service')}</h3>
                                </div>
                            </div>
                            <p>{t('excellent_service_description')}</p>
                        </Col>
                        <Col xs={24} md={8}>
                            <div className="image-wrapper">
                                <Image
                                    src={`${backendUrl}/storage/slider/giaohang2.jpg`}
                                    alt={t('fast_safe_delivery')}
                                    width="100%"
                                    preview={false}
                                    style={{ borderRadius: '8px' }}
                                />
                                <div className="overlay">
                                    <h3>{t('fast_safe_delivery')}</h3>
                                </div>
                            </div>
                            <p>{t('fast_safe_delivery_description')}</p>
                        </Col>
                    </Row>
                </div>
    
                <div style={{ marginTop: '60px', textAlign: 'left' }}>
                    <h2 className="section-title">{t('warranty_policy')}</h2>
                    <p>{t('warranty_description')}</p>
                    <ul>
                        {t('warranty_terms', { returnObjects: true }).map((term, index) => (
                            <li key={index}>{term}</li>
                        ))}
                    </ul>
                </div>
                <br />
                <h2 className="section-title">{t('our_partners')}</h2>
                <BrandList />
            </div>
        </div>
    );
    
};

export default About;
