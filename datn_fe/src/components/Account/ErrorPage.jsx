import React from 'react';
import { Button } from 'antd'; // Sử dụng Ant Design cho nút

const ErrorPage = ({ errorMessage }) => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <div style={styles.errorIcon}>❌</div>
        <h1 style={styles.title}>Đã xảy ra lỗi!</h1>
        <p style={styles.message}>{errorMessage || "Đã có vấn đề xảy ra. Vui lòng thử lại sau!"}</p>
        <Button type="primary" style={styles.button} onClick={() => window.location.reload()}>
          Thử lại
        </Button>
      </div>
    </div>
  );
};

const styles = {
  body: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  errorIcon: {
    fontSize: '48px',
    color: '#e74c3c',
    marginBottom: '20px',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    color: '#777',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '5px',
  },
};

export default ErrorPage;
