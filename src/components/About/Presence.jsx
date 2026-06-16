import { MapPin, Phone } from "lucide-react";
import styles from "./Presence.module.scss";

export default function Presence() {
  return (
    <section className={styles.presenceSection}>
      <div className="container">
        <div className={styles.glassCard}>
          <div className="row g-0 align-items-center">
            <div className="col-lg-6">
              <div className={styles.contentSide}>
                <h2 className={styles.title}>
                  Our <span>Presence</span>
                </h2>
                <p className={styles.desc}>
                  Surpass Academy&apos;s physical center is a dynamic hub for inspired learning, 
                  fostering empowerment among students. Our committed faculty ensures 
                  personalized guidance, supporting every student&apos;s path to success in their 
                  career endeavors.
                </p>
                
                <div className={styles.officeInfo}>
                  <h3>Corporate Office</h3>
                  <div className={styles.infoItem}>
                    <MapPin size={20} />
                    <span>421-425 S.M. Lodha Complex, Udaipur-313001 (Raj.)</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone size={20} />
                    <span>+91-9636043246</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className={styles.visualSide}>
                <div className={styles.creativeCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.dot} />
                    <span>Operational Headquarters</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cityText}>Udaipur</h3>
                    <p className={styles.stateText}>Rajasthan, India</p>
                    <div className={styles.architecturalLine} />
                    <div className={styles.statsRow}>
                      <div className={styles.stat}>
                        <span className={styles.statVal}>15+</span>
                        <span className={styles.statLabel}>Years of Legacy</span>
                      </div>
                      <div className={styles.stat}>
                        <span className={styles.statVal}>5K+</span>
                        <span className={styles.statLabel}>Students Guided</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.badge}>Academy of Design</div>
                  </div>
                </div>
                
                {/* Abstract decorative elements */}
                <div className={styles.floatingCircle} />
                <div className={styles.glassBeam} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
