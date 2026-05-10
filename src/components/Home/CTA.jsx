"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import styles from "./CTA.module.scss";

export default function CTA() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        `.${styles.content} > *`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.ctaSection}>
      {/* Background Effects */}
      <div className={styles.backgroundGlow} />

      <div className="container position-relative">
        <div className={styles.content}>
          <div ref={textRef}>
            <h2>
              Ready to 
              <span className={styles.gradientText}>Transform?</span>
            </h2>
            <p>
              Enroll now and join a community of passionate designers. Turn your creative potential into professional success.
            </p>
            <Link href="/enroll" className={styles.enrollBtn}>
              Let&apos;s Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

