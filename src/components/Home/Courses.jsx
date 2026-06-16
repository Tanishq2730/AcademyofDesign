"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./Courses.module.scss";
import categories from "@/data/courses.json";
import CourseCard from "@/components/Cards/CourseCard";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   Main Section
═══════════════════════════════════════════ */
export default function Courses() {
  const sectionRef = useRef(null);
  const headerRef  = useRef(null);
  const tabsRef    = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  /* Entrance animations — header + tab bar */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 48, opacity: 0, stagger: 0.14, duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });
      gsap.from(tabsRef.current, {
        y: 30, opacity: 0, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: tabsRef.current, start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cat = categories[activeIdx];

  const cardVariants = {
    hidden:  { opacity: 0, y: 56, scale: 0.87 },
    visible: (i) => ({
      opacity: 1, y: 0, scale: 1,
      transition: { delay: i * 0.12, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: { opacity: 0, y: -18, scale: 0.95, transition: { duration: 0.22 } },
  };

  return (
    <section ref={sectionRef} className={styles.section} id="programs">

      {/* Ambient glow — changes per category */}
      <div className={styles.glow} style={{ background: cat.accent }} />

      <div className={styles.wrapper}>

        {/* ── Section header ── */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Academy Programs</span>
          <h2>
            <span className={styles.thin}>Explore Our</span>
            <span className={styles.bold}>Curated Programs</span>
          </h2>
          <p>
            An elite selection of design disciplines, crafted for those who
            aim to lead the industry with innovation and technical mastery.
          </p>
        </div>

        {/* ── Tab Navigation ── */}
        <div ref={tabsRef} className={styles.tabNav}>
          <div className={styles.tabsRow}>
            {categories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={`${styles.tab} ${i === activeIdx ? styles.tabActive : ""}`}
              >
                {/* Sliding active background */}
                {i === activeIdx && (
                  <motion.div
                    layoutId="tab-bg"
                    className={styles.tabBg}
                    style={{
                      background: `${c.accent}16`,
                      borderColor: `${c.accent}40`,
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}

                {/* Category name */}
                <span className={styles.tabName}>{c.name}</span>

                {/* Course count badge */}
                <span
                  className={styles.tabBadge}
                  style={i === activeIdx ? { color: c.accent, background: `${c.accent}18`, borderColor: `${c.accent}38` } : {}}
                >
                  {c.courses.length}
                </span>
              </button>
            ))}
          </div>

          {/* Explore all link */}
          <Link href="/courses" className={styles.exploreBtn}>
            All Programs <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── Animated panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.22 } }}
          >
            {/* Category sub-header */}
            <div className={styles.catHead}>
              <div className={styles.catLeft}>
                <span
                  className={styles.catTag}
                  style={{ color: cat.accent, background: `${cat.accent}14`, borderColor: `${cat.accent}32` }}
                >
                  {cat.tagline}
                </span>
                <h3 className={styles.catTitle}>{cat.name}</h3>
              </div>
              <span className={styles.catCount}>{cat.courses.length}&nbsp;Courses Available</span>
            </div>

            {/* Cards grid */}
            <div className={styles.grid}>
              {cat.courses.map((course, i) => (
                <motion.div
                  key={course.id}
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <CourseCard course={course} accent={cat.accent} category={cat.name} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
