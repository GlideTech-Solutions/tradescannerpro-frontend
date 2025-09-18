import React, { useState, useEffect } from 'react'
import PageLogo from '../PageLogo/PageLogo'
import "./ExplosiveMoveDetection.scss";
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from "next/navigation";

export default function ExplosiveMoveDetection() {
    const { isDarkMode } = useTheme();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) {
        // Avoid hydration mismatch (theme is undefined on first render)
        return null;
    }

    return (
        <div className='explosice-move-detection-section'>

            <PageLogo />

            <div className='explosice-move-detection-alignment'>
                <div className='welcome-line'>
                    <p>Welcome to CoinPulse</p>

                    <h1 className={`${isDarkMode ? 'dark' : ''}`}>Professional Crypto Scanner for Explosive Move Detection</h1>
                    <div className='run-button-alignment'>
                        <button
                        onClick={() => {
                            router.push('/market-breakouts?autoScan=true');
                        }}
                        > <img src='/assets/icons/bit-icon.svg' alt='bit icon' />  Run Scan</button>
                    </div>
                </div>

                <div className='explosice-bottom-section'>

                  {/* <ThemeVideo
  darkSrc="/assets/video/dark_video_wave.mp4"
  lightSrc="/assets/video/light_video_wave.mp4"
  className="bg-video"
/> */}
                    <div className='explosive-img-section'>
                        {
                            isDarkMode ?
                                <img src='/assets/images/dark-explosive-img.png' alt='explosive img dark' />
                                :
                                <img src='/assets/images/light-explosive-img.png' alt='explosive img light' />
                        }
                        
                    </div>
                </div>
            </div>

        </div>
    )
}
