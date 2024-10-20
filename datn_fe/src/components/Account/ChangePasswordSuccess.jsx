import React from 'react';

const ChangePasswordSuccess = () => {
    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <div style={styles.successIcon}>✔️</div>
                <h1 style={styles.title}>Đổi Mật Khẩu Thành Công!</h1>
                <p style={styles.message}>Mật khẩu của bạn đã được thay đổi thành công.</p>
                {/* Uncomment the line below to add a login button */}
                {/* <a href="/login" style={styles.button}>Đăng Nhập</a> */}
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
    successIcon: {
        fontSize: '48px',
        color: '#4caf50',
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
        backgroundColor: '#4caf50',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default ChangePasswordSuccess;
