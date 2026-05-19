"use client";
import WorkshopsHeader from "@/components/Workshops/WorkshopsHeader";
import WorkshopsConsole from "@/components/Workshops/WorkshopsConsole";
import styles from "@/components/Workshops/Workshops.module.scss";

export default function WorkshopsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.container}>
        <WorkshopsHeader />
        <WorkshopsConsole />
      </div>
    </div>
  );
}
