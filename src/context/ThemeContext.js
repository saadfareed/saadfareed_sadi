import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getPreferredTheme, THEME_STORAGE_KEY } from '@lib/theme';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState('dark');

  useEffect(() => {
    const theme = getPreferredTheme();
    setColorMode(theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    setColorMode(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ colorMode, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export default ThemeContext;
