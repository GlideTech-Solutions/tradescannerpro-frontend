import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const ThemeToggleBtn = () => {
  const { isDarkMode, toggleTheme, isInitialized } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render until theme is initialized to prevent flickering
  if (!isInitialized) {
    return null;
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`custom-light-dark-theme-section ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Toggle Arrow Button */}
      <button 
        className="toggle-arrow" 
        onClick={handleToggle}
        aria-label={isExpanded ? 'Collapse theme selector' : 'Expand theme selector'}
        aria-expanded={isExpanded}
        type="button"
      >
        <svg 
          className={`arrow-icon ${isExpanded ? 'rotated' : ''}`} 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {/* Theme Toggle Buttons */}
      <div className="theme-buttons">
        <button 
          className={isDarkMode ? 'custom-icon-alignment ' : 'custom-icon-alignment sun-bg'} 
          onClick={toggleTheme}
          aria-label="Switch to light mode"
          type="button"
        >
          <img src='/assets/icons/sun-icon.svg' alt='sun icon' />
        </button>

        <button 
          className={isDarkMode ? 'custom-icon-alignment sun-bg ' : 'custom-icon-alignment'} 
          onClick={toggleTheme}
          aria-label="Switch to dark mode"
          type="button"
        >
          <img src='/assets/icons/moon-icon.svg' alt='moon icon' />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggleBtn;
