import React from 'react'
import PageHeader from '../PageHeader/PageHeader'
import "./MoveOpportunities.scss";
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';

export default function MoveOpportunities() {
    const { isDarkMode } = useTheme();
    const router = useRouter();

    return (
        <div>
            <PageHeader />

            <div className='moveOpportunities-section'>
                <div className='moveOpportunities-welcome-line'>
                    <p>Last scan: 03/09/2025  1:02:23 PM</p>

                    <h1 className={`${isDarkMode ? 'dark' : ''}`}>Top Explosive Move Opportunities</h1>

                </div>

                <div className='moveOpportunities-details-alignment'>
                    <div className='moveOpportunities-grid-alignment'>
                        <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`}>
                            <div className='moveOpportunities-top-heading'>
                                <div className='moveOpportunoties-left-side-alignment'>
                                    <div className='company-logo-alignment'>
                                        <img src='/assets/images/company-img.png' alt="company logo" />
                                    </div>

                                    <div className='company-name-alignment'>
                                        <h2 className={`${isDarkMode ? 'dark' : ''}`}>TAKE</h2>
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>Overtake</p>
                                    </div>
                                </div>

                                <div className='moveOpportunoties-right-side-alignment'>
                                    <h3 className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</h3>
                                    <div className='rate-alignemnt'>
                                        <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</p>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-child-list-alignment'>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-histogram.svg' alt='histogram ' />
                                            ) : (
                                                <img src='/assets/icons/chart-histogram.svg' alt='histogram ' />
                                            )}

                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Market Cap</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$19.92M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>

                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-simple.svg' alt='chart simple ' />

                                            ) : (

                                                <img src='/assets/icons/chart-simple.svg' alt='chart simple ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>24h Volume</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$52.9M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-holding-hand-revenue.svg' alt='holding hand ' />

                                            ) : (

                                                <img src='/assets/icons/holding-hand-revenue.svg' alt='holding hand ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>RSI</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>52.61</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-arrow-comparison.svg' alt='arrow comparison ' />

                                            ) : (

                                                <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>WinWave Signal</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <div className='buy-now-alignment'>
                                            <button>Buy</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />

                                            ) : (

                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Score</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>68/100</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6 >12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>3.50%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={() => {
                                    router.push("/child-move-opportunities")
                                }}
                                >
                                    {isDarkMode ? (
                                        <img src='/assets/icons/purple-chart.svg' alt='candlestick' />
                                    ) : (
                                        <img src='/assets/icons/chart-candlestick.svg' alt='candlestick' />
                                    )}
                                    View Chart
                                </button>
                            </div>
                        </div>

                        <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`}>
                            <div className='moveOpportunities-top-heading'>
                                <div className='moveOpportunoties-left-side-alignment'>
                                    <div className='company-logo-alignment'>
                                        <img src='/assets/images/company-img.png' alt="company logo" />
                                    </div>

                                    <div className='company-name-alignment'>
                                        <h2 className={`${isDarkMode ? 'dark' : ''}`}>TAKE</h2>
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>Overtake</p>
                                    </div>
                                </div>

                                <div className='moveOpportunoties-right-side-alignment'>
                                    <h3 className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</h3>
                                    <div className='rate-alignemnt'>
                                        <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</p>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-child-list-alignment'>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-histogram.svg' alt='histogram ' />
                                            ) : (
                                                <img src='/assets/icons/chart-histogram.svg' alt='histogram ' />
                                            )}

                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Market Cap</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$19.92M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>

                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-simple.svg' alt='chart simple ' />

                                            ) : (

                                                <img src='/assets/icons/chart-simple.svg' alt='chart simple ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>24h Volume</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$52.9M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-holding-hand-revenue.svg' alt='holding hand ' />

                                            ) : (

                                                <img src='/assets/icons/holding-hand-revenue.svg' alt='holding hand ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>RSI</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>52.61</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-arrow-comparison.svg' alt='arrow comparison ' />

                                            ) : (

                                                <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>WinWave Signal</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <div className='buy-now-alignment'>
                                            <button>Buy</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />

                                            ) : (

                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Score</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>68/100</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6 >12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>3.50%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={() => {
                                    router.push("/child-move-opportunities")
                                }}
                                >
                                    {isDarkMode ? (
                                        <img src='/assets/icons/purple-chart.svg' alt='candlestick' />
                                    ) : (
                                        <img src='/assets/icons/chart-candlestick.svg' alt='candlestick' />
                                    )}
                                    View Chart
                                </button>
                            </div>
                        </div>

                        <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`}>
                            <div className='moveOpportunities-top-heading'>
                                <div className='moveOpportunoties-left-side-alignment'>
                                    <div className='company-logo-alignment'>
                                        <img src='/assets/images/company-img.png' alt="company logo" />
                                    </div>

                                    <div className='company-name-alignment'>
                                        <h2 className={`${isDarkMode ? 'dark' : ''}`}>TAKE</h2>
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>Overtake</p>
                                    </div>
                                </div>

                                <div className='moveOpportunoties-right-side-alignment'>
                                    <h3 className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</h3>
                                    <div className='rate-alignemnt'>
                                        <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</p>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-child-list-alignment'>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-histogram.svg' alt='histogram ' />
                                            ) : (
                                                <img src='/assets/icons/chart-histogram.svg' alt='histogram ' />
                                            )}

                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Market Cap</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$19.92M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>

                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-simple.svg' alt='chart simple ' />

                                            ) : (

                                                <img src='/assets/icons/chart-simple.svg' alt='chart simple ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>24h Volume</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$52.9M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-holding-hand-revenue.svg' alt='holding hand ' />

                                            ) : (

                                                <img src='/assets/icons/holding-hand-revenue.svg' alt='holding hand ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>RSI</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>52.61</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-arrow-comparison.svg' alt='arrow comparison ' />

                                            ) : (

                                                <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>WinWave Signal</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <div className='buy-now-alignment'>
                                            <button>Buy</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />

                                            ) : (

                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Score</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>68/100</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6 >12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>3.50%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={() => {
                                    router.push("/child-move-opportunities")
                                }}
                                >
                                    {isDarkMode ? (
                                        <img src='/assets/icons/purple-chart.svg' alt='candlestick' />
                                    ) : (
                                        <img src='/assets/icons/chart-candlestick.svg' alt='candlestick' />
                                    )}
                                    View Chart
                                </button>
                            </div>
                        </div>

                        <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`}>
                            <div className='moveOpportunities-top-heading'>
                                <div className='moveOpportunoties-left-side-alignment'>
                                    <div className='company-logo-alignment'>
                                        <img src='/assets/images/company-img.png' alt="company logo" />
                                    </div>

                                    <div className='company-name-alignment'>
                                        <h2 className={`${isDarkMode ? 'dark' : ''}`}>TAKE</h2>
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>Overtake</p>
                                    </div>
                                </div>

                                <div className='moveOpportunoties-right-side-alignment'>
                                    <h3 className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</h3>
                                    <div className='rate-alignemnt'>
                                        <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</p>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-child-list-alignment'>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-histogram.svg' alt='histogram ' />
                                            ) : (
                                                <img src='/assets/icons/chart-histogram.svg' alt='histogram ' />
                                            )}

                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Market Cap</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$19.92M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>

                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-simple.svg' alt='chart simple ' />

                                            ) : (

                                                <img src='/assets/icons/chart-simple.svg' alt='chart simple ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>24h Volume</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$52.9M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-holding-hand-revenue.svg' alt='holding hand ' />

                                            ) : (

                                                <img src='/assets/icons/holding-hand-revenue.svg' alt='holding hand ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>RSI</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>52.61</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-arrow-comparison.svg' alt='arrow comparison ' />

                                            ) : (

                                                <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>WinWave Signal</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <div className='buy-now-alignment'>
                                            <button>Buy</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />

                                            ) : (

                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Score</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>68/100</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6 >12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>3.50%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={() => {
                                    router.push("/child-move-opportunities")
                                }}
                                >
                                    {isDarkMode ? (
                                        <img src='/assets/icons/purple-chart.svg' alt='candlestick' />
                                    ) : (
                                        <img src='/assets/icons/chart-candlestick.svg' alt='candlestick' />
                                    )}
                                    View Chart
                                </button>
                            </div>
                        </div>

                        <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`}>
                            <div className='moveOpportunities-top-heading'>
                                <div className='moveOpportunoties-left-side-alignment'>
                                    <div className='company-logo-alignment'>
                                        <img src='/assets/images/company-img.png' alt="company logo" />
                                    </div>

                                    <div className='company-name-alignment'>
                                        <h2 className={`${isDarkMode ? 'dark' : ''}`}>TAKE</h2>
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>Overtake</p>
                                    </div>
                                </div>

                                <div className='moveOpportunoties-right-side-alignment'>
                                    <h3 className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</h3>
                                    <div className='rate-alignemnt'>
                                        <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</p>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-child-list-alignment'>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-histogram.svg' alt='histogram ' />
                                            ) : (
                                                <img src='/assets/icons/chart-histogram.svg' alt='histogram ' />
                                            )}

                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Market Cap</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$19.92M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>

                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-simple.svg' alt='chart simple ' />

                                            ) : (

                                                <img src='/assets/icons/chart-simple.svg' alt='chart simple ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>24h Volume</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$52.9M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-holding-hand-revenue.svg' alt='holding hand ' />

                                            ) : (

                                                <img src='/assets/icons/holding-hand-revenue.svg' alt='holding hand ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>RSI</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>52.61</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-arrow-comparison.svg' alt='arrow comparison ' />

                                            ) : (

                                                <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>WinWave Signal</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <div className='buy-now-alignment'>
                                            <button>Buy</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />

                                            ) : (

                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Score</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>68/100</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6 >12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>3.50%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={() => {
                                    router.push("/child-move-opportunities")
                                }}
                                >
                                    {isDarkMode ? (
                                        <img src='/assets/icons/purple-chart.svg' alt='candlestick' />
                                    ) : (
                                        <img src='/assets/icons/chart-candlestick.svg' alt='candlestick' />
                                    )}
                                    View Chart
                                </button>
                            </div>
                        </div>

                        <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`}>
                            <div className='moveOpportunities-top-heading'>
                                <div className='moveOpportunoties-left-side-alignment'>
                                    <div className='company-logo-alignment'>
                                        <img src='/assets/images/company-img.png' alt="company logo" />
                                    </div>

                                    <div className='company-name-alignment'>
                                        <h2 className={`${isDarkMode ? 'dark' : ''}`}>TAKE</h2>
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>Overtake</p>
                                    </div>
                                </div>

                                <div className='moveOpportunoties-right-side-alignment'>
                                    <h3 className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</h3>
                                    <div className='rate-alignemnt'>
                                        <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                        <p className={`${isDarkMode ? 'dark' : ''}`}>$0.1504</p>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-child-list-alignment'>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-histogram.svg' alt='histogram ' />
                                            ) : (
                                                <img src='/assets/icons/chart-histogram.svg' alt='histogram ' />
                                            )}

                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Market Cap</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$19.92M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>

                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-chart-simple.svg' alt='chart simple ' />

                                            ) : (

                                                <img src='/assets/icons/chart-simple.svg' alt='chart simple ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>24h Volume</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>$52.9M</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-holding-hand-revenue.svg' alt='holding hand ' />

                                            ) : (

                                                <img src='/assets/icons/holding-hand-revenue.svg' alt='holding hand ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>RSI</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>52.61</h6>
                                    </div>
                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/gray-arrow-comparison.svg' alt='arrow comparison ' />

                                            ) : (

                                                <img src='/assets/icons/arrow-comparison.svg' alt='arrow comparison ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>WinWave Signal</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <div className='buy-now-alignment'>
                                            <button>Buy</button>
                                        </div>
                                    </div>

                                </div>
                                <div className='moveOpportunities-child-details-alignment'>
                                    <div className='moveOpportunities-child-left-alignment'>
                                        <div className='moveOpportunities-icon'>
                                            {isDarkMode ? (
                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />

                                            ) : (

                                                <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                            )}
                                        </div>

                                        <div className='moveOpportunities-name'>
                                            <span className={`${isDarkMode ? 'dark' : ''}`}>Score</span>
                                        </div>
                                    </div>

                                    <div className='right-side-price'>
                                        <h6 className={`${isDarkMode ? 'dark' : ''}`}>68/100</h6>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6 >12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>12.75%</h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <img src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
                                            <h6>3.50%</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                onClick={() => {
                                    router.push("/child-move-opportunities")
                                }}
                                >
                                    {isDarkMode ? (
                                        <img src='/assets/icons/purple-chart.svg' alt='candlestick' />
                                    ) : (
                                        <img src='/assets/icons/chart-candlestick.svg' alt='candlestick' />
                                    )}
                                    View Chart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
