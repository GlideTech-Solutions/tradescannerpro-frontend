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

	const series = rawData.map((item, index) => {
		// Ensure we have valid numeric values
		const open = parseFloat(item.open);
		const high = parseFloat(item.high);
		const low = parseFloat(item.low);
		const close = parseFloat(item.close);
		
		// Validate data integrity
		if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
			return null;
		}
		
		// Don't force high/low validation - use original values
		// This was causing all values to be the same
		const finalOpen = open;
		const finalHigh = high;
		const finalLow = low;
		const finalClose = close;
		
		// Ensure we have a valid time
		let timestamp;
		if (item.time) {
			timestamp = new Date(item.time).getTime();
		} else if (item.timestamp) {
			timestamp = new Date(item.timestamp).getTime();
		} else {
			timestamp = new Date().getTime() + (index * 60000); // Fallback with 1-minute intervals
		}
		
		// Validate timestamp
		if (isNaN(timestamp)) {
			timestamp = new Date().getTime() + (index * 60000);
		}
		
		const result = {
			x: timestamp, // Use timestamp for proper tooltip display
			y: [finalOpen, finalHigh, finalLow, finalClose],
			volume: parseFloat(item.volume) || 0,
			timestamp: timestamp, // Store original timestamp for tooltip
			dayNumber: index + 1 // Store day number for reference
		};
		
		return result;
	}).filter(item => item !== null);

	const categories = series.map((item, index) => {
		if (item && item.timestamp && item.timestamp > 0) {
			const date = new Date(item.timestamp);
			return date.getDate().toString();
		}
		return (index + 1).toString();
	});

	return { series, categories };
};

// Helper function to format price
const formatPrice = (price) => {
	if (price === undefined || price === null || isNaN(price)) {
		return '$0.000000';
	}
	
	if (price >= 1e9) {
		return `$${(price / 1e9).toFixed(1)}B`;
	} else if (price >= 1e6) {
		return `$${(price / 1e6).toFixed(1)}M`;
	} else if (price >= 1e3) {
		return `$${(price / 1e3).toFixed(1)}K`;
	} else if (price >= 1) {
		return `$${price.toFixed(2)}`;
	} else if (price >= 0.01) {
		return `$${price.toFixed(4)}`;
	} else if (price >= 0.001) {
		return `$${price.toFixed(6)}`;
	} else if (price >= 0.0001) {
		return `$${price.toFixed(8)}`;
	} else {
		return `$${price.toFixed(10)}`;
	}
};

