import React, { useEffect, useRef, useCallback } from "react";
import PageLogo from "../PageLogo/PageLogo";
import "./MarketBreakouts.scss";
import { useTheme } from "../../context/ThemeContext";
import { useScan } from "../../context/ScanContext";
import { useRouter, useSearchParams } from "next/navigation";
import apiClient from "../../lib/api-client";

export default function MarketBreakouts() {
  const { isDarkMode } = useTheme();
  const { updateScanResult, setLoadingState, setErrorState, isLoading, error } =
    useScan();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasAutoScanned = useRef(false);

  const handleScan = useCallback(async () => {
    setErrorState(null);
    setLoadingState(true);

    try {
      const data = await apiClient.scanCrypto();

      // Update scan result in context (which also saves to localStorage)
      updateScanResult(data);
      router.push("/move-opportunities");
    } catch (err) {
      // Handle 401 errors (session expired) - API client will handle redirect and toast
      if (err.message?.includes("Session expired")) {
        // Don't show error state for session expiration as user will be redirected

        return;
      }

      // API client already shows toast, just set local error state for UI
      setErrorState(err.message || "Scan failed. Please try again.");
      console.error("Scan error:", err);
    }
  }, [setErrorState, setLoadingState, updateScanResult, router]);

  useEffect(() => {
    // Auto-scan when page loads or if coming from the header "Run Scan" button
    const shouldAutoScan = searchParams.get("autoScan") === "true";
    
    // Always auto-scan once when the component mounts, unless already scanned
    if (!hasAutoScanned.current) {
      hasAutoScanned.current = true;
      handleScan();

      // Clean up the URL parameter if it exists to prevent re-execution
      if (shouldAutoScan) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("autoScan");
        window.history.replaceState({}, "", newUrl.pathname);
      }
    }
  }, [searchParams, handleScan]);

  return (
    <div className="market-breakout-detection-section">
      <PageLogo />

      <div className="market-breakout-detection-alignment">
        <div className="market-breakout-welcome-line">
          <p>Stay Ahead with Real-Time Market Scans</p>

          <h1 className={`${isDarkMode ? "dark" : ""}`}>
            Precision Scanning for Market Breakouts
          </h1>
          <div className="market-breakout-run-button-alignment">
            <button onClick={handleScan} disabled={isLoading}>
              <img src="/assets/icons/loading-icon.svg" alt="loading icon" />{" "}
              {isLoading ? "Scanning..." : "Scanning Market..."}
            </button>
          </div>
          <h4 className={`${isDarkMode ? "dark" : ""}`}>

          Scanning the blockchain noise... couple of minutes till we catch the signals.
          </h4>
            {/* <div className={`scanning-speech-bubble ${isDarkMode ? "dark" : ""}`}>
                <p>
                  Scanning the blockchain noise... couple of minutes till we catch the signals.
                </p>
              </div> */}
          <div></div>
          {error && (
            <div className="scan-error" style={{ color: "red", marginTop: 8 }}>
                {error}
            </div>
          )}
        </div>

        {/* <div className='market-breakout-bottom-section'>
                  
                    <img src='/assets/images/explosive-img.png' alt='explosive img' />

                   <video autoPlay muted loop playsInline className="">
                        <source src="/assets/video/marketBreakout.mp4" type="video/mp4" />
                    </video>
                </div> */}
      </div>
    </div>
  );
}
