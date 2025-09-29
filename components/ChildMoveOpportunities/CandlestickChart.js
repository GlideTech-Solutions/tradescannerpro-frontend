import React, { useState, useEffect } from 'react';
import {
	ResponsiveContainer,
	ComposedChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Bar,
} from "recharts";
import PropTypes from "prop-types";

// Custom Candlestick Component
const CandlestickBar = (props) => {
	const { payload, x, y, width, height, isDarkMode } = props;
	
	if (!payload) return null;
	
	const { open, high, low, close } = payload;
	
	// Validate data
	if (open === undefined || high === undefined || low === undefined || close === undefined ||
		isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
		return null;
	}
	
	// Ensure valid price range
	if (high <= low || high <= 0 || low <= 0) {
		return null;
	}
	
	const isBullish = close >= open;
	
	// Theme colors
	const bullishColor = isDarkMode ? '#4CAF50' : '#2AD69D';
	const bearishColor = isDarkMode ? '#F44336' : '#FF6B6B';
	const color = isBullish ? bullishColor : bearishColor;
	
	// Calculate positions with safety checks
	const highY = y;
	const lowY = y + height;
	const priceRange = high - low;
	
	// Avoid division by zero
	if (priceRange === 0) {
		const midY = y + height / 2;
		return (
			<g>
				<line
					x1={x + width / 2}
					y1={highY}
					x2={x + width / 2}
					y2={lowY}
					stroke={color}
					strokeWidth={1}
				/>
				<rect
					x={x}
					y={midY - 1}
					width={width}
					height={2}
					fill={color}
					stroke={color}
					strokeWidth={1}
				/>
			</g>
		);
	}
	
	const openY = y + height - ((open - low) / priceRange) * height;
	const closeY = y + height - ((close - low) / priceRange) * height;
	
	return (
		<g>
			{/* High-Low line (wick) */}
			<line
				x1={x + width / 2}
				y1={highY}
				x2={x + width / 2}
				y2={lowY}
				stroke={color}
				strokeWidth={1}
			/>
			
			{/* Open tick */}
			<line
				x1={x}
				y1={openY}
				x2={x + width / 2}
				y2={openY}
				stroke={color}
				strokeWidth={1}
			/>
			
			{/* Close tick */}
			<line
				x1={x + width / 2}
				y1={closeY}
				x2={x + width}
				y2={closeY}
				stroke={color}
				strokeWidth={1}
			/>
			
			{/* Body rectangle */}
			<rect
				x={x}
				y={Math.min(openY, closeY)}
				width={width}
				height={Math.abs(closeY - openY)}
				fill={isBullish ? color : 'transparent'}
				stroke={color}
				strokeWidth={1}
			/>
		</g>
	);
};

CandlestickBar.propTypes = {
	payload: PropTypes.object,
	x: PropTypes.number,
	y: PropTypes.number,
	width: PropTypes.number,
	height: PropTypes.number,
	isDarkMode: PropTypes.bool,
};

// Helper functions for formatting
const formatTime = (time, name) => {
	let formattedTime = name || 'Unknown';
	if (time) {
		try {
			const date = new Date(time);
			if (!isNaN(date.getTime())) {
				formattedTime = date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				});
			}
		} catch {
			// Fallback to string representation if date parsing fails
			formattedTime = time.toString();
		}
	}
	return formattedTime;
};

const formatPrice = (price) => {
	if (price === null || price === undefined || isNaN(price)) {
		return '$0.00';
	}
	
	const numPrice = parseFloat(price);
	if (numPrice === 0) {
		return '$0.00';
	} else if (numPrice < 0.01) {
		return `$${numPrice.toFixed(6)}`;
	} else if (numPrice < 1) {
		return `$${numPrice.toFixed(4)}`;
	} else if (numPrice < 100) {
		return `$${numPrice.toFixed(3)}`;
	} else {
		return `$${numPrice.toFixed(2)}`;
	}
};

