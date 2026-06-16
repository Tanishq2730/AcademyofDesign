"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./CoursesHero.module.scss";

export default function CoursesHero() {
  const heroRef  = useRef(null);
  const bgRef    = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax background on scroll
    gsap.to(bgRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Title reveal stagger
    const chars = titleRef.current.querySelectorAll("span.char");
    gsap.fromTo(
      chars,
      { y: 120, opacity: 0, rotateX: -60 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.2 }
    );

    gsap.fromTo(
      `.${styles.subText}`,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.9 }
    );

    gsap.fromTo(
      `.${styles.scrollCue}`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.4 }
    );
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>

      {/* ── Parallax BG layer ── */}
      <div ref={bgRef} className={styles.bgLayer}>
        <div className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <div className={styles.bgGrad1} />
        <div className={styles.bgGrad2} />
        <div className={styles.bgGrid} />
      </div>

      {/* ── Fixed decorative layers (no parallax) ── */}
      <div className={styles.bgBeam} />
      <div className={styles.bgRing} />
      <div className={styles.bgRingOuter} />
      <div className={styles.bgOrb} />

      {/* ── Side ruler marks ── */}
      <div className={styles.rulerLeft}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.tick}>
            <span className={styles.tickLine} />
            <span className={styles.tickNum}>{String(i * 10).padStart(2, "0")}</span>
          </div>
        ))}
      </div>
      <div className={styles.rulerRight}>
        <span className={styles.sideText}>DISCIPLINE · CRAFT · MASTERY</span>
      </div>

      {/* ── Corner brackets ── */}
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />

      {/* ── Main content ── */}
      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className={styles.content}>
              <div className={styles.eyebrow}>
                <span className={styles.dot} />
                <span>Academy of Design — Programs</span>
              </div>

              <h1 ref={titleRef} className={styles.title}>
                {"Explore Our".split("").map((c, i) => (
                  <span key={`a${i}`} className="char">{c === " " ? " " : c}</span>
                ))}
                <br />
                <em>
                  {"Disciplines.".split("").map((c, i) => (
                    <span key={`b${i}`} className="char">{c}</span>
                  ))}
                </em>
              </h1>

              <p className={styles.subText}>
                An elite selection of design programs engineered for visionaries.<br />
                Choose your path — master your craft.
              </p>

              <div className={styles.scrollCue}>
                <div className={styles.scrollLine} />
                <span>Scroll to explore</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating count badge ── */}
      <div className={styles.countBadge}>
        <span className={styles.countNum}>12+</span>
        <span className={styles.countLabel}>Programs</span>
      </div>

    </section>
  );
}
