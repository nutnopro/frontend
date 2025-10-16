// src/context/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

/** ===== PALETTE from your spec ===== */
const LIGHT = {
  primary: '#3A7AFE',
  primaryPressed: '#2F63D1',
  accent: '#00C6AE',
  bg: '#FFFFFF',
  bgOverlay: '#FFFFFFCC',     // overlay บน AR
  card: '#F2F4F7',
  text: '#1A1A1A',
  textDim: '#4F4F4F',
  border: '#E4E6EB',
  tabBar: '#FFFFFF',
};
const DARK = {
  primary: '#5B9BFF',
  primaryPressed: '#3F6FC7',
  accent: '#00E1C4',
  bg: '#0E1114',
  bgOverlay: '#171B20CC',
  card: '#1C2025',
  text: '#FFFFFF',
  textDim: '#B3B3B3',
  border: '#2C2F33',
  tabBar: '#0E1114',
};

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const colors = isDark ? DARK : LIGHT;

  const value = useMemo(() => ({
    isDark,
    colors,
    toggleTheme: () => setIsDark(v => !v),
    setDark: (v) => setIsDark(!!v),
  }), [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
  