const formatVolume = (vol) => {
	if (vol === null || vol === undefined || isNaN(vol) || vol === 0) {
		return '0';
	}
	
	const numVol = parseFloat(vol);
	if (numVol >= 1e9) {
		return `${(numVol / 1e9).toFixed(2)}B`;
	} else if (numVol >= 1e6) {
		return `${(numVol / 1e6).toFixed(2)}M`;
	} else if (numVol >= 1e3) {
		return `${(numVol / 1e3).toFixed(2)}K`;
	} else {
		return numVol.toFixed(0);
	}
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, isDarkMode }) => {
	if (!active || !payload?.length) {
		return null;
	}

	const data = payload[0].payload;
	const { open, high, low, close, volume, time, name } = data;
	
	const formattedTime = formatTime(time, name);
	const isBullish = close >= open;
	const change = close - open;
	const changePercent = open > 0 ? ((change / open) * 100).toFixed(2) : '0.00';
		
	return (
		<div
			style={{
				background: isDarkMode ? "#1a1a1a" : "#ffffff",
				border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
				borderRadius: 8,
				padding: "12px 16px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
				fontSize: "13px",
				color: isDarkMode ? "#ffffff" : "#333333",
			}}
		>
			<div style={{ marginBottom: "8px", fontWeight: "bold" }}>
				{formattedTime}
			</div>
			<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
				<div>
					<span style={{ color: isDarkMode ? "#888" : "#666" }}>Open:</span>
					<span style={{ marginLeft: "8px", fontWeight: "bold" }}>
						{formatPrice(open)}
					</span>
				</div>
				<div>
					<span style={{ color: isDarkMode ? "#888" : "#666" }}>High:</span>
					<span style={{ marginLeft: "8px", fontWeight: "bold" }}>
						{formatPrice(high)}
					</span>
				</div>
				<div>
					<span style={{ color: isDarkMode ? "#888" : "#666" }}>Low:</span>
					<span style={{ marginLeft: "8px", fontWeight: "bold" }}>
						{formatPrice(low)}
					</span>
				</div>
				<div>
					<span style={{ color: isDarkMode ? "#888" : "#666" }}>Close:</span>
					<span style={{ marginLeft: "8px", fontWeight: "bold" }}>
						{formatPrice(close)}
					</span>
				</div>
				<div style={{ gridColumn: "1 / -1" }}>
					<span style={{ color: isDarkMode ? "#888" : "#666" }}>Volume:</span>
					<span style={{ marginLeft: "8px", fontWeight: "bold" }}>
						{formatVolume(volume)}
					</span>
				</div>
				<div style={{ gridColumn: "1 / -1" }}>
					<span style={{ color: isDarkMode ? "#888" : "#666" }}>Change:</span>
					<span 
						style={{ 
							marginLeft: "8px", 
							fontWeight: "bold",
							color: isBullish ? "#4CAF50" : "#F44336"
						}}
					>
						{change >= 0 ? "+" : ""}{formatPrice(change)} ({changePercent}%)
					</span>
				</div>
			</div>
		</div>
	);
};

CustomTooltip.propTypes = {
	active: PropTypes.bool,
	payload: PropTypes.array,
	isDarkMode: PropTypes.bool,
};

// Helper function to process raw data
const processData = (rawData) => {
	if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
		return [];
	}

	return rawData.map((item, index) => {
		// Handle different possible data structures
		let name = item.name || item.time || item.timestamp || `Point ${index + 1}`;
		let time = item.time || item.timestamp || new Date().toISOString();
		
		// Try to format the name as a date if it's a valid date
		const date = new Date(name);
		if (!isNaN(date.getTime())) {
			// Format as date for better X-axis display
			// For dense data, show compact format
			if (rawData.length > 15) {
				name = date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				});
			} else {
				name = date.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
					year: "2-digit",
				});
			}
		}
		
		const processedItem = {
			name: name,
			open: parseFloat(item.open) || 0,
			high: parseFloat(item.high) || 0,
			low: parseFloat(item.low) || 0,
			close: parseFloat(item.close) || 0,
			volume: parseFloat(item.volume) || 0,
			time: time,
		};

		// Ensure high is the highest and low is the lowest
		processedItem.high = Math.max(processedItem.open, processedItem.high, processedItem.close);
		processedItem.low = Math.min(processedItem.open, processedItem.low, processedItem.close);

		return processedItem;
	}).filter(item => 
		// Filter out invalid data points
		item.open > 0 && item.high > 0 && item.low > 0 && item.close > 0 &&
		!isNaN(item.open) && !isNaN(item.high) && !isNaN(item.low) && !isNaN(item.close)
	);
};

