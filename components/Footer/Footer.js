"use client";

import React from 'react';
import './Footer.scss';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const isDarkMode = useTheme();
  return (
    <footer className={`footer ${isDarkMode ? '' : 'dark'}`}>
      <div className="footer-content">
        <div className="footer-left">
          <p className="copyright">© 2025 TradeScannerPro. All Rights Reserved.</p>
        </div>
        <div className="footer-right">
          <a href="/terms" className="footer-link">Terms & Conditions</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
