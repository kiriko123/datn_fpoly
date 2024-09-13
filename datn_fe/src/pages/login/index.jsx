import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, message, notification } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callLogin } from "../../services/api.js";
import { doLoginAction } from "../../redux/account/accountSlice.js";
import './LoginPage.scss';

const LoginPage = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log('Success:', values);
        const { username, password } = values;
        setLoading(true);

        const res = await callLogin({ username, password });
        console.log(res);
        setLoading(false);

        if (res?.data?.user) {
            localStorage.setItem('access_token', res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success('Đăng nhập thành công');
            navigate("/");
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: res?.data?.message ? res.data.message : res.message,
                duration: 1,
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Login</h2>
                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="on"
                    className="login-form"
                >
                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Email"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input className="login-input" />
                    </Form.Item>

                    <Form.Item
                        labelCol={{ span: 24 }}
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password className="login-input" />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        className="login-checkbox"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item className="login-submit">
                        <Button
                            loading={loading}
                            type="primary"
                            htmlType="submit"
                            className="login-button"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div className="login-options">
                    <div>
                        <a href="#" className="forgot-password">Forgot password?</a>
                    </div>
                    <div className="register-link">
                        <div><span>Don't have an account? </span></div>
                        <Link to="/register" className="register-now">Register now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