// Helper function to calculate Y-axis domain
const calculateYAxisDomain = (chartData) => {
	const allHighs = chartData.map(d => d.high).filter(h => !isNaN(h) && h > 0);
	const allLows = chartData.map(d => d.low).filter(l => !isNaN(l) && l > 0);
	
	if (allHighs.length > 0 && allLows.length > 0) {
		const maxHigh = Math.max(...allHighs);
		const minLow = Math.min(...allLows);
		const padding = (maxHigh - minLow) * 0.05; // Reduced from 0.1 to 0.05
		return { maxHigh, minLow, padding };
	}
	
	// Fallback values if no valid data
	return { maxHigh: 100, minLow: 0, padding: 5 };
};

// Helper function to format X-axis labels
const formatXAxisLabel = (value, index, totalTicks) => {
	// Show all labels, but format them appropriately
	// Try to parse as date first
	const date = new Date(value);
	if (!isNaN(date.getTime())) {
		// For very dense data (more than 30 points), show only day numbers
		if (totalTicks > 30) {
			return date.getDate().toString();
		}
		// For dense data (more than 15 points), show compact format
		else if (totalTicks > 15) {
			return date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			});
		}
		
		// Format as date for daily data
		// Show different formats based on data range
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		if (diffDays <= 7) {
			// For recent data, show day and time
			return date.toLocaleDateString("en-US", {
				weekday: "short",
				day: "numeric",
			});
		} else if (diffDays <= 365) {
			// For this year, show month and day
			return date.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			});
		} else {
			// For older data, show month and year
			return date.toLocaleDateString("en-US", {
				month: "short",
				year: "2-digit",
			});
		}
	}
	
	// If it's already a formatted date string, return as is
	if (typeof value === 'string' && (value.includes('Aug') || value.includes('Jan') || value.includes('Feb') || value.includes('Mar') || value.includes('Apr') || value.includes('May') || value.includes('Jun') || value.includes('Jul') || value.includes('Sep') || value.includes('Oct') || value.includes('Nov') || value.includes('Dec'))) {
		return value;
	}
	
	// Return as is if not a date
	return value;
};

// Helper function to format Y-axis labels
const formatYAxisLabel = (value) => {
	// Format price based on value range
	if (value >= 1000) {
		return `$${(value / 1000).toFixed(1)}K`;
	} else if (value >= 1) {
		return `$${value.toFixed(2)}`;
	} else if (value >= 0.01) {
		return `$${value.toFixed(3)}`;
	} else {
		return `$${value.toFixed(6)}`;
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
		background: isDarkMode ? 'transparent' : 'transparent',
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
		background: isDarkMode ? 'transparent' : 'transparent',
		color: isDarkMode ? '#888' : '#666',
		
		borderRadius: '8px'
	}}>
		<div style={{ textAlign: 'center' }}>
			<div style={{ fontSize: '16px', marginBottom: '8px' }}>📊</div>
			<div>No data available</div>
		</div>
	</div>
);

LoadingState.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
};

EmptyState.propTypes = {
	isDarkMode: PropTypes.bool.isRequired,
};

