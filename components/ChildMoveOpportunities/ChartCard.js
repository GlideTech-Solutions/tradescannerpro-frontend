import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useMemo } from "react";
import PropTypes from "prop-types";
import StatsRow from "./StatsRow";
import { useTheme } from "../../context/ThemeContext";

const raw = [
  { date: "2024-08-01", price: 182.1, volume: 12.2 },
  { date: "2024-08-02", price: 189.3, volume: 10.5 },
  { date: "2024-08-03", price: 201.0, volume: 9.8 },
  { date: "2024-08-04", price: 194.5, volume: 11.9 },
  { date: "2024-08-05", price: 205.4, volume: 13.2 },
  { date: "2024-08-06", price: 197.2, volume: 8.7 },
  { date: "2024-08-07", price: 188.6, volume: 12.1 },
  { date: "2024-08-08", price: 208.3, volume: 15.2 },
  { date: "2024-08-09", price: 233.4, volume: 18.4 },
  { date: "2024-08-10", price: 231.0, volume: 17.9 },
  { date: "2024-08-11", price: 223.4, volume: 14.7 },
  { date: "2024-08-12", price: 207.2, volume: 16.1 },
  { date: "2024-08-13", price: 191.6, volume: 12.2 },
  { date: "2024-08-14", price: 204.5, volume: 10.9 },
  { date: "2024-08-15", price: 229.3, volume: 13.5 },
  { date: "2024-08-16", price: 221.5, volume: 9.9 },
  { date: "2024-08-17", price: 239.1, volume: 16.8 },
  { date: "2024-08-18", price: 232.6, volume: 14.3 },
  { date: "2024-08-19", price: 235.2, volume: 15.0 },
];

const timeframes = ["1H", "1D", "M", "3M", "6M", "Y"];

