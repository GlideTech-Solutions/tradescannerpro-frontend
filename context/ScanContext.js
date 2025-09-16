'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

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
    setScanResult(data);
    setLastScanTime(new Date()); // Automatically set scan time when result is updated
    setError(null);
  };

  const clearScanResult = () => {
    setScanResult(null);
    setLastScanTime(null);
    setError(null);
  };

  const setLoadingState = (loading) => {
    setIsLoading(loading);
  };

  const setErrorState = (error) => {
    setError(error);
    setIsLoading(false);
  };

  const value = {
    scanResult,
    isLoading,
    error,
    lastScanTime,
    updateScanResult,
    clearScanResult,
    setLoadingState,
    setErrorState,
  };

  return (
    <ScanContext.Provider value={value}>
      {children}
    </ScanContext.Provider>
  );
};
