import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

// Dynamically import Chart to prevent SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Hook for responsive behavior
const useResponsive = () => {
	const [screenSize, setScreenSize] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: true,
		width: 1200
	});

	useEffect(() => {
		// Check if we're on the client side
		if (typeof window === 'undefined') return;

		const checkScreenSize = () => {
			const width = window.innerWidth;
			setScreenSize({
				isMobile: width <= 480,
				isTablet: width > 480 && width <= 768,
				isDesktop: width > 768,
				width: width
			});
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	return screenSize;
};

// Helper function to process raw data
const processData = (rawData) => {
	if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
		return { series: [], categories: [] };
	}

	const series = rawData.map((item) => {
		return {
			x: new Date(item.time || item.timestamp || new Date()).getTime(),
			y: [item.open, item.high, item.low, item.close]
		};
	});

	const categories = rawData.map((item) => {
		const date = new Date(item.time || item.timestamp || new Date());
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	});

	return { series, categories };
};

// Helper function to format price
const formatPrice = (price) => {
	if (price === undefined || price === null || isNaN(price)) return '$0.00';
	
	if (price >= 1e9) {
		return `$${(price / 1e9).toFixed(1)}B`;
	} else if (price >= 1e6) {
		return `$${(price / 1e6).toFixed(1)}M`;
	} else if (price >= 1e3) {
		return `$${(price / 1e3).toFixed(1)}K`;
	} else {
		return `$${price.toFixed(0)}`;
	}
};

// Helper function to format Y-axis labels (cleaner format)
const formatYAxisLabel = (value) => {
	if (value === undefined || value === null || isNaN(value)) return '0';
	
	if (value >= 1e9) {
		return `${(value / 1e9).toFixed(1)}B`;
	} else if (value >= 1e6) {
		return `${(value / 1e6).toFixed(1)}M`;
	} else if (value >= 1e3) {
		return `${(value / 1e3).toFixed(1)}K`;
	} else {
		return value.toFixed(0);
	}
};

// Helper function to format volume
const formatVolume = (volume) => {
	if (volume === undefined || volume === null || isNaN(volume)) return '0';
	
	if (volume >= 1e9) {
		return `${(volume / 1e9).toFixed(2)}B`;
	} else if (volume >= 1e6) {
		return `${(volume / 1e6).toFixed(2)}M`;
	} else if (volume >= 1e3) {
		return `${(volume / 1e3).toFixed(2)}K`;
	} else {
		return volume.toFixed(2);
	}
};

// Loading state component
const LoadingState = ({ isDarkMode }) => (
	<div style={{ 
		width: '100%', 
		height: '300px',
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center',
		background: 'transparent',
		color: isDarkMode ? '#888' : '#666',
		borderRadius: '8px'
	}}>
		<div style={{ textAlign: 'center' }}>
			<div style={{ 
				fontSize: '24px', 
				marginBottom: '12px',
				animation: 'spin 1s linear infinite'
			}}>
				⏳
			</div>
			<div>Loading chart data...</div>
		</div>
	</div>
);

// Empty state component
const EmptyState = ({ isDarkMode }) => (
	<div style={{ 
		width: '100%', 
		height: '300px',
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center',
		background: 'transparent',
		color: isDarkMode ? '#888' : '#666',
		borderRadius: '8px'
	}}>
		<div style={{ textAlign: 'center' }}>
			<div style={{ fontSize: '24px', marginBottom: '12px' }}>📊</div>
			<div>No chart data available</div>
		</div>
	</div>
);

// Helper function to get responsive values
const getResponsiveValue = (isMobile, isTablet, mobileValue, tabletValue, desktopValue) => {
	if (isMobile) return mobileValue;
	if (isTablet) return tabletValue;
	return desktopValue;
};

// Helper function to create tooltip HTML
const createTooltipHTML = (data, isDarkMode, isMobile) => {
	if (!data?.y) return '';
	
	const [open, high, low, close] = data.y;
	const change = close - open;
	const changePercent = open > 0 ? ((change / open) * 100).toFixed(2) : '0.00';
	const isBullish = change >= 0;
	const date = new Date(data.x);
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
			background: ${isDarkMode ? '#1a1a1a' : '#ffffff'};
			border: 1px solid ${isDarkMode ? '#333' : '#e0e0e0'};
			border-radius: 8px;
			padding: ${isMobile ? '8px 12px' : '12px 16px'};
			box-shadow: 0 4px 12px rgba(0,0,0,0.15);
			font-size: ${isMobile ? '11px' : '13px'};
			color: ${isDarkMode ? '#ffffff' : '#333333'};
			max-width: ${isMobile ? '280px' : '320px'};
			z-index: 1000;
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
						color: ${isBullish ? '#4CAF50' : '#F44336'};
					">
						${change >= 0 ? '+' : ''}${formatPrice(change)} (${changePercent}%)
					</span>
				</div>
			</div>
		</div>
	`;
};

export default function ApexCandlestickChart({ data, isDarkMode, isLoading = false }) {
	const { isMobile, isTablet } = useResponsive();
	const { series } = processData(data);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	// Show loading state
	if (isLoading || !isClient) {
		return <LoadingState isDarkMode={isDarkMode} />;
	}

	// Show empty state
	if (series.length === 0) {
		return <EmptyState isDarkMode={isDarkMode} />;
	}

	// Get responsive values
	const chartHeight = getResponsiveValue(isMobile, isTablet, 250, 300, 350);
	const fontSize = getResponsiveValue(isMobile, isTablet, '10px', '11px', '12px');
	const xAxisRotate = getResponsiveValue(isMobile, isTablet, -45, -30, 0);
	const gridPadding = getResponsiveValue(isMobile, isTablet, 
		{ top: 10, right: 10, bottom: 60, left: 40 },
		{ top: 10, right: 10, bottom: 50, left: 45 },
		{ top: 10, right: 10, bottom: 40, left: 50 }
	);

	// Chart configuration
	const options = {
		chart: {
			type: 'candlestick',
			height: chartHeight,
			background: 'transparent',
			toolbar: {
				show: true,
				tools: {
					download: false,
					selection: false,
					zoom: true,
					zoomin: true,
					zoomout: true,
					pan: false,
					reset: true
				},
				offsetX: 0,
				offsetY: 0,
			},
			zoom: {
				enabled: true,
				type: 'x',
				autoScaleYaxis: true,
			},
			pan: {
				enabled: false
			},
			animations: {
				enabled: true,
				easing: 'easeinout',
				speed: 800,
			}
		},
		series: [{
			name: 'Price',
			data: series
		}],
		title: {
			text: '',
			align: 'left',
			style: {
				fontSize: getResponsiveValue(isMobile, isTablet, '14px', '15px', '16px'),
				fontWeight: 'bold',
				color: isDarkMode ? '#ffffff' : '#333333'
			}
		},
		xaxis: {
			type: 'datetime',
			labels: {
				show: true,
				style: {
					fontSize: fontSize,
					fontWeight: 500,
					color: isDarkMode ? '#B0B0B0' : '#374151'
				},
				rotate: xAxisRotate,
				rotateAlways: isMobile || isTablet,
				datetimeUTC: false,
				format: isMobile ? 'MMM dd' : isTablet ? 'MMM dd' : 'MMM dd HH:mm',
				maxHeight: isMobile ? 60 : isTablet ? 50 : 40
			},
			axisBorder: {
				show: true,
				color: isDarkMode ? '#4A5568' : '#D1D5DB'
			},
			axisTicks: {
				show: true,
				color: isDarkMode ? '#4A5568' : '#D1D5DB'
			},
			tooltip: {
				enabled: false
			}
		},
		yaxis: {
			labels: {
				show: true,
				style: {
					fontSize: fontSize,
					fontWeight: 500,
					color: isDarkMode ? '#B0B0B0' : '#374151'
				},
				formatter: (value) => formatYAxisLabel(value)
			},
			axisBorder: {
				show: true,
				color: isDarkMode ? '#4A5568' : '#D1D5DB'
			},
			axisTicks: {
				show: true,
				color: isDarkMode ? '#4A5568' : '#D1D5DB'
			},
			tooltip: {
				enabled: false
			}
		},
		grid: {
			show: true,
			borderColor: isDarkMode ? '#374151' : '#E5E7EB',
			strokeDashArray: 2,
			opacity: isDarkMode ? 0.3 : 0.4,
			xaxis: {
				lines: {
					show: false
				}
			},
			yaxis: {
				lines: {
					show: true
				}
			},
			padding: gridPadding
		},
		tooltip: {
			enabled: true,
			shared: false,
			intersect: false,
			followCursor: true,
			custom: function({ series, seriesIndex, dataPointIndex, w }) {
				const data = w.globals.initialSeries[seriesIndex]?.data[dataPointIndex];
				return createTooltipHTML(data, isDarkMode, isMobile);
			}
		},
		plotOptions: {
			candlestick: {
				colors: {
					upward: isDarkMode ? '#10B981' : '#059669',
					downward: isDarkMode ? '#EF4444' : '#DC2626'
				},
				wick: {
					useFillColor: true
				}
			}
		},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					height: 250,
					toolbar: {
						show: true,
						tools: {
							download: false,
							selection: false,
							zoom: true,
							zoomin: true,
							zoomout: true,
							pan: false,
							reset: true
						}
					}
				},
				xaxis: {
					labels: {
						rotate: -45,
						rotateAlways: true,
						style: {
							fontSize: '10px',
							color: isDarkMode ? '#B0B0B0' : '#374151'
						},
						format: 'MMM dd'
					}
				},
				yaxis: {
					labels: {
						style: {
							fontSize: '10px',
							color: isDarkMode ? '#B0B0B0' : '#374151'
						},
						formatter: (value) => formatYAxisLabel(value)
					}
				},
				grid: {
					borderColor: isDarkMode ? '#374151' : '#E5E7EB',
					padding: {
						top: 10,
						right: 10,
						bottom: 60,
						left: 40
					}
				}
			}
		}, {
			breakpoint: 768,
			options: {
				chart: {
					height: 300,
					toolbar: {
						show: true,
						tools: {
							download: false,
							selection: false,
							zoom: true,
							zoomin: true,
							zoomout: true,
							pan: false,
							reset: true
						}
					}
				},
				xaxis: {
					labels: {
						rotate: -30,
						rotateAlways: true,
						style: {
							fontSize: '11px',
							color: isDarkMode ? '#B0B0B0' : '#374151'
						},
						format: 'MMM dd'
					}
				},
				yaxis: {
					labels: {
						style: {
							fontSize: '11px',
							color: isDarkMode ? '#B0B0B0' : '#374151'
						},
						formatter: (value) => formatYAxisLabel(value)
					}
				},
				grid: {
					borderColor: isDarkMode ? '#374151' : '#E5E7EB',
					padding: {
						top: 10,
						right: 10,
						bottom: 50,
						left: 45
					}
				}
			}
		}]
	};

	return (
		<div style={{ 
			width: '100%', 
			background: 'transparent',
			borderRadius: '8px',
			overflow: 'hidden',
			position: 'relative'
		}}>
			<Chart
				options={options}
				series={options.series}
				type="candlestick"
				height={options.chart.height}
				width="100%"
			/>
		</div>
	);
}

ApexCandlestickChart.propTypes = {
	data: PropTypes.array,
	isDarkMode: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
};

ApexCandlestickChart.defaultProps = {
	data: [],
	isLoading: false,
};

LoadingState.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
};

EmptyState.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
};
