"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, CreditCard, Wallet, BarChart3, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import styles from "./Hero.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    category: "Digital Design Mastery",
    title: "UI/UX Design and Solutions",
    subtitle: "for Modern Disruptors",
    description: "Master the art of creating intuitive digital experiences. Built for designers & entrepreneurs.",
    instructor: "Marcus Thorne",
    role: "Lead UI/UX Mentor",
    img: "/assets/hero-male.png",
    stats: [
      { label: "Projects", value: "24+" },
      { label: "Students", value: "1.2k" },
      { label: "Placement", value: "98%" }
    ]
  },
  {
    category: "Visual Communication",
    title: "Graphic Design Masterclass",
    subtitle: "for Creative Leaders",
    description: "Learn brand identity, typography, and visual storytelling from award-winning directors.",
    instructor: "Sarah Jenkins",
    role: "Creative Director",
    img: "/assets/hero-female.png",
    stats: [
      { label: "Designs", value: "500+" },
      { label: "Awards", value: "12" },
      { label: "Rating", value: "4.9" }
    ]
  }
];

export default function Hero() {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Initial entrance animations
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.textContent} > *`, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(`.${styles.imageContent} > *`, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "expo.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.heroSection}>
      {/* Background Blobs */}
      <div className={styles.backgroundGradients}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />
        <div className={styles.blob3} />
      </div>

      {/* Premium Animated Background Elements */}
      <div className={styles.gridPattern} />
      <div className={styles.floatingRing1} />
      <div className={styles.floatingRing2} />
      <div className={`${styles.plusShape} ${styles.plus1}`} />
      <div className={`${styles.plusShape} ${styles.plus2}`} />

      <div className="container">
        <div className="row align-items-center min-vh-100 g-0">
          {/* Left Side: Content (50%) */}
          <div className={`col-md-6 d-flex align-items-center ${styles.heroCol}`}>
            <div className={styles.textContent}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.4 }}
                  className={styles.category}
                >
                  {heroSlides[activeIndex].category}
                </motion.div>
              </AnimatePresence>

              <h1>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={styles.gradientText}
                  >
                    {heroSlides[activeIndex].title}
                  </motion.span>
                </AnimatePresence>
                for Modern Disruptors <br /> & Creative Leaders
              </h1>

              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {heroSlides[activeIndex].description}
                </motion.p>
              </AnimatePresence>

              <div className={styles.buttonGroup}>
                <Link href="/enroll" className={styles.primaryBtn}>
                  Sign Up Now
                </Link>
                <Link href="/courses" className={styles.secondaryBtn}>
                  Know More <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side: Image Swiper (50%) */}
          <div className={`col-md-6 d-flex justify-content-center align-items-center position-relative ${styles.heroCol}`}>
            <div style={{ width: "100%", height: "100%" }}>
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                }}
                className="mySwiper"
              >
                {heroSlides.map((slide, idx) => (
                  <SwiperSlide key={idx}>
                    <div className={styles.imageContent}>
                      <div className={styles.imageWrapper}>
                        <img src={slide.img} alt={slide.instructor} className={styles.instructorImg} />
                        <div className={styles.instructorMeta}>
                          <h4 className={styles.metaName}>{slide.instructor}</h4>
                          <p className={styles.metaRole}>{slide.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Controls - Positioned Right */}
      <div className={styles.premiumControls}>
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={styles.controlBtn}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={styles.controlBtn}
          aria-label="Next Slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Recommendation Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.recommendation}>
          <LayoutGrid className={styles.icon} size={20} />
          Get Magic recommendations
        </div>

        <div className={styles.navItems}>
          <div className={styles.navItem}><CreditCard size={16} /> UI/UX Design</div>
          <div className={styles.navItem}><Wallet size={16} /> Fashion Design</div>
          <div className={styles.navItem}><BarChart3 size={16} /> Interior Design</div>
          <div className={styles.navItem}><Globe size={16} /> Graphic Design</div>
          <div className={styles.navItem}><ArrowRight size={16} /> Explore All</div>
        </div>
      </div>
    </section>
  );
}
