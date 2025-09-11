import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemeVideo({ darkSrc, lightSrc, ...props }) {
    const { isDarkMode } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <video
            key={isDarkMode ? 'dark' : 'light'}
            autoPlay
            muted
            loop
            playsInline
            {...props}
        >
            <source src={isDarkMode ? darkSrc : lightSrc} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}
