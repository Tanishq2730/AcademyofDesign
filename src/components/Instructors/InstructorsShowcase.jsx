"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";
import styles from "./Instructors.module.scss";

import instructorsList from "../../data/instructors.json";

export default function InstructorsShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get("name");
      if (nameParam) {
        const decodedName = decodeURIComponent(nameParam).toLowerCase();
        const foundIndex = instructorsList.findIndex(
          (ins) => ins.name.toLowerCase() === decodedName
        );
        if (foundIndex !== -1) {
          setActiveIdx(foundIndex);
        }
      }
    }
  }, []);

  const selectedInstructor = instructorsList[activeIdx];

  return (
    <div className={styles.showcaseLayout}>
      {/* Left Selector Sidebar */}
      <div className={styles.sidebarList}>
        {instructorsList.map((ins, idx) => (
          <div
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`${styles.instructorItem} ${activeIdx === idx ? styles.active : ""}`}
          >
            <div className={styles.avatarWrap}>
              <img src={ins.image} alt={ins.name} />
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.name}>{ins.name}</span>
              <span className={styles.title}>{ins.designation.split("&")[0]}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Right Showcase Card */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={styles.showcaseCard}
          >
            {/* Column 1: Portrait */}
            <div className={styles.showcaseImage}>
              <img src={selectedInstructor.image} alt={selectedInstructor.name} />
              <div className={styles.imageOverlay} />
            </div>

            {/* Column 2: Profile Content */}
            <div className={styles.showcaseContent}>
              {/* Pills Row */}
              <div className={styles.pillRow}>
                {selectedInstructor.credentials.map((cred, i) => (
                  <span key={i} className={styles.credPill}>
                    {cred}
                  </span>
                ))}
                {selectedInstructor.memberships.map((mem, i) => (
                  <span key={i} className={styles.membershipPill}>
                    {mem}
                  </span>
                ))}
              </div>

              {/* Name Header */}
              <div className={styles.showcaseName}>
                <h2>{selectedInstructor.name}</h2>
                <div className={styles.designation}>{selectedInstructor.designation}</div>
              </div>

              {/* Biography */}
              <p className={styles.showcaseBio}>{selectedInstructor.bio}</p>

              {/* Courses */}
              <div className={styles.showcaseCourses}>
                <h4>Courses Taught</h4>
                <div className={styles.showcaseLinks}>
                  {selectedInstructor.courses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/${course.id}`}
                      className={styles.courseBtn}
                    >
                      <Award size={14} />
                      <span>{course.title}</span>
                      <ArrowRight size={12} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
