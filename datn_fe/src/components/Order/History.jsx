import {Badge, Descriptions, Divider, Space, Table, Tag, Drawer, Image} from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { callOrderHistory } from "../../services/api";
import { useSelector } from "react-redux";
import {EditTwoTone, EyeOutlined} from '@ant-design/icons';
import CategoryUpdate from "../Admin/category/CategoryUpdate.jsx";
import UserOrderUpdate from "./UserOrderUpdate.jsx";

const History = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const user = useSelector(state => state.account.user);

    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    useEffect(() => {

        fetchHistory();
    }, [user.id]);
    const fetchHistory = async () => {
        const res = await callOrderHistory(user.id);
        if (res && res.data) {
            console.log(res.data);
            setOrderHistory(res.data);
        }
    }
    const showDrawer = (record) => {
        setSelectedOrder(record);
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
        setSelectedOrder(null);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (item, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            render: (item) => {
                return moment(item).format('DD-MM-YYYY hh:mm:ss');
            }
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            render: (item) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item);
            }
        },
        {
            title: 'Người nhận',
            dataIndex: 'receiverName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'receiverAddress',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            // render: () => (
            //     <Tag color={"green"}>
            //
            //     </Tag>
            // )
        },
        {
            title: 'Payment method',
            dataIndex: 'paymentMethod',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },

        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                    <EyeOutlined onClick={() => showDrawer(record)} style={{ cursor: 'pointer' }} />
                    <EditTwoTone
                        twoToneColor="#f57800" style={{cursor: "pointer"}}
                        onClick={() => {
                            setDataUpdate(record);
                            setOpenModalUpdate(true);
                        }}
                    />
                </div>


            ),
        },
    ];

    return (
        <div className='mb-40 mx-10'>
            <div className="my-6 text-2xl font-bold text-gray-800">Lịch sử đặt hàng</div>
            <Table
                columns={columns}
                dataSource={orderHistory}
                pagination={false}
                rowKey="id"
                scroll={{ x: 800 }} // Enables horizontal scrolling
            />

            <Drawer
                title="Chi tiết đơn hàng"
                placement="right"
                width={'70%'} // 70% width for responsive drawer
                onClose={closeDrawer}
                visible={openDrawer}
            >
                {selectedOrder && (
                    <Descriptions bordered>
                        {selectedOrder.orderDetails.map((item, index) => {
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

            <UserOrderUpdate
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                fetchCategory={fetchHistory}
            />
        </div>
    );
}

export default History;
