import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import {callChangePassword} from "../../services/api.js";

const ChangePassword = (props) => {
    const [form] = Form.useForm();
    const [isSubmit, setIsSubmit] = useState(false);
    const user = useSelector(state => state.account.user);

    const onFinish = async (values) => {
        const { email, password, newPassword, confirmPassword } = values;
        console.log(values);
        setIsSubmit(true);
        const res =
            await callChangePassword({email, password, newPassword, confirmPassword});

        console.log(res);
        if(res && res.data?.statusCode === 201) {
            message.success('Change password successfully');
            form.resetFields();
        }else {
            notification.error({
                message: "Đã có lỗi xảy ra",
                description: res.message
            })
        }

        setIsSubmit(false);
    }

    return (
        <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Row>
                {/*<Col span={1}></Col>*/}
                <Col span={24}>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                    >
                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Email"
                            name="email"
                            initialValue={user?.email}
                            rules={[{ required: true, message: 'Email không được để trống!' }]}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Mật khẩu hiện tại"
                            name="password"
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Mật khẩu mới"
                            name="newPassword"
                            rules={[{ required: true, message: 'Mật khẩu không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            labelCol={{ span: 24 }} //whole column
                            label="Nhập lại mật khẩu mới"
                            name="confirmPassword"
                            rules={[{ required: true, message: 'Nhập lại mật khẩu không được để trống!' }]}
                        >
                            <Input.Password />
                        </Form.Item>




                        <Form.Item
                            // wrapperCol={{ offset: 6, span: 16 }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmit}
                            >
                                Xác nhận
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default ChangePassword;