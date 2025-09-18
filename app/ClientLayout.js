"use client";
import { ThemeProvider } from '../context/ThemeContext';
import { ScanProvider } from '../context/ScanContext';
import ThemeVideo from '../components/ThemeVideo';
import { usePathname } from 'next/navigation';
import ErrorBoundary from '../components/ErrorBoundary';
import NavigationProvider from '../components/NavigationProvider';
import PropTypes from 'prop-types';
import { Toaster } from 'react-hot-toast';

export default function ClientLayout({ children, gotham }) {
  const pathname = usePathname();
  let darkSrc = '/assets/video/dark_video_wave.mp4';
  let lightSrc = '/assets/video/light_video_wave.mp4';

  let videoHeight = '100vh';
  let top = '0';
  if (pathname?.startsWith('/market-breakouts')) {
    darkSrc = '/assets/video/marketBreakout.mp4';
    lightSrc = '/assets/video/light_marketBreakout.mp4';
    videoHeight = '600px';
    top = // bottom align
      'calc(100vh - 600px)';
  }

  return (
    <body className={gotham} style={{position: 'relative', minHeight: '100vh', overflow: ''}}>
      <ThemeProvider>
        <ScanProvider>
          <NavigationProvider>
            <ThemeVideo
              key={pathname} // force remount on route change
              darkSrc={darkSrc}
              lightSrc={lightSrc}
              style={{
                position: 'fixed',
                top: top,
                left: 0,
                width: '100vw',
                height: videoHeight,
                objectFit: 'cover',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            <div style={{position: 'relative', zIndex: 1}}>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
              {/* <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#333',
                    color: '#fff',
                  },
                  error: {
                    duration: 5000,
                    style: {
                      background: '#dc3545',
                      color: '#fff',
                    },
                  },
                  success: {
                    style: {
                      background: '#28a745',
                      color: '#fff',
                    },
                  },
                }}
              /> */}
            </div>
          </NavigationProvider>
        </ScanProvider>
      </ThemeProvider>
    </body>
  );
}

ClientLayout.propTypes = {
  children: PropTypes.node.isRequired,
  gotham: PropTypes.string,
};
