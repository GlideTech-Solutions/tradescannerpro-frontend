import React from 'react'
import PageLogo from '../PageLogo/PageLogo'
import "./MarketBreakouts.scss";
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import ThemeVideo from '../ThemeVideo';

export default function MarketBreakouts() {
    const { isDarkMode } = useTheme();
     const router = useRouter();
    return (
        <div className='market-breakout-detection-section'>

            <PageLogo />

            <div className='market-breakout-detection-alignment'>
                <div className='market-breakout-welcome-line'>
                    <p>Stay Ahead with Real-Time Market Scans</p>

                    <h1 className={`${isDarkMode ? 'dark' : ''}`}>Precision Scanning for Market Breakouts</h1>
                    <div className='market-breakout-run-button-alignment'>
                        <button
                        onClick={() => {
                            router.push('/move-opportunities');
                        }}
                        > <img src='/assets/icons/loading-icon.svg' alt='loading icon' /> Scanning Market...</button>
                    </div>
                </div>

                {/* <div className='market-breakout-bottom-section'>
                  
                    <img src='/assets/images/explosive-img.png' alt='explosive img' />

                   <video autoPlay muted loop playsInline className="">
                        <source src="/assets/video/marketBreakout.mp4" type="video/mp4" />
                    </video>
                </div> */}
            </div>

        </div>
    )
}
