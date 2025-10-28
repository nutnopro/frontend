// src/context/ThemeContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

// === New palettes (edgy wheel-app style) ===
const LIGHT = {
  primary: '#3A7AFE',
  primaryPressed: '#2F63D1',
  accent: '#00C6AE',
  bg: '#0E1114',          // ให้พื้นหลังหน้า Home/AR ใช้ดาร์กเชิงลึก (ลุคเท่) แม้อยู่โหมด Light
  bgOverlay: '#171B20CC',
  card: '#1C2025',
  text: '#FFFFFF',
  textDim: '#B3B3B3',
  border: '#2C2F33',
  tabBar: '#0E1114',
};

const DARK = {
  primary: '#5B9BFF',     // neon-ish blue
  primaryPressed: '#3F6FC7',
  accent: '#00E1C4',      // aqua neon for indicators
  bg: '#0A0D12',          // deeper graphite
  bgOverlay: '#0E1319CC',
  card: '#161B22',        // panels/cards
  text: '#FFFFFF',
  textDim: '#97A3B6',
  border: '#1F2630',
  tabBar: '#0A0D12',
};

export function ThemeProvider({ children }) {
  // เริ่มโหมดดาร์กเพื่อให้ได้ลุคเท่ทันที
  const [isDark, setIsDark] = useState(true);
  const colors = isDark ? DARK : LIGHT;

  const value = useMemo(
    () => ({
      isDark,
      colors,
      toggleTheme: () => setIsDark(v => !v),
      setDark: (v) => setIsDark(!!v),
    }),
    [isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
