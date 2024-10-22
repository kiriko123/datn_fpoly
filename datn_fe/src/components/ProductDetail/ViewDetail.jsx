import { Row, Col, Rate, Divider, Button } from 'antd';
import './book.scss';
import ImageGallery from 'react-image-gallery';
import { useRef, useState } from 'react';
import ModalGallery from './ModalGallery';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { BsCartPlus } from 'react-icons/bs';
import BookLoader from './BookLoader';
import { useDispatch } from "react-redux";
import { doAddBookAction } from "../../redux/order/orderSlice.js";

const ViewDetail = ({ dataProduct }) => {
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentQuantity, setCurrentQuantity] = useState(1);

    const refGallery = useRef(null);
    const images = dataProduct?.items ?? [];
    const dispatch = useDispatch();

    const handleOnClickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    };

    const handleChangeButton = (type) => {
        if (type === "MINUS" && currentQuantity > 1) {
            setCurrentQuantity(currentQuantity - 1);
        } else if (type === "PLUS" && currentQuantity < +dataProduct.quantity) {
            setCurrentQuantity(currentQuantity + 1);
        }
    };

    const handleChangeInput = (value) => {
        if (!isNaN(value) && +value > 0 && +value <= +dataProduct.quantity) {
            setCurrentQuantity(+value);
        }
    };

    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book.id }));
    };

    return (
        <div style={{ background: '#dde8f8', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataProduct?.id ? (
                        <Row gutter={[20, 20]}>
                            <Col md={10} sm={0} xs={0}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false}
                                    showFullscreenButton={false}
                                    renderLeftNav={() => <></>}
                                    renderRightNav={() => <></>}
                                    slideOnThumbnailOver={true}
                                    onClick={handleOnClickImage}
                                />
                            </Col>
                            <Col md={14} sm={24}>
                                <Col md={0} sm={24} xs={24}>
                                    <ImageGallery
                                        ref={refGallery}
                                        items={images}
                                        showPlayButton={false}
                                        showFullscreenButton={false}
                                        renderLeftNav={() => <></>}
                                        renderRightNav={() => <></>}
                                        showThumbnails={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div>Category: <a href='#'>{dataProduct?.category?.name}</a></div>
                                    <div>Brand: <a href='#'>{dataProduct?.brand?.name}</a></div>
                                    <div className='text-3xl'>{dataProduct?.name}</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{color: '#ffce3d', fontSize: 12}}/>
                                        <span className='sold'>
                                            <Divider type="vertical"/> Đã bán {dataProduct.sold}
                                        </span>
                                        <span className='sold'>
                                            <Divider type="vertical"/> Còn {dataProduct.quantity}
                                        </span>
                                    </div>
                                    <div className='price' style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                        {dataProduct?.discount > 0 ? (
                                            <>
                                                <span style={{ textDecoration: 'line-through', color: '#a9a9a9' }}>
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(dataProduct?.price ?? 0)}
                                                </span>
                                                <span className='currency' style={{ fontWeight: 'bold', color: '#333' }}>
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(dataProduct.price * (1 - dataProduct.discount / 100))}
                                                </span>
                                                <span style={{ color: 'red', fontWeight: '500', backgroundColor: '#ffecec', padding: '2px 6px', borderRadius: '5px' }}>
                                                    -{dataProduct.discount}%
                                                </span>
                                            </>
                                        ) : (
                                            <span className='currency' style={{ fontWeight: 'bold', color: '#333' }}>
                                                {new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                }).format(dataProduct?.price ?? 0)}
                                            </span>
                                        )}
                                    </div>
                                    <div className='delivery'>
                                        <span className='left-side'>Description</span>
                                        <span className='right-side'>{dataProduct.description}</span>
                                    </div>
                                    <div className='delivery'>
                                        <div>
                                            <span className='left-side'>Vận chuyển</span>
                                            <span className='right-side'>Miễn phí vận chuyển</span>
                                        </div>
                                    </div>
                                    <div className='quantity'>
                                        <span className='left-side'>Số lượng</span>
                                        <span className='right-side'>
                                            <button onClick={() => handleChangeButton('MINUS')}><MinusOutlined /></button>
                                            <input onChange={(e) => handleChangeInput(e.target.value)} value={currentQuantity} />
                                            <button onClick={() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button className='cart' onClick={() => handleAddToCart(currentQuantity, dataProduct)}>
                                            <BsCartPlus className='icon-cart' />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    ) : <BookLoader />}
                </div>
            </div>
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={dataProduct?.name}
            />
        </div>
    );
};

export default ViewDetail;
