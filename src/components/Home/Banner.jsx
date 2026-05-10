"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import styles from "./Banner.module.scss";

export default function Banner() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        `.${styles.textContent} > *`,
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

      // Image reveal
      gsap.fromTo(
        `.${styles.visualContent}`,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
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
    <section ref={containerRef} className={styles.bannerSection}>
      <div className="container-fluid px-md-5">
        <div className="row align-items-center g-5">
          {/* Text Content */}
          <div className="col-lg-6">
            <div ref={textRef} className={styles.textContent}>
              <h2>
                Master the Art of 
                <span className={styles.gradientText}>Visual Storytelling.</span>
              </h2>
              <p>
                Nuvosid Academy provides an immersive learning experience with industry experts. Learn design not just as a skill, but as a language to communicate ideas.
              </p>
              <Link href="/about" className={styles.discoverBtn}>
                Discover Our Story
              </Link>
            </div>
          </div>

          {/* Visual Content */}
          <div className="col-lg-6">
            <div className={styles.visualContent}>
              <div className={styles.imageOverlay} />
              <img 
                src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2988&auto=format&fit=crop" 
                alt="Visual Storytelling" 
                className={styles.bgImage}
              />
              
              <div className={styles.glassCard}>
                <div className={styles.title}>Industry Standard Curriculum</div>
                <div className={styles.desc}>Master high-end tools like Figma, Adobe Creative Cloud, and generative AI design patterns.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

