// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { Divider, Form, Input, message, Modal, notification, Radio} from 'antd';
import {callCreateCategory} from '../../../services/api';

const CategoryCreate = (props) => {
    // eslint-disable-next-line react/prop-types
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {name, thumbnail, description, hot} = values;
        setIsSubmit(true);
        const res =
            await callCreateCategory({name, thumbnail, description, hot});
        if (res && res.data) {
            message.success('Created successfully');
            form.resetFields();
            setOpenModalCreate(false);
            // eslint-disable-next-line react/prop-types
            await props.fetchCategory();
        } else {
            notification.error({
                message: 'Đã có lỗi xảy ra',
                description: res.message
            })
        }
        setIsSubmit(false);

    };

    return (
        <>

            <Modal
                title="Thêm mới danh mục"
                open={openModalCreate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
                centered
            >
                <Divider/>

                <Form
                    form={form} //quy dinh Form la form khi submit cai model se submit form luon
                    name="basic"
                    style={{maxWidth: 600}}

                    onFinish={onFinish}
                    autoComplete="off"
                >
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

export default CategoryCreate;
