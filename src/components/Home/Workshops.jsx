"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import styles from "./Workshops.module.scss";

const workshops = [
  {
    title: "Prototyping with Figma",
    date: "Oct 15, 2024",
    location: "Online",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "The Art of Typography",
    date: "Oct 22, 2024",
    location: "Campus Studio",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "3D Motion for Beginners",
    date: "Nov 05, 2024",
    location: "Online",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
  }
];

export default function Workshops() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
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
    <section ref={containerRef} className={styles.workshopsSection}>
      <div className="container-fluid px-md-5">
        <div className="row align-items-end justify-content-between mb-5 g-4">
          <div className="col-lg-7">
            <div className={styles.sectionHeader}>
              <h2>Upcoming <span>Workshops.</span></h2>
              <p>Join our interactive sessions to learn specific skills, network with peers, and get hands-on experience from the world's best designers.</p>
            </div>
          </div>
          <div className="col-lg-auto mb-lg-5">
            <Link href="/workshops" className={styles.viewAllBtn}>
              View All Workshops <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="row g-4">
          {workshops.map((workshop, idx) => (
            <div 
              key={idx}
              ref={(el) => cardsRef.current[idx] = el}
              className="col-md-6 col-lg-4"
            >
              <div className={styles.workshopCard}>
                <div className={styles.imageWrapper}>
                  <img src={workshop.image} alt={workshop.title} />
                  <div className={styles.overlay} />
                </div>
                
                <div className={styles.cardBody}>
                  <h3>{workshop.title}</h3>
                  
                  <div className={styles.metaInfo}>
                    <div className={styles.metaItem}>
                      <Calendar size={18} />
                      <span>{workshop.date}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <MapPin size={18} />
                      <span>{workshop.location}</span>
                    </div>
                  </div>
                  
                  <button className={styles.reserveBtn}>
                    Reserve Seat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

