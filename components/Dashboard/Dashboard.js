"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";
import { useScan } from "../../context/ScanContext";
import apiService from "../../lib/api";
import Loading from "../Loading";
import SkeletonCryptoCard from "../SkeletonCryptoCard";
import "./Dashboard.scss";
import PageHeader from "../PageHeader/PageHeader";

export default function Dashboard() {
	const { isDarkMode, isInitialized } = useTheme();
	const { isLoading, setLoadingState, setErrorState } = useScan();
	const router = useRouter();
	const [cryptoData, setCryptoData] = useState([]);
	const [error, setError] = useState(null);
	const [isInitialLoading, setIsInitialLoading] = useState(true);
const handleScan1 = () => {
	console.log("handleScan1");
	router.push("/market-breakouts?autoScan=true");
};

	useEffect(() => {
		const loadInitialData = async () => {
			try {
				setIsInitialLoading(true);
				setLoadingState(true);
				setErrorState(null);
				setError(null);
				const response = await apiService.getTop5();
				const data = response.data || response;
				setCryptoData(data);
			} catch (err) {
				const errorMessage = err.message || "Failed to fetch crypto data";
				setError(errorMessage);
				setErrorState(errorMessage);
				console.error("Error fetching crypto data:", err);
			} finally {
				setIsInitialLoading(false);
				setLoadingState(false);
			}
		};

		loadInitialData();
	}, []);

	const handleCardClick = (coinId) => {
		router.push(`/child-move-opportunities?id=${coinId}`);
	};

	// Don't render until theme is initialized
	if (!isInitialized) {
		return <Loading />;
	}

	const getPercentageIcon = (percentage) => {
		if (percentage > 0)
			return (
				<img
					className="arrow-icon pr-2"
					src="/assets/icons/arrow-green.svg"
					alt="arrow-icon"
				/>
			);
		if (percentage < 0)
			return (
				<img
					className="arrow-icon pr-2"
					src="/assets/icons/arrow-red.svg"
					alt="arrow-icon"
				/>
			);
		return null;
	};

	const formatPrice = (price) => {
		if (!price && price !== 0) return "-";
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

	// Show loading state when scanning
	if (isLoading || isInitialLoading) {
		return (
			<div className={`dashboard-container ${isDarkMode ? "dark" : ""}`}>
				<PageHeader />
				<main className="main-content">
					<div className="welcome-section">
						<h1 className={`main-title ${isDarkMode ? "dark" : ""}`}>
							Professional Crypto Scanner for Explosive Move Detection
						</h1>

						<div
							style={{
								display: "flex",
								gap: "10px",
								justifyContent: "center",
								flexWrap: "wrap",
							}}
						>
							<button
								className="run-scan-button"
								onClick={handleScan1}
								disabled={isLoading || isInitialLoading}
							>
								<img
									src="/assets/icons/loading-icon.svg"
									alt="loading"
									className="spinner"
								/>
								<span>Scanning...</span>
							</button>
						</div>
					</div>

					<div className="crypto-section">
						<h2 className={`section-title ${isDarkMode ? "dark" : ""}`}>
							Top 5 Crypto Currencies By Market Capitalization
						</h2>
						<div className="crypto-cards">
							{Array.from({ length: 5 }, (_, index) => (
								<SkeletonCryptoCard key={`skeleton-card-${index}`} />
							))}
						</div>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className={`dashboard-container ${isDarkMode ? "dark" : ""}`}>
			<PageHeader />
			<main className="main-content">
				<div className="welcome-section">
					<h1 className={`main-title ${isDarkMode ? "dark" : ""}`}>
						Professional Crypto Scanner for Explosive Move Detection
					</h1>

					<div
						style={{
							display: "flex",
							gap: "10px",
							justifyContent: "center",
							flexWrap: "wrap",
						}}
					>
						<button
							className="run-scan-button"
							onClick={handleScan1}
							disabled={isLoading || isInitialLoading}
						>
							{(isLoading || isInitialLoading) ? (
								<img
									src="/assets/icons/loading-icon.svg"
									alt="loading"
									className="spinner"
								/>
							) : (
								<img src="/assets/icons/bit-icon.svg" alt="scan icon" />
							)}
							<span>{(isLoading || isInitialLoading) ? "Scanning..." : "Run Scan"}</span>
						</button>
					</div>
				</div>

				{error && <div className="error-message">{error}</div>}

				{cryptoData.length > 0 && (
					<div className="crypto-section">
						<h2 className={`section-title ${isDarkMode ? "dark" : ""}`}>
							Top 5 Crypto Currencies By Market Capitalization
						</h2>
						<div className="crypto-cards">
							{cryptoData.slice(0, 5).map((coin, index) => (
								<button
									key={coin.id || index}
									className={`crypto-card ${isDarkMode ? "dark" : ""}`}
									onClick={() => handleCardClick(coin.id || coin.symbol)}
								>
									<div className="flex-alignment">
										<div className="coin-icon">
											<div className="coin-symbol">
												<img src={coin.image} alt={coin.symbol} />
											</div>
										</div>
										<div className="coin-info">
											<h3 className="coin-name">{coin.symbol}</h3>
											<p className="coin-name font-12"> {coin.name}</p>
										</div>
									</div>
									<div>
										<p className="coin-price">
											{formatPrice(coin.current_price)}
										</p>
										<p
											style={{
												color:
													coin.price_change_percentage_24h < 0
														? "red"
														: "#14c59f",
												paddingTop: "5px",
											}}
										>
											{getPercentageIcon(coin.price_change_percentage_24h)}
											{coin.price_change_percentage_24h?.toFixed(2)}% (1d)
										</p>
									</div>
								</button>
							))}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
