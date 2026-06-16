"use client";
import WorkshopsHeader from "@/components/Workshops/WorkshopsHeader";
import WorkshopsConsole from "@/components/Workshops/WorkshopsConsole";
import Testimonials from "@/components/Testimonials/Testimonials";
import styles from "@/components/Workshops/Workshops.module.scss";

export default function WorkshopsPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className="container position-relative flex-grow-1 d-flex flex-column" style={{ zIndex: 10 }}>
        <WorkshopsHeader />
        <WorkshopsConsole />
      </div>
      <Testimonials
        title="Workshop Success Stories"
        subtitle="Hear from designers who levelled up their skills through our intensive workshops."
        accentColor="#db254f"
      />
    </div>
  );
}
