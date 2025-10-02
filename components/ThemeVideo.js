'use client';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

export default function ThemeVideo({ darkSrc, lightSrc, className = '', style = {}, ...props }) {
    const { isDarkMode, isInitialized } = useTheme();
    const [mounted, setMounted] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => setMounted(true), []);

    // Force play on mobile devices
    useEffect(() => {
        if (!videoRef.current) return;

        const playVideo = async () => {
            try {
                // Wait for video to be ready
                if (videoRef.current.readyState >= 2) {
                    await videoRef.current.play();
                } else {
                    // If not ready, wait for loadeddata event
                    videoRef.current.addEventListener('loadeddata', async () => {
                        try {
                            await videoRef.current.play();
                        } catch (error) {
                            console.log('Video autoplay prevented:', error);
                        }
                    }, { once: true });
                }
            } catch (error) {
                console.log('Video autoplay prevented:', error);
            }
        };

        playVideo();
    }, [isDarkMode, mounted]);

    if (!mounted || !isInitialized) return null;

    // Default styles for full background video
    const defaultStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -1,
        ...style,
    };

    return (
        <video
            ref={videoRef}
            key={isDarkMode ? 'dark' : 'light'}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`theme-bg-video ${className}`.trim()}
            style={defaultStyle}
            {...props}
        >
            <source src={isDarkMode ? darkSrc : lightSrc} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}

ThemeVideo.propTypes = {
    darkSrc: PropTypes.string.isRequired,
    lightSrc: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
};
