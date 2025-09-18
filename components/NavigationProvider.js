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
     
      router.push(path);
    };
    
    // Set the navigation function for both API clients
    apiClient.setNavigate(navigate);
    apiService.setNavigate(navigate);
    
   
    
    // Test the navigation setup
    if (typeof window !== 'undefined') {
      window.testNavigation = () => {
       
       
       
       
       
       
       
        
        if (apiClient.navigate && typeof apiClient.setNavigate === 'function') {
         
        } else {
         
        }

        if (apiService.navigate && typeof apiService.setNavigate === 'function') {
         
        } else {
         
        }
      };
    }
    
    // Cleanup on unmount
    return () => {
      apiClient.setNavigate(null);
      apiService.setNavigate(null);
     
    };
  }, [router]);

  return children;
}
