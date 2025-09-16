import React from 'react'
import PageLogo from '../PageLogo/PageLogo'
import "./SettingPage.scss";
import { useTheme } from '@/context/ThemeContext';
import PageHeader from '../PageHeader/PageHeader';
import ThemeVideo from '../ThemeVideo';
import { useRouter } from 'next/navigation';
export default function SettingPage() {
    const router = useRouter();
    const { isDarkMode } = useTheme();
    return (
        <div className='setting-page-detection-section'>

            <PageHeader />

            <div className={`setting-page-detection-alignment ${isDarkMode ? 'dark' : ''}`}>
                <a className='setting-page-back-alignment'
                  onClick={() => {
                                router.push('/move-opportunities');
                            }}
                >
                    <img src='/assets/icons/arrow-small-left.svg' alt='left arrow' />
                    <span>Back to Dashboard</span>
                </a>

                <h1 className={`${isDarkMode ? 'dark' : ''}`}>Settings</h1>

                <div className='setting-page-details-alignment'>
                    <div className={`setting-page-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                        <div className='setting-page-left-side-alinment'>
                            <div className='setting-icon'>
                                {isDarkMode ? (

                                    <img src='/assets/icons/gray-qr-scan.svg' alt='qr-scan icon' />
                                ) : (
                                    <img src='/assets/icons/qr-scan.svg' alt='qr-scan icon' />

                                )}
                            </div>
                            <div className='seeting-name'>
                                <p className={`${isDarkMode ? 'dark' : ''}`}>Scan Frequency</p>
                            </div>
                        </div>

                        <div className='setting-page-right-side-alignment'>
                            <h6 className={`${isDarkMode ? 'dark' : ''}`}>Every 7 Day</h6>
                            <div className='dropdown-icon-alignment'>
                                {isDarkMode ? (
                                    <img src='/assets/icons/gray-drop-down-icon.svg' alt='dropdown icon' />

                                ) : (

                                    <img src='/assets/icons/drop-down-icon.svg' alt='dropdown icon' />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={`setting-page-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                        <div className='setting-page-left-side-alinment'>
                            <div className='setting-icon'>
                                {isDarkMode ? (
                                    <img src='/assets/icons/gray-checklist-task-budget.svg' alt='gray checklist task budget icon' />
                                ) : (
                                    <img src='/assets/icons/checklist-task-budget.svg' alt='checklist task budget icon' />

                                )
                                }
                            </div>
                            <div className='seeting-name'>
                                <p className={`${isDarkMode ? 'dark' : ''}`}>Number of Results</p>
                            </div>
                        </div>

                        <div className='setting-page-right-side-alignment'>
                            <div className='number-setting-alignment'>
                                <h6 className={`${isDarkMode ? 'dark' : ''}`}>Top</h6>

                                <div className={`number-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                                    <span>3</span>
                                </div>
                                <div className={`number-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                                    <span>5</span>
                                </div>
                                <div className='number-box-alignment number-active'>
                                    <span>10</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`setting-page-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                        <div className='setting-page-left-side-alinment'>
                            <div className='setting-icon'>
                                {isDarkMode ? (

                                    <img src='/assets/icons/gray-arrow-comparison.svg' alt='gray arrow comparison' />
                                ) : (

                                    <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison' />
                                )}
                            </div>
                            <div className='seeting-name'>
                                <p className={`${isDarkMode ? 'dark' : ''}`}>Risk Level</p>
                            </div>
                        </div>

                        <div className='setting-page-right-side-alignment'>
                            <div className='number-setting-alignment'>
                                <div className='risk-details-alignment'>
                                    <div className={`risk-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                                        <p>Conservative</p>
                                    </div>
                                    <div className='risk-box-alignment active-risk-box'>
                                        <p>Moderate</p>
                                    </div>
                                    <div className={`risk-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                                        <p>Aggressive</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`setting-page-box-alignment ${isDarkMode ? 'dark' : ''}`}>
                        <div className='setting-page-left-side-alinment'>
                            <div className='setting-icon'>
                                {isDarkMode ? (

                                    <img src='/assets/icons/gray-chat-notification.svg' alt='chat notification' />
                                ) : (
                                    <img src='/assets/icons/chat-notification.svg' alt='chat notification' />

                                )}

                            </div>
                            <div className='seeting-name'>
                                <p className={`${isDarkMode ? 'dark' : ''}`}>Notifications</p>
                            </div>
                        </div>

                        <div className='setting-page-right-side-alignment'>
                            <div className='number-setting-alignment'>
                                <label class="switch">
                                    <input type="checkbox" />
                                    <span class="slider round"></span>
                                </label>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='setting-button-alignment'>
                    <button >
                        <img src='/assets/icons/check-circle.svg' alt="check circle" />
                        Save
                    </button>
                </div>
            </div>
            {/* <div className='setting-bg-video'>
                <ThemeVideo
                darkSrc="/assets/video/dark_video_wave.mp4"
                lightSrc="/assets/video/light_video_wave.mp4"
                className="bg-video"
              />
            </div> */}

        </div>
    )
}
