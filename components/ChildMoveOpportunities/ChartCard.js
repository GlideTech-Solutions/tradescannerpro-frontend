import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import StatsRow from "./StatsRow";
import ApexCandlestickChart from "./ApexCandlestickChart";
import { useTheme } from "../../context/ThemeContext";
import clsx from "clsx";

const timeframes = [ "1M", "3M", "1Y"];
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

export default function ChartCard({ coinData, coinHistory }) {
	const { isDarkMode } = useTheme();
	const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

	console.log("ChartCard props:");
	console.log("- coinData:", coinData);
	console.log("- coinHistory:", coinHistory);

	// Transform the API data to chart format
	const data = useMemo(() => {
		console.log("Transforming data in ChartCard...");
		
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
		// Check if data is in coinHistory.history
		else if (coinHistory?.history && Array.isArray(coinHistory.history)) {
			console.log("Data is in coinHistory.history");
			historyData = coinHistory.history;
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
	}, [coinHistory]);

	// Filter data based on selected timeframe
	const filteredData = useMemo(() => {
		if (!data || data.length === 0) return [];
		
		const now = new Date();
		let cutoffDate;
		
		switch (selectedTimeframe) {
			case '1D':
				cutoffDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
				break;
			case '7D':
				cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
				break;
			case '1M':
				cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
				break;
			case '3M':
				cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
				break;
			case '1Y':
				cutoffDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
				break;
			default:
				cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
		}
		
		return data.filter(item => {
			const itemDate = new Date(item.time);
			return itemDate >= cutoffDate;
		});
	}, [data, selectedTimeframe]);

	// Extract coin info from coinData or use defaults
	const coinSymbol = coinData?.symbol?.toUpperCase() || "COIN";
	const coinName = coinData?.name || "Cryptocurrency";
	const coinImage = coinData?.image;


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
					{(() => {
						// Get the latest data point from filtered data
						// data format: {time, open, high, low, close, volume}
						const latest = filteredData[filteredData.length - 1] || {};
						const open = latest.open;
						const high = latest.high;
						const low = latest.low;
						const close = latest.close;
						
						// Debug: Log chips data
						console.log('=== CHIPS DEBUG ===');
						console.log('Latest data point:', latest);
						console.log('OHLC values - Open:', open, 'High:', high, 'Low:', low, 'Close:', close);
						console.log('Filtered data length:', filteredData.length);
						console.log('Selected timeframe:', selectedTimeframe);
						console.log('=== END CHIPS DEBUG ===');
						
						return (
							<>
								<span className="pill">
									<span className="swatch50" /> Close:{" "}
									<b>{close !== undefined ? formatPrice(close) : "-"}</b>
								</span>
								<span className="pill">
									<span className="swatch200" /> High:{" "}
									<b>{high !== undefined ? formatPrice(high) : "-"}</b>
								</span>
								<span className="pill">
									<span className="swatch200" /> Low:{" "}
									<b>{low !== undefined ? formatPrice(low) : "-"}</b>
								</span>
								<span className="pill">
									<span className="swatch200" /> Open:{" "}
									<b>{open !== undefined ? formatPrice(open) : "-"}</b>
								</span>
							</>
						);
					})()}
				</div>

				<div className="tabs">
          {timeframes.map((t) => (
            <button
              key={t}
              className={clsx("tab", t === selectedTimeframe && "tabActive")}
              onClick={() => setSelectedTimeframe(t)}
            >
              {t}
            </button>
          ))}
        </div>
			</div>

			{/* Chart */}
			<div className="chartWrap">
				{filteredData.length > 0 ? (
					<ApexCandlestickChart data={filteredData} isDarkMode={isDarkMode} />
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
			<StatsRow isDarkMode={isDarkMode} stats={stats} coinData={coinData} />
		</div>
	);
}

ChartCard.propTypes = {
	coinData: PropTypes.object,
	coinHistory: PropTypes.object,
};
