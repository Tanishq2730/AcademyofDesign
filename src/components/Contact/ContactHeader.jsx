"use client";
import { motion } from "framer-motion";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import styles from "./Contact.module.scss";

const CHIPS = [
  { icon: Mail, label: "hello@nuvosid.com" },
  { icon: Phone, label: "+91 (800) 123-4567" },
  { icon: MapPin, label: "Mumbai, India" },
];

export default function ContactHeader() {
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
            <Sparkles size={13} fill="currentColor" /> Learn | Lead | Innovate
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroTitle}
          >
            Get in Touch <em>With Us.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroSubtitle}
          >
            Have a question about our programs, admissions, or workshops? Reach out —
            our team is here to help you elevate your creative career.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={styles.heroChips}
          >
            {CHIPS.map(({ icon: Icon, label }) => (
              <span key={label} className={styles.heroChip}>
                <Icon size={15} /> {label}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
