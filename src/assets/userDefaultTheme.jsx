import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

const ThemedUserSVG = () => {
  const { theme } = useContext(ThemeContext);

  const circleFill = theme === 'dark' ? '#ffffff' : '#222222';
  const outerFill = theme === 'dark' ? 'rgba(255,255,255,0.2)' : '#2A4157';

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
        fill={outerFill}
        fillOpacity="0.24"
      />
      <circle cx="12" cy="10" r="4" fill={circleFill} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.2209 18.2462C18.2791 18.3426 18.2613 18.466 18.1795 18.5432C16.5674 20.0662 14.3928 21 12 21C9.60728 21 7.43264 20.0663 5.82057 18.5433C5.73877 18.466 5.72101 18.3427 5.77918 18.2463C6.94337 16.318 9.29215 15 12.0001 15C14.7079 15 17.0567 16.3179 18.2209 18.2462Z"
        fill={circleFill}
      />
    </svg>
  );
};

export default ThemedUserSVG;