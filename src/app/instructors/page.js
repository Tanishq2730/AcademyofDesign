"use client";
import InstructorsHeader from "@/components/Instructors/InstructorsHeader";
import InstructorsShowcase from "@/components/Instructors/InstructorsShowcase";
import styles from "@/components/Instructors/Instructors.module.scss";

export default function InstructorsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.container}>
        <InstructorsHeader />
        <InstructorsShowcase />
      </div>
    </div>
  );
}
