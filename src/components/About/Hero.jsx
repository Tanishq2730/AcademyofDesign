import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.hero}>
      {/* Base image + overlay */}
      <div className={styles.bgImage} />
      <div className={styles.bgOverlay} />

      {/* Animated background layers */}
      <div className={styles.bgGrid} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />
      <div className={styles.bgAurora} />
      <div className={styles.bgRing} />
      <div className={styles.bgRingOuter} />
      <div className={styles.bgBeam} />

      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className={styles.heroContent}>
              <h1>Academy of <span>Future Design.</span></h1>
              <p>
                Bridging the skills gap by training the next generation of industry leaders with real-world knowledge and precision.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
