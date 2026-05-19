import styles from "./Vision.module.scss";

export default function Vision() {
  return (
    <section className={styles.visionSection}>
      <div className={styles.content}>
        <h2>The Vision.</h2>
        <p>
          &quot;A seamless partnership for all your infrastructure needs. We help you plan, build, and understand your project from the ground up.&quot;
        </p>
        <div className={styles.signature}>Think New. Think Nuvosid.</div>
      </div>
    </section>
  );
}
