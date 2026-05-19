"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import styles from "./Workshops.module.scss";

export default function WorkshopsHeader() {
  return (
    <header className={styles.header}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.badge}
      >
        <Sparkles size={12} fill="currentColor" /> Premium Short-Term Bootcamps
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Nuvosid <span>Masterclasses.</span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Master advanced architectural drafting blueprints, Figma design system variables, or construction principles in our highly immersive, intensive single-day workshops.
      </motion.p>
    </header>
  );
}
