import React from "react";
import "./PageHeader.scss";
import { useTheme } from "../../context/ThemeContext";
import { useScan } from "../../context/ScanContext";
import { usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";

export default function PageHeader() {
  const { isDarkMode, isInitialized } = useTheme();
  const { setErrorState } = useScan();
  const router = useRouter();

  const pathname = usePathname();

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
          <div className="menu-alignment">
            <ul>
              <li
                className={`${isDarkMode ? "dark" : ""}`}
                onClick={() => {
                  router.push("/move-opportunities");
                }}
              >
                Dashboard
              </li>
              {/* <li className={`${isDarkMode ? 'dark' : ''}`}
                            onClick={() => {
                                router.push('/setting');
                            }}>
                                Settings</li> */}
              <li
                className={`${isDarkMode ? "dark" : ""}`}
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
          {!hideRunScan && (
            <div className="headerrun-button-alignment">
              <button onClick={handleScan}>
                <img src="/assets/icons/bit-icon.svg" alt="bit icon" /> Run Scan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
