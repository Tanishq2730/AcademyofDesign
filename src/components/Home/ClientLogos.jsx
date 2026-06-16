"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import styles from "./ClientLogos.module.scss";

export default function ClientLogos() {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const lineRef     = useRef(null);
  const marqueeRef  = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* Title — slides up from below */
      gsap.from(titleRef.current, {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });

      /* Divider line — draws from centre */
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "center",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      /* Marquee wrapper — clip reveal left→right */
      gsap.from(marqueeRef.current, {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top 88%",
          once: true,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={titleRef} className={styles.title}>
        <p>Trusted by leading brands & institutions</p>
      </div>
      <div ref={lineRef} className={styles.divider} />
      <div ref={marqueeRef} className={styles.marqueeWrapper}>
        <div className={styles.clientLogo} />
      </div>
    </section>
  );
}
