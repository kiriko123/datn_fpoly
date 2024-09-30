// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {Col, Divider, Form, Input,  message, Modal, notification, Row, Radio} from 'antd';
import { callUpdateCategory } from '../../../services/api';

const CategoryUpdate = (props) => {
    // eslint-disable-next-line react/prop-types
    const { openModalUpdate, setOpenModalUpdate, dataUpdate, setDataUpdate } = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {id, name, thumbnail, description, hot} = values;
        setIsSubmit(true)
        const res =
            await callUpdateCategory({id, name, thumbnail, description, hot});
        if (res && res.data) {
            message.success('Cập nhật user thành công');
            setOpenModalUpdate(false);
            // eslint-disable-next-line react/prop-types
            await props.fetchCategory()
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false)
    };

    useEffect(() => {
        form.setFieldsValue(dataUpdate)
    }, [dataUpdate])

    return (
        <>

            <Modal
                title="Cập nhật category"
                open={openModalUpdate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalUpdate(false);
                    setDataUpdate(null);
                }}
                okText={"Cập nhật"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider />

                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    // initialValues={dataUpdate}
                >
                    <Form.Item hidden labelCol={{ span: 24 }} label="Id" name="id"  rules={[{ required: true, message: 'Vui lòng nhập id!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item labelCol={{ span: 24 }} label="Email" name="email"  rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                        <Input disabled/>
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Firstname" name="firstName"  rules={[{ required: true, message: 'Vui lòng nhập firstname!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Lastname" name="name" rules={[{ required: true, message: 'Vui lòng nhập lastname!' }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/*<Row gutter={16}>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>*/}
                    {/*            <Input.Password />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <Form.Item label="Password confirm" name="passwordConfirm" rules={[{ required: true, message: 'Vui lòng nhập password confirm!' }]}>*/}
                    {/*            <Input.Password />*/}
                    {/*        </Form.Item>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Form.Item  label="Id" name="id" rules={[{ required: true, message: 'Vui lòng nhập ID!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item  label="Name" name="name" rules={[{ required: true, message: 'Vui lòng nhập name!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Thumbnail" name="thumbnail" rules={[{ required: true, message: 'Thumbnail không được để trống!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Hot"
                        name="hot"
                        initialValue={'HOT'}
                        rules={[{ required: true, message: 'Please select hot(Y/N)!' }]}
                    >
                        <Radio.Group>
                            <Radio value="HOT">Male</Radio>
                            <Radio value="NOHOT">Female</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CategoryUpdate;