// Helper function to calculate chart margins
const calculateMargins = (chartData, isMobile = false) => {
	// Minimize margins to reduce whitespace
	const bottomMargin = (() => {
		if (isMobile) return 40;
		if (chartData.length > 30) return 60;
		return 40;
	})();
	
	return {
		top: 2,
		right: 2,
		bottom: bottomMargin,
		left: isMobile ? 30 : 35
	};
};

// Hook for responsive behavior
const useResponsive = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkScreenSize = () => {
			const width = window.innerWidth;
			setIsMobile(width < 768);
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	return { isMobile };
};

export default function CandlestickChart({ data, isDarkMode, isLoading = false }) {
	const chartData = processData(data);
	const { maxHigh, minLow, padding } = calculateYAxisDomain(chartData);
	const { isMobile } = useResponsive();
	const margins = calculateMargins(chartData, isMobile);
	
	// Show loading state
	if (isLoading) {
		return <LoadingState isDarkMode={isDarkMode} />;
	}

	// Show empty state
	if (chartData.length === 0) {
		return <EmptyState isDarkMode={isDarkMode} />;
	}
	
	return (
		<div style={{ 
			width: '100%', 
			height: '300px',
			background: isDarkMode ? 'transparent' : 'transparent',
			
			borderRadius: '8px',
			overflow: 'hidden'
		}}>
			<ResponsiveContainer width="100%" height="100%" minHeight={300}>
				<ComposedChart
					data={chartData}
					margin={margins}
				>
					<CartesianGrid
						stroke={isDarkMode ? "#2a2a2a" : "#f0f0f0"}
						strokeDasharray="2 2"
						strokeOpacity={isDarkMode ? 0.2 : 0.3}
						horizontal={true}
						vertical={false}
					/>
					
					<XAxis
						dataKey="name"
						tick={{
							fill: isDarkMode ? "#888" : "#666",
							fontSize: (() => {
								if (isMobile) return 7;
								if (chartData.length > 30) return 7;
								if (chartData.length > 15) return 8;
								return 9;
							})(),
							fontWeight: 500,
							fontStyle: 'normal',
						}}
						tickLine={{ stroke: isDarkMode ? "#444" : "#ddd" }}
						axisLine={{ stroke: isDarkMode ? "#444" : "#ddd" }}
						interval={isMobile ? "preserveStartEnd" : 0}
						tickFormatter={(value, index) => formatXAxisLabel(value, index, chartData.length)}
						angle={(() => {
							if (isMobile || chartData.length > 30) return -45;
							return 0;
						})()}
						textAnchor={(() => {
							if (isMobile || chartData.length > 30) return "end";
							return "middle";
						})()}
						height={(() => {
							if (isMobile) return 45;
							if (chartData.length > 30) return 55;
							return 40;
						})()}
						domain={['dataMin', 'dataMax']}
					/>
					
					<YAxis
						tick={{
							fill: isDarkMode ? "#888" : "#666",
							fontSize: isMobile ? 7 : 8,
							fontWeight: 500,
						}}
						tickLine={{ stroke: isDarkMode ? "#444" : "#ddd" }}
						axisLine={{ stroke: isDarkMode ? "#444" : "#ddd" }}
						domain={[minLow - padding, maxHigh + padding]}
						tickFormatter={formatYAxisLabel}
						width={isMobile ? 25 : 30}
						orientation="left"
						tickCount={isMobile ? 3 : 4}
					/>
					
					<Tooltip 
						content={<CustomTooltip isDarkMode={isDarkMode} />}
					/>
					
					{/* Candlestick bars */}
					<Bar
						dataKey="close"
						shape={<CandlestickBar isDarkMode={isDarkMode} />}
						barSize={Math.max(4, Math.min(16, Math.max(150, 350 - chartData.length * 1.5) / chartData.length))}
					/>
				</ComposedChart>
			</ResponsiveContainer>
		</div>
	);
}

CandlestickChart.propTypes = {
	data: PropTypes.array,
	isDarkMode: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool,
};

CandlestickChart.defaultProps = {
	data: [],
	isLoading: false,
};
