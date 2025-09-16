import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';

const ThemeToggleBtn = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    // <div>
    //   <button
    //     aria-label="Toggle Dark Mode"
    //     className="toggle-button"
    //     onClick={toggleTheme}
    //   >
    //     {isDarkMode ? (
    //       // <MoonIcon className="icon" />
    //       <img src />
    //     ) : (
    //       <SunIcon className="icon" />
    //     )}
    //   </button>

    //   <button
    //     aria-label="Toggle Dark Mode"
    //     className="toggle-button"
    //     onClick={toggleTheme}
    //   >
    //     {isDarkMode ? (
    //       <MoonIcon className="icon" />
    //     ) : (
    //       <SunIcon className="icon" />
    //     )}
    //   </button>
    // </div>
    // <button
    //   aria-label="Toggle Dark Mode"
    //   className="toggle-button"
    //   onClick={toggleTheme}
    // >
    //   {isDarkMode ? (
    //     <MoonIcon className="icon" />
    //   ) : (
    //     <SunIcon className="icon" />
    //   )}
    // </button>

    <div className='custom-light-dark-theme-section'>
      <div className={isDarkMode ? 'custom-icon-alignment ' : 'custom-icon-alignment sun-bg'} onClick={toggleTheme}>
        <img src='/assets/icons/sun-icon.svg' alt='sun icon' />
      </div>

      <div className={isDarkMode ? 'custom-icon-alignment sun-bg ' : 'custom-icon-alignment'} onClick={toggleTheme}>
        <img src='/assets/icons/moon-icon.svg' alt='moon icon' />
      </div>
    </div>
  );
};

export default ThemeToggleBtn;
