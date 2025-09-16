/**
 * Client-side authentication utilities
 */

/**
 * Check if the user is authenticated by making a request to verify the cookie
 */
export async function checkAuth() {
  try {
    const response = await fetch('/api/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });
    return response.ok;
  } catch (error) {
    console.error('Auth check failed:', error);
    return false;
  }
}

/**
 * Redirect to login if not authenticated
 */
export function requireAuth() {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

/**
 * Hook to check authentication status
 */
export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(null);

  React.useEffect(() => {
    checkAuth().then(setIsAuthenticated);
  }, []);

  return isAuthenticated;
}
