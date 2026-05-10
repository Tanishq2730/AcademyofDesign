"use client";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./Courses.module.scss";

const categories = ["UI/UX Design", "Fashion Design", "Interior Design", "Graphic Design"];

const coursesData = {
  "UI/UX Design": [
    { title: "Advanced Product Design", duration: "6 Months", desc: "Master end-to-end product design from research to prototyping." },
    { title: "Interaction Design", duration: "3 Months", desc: "Learn to build micro-interactions and seamless user flows." },
    { title: "UI Foundations", duration: "2 Months", desc: "Build a strong foundation in visual design and typography." }
  ],
  "Fashion Design": [
    { title: "Haute Couture", duration: "1 Year", desc: "Explore the art of creating exclusive, custom-fitted clothing." },
    { title: "Fashion Illustration", duration: "3 Months", desc: "Learn to sketch and communicate fashion ideas effectively." },
    { title: "Textile Science", duration: "4 Months", desc: "Understand fabrics, materials, and sustainable fashion." }
  ],
  "Interior Design": [
    { title: "Residential Spaces", duration: "6 Months", desc: "Design functional and beautiful living spaces." },
    { title: "Commercial Interiors", duration: "6 Months", desc: "Create impactful environments for retail and offices." },
    { title: "3D Rendering & Modeling", duration: "4 Months", desc: "Bring your designs to life using industry standard software." }
  ],
  "Graphic Design": [
    { title: "Brand Identity", duration: "4 Months", desc: "Create cohesive brand systems and logos." },
    { title: "Typography & Layout", duration: "2 Months", desc: "Master the art of organizing text and visual elements." },
    { title: "Motion Graphics", duration: "5 Months", desc: "Add movement to your designs with After Effects." }
  ]
};

export default function Courses() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Initial scroll animation
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
  }, []);

  useEffect(() => {
    // Animate cards on tab change
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "expo.out" }
      );
    }
  }, [activeTab]);

  return (
    <section ref={containerRef} className={styles.coursesSection}>
      <div className="container-fluid px-md-5">
        
        {/* Header */}
        <div className={styles.header}>
          <h2>Explore Our <span>Programs.</span></h2>
          <p>Choose from a variety of specialized courses designed to take you from beginner to industry-ready professional.</p>
        </div>

        {/* Tabs */}
        <div className={styles.tabContainer}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`${styles.tabBtn} ${activeTab === cat ? styles.active : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="row g-4">
          {coursesData[activeTab].map((course, index) => (
            <div
              key={index}
              ref={(el) => cardsRef.current[index] = el}
              className="col-md-6 col-lg-4"
            >
              <div className={styles.courseCard}>
                <div>
                  <span className={styles.durationTag}>
                    {course.duration}
                  </span>
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                </div>
                
                <Link href="/course-detail" className={styles.detailsLink}>
                  View Details <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footerLink}>
          <Link href="/courses">View all courses</Link>
        </div>
      </div>
    </section>
  );
}

