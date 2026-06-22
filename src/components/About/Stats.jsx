import styles from "./Stats.module.scss";

export default function Stats() {
  return (
    <section className={styles.statsBar}>
      <div className="container">
        <div className="row g-4 justify-content-center text-center">
          {[
            { label: "Projects Completed", value: "37",  accent: "#e0a6b2" },
            { label: "Trusted Partners",   value: "150", accent: "#c9b89e" },
            { label: "Design Solutions",   value: "500", accent: "#9ecfc4" },
            { label: "Global Connections", value: "12",  accent: "#bdb0e3" }
          ].map((stat, i) => (
            <div key={i} className="col-6 col-md-3">
              <div className={styles.statItem} style={{ "--accent": stat.accent }}>
                <span className={styles.number}>{stat.value}</span>
                <span className={styles.label}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
