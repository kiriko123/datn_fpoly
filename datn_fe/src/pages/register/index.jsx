import React from 'react';
import {Button, Checkbox, Divider, Form, Input, message, notification} from 'antd';
import {useNavigate} from "react-router-dom";
import {callRegister} from "../../services/api.js";
import "./RegisterForm.scss"

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = React.useState(false);

    const onFinish = async (values) => {
        console.log('Success:', values);
        const {name, email, password, confirmPassword} = values;
        setIsSubmit(true);

        const res = await callRegister({name, email, password, confirmPassword});
        setIsSubmit(false);

        if (res?.data) {
            message.success('Registration successful!');
            navigate("/login");
        } else {
            notification.error({
                message: 'An error occurred!',
                description: res.message && Array.isArray(res.message) ? res.message[0] : res.message,
                duration: 1,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="register-container">
            <div className="register-page">
                <h3 className="register-title">Register</h3>
                <Divider/>
                <Form
                    name="basic"
                    labelCol={{span: 24}}
                    wrapperCol={{span: 24}}
                    className="register-form"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Fullname"
                        name="name"
                        rules={[{required: true, message: 'Please input your fullname!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label="Email"
                        name="email"
                        rules={[{required: true, type: 'email', message: 'Please input your email!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        labelCol={{span: 24}}
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        labelCol={{span: 24}}
                        label="Confirm password"
                        name="confirmPassword"
                        rules={[{required: true, message: 'Please input confirm password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{span: 24}}
                    >
                        <Button type="primary" htmlType="submit" loading={isSubmit}>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <div className="login-link">
                    <p>Already have a account? <a onClick={() => navigate('/login')}> Login</a></p>

                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
