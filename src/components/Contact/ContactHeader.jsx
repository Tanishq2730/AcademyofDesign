"use client";
import { motion } from "framer-motion";
import styles from "./Contact.module.scss";

export default function ContactHeader() {
  return (
    <header className={styles.headerBlock}>
      <motion.span 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.tagline}
      >
        Learn | Lead | Innovate
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7 }}
      >
        Get in touch with us to elevate your career
      </motion.h1>
    </header>
  );
}
