import React from 'react'
import "./PageLogo.scss";
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function PageLogo() {
    const { isDarkMode } = useTheme();
    const router = useRouter();

    return (
        <div className='pageLogo-section' onClick={() => router.push('/')}>
            {isDarkMode ? (
                <div>
                    <img src="/assets/logo/tsp-black.png" alt='white logo' />
                </div>
            ) : (

                <div>
                    <img src="/assets/logo/tsp-white.png" alt='logo' />
                </div>
            )
            }
        </div>
    )
}