// Helper functions for formatting
const formatPrice = (price) => {
  if (!price || price === 0) {
    return `$${price.toFixed(5)}`;
  } else if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toFixed(2)}`;
  }
};

const formatVolume = (volume) => {
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else {
    return `$${(volume / 1e3).toFixed(2)}K`;
  }
};


export default function ChartCard({ coinData, coinHistory }) {
  const { isDarkMode } = useTheme();

  // Transform the API data to chart format
  const data = useMemo(() => {
    if (!coinHistory?.data || !Array.isArray(coinHistory.data)) {
      return raw; // fallback to static data
    }
    
    return coinHistory.data.map((item) => {
      return {
        date: new Date(item.time).toISOString().split('T')[0],
        price: item.close,
        volume: item.volume / 1e6, // Convert to millions for display
        volumeArea: item.volume / 1e6, // Same data for area chart
        originalVolume: item.volume, // Keep original volume for tooltip
        open: item.open,
        high: item.high,
        low: item.low,
        time: item.time // Keep original time for tooltip
      };
    });
  }, [coinHistory]);

  // Extract coin info from coinData or use defaults
  const coinSymbol = coinData?.symbol?.toUpperCase() || 'COIN';
  const coinName = coinData?.name || 'Cryptocurrency';
  const coinImage = coinData?.image;

  // Calculate additional statistics
  const stats = useMemo(() => {
    if (data.length === 0) return null;
    
    const prices = data.map(d => d.price);
    const volumes = data.map(d => d.volume);
    
    const high = Math.max(...prices);
    const low = Math.min(...prices);
    const avgVolume = volumes.reduce((a, b) => a + b, 0) / volumes.length;
    const totalVolume = volumes.reduce((a, b) => a + b, 0);
    
    return {
      high: formatPrice(high),
      low: formatPrice(low),
      avgVolume: formatVolume(avgVolume * 1e6),
      totalVolume: formatVolume(totalVolume * 1e6),
      priceRange: formatPrice(high - low),
      volatility: ((high - low) / low * 100).toFixed(2) + '%'
    };
  }, [data]);

  return (
    <div className={`cards ${isDarkMode ? 'cards-dark' : 'cards-light'}`}>
      {/* Header */}
      <div className="headers">
        <div className="tokens">
          {coinImage ? (
            <img 
              src={coinImage} 
              alt={coinName || 'Coin'} 
              className="coin-icon"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div className="icons" />
          )}
          <div>
            <div className={`symbols ${isDarkMode ? 'dark' : ''}`}>{coinSymbol}</div>
            <div className={`names ${isDarkMode ? 'dark' : ''}`}>{coinName}</div>
          </div>
        </div>

        <div className="priceBlocks">
          <div className={`prices ${isDarkMode ? 'dark' : 'light'}`}>
            Volume Analysis
          </div>
          {/* <div className="volume-info" style={{ marginTop: '5px' }}>
            <div className={`volume-text ${isDarkMode ? 'dark' : 'light'}`} style={{
              fontSize: '14px',
              color: isDarkMode ? '#8BB9FF' : '#12C59F',
              fontWeight: '350'
            }}>
              {totalVolume ? `${formatVolume(totalVolume)} (1d)` : '-'}
            </div>
          </div> */}
          
        </div>
      </div>

      {/* Toolbar */}

      <div className="toolbars">
        <div className="pills">
          {(() => {
            // Get the latest data point (from coinHistory or fallback to raw)
            const latest = data[data.length - 1] || {};
            // If coinHistory.data exists, try to get the original API object for more fields
            let latestRaw = null;
            if (coinHistory?.data && Array.isArray(coinHistory.data) && coinHistory.data.length > 0) {
              latestRaw = coinHistory.data[coinHistory.data.length - 1];
            }
            // Use latestRaw for original fields if available, else fallback to transformed data
            const close = latestRaw?.close ?? latest.price;
            const high = latestRaw?.high ?? latest.high;
            const low = latestRaw?.low ?? latest.low;
            const open = latestRaw?.open ?? latest.open;
            return (
              <>
                <span className="pill">
                  <span className="swatch50" /> Close: <b>{close !== undefined ? formatPrice(close) : '-'}</b>
                </span>
                <span className="pill">
                  <span className="swatch200" /> High: <b>{high !== undefined ? formatPrice(high) : '-'}</b>
                </span>
                <span className="pill">
                  <span className="swatch200" /> Low: <b>{low !== undefined ? formatPrice(low) : '-'}</b>
                </span>
                <span className="pill">
                  <span className="swatch200" /> Open: <b>{open !== undefined ? formatPrice(open) : '-'}</b>
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
        <ResponsiveContainer width="100%" height={280} >
          <ComposedChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
          
          >
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.3} />
                <stop offset="50%" stopColor="#4CAF50" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#4CAF50" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              stroke={isDarkMode ? "#2a2a2a" : "#f0f0f0"} 
              strokeDasharray="1 1" 
              horizontal={true}
              vertical={true}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: isDarkMode ? "#888" : "#666", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={30}
              padding={{ left: 10, right: 10 }}
              tickFormatter={(d) => {
                const date = new Date(d);
                return date.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                }).toUpperCase();
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: isDarkMode ? "#888" : "#666", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={70}
              tickFormatter={(v) => `${v.toFixed(1)}M`}
              domain={[0, "dataMax * 1.1"]}
            />
            <YAxis yAxisId="vol" hide domain={[0, "dataMax * 2"]} />

            <Tooltip
              cursor={{ 
                stroke: isDarkMode ? "#4CAF50" : "#2AD69D", 
                strokeWidth: 1,
                strokeOpacity: 0.7 
              }}
              contentStyle={{
                background: isDarkMode ? "#1a1a1a" : "#ffffff",
                border: `1px solid ${isDarkMode ? "#333" : "#e0e0e0"}`,
                borderRadius: 8,
                color: isDarkMode ? "#ffffff" : "#333333",
                padding: "12px 16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                fontSize: "13px"
              }}
              formatter={(value, name, props) => {
                if (name === "volume" && props?.payload?.originalVolume) {
                  // Show original volume value (not converted to millions)
                  const originalVolume = props.payload.originalVolume;
                  return [`${originalVolume.toFixed(2)}`, "Volume"];
                }
                // Hide area chart volume to avoid duplication
                if (name === "volumeArea") {
                  return null;
                }
                return null;
              }}
              labelFormatter={(label, payload) => {
                // Use the original time from the data if available
                if (payload?.[0]?.payload?.time) {
                  const d = new Date(payload[0].payload.time);
                  return d.toLocaleDateString('en-US', {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  });
                }
                // Fallback to label date
                const d = new Date(label);
                return d.toLocaleDateString('en-US', {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true
                });
              }}
            />

            {/* Volume bars - Single color */}
            <Bar
              yAxisId="vol"
              dataKey="volume"
              barSize={3}
              radius={[1, 1, 0, 0]}
              fill="#4CAF50"
              opacity={0.8}
            />

            {/* Volume area line */}
            <Area
              type="monotone"
              dataKey="volumeArea"
              stroke="#4CAF50"
              strokeWidth={2}
              fill="url(#areaFill)"
              dot={false}
              activeDot={{ 
                r: 4, 
                stroke: "#4CAF50", 
                strokeWidth: 2, 
                fill: "#ffffff" 
              }}
              yAxisId="right"
            />
          </ComposedChart>
        </ResponsiveContainer>
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
