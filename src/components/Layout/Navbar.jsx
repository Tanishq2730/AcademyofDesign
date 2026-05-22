"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Navbar.module.scss";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Workshops", href: "/workshops" },
  { name: "Placement", href: "/placement" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch authentication status and user details on load
  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/check");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setUser(data.user);
          }
        }
      } catch (err) {
        console.error("Auth check failed in Navbar:", err);
      }
    }
    checkUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout");
      if (res.ok) {
        setIsAuthenticated(false);
        setUser(null);
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : styles.notScrolled}`}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/assets/logo.png" 
            alt="Nuvosid Logo" 
            width={160} 
            height={40} 
            unoptimized
          />
        </Link>

        {/* Desktop Menu */}
        <nav className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {isAuthenticated && user ? (
            <div className={styles.profileMenuContainer}>
              <div className={styles.profileCircle}>
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className={styles.profileDropdown}>
                <div className={styles.dropdownHeader}>
                  <span className={styles.greet}>Hello,</span>
                  <span className={styles.name}>{user.name || 'Student'}</span>
                </div>
                <div className={styles.dropdownDivider} />
                <button 
                  onClick={handleLogout} 
                  className={`${styles.dropdownItem} ${styles.logoutBtn}`}
                >
                  <LogOut size={16} /> Log Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className={styles.enrollBtn}
            >
              Enroll Now
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-bold transition-colors ${isActive ? "text-[#e56b85] drop-shadow-[0_0_8px_rgba(182,123,128,0.5)]" : "text-gray-300 hover:text-white"}`}
              >
                {link.name}
              </Link>
            );
          })}

          {isAuthenticated && user ? (
            <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-3 px-2 py-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9e1030] to-[#e56b85] flex items-center justify-center text-white font-extrabold text-lg uppercase border border-white/20">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Hello,</span>
                  <span className="text-white font-bold text-base">{user.name || 'Student'}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-center px-6 py-3 rounded-full bg-red-600/10 hover:bg-red-600/20 text-red-400 font-semibold text-lg transition-colors mt-2"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-6 py-3 rounded-full bg-white text-black font-semibold text-lg"
            >
              Enroll Now
            </Link>
          )}
        </motion.div>
      )}
    </header>
  );
}

