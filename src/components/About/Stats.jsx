import styles from "./Stats.module.scss";

export default function Stats() {
  return (
    <section className={styles.statsBar}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {[
            { label: "Projects Completed", value: "37" },
            { label: "Trusted Partners", value: "150" },
            { label: "Design Solutions", value: "500" },
            { label: "Global Connections", value: "12" }
          ].map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span className={styles.number}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
