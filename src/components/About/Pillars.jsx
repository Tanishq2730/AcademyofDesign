import { Rocket, ShieldCheck, GraduationCap } from "lucide-react";
import styles from "./Pillars.module.scss";

const PILLARS = [
  {
    icon: <Rocket size={26} />,
    title: "Think New",
    desc: "Innovation is at our core. We constantly push the boundaries of design thinking to solve complex infrastructure needs.",
    accent: "#e0a6b2", // soft rose
  },
  {
    icon: <ShieldCheck size={26} />,
    title: "Build Precision",
    desc: "Precision-engineered structures with a commitment to safety, quality, and timely execution in every delivery.",
    accent: "#9ecfc4", // soft sage
  },
  {
    icon: <GraduationCap size={26} />,
    title: "Lead Mastery",
    desc: "Professional project management and specialized education through Surpass Academy to bridge the industry skills gap.",
    accent: "#bdb0e3", // soft lavender
  },
];

export default function Pillars() {
  return (
    <section className={styles.pillars}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>What Drives Us</span>
          <h2>Our Core Pillars</h2>
          <p>Transforming visionary concepts into structural reality.</p>
        </div>

        <div className={styles.grid}>
          {PILLARS.map((p) => (
            <div key={p.title} className={styles.pillarCard} style={{ "--accent": p.accent }}>
              <div className={styles.icon}>{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
