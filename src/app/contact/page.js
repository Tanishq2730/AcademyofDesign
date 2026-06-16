"use client";
import ContactHeader from "@/components/Contact/ContactHeader";
import ContactConsole from "@/components/Contact/ContactConsole";
import Testimonials from "@/components/Testimonials/Testimonials";
import styles from "@/components/Contact/Contact.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className="container">
        <ContactHeader />
        <ContactConsole />
      </div>
      <Testimonials
        title="Join Thousands of Designers"
        subtitle="See why our students choose Academy of Design to launch and grow their careers."
        accentColor="#db254f"
      />
    </div>
  );
}
