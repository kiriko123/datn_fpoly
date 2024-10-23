import {Avatar, Badge, Descriptions, Drawer, Modal, Grid, Image} from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import moment from "moment/moment.js";
const { useBreakpoint } = Grid;

const OrderViewDetail = (props) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;

    // Ant Design's responsive grid system
    const screens = useBreakpoint();

    // Đóng Drawer và xóa dữ liệu
    const onClose = () => {
        setOpenViewDetail(false);
        setDataViewDetail(null);
    }

    return (
        <>
            <Drawer
                title="Chi tiết đơn hàng"
                placement="right"
                width={'70%'} // 70% width for responsive drawer
                onClose={onClose}
                visible={openViewDetail}
            >
                {dataViewDetail  && (
                    <Descriptions bordered>
                        {dataViewDetail .orderDetails.map((item, index) => {
                            // Calculate price after discount
                            const priceAfterDiscount = item.price - (item.price * item.discount / 100);

                            return (
                                <Descriptions.Item key={index} label={`${index + 1} - Name: ${item.productName}`} span={3}>
                                    <div>
                                        <Image
                                            src={`${import.meta.env.VITE_BACKEND_URL}/storage/product/${item.thumbnail}`}
                                            alt={item.productName}
                                            width={50}
                                        />
                                        <div>
                                            Số lượng: {item.quantity},
                                            Giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)},
                                            Discount: {item.discount} %,
                                            Giá sau giảm: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(priceAfterDiscount)}
                                        </div>
                                    </div>
                                </Descriptions.Item>
                            );
                        })}
                    </Descriptions>
                )}
            </Drawer>
        </>
    );
}


export default OrderViewDetail;
