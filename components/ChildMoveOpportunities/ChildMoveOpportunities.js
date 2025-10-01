import React, { useEffect, useState, useMemo } from "react";
import PageHeader from "../PageHeader/PageHeader";
import "./ChildMoveOpportunities.scss";
import { useTheme } from "../../context/ThemeContext";
import { useRouter, useSearchParams } from "next/navigation";
import ChartCard from "./ChartCard";
import { useScan } from "../../context/ScanContext";
import apiClient from '../../lib/api-client';
import Loading from '../Loading';

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
  if (!volume) return '$0';
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`;
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`;
  } else {
    return `$${(volume / 1e3).toFixed(2)}K`;
  }
};

export default function ChildMoveOpportunities() {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { scanResult } = useScan();
  const searchParams = useSearchParams();
  const [coinHistory, setCoinHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1m');
  const coinId = searchParams.get('id');

  // Find the coin data from scan results
  const coinData = useMemo(() => {
    console.log("ChildMoveOpportunities: Finding coin data...");
    console.log("- scanResult:", scanResult);
    console.log("- coinId:", coinId);
    
    if (!scanResult?.data || !coinId) {
      console.log("No scanResult.data or coinId available");
      return null;
    }
    
    console.log("Available coins in scanResult.data:", scanResult.data.length);
    console.log("First few coins:", scanResult.data.slice(0, 3));
    
    // Try multiple search strategies
    let foundCoin = null;
    
    // Strategy 1: Exact match
    foundCoin = scanResult.data.find(coin => coin.id === coinId);
    if (foundCoin) {
      console.log("Found coin with exact ID match:", foundCoin);
      return foundCoin;
    }
    
    // Strategy 2: String conversion match
    foundCoin = scanResult.data.find(coin => String(coin.id) === String(coinId));
    if (foundCoin) {
      console.log("Found coin with string ID match:", foundCoin);
      return foundCoin;
    }
    
    // Strategy 3: Case-insensitive symbol match (fallback)
    foundCoin = scanResult.data.find(coin => 
      coin.symbol?.toLowerCase() === coinId?.toLowerCase() ||
      coin.name?.toLowerCase() === coinId?.toLowerCase()
    );
    
    if (foundCoin) {
      console.log("Found coin with symbol/name match:", foundCoin);
    } else {
      console.log("No coin found with any strategy");
    }
    
    return foundCoin || null;
  }, [scanResult, coinId]);

  useEffect(() => {
    if (coinId) {
      console.log("ChildMoveOpportunities: Fetching coin history for ID:", coinId, "Timeframe:", selectedTimeframe);
      setLoading(true);
      setError(null);
      
        apiClient.getCoinHistory(coinId, selectedTimeframe)
          .then(data => {
            console.log("ChildMoveOpportunities: API response received:", data);
            setCoinHistory(data);
          })
          .catch(err => {
            console.error("ChildMoveOpportunities: API error:", err);
            // Handle 401 errors (session expired) - API client will handle redirect and toast
            if (err.message?.includes('Session expired')) {
              // Don't show error state for session expiration as user will be redirected
             
              return;
            }
            
            // API client already shows toast, just set local error state for UI
            setError(err.message || 'Failed to fetch coin history');
          })
        .finally(() => {
          setLoading(false);
          setInitialLoading(false);
        });
    }
  }, [coinId, selectedTimeframe, router]);

  return (
    <div>
      <PageHeader />

      <div className="moveOpportunities-child-section">
        <div className="moveOpportunities-child-details-alignment">
          <button
            className="moveOpportunities-child-child-back-alignment"
            onClick={() => {
              router.back();
            }}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img src="/assets/icons/arrow-small-left.svg" alt="left arrow" />
            <span>Back</span>
          </button>

          <div
            className={`moveOpportunities-child-box-alignment ${
              isDarkMode ? "dark" : ""
            }`}
          >
            <div className="moveOpportunities-child-chart-alignment">
              <main>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                  {initialLoading && <Loading message="Loading coin history..." />}
                  {!initialLoading && error && (
                    <div style={{ 
                      color: '#dc3545', 
                      textAlign: 'center', 
                      padding: '20px',
                      backgroundColor: isDarkMode ? '#2a1f1f' : '#ffe6e6',
                      borderRadius: '8px',
                      margin: '20px 0',
                      border: '2px solid #dc3545'
                    }}>
                      <p style={{ marginBottom: '15px', fontSize: '16px', fontWeight: '500' }}>
                        ⚠️ {error}
                      </p>
                      <button 
                        onClick={() => window.location.reload()}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  {!initialLoading && !error && (
                    <ChartCard 
                      coinData={coinData} 
                      coinHistory={coinHistory}
                      selectedTimeframe={selectedTimeframe}
                      onTimeframeChange={setSelectedTimeframe}
                      isLoading={loading}
                    />
                  )}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
