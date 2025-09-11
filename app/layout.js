import './globals.scss';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/context/ThemeContext';

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

export const metadata = {
  title: 'Coinplus',
  description: 'A cryptocurrency portfolio tracker app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <head>
       <link rel="icon" href="/logo.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className={gotham.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
