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
    // Create bound navigation functions
    const navigate = (path) => {
      console.log('NavigationProvider: Navigating to', path);
      router.push(path);
    };
    
    // Set the navigation function for both API clients
    apiClient.setNavigate(navigate);
    apiService.setNavigate(navigate);
    
    console.log('NavigationProvider: Navigation functions set up');
    
    // Test the navigation setup
    if (typeof window !== 'undefined') {
      window.testNavigation = () => {
        console.log('Testing navigation setup...');
        console.log('ApiClient:', apiClient);
        console.log('ApiClient navigate function:', typeof apiClient.navigate);
        console.log('ApiClient setNavigate function:', typeof apiClient.setNavigate);
        console.log('ApiService:', apiService);
        console.log('ApiService navigate function:', typeof apiService.navigate);
        console.log('ApiService setNavigate function:', typeof apiService.setNavigate);
        
        if (apiClient.navigate && typeof apiClient.setNavigate === 'function') {
          console.log('✅ ApiClient navigation is set up correctly');
        } else {
          console.log('❌ ApiClient navigation is NOT set up properly');
        }
        if (apiService.navigate && typeof apiService.setNavigate === 'function') {
          console.log('✅ ApiService navigation is set up correctly');
        } else {
          console.log('❌ ApiService navigation is NOT set up properly');
        }
      };
    }
    
    // Cleanup on unmount
    return () => {
      apiClient.setNavigate(null);
      apiService.setNavigate(null);
      console.log('NavigationProvider: Navigation functions cleaned up');
    };
  }, [router]);

  return children;
}
