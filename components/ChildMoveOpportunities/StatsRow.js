// components/StatsRow.js
"use client";

import clsx from "clsx";
import PropTypes from "prop-types";

// Helper functions for formatting
const formatPrice = (price) => {
  if (!price && price !== 0) return '-';
  if (price === 0) {
    return `$${price.toFixed(5)}`;
  } else if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toFixed(2)}`;
  }
};

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

const formatVolume = (volume) => {
  if (!volume) return '-';
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else {
    return `$${(volume / 1e3).toFixed(2)}K`;
  }
};

export default function StatsRow({ isDarkMode = false, stats = null, coinData = null }) {

  const items = [
    {
      key: "market_cap",
      label: "Market Cap",
      value: coinData?.market_cap ? formatMarketCap(coinData.market_cap) : "-",
      icon: isDarkMode
        ? "/assets/icons/gray-chart-histogram.svg"
        : "/assets/icons/chart-histogram.svg",
    },
    {
      key: "total_volume",
      label: "24h Volume",
      value: coinData?.total_volume ? formatVolume(coinData.total_volume) : "-",
      icon: isDarkMode
        ? "/assets/icons/gray-chart-simple.svg"
        : "/assets/icons/chart-simple.svg",
    },
    {
      key: "rsi",
      label: "RSI",
      value: coinData?.rsi ? formatRSI(coinData.rsi) : "-",
      icon: isDarkMode
        ? "/assets/icons/gray-holding-hand-revenue.svg"
        : "/assets/icons/holding-hand-revenue.svg",
    },
    {
      key: "strength",
      label: "Strength",
      value: coinData?.strength || "-",
      icon: isDarkMode
        ? "/assets/icons/gray-ranking-podium-empty.svg"
        : "/assets/icons/ranking-podium-empty.svg",
    },
  ];

  return (
    <div className="moveOpportunities-child-bottom-alignment">
      <div className="moveOpportunities-child-bottom-grid">
        {items.map((it) => (
          <div
            key={it.key}
            className={clsx(
              "moveOpportunities-child-bottom-grid-item",
              isDarkMode && "dark"
            )}
          >
            <div className="moveOpportunities-grid-top">
              <div className="moveOpportunities-icon">
                <img src={it.icon} alt={it.label} />
              </div>

              <div className="moveOpportunities-name">
                <span className={clsx(isDarkMode && "dark")}>{it.label}</span>
              </div>
            </div>

            {/* Right side content */}
            <h6 className={clsx(isDarkMode && "dark")}>{it.value}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

StatsRow.propTypes = {
  isDarkMode: PropTypes.bool,
  stats: PropTypes.object,
  coinData: PropTypes.object,
};
