import React, { useState } from 'react';
import { Button, Form, Input, notification } from 'antd';

const ResetPassword = ({ code }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ password: '', confirm: '' });

  const onFinish = async () => {
    const newErrors = { password: '', confirm: '' };
    let valid = true;

    // Validate password length
    if (password.length < 5) {
      newErrors.password = 'Mật khẩu phải có ít nhất 5 ký tự.';
      valid = false;
    }

    // Validate password match
    if (password !== confirmPassword) {
      newErrors.confirm = 'Mật khẩu xác nhận không khớp.';
      valid = false;
    }

    setErrors(newErrors);

    // If validation passes, make the API call
    if (valid) {
      try {
        const response = await fetch('/api/v1/auth/reset-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ code, password, confirmPassword }),
        });

        const result = await response.json();

        if (response.ok) {
          notification.success({
            message: 'Thành công!',
            description: 'Mật khẩu đã được đổi thành công.',
          });
        } else {
          notification.error({
            message: 'Đã có lỗi xảy ra!',
            description: result.message || 'Không thể đổi mật khẩu. Vui lòng thử lại sau.',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Lỗi kết nối!',
          description: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
        });
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#b69bd0' }}>
      <Form
        style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}
        onFinish={onFinish}
      >
        <h1>Đổi Mật Khẩu</h1>

        <Input type="hidden" name="code" value={code} />

        <Form.Item label="Mật khẩu mới" required>
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={5}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </Form.Item>

        <Form.Item label="Nhập lại mật khẩu mới" required>
          <Input.Password
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirm && <p style={{ color: 'red' }}>{errors.confirm}</p>}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
