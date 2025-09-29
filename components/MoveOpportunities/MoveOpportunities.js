import React from 'react'
import PageHeader from '../PageHeader/PageHeader'
import "./MoveOpportunities.scss";
import { useTheme } from '../../context/ThemeContext';
import { useScan } from '../../context/ScanContext';
import { useRouter } from 'next/navigation';
import { formatScanTime } from '../../lib/timeUtils';

export default function MoveOpportunities() {
    const { isDarkMode } = useTheme();
    const { scanResult, lastScanTime, isLoading, categoryHeading, setLoadingState, isCategoryLoading } = useScan();
    const router = useRouter();

    // Get the data array, handling different data structures
    const dataArray = scanResult?.data || (Array.isArray(scanResult) ? scanResult : []);


    // Redirect to market-breakouts if no scan data available (but not during initial load or loading)
    React.useEffect(() => {
        // Check if we have valid data without depending on dataArray
        const hasValidData = scanResult && 
            ((Array.isArray(scanResult?.data) && scanResult.data.length > 0) || 
             (Array.isArray(scanResult) && scanResult.length > 0));
        
        if (!isLoading && !hasValidData) {
            router.push('/market-breakouts');
        }
    }, [scanResult, router, isLoading]);

    // Ensure loading state is false if we have data (but only if not currently loading from API)
    React.useEffect(() => {
        if (scanResult && Array.isArray(scanResult?.data) && scanResult.data.length > 0 && isLoading) {
            // Only reset loading state if this data came from localStorage (not from a fresh API call)
            // We can detect this by checking if the data was just updated (within last 2 seconds)
            const now = new Date();
            const scanTime = new Date(lastScanTime);
            const timeDiff = now - scanTime;
            
            // If data is older than 2 seconds, it's from localStorage, so we can reset loading
            if (timeDiff > 2000) {
                setLoadingState(false);
            }
        }
    }, [scanResult, isLoading, setLoadingState, lastScanTime]);

    // Show loading state during initial load or when loading
    if (isLoading || isCategoryLoading) {
        return (
            <div>
                <PageHeader />
                <div className="loading-container">
                    <div className={`loading-spinner ${isDarkMode ? 'dark' : ''}`}>
                        <img src="/assets/icons/loading-icon.svg" alt="Loading" className="spinner" />
                        <div>Loading market data...</div>
                    </div>
                </div>
            </div>
        );
    }

    // Don't redirect during render - this will be handled in useEffect
    // If no data and not loading, show nothing (redirect will happen in useEffect)
    if (!isLoading && !isCategoryLoading && (!scanResult || dataArray.length === 0)) {
        return null;
    }


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
  
 
    return (
        <div>
            <PageHeader />

            <div className='moveOpportunities-section'>
                <div className='moveOpportunities-welcome-line'>
                    <p>Last scan: {formatScanTime(lastScanTime)}</p>

                    <h1 className={`${isDarkMode ? 'dark' : ''}`}>{categoryHeading}</h1>
                </div>

                                <div className='moveOpportunities-details-alignment'>
                                        <div className='moveOpportunities-grid-alignment'>
                                                {Array.isArray(scanResult?.data) && scanResult.data.map((coin, idx) => (
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
                                                ))}

                      
                    </div>
                </div>

            </div>
        </div>
    )
}
