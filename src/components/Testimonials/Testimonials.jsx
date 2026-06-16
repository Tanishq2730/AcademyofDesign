"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import styles from "./Testimonials.module.scss";
import testimonials from "@/data/testimonials.json";

const AUTO_MS = 5500;

const variants = {
  enter: (dir) => ({
    x: dir > 0 ? 72 : -72,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? -72 : 72,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  }),
};

export default function Testimonials({
  title = "What Our Students Say",
  subtitle = "Real stories from designers who transformed their careers through our programs.",
  accentColor = "#db254f",
}) {
  const n = testimonials.length;
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback(
    (newIdx, direction) => {
      setDir(direction);
      setIdx(((newIdx % n) + n) % n);
    },
    [n]
  );

  const next = useCallback(() => goTo(idx + 1, 1), [idx, goTo]);
  const prev = useCallback(() => goTo(idx - 1, -1), [idx, goTo]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  const t = testimonials[idx];

  return (
    <section className={styles.section}>
      {/* Ambient glow */}
      <div className={styles.glow} style={{ background: accentColor }} />

      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.header}>
          <span
            className={styles.eyebrow}
            style={{ color: accentColor, borderColor: `${accentColor}38`, background: `${accentColor}0e` }}
          >
            Student Stories
          </span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Slider */}
        <div
          className={styles.slider}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Left arrow */}
          <button className={styles.arrow} onClick={prev} aria-label="Previous testimonial">
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Card track */}
          <div className={styles.track}>
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.div
                key={idx}
                className={styles.card}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, { offset, velocity }) => {
                  if (offset.x < -40 || velocity.x < -400) next();
                  else if (offset.x > 40 || velocity.x > 400) prev();
                }}
              >
                {/* Top row: quote icon + course badge */}
                <div className={styles.cardTop}>
                  <div className={styles.quoteIcon} style={{ color: accentColor }}>
                    <Quote size={36} strokeWidth={1.5} />
                  </div>
                  <span
                    className={styles.courseBadge}
                    style={{ color: accentColor, background: `${accentColor}14`, borderColor: `${accentColor}34` }}
                  >
                    {t.course}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className={styles.quote}>&ldquo;{t.quote}&rdquo;</blockquote>

                {/* Divider */}
                <div className={styles.divider} style={{ background: `${accentColor}28` }} />

                {/* Author row */}
                <div className={styles.author}>
                  <div
                    className={styles.avatar}
                    style={{ background: `${t.avatarColor}22`, borderColor: `${t.avatarColor}44`, color: t.avatarColor }}
                  >
                    {t.initials}
                  </div>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{t.name}</span>
                    <span className={styles.authorMeta}>
                      {t.role}&nbsp;·&nbsp;{t.company}&nbsp;·&nbsp;Batch {t.batch}
                    </span>
                  </div>
                  {/* Stars */}
                  <div className={styles.stars}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className={styles.star}>★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <button className={styles.arrow} onClick={next} aria-label="Next testimonial">
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div>

        {/* Dot navigation */}
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
              onClick={() => goTo(i, i > idx ? 1 : -1)}
              style={i === idx ? { background: accentColor, boxShadow: `0 0 8px ${accentColor}88` } : {}}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className={styles.counter}>
          <span style={{ color: accentColor }}>{String(idx + 1).padStart(2, "0")}</span>
          &nbsp;/&nbsp;{String(n).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
