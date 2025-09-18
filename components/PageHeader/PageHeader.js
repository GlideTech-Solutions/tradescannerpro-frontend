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
        }
        // Always redirect to login after logout (even on error)
        router.push('/login');
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
            // Handle 401 errors (session expired) - API client will handle redirect and toast
            if (err.message?.includes('Session expired')) {
                // Don't show error state for session expiration as user will be redirected
             
                return;
            }
            
            // API client already shows toast, just set local error state for UI
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
