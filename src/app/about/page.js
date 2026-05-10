"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { GraduationCap, ShieldCheck, Globe, Rocket, Award, Users } from "lucide-react";
import styles from "./About.module.scss";

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(`.${styles.heroContent} > *`, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });

      // Section Reveals
      const sections = gsap.utils.toArray(`section`);
      sections.forEach((section) => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // Stats Counting
      gsap.utils.toArray(`.${styles.number}`).forEach(num => {
        const value = parseInt(num.innerText);
        gsap.fromTo(num, 
          { innerText: 0 }, 
          { 
            innerText: value, 
            duration: 2, 
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: num,
              start: "top 90%"
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={styles.aboutPage}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <div className={styles.bgGlow} />
        <div className={styles.heroContent}>
          <h1>Academy of <span>Future Design.</span></h1>
          <p>
            Bridging the skills gap by training the next generation of industry leaders with real-world knowledge and precision.
          </p>
        </div>
      </div>

      {/* Legacy Section */}
      <section className={styles.legacySection}>
        <div className={styles.container}>
          <div className={styles.legacyCard}>
            <div className={styles.textSide}>
              <span className={styles.badge}>Our Legacy</span>
              <h2>Built on Excellence.</h2>
              <p>
                Nuvosid is built on the trusted reputation of AVS Engineers Group, a company with over two decades of excellence in architecture and engineering. 
              </p>
              <p>
                Our mission is to create sustainable, high-performance spaces through advanced design, construction expertise, and complete project delivery.
              </p>
            </div>
            <div className={styles.imageSide}>
              {/* Optional: Add a stylized image or graphic here */}
              <div style={{ width: '100%', height: '400px', background: 'linear-gradient(45deg, #732F5011, #91486422)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
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

      {/* Core Pillars */}
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

      {/* Vision Statement */}
      <section className={styles.visionSection}>
        <div className={styles.content}>
          <h2>The Vision.</h2>
          <p>
            "A seamless partnership for all your infrastructure needs. We help you plan, build, and understand your project from the ground up."
          </p>
          <div className={styles.signature}>Think New. Think Nuvosid.</div>
        </div>
      </section>
    </div>
  );
}
