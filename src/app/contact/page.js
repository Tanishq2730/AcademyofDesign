"use client";
import ContactHeader from "@/components/Contact/ContactHeader";
import ContactConsole from "@/components/Contact/ContactConsole";
import styles from "@/components/Contact/Contact.module.scss";

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.container}>
        <ContactHeader />
        <ContactConsole />
      </div>
    </div>
  );
}
