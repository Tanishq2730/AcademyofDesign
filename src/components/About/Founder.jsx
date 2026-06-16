import styles from "./Founder.module.scss";

export default function Founder() {
  return (
    <section className={styles.founderSection}>
      <div className="container">
        
        {/* History / Started Section */}
        <div className={styles.historyBlock}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className={styles.historyContent}>
                <h2 className={styles.historyTitle}>
                  This is how we <span>Started!</span>
                </h2>
                <div className={styles.historyStats}>
                  <div className={styles.statBox}>
                    <span className={styles.num}>50+</span>
                    <span className={styles.label}>Expert Teachers</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.num}>100+</span>
                    <span className={styles.label}>Specialized Courses</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={styles.num}>1000+</span>
                    <span className={styles.label}>Successful Careers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className={styles.videoWrapper}>
                <div className={styles.videoPlaceholder}>
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" alt="Academy Video" />
                  <div className={styles.playBtn}>
                    <div className={styles.playIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Founder Message Section */}
        <div className={styles.founderBlock}>
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <div className={styles.founderImageContainer}>
                <div className={styles.imageFrame}>
                  <img src="/assets/about.jpg" alt="Siddharth Sharma" className={styles.founderImg} />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.floatingBadge}>
                  <span className={styles.years}>15+</span>
                  <span className={styles.text}>Years of Experience</span>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className={styles.messageContent}>
                <h2 className={styles.messageTitle}>
                  Dear Students and <span>Learners,</span>
                </h2>
                <div className={styles.messageText}>
                  <p>
                    I am delighted to welcome you to Surpass Academy, a place where we strive to exceed boundaries and push the limits of what is possible. At Surpass, we believe that education is not just about acquiring knowledge but also about honing practical skills that can transform your career.
                  </p>
                  <p>
                    As an entrepreneur and AEC consultant with years of experience, I have seen the gap between conventional education and the skills required in the industry. This realization led me to establish Surpass Academy, where we bridge this gap by providing industry-aligned courses designed to equip you with the skills to excel in the field of Architecture, Engineering, and Construction.
                  </p>
                  <p>
                    At Surpass, we are not just focused on theoretical learning but also on practical application. Our courses are designed to provide you with hands-on experience and real-world insights that can only be gained from years of industry experience.
                  </p>
                </div>
                
                <div className={styles.founderInfo}>
                  <h3 className={styles.founderName}>Siddharth Sharma</h3>
                  <ul className={styles.credentials}>
                    <li>B. Tech Civil Engineering</li>
                    <li>M.Tech Structural Engineering, Msc. Interior Design</li>
                    <li>Member FFSC, Member IIID</li>
                    <li>Founder/CEO, Surpass Academy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
