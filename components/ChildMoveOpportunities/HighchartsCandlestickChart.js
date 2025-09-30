import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const HighchartsReact = dynamic(() => import('highcharts-react-official'), { ssr: false });

// Custom hook for responsive design
const useResponsive = () => {
	const [screenSize, setScreenSize] = useState('desktop');

	useEffect(() => {
		const checkScreenSize = () => {
			if (typeof window !== 'undefined') {
				const width = window.innerWidth;
				if (width <= 480) {
					setScreenSize('mobile');
				} else if (width <= 768) {
					setScreenSize('tablet');
				} else {
					setScreenSize('desktop');
				}
			}
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	return {
		isMobile: screenSize === 'mobile',
		isTablet: screenSize === 'tablet',
		isDesktop: screenSize === 'desktop'
	};
};

// Process data for candlestick chart
const processData = (rawData) => {
	if (!rawData || !Array.isArray(rawData)) return [];
	
	return rawData.map(item => {
		const [timestamp, open, high, low, close, volume] = item;
		return [
			new Date(timestamp).getTime(), // Convert to timestamp
			parseFloat(open),
			parseFloat(high),
			parseFloat(low),
			parseFloat(close),
			parseFloat(volume) || 0
		];
	}).filter(item => !isNaN(item[1]) && !isNaN(item[2]) && !isNaN(item[3]) && !isNaN(item[4]));
};

// Format price values
const formatPrice = (price) => {
	if (price >= 1) {
		return `$${price.toFixed(2)}`;
	} else if (price >= 0.01) {
		return `$${price.toFixed(4)}`;
	} else {
		return `$${price.toFixed(8)}`;
	}
};

// Format Y-axis labels
const formatYAxisLabel = (value) => {
	if (value >= 1) {
		return `$${value.toFixed(2)}`;
	} else if (value >= 0.01) {
		return `$${value.toFixed(4)}`;
	} else {
		return `$${value.toFixed(6)}`;
	}
};

// Format volume
const formatVolume = (volume) => {
	if (volume >= 1e9) {
		return `${(volume / 1e9).toFixed(2)}B`;
	} else if (volume >= 1e6) {
		return `${(volume / 1e6).toFixed(2)}M`;
	} else if (volume >= 1e3) {
		return `${(volume / 1e3).toFixed(2)}K`;
	} else {
		return volume.toFixed(0);
	}
};

// Loading state component
const LoadingState = ({ isDarkMode }) => (
	<div style={{
		height: '350px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
		borderRadius: '12px',
		border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`
	}}>
		<div style={{
			textAlign: 'center',
			color: isDarkMode ? '#ffffff' : '#333333'
		}}>
			<div style={{
				width: '40px',
				height: '40px',
				border: `3px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
				borderTop: `3px solid ${isDarkMode ? '#10B981' : '#059669'}`,
				borderRadius: '50%',
				animation: 'spin 1s linear infinite',
				margin: '0 auto 16px'
			}}></div>
			<div>Loading chart...</div>
		</div>
		<style jsx>{`
			@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
			}
		`}</style>
	</div>
);

// Empty state component
const EmptyState = ({ isDarkMode }) => (
	<div style={{
		height: '350px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
		borderRadius: '12px',
		border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`
	}}>
		<div style={{
			textAlign: 'center',
			color: isDarkMode ? '#ffffff' : '#333333'
		}}>
			<div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
			<div>No chart data available</div>
		</div>
	</div>
);

// Create tooltip HTML
const createTooltipHTML = (data, isDarkMode, isMobile) => {
	const [timestamp, open, high, low, close, volume] = data;
	const change = close - open;
	const changePercent = open !== 0 ? ((change / open) * 100).toFixed(2) : '0.00';
	const isBullish = change >= 0;
	const date = new Date(timestamp);
	const formattedTime = date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

	return `
		<div style="
			padding: ${isMobile ? '8px 12px' : '12px 16px'};
			max-width: ${isMobile ? '280px' : '320px'};
		">
			<div style="
				margin-bottom: ${isMobile ? '6px' : '8px'};
				font-weight: bold;
				font-size: ${isMobile ? '12px' : '13px'};
			">
				${formattedTime}
			</div>
			<div style="
				display: grid;
				grid-template-columns: ${isMobile ? '1fr' : '1fr 1fr'};
				gap: ${isMobile ? '6px' : '4px'};
			">
				<div style="display: flex; justify-content: space-between;">
					<span style="color: ${isDarkMode ? '#888' : '#666'};">Open:</span>
					<span style="font-weight: bold;">${formatPrice(open)}</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="color: ${isDarkMode ? '#888' : '#666'};">High:</span>
					<span style="font-weight: bold;">${formatPrice(high)}</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="color: ${isDarkMode ? '#888' : '#666'};">Low:</span>
					<span style="font-weight: bold;">${formatPrice(low)}</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="color: ${isDarkMode ? '#888' : '#666'};">Close:</span>
					<span style="font-weight: bold;">${formatPrice(close)}</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="color: ${isDarkMode ? '#888' : '#666'};">Change:</span>
					<span style="
						font-weight: bold;
						color: ${isBullish ? '#10B981' : '#EF4444'};
					">
						${change >= 0 ? '+' : ''}${formatPrice(Math.abs(change))} (${changePercent}%)
					</span>
				</div>
				<div style="display: flex; justify-content: space-between;">
					<span style="color: ${isDarkMode ? '#888' : '#666'};">Volume:</span>
					<span style="font-weight: bold;">${formatVolume(volume)}</span>
				</div>
			</div>
		</div>
	`;
};

export default function HighchartsCandlestickChart({ data, isDarkMode, isLoading = false }) {
	const { isMobile, isTablet } = useResponsive();
	const chartData = processData(data);
	const [isClient, setIsClient] = useState(false);
	const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
	const [Highcharts, setHighcharts] = useState(null);
	const chartRef = useRef(null);

	useEffect(() => {
		setIsClient(true);
		
		// Initialize Highcharts on client side
		if (typeof window !== 'undefined') {
			Promise.all([
				import('highcharts'),
				import('highcharts/modules/exporting'),
				import('highcharts/modules/accessibility')
			]).then(([HighchartsModule, ExportingModule, AccessibilityModule]) => {
				const HighchartsInstance = HighchartsModule.default;
				
				// Initialize modules
				ExportingModule.default(HighchartsInstance);
				AccessibilityModule.default(HighchartsInstance);
				
				setHighcharts(HighchartsInstance);
			}).catch((error) => {
				console.error('Error loading Highcharts:', error);
			});
		}
	}, []);

	// Timeframe options
	const timeframes = [
		{ label: '1D', value: '1D' },
		{ label: '7D', value: '7D' },
		{ label: '1M', value: '1M' },
		{ label: '3M', value: '3M' },
		{ label: '1Y', value: '1Y' }
	];

	if (isLoading || !isClient || !Highcharts) {
		return <LoadingState isDarkMode={isDarkMode} />;
	}

	if (chartData.length === 0) {
		return <EmptyState isDarkMode={isDarkMode} />;
	}

	// Chart configuration
	const options = {
		chart: {
			type: 'candlestick',
			height: isMobile ? 250 : isTablet ? 300 : 350,
			backgroundColor: 'transparent',
			spacing: [10, 10, 10, 10],
			style: {
				fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
			}
		},
		title: {
			text: ''
		},
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		xAxis: {
			type: 'datetime',
			labels: {
				style: {
					fontSize: isMobile ? '10px' : '12px',
					color: isDarkMode ? '#ffffff' : '#333333'
				},
				formatter: function() {
					const date = new Date(this.value);
					if (isMobile || isTablet) {
						return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
					}
					return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
				}
			},
			gridLineColor: isDarkMode ? '#374151' : '#E5E7EB',
			lineColor: isDarkMode ? '#4A5568' : '#D1D5DB',
			tickColor: isDarkMode ? '#4A5568' : '#D1D5DB'
		},
		yAxis: {
			title: {
				text: ''
			},
			labels: {
				style: {
					fontSize: isMobile ? '10px' : '12px',
					color: isDarkMode ? '#ffffff' : '#333333'
				},
				formatter: function() {
					return formatYAxisLabel(this.value);
				}
			},
			gridLineColor: isDarkMode ? '#374151' : '#E5E7EB',
			lineColor: isDarkMode ? '#4A5568' : '#D1D5DB',
			tickColor: isDarkMode ? '#4A5568' : '#D1D5DB'
		},
		plotOptions: {
			candlestick: {
				color: isDarkMode ? '#EF4444' : '#DC2626',
				upColor: isDarkMode ? '#10B981' : '#059669',
				lineColor: isDarkMode ? '#EF4444' : '#DC2626',
				upLineColor: isDarkMode ? '#10B981' : '#059669',
				states: {
					hover: {
						enabled: true,
						brightness: 0.1
					}
				}
			}
		},
		series: [{
			name: 'Price',
			data: chartData,
			type: 'candlestick'
		}],
		tooltip: {
			enabled: true,
			useHTML: true,
			backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
			borderColor: isDarkMode ? '#333' : '#e0e0e0',
			borderRadius: 8,
			shadow: {
				color: 'rgba(0, 0, 0, 0.1)',
				offsetX: 0,
				offsetY: 2,
				opacity: 0.1,
				width: 3
			},
			style: {
				fontSize: isMobile ? '11px' : '13px',
				color: isDarkMode ? '#ffffff' : '#333333'
			},
			formatter: function() {
				const point = this.point;
				const [timestamp, open, high, low, close, volume] = point.options;
				return createTooltipHTML([timestamp, open, high, low, close, volume], isDarkMode, isMobile);
			}
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: 480
				},
				chartOptions: {
					chart: {
						height: 250
					},
					xAxis: {
						labels: {
							style: {
								fontSize: '10px'
							}
						}
					},
					yAxis: {
						labels: {
							style: {
								fontSize: '10px'
							}
						}
					}
				}
			}]
		},
		exporting: {
			enabled: false
		}
	};

	return (
		<div style={{
			width: '100%',
			backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
			borderRadius: '12px',
			border: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
			overflow: 'hidden'
		}}>
			{/* Timeframe Selection */}
			<div style={{
				display: 'flex',
				padding: '16px 16px 0 16px',
				gap: '8px',
				flexWrap: 'wrap'
			}}>
				{timeframes.map((timeframe) => (
					<button
						key={timeframe.value}
						onClick={() => setSelectedTimeframe(timeframe.value)}
						style={{
							padding: isMobile ? '6px 12px' : '8px 16px',
							fontSize: isMobile ? '12px' : '14px',
							fontWeight: '500',
							border: 'none',
							borderRadius: '6px',
							cursor: 'pointer',
							transition: 'all 0.2s ease',
							backgroundColor: selectedTimeframe === timeframe.value 
								? (isDarkMode ? '#10B981' : '#059669')
								: (isDarkMode ? '#2a2a2a' : '#f5f5f5'),
							color: selectedTimeframe === timeframe.value 
								? '#ffffff'
								: (isDarkMode ? '#ffffff' : '#333333'),
							border: selectedTimeframe === timeframe.value 
								? 'none'
								: `1px solid ${isDarkMode ? '#444' : '#ddd'}`
						}}
						onMouseEnter={(e) => {
							if (selectedTimeframe !== timeframe.value) {
								e.target.style.backgroundColor = isDarkMode ? '#3a3a3a' : '#e5e5e5';
							}
						}}
						onMouseLeave={(e) => {
							if (selectedTimeframe !== timeframe.value) {
								e.target.style.backgroundColor = isDarkMode ? '#2a2a2a' : '#f5f5f5';
							}
						}}
					>
						{timeframe.label}
					</button>
				))}
			</div>

			{/* Chart Container */}
			<div style={{ padding: '16px' }}>
				{Highcharts && (
					<HighchartsReact
						highcharts={Highcharts}
						options={options}
						ref={chartRef}
					/>
				)}
			</div>
		</div>
	);
}

HighchartsCandlestickChart.propTypes = {
	data: PropTypes.array,
	isDarkMode: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool
};
