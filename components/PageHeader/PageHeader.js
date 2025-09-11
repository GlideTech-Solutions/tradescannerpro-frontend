import React from 'react'
import "./PageHeader.scss";
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function PageHeader() {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    return (
        <div className='pageHeader-section'>
            <div className='pageHeader-alignment'>
                <div className='pageHeader-logo'
                onClick={() => {
                    router.push('/');
                }}
                >
                    {isDarkMode ? (
                        <img src='/assets/logo/white-logo.svg' alt='logo' />
                    ) : (
                        <img src='/assets/logo/logo.svg' alt='logo' />
                    )}

                </div>

                <div className='pageHeader-rightSide-alignment'>
                    <div className='menu-alignment'>
                        <ul>
                            <li className={`${isDarkMode ? 'dark' : ''}`}
                            onClick={() => {
                                router.push('/move-opportunities');
                            }}>
                                Dashboard</li>
                            <li className={`${isDarkMode ? 'dark' : ''}`}
                            onClick={() => {
                                router.push('/setting');
                            }}>
                                Settings</li>
                        </ul>
                    </div>
                    <div className='headerrun-button-alignment'>
                        <button  onClick={() => {
                            router.push('/market-breakouts');
                        }}> <img src='/assets/icons/bit-icon.svg' alt='bit icon' />  Run Scan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
