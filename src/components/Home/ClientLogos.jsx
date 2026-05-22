"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./ClientLogos.module.scss";

const logoImages = Array.from({ length: 20 }, (_, i) => `/assets/clientLogo/${i + 1}.png`);
// Total 20 images: 1.png to 20.png

export default function ClientLogos() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".marqueeContent", {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={marqueeRef}>
      <div className={styles.title}>
        <p>Learn From Consultant Working with</p>
      </div>
      
      <div className={styles.marqueeWrapper}>
        <div className={styles.gradientLeft} />
        <div className={styles.gradientRight} />
        
        <div className={`${styles.marqueeContent} marqueeContent`}>
          {[...logoImages, ...logoImages].map((src, index) => (
            <div key={index} className={styles.logoBox}>
              <div style={{ position: 'relative', height: '100%', width: '120px' }}>
                <Image 
                  src={src} 
                  alt={`Client Logo ${index + 1}`} 
                  fill
                  style={{ objectFit: 'contain' }}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
