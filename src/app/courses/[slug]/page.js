'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Target, Award, Zap, Mail, Phone, Play, CheckCircle2, Plus, Minus, Tv } from 'lucide-react';
import Link from 'next/link';
import styles from './CourseDetail.module.scss';
import courseDetailsData from '@/data/courseDetails.json';
import categories from '@/data/courses.json';

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    let found = courseDetailsData.find((c) => c.id === slug);
    if (!found) {
      for (const cat of categories) {
        const basic = cat.courses.find(c => c.id === slug);
        if (basic) {
          found = {
            id: basic.id,
            title: basic.title,
            subtitle: `${basic.level} Specialization`,
            description: basic.desc,
            videoUrl: "",
            keyPoints: [
              { title: "Expert Faculty", text: "Industry experts with years of practical experience." },
              { title: "Live Projects", text: "Real-world client briefs to build a professional portfolio." },
              { title: "Placement Support", text: "Dedicated career guidance and interview preparation." }
            ],
            curriculum: [
              { title: "Foundations", content: "Master core principles and essential techniques." },
              { title: "Application", content: "Complex industry-standard projects and workflows." },
              { title: "Mastery", content: "Portfolio completion and professional career preparation." }
            ],
            instructors: [
              { name: "Siddharth Sharma", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
              { name: "Shantanu Sharma", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" },
              { name: "Manan Agrawal", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
              { name: "Kritik Kothari", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" },
              { name: "A.K. Sharma", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop" }
            ],
            contact: { email: "academy@nuvosid.design", phone: "+91 9929943246" }
          };
          break;
        }
      }
    }
    if (found) setCourse(found);
  }, [slug]);

  if (!course) return <div className={styles.pageWrapper}></div>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.bgGlow} />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={styles.badge}>
          {course.subtitle}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {course.title.split(' ').slice(0, -1).join(' ')} <span>{course.title.split(' ').slice(-1)}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={styles.subtitle}>
          {course.description.substring(0, 150)}...
        </motion.p>
      </section>

      {/* Video Preview */}
      <section className={styles.videoSection}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          className={styles.videoWrapper}
        >
          {course.videoUrl && course.videoUrl !== "https://www.youtube.com/embed/placeholder" ? (
            <iframe src={course.videoUrl} title={course.title} allowFullScreen />
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.playBtn}><Play size={36} fill="currentColor" /></div>
            </div>
          )}
        </motion.div>
      </section>

      <div className={styles.mainGrid}>
        {/* Compact Key Points */}
        <section className={styles.keyPointsSection}>
          <div className={styles.sectionHeader}>
            <h2>Our <span>Key Points</span></h2>
            <div className={styles.line} />
          </div>
          <div className={styles.pointsGrid}>
            {course.keyPoints.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className={styles.pointCard}
              >
                <div className={styles.icon}><CheckCircle2 size={18} /></div>
                <h4>{point.text || point.title}</h4>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Content Split: Roadmap Accordion & Demo CTA */}
        <div className={styles.contentSplit}>
          <section className={styles.roadmapSection}>
            <h2>Program Roadmap</h2>
            <div className={styles.accordion}>
              {course.curriculum.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`${styles.item} ${activePhase === idx ? styles.active : ''}`}
                >
                  <div 
                    className={styles.header}
                    onClick={() => setActivePhase(activePhase === idx ? null : idx)}
                  >
                    <div className={styles.numBox}>{idx + 1}</div>
                    <h3>{item.title}</h3>
                    <div className={styles.toggleIcon}>
                      {activePhase === idx ? <Minus size={18} /> : <Plus size={18} />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {activePhase === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className={styles.body}
                      >
                        <div className={styles.content}>
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          <aside className={styles.sidebar}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={styles.demoCard}
            >
              <div className={styles.demoIcon}><Tv size={32} /></div>
              <h3>Free Demo Class</h3>
              <p>Experience our teaching methodology first-hand. Get a glimpse of the professional curriculum and industry insights.</p>
              
              <Link href={`/courses/${slug}/demo`} className={styles.demoBtn}>
                Watch Demo Class
              </Link>
              
              <div className={styles.demoFeatures}>
                <div className={styles.feature}><CheckCircle2 size={14} /> <span>Instant Access</span></div>
                <div className={styles.feature}><CheckCircle2 size={14} /> <span>Curriculum Overview</span></div>
                <div className={styles.feature}><CheckCircle2 size={14} /> <span>Industry Insights</span></div>
              </div>
            </motion.div>
          </aside>
        </div>
      </div>

      {/* Faculty Section */}
      <section className={styles.instructorsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Meet Your <span>Mentors</span></h2>
          <div className={styles.instructorsGrid}>
            {course.instructors && course.instructors.map((ins, idx) => (
              <Link
                key={idx}
                href={`/instructors?name=${encodeURIComponent(ins.name)}`}
                className={styles.instructorCard}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.imgWrap}>
                    <img src={ins.image} alt={ins.name} />
                  </div>
                  <h4>{ins.name}</h4>
                  <span>Industry Expert</span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Master Your Craft.</h2>
        <p>Our academic advisors are ready to help you navigate your career path in the design industry.</p>
        <div className={styles.contact}>
          <div className={styles.cItem}>
            <Mail className={styles.cIcon} size={22} />
            <span>{course.contact.email}</span>
          </div>
          <div className={styles.cItem}>
            <Phone className={styles.cIcon} size={22} />
            <span>{course.contact.phone}</span>
          </div>
        </div>
      </section>

      <div style={{ padding: '3rem', textAlign: 'center', opacity: 0.2 }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          ← BACK TO ACADEMY
        </Link>
      </div>
    </div>
  );
}
