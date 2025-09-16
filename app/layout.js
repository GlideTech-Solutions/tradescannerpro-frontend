


'use client';
import './globals.scss';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/context/ThemeContext';
import ThemeVideo from '../components/ThemeVideo';
import { usePathname } from 'next/navigation';
import ClientLayout from './ClientLayout';

const gotham = localFont({

  
    src: [
      {
        path: '../public/fonts/Gotham-Medium.otf',
        style: 'normal',
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
        <body className={gotham.className} style={{position: 'relative', minHeight: '100vh', overflow: 'hidden'}}>
          <ClientLayout gotham={gotham.className}>{children}</ClientLayout>
        </body>
      </html>
    );
  }
    