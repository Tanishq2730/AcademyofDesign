import styles from "./Legacy.module.scss";

export default function Legacy() {
  return (
    <section className={styles.legacySection}>
      <div className={styles.container}>
        <div className={styles.legacyCard}>
          <div className={styles.textSide}>
            <span className={styles.badge}>Our Legacy</span>
            <h2>Built on Excellence.</h2>
            <p>
              Nuvosid is built on the trusted reputation of AVS Engineers Group, a company with over two decades of excellence in architecture and engineering. 
            </p>
            <p>
              Our mission is to create sustainable, high-performance spaces through advanced design, construction expertise, and complete project delivery.
            </p>
          </div>
          <div className={styles.imageSide}>
            <img 
              src="/assets/about.jpg" 
              alt="Our Legacy" 
              className={styles.legacyImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
