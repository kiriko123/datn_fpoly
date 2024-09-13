import React, {useState} from 'react';
import {Button, Divider, Form, Input, message, Modal, notification} from 'antd';
import {callCreateUser} from '../../../services/api';

const UserModalCreate = (props) => {
    const {openModalCreate, setOpenModalCreate} = props;
    const [isSubmit, setIsSubmit] = useState(false);

    // https://ant.design/components/form#components-form-demo-control-hooks
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        const {name, email, password} = values;
        setIsSubmit(true);
        const res = await callCreateUser({name, email, password});
        if (res && res.data) {
            message.success('Created successfully');
            form.resetFields();
            setOpenModalCreate(false);
            await props.fetchUser();
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
                title="Thêm mới người dùng"
                open={openModalCreate}
                onOk={() => {
                    form.submit()
                }}
                onCancel={() => setOpenModalCreate(false)}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}
            >
                <Divider/>

                <Form
                    form={form} //quy dinh Form la form khi submit cai model se submit form luon
                    name="basic"
                    style={{maxWidth: 600}}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Name"
                        name="name"
                        rules={[{required: true, message: 'Vui lòng nhập tên hiển thị!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Vui lòng nhập email!'}]}
                    >
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserModalCreate;
