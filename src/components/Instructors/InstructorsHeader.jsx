"use client";
import { motion } from "framer-motion";
import { Sparkles, GraduationCap, Award, Users } from "lucide-react";
import styles from "./Instructors.module.scss";

const STATS = [
  { icon: GraduationCap, value: "IIT & Wharton", label: "Alumni Faculty" },
  { icon: Award, value: "50+ Years", label: "Combined Experience" },
  { icon: Users, value: "1-on-1", label: "Personal Mentorship" },
];

export default function InstructorsHeader() {
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
            className={styles.heroEyebrow}
          >
            <span className={styles.dot} />
            <Sparkles size={13} fill="currentColor" /> Nuvosid Academy Faculty
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroTitle}
          >
            Meet the <em>Industry Experts.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroSubtitle}
          >
            Learn directly from practicing architects, structural engineers, and
            product leaders. Tap any mentor to explore their full profile,
            credentials, and the programs they lead.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroStats}
          >
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className={styles.statChip}>
                <span className={styles.statIcon}>
                  <Icon size={18} />
                </span>
                <span>
                  <span className={styles.statVal}>{value}</span>
                  <span className={styles.statLbl}>{label}</span>
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
