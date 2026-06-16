"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import styles from "./CoursesCatalog.module.scss";
import categories from "@/data/courses.json";
import CourseCard from "@/components/Cards/CourseCard";

gsap.registerPlugin(ScrollTrigger);

export default function CoursesCatalog() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const tabsRef      = useRef(null);
  const cardsRef     = useRef(null);

  const active = categories.find((c) => c.id === activeId);

  /* Section entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 44, opacity: 0, stagger: 0.12, duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
      });
      gsap.from(tabsRef.current, {
        y: 28, opacity: 0, duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: tabsRef.current, start: "top 88%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Card stagger on category change */
  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll("[data-course-card]");
    gsap.fromTo(
      cards,
      { y: 44, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.72, stagger: 0.1, ease: "expo.out" }
    );
  }, [activeId]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.wrapper}>

        {/* ── Section header ── */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>Our Programs</span>
          <h2 className={styles.title}>
            Category <em>Catalog</em>
          </h2>
        </div>

        {/* ── Horizontal tab nav ── */}
        <div ref={tabsRef} className={styles.tabNav}>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`${styles.tab} ${activeId === c.id ? styles.tabActive : ""}`}
            >
              {/* Sliding pill background */}
              {activeId === c.id && (
                <motion.div
                  layoutId="catalog-tab-bg"
                  className={styles.tabBg}
                  style={{ background: `${c.accent}16`, borderColor: `${c.accent}40` }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}

              {/* Color dot */}
              <span className={styles.tabDot} style={{ background: c.accent }} />

              {/* Name */}
              <span className={styles.tabName}>{c.name}</span>

              {/* Count badge */}
              <span
                className={styles.tabBadge}
                style={activeId === c.id ? { color: c.accent, background: `${c.accent}18`, borderColor: `${c.accent}38` } : {}}
              >
                {c.courses.length}
              </span>
            </button>
          ))}
        </div>

        {/* ── Category sub-header ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.23, 1, 0.32, 1] } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
          >
            <div className={styles.catHead}>
              <div>
                <span className={styles.catTag} style={{ color: active.accent, background: `${active.accent}12`, borderColor: `${active.accent}30` }}>
                  {active.tagline}
                </span>
                <h3 className={styles.catTitle}>{active.name}</h3>
              </div>
              <span className={styles.catCount}>{active.courses.length}&nbsp;Programs Available</span>
            </div>

            {/* ── Cards grid ── */}
            <div ref={cardsRef} className={styles.grid}>
              {active.courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  accent={active.accent}
                  category={active.name}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
