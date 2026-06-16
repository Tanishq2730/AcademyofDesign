"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  ArrowRight, ChevronLeft, ChevronRight,
  CreditCard, Wallet, BarChart3, Globe, LayoutGrid,
} from "lucide-react";
import gsap from "gsap";
import styles from "./Hero.module.scss";

/* ─── Slide data ─────────────────────────────────────────── */
const SLIDES = [
  {
    num: "01",
    category: "Digital Design",
    titleLines: ["UI/UX", "Design &"],
    accent: "Solutions",
    desc: "Master the art of creating intuitive digital experiences. Crafted for designers, entrepreneurs, and product thinkers.",
    instructor: "Marcus Thorne",
    role: "Lead UI/UX Mentor",
    img: "/assets/hero-male.png",
    stats: [
      { value: "24+",  label: "Live Projects" },
      { value: "1.2k", label: "Students" },
      { value: "98%",  label: "Placement" },
    ],
  },
  {
    num: "02",
    category: "Visual Communication",
    titleLines: ["Graphic", "Design"],
    accent: "Masterclass",
    desc: "Learn brand identity, typography, and visual storytelling from award-winning creative directors.",
    instructor: "Sarah Jenkins",
    role: "Creative Director",
    img: "/assets/hero-female.png",
    stats: [
      { value: "500+", label: "Designs Made" },
      { value: "12",   label: "Awards Won" },
      { value: "4.9★", label: "Rating" },
    ],
  },
];

const DELAY      = 4000;
const CLIP_OPEN  = "polygon(8% 0%,100% 0%,100% 100%,0% 100%)";
const CLIP_CLOSE = "polygon(100% 0%,100% 0%,100% 100%,100% 100%)";

