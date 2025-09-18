'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import apiClient from '../lib/api-client';
import apiService from '../lib/api';

/**
 * Navigation provider that sets up router navigation for API clients
 * This allows API clients to use router.push instead of window.location.href
 */
export default function NavigationProvider({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Set the navigation function for both API clients
    apiClient.setNavigate(router.push);
    apiService.setNavigate(router.push);
    
    // Cleanup on unmount
    return () => {
      apiClient.setNavigate(null);
      apiService.setNavigate(null);
    };
  }, [router]);

  return children;
}
