// components/StatsRow.js
"use client";

import clsx from "clsx";

export default function StatsRow({ isDarkMode = false }) {
  const items = [
    {
      key: "marketCap",
      label: "Market Cap",
      value: "$110.04B",
      icon: isDarkMode
        ? "/assets/icons/gray-chart-histogram.svg"
        : "/assets/icons/chart-histogram.svg",
    },
    {
      key: "volume",
      label: "24h Volume",
      value: "$7.66B",
      icon: isDarkMode
        ? "/assets/icons/gray-chart-simple.svg"
        : "/assets/icons/chart-simple.svg",
    },
    {
      key: "rsi",
      label: "RSI",
      value: "52.61",
      icon: isDarkMode
        ? "/assets/icons/gray-holding-hand-revenue.svg"
        : "/assets/icons/holding-hand-revenue.svg",
    },
    {
      key: "signal",
      label: "WinWave Signal",
      // this one renders a BUY button instead of plain value
      icon: isDarkMode
        ? "/assets/icons/gray-arrow-comparison.svg"
        : "/assets/icons/arrow-comparison.svg",
      renderRight: () => (
        <div className="right-side-price">
          <div className="buy-now-alignment">
            <button>Buy</button>
          </div>
        </div>
      ),
    },
    {
      key: "score",
      label: "Score",
      icon: isDarkMode
        ? "/assets/icons/gray-ranking-podium-empty.svg"
        : "/assets/icons/ranking-podium-empty.svg",
      value: "72/100",
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

            {/* Right side content (value or custom) */}
            {it.renderRight ? (
              it.renderRight()
            ) : (
              <h6 className={clsx(isDarkMode && "dark")}>{it.value}</h6>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
