"use client";
import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Play } from "lucide-react";
import Link from "next/link";
import styles from "./CourseCard.module.scss";

const LEVEL_STYLE = {
  Beginner:               { color: "#4ade80", bg: "rgba(74,222,128,0.12)",   border: "rgba(74,222,128,0.28)"   },
  Intermediate:           { color: "#fbbf24", bg: "rgba(251,191,36,0.12)",  border: "rgba(251,191,36,0.28)"  },
  Advanced:               { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.28)" },
  "Beginner to Advanced": { color: "#4ade80", bg: "rgba(74,222,128,0.12)",   border: "rgba(74,222,128,0.28)"   },
};

export default function CourseCard({ course, accent, category }) {
  const cardRef  = useRef(null);
  const videoRef = useRef(null);
  const rafRef   = useRef(null);
  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    videoRef.current?.pause();
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rx", "0deg");
      cardRef.current.style.setProperty("--ry", "0deg");
    }
  }, []);

  const onMove = useCallback((e) => {
    if (!cardRef.current) return;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      cardRef.current.style.setProperty("--rx", `${y * -8}deg`);
      cardRef.current.style.setProperty("--ry", `${x *  8}deg`);
    });
  }, []);

  const lvl = LEVEL_STYLE[course.level];

  return (
    <Link
      ref={cardRef}
      href={`/courses/${course.id}`}
      className={styles.card}
      data-course-card
      style={{ "--accent": accent, "--rx": "0deg", "--ry": "0deg" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* ── Preview ── */}
      <div className={styles.preview}>
        <img
          src={course.image}
          alt={course.title}
          className={hovered && course.video ? styles.imgHide : ""}
        />
        {course.video && (
          <video
            ref={videoRef}
            src={course.video}
            muted loop playsInline preload="none"
            className={`${styles.vid} ${hovered ? styles.vidShow : ""}`}
          />
        )}
        <div className={styles.previewGrad} />

        {/* Category chip — top left */}
        {category && (
          <span
            className={styles.catChip}
            style={{ background: `${accent}22`, borderColor: `${accent}48`, color: accent }}
          >
            {category}
          </span>
        )}

        {/* Level badge — top right */}
        {lvl && (
          <span
            className={styles.lvlBadge}
            style={{ color: lvl.color, background: lvl.bg, borderColor: lvl.border }}
          >
            {course.level}
          </span>
        )}

        {/* Play ring — centred, appears on hover */}
        <motion.div
          className={styles.playRing}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <Play size={19} fill="white" />
        </motion.div>

        {/* Enroll strip — slides up on hover */}
        <div className={styles.enrollStrip}>
          <span>View Course</span>
          <ArrowUpRight size={14} strokeWidth={2.5} />
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.body}>
        <div className={styles.tagsRow}>
          {course.tags?.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
        </div>
        <h4>{course.title}</h4>
        <p className={styles.desc}>{course.desc}</p>
        <div className={styles.foot}>
          <span className={styles.dur}>
            <Clock size={13} strokeWidth={2} />
            {course.duration}
          </span>
          <span className={styles.cta}>
            Enroll Now <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
