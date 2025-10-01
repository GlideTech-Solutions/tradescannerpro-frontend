import React, { useState, useEffect } from "react";
import "./PageHeader.scss";
import { useTheme } from "../../context/ThemeContext";
import { useScan } from "../../context/ScanContext";
import { usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
// Remove the direct API imports since we'll use apiClient

export default function PageHeader() {
	const { isDarkMode, isInitialized } = useTheme();
	const { setErrorState } = useScan();
	const router = useRouter();
	const [userName, setUserName] = useState("");
	const [userEmail, setUserEmail] = useState("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	const pathname = usePathname();

	// Get user data from localStorage
	useEffect(() => {
		if (typeof window !== "undefined") {
			const userData = localStorage.getItem("user");
			if (userData) {
				try {
					const user = JSON.parse(userData);
					setUserName(user.name || user.email || "User");
					setUserEmail(user.email || "");
				} catch (error) {
					console.error("Error parsing user data:", error);
					// If user data is corrupted, clear it
					localStorage.removeItem("user");
					setUserName("");
					setUserEmail("");
				}
			} else {
				setUserName("");
				setUserEmail("");
			}
		}
	}, [pathname]); // Re-check on route changes

	// Check if user is authenticated by checking localStorage
	const isAuthenticated = () => {
		if (typeof window === "undefined") return false;
		const userData = localStorage.getItem("user");
		
		// Debug logging
		console.log("Authentication check:", {
			userData: !!userData,
			userDataContent: userData,
			isAuthenticated: !!userData
		});
		
		return !!userData;
	};

	// Hide Run Scan on home and explosive-move-detection routes
	const hideRunScan =
		pathname === "/" || pathname === "/categories";

	const handleLogout = async () => {
		try {
			localStorage.clear();
			await apiClient.logout();
		} catch (error) {
			console.error("Logout error:", error);
		}
		// Always redirect to login after logout (even on error)
		router.push("/login");
	};

	const handleScan = () => {
		// Clear any previous errors before navigating
		setErrorState(null);
		// Redirect to market-breakouts page with scan trigger parameter
		router.push("/market-breakouts?autoScan=true");
	};


	const toggleMobileMenu = () => {
		if (isMobileMenuOpen) {
			setIsClosing(true);
			setTimeout(() => {
				setIsMobileMenuOpen(false);
				setIsClosing(false);
			}, 400); // Match the CSS transition duration
		} else {
			setIsMobileMenuOpen(true);
		}
	};

	const closeMobileMenu = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsMobileMenuOpen(false);
			setIsClosing(false);
		}, 400);
	};

	const handleMenuClick = async (action) => {
		closeMobileMenu();
		if (action === "dashboard") {
			// Call scan API for dashboard
			handleScan();
		} else if (action === "top5") {
			router.push("/categories");
		} else if (action === "settings") {
			router.push("/setting");
		} else if (action === "logout") {
			handleLogout();
		}
	};

	// Don't render until theme is initialized to prevent flickering
	if (!isInitialized) {
		return null;
	}

	return (
		<div className="pageHeader-section">
			<div className="pageHeader-alignment">
				<button
					className="pageHeader-logo"
					onClick={() => router.push("/")}
				>
					{isDarkMode ? (
						<img src="/assets/logo/white-logo.svg" alt="logo" />
					) : (
						<img src="/assets/logo/logo.svg" alt="logo" />
					)}
				</button>

				<div className="pageHeader-rightSide-alignment">
				
					
					{/* Desktop Menu - Only show if authenticated */}
					{isAuthenticated() && (
						<div className="menu-alignment desktop-menu">
							<ul>
								<li className={`${isDarkMode ? "dark" : ""}`}>{userName}</li>
								<li>
									<button
										className={`${isDarkMode ? "dark" : ""}`}
										onClick={() => router.push("/categories")}
									>
										Dashboard
									</button>
								</li>
								
								<li>
									<button
										className={`${isDarkMode ? "dark" : ""}`}
										onClick={handleLogout}
									>
										Logout
									</button>
								</li>
							</ul>
						</div>
					)}

					{/* Mobile Menu Button - Only show if authenticated */}
					{isAuthenticated() && (
						<button
							className={`mobile-menu-button ${isDarkMode ? "dark" : ""}`}
							onClick={toggleMobileMenu}
						>
							{isMobileMenuOpen ? (
								<img
									src="/assets/icons/close.svg"
									alt="Close Menu"
									className="menu-icon close"
								/>
							) : (
								<img
									src="/assets/icons/bars.svg"
									alt="Open Menu"
									className="menu-icon"
								/>
							)}
						</button>
					)}

					{/* Mobile Menu Backdrop - Only show if authenticated */}
					{isAuthenticated() && isMobileMenuOpen && (
						<button
							className={`mobile-menu-backdrop ${isMobileMenuOpen && !isClosing ? "show" : ""}`}
							onClick={closeMobileMenu}
						></button>
					)}

					{/* Mobile Menu - Only show if authenticated */}
					{isAuthenticated() && (
						<div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
						{/* Menu Content */}
						<div className={`mobile-menu-content ${isDarkMode ? "dark" : ""}`}>
							{/* User Profile Section */}
							<div className="mobile-menu-user-profile">
								<div className="user-avatar">
									<div className="avatar-icon">
										<img src="/assets/icons/avatar.svg" alt="User" />
									</div>
								</div>
								<div className="user-info">
									<div className="user-name">{userName}</div>
									<div className="user-email">{userEmail}</div>
								</div>
							</div>

							{/* Navigation Items */}
							<div className="mobile-menu-nav">
								<button
									className="mobile-menu-nav-item"
									onClick={() => handleMenuClick("top5")}
								>
									<img
										src="/assets/icons/dashboard.svg"
										alt="Dashboard"
										className=""
									/>
									<span>Dashboard</span>
								</button>

							


								<button
									className="mobile-menu-nav-item"
									onClick={() => handleMenuClick("logout")}
								>
									<img
										src="/assets/icons/sign-out-alt.svg"
										alt="Logout"
										className="nav-icon"
									/>
									<span>Logout</span>
								</button>
							</div>
						</div>
						</div>
					)}
					{hideRunScan || isAuthenticated() && (
						<>
							{/* Desktop Run Scan Button */}
							<div className="headerrun-button-alignment desktop-scan-button">
								<button onClick={handleScan}>
									<img src="/assets/icons/bit-icon.svg" alt="bit icon" />
									<span>Run Scan</span>
								</button>
							</div>

							{/* Mobile Run Scan Button */}
							<div className="headerrun-button-alignment mobile-scan-button">
								<div
									onClick={handleScan}
									className="scan-button-mobile"
									aria-label="Run Scan"
								>
									<img src="/assets/icons/button.svg" alt="scan icon" />
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
