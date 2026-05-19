import { Rocket, ShieldCheck, GraduationCap } from "lucide-react";
import styles from "./Pillars.module.scss";

export default function Pillars() {
  return (
    <section className={styles.pillars}>
      <div className={styles.container}>
        <div className="text-center mb-5">
          <h2 className="text-4xl font-bold mb-4">Our Core Pillars</h2>
          <p className="text-gray-500">Transforming visionary concepts into structural reality.</p>
        </div>
        <div className={styles.grid}>
          <div className={styles.pillarCard}>
            <div className={styles.icon}><Rocket size={28} /></div>
            <h3>Think New</h3>
            <p>Innovation is at our core. We constantly push the boundaries of design thinking to solve complex infrastructure needs.</p>
          </div>
          <div className={styles.pillarCard}>
            <div className={styles.icon}><ShieldCheck size={28} /></div>
            <h3>Build Precision</h3>
            <p>Precision-engineered structures with a commitment to safety, quality, and timely execution in every delivery.</p>
          </div>
          <div className={styles.pillarCard}>
            <div className={styles.icon}><GraduationCap size={28} /></div>
            <h3>Lead Mastery</h3>
            <p>Professional project management and specialized education through Surpass Academy to bridge the industry skills gap.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
