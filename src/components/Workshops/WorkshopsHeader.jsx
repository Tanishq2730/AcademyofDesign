"use client";
import { motion } from "framer-motion";
import { Sparkles, Award, Users, CalendarDays } from "lucide-react";
import styles from "./Workshops.module.scss";

const STATS = [
  { icon: CalendarDays, value: "Single-Day", label: "Immersive Bootcamps" },
  { icon: Award, value: "Certificate", label: "Awarded on Completion" },
  { icon: Users, value: "Expert-Led", label: "Industry Mentors" },
];

export default function WorkshopsHeader() {
  return (
    <section className={styles.hero}>
      {/* Decorative background layers */}
      <div className={styles.heroImage} />
      <div className={styles.heroOverlay} />
      <div className={styles.heroGrid} />
      <div className={styles.heroGlowA} />
      <div className={styles.heroGlowB} />
      <div className={styles.heroBeam} />
      <div className={styles.heroRing} />

      <div className="container position-relative" style={{ zIndex: 5 }}>
        <div className={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.eyebrow}
          >
            <span className={styles.dot} />
            <Sparkles size={13} fill="currentColor" /> Premium Short-Term Bootcamps
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroTitle}
          >
            Nuvosid <em>Masterclasses.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroSubtitle}
          >
            Master advanced architectural drafting blueprints, Figma design system
            variables, or construction principles in our highly immersive, intensive
            single-day workshops — and walk away industry certified.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroStats}
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className={styles.statChip}>
                <span className={styles.icon}>
                  <Icon size={18} />
                </span>
                <span>
                  <span className={styles.val}>{value}</span>
                  <span className={styles.lbl}>{label}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
