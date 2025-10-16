// src/context/AuthContext.js
import React, { createContext, useContext, useMemo, useState } from 'react';

/**
 * โครงสร้างสถานะผู้ใช้:
 *   user = null                      // ยังไม่ล็อกอิน
 *   user = { role: 'visitor'|'user'|'admin', email?: string }
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // payload ตัวอย่าง: { role:'user', email:'demo@arwheel.com' }
  const login = (payload) => setUser(payload || { role: 'visitor' });
  const logout = () => setUser(null);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: !!user,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
