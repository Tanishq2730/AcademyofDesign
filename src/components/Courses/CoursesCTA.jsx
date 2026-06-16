"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./CoursesCTA.module.scss";

const stats = [
  { value: "15+", label: "Years of Excellence" },
  { value: "5K+", label: "Students Placed" },
  { value: "12+", label: "Design Programs" },
  { value: "98%", label: "Satisfaction Rate" },
];

export default function CoursesCTA() {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Parallax background
    gsap.to(parallaxRef.current, {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Stats counter animation
    const statEls = sectionRef.current.querySelectorAll(`.${styles.statValue}`);
    statEls.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    // Heading
    gsap.fromTo(
      `.${styles.heading}`,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.heading}`,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      {/* Parallax background */}
      <div ref={parallaxRef} className={styles.bgParallax} />

      <div className="container position-relative" style={{ zIndex: 10 }}>
        {/* Stats Row */}
        <div className="row g-4 mb-5">
          {stats.map((s, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* CTA */}
        <div className="row align-items-center g-5">
          <div className="col-12 col-lg-6">
            <h2 className={styles.heading}>
              Ready to Begin<br />
              Your <em>Design Journey?</em>
            </h2>
          </div>
          <div className="col-12 col-lg-6">
            <p className={styles.subText}>
              Join thousands of designers who built their careers at Academy of Design.
              Our admissions team is here to guide you every step of the way.
            </p>
            <div className={styles.btnGroup}>
              <Link href="/contact" className={styles.primaryBtn}>
                Apply Now <ArrowRight size={18} />
              </Link>
              <Link href="/about" className={styles.secondaryBtn}>
                Learn About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
