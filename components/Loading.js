'use client';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Loading = ({ message = 'Loading...' }) => {
  const { isDarkMode } = useTheme();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      minHeight: '200px'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: `4px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
        borderTop: `4px solid ${isDarkMode ? '#fff' : '#007bff'}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px'
      }} />
      <p style={{
        color: isDarkMode ? '#fff' : '#333',
        fontSize: '16px',
        margin: 0
      }}>
        {message}
      </p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
