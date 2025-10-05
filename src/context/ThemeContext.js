import React, { createContext, useContext, useMemo, useState } from 'react';
import baseTheme, { light, dark } from '../theme';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light'); // 'light' | 'dark'
  const isDark = mode === 'dark';
  const colors = isDark ? dark : light;

  const value = useMemo(() => ({
    mode, isDark, colors, setMode,
    toggleTheme: () => setMode(m => (m === 'light' ? 'dark' : 'light')),
  }), [mode, isDark, colors]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