/* ─── Component ──────────────────────────────────────────── */
export default function Hero() {
  const currentRef      = useRef(0);
  const isAnimRef       = useRef(false);
  const timerRef        = useRef(null);
  const transitionFnRef = useRef(null); // always-current ref — avoids stale closures
  const contentRefs     = useRef([]);
  const imageRefs       = useRef([]);
  const numRefs         = useRef([]);

  const [display, setDisplay] = useState(0);

  /* ── Schedule next slide (setTimeout, not setInterval — fires once after anim) ── */
  const scheduleNext = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const next = (currentRef.current + 1) % SLIDES.length;
      transitionFnRef.current?.(next, 1);
    }, DELAY);
  }, []);

  /* ── Core GSAP transition ── */
  const runTransition = useCallback((newIdx, dir = 1) => {
    if (isAnimRef.current) return;
    const oldIdx = currentRef.current;
    if (newIdx === oldIdx) return;

    isAnimRef.current = true;
    clearTimeout(timerRef.current);

    const oldContent = contentRefs.current[oldIdx];
    const newContent = contentRefs.current[newIdx];
    const oldImg     = imageRefs.current[oldIdx];
    const newImg     = imageRefs.current[newIdx];
    const oldNum     = numRefs.current[oldIdx];
    const newNum     = numRefs.current[newIdx];

    if (!oldContent || !newContent || !oldImg || !newImg || !oldNum || !newNum) {
      isAnimRef.current = false;
      return;
    }

    gsap.set(newImg,     { clipPath: CLIP_CLOSE, zIndex: 2 });
    gsap.set(newNum,     { opacity: 0, x: dir * 50, zIndex: 2 });
    gsap.set(newContent, { zIndex: 2 });
    gsap.set(newContent.querySelectorAll("[data-a]"), { y: dir * 60, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([oldImg, oldContent, oldNum], { zIndex: 0 });
        currentRef.current = newIdx;
        setDisplay(newIdx);
        isAnimRef.current = false;
        scheduleNext();
      },
    });

    /* EXIT */
    tl.to(oldContent.querySelectorAll("[data-a]"), {
      y: dir * -45, opacity: 0, stagger: 0.038, duration: 0.32, ease: "power2.in",
    });
    tl.to(oldNum, { opacity: 0, x: dir * -50, duration: 0.28, ease: "power2.in" }, 0);
    tl.to(oldImg, { clipPath: "polygon(0% 0%,0% 0%,0% 100%,0% 100%)", duration: 0.52, ease: "expo.in" }, 0.08);

    /* ENTER */
    tl.to(newImg,  { clipPath: CLIP_OPEN, duration: 0.72, ease: "expo.out" }, 0.34);
    tl.to(newNum,  { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" }, 0.42);
    tl.to(newContent.querySelectorAll("[data-a]"), {
      y: 0, opacity: 1, stagger: 0.07, duration: 0.68, ease: "power4.out",
    }, 0.50);
  }, [scheduleNext]);

  /* Keep ref always current — runs every render, no stale closures in setTimeout */
  transitionFnRef.current = runTransition;

  /* ── Entrance animation ── */
  useEffect(() => {
    SLIDES.forEach((_, i) => {
      if (i === 0) return;
      const img  = imageRefs.current[i];
      const num  = numRefs.current[i];
      const cont = contentRefs.current[i];
      if (!img || !num || !cont) return;
      gsap.set(img,  { clipPath: CLIP_CLOSE, zIndex: 0 });
      gsap.set(num,  { opacity: 0, zIndex: 0 });
      gsap.set(cont, { zIndex: 0 });
      gsap.set(cont.querySelectorAll("[data-a]"), { opacity: 0, y: 40 });
    });

    const tl = gsap.timeline({ delay: 0.2, onComplete: scheduleNext });

    tl.fromTo(numRefs.current[0],
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    );
    tl.fromTo(
      contentRefs.current[0].querySelectorAll("[data-a]"),
      { y: 65, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: "power4.out" },
      0.15
    );
    tl.fromTo(
      imageRefs.current[0],
      { clipPath: CLIP_CLOSE },
      { clipPath: CLIP_OPEN, duration: 1.2, ease: "expo.out" },
      0.28
    );

    return () => {
      clearTimeout(timerRef.current);
      tl.kill();
    };
  }, [scheduleNext]);

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")
        runTransition((currentRef.current - 1 + SLIDES.length) % SLIDES.length, -1);
      if (e.key === "ArrowRight")
        runTransition((currentRef.current + 1) % SLIDES.length, 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [runTransition]);

  /* ── Touch swipe ── */
  useEffect(() => {
    let startX = 0;
    const onStart = (e) => { startX = e.touches[0].clientX; };
    const onEnd   = (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 50) return;
      if (dx < 0) runTransition((currentRef.current + 1) % SLIDES.length, 1);
      else        runTransition((currentRef.current - 1 + SLIDES.length) % SLIDES.length, -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [runTransition]);

  const goPrev = useCallback(() =>
    runTransition((currentRef.current - 1 + SLIDES.length) % SLIDES.length, -1), [runTransition]);
  const goNext = useCallback(() =>
    runTransition((currentRef.current + 1) % SLIDES.length, 1), [runTransition]);

  /* ─────────────────── JSX ─────────────────── */
  return (
    <section className={styles.hero} aria-label="Hero slider">

      {/* ── Background ── */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgNoise}  />
        <div className={styles.bgGlow}   />
        <div className={styles.bgDots}   />
        <div className={styles.bgLineL}  />
        <div className={styles.bgLineB}  />
      </div>

      <div className={styles.wrap}>
      <div className={styles.layout}>

        {/* ════ LEFT ════ */}
        <div className={styles.left}>

          {SLIDES.map((sl, i) => (
            <div
              key={i}
              ref={(el) => { numRefs.current[i] = el; }}
              className={styles.watermark}
              aria-hidden="true"
              style={{ zIndex: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0 }}
            >
              {sl.num}
            </div>
          ))}

          {SLIDES.map((sl, i) => (
            <div
              key={i}
              ref={(el) => { contentRefs.current[i] = el; }}
              className={styles.content}
              style={{ zIndex: i === 0 ? 1 : 0 }}
              aria-hidden={i !== display}
            >
              <span data-a className={styles.eyebrow}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                {sl.category}
              </span>

              <h1 className={styles.heading}>
                {sl.titleLines.map((line, li) => (
                  <span key={li} data-a className={styles.hLine}>{line}</span>
                ))}
                <span data-a className={`${styles.hLine} ${styles.hAccent}`}>
                  {sl.accent}
                </span>
              </h1>

              <p data-a className={styles.desc}>{sl.desc}</p>

              <div data-a className={styles.statsRow}>
                {sl.stats.map((s) => (
                  <div key={s.label} className={styles.statItem}>
                    <span className={styles.statVal}>{s.value}</span>
                    <span className={styles.statLbl}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div data-a className={styles.ctaRow}>
                <Link href="/enroll"  className={styles.btnPrimary}>
                  <span>Enroll Now</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
                <Link href="/courses" className={styles.btnSecondary}>
                  <span>Explore Programs</span>
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          ))}

          {/* ── Indicators (small dots with fill bar) ── */}
          <div className={styles.indicators} role="tablist" aria-label="Slides">
            {SLIDES.map((sl, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === display}
                aria-label={`Slide ${i + 1}`}
                onClick={() => runTransition(i, i > currentRef.current ? 1 : -1)}
                className={`${styles.indicator} ${i === display ? styles.iActive : ""}`}
              >
                <span className={styles.iNum}>{sl.num}</span>
                <span className={styles.iTrack} aria-hidden="true">
                  {i === display && (
                    <span
                      key={`f-${display}`}
                      className={styles.iFill}
                      style={{ animationDuration: `${DELAY}ms` }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>

        </div>{/* /left */}

        {/* ════ RIGHT — Image panels ════ */}
        <div className={styles.right}>
          {SLIDES.map((sl, i) => (
            <div
              key={i}
              ref={(el) => { imageRefs.current[i] = el; }}
              className={styles.imagePanel}
              style={{
                zIndex:   i === 0 ? 1 : 0,
                clipPath: i === 0 ? CLIP_OPEN : CLIP_CLOSE,
              }}
            >
              <img
                src={sl.img}
                alt={sl.instructor}
                className={styles.image}
                draggable={false}
              />
              <div className={styles.imageFade} aria-hidden="true" />

              <div className={styles.imageMeta}>
                <span className={styles.metaDot} aria-hidden="true" />
                <div className={styles.metaText}>
                  <span className={styles.metaName}>{sl.instructor}</span>
                  <span className={styles.metaRole}>{sl.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>{/* /layout */}
      </div>{/* /wrap */}

      {/* ── Prominent L/R navigation arrows ── */}
      <div className={styles.heroArrows} aria-label="Slider navigation">
        <button onClick={goPrev} aria-label="Previous slide" className={styles.arrowBtn}>
          <ChevronLeft size={22} strokeWidth={2} />
        </button>
        <button onClick={goNext} aria-label="Next slide" className={styles.arrowBtn}>
          <ChevronRight size={22} strokeWidth={2} />
        </button>
      </div>

      {/* ── Bottom discipline bar ── */}
      <nav className={styles.bottomBar} aria-label="Design disciplines">
        <div className={styles.barInner}>
        <div className={styles.barBrand}>
          <LayoutGrid size={15} className={styles.barIcon} />
          <span>Disciplines</span>
        </div>

        <ul className={styles.barList}>
          {[
            { Icon: CreditCard, label: "UI/UX Design" },
            { Icon: Wallet,     label: "Fashion Design" },
            { Icon: BarChart3,  label: "Interior Design" },
            { Icon: Globe,      label: "Graphic Design" },
          ].map(({ Icon, label }) => (
            <li key={label} className={styles.barItem}>
              <Icon size={13} /> {label}
            </li>
          ))}
          <li>
            <Link href="/courses" className={styles.barCta}>
              All Programs <ArrowRight size={13} />
            </Link>
          </li>
        </ul>
        </div>{/* /barInner */}
      </nav>

    </section>
  );
}
