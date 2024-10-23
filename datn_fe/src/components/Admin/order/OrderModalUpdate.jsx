import React, { useEffect, useState } from 'react';
import {Button, Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Radio} from 'antd';
import {callAdminUpdateOrder, callFetchOrder, callUserUpdateOrder} from '../../../services/api';

const OrderModalUpdate = (props) => {
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate, fetchOrder } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const { newStatus, description, receiverAddress } = values;
        setIsSubmit(true);

        const res = await callAdminUpdateOrder({
            id: dataUpdate.id,
            address: receiverAddress,
            currentStatus: dataUpdate.status,
            newStatus,
            description
        });

        if (res && res.data) {
            message.success('Cập nhật thành công');
            setOpenModalUpdate(false);
            await fetchOrder(); // Cập nhật lại danh sách đơn hàng
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            });
        }
        setIsSubmit(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            currentStatus: dataUpdate?.status, // Đặt giá trị mặc định là trạng thái hiện tại
            newStatus: dataUpdate?.status,
            description: dataUpdate?.description,
            receiverAddress: dataUpdate?.receiverAddress // Địa chỉ
        });
    }, [dataUpdate])

    return (
        <Modal
            title="Cập nhật đơn hàng"
            open={openModalUpdate}
            onOk={() => { form.submit() }} // Gọi onFinish khi người dùng click "Ok"
            onCancel={() => {
                setOpenModalUpdate(false);
                setDataUpdate(null);
            }}
            okText={"Cập nhật"}
            cancelText={"Hủy"}
            confirmLoading={isSubmit}
            centered
        >
            <Divider />

            <Form
                form={form}
                name="basic"
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                {/* Hiển thị trạng thái hiện tại, không cho phép người dùng chỉnh sửa */}
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Trạng thái hiện tại"
                    name="currentStatus"
                >
                    <Radio.Group disabled>
                        <Radio value="PENDING">PENDING</Radio>
                        <Radio value="PROCESSING">PROCESSING</Radio>
                        <Radio value="SHIPPING">SHIPPING</Radio>
                        <Radio value="DELIVERED">DELIVERED</Radio>
                        <Radio value="CANCELLED">CANCELLED</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Trạng thái mới"
                    name="newStatus"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái mới!' }]}

                >
                    <Radio.Group >
                        <Radio value="PENDING">PENDING</Radio>
                        <Radio value="PROCESSING">PROCESSING</Radio>
                        <Radio value="SHIPPING">SHIPPING</Radio>
                        <Radio value="DELIVERED">DELIVERED</Radio>
                        <Radio value="CANCELLED">CANCELLED</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Địa chỉ nhận hàng"
                    name="receiverAddress"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng!' }]}
                >
                    <Input />
                </Form.Item>

                {/* Mô tả */}
                <Form.Item
                    labelCol={{ span: 24 }}
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

//     return (
//         <>
//             <Modal
//                 title="Cập nhật người dùng"
//                 open={openModalUpdate}
//                 onOk={() => { form.submit() }}
//                 onCancel={() => {
//                     setOpenModalUpdate(false);
//                     setDataUpdate(null);
//                 }}
//                 okText={"Cập nhật"}
//                 cancelText={"Hủy"}
//                 confirmLoading={isSubmit}
//             >
//                 <Divider />
//
//                 <Form
//                     form={form}
//                     name="basic"
//                     style={{ maxWidth: 600 }}
//                     onFinish={onFinish}
//                     autoComplete="off"
//                     // initialValues={dataUpdate}
//                 >
//                     <Form.Item hidden labelCol={{ span: 24 }} label="Id" name="id"  rules={[{ required: true, message: 'Vui lòng nhập id!' }]}>
//                         <Input />
//                     </Form.Item>
//                     <Form.Item labelCol={{ span: 24 }} label="Email" name="email"  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
//                         <Input disabled/>
//                     </Form.Item>
//
//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item label="Firstname" name="firstName"  rules={[{ required: true, message: 'Vui lòng nhập firstname!' }]}>
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item label="Lastname" name="name" rules={[{ required: true, message: 'Vui lòng nhập lastname!' }]}>
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//
//                     <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Address không được để trống!' }]}>
//                         <Input />
//                     </Form.Item>
//
//                     <Row gutter={16}>
//                         <Col span={12}>
//                             <Form.Item label="Phone number" name="phoneNumber" rules={[{ required: true, message: 'Phone number không được để trống!' }]}>
//                                 <Input />
//                             </Form.Item>
//                         </Col>
//                         <Col span={12}>
//                             <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please enter your age!' }]}>
//                                 <InputNumber min={0} max={120} style={{ width: '100%' }} />
//                             </Form.Item>
//                         </Col>
//                     </Row>
//
//                     <Form.Item
//                         label="Gender"
//                         name="gender"
//                         initialValue={'MALE'}
//                         rules={[{ required: true, message: 'Please select your gender!' }]}
//                     >
//                         <Radio.Group>
//                             <Radio value="MALE">Male</Radio>
//                             <Radio value="FEMALE">Female</Radio>
//                             <Radio value="OTHER">Other</Radio>
//                         </Radio.Group>
//                     </Form.Item>
//                 </Form>
//             </Modal>
//         </>
//     );
// };

export default OrderModalUpdate;

