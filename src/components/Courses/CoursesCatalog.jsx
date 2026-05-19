"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import styles from "./CoursesCatalog.module.scss";

import categories from "@/data/courses.json";

const levelColors = {
  Beginner: "rgba(72, 145, 130, 0.15)",
  Intermediate: "rgba(145, 130, 72, 0.15)",
  Advanced: "rgba(145, 72, 100, 0.15)",
};

export default function CoursesCatalog() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const sectionRef = useRef(null);
  const cardsWrapRef = useRef(null);

  const active = categories.find((c) => c.id === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section fade-in
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      }
    );

    // Tabs parallax on scroll
    gsap.to(`.${styles.tabsPanel}`, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  // Animate cards when category switches
  useEffect(() => {
    if (!cardsWrapRef.current) return;
    const cards = cardsWrapRef.current.querySelectorAll(`.${styles.courseCard}`);
    gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
      }
    );
  }, [activeCategory]);

  return (
    <section ref={sectionRef} className={styles.catalogSection}>
      <div className={styles.inner}>
        {/* Section Header */}
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>Our Programs</p>
          <h2 className={styles.sectionTitle}>
            Category <em>Catalog</em>
          </h2>
        </div>

        <div className={styles.layout}>
          {/* ── Left: Category Tabs ── */}
          <aside className={styles.tabsPanel}>
            <p className={styles.tabsLabel}>Specializations</p>
            <div className={styles.tabs}>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ""}`}
                  style={activeCategory === cat.id ? { "--accent": cat.accent } : {}}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className={styles.tabDot} style={{ background: cat.accent }} />
                  <span className={styles.tabName}>{cat.name}</span>
                  <ChevronRight size={14} className={styles.tabArrow} />
                </button>
              ))}
            </div>

            {/* Active category info card */}
            <div
              className={styles.activeCatCard}
              style={{ borderColor: `${active.accent}33` }}
            >
              <h3 style={{ color: active.accent }}>{active.name}</h3>
              <p>{active.tagline}</p>
              <div className={styles.courseCount}>
                <span className={styles.countNum}>{active.courses.length}</span>
                <span className={styles.countLabel}>Programs Available</span>
              </div>
            </div>
          </aside>

          {/* ── Right: Course Cards ── */}
          <div className={styles.cardsArea}>
            {/* Category heading */}
            <div className={styles.catHeading}>
              <h3 style={{ color: active.accent }}>{active.name}</h3>
              <span className={styles.catTagline}>{active.tagline}</span>
            </div>

            <div ref={cardsWrapRef} className={styles.cardsGrid}>
              {active.courses.map((course, i) => (
                <Link href={`/courses/${course.id}`} key={i} className={styles.courseCard}>
                  <div className={styles.cardImage}>
                    <img src={course.image} alt={course.title} />
                    <div
                      className={styles.imageOverlay}
                      style={{ background: `linear-gradient(to top, ${active.accent}55, transparent)` }}
                    />
                    <span
                      className={styles.levelBadge}
                      style={{ background: levelColors[course.level], color: "white" }}
                    >
                      {course.level}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.durationRow}>
                      <Clock size={12} />
                      <span>{course.duration} Program</span>
                    </div>
                    <h4 className={styles.courseTitle}>{course.title}</h4>
                    <p className={styles.courseDesc}>{course.desc}</p>

                    <div className={styles.tags}>
                      {course.tags.map((tag, ti) => (
                        <span key={ti} className={styles.tag}>{tag}</span>
                      ))}
                    </div>

                    <div
                      className={styles.learnBtn}
                      style={{ "--accent": active.accent }}
                    >
                      Explore Program <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
