"use client";
import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isOpen, setIsOpen]   = useState(false);
  const [mode,   setMode]     = useState("login"); // "login" | "signup"

  const openModal  = useCallback((initialMode = "login") => {
    setMode(initialMode);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <AuthContext.Provider value={{ isOpen, mode, setMode, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
