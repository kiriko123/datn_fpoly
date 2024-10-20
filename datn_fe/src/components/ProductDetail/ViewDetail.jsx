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

const ViewDetail = (props) => {
    const { dataProduct } = props;
    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const refGallery = useRef(null);
    const images = dataProduct?.items ?? [];

    const dispatch = useDispatch();

    const [currentQuantity, setCurrentQuantity] = useState(1);

    const handleOnClickImage = () => {
        //get current index onClick
        // alert(refGallery?.current?.getCurrentIndex());
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
        // refGallery?.current?.fullScreen()
    }

    const handleChangeButton = (type) => {
        if (type === "MINUS") {
            if (currentQuantity - 1 <= 0) return;
            setCurrentQuantity(currentQuantity - 1)
        }
        if (type === "PLUS") {
            if (currentQuantity === +dataProduct.quantity) return;
            setCurrentQuantity(currentQuantity + 1);
        }
    }

    const handleChangeInput = (value) => {
        if (!isNaN(value)) {
            if (+value > 0 && +value < +dataProduct.quantity) {
                setCurrentQuantity(+value);
            }
        }
    }

    const handleAddToCart = (quantity, book) => {
        dispatch(doAddBookAction({ quantity, detail: book, _id: book.id }));
    }

    return (
        <div style={{ background: '#dde8f8', padding: "20px 0" }}>
            <div className='view-detail-book' style={{ maxWidth: 1440, margin: '0 auto', minHeight: "calc(100vh - 150px)" }}>
                <div style={{ padding: "20px", background: '#fff', borderRadius: 5 }}>
                    {dataProduct && dataProduct.id ?
                        <Row gutter={[20, 20]}>
                            <Col md={10} sm={0} xs={0}>
                                <ImageGallery
                                    ref={refGallery}
                                    items={images}
                                    showPlayButton={false} //hide play button
                                    showFullscreenButton={false} //hide fullscreen button
                                    renderLeftNav={() => <></>} //left arrow === <> </>
                                    renderRightNav={() => <></>}//right arrow === <> </>
                                    slideOnThumbnailOver={true}  //onHover => auto scroll images
                                    onClick={() => handleOnClickImage()}
                                />
                            </Col>
                            <Col md={14} sm={24}>
                                <Col md={0} sm={24} xs={24}>
                                    <ImageGallery
                                        ref={refGallery}
                                        items={images}
                                        showPlayButton={false} //hide play button
                                        showFullscreenButton={false} //hide fullscreen button
                                        renderLeftNav={() => <></>} //left arrow === <> </>
                                        renderRightNav={() => <></>}//right arrow === <> </>
                                        showThumbnails={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className=''>Category: <a href='#'>{dataProduct?.category?.name}</a></div>


                                    <div className=''>Brand: <a href='#'>{dataProduct?.brand?.name}</a></div>

                                    <div className='title'>{dataProduct?.name}</div>
                                    <div className='rating'>
                                        <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 12 }} />
                                        <span className='sold'>
                                            <Divider type="vertical" />
                                            Đã bán {dataProduct.sold}</span>
                                    </div>
                                    <div className='price' style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        {dataProduct?.discount > 0 ? (
                                            <>
                                                <span style={{
                                                    textDecoration: 'line-through',
                                                    marginRight: '8px',
                                                    color: '#a9a9a9',
                                                }}>
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(dataProduct?.price ?? 0)}
                                                </span>

                                                {/* Giá đã giảm */}
                                                <span className='currency' style={{
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    marginRight: '8px'
                                                }}>
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(dataProduct.price * (1 - dataProduct.discount / 100))}
                                                </span>

                                                {/* Phần trăm giảm giá */}
                                                <span style={{
                                                    color: 'red',
                                                    fontWeight: '500',
                                                    backgroundColor: '#ffecec',
                                                    padding: '2px 6px',
                                                    borderRadius: '5px'
                                                }}>
                                                    -{dataProduct.discount}%
                                                </span>
                                            </>
                                        ) : (
                                            <span className='currency' style={{
                                                fontWeight: 'bold',
                                                color: '#333'
                                            }}>
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
                                            <button
                                                onClick={() => handleChangeButton('MINUS')}><MinusOutlined /></button>
                                            <input onChange={(even) => handleChangeInput(even.target.value)}
                                                value={currentQuantity} />
                                            <button onClick={() => handleChangeButton('PLUS')}><PlusOutlined /></button>
                                        </span>
                                    </div>
                                    <div className='buy'>
                                        <button className='cart'
                                            onClick={() => handleAddToCart(currentQuantity, dataProduct)}>
                                            <BsCartPlus className='icon-cart' />
                                            <span>Thêm vào giỏ hàng</span>
                                        </button>
                                        <button className='now'>Mua ngay</button>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                        :
                        <BookLoader />
                    }
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
    )
}

export default ViewDetail;
