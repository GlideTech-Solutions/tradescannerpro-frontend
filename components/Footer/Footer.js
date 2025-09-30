"use client";

import React from 'react';
import './Footer.scss';
import { useTheme } from '@/context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* Logo Section */}
          <div className="footer-section footer-logo">
            <div className="logo-container">
              {isDarkMode ? (
                <img src="/assets/logo/white-logo.svg" alt="TradeScannerPro Logo" className="footer-logo-img" />
              ) : (
                <img src="/assets/logo/logo.svg" alt="TradeScannerPro Logo" className="footer-logo-img" />
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-section footer-contact">
            <h3 className="section-title">Contact</h3>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span>5540 Centerview Drive, Suite 204, Raleigh, NC 27606</span>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>919-935-0010</span>
            </div>
            <div className="contact-item">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>support@tradescannerpro.com</span>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section footer-links">
            <h3 className="section-title">Quick Links</h3>
            <ul className="links-list">
              <li><a href="/" className="footer-link">Dashboard</a></li>
              {/* <li><a href="/move-opportunities" className="footer-link">Top Bullish Picks</a></li>
              <li><a href="/child-move-opportunities" className="footer-link">Top Bearish Picks</a></li> */}
              {/* <li><a href="/setting" className="footer-link">Settings</a></li> */}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="footer-section footer-social">
            <h3 className="section-title">Let's Connect!</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://x.com" className="social-icon" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimers */}
      <div className="footer-legal">
        <div className="footer-container">
          <div className="legal-content">
            <p className="legal-text">
              <strong>IMPORTANT NOTICE!</strong>{' '}
              MicroQuant, LLC (MQ) does not hold itself out as an investment adviser.
              The information provided is for educational purposes only and is not intended as investment advice.
              Past performance is not indicative of future results. Trading involves substantial risk of loss and is not
              suitable for all investors. The degree of leverage can work against you as well as for you.
            </p>
            <p className="legal-text">
              <strong>NO REPRESENTATION IS BEING MADE THAT THE USE OF THIS STRATEGY OR ANY SYSTEM OR TRADING METHODOLOGY
              WILL GENERATE PROFITS.</strong>{' '}
              No representation is being made that any account will or is likely to achieve
              profits or losses similar to those shown. The use of any trading system involves substantial risk of loss
              and is not suitable for all investors. The degree of leverage can work against you as well as for you.
            </p>
            <p className="legal-text">
              <strong>CFTC RULE 4.41 - HYPOTHETICAL OR SIMULATED PERFORMANCE RESULTS HAVE CERTAIN LIMITATIONS.</strong>{' '}
              Unlike an actual performance record, simulated results do not represent actual trading. Also, since the
              trades have not been executed, the results may have under-or-over compensated for the impact, if any,
              of certain market factors, such as lack of liquidity. Simulated trading programs in general are also
              subject to the fact that they are designed with the benefit of hindsight.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright and Policy Links */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">© 2025 TradeScannerPro. All Rights Reserved.</p>
            <div className="policy-links">
              <a href="/terms" className="policy-link">Terms & Conditions</a>
              <a href="/privacy" className="policy-link">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
