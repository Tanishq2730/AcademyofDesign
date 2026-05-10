"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid, CreditCard, Wallet, BarChart3, Globe } from "lucide-react";
import gsap from "gsap";
import styles from "./Hero.module.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    category: "Digital Design Mastery",
    title: "UI/UX Design Solution",
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
      </div>

      <div className="container-fluid px-0">
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
          className="mySwiper"
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="row align-items-center min-vh-100 g-0">
                {/* Left Side: Content (50%) */}
                <div className="col-md-6 d-flex justify-content-center align-items-center heroInner">
                  <div className={styles.textContent}>
                    <div className={styles.category}>{slide.category}</div>
                    <h1>
                      <span className={styles.gradientText}>{slide.title}</span>
                      {slide.subtitle}
                    </h1>
                    <p>{slide.description}</p>

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

                {/* Right Side: Image & Badges (50%) */}
                <div className="col-md-6 d-flex justify-content-center align-items-center heroInner position-relative">
                  <div className={styles.imageContent}>
                    <div className={styles.imageWrapper}>
                      <img src={slide.img} alt={slide.instructor} className={styles.instructorImg} />
                    </div>

                    {slide.stats.map((stat, sIdx) => (
                      <div key={sIdx} className={`${styles.floatingBadge} ${styles[`badge${sIdx + 1}`]}`}>
                        <span className={styles.label}>{stat.label}</span>
                        <span className={styles.value}>{stat.value}</span>
                      </div>
                    ))}

                    <div className={styles.nameTag}>
                      {slide.instructor} <span>{slide.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
