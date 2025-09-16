/**
 * Time utility functions for formatting dates and relative time
 */

/**
 * Format a date as relative time (e.g., "2 minutes ago", "1 hour ago")
 */
export function formatRelativeTime(date) {
  if (!date) return 'Never';
  
  const now = new Date();
  const diffInMs = now - date;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

/**
 * Format a date for display (e.g., "Dec 15, 2023 at 2:30 PM")
 */
export function formatDateTime(date) {
  if (!date) return 'Never';
  
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Get a user-friendly scan time display with both relative and absolute time
 */
export function formatScanTime(date) {
  if (!date) return 'Never';
  
  const relative = formatRelativeTime(date);
  const absolute = formatDateTime(date);
  
  // If it's very recent, just show relative time
  if (relative === 'Just now' || relative.includes('minute')) {
    return relative;
  }
  
  // Otherwise show both
  return `${relative} (${absolute})`;
}
