import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const EmailVerification = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f4f4',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '48px',
          color: '#4caf50',
          marginBottom: '20px',
        }}>✔️</div>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Email Verified!</h1>
        <p style={{ color: '#777', marginBottom: '30px' }}>
          Your email has been successfully verified. You can now log in to your account.
        </p>
        <Button type="primary" onClick={handleLogin} style={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
        }}>
          Log In
        </Button>
      </div>
    </div>
  );
};

export default EmailVerification;