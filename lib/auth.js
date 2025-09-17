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

// Use Next.js router for navigation instead of window.location
import { useRouter } from 'next/navigation';

// Helper hook to redirect to login
export function useRequireAuth() {
  const router = useRouter();
  return () => {
    router.push('/login');
  };
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
