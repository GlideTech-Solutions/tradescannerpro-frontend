import React, { useEffect, useState, useMemo } from "react";
import PageHeader from "../PageHeader/PageHeader";
import "./ChildMoveOpportunities.scss";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";
import ChartCard from "./ChartCard";
import { useSearchParams } from 'next/navigation';
import { useScan } from "../../context/ScanContext";
import apiClient from '../../lib/api-client';
import Loading from '../Loading';

// Helper functions for formatting
const formatPrice = (price) => {
  if (!price) return '$0.00';
  if (price < 0.01) {
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
  const [error, setError] = useState(null);
  const coinId = searchParams.get('id');

  // Find the coin data from scan results
  const coinData = useMemo(() => {
    if (!scanResult?.data || !coinId) {
      return null;
    }
    
    // Try multiple search strategies
    let foundCoin = null;
    
    // Strategy 1: Exact match
    foundCoin = scanResult.data.find(coin => coin.id === coinId);
    if (foundCoin) {
      return foundCoin;
    }
    
    // Strategy 2: String conversion match
    foundCoin = scanResult.data.find(coin => String(coin.id) === String(coinId));
    if (foundCoin) {
      return foundCoin;
    }
    
    // Strategy 3: Case-insensitive symbol match (fallback)
    foundCoin = scanResult.data.find(coin => 
      coin.symbol?.toLowerCase() === coinId?.toLowerCase() ||
      coin.name?.toLowerCase() === coinId?.toLowerCase()
    );
    
    return foundCoin || null;
  }, [scanResult, coinId]);

  useEffect(() => {
    if (coinId) {
      setLoading(true);
      setError(null);
      
        apiClient.getCoinHistory(coinId)
          .then(data => setCoinHistory(data))
          .catch(err => {
            // API client already handles 401/403/network errors and redirects
            // Just show the error message for user feedback
            setError(err.message || 'Failed to fetch coin history');
          })
        .finally(() => setLoading(false));
    }
  }, [coinId, router]);

  return (
    <div>
      <PageHeader />

      <div className="moveOpportunities-child-section">
        <div className="moveOpportunities-child-details-alignment">
          <div
            className="moveOpportunities-child-child-back-alignment"
            onClick={() => {
              router.push("/move-opportunities");
            }}
          >
            <img src="/assets/icons/arrow-small-left.svg" alt="left arrow" />
            <span>Back to Top Explosive</span>
          </div>

        

          <div
            className={`moveOpportunities-child-box-alignment ${
              isDarkMode ? "dark" : ""
            }`}
          >
            <div className="moveOpportunities-child-chart-alignment">
              <main>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                  {loading && <Loading message="Loading coin history..." />}
                  {error && (
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
                  {!loading && !error && (
                    <ChartCard 
                      coinData={coinData} 
                      coinHistory={coinHistory}
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
