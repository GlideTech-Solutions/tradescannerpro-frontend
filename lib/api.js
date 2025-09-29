/**
 * Centralized API service layer for the application
 * Handles authentication, error handling, and API communication
 */

import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const API_BASE_URL = 'https://crypto-scanner-backend-production.up.railway.app/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.navigate = null; // Will be set by the navigation provider
  }

  /**
   * Set the navigation function (usually from useRouter)
   */
  setNavigate(navigateFunction) {
   
    this.navigate = navigateFunction;
  }

  /**
   * Get auth token from cookies
   */
  getAuthToken() {
    return Cookies.get('auth_token');
  }

  /**
   * Set auth token in cookies
   */
  setAuthToken(token) {
    Cookies.set('auth_token', token, { 
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  /**
   * Remove auth token
   */
  removeAuthToken() {
    Cookies.remove('auth_token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  /**
   * Generic request method
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 - Unauthorized
      if (response.status === 401) {
        const errorMessage = 'Session expired. Please log in again.';
        
        // Show toast notification
        toast.error(errorMessage);
        
        this.removeAuthToken();
        if (typeof window !== 'undefined') {
          // Use router navigation if available, fallback to window.location
          setTimeout(() => {
            if (this.navigate) {
             
              this.navigate('/login');
            } else {
             
              window.location.href = '/login';
            }
          }, 1000);
        }
        throw new Error(errorMessage);
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  /**
   * POST request
   */
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options,
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }

  // Auth endpoints
  async login(email, password) {
    const response = await this.post('/auth/login', { email, password });
    if (response.data?.access_token) {
      this.setAuthToken(response.data.access_token);
    }
    return response;
  }

  async logout() {
   
    this.removeAuthToken();
    if (typeof window !== 'undefined') {
  // Use router.push('/login') in your component instead of direct window.location
    }
  }

  // Crypto endpoints - use Next.js API routes instead of direct external calls
  async scanCrypto() {
    // Use Next.js API route for scan
    const url = `/api/crypto/scan`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.status === 401) {
      const errorMessage = 'Session expired. Please log in again.';
      toast.error(errorMessage);
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (this.navigate) {
            this.navigate('/login');
          } else {
            window.location.href = '/login';
          }
        }, 1000);
      }
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  async getTop5() {
    // Use Next.js API route for top5
    const url = `/api/crypto/top5`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.status === 401) {
      const errorMessage = 'Session expired. Please log in again.';
      toast.error(errorMessage);
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (this.navigate) {
            this.navigate('/login');
          } else {
            window.location.href = '/login';
          }
        }, 1000);
      }
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  async getCoinHistory(coinId) {
    // Use Next.js API route for coin history
    const url = `/api/crypto/coin/${coinId}/history`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.status === 401) {
      const errorMessage = 'Session expired. Please log in again.';
      toast.error(errorMessage);
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (this.navigate) {
            this.navigate('/login');
          } else {
            window.location.href = '/login';
          }
        }, 1000);
      }
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  // Add more API methods as needed
  async getMarketBreakouts() {
    // Use Next.js API route for market breakouts
    const url = `/api/crypto/market-breakouts`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.status === 401) {
      const errorMessage = 'Session expired. Please log in again.';
      toast.error(errorMessage);
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (this.navigate) {
            this.navigate('/login');
          } else {
            window.location.href = '/login';
          }
        }, 1000);
      }
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  async getExplosiveMoves() {
    // Use Next.js API route for explosive moves
    const url = `/api/crypto/explosive-moves`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.status === 401) {
      const errorMessage = 'Session expired. Please log in again.';
      toast.error(errorMessage);
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (this.navigate) {
            this.navigate('/login');
          } else {
            window.location.href = '/login';
          }
        }, 1000);
      }
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  // Category-based scan endpoints - call Next.js API route
  async scanCryptoByCategory(category) {
    // Use Next.js API route for category scans
    const url = `/api/crypto/scan?category=${category}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for authentication
    });
    
    if (response.status === 401) {
      const errorMessage = 'Session expired. Please log in again.';
      toast.error(errorMessage);
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          if (this.navigate) {
            this.navigate('/login');
          } else {
            window.location.href = '/login';
          }
        }, 1000);
      }
      throw new Error(errorMessage);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  async getNeutralPicks() {
    return this.scanCryptoByCategory('neutral');
  }

  async getBullishPicks() {
    return this.scanCryptoByCategory('strong_bullish');
  }

  async getBearishPicks() {
    return this.scanCryptoByCategory('strong_bearish');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;

// Export individual methods for convenience
export const {
  login,
  logout,
  scanCrypto,
  getTop5,
  getCoinHistory,
  getMarketBreakouts,
  getExplosiveMoves,
  getNeutralPicks,
  getBullishPicks,
  getBearishPicks,
  scanCryptoByCategory,
  isAuthenticated,
} = apiService;
