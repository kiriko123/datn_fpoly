import { Col, Divider, InputNumber, Row } from 'antd';
import './order.scss';
import { DeleteOutlined } from '@ant-design/icons';

const ViewOrder = (props) => {
    return (
        <div style={{ background: '#efefef', padding: "20px 0" }}>
            <div className="order-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row gutter={[20, 20]}>
                    <Col md={18} xs={24}>
                        <div className='order-book'>
                            <div className='book-content'>
                                <img src="https://picsum.photos/id/1015/250/150/" />
                                <div className='title'>
                                    How The Body Works - Hiểu Hết Về Cơ Thể
                                </div>
                                <div className='price'>
                                    256.500 ₫
                                </div>
                            </div>
                            <div className='action'>
                                <div className='quantity'>
                                    <InputNumber value={2} />
                                </div>
                                <div className='sum'>
                                    Tổng: 513.000 ₫
                                </div>
                                <DeleteOutlined />
                            </div>
                        </div>

                        <div className='order-book'>
                            <div className='book-content'>
                                <img src="https://picsum.photos/id/1015/250/150/" />
                                <div className='title'>
                                    How The Body Works - Hiểu Hết Về Cơ Thể
                                </div>
                                <div className='price'>
                                    256.500 ₫
                                </div>
                            </div>
                            <div className='action'>
                                <div className='quantity'>
                                    <InputNumber value={2} />
                                </div>
                                <div className='sum'>
                                    Tổng: 513.000 ₫
                                </div>
                                <DeleteOutlined />
                            </div>
                        </div>
                    </Col>
                    <Col md={6} xs={24} >
                        <div className='order-sum'>
                            <div className='calculate'>
                                <span>  Tạm tính</span>
                                <span> 1.055.400đ</span>
                            </div>
                            <Divider style={{ margin: "10px 0" }} />
                            <div className='calculate'>
                                <span> Tổng tiền</span>
                                <span className='sum-final'>  1.055.400 ₫</span>
                            </div>
                            <Divider style={{ margin: "10px 0" }} />
                            <button>Mua Hàng (2)</button>
                        </div>
                    </Col>
                </Row>
            </div>
            <div style={{ height: "250px" }}>

            </div>
        </div>
    )
}

export default ViewOrder;