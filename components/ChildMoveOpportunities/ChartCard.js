import { useMemo } from "react";
import PropTypes from "prop-types";
import StatsRow from "./StatsRow";
import ApexCandlestickChart from "./ApexCandlestickChart";
import { useTheme } from "../../context/ThemeContext";

// Helper functions for formatting
const formatPrice = (price) => {
	if (!price || price === 0) {
		return `$0.000000`;
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

const formatDateTime = (timestamp) => {
	if (!timestamp) return '-';
	const date = new Date(timestamp);
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	return `${month}/${day}/${year} ${hours}:${minutes}`;
};

const formatVolume = (volume) => {
	if (!volume || volume === 0) {
		return `$0.00K`;
	} else if (volume >= 1e9) {
		return `$${(volume / 1e9).toFixed(2)}B`;
	} else if (volume >= 1e6) {
		return `$${(volume / 1e6).toFixed(2)}M`;
	} else {
		return `$${(volume / 1e3).toFixed(2)}K`;
	}
};

export default function ChartCard({ coinData, coinHistory, selectedTimeframe, onTimeframeChange }) {
	const { isDarkMode } = useTheme();

	console.log("ChartCard props:");
	console.log("- coinData:", coinData);
	console.log("- coinHistory:", coinHistory);

	// Transform the API data to chart format
	const data = useMemo(() => {
		console.log("Transforming data in ChartCard...");
		console.log("Selected timeframe:", selectedTimeframe);
		
		// Handle different possible response structures
		let historyData = null;
		
		// Check if data is directly in coinHistory
		if (Array.isArray(coinHistory)) {
			console.log("Data is directly in coinHistory");
			historyData = coinHistory;
		}
		// Check if data is in coinHistory.data
		else if (coinHistory?.data && Array.isArray(coinHistory.data)) {
			console.log("Data is in coinHistory.data");
			historyData = coinHistory.data;
		}
		// Check if data is in coinHistory.history (for old API format)
		else if (coinHistory?.history && Array.isArray(coinHistory.history)) {
			console.log("Data is in coinHistory.history");
			historyData = coinHistory.history;
		}
		// Check if data is in coinHistory.data.history[timeframe] (new API format)
		else if (coinHistory?.data?.history) {
			console.log("Data is in coinHistory.data.history object");
			const timeframeKey = selectedTimeframe || '1m';
			historyData = coinHistory.data.history[timeframeKey];
			console.log(`Extracted data for timeframe ${timeframeKey}:`, historyData);
		}
		
		console.log("Extracted historyData:", historyData);
		console.log("HistoryData length:", historyData?.length);
		
		if (!historyData || historyData.length === 0) {
			console.log("No valid history data found");
			return []; // Return empty array if no data
		}
		
		console.log("First history item:", historyData[0]);
		
		const transformedData = historyData.map((item, index) => {
			// Debug: Log the raw item data
			console.log(`ChartCard processing item ${index}:`, item);
			
			// Ensure we have valid numeric values
			const open = parseFloat(item.open);
			const high = parseFloat(item.high);
			const low = parseFloat(item.low);
			const close = parseFloat(item.close);
			const volume = parseFloat(item.volume) || 0;
			
			// Debug: Log parsed values
			console.log(`ChartCard parsed values - Open: ${open}, High: ${high}, Low: ${low}, Close: ${close}`);
			
			// Check if all values are the same (which would be unusual for real market data)
			if (open === high && high === low && low === close) {
				console.warn(`ChartCard: All OHLC values are identical at index ${index}:`, { open, high, low, close });
			}
			
			// Validate data integrity
			if (isNaN(open) || isNaN(high) || isNaN(low) || isNaN(close)) {
				console.warn(`Invalid data at index ${index}:`, item);
				return null;
			}
			
			// Don't force high/low validation - use original values
			// This was causing all values to be the same
			const finalOpen = open;
			const finalHigh = high;
			const finalLow = low;
			const finalClose = close;
			
			// Ensure we have a valid time
			let time;
			if (item.time) {
				time = item.time;
			} else if (item.timestamp) {
				time = item.timestamp;
			} else {
				time = new Date().toISOString();
			}
			
			const result = {
				time: time,
				open: finalOpen,
				high: finalHigh,
				low: finalLow,
				close: finalClose,
				volume: volume
			};
			
			// Debug: Log final result
			console.log(`ChartCard final result for item ${index}:`, result);
			
			return result;
		}).filter(item => item !== null);
		
		console.log("Transformed data:", transformedData);
		console.log("Transformed data length:", transformedData.length);
		
		return transformedData;
	}, [coinHistory, selectedTimeframe]);

	// Since the API now returns the correct timeframe data, we don't need to filter
	// Just use the data directly
	const filteredData = useMemo(() => {
		if (!data || data.length === 0) return [];
		return data;
	}, [data]);

	// Extract coin info from coinData or use defaults
	const coinSymbol = coinData?.symbol?.toUpperCase() || "COIN";
	const coinName = coinData?.name || "Cryptocurrency";
	const coinImage = coinData?.image;

	// Extract latest candle data from API response
	const latestCandle = useMemo(() => {
		// Check if latest_candle exists in the response
		if (coinHistory?.data?.latest_candle) {
			console.log("Using latest_candle from API:", coinHistory.data.latest_candle);
			return coinHistory.data.latest_candle;
		}
		
		// Fallback to last item in filtered data if latest_candle not available
		if (filteredData && filteredData.length > 0) {
			console.log("Fallback: Using last item from filteredData");
			return filteredData[filteredData.length - 1];
		}
		
		console.log("No latest candle data available");
		return null;
	}, [coinHistory, filteredData]);


	// Calculate additional statistics
	const stats = useMemo(() => {
		if (data.length === 0) return null;

		// data format: [timestamp, open, high, low, close, volume]
		const highs = data.map((d) => d[2]); // high is at index 2
		const lows = data.map((d) => d[3]);  // low is at index 3
		const volumes = data.map((d) => d[5]); // volume is at index 5

		const maxHigh = Math.max(...highs);
		const minLow = Math.min(...lows);
		const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
		const totalVolume = volumes.reduce((a, b) => a + b, 0);

		return {
			high: formatPrice(maxHigh),
			low: formatPrice(minLow),
			avgVolume: formatVolume(avgVolume),
			totalVolume: formatVolume(totalVolume),
			priceRange: formatPrice(maxHigh - minLow),
			volatility: (((maxHigh - minLow) / minLow) * 100).toFixed(2) + "%",
		};
	}, [data]);

	return (
		<div className={`cards ${isDarkMode ? "cards-dark" : "cards-light"}`}>
			{/* Header */}
			<div className="headers">
				<div className="tokens">
					{coinImage ? (
						<img
							src={coinImage}
							alt={coinName || "Coin"}
							className="coin-icon"
							style={{
								width: "40px",
								height: "40px",
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
					) : (
						<div className="icons" />
					)}
					<div>
						<div className={`symbols ${isDarkMode ? "dark" : ""}`}>
							{coinSymbol}
						</div>
						<div className={`names ${isDarkMode ? "dark" : ""}`}>
							{coinName}
						</div>
					</div>
				</div>

				<div className="priceBlocks">
					{/* <div className={`prices ${isDarkMode ? "dark" : "light"}`}>
						Volume Analysis
					</div> */}
					<div className="volume-info" style={{ marginTop: "5px" }}>
						<h3 className={`${isDarkMode ? "dark" : ""}`}>
							{formatPrice(coinData?.current_price)}
						</h3>
					</div>
				</div>
			</div>

			{/* Toolbar */}

			<div className="toolbars">
				<div className="pills">
					{latestCandle ? (
						<>
							<span style={{ 
								fontSize: '12px',
								color: isDarkMode ? '#bcd3e5' : '#666',
								marginRight: '15px',
								display:'flex',
								alignItems:'center',
							}}>
								{formatDateTime(latestCandle.time)}
							</span>
							<span className="pill">
								<span className="swatch50" /> Close:{" "}
								<b>{formatPrice(latestCandle.close)}</b>
							</span>
							<span className="pill">
								<span className="swatch200" /> High:{" "}
								<b>{formatPrice(latestCandle.high)}</b>
							</span>
							<span className="pill">
								<span className="swatch200" /> Low:{" "}
								<b>{formatPrice(latestCandle.low)}</b>
							</span>
							<span className="pill">
								<span className="swatch200" /> Open:{" "}
								<b>{formatPrice(latestCandle.open)}</b>
							</span>
							<span className="pill">
								<span className="swatch200" /> Volume:{" "}
								<b>{formatVolume(latestCandle.volume)}</b>
							</span>
						</>
					) : (
						<span className="pill" style={{ opacity: 0.5 }}>
							No data available
						</span>
					)}
				</div>

				{/* Timeframe selector */}
				{onTimeframeChange && (
					<div className="tabs">
						{['1d', '7d', '1m'].map((timeframe) => (
							<button
								key={timeframe}
								className={selectedTimeframe === timeframe ? 'tab tabActive' : 'tab'}
								onClick={() => onTimeframeChange(timeframe)}
							>
								{timeframe.toUpperCase()}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Chart */}
			<div className="chartWrap">
				{filteredData.length > 0 ? (
					<ApexCandlestickChart 
						data={filteredData} 
						isDarkMode={isDarkMode} 
						timeframe={selectedTimeframe}
					/>
				) : (
					<div 
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '280px',
							color: isDarkMode ? '#888' : '#666',
							fontSize: '14px'
						}}
					>
						{coinHistory?.data ? 'No chart data available' : 'Loading chart data...'}
					</div>
				)}
			</div>

			{/* Stats row */}
			<StatsRow isDarkMode={isDarkMode} stats={stats} coinData={coinData} coinHistory={coinHistory} />
		</div>
	);
}

ChartCard.propTypes = {
	coinData: PropTypes.object,
	coinHistory: PropTypes.object,
	selectedTimeframe: PropTypes.string,
	onTimeframeChange: PropTypes.func,
};
