"use client";

import { useTheme } from "../context/ThemeContext";
import "./SkeletonCryptoCard.scss";

export default function SkeletonCryptoCard() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`skeleton-crypto-card ${isDarkMode ? "dark" : ""}`}>
      <div className="skeleton-flex-alignment">
        <div className="skeleton-coin-icon">
          <div className="skeleton-coin-symbol"></div>
        </div>
        <div className="skeleton-coin-info">
          <div className="skeleton-coin-name"></div>
          <div className="skeleton-coin-name-small"></div>
        </div>
      </div>
      <div className="skeleton-price-section">
        <div className="skeleton-coin-price"></div>
        <div className="skeleton-coin-change"></div>
      </div>
    </div>
  );
}
