import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.bgGlow} />
      <div className={styles.heroContent}>
        <h1>Academy of <span>Future Design.</span></h1>
        <p>
          Bridging the skills gap by training the next generation of industry leaders with real-world knowledge and precision.
        </p>
      </div>
    </div>
  );
}
