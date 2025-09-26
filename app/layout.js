


'use client';
// import localFont from 'next/font/local';
import ClientLayout from './ClientLayout';
import { gotham } from './font';
import './globals.scss';


  export default function RootLayout({ children }) {
    return (
      <html lang="en" className={`${gotham.variable}`}>
        <head>
          
          <title>TradeScannerPro - Crypto Scanner for Explosive Move Detection</title>
          <link rel="icon" href="/logo.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </head>
        <body className={`${gotham.variable}  antialiased`} style={{position: 'relative', minHeight: '100vh', overflow: ''}}>
          <ClientLayout >{children}</ClientLayout>
        </body>
      </html>
    );
  }
    