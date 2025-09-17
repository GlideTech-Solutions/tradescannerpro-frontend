import React from 'react'
import "./PageHeader.scss";
import { useTheme } from '../../context/ThemeContext';
import { useScan } from '../../context/ScanContext';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api-client';

export default function PageHeader() {
    const { isDarkMode } = useTheme();
    const { setErrorState, setLoadingState, updateScanResult } = useScan();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await apiClient.logout();
        } catch (error) {
            console.error('Logout error:', error);
            // Force redirect even if API call fails
            window.location.href = '/login';
        }
    };

    const handleScan = async () => {
        setErrorState(null);
        setLoadingState(true);
        try {
            const data = await apiClient.scanCrypto();
            // Update scan result in context (which also saves to localStorage)
            updateScanResult(data);
            router.push('/move-opportunities');
        } catch (err) {
            setErrorState(err.message || "Scan failed. Please try again.");
            console.error("Scan error:", err);
        }
    };

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
                            {/* <li className={`${isDarkMode ? 'dark' : ''}`}
                            onClick={() => {
                                router.push('/setting');
                            }}>
                                Settings</li> */}
                            <li className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={handleLogout}>
                                Logout</li>
                        </ul>
                    </div>
                    <div className='headerrun-button-alignment'>
                        <button onClick={handleScan}> <img src='/assets/icons/bit-icon.svg' alt='bit icon' />  Run Scan</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
