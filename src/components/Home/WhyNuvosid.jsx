"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./WhyNuvosid.module.scss";

const TOOLS = ["AutoCAD", "Revit", "SketchUp", "Adobe CC", "3ds Max", "Lumion"];
const PARTNERS = ["Autodesk", "Skill India", "Bentley", "NSDC", "CIOB"];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function WhyNuvosid() {
  return (
    <section className={styles.section}>
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── Header ── */}
        <motion.div className={styles.header} {...fade()}>
          <p className={styles.eyebrow}>Data-Backed Excellence</p>
          <h2 className={styles.title}>
            Why <span>Nuvosid?</span>
          </h2>
          <p className={styles.subtitle}>
            5+ years of results-driven design education with measurable industry outcomes.
          </p>
        </motion.div>

        {/* ══ BENTO GRID ══ */}
        <div className={styles.bento}>

          {/* ── A: Big hero stat ── */}
          <motion.div className={`${styles.card} ${styles.cardStudents}`} {...fade(0.05)}>
            <div className={styles.ghostNum}>5K+</div>
            <p className={styles.bigValue}>5,000+</p>
            <p className={styles.bigLabel}>Students Trained</p>
            <p className={styles.bigSub}>
              Across multiple design &amp; engineering disciplines
            </p>
            <div className={styles.toolTags}>
              {TOOLS.map((t) => (
                <span key={t} className={styles.toolTag}>{t}</span>
              ))}
            </div>
          </motion.div>

          {/* ── B ── */}
          <motion.div className={`${styles.card} ${styles.cardB}`} {...fade(0.08)}>
            <div className={styles.ghostNum}>300+</div>
            <p className={styles.statValue}>300+</p>
            <p className={styles.statLabel}>International Career Transitions</p>
            <p className={styles.statSub}>To high-paying design roles globally</p>
          </motion.div>

          {/* ── C ── */}
          <motion.div className={`${styles.card} ${styles.cardC}`} {...fade(0.11)}>
            <div className={styles.ghostNum}>400+</div>
            <p className={styles.statValue}>400+</p>
            <p className={styles.statLabel}>Industry Experts as Educators</p>
            <p className={styles.statSub}>From diverse professional backgrounds</p>
          </motion.div>

          {/* ── D ── */}
          <motion.div className={`${styles.card} ${styles.cardD}`} {...fade(0.14)}>
            <div className={styles.ghostNum}>40+</div>
            <p className={styles.statValue}>40+</p>
            <p className={styles.statLabel}>Real-World Projects</p>
            <p className={styles.statSub}>To practice and learn on per cohort</p>
          </motion.div>

          {/* ── E: Left col top ── */}
          <motion.div className={`${styles.card} ${styles.cardE}`} {...fade(0.1)}>
            <div className={styles.ghostNum}>50+</div>
            <p className={styles.statValue}>50+</p>
            <p className={styles.statLabel}>Graduates Started Own Firm</p>
          </motion.div>

          {/* ── F: Centre image ── */}
          <motion.div className={`${styles.card} ${styles.cardImage}`} {...fade(0.12)}>
            <Image
              src="/assets/hero-male.png"
              alt="Nuvosid student"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              unoptimized
            />
            <div className={styles.imageBadge}>
              <p className={styles.imageBadgeVal}>₹25.5L INR</p>
              <p className={styles.imageBadgeSub}>🇮🇳 Highest CTC in India</p>
            </div>
          </motion.div>

          {/* ── G: Partnerships ── */}
          <motion.div className={`${styles.card} ${styles.cardPartners}`} {...fade(0.15)}>
            <p className={styles.statValue}>6+</p>
            <p className={styles.statLabel}>Industry Partnerships</p>
            <div className={styles.partnerList}>
              {PARTNERS.map((p) => (
                <span key={p} className={styles.partnerTag}>{p}</span>
              ))}
            </div>
          </motion.div>

          {/* ── H: Ratings (tall — spans 2 rows) ── */}
          <motion.div className={`${styles.card} ${styles.cardRatings}`} {...fade(0.18)}>
            <p className={styles.ratingsTitle}>Rated by Students</p>
            <div className={styles.ratingRow}>
              <div className={styles.ratingStars}>★★★★★</div>
              <p className={styles.ratingVal}>4.6<span>/5</span></p>
              <p className={styles.ratingPlatform}>Google</p>
            </div>
            <div className={styles.ratingDivider} />
            <div className={styles.ratingRow}>
              <div className={styles.ratingStars}>★★★★★</div>
              <p className={styles.ratingVal}>4.5<span>/5</span></p>
              <p className={styles.ratingPlatform}>Trustpilot</p>
            </div>
          </motion.div>

          {/* ── I: Left col bottom ── */}
          <motion.div className={`${styles.card} ${styles.cardI}`} {...fade(0.13)}>
            <div className={styles.ghostNum}>254K</div>
            <p className={styles.statValue}>254K AED</p>
            <p className={styles.statLabel}>Highest CTC in the Middle East</p>
          </motion.div>

          {/* ── J: Community ── */}
          <motion.div className={`${styles.card} ${styles.cardJ}`} {...fade(0.16)}>
            <div className={styles.ghostNum}>8.5K</div>
            <p className={styles.statValue}>8,500+</p>
            <p className={styles.statLabel}>Community Members</p>
            <p className={styles.statSub}>Design professionals from 50+ countries</p>
          </motion.div>

          {/* ── K: Hike ── */}
          <motion.div className={`${styles.card} ${styles.cardK}`} {...fade(0.19)}>
            <div className={styles.ghostNum}>124%</div>
            <p className={styles.statValue}>124%</p>
            <p className={styles.statLabel}>Avg. Salary Hike</p>
            <p className={styles.statSub}>For top 10% cohort graduates</p>
          </motion.div>

          {/* ── L: Retention ── */}
          <motion.div className={`${styles.card} ${styles.cardL}`} {...fade(0.22)}>
            <div className={styles.ghostNum}>257%</div>
            <p className={styles.statValue}>257%</p>
            <p className={styles.statLabel}>Avg. Hike Post 24 Months</p>
            <p className={styles.statSub}>After graduating the program</p>
          </motion.div>

          {/* ── M: Quote ── */}
          <motion.div className={`${styles.card} ${styles.cardQuote}`} {...fade(0.25)}>
            <span className={styles.quoteSymbol}>&ldquo;</span>
            <p className={styles.quoteText}>
              Our mission is skill development. There can be no development with a satiated system. Matching job creation with industry demand is the key to ending unemployment.
            </p>
            <div className={styles.quoteAuthor}>
              <div className={styles.quoteAvatar}>N</div>
              <div>
                <p className={styles.quoteName}>Prime Minister Narendra Modi</p>
                <p className={styles.quoteRole}>Prime Minister of India</p>
              </div>
            </div>
          </motion.div>

          {/* ── N: Founded / mission card ── */}
          <motion.div className={`${styles.card} ${styles.cardMission}`} {...fade(0.2)}>
            <p className={styles.missionLabel}>Our Mission</p>
            <p className={styles.missionText}>
              Transforming creative careers through world-class design education and industry partnerships.
            </p>
            <div className={styles.missionBg} aria-hidden="true" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
