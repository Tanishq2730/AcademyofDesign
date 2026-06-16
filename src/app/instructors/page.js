"use client";
import InstructorsHeader from "@/components/Instructors/InstructorsHeader";
import InstructorsShowcase from "@/components/Instructors/InstructorsShowcase";
import styles from "@/components/Instructors/Instructors.module.scss";

export default function InstructorsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className="container position-relative flex-grow-1 d-flex flex-column" style={{ zIndex: 10 }}>
        <InstructorsHeader />
        <InstructorsShowcase />
      </div>
    </div>
  );
}
