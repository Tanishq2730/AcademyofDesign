import styles from "./Vision.module.scss";

export default function Vision() {
  return (
    <section className={styles.visionSection}>
      {/* Decorative background */}
      <div className={styles.bgGlow} />
      <div className={styles.bgRing} />
      <div className={styles.bgRingOuter} />
      <div className={styles.bgQuote}>&ldquo;</div>

      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className={styles.content}>
              <span className={styles.eyebrow}>Our Purpose</span>
              <h2>The Vision.</h2>
              <p>
                &quot;A seamless partnership for all your infrastructure needs. We help you plan, build, and understand your project from the ground up.&quot;
              </p>
              <div className={styles.divider} />
              <div className={styles.signature}>Think New. Think Nuvosid.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
