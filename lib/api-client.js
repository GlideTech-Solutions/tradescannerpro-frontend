/**
 * Client-side API service that communicates with our Next.js API routes
 */

class ApiClient {
  constructor() {
    this.baseURL = '/api';
  }

  /**
   * Generic request method with enhanced error handling
   */
  async request(endpoint, options = {}) {
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
        // Clear any client-side auth state if needed
        if (typeof window !== 'undefined') {
          localStorage.removeItem('scan_result');
          localStorage.removeItem('last_scan_time');
        }
        throw new Error('Session expired. Please log in again.');
      }

      // Handle 403 - Forbidden
      if (response.status === 403) {
        throw new Error('Access denied. You do not have permission to access this resource.');
      }

      // Handle 429 - Too Many Requests
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      }

      // Handle 500+ - Server errors
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }

      // Handle other HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      // Network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      // CORS errors
      if (error.message.includes('CORS')) {
        throw new Error('Connection error. Please refresh the page and try again.');
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
