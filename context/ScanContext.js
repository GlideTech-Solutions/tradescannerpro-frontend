'use client';
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

const ScanContext = createContext();

export const useScan = () => {
  const context = useContext(ScanContext);
  if (!context) {
    throw new Error('useScan must be used within a ScanProvider');
  }
  return context;
};

export const ScanProvider = ({ children }) => {
  const [scanResult, setScanResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastScanTime, setLastScanTime] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryHeading, setCategoryHeading] = useState('Top Explosive Move Opportunities');
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // Load scan result and last scan time from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('scan_result');
      const storedTime = localStorage.getItem('last_scan_time');
      
      if (stored) {
        try {
          setScanResult(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse stored scan result:', e);
          localStorage.removeItem('scan_result');
        }
      }
      
      if (storedTime) {
        try {
          setLastScanTime(new Date(storedTime));
        } catch (e) {
          console.error('Failed to parse stored scan time:', e);
          localStorage.removeItem('last_scan_time');
        }
      }
    }
  }, []);

  // Save to localStorage whenever scanResult or lastScanTime changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (scanResult) {
        localStorage.setItem('scan_result', JSON.stringify(scanResult));
      } else {
        localStorage.removeItem('scan_result');
      }
    }
  }, [scanResult]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (lastScanTime) {
        localStorage.setItem('last_scan_time', lastScanTime.toISOString());
      } else {
        localStorage.removeItem('last_scan_time');
      }
    }
  }, [lastScanTime]);

  const updateScanResult = (data) => {
    // Ensure data has proper structure for localStorage
    let structuredData = data;
    if (Array.isArray(data) || (data && !data.data && typeof data === 'object')) {
      structuredData = { data: data };
    }
    
    setScanResult(structuredData);
    setLastScanTime(new Date()); // Automatically set scan time when result is updated
    setError(null);
    setIsLoading(false); // Ensure loading state is false when data is updated
  };

  const clearScanResult = () => {
    setScanResult(null);
    setLastScanTime(null);
    setError(null);
    
    // Also clear localStorage immediately
    if (typeof window !== 'undefined') {
      localStorage.removeItem('scan_result');
      localStorage.removeItem('last_scan_time');
    }
  };

  const getLocalStorageStatus = () => {
    if (typeof window !== 'undefined') {
      const storedResult = localStorage.getItem('scan_result');
      const storedTime = localStorage.getItem('last_scan_time');
      return {
        hasScanResult: !!storedResult,
        hasLastScanTime: !!storedTime,
        scanResultSize: storedResult ? storedResult.length : 0,
        lastScanTimeValue: storedTime
      };
    }
    return { hasScanResult: false, hasLastScanTime: false, scanResultSize: 0, lastScanTimeValue: null };
  };

  const setLoadingState = (loading) => {
    setIsLoading(loading);
  };

  const setErrorState = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const updateCategory = (category) => {
    setCurrentCategory(category);
    // Set dynamic heading based on category
    switch (category) {
      case 'neutral':
        setCategoryHeading('Top Neutral');
        break;
      case 'strong_bullish':
        setCategoryHeading('Top Bullish Picks');
        break;
      case 'strong_bearish':
        setCategoryHeading('Top Bearish Picks');
        break;
      default:
        setCategoryHeading('Top Explosive Move Opportunities');
    }
  };

  const setCategoryLoadingState = (loading) => {
    setIsCategoryLoading(loading);
  };

  const value = useMemo(() => ({
    scanResult,
    isLoading,
    error,
    lastScanTime,
    currentCategory,
    categoryHeading,
    isCategoryLoading,
    updateScanResult,
    clearScanResult,
    setLoadingState,
    setErrorState,
    updateCategory,
    setCategoryLoadingState,
    getLocalStorageStatus,
  }), [
    scanResult,
    isLoading,
    error,
    lastScanTime,
    currentCategory,
    categoryHeading,
    isCategoryLoading,
    updateScanResult,
    clearScanResult,
    setLoadingState,
    setErrorState,
    updateCategory,
    setCategoryLoadingState,
    getLocalStorageStatus,
  ]);

  return (
    <ScanContext.Provider value={value}>
      {children}
    </ScanContext.Provider>
  );
};

ScanProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
