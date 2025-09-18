/**
 * Client-side API service that communicates with our Next.js API routes
 */
import toast from 'react-hot-toast';

class ApiClient {
  constructor() {
    this.baseURL = '/api';
    this.navigate = null; // Will be set by the navigation provider
  }

  /**
   * Set the navigation function (usually from useRouter)
   */
  setNavigate(navigateFunction) {
   
    this.navigate = navigateFunction;
  }

  /**
   * Generic request method with enhanced error handling
   */
  async request(endpoint, options = {}) {
    const isLoginRequest = endpoint.includes('/auth/login');
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 - Unauthorized
      if (response.status === 401) {
        const errorMessage = 'Session expired. Please log in again.';
        
        // Don't show toast for login requests (Login component handles its own errors)
        if (!isLoginRequest) {
          toast.error(errorMessage);
        }
        
        // For login failures, don't redirect - let Login component handle it
        if (!isLoginRequest) {
          // Clear any client-side auth state if needed
          if (typeof window !== 'undefined') {
            localStorage.removeItem('scan_result');
            localStorage.removeItem('last_scan_time');
            
            // Use router navigation if available, fallback to window.location
            setTimeout(() => {
              if (this.navigate) {
               
                this.navigate('/login');
              } else {
               
                window.location.href = '/login';
              }
            }, 1000);
          }
        }
        throw new Error(errorMessage);
      }

      // Handle 403 - Forbidden
      if (response.status === 403) {
        const errorMessage = 'Access denied. You do not have permission to access this resource.';
        if (!isLoginRequest) {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      }

      // Handle 429 - Too Many Requests
      if (response.status === 429) {
        const errorMessage = 'Too many requests. Please wait a moment and try again.';
        if (!isLoginRequest) {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      }

      // Handle 500+ - Server errors
      if (response.status >= 500) {
        const errorMessage = 'Server error. Please try again later.';
        if (!isLoginRequest) {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        if (!isLoginRequest) {
          toast.error(errorMessage);
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      // Don't show toast for session expired errors (already handled above) or login requests
      if (!error.message?.includes('Session expired') && !isLoginRequest) {
        // Network errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          const errorMessage = 'Network error. Please check your connection and try again.';
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        // CORS errors
        if (error.message.includes('CORS')) {
          const errorMessage = 'Connection error. Please refresh the page and try again.';
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        // Other errors - show toast if not already handled
        if (!error.message?.includes('Access denied') && 
            !error.message?.includes('Too many requests') && 
            !error.message?.includes('Server error')) {
          toast.error(error.message || 'An unexpected error occurred.');
        }
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
    return this.post('/auth/login', { email, password });
  }

  async logout() {
    // Only call the API, do not redirect here. Let the component handle navigation.
    return this.post('/auth/logout');
  }

  // Crypto endpoints
  async scanCrypto() {
    return this.get('/crypto/scan');
  }

  async getCoinHistory(coinId) {
    return this.get(`/crypto/coin/${coinId}/history`);
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;
