


'use client';
import localFont from 'next/font/local';
import ClientLayout from './ClientLayout';
import './globals.scss';

const gotham = localFont({

  
    src: [
     {
      path: "../public/fonts/Gotham-Light.otf",
      weight: "400",
      style: "normal",
    },
    ],
    variable: '--font-gotham',
    display: 'swap',
  });

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <head>
          <link rel="icon" href="/logo.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/logo.png" />
        </head>
        <body className={gotham.className} style={{position: 'relative', minHeight: '100vh', overflow: ''}}>
          <ClientLayout gotham={gotham.className}>{children}</ClientLayout>
        </body>
      </html>
    );
  }
    