import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // {role: 'visitor'|'user'|'admin', email?: string}

  const login = (payload) => setUser(payload || { role: 'visitor' });
  const logout = () => setUser(null);

  const value = useMemo(() => ({
    user,
    isLoggedIn: !!user,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
