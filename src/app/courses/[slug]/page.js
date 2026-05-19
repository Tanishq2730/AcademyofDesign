"use client";
import { use, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Clock, BookOpen, Layers, Target, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import styles from "./CourseDetail.module.scss";
import coursesData from "@/data/courses.json";

export default function CourseDetailPage({ params }) {
  const { slug } = use(params);
  const containerRef = useRef(null);

  // Find course from dynamic slug
  // Slug format: "haute-couture" or "residential-spaces"
  const allCourses = coursesData.flatMap(cat => cat.courses.map(course => ({
    ...course,
    categoryAccent: cat.accent,
    categoryId: cat.id
  })));

  const course = allCourses.find(c => 
    c.title.toLowerCase().replace(/ /g, "-").replace(/&/g, "and") === slug
  );

  useEffect(() => {
    if (!course) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero reveals
      gsap.from(`.${styles.eyebrow}, .${styles.title}, .${styles.desc}`, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      });

      gsap.from(`.${styles.statItem}`, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5
      });

      gsap.from(`.${styles.imageWrapper}`, {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out"
      });

      // Module reveals
      gsap.from(`.${styles.moduleItem}`, {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: `.${styles.curriculum}`,
          start: "top 70%"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Course Not Found</h1>
          <Link href="/courses" className="text-purple-500 hover:underline">Back to Catalog</Link>
        </div>
      </div>
    );
  }

  // Convert hex to RGB for boxShadow
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "145, 72, 100";
  };

  return (
    <div 
      ref={containerRef} 
      className={styles.courseDetail}
      style={{ "--accent": course.categoryAccent, "--accent-rgb": hexToRgb(course.categoryAccent) }}
    >
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.bgAccent} style={{ background: course.categoryAccent }} />
        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.info}>
              <div className={styles.eyebrow}>
                <div className={styles.dot} />
                <span>Premium Design Program</span>
              </div>
              <h1 className={styles.title}>
                {course.title.split(' ').slice(0, -1).join(' ')} <br />
                <em>{course.title.split(' ').slice(-1)}</em>
              </h1>
              <p className={styles.desc}>{course.desc}</p>
              
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <Clock size={24} />
                  <span className={styles.val}>{course.duration}</span>
                  <span className={styles.label}>Duration</span>
                </div>
                <div className={styles.statItem}>
                  <Layers size={24} />
                  <span className={styles.val}>{course.level}</span>
                  <span className={styles.label}>Skill Level</span>
                </div>
                <div className={styles.statItem}>
                  <BookOpen size={24} />
                  <span className={styles.val}>12+ Modules</span>
                  <span className={styles.label}>Curriculum</span>
                </div>
                <div className={styles.statItem}>
                  <Target size={24} />
                  <span className={styles.val}>Career Track</span>
                  <span className={styles.label}>Goal</span>
                </div>
              </div>
            </div>

            <div className={styles.imageWrapper}>
              <img src={course.image} alt={course.title} />
              <div className={styles.overlay} />
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className={styles.curriculum}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Program <em>Syllabus</em></h2>
          <div className={styles.moduleList}>
            {(course.tags || ["Fundamentals", "Mastery", "Portfolio", "Industry Prep"]).map((tag, i) => (
              <div key={i} className={styles.moduleItem}>
                <span className={styles.num}>0{i + 1}</span>
                <div className={styles.content}>
                  <h4>{tag} Mastery</h4>
                  <p>
                    A deep dive into {tag.toLowerCase()} principles, covering both the creative 
                    theory and technical application required in modern industry settings.
                  </p>
                </div>
              </div>
            ))}
            <div className={styles.moduleItem}>
              <span className={styles.num}>0{course.tags ? course.tags.length + 1 : 5}</span>
              <div className={styles.content}>
                <h4>Capstone Portfolio Project</h4>
                <p>
                  Apply all learned skills to build a professional-grade project that 
                  serves as the centerpiece of your career portfolio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className={styles.enrollBox}>
        <div className={styles.container}>
          <h2 className="text-5xl font-bold mb-10">Start Your Professional Journey</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the next cohort of designers and transform your creative passion into 
            a world-class career with our expert-led mentorship.
          </p>
          <button className={styles.enrollBtn}>
            Enroll Now <ArrowRight size={24} />
          </button>
          
          <div className="flex justify-center gap-12 mt-16 opacity-40">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>Certified Diploma</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>Placement Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              <span>Industry Mentors</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
