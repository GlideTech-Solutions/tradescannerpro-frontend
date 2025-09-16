'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeVideo({ darkSrc, lightSrc, className = '', style = {}, ...props }) {
    const { isDarkMode } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

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
            key={isDarkMode ? 'dark' : 'light'}
            autoPlay
            muted
            loop
            playsInline
            className={`theme-bg-video ${className}`.trim()}
            style={defaultStyle}
            {...props}
        >
            <source src={isDarkMode ? darkSrc : lightSrc} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}
