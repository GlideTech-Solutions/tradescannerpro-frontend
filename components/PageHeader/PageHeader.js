import React, { useState, useEffect } from "react";
import "./PageHeader.scss";
import { useTheme } from "../../context/ThemeContext";
import { useScan } from "../../context/ScanContext";
import { usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";

export default function PageHeader() {
  const { isDarkMode, isInitialized } = useTheme();
  const { setErrorState } = useScan();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();

  // Get username from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          setUserName( user.email || "User");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  // Hide Run Scan on home and explosive-move-detection routes
  const hideRunScan =
    pathname === "/" || pathname === "/explosive-move-detection";

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
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (action) => {
    setIsMobileMenuOpen(false);
    if (action === 'dashboard') {
      router.push("/move-opportunities");
    } else if (action === 'logout') {
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
        <div
          className="pageHeader-logo"
          onClick={() => {
            router.push("/");
          }}
        >
          {isDarkMode ? (
            <img src="/assets/logo/white-logo.svg" alt="logo" />
          ) : (
            <img src="/assets/logo/logo.svg" alt="logo" />
          )}
        </div>

        <div className="pageHeader-rightSide-alignment">
          {/* Desktop Menu */}
          <div className="menu-alignment desktop-menu">
            <ul>
              <li className={`${isDarkMode ? "dark" : ""}`}>
                {userName}
              </li>
              <li
                className={`${isDarkMode ? "dark" : ""}`}
                onClick={() => {
                  router.push("/move-opportunities");
                }}
              >
                Dashboard
              </li>
              <li
                className={`${isDarkMode ? "dark" : ""}`}
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className={`mobile-menu-button ${isDarkMode ? 'dark' : ''}`} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <img src="/assets/icons/close.svg" alt="Close Menu" className="menu-icon close" />
            ) : (
              <img src="/assets/icons/bars.svg" alt="Open Menu" className="menu-icon" />
            )}
          </div>

          {/* Mobile Menu Backdrop */}
          {isMobileMenuOpen && (
            <div 
              className="mobile-menu-backdrop" 
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>
          )}

          {/* Mobile Menu */}
          <div className={`mobile-menu ${isDarkMode ? 'dark' : ''} ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="mobile-menu-content">
              <div className={`mobile-menu-item ${isDarkMode ? "dark" : ""}`}>
                {userName}
              </div>
              <div 
                className={`mobile-menu-item ${isDarkMode ? "dark" : ""}`}
                onClick={() => handleMenuClick('dashboard')}
              >
                Dashboard
              </div>
              <div 
                className={`mobile-menu-item ${isDarkMode ? "dark" : ""}`}
                onClick={() => handleMenuClick('logout')}
              >
                Logout
              </div>
            </div>
          </div>
          {!hideRunScan && (
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
                <div onClick={handleScan}>
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
