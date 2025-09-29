import React, { useState, useEffect } from 'react'
import PageHeader from '../PageHeader/PageHeader'
import "./MoveOpportunities.scss";
import { useTheme } from '../../context/ThemeContext';
import { useScan } from '../../context/ScanContext';
import { useRouter } from 'next/navigation';
import { formatScanTime } from '../../lib/timeUtils';
import apiClient from '../../lib/api-client';

export default function MoveOpportunities() {
    const { isDarkMode } = useTheme();
    const { lastScanTime, updateCategory, scanResult } = useScan();
    const router = useRouter();

    // Tab state
    const [activeTab, setActiveTab] = useState('neutral');
    const [tabData, setTabData] = useState({
        neutral: null,
        strong_bullish: null,
        strong_bearish: null
    });

    // Get the data array, handling different data structures
    const dataArray = tabData[activeTab]?.data || (Array.isArray(tabData[activeTab]) ? tabData[activeTab] : []);

    // Process scan data from context or localStorage
    const processScanData = (scanData, category) => {
        if (scanData && scanData.data && Array.isArray(scanData.data)) {
            const filteredCoins = scanData.data.filter((coin) => {
                const coinStrength = coin.strength;
                switch (category) {
                    case 'neutral':
                        return coinStrength === 'Neutral';
                    case 'strong_bullish':
                        return coinStrength === 'Bullish' || coinStrength === 'Strong Bullish';
                    case 'strong_bearish':
                        return coinStrength === 'Bearish' || coinStrength === 'Strong Bearish';
                    default:
                        return true;
                }
            });
            
            const filteredData = {
                ...scanData,
                data: filteredCoins
            };

            setTabData(prev => ({ ...prev, [category]: filteredData }));
            updateCategory(category);
        }
    };

    const handleScan = () => {
		
		// Redirect to market-breakouts page with scan trigger parameter
		router.push("/market-breakouts?autoScan=true");
	};


    // Handle tab change
    const handleTabChange = (category) => {
        setActiveTab(category);
        
      
        
        const storedData = localStorage.getItem('scan_result');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                processScanData(parsedData, category);
            } catch (error) {
                // Let UI show "Data not found" message
            }
        } else if (scanResult && scanResult.data && Array.isArray(scanResult.data)) {
            processScanData(scanResult, category);
        }
        // If no data, UI will show "Data not found" message
    };

    useEffect(() => {
     
        const storedData = localStorage.getItem('scan_result');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                processScanData(parsedData, activeTab);
            } catch (error) {
                // Let UI show "Data not found" message
            }
        } else if (scanResult && scanResult.data && Array.isArray(scanResult.data)) {
            processScanData(scanResult, activeTab);
        }
        // If no data, UI will show "Data not found" message
    }, [scanResult, activeTab, router]);

   

    const formatPrice = (price) => {
    if (!price && price !== 0) return '-'
    if (price === 0) {
      return `$${price.toFixed(5)}`
    } else if (price < 0.01) {
      return `$${price.toFixed(6)}`
    } else if (price < 1) {
      return `$${price.toFixed(4)}`
    } else {
      return `$${price.toFixed(2)}`
    }
  }

  const formatVolume = (volume) => {
    if (!volume) return '-';
    if (volume >= 1e9) {
      return `$${(volume / 1e9).toFixed(2)}B`;
    } else if (volume >= 1e6) {
      return `$${(volume / 1e6).toFixed(2)}M`;
    } else {
      return `$${(volume / 1e3).toFixed(2)}K`;
    }
  }


  const getPercentageIcon = (percentage) => {
    if (percentage > 0) return <img className='arrow-icon' src='/assets/icons/arrow-green.svg' alt='arrow-icon' />
    if (percentage < 0) return <img className='arrow-icon' src='/assets/icons/arrow-red.svg' alt='arrow-icon' />
    return null
  }



