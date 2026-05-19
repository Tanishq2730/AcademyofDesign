"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./Courses.module.scss";

import categories from "@/data/courses.json";

export default function Courses() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Header animation
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

    // Stacking Cards Animation
    cardsRef.current.forEach((card, index) => {
      if (index === cardsRef.current.length - 1) return;

      gsap.to(card, {
        scale: 0.94, 
        y: -60, 
        filter: "brightness(0.3) blur(4px)", 
        scrollTrigger: {
          trigger: cardsRef.current[index + 1],
          start: "top 85%",
          end: "top 15%",
          scrub: 2, // Smooth scroll
        },
      });
    });

    // Staggered entrance for course cards within each sticky card
    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      
      const courseCards = card.querySelectorAll(`.${styles.miniCourseCard}`);
      if (courseCards.length > 0) {
        gsap.fromTo(
          courseCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
            }
          }
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className={styles.coursesSection}>
      <div className="container-fluid px-md-5">
        
        {/* Header */}
        <div className={styles.header}>
          <h2>
            Explore Our 
            <span>Curated Programs.</span>
          </h2>
          <p>
            An elite selection of design disciplines, crafted for those who 
            aim to lead the industry with innovation and technical mastery.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className={styles.stackContainer}>
          {categories.map((category, idx) => (
            <div 
              key={category.name} 
              ref={(el) => cardsRef.current[idx] = el}
              className={`${styles.stickyCard} card_${idx}`}
              style={{ 
                top: "10vh", 
                backgroundColor: category.color,
                borderColor: `${category.accent}22`,
                zIndex: idx + 1
              }}
            >
              {/* Decorative Number */}
              <div 
                className="absolute right-[-5%] top-[-5%] text-[25rem] font-black opacity-[0.04] pointer-events-none select-none"
                style={{ color: category.accent }}
              >
                0{idx + 1}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryBadge} style={{ color: category.accent }}>
                      Specialization
                    </span>
                    <h3 className={styles.categoryTitle}>{category.name}</h3>
                  </div>
                  <Link href="/courses" className={styles.viewAllBtn}>
                    Explore All <ArrowRight size={18} />
                  </Link>
                </div>

                <div className={styles.coursesGrid}>
                  {category.courses.map((course, cIdx) => (
                    <div key={cIdx} className={styles.miniCourseCard}>
                      <div className={styles.miniImageWrapper}>
                        <img src={course.image} alt={course.title} />
                      </div>
                      <div className={styles.miniCardInfo}>
                        <div className={styles.courseHeader}>
                          <span className={styles.duration}>{course.duration} Program</span>
                          <h4>{course.title}</h4>
                        </div>
                        <p>{course.desc}</p>
                        <Link href={`/courses/${course.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "and")}`} className={styles.learnMore}>
                          Learn More <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footerLink}>
          <p>The journey to excellence begins here.</p>
          <Link href="/courses">View the full academy catalog</Link>
        </div>
      </div>
    </section>
  );
}
