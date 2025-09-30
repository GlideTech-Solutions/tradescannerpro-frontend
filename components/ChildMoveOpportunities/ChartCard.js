import { useMemo } from "react";
import PropTypes from "prop-types";
import StatsRow from "./StatsRow";
import ApexCandlestickChart from "./ApexCandlestickChart";
import { useTheme } from "../../context/ThemeContext";


const timeframes = ["1H", "1D", "M", "3M", "6M", "Y"];

// Helper functions for formatting
const formatPrice = (price) => {
	if (!price || price === 0) {
		return `$0.00000`;
	} else if (price < 0.01) {
		return `$${price.toFixed(6)}`;
	} else if (price < 1) {
		return `$${price.toFixed(4)}`;
	} else {
		return `$${price.toFixed(2)}`;
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
		
		const transformedData = historyData.map((item) => {
			return {
				date: new Date(item.time).toISOString().split("T")[0],
				open: item.open,
				high: item.high,
				low: item.low,
				close: item.close,
				volume: item.volume,
				time: item.time, // Keep original time for tooltip
			};
		});
		
		console.log("Transformed data:", transformedData);
		console.log("Transformed data length:", transformedData.length);
		
		return transformedData;
	}, [coinHistory]);

	// Extract coin info from coinData or use defaults
	const coinSymbol = coinData?.symbol?.toUpperCase() || "COIN";
	const coinName = coinData?.name || "Cryptocurrency";
	const coinImage = coinData?.image;


	// Calculate additional statistics
	const stats = useMemo(() => {
		if (data.length === 0) return null;

		const highs = data.map((d) => d.high);
		const lows = data.map((d) => d.low);
		const volumes = data.map((d) => d.volume);

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
						// Get the latest data point
						const latest = data[data.length - 1] || {};
						const { open, high, low, close } = latest;
						
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

				{/* <div className="tabs">
          {timeframes.map((t) => (
            <button
              key={t}
              className={clsx("tab", t === tf && "tabActive")}
              onClick={() => setTF(t)}
            >
              {t}
            </button>
          ))}
        </div> */}
			</div>

			{/* Chart */}
			<div className="chartWrap">
				{data.length > 0 ? (
					<ApexCandlestickChart data={data} isDarkMode={isDarkMode} />
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
