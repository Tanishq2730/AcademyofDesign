"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/Auth/AuthModal";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
        <AuthModal />
      </AuthProvider>
    </ThemeProvider>
  );
}