const formatMarketCap = (marketCap) => {
    if (!marketCap && marketCap !== 0) return '-';
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${(marketCap / 1e3).toFixed(2)}K`;
    }
  };
  
  const formatRSI = (rsi) => {
    if (!rsi && rsi !== 0) return '-';
    return parseFloat(rsi).toFixed(2);
  };
  
 
    // Get tab labels
    const getTabLabel = (category) => {
        switch (category) {
            case 'neutral':
                return 'Top Neutral';
            case 'strong_bullish':
                return 'Top Bullish Picks';
            case 'strong_bearish':
                return 'Top Bearish Picks';
            default:
                return category;
        }
    };

    return (
        <div>
            <PageHeader />

            <div className='moveOpportunities-section'>
                <div className='moveOpportunities-welcome-line'>
                    <p>Last scan: {formatScanTime(lastScanTime)}</p>

                    <h1 className={`${isDarkMode ? 'dark' : ''}`}>{getTabLabel(activeTab)}</h1>
                </div>

                {/* Tab Navigation */}
                <div className='tabs-container'>
                    <div className='tabs-wrapper'>
                        {['neutral', 'strong_bullish', 'strong_bearish'].map((category) => (
                            <button
                                key={category}
                                className={`tab-button ${activeTab === category ? 'active' : ''} ${isDarkMode ? 'dark' : ''}`}
                                onClick={() => handleTabChange(category)}
                            >
                                {getTabLabel(category)}
                            </button>
                        ))}
                    </div>
                </div>

                                <div className='moveOpportunities-details-alignment'>
                                        <div className='moveOpportunities-grid-alignment'>
                                                {Array.isArray(dataArray) && dataArray.length > 0 ? dataArray.map((coin, idx) => (
                                                    <div className={`moveOpportunities-grid-item-alignment ${isDarkMode ? 'dark' : ''}`} key={coin.id || idx}>
                                                        <div className='moveOpportunities-top-heading'>
                                                            <div className='moveOpportunoties-left-side-alignment'>
                                                                <div className='company-logo-alignment'>
                                                                    <img src={coin?.image} alt="company logo" />
                                                                </div>
                                                                <div className='company-name-alignment'>
                                                                    <h2 className={`${isDarkMode ? 'dark' : ''}`}>{coin.symbol || '-'}</h2>
                                                                    <p className={`${isDarkMode ? 'dark' : ''}`}>{coin.name || '-'}</p>
                                                                </div>
                                                            </div>
                                                            <div className='moveOpportunoties-right-side-alignment'>
                                                                <h3 className={`${isDarkMode ? 'dark' : ''}`}>{formatPrice(coin.current_price)}</h3>
                                                                {/* <div className='rate-alignemnt'>
                                                                    <img src='/assets/icons/up-arrow.svg' alt='up arrow' />
                                                                    <p className={`${isDarkMode ? 'dark' : ''}`}>{formatVolume(coin.total_volume)}(1d)</p>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        <div className='moveOpportunities-child-list-alignment'>
                                                            {/* Market Cap */}
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
                                                                    <h6 className={`${isDarkMode ? 'dark' : ''}`}>{formatMarketCap(coin.market_cap)}</h6>
                                                                </div>
                                                            </div>
                                                            {/* 24h Volume */}
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
                                                                    <h6 className={`${isDarkMode ? 'dark' : ''}`}>{formatVolume(coin.total_volume)}(24h)</h6>
                                                                </div>
                                                            </div>
                                                            {/* RSI */}
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
                                                                    <h6 className={`${isDarkMode ? 'dark' : ''}`}>{formatRSI(coin.rsi)}</h6>
                                                                </div>
                                                            </div>
                                                            {/* WinWave Signal */}
                                                            {/* <div className='moveOpportunities-child-details-alignment'>
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
                                                            </div> */}
                                                            {/* Strength */}
                                                            <div className='moveOpportunities-child-details-alignment'>
                                                                <div className='moveOpportunities-child-left-alignment'>
                                                                    <div className='moveOpportunities-icon'>
                                                                        {isDarkMode ? (
                                                                            <img src='/assets/icons/gray-ranking-podium-empty.svg' alt='ranking podium empty ' />
                                                                        ) : (
                                                                            <img src='/assets/icons/ranking-podium-empty.svg' alt='ranking podium empty ' />
                                                                        )}
                                                                    </div>
                                                                    <div className='moveOpportunities-name'>
                                                                        <span className={`${isDarkMode ? 'dark' : ''}`}>Strength</span>
                                                                    </div>
                                                                </div>
                                                                <div className='right-side-price'>
                                                                    <h6 className={`${isDarkMode ? 'dark' : ''}`}>{coin.strength || '-'}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
   <div className='moveOpportunities-option-details'>
                                <div className='moveOpportunities-grid'>
                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>1h</span>
                                        <div className='rating-alignment'>
                                            <h6 style={{ color: coin.price_change_percentage_1h < 0 ? 'red' : undefined }}>
                                                {getPercentageIcon(coin.price_change_percentage_1h)}
                                                {coin.price_change_percentage_1h?.toFixed(2)}%
                                            </h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>24h</span>
                                        <div className='rating-alignment'>
                                            <h6 style={{ color: coin.price_change_percentage_24h < 0 ? 'red' : undefined }}>
                                                {getPercentageIcon(coin.price_change_percentage_24h)}
                                                {coin.price_change_percentage_24h?.toFixed(2)}%
                                            </h6>
                                        </div>
                                    </div>

                                    <div className={`moveOpportunities-grid-item ${isDarkMode ? 'dark' : ''}`}>
                                        <span className={`${isDarkMode ? 'dark' : ''}`}>7D</span>
                                        <div className='rating-alignment'>
                                            <h6 style={{ color: coin.price_change_percentage_7d < 0 ? 'red' : undefined }}>
                                                {getPercentageIcon(coin.price_change_percentage_7d)}
                                                {coin.price_change_percentage_7d?.toFixed(2)}%
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='moveOpportunities-view-chart-alignment'>
                                <button className={`${isDarkMode ? 'dark' : ''}`}
                                    onClick={() => {
                                        if (coin.id) {
                                            router.push(`/child-move-opportunities?id=${encodeURIComponent(coin.id)}`);
                                        } else {
                                            router.push("/child-move-opportunities");
                                        }
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
                                                )) : (
                                                    <div className="no-data-message" style={{
                                                        textAlign: 'center',
                                                        padding: '60px 20px',
                                                        width: '100%',
                                                        gridColumn: '1 / -1',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        minHeight: '300px'
                                                    }}>
                                                        <div style={{
                                                            background: isDarkMode 
                                                                ? 'linear-gradient(135deg, #2d3748 0%, #4a5568 100%)' 
                                                                : 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
                                                            padding: '40px',
                                                            borderRadius: '20px',
                                                            border: `2px solid ${isDarkMode ? '#4a5568' : '#e2e8f0'}`,
                                                            maxWidth: '500px',
                                                            width: '100%',
                                                            boxShadow: isDarkMode 
                                                                ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
                                                                : '0 10px 25px rgba(0, 0, 0, 0.1)',
                                                            position: 'relative',
                                                            overflow: 'hidden'
                                                        }}>
                                                            {/* Background decoration */}
                                                            <div style={{
                                                                position: 'absolute',
                                                                top: '-50px',
                                                                right: '-50px',
                                                                width: '100px',
                                                                height: '100px',
                                                                background: isDarkMode ? '#4a5568' : '#e2e8f0',
                                                                borderRadius: '50%',
                                                                opacity: 0.1
                                                            }}></div>
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: '-30px',
                                                                left: '-30px',
                                                                width: '60px',
                                                                height: '60px',
                                                                background: isDarkMode ? '#2d3748' : '#f7fafc',
                                                                borderRadius: '50%',
                                                                opacity: 0.1
                                                            }}></div>
                                                            
                                                            {/* Main content */}
                                                            <div style={{ position: 'relative', zIndex: 1 }}>
                                                                <div style={{
                                                                    fontSize: '64px',
                                                                    marginBottom: '24px',
                                                                    background: isDarkMode 
                                                                        ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                                                                        : 'linear-gradient(45deg, #667eea, #764ba2)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                    backgroundClip: 'text',
                                                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                                                                }}>
                                                                    🔍
                                                                </div>
                                                                <h2 style={{
                                                                    color: isDarkMode ? '#e2e8f0' : '#2d3748',
                                                                    marginBottom: '16px',
                                                                    fontSize: '28px',
                                                                    fontWeight: '700',
                                                                    letterSpacing: '-0.5px'
                                                                }}>
                                                                    No Data Available
                                                                </h2>
                                                                <p style={{
                                                                    color: isDarkMode ? '#a0aec0' : '#718096',
                                                                    marginBottom: '32px',
                                                                    fontSize: '18px',
                                                                    lineHeight: '1.6',
                                                                    maxWidth: '400px',
                                                                    margin: '0 auto 32px auto'
                                                                }}>
                                                                    We couldn't find any market data for this category. 
                                                                    <br />
                                                                    <strong>Run a fresh scan</strong> to discover the latest opportunities!
                                                                </p>
                                                              
                                                                <div className="headerrun-button-alignment desktop-scan-button">
								<button onClick={handleScan}>
									<img src="/assets/icons/bit-icon.svg" alt="bit icon" />
									<span>Run Scan</span>
								</button>
							</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                      
                    </div>
                </div>

            </div>
        </div>
    )
}
