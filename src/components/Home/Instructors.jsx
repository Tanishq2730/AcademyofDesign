"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import styles from "./Instructors.module.scss";

const instructors = [
  { name: "Sarah Jenkins", role: "Head of UI/UX", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
  { name: "Marcus Thorne", role: "Creative Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
  { name: "Elena Rodriguez", role: "Fashion Specialist", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
  { name: "David Kim", role: "Interior Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "Aisha Patel", role: "Typography Expert", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" }
];

export default function Instructors() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.fromTo(
        `.${styles.header}`,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

      // Infinite Marquee Animation
      const marqueeWidth = sliderRef.current.scrollWidth / 2;
      
      gsap.to(sliderRef.current, {
        x: -marqueeWidth,
        duration: 30,
        ease: "none",
        repeat: -1,
        onReverseComplete: () => {
          gsap.set(sliderRef.current, { x: 0 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Triple the data to ensure seamless looping
  const tripleInstructors = [...instructors, ...instructors, ...instructors];

  return (
    <section ref={containerRef} className={styles.instructorsSection}>
      <div className={styles.header}>
        <h2>Learn from the <span>Best.</span></h2>
        <p>Our instructors are industry veterans, leading designers, and award-winning artists from around the globe.</p>
      </div>

      <div ref={sliderRef} className={styles.marqueeContainer}>
        {tripleInstructors.map((person, index) => (
          <div 
            key={index} 
            className={`${styles.instructorCard} ${index % 2 === 0 ? styles.up : styles.down}`}
          >
            <div className={styles.imgWrapper}>
              <Image 
                src={person.img} 
                alt={person.name} 
                fill 
                className="object-cover" 
                unoptimized 
              />
            </div>
            <div className={styles.overlay}>
              <h3>{person.name}</h3>
              <span>{person.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

