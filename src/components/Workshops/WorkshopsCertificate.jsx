"use client";
import { motion } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck, Download } from "lucide-react";
import styles from "./Workshops.module.scss";

const POINTS = [
  { icon: BadgeCheck, text: "A verifiable, industry-recognized Professional Training Certificate." },
  { icon: ShieldCheck, text: "Signed by the Nuvosid founders with a unique student verification code." },
  { icon: Download, text: "Instantly downloadable and ready to share on LinkedIn." },
];

export default function WorkshopsCertificate() {
  return (
    <section className={styles.certSection}>
      <div className={styles.certGlow} />

      <div className="container position-relative" style={{ zIndex: 5 }}>
        <div className="row g-5 align-items-center">
          {/* Copy */}
          <div className="col-12 col-lg-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={styles.certCopy}
            >
              <div className={styles.eyebrow}>
                <span className={styles.dot} />
                <Award size={13} /> Get Certified
              </div>
              <h2>
                A Certificate That <em>Proves Your Skill.</em>
              </h2>
              <p>
                This workshop concludes with an official Professional Training
                Certificate — awarded once you complete the hands-on project and final
                assessment. It&apos;s more than a badge; it&apos;s proof of the real,
                job-ready craft you built in a single intensive day.
              </p>
              <ul className={styles.certPoints}>
                {POINTS.map(({ icon: Icon, text }) => (
                  <li key={text}>
                    <Icon size={18} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Certificate image showcase */}
          <div className="col-12 col-lg-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={styles.certShowcase}
            >
              <div className={styles.certificate}>
                <img
                  src="/assets/certificate.png"
                  alt="Nuvosid Academy Professional Training Certificate"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
