"use client";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import styles from "./Footer.module.scss";

const exploreLinks = [
  { name: "Our Courses", href: "/courses" },
  { name: "About Us", href: "/about" },
  { name: "Workshops", href: "/workshops" },
  { name: "Placement", href: "/placement" },
  { name: "Our Work", href: "/our-work" },
  { name: "Instructors", href: "/instructors" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const { theme } = useTheme();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top section */}
        <div className={styles.topSection}>
          {/* Brand column */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <Image
                src={theme === "light" ? "/assets/logo_black.png" : "/assets/logo.png"}
                alt="Nuvosid Logo"
                width={220}
                height={50}
                unoptimized
              />
            </Link>
            <p className={styles.brandDesc}>
              A premium design academy shaping the creative leaders of tomorrow.
              Elevate your skills with industry-leading mentors and real-world projects.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Explore</h4>
            <ul className={styles.linksList}>
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Support</h4>
            <ul className={styles.linksList}>
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <Mail size={15} />
                <span>hello@nuvosid.com</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={15} />
                <span>+91 99999 99999</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={15} />
                <span>Indore, Madhya Pradesh, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <p>Subscribe for updates</p>
              <form className={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                />
                <button type="submit">Join</button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} Nuvosid Academy of Design. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
