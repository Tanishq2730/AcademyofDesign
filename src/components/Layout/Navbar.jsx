"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={styles.navLink}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/enroll"
            className={styles.enrollBtn}
          >
            Enroll Now
          </Link>
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
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/enroll"
            onClick={() => setIsOpen(false)}
            className="w-full text-center px-6 py-3 rounded-full bg-white text-black font-semibold text-lg"
          >
            Enroll Now
          </Link>
        </motion.div>
      )}
    </header>
  );
}

