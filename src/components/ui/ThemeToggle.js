import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@context/ThemeContext';

const StyledToggle = styled.button`
  ${({ theme }) => theme.mixins.flexCenter};
  width: 40px;
  height: 40px;
  margin-left: 12px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  background-color: transparent;
  color: var(--secondary);
  transition: var(--transition);

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover,
  &:focus {
    background-color: var(--secondary-soft);
    outline: 0;
  }

  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 24px;
    width: 44px;
    height: 44px;
  }
`;

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ThemeToggle = ({ className }) => {
  const { colorMode, toggleTheme } = useTheme();
  const isDark = colorMode === 'dark';
  const nextMode = isDark ? 'light' : 'dark';

  return (
    <StyledToggle
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextMode} mode`}
      title={`Switch to ${nextMode} mode`}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </StyledToggle>
  );
};

export default ThemeToggle;