// Helper function to format Y-axis labels (cleaner format)
const formatYAxisLabel = (value) => {
	if (value === undefined || value === null || isNaN(value)) return '$0.000000';
	
	// Format as currency for better readability
	if (value >= 1) {
		return `$${value.toFixed(2)}`;
	} else if (value >= 0.01) {
		return `$${value.toFixed(4)}`;
	} else if (value >= 0.001) {
		return `$${value.toFixed(6)}`;
	} else if (value >= 0.0001) {
		return `$${value.toFixed(8)}`;
	} else {
		return `$${value.toFixed(10)}`;
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
	if (!data?.y || !Array.isArray(data.y) || data.y.length < 4) {
		return '';
	}
	
	const [open, high, low, close] = data.y;
	const volume = data.volume || 0;
	
	// Validate all values are present
	if (open === undefined || high === undefined || low === undefined || close === undefined) {
		return '';
	}
	
	const change = close - open;
	const changePercent = open > 0 ? ((change / open) * 100).toFixed(2) : '0.00';
	const isBullish = change >= 0;
	
	// Handle timestamp properly - use the stored timestamp or fallback
	let date;
	if (data.timestamp && data.timestamp > 0) {
		date = new Date(data.timestamp);
	} else if (data.x && data.x > 0) {
		date = new Date(data.x);
	} else {
		// Fallback to current date if timestamp is invalid
		date = new Date();
	}
	
	const formattedTime = date.toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
	
	const formattedOpen = formatPrice(open);
	const formattedHigh = formatPrice(high);
	const formattedLow = formatPrice(low);
	const formattedClose = formatPrice(close);
	const formattedVolume = formatVolume(volume);

	return `
		<div style="
			background: ${isDarkMode ? '#1a1a1a' : '#ffffff'};
			border: 1px solid ${isDarkMode ? '#333' : '#e0e0e0'};
			border-radius: 8px;
			padding: ${isMobile ? '12px 16px' : '16px 20px'};
			box-shadow: 0 4px 12px rgba(0,0,0,0.15);
			font-size: ${isMobile ? '11px' : '12px'};
			color: ${isDarkMode ? '#ffffff' : '#333333'};
			width: ${isMobile ? '260px' : '300px'};
			z-index: 1000;
			white-space: nowrap;
			overflow: visible;
		">
			<div style="
				margin-bottom: ${isMobile ? '8px' : '10px'};
				font-weight: bold;
				font-size: ${isMobile ? '13px' : '14px'};
				color: ${isDarkMode ? '#ffffff' : '#1f2937'};
			">
				${formattedTime}
			</div>
			<div style="
				display: flex;
				flex-direction: column;
				gap: ${isMobile ? '4px' : '6px'};
			">
				<div style="display: flex; justify-content: space-between; align-items: center; min-width: 0;">
					<span style="color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; font-size: ${isMobile ? '11px' : '12px'}; min-width: 40px;">Open:</span>
					<span style="font-weight: bold; color: ${isDarkMode ? '#ffffff' : '#1f2937'}; font-size: ${isMobile ? '12px' : '13px'};">${formattedOpen}</span>
				</div>
				<div style="display: flex; justify-content: space-between; align-items: center; min-width: 0;">
					<span style="color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; font-size: ${isMobile ? '11px' : '12px'}; min-width: 40px;">High:</span>
					<span style="font-weight: bold; color: ${isDarkMode ? '#ffffff' : '#1f2937'}; font-size: ${isMobile ? '12px' : '13px'};">${formattedHigh}</span>
				</div>
				<div style="display: flex; justify-content: space-between; align-items: center; min-width: 0;">
					<span style="color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; font-size: ${isMobile ? '11px' : '12px'}; min-width: 40px;">Low:</span>
					<span style="font-weight: bold; color: ${isDarkMode ? '#ffffff' : '#1f2937'}; font-size: ${isMobile ? '12px' : '13px'};">${formattedLow}</span>
				</div>
				<div style="display: flex; justify-content: space-between; align-items: center; min-width: 0;">
					<span style="color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; font-size: ${isMobile ? '11px' : '12px'}; min-width: 40px;">Close:</span>
					<span style="font-weight: bold; color: ${isDarkMode ? '#ffffff' : '#1f2937'}; font-size: ${isMobile ? '12px' : '13px'};">${formattedClose}</span>
				</div>
				<div style="display: flex; justify-content: space-between; align-items: center; min-width: 0;">
					<span style="color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; font-size: ${isMobile ? '11px' : '12px'}; min-width: 40px;">Volume:</span>
					<span style="font-weight: bold; color: ${isDarkMode ? '#ffffff' : '#1f2937'}; font-size: ${isMobile ? '12px' : '13px'};">${formattedVolume}</span>
				</div>
				<div style="display: flex; justify-content: space-between; align-items: center; min-width: 0;">
					<span style="color: ${isDarkMode ? '#9ca3af' : '#6b7280'}; font-size: ${isMobile ? '11px' : '12px'}; min-width: 40px;">Change:</span>
					<span style="
						font-weight: bold;
						color: ${isBullish ? '#10b981' : '#ef4444'};
						font-size: ${isMobile ? '12px' : '13px'};
					">
						${change >= 0 ? '+' : ''}${formatPrice(change)} (${changePercent}%)
					</span>
				</div>
			</div>
		</div>
	`;
};

export default function ApexCandlestickChart({ data, isDarkMode, isLoading = false, timeframe = '1m' }) {
	const { isMobile, isTablet } = useResponsive();
	const [isClient, setIsClient] = useState(false);

	const { series: processedSeries } = processData(data);
	
	// Format series for ApexCharts candlestick
	const series = [{
		name: 'Price',
		data: processedSeries
	}];

	// Debug: Log the processed series data

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
		theme: {
			mode: isDarkMode ? 'dark' : 'light',
		},
		chart: {
			type: 'candlestick',
			height: chartHeight,
			background: 'transparent',
			foreColor: isDarkMode ? '#FFFFFF' : '#000000',
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
				enabled: false,
				type: 'x',
				autoScaleYaxis: true,
			},
			sparkline: {
				enabled: false
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
					color: isDarkMode ? '#FFFFFF' : '#000000'
				},
				rotate: 0,
				rotateAlways: false,
				maxHeight: isMobile ? 60 : isTablet ? 50 : 40,
				trim: false,
				hideOverlappingLabels: true,
				showDuplicates: false,
				datetimeUTC: false,
				formatter: function(value, timestamp) {
					const date = new Date(timestamp);
					
					// Format based on timeframe
					if (timeframe === '1d') {
						// For 1 day, show hours (e.g., "00:00", "04:00")
						const hours = date.getHours().toString().padStart(2, '0');
						const minutes = date.getMinutes().toString().padStart(2, '0');
						return `${hours}:${minutes}`;
					} else if (timeframe === '7d') {
						// For 7 days, show month and day (e.g., "Jan 1")
						const month = date.toLocaleString('en-US', { month: 'short' });
						const day = date.getDate();
						return `${month} ${day}`;
					} else {
						// For 1 month, show date (e.g., "1", "5", "10")
						return date.getDate().toString();
					}
				}
			},
			tickAmount: timeframe === '1d' ? 12 : timeframe === '7d' ? 7 : processedSeries.length > 30 ? 30 : processedSeries.length - 1,
			tickPlacement: 'between',
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
					color: isDarkMode ? '#FFFFFF' : '#000000'
				},
				formatter: (value) => formatYAxisLabel(value)
			},
			tickAmount: isMobile ? 4 : 6,
			min: undefined,
			max: undefined,
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
			position: function(dataPoint, dataPointIndex, dataPointSeriesIndex, w) {
				// Position tooltip to avoid going off-screen
				const tooltipWidth = isMobile ? 280 : 320;
				const tooltipHeight = isMobile ? 180 : 220;
				const chartWidth = w.globals.svgWidth;
				const chartHeight = w.globals.svgHeight;
				
				let x = dataPoint.x;
				let y = dataPoint.y;
				
				// Adjust X position if tooltip would go off right edge
				if (x + tooltipWidth > chartWidth) {
					x = chartWidth - tooltipWidth - 10;
				}
				
				// Adjust Y position if tooltip would go off bottom edge
				if (y + tooltipHeight > chartHeight) {
					y = chartHeight - tooltipHeight - 10;
				}
				
				// Ensure tooltip doesn't go off left or top edges
				x = Math.max(10, x);
				y = Math.max(10, y);
				
				return { x, y };
			},
		custom: function({ series, seriesIndex, dataPointIndex, w }) {
			// Get data from the most reliable source - our processed series
			let open, high, low, close, volume, timestamp;
			
			// Primary method: Get from our processed series data
			if (w.config && w.config.series && w.config.series[seriesIndex] && w.config.series[seriesIndex].data) {
				const ourData = w.config.series[seriesIndex].data[dataPointIndex];
				
				if (ourData && ourData.y && Array.isArray(ourData.y) && ourData.y.length >= 4) {
					[open, high, low, close] = ourData.y;
					timestamp = ourData.timestamp || ourData.x;
					volume = ourData.volume || 0;
				}
			}
			
			// Fallback method: Try from series data directly
			if (!open && series && series[seriesIndex] && series[seriesIndex][dataPointIndex]) {
				const seriesData = series[seriesIndex][dataPointIndex];
				
				if (Array.isArray(seriesData) && seriesData.length >= 4) {
					[open, high, low, close] = seriesData;
				}
			}
			
			// Validate that we have all required values
			if (open === undefined || high === undefined || low === undefined || close === undefined) {
				console.warn('Tooltip: Missing OHLC data for point', dataPointIndex);
				return '';
			}
			
			// Create data object in expected format
			const data = {
				x: timestamp || new Date().getTime(),
				y: [open, high, low, close],
				volume: volume || 0,
				timestamp: timestamp || new Date().getTime(),
				dayNumber: dataPointIndex + 1
			};
			
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
				},
				dataLabels: {
					enabled: false
				}
			}
		},
		stroke: {
			show: true,
			curve: 'straight',
			lineCap: 'butt',
			colors: undefined,
			width: 2,
			dashArray: 0
		},
		responsive: [{
			breakpoint: 480,
			options: {
				chart: {
					height: 280,
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
					type: 'datetime',
					labels: {
						show: true,
						rotate: 0,
						rotateAlways: false,
						style: {
							fontSize: '9px',
							color: isDarkMode ? '#FFFFFF' : '#000000'
						},
						trim: false,
						hideOverlappingLabels: true,
						showDuplicates: false,
						maxHeight: 40,
						datetimeUTC: false,
						formatter: function(value, timestamp) {
							const date = new Date(timestamp);
							
							// Format based on timeframe
							if (timeframe === '1d') {
								const hours = date.getHours().toString().padStart(2, '0');
								const minutes = date.getMinutes().toString().padStart(2, '0');
								return `${hours}:${minutes}`;
							} else if (timeframe === '7d') {
								const month = date.toLocaleString('en-US', { month: 'short' });
								const day = date.getDate();
								return `${month} ${day}`;
							} else {
								return date.getDate().toString();
							}
						}
					},
					tickAmount: timeframe === '1d' ? 6 : timeframe === '7d' ? 7 : processedSeries.length > 10 ? 10 : processedSeries.length - 1,
					tickPlacement: 'between'
				},
				yaxis: {
					labels: {
						show: true,
						style: {
							fontSize: '9px',
							color: isDarkMode ? '#FFFFFF' : '#000000'
						},
						formatter: (value) => formatYAxisLabel(value),
						maxWidth: 50
					},
					tickAmount: 4
				},
				grid: {
					borderColor: isDarkMode ? '#374151' : '#E5E7EB',
					padding: {
						top: 10,
						right: 5,
						bottom: 70,
						left: 35
					}
				}
			}
		}, {
			breakpoint: 768,
			options: {
				chart: {
					height: 350,
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
					type: 'datetime',
					labels: {
						show: true,
						rotate: 0,
						rotateAlways: false,
						style: {
							fontSize: '10px',
							color: isDarkMode ? '#FFFFFF' : '#000000'
						},
						trim: false,
						hideOverlappingLabels: true,
						showDuplicates: false,
						maxHeight: 50,
						datetimeUTC: false,
						formatter: function(value, timestamp) {
							const date = new Date(timestamp);
							
							// Format based on timeframe
							if (timeframe === '1d') {
								const hours = date.getHours().toString().padStart(2, '0');
								const minutes = date.getMinutes().toString().padStart(2, '0');
								return `${hours}:${minutes}`;
							} else if (timeframe === '7d') {
								const month = date.toLocaleString('en-US', { month: 'short' });
								const day = date.getDate();
								return `${month} ${day}`;
							} else {
								return date.getDate().toString();
							}
						}
					},
					tickAmount: timeframe === '1d' ? 8 : timeframe === '7d' ? 7 : processedSeries.length > 12 ? 12 : processedSeries.length - 1,
					tickPlacement: 'between'
				},
				yaxis: {
					labels: {
						show: true,
						style: {
							fontSize: '10px',
							color: isDarkMode ? '#FFFFFF' : '#000000'
						},
						formatter: (value) => formatYAxisLabel(value),
						maxWidth: 60
					},
					tickAmount: 5
				},
				grid: {
					borderColor: isDarkMode ? '#374151' : '#E5E7EB',
					padding: {
						top: 10,
						right: 10,
						bottom: 60,
						left: 45
					}
				}
			}
		}, {
			breakpoint: 1024,
			options: {
				chart: {
					height: 400,
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
					type: 'datetime',
					labels: {
						show: true,
						rotate: 0,
						rotateAlways: false,
						style: {
							fontSize: '11px',
							color: isDarkMode ? '#FFFFFF' : '#000000'
						},
						trim: false,
						hideOverlappingLabels: true,
						showDuplicates: false,
						datetimeUTC: false,
						formatter: function(value, timestamp) {
							const date = new Date(timestamp);
							
							// Format based on timeframe
							if (timeframe === '1d') {
								const hours = date.getHours().toString().padStart(2, '0');
								const minutes = date.getMinutes().toString().padStart(2, '0');
								return `${hours}:${minutes}`;
							} else if (timeframe === '7d') {
								const month = date.toLocaleString('en-US', { month: 'short' });
								const day = date.getDate();
								return `${month} ${day}`;
							} else {
								return date.getDate().toString();
							}
						}
					},
					tickAmount: timeframe === '1d' ? 10 : timeframe === '7d' ? 7 : processedSeries.length > 15 ? 15 : processedSeries.length - 1,
					tickPlacement: 'between'
				},
				yaxis: {
					labels: {
						show: true,
						style: {
							fontSize: '11px',
							color: isDarkMode ? '#FFFFFF' : '#000000'
						},
						formatter: (value) => formatYAxisLabel(value)
					},
					tickAmount: 6
				},
				grid: {
					borderColor: isDarkMode ? '#374151' : '#E5E7EB',
					padding: {
						top: 10,
						right: 15,
						bottom: 40,
						left: 50
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
			position: 'relative',
			minHeight: '300px'
		}}>
			<Chart
				key={`chart-${isDarkMode ? 'dark' : 'light'}-${timeframe}`}
				options={options}
				series={series}
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
	timeframe: PropTypes.string,
};

ApexCandlestickChart.defaultProps = {
	data: [],
	isLoading: false,
	timeframe: '1m',
};

LoadingState.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
};

EmptyState.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
};
