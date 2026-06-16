import styles from "./Legacy.module.scss";

export default function Legacy() {
  return (
    <section className={styles.legacySection}>
      <div className={styles.sectionBg} />
      <div className="container">
        <div className={styles.legacyCard}>
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <div className={styles.textSide}>
                <span className={styles.badge}>Our Legacy</span>
                <h2>Built on <span>Excellence.</span></h2>
                <p>
                  Nuvosid is built on the trusted reputation of AVS Engineers Group, a company with over two decades of excellence in architecture and engineering.
                </p>
                <p>
                  Our mission is to create sustainable, high-performance spaces through advanced design, construction expertise, and complete project delivery.
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-start">
              <div className={styles.imageSide}>
                <img
                  src="/assets/about.jpg"
                  alt="Our Legacy"
                  className={styles.legacyImage}
                />
                <div className={styles.imageGlow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
