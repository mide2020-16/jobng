"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearAuth,
  getStoredPhone,
  getStoredToken,
  saveAuth,
} from "@/lib/auth-client";

interface AuthContextValue {
  token: string | null;
  phone: string | null;
  isAuthenticated: boolean;
  setSession: (token: string, phone: string) => void;
  logout: () => void;
  ready: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setToken(getStoredToken());
    setPhone(getStoredPhone());
    setReady(true);
  }, []);

  const setSession = useCallback((newToken: string, newPhone: string) => {
    saveAuth(newToken, newPhone);
    setToken(newToken);
    setPhone(newPhone);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setPhone(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      phone,
      isAuthenticated: Boolean(token),
      setSession,
      logout,
      ready,
    }),
    [token, phone, setSession, logout, ready]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
