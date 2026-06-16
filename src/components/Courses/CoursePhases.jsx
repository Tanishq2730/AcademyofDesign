"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle2, Clock, Zap, ArrowDown } from "lucide-react";
import styles from "./CoursePhases.module.scss";

const PHASES = [
  {
    num: "01",
    title: "Foundations",
    week: "Week 1–2",
    tag: "Core",
    desc: "Build an unshakeable base in design principles, visual thinking, and industry workflows. Learn how top professionals approach a problem before they open any software.",
    skills: [
      "Design Thinking & Methodology",
      "Visual Hierarchy & Composition",
      "Colour Theory",
      "Typography Fundamentals",
      "Professional Tool Setup",
    ],
    outcome: "You'll critique and conceptualise like a seasoned professional from day one.",
  },
  {
    num: "02",
    title: "Core Skills",
    week: "Week 3–4",
    tag: "Skill-Build",
    desc: "Dive into software mastery, layout fundamentals, and brand communication. Weekly live critiques from faculty keep your output sharp and industry-ready.",
    skills: [
      "Industry Tool Proficiency",
      "Layout & Grid Systems",
      "Brand Fundamentals",
      "Structured Ideation",
      "Peer Critique Loops",
    ],
    outcome: "Deliver polished, feedback-driven work that consistently meets industry benchmarks.",
  },
  {
    num: "03",
    title: "Advanced Techniques",
    week: "Week 5–6",
    tag: "Advanced",
    desc: "Push your creative ceiling with complex workflows, obsessive detail, and your emerging signature style. Guest critiques by visiting industry professionals.",
    skills: [
      "Advanced Workflows",
      "Detail & Finish Work",
      "Signature Style Development",
      "Client Communication",
      "Iterative Revision Cycles",
    ],
    outcome: "Build a visual language so distinct your work is instantly recognisable.",
  },
  {
    num: "04",
    title: "Industry Projects",
    week: "Week 7–8",
    tag: "Real-World",
    desc: "Real client briefs. Real deadlines. Real feedback. Four portfolio-grade pieces crafted in studio conditions with professional art direction.",
    skills: [
      "Live Client Briefs",
      "Project & Timeline Management",
      "Portfolio Pieces ×4",
      "Presentation & Pitching",
      "Industry Review Sessions",
    ],
    outcome: "Walk away with four industry-standard pieces ready for any creative interview.",
  },
  {
    num: "05",
    title: "Portfolio & Placement",
    week: "Week 9–10",
    tag: "Launch",
    desc: "Curate, polish, and present your portfolio to 300+ hiring partners. Interview coaching, salary negotiation, and personal brand positioning included.",
    skills: [
      "Portfolio Curation & Editing",
      "Interview Coaching",
      "Salary Negotiation",
      "Personal Brand Strategy",
      "Hiring Partner Introductions",
    ],
    outcome: "Launch your career with a curated portfolio and warm referrals to top employers.",
  },
];

export default function CoursePhases() {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const dividerRef   = useRef(null);
  const bodyRef      = useRef(null);
  const leftRef      = useRef(null);
  const listRef      = useRef(null);
  const railLineRef  = useRef(null);
  const railFillRef  = useRef(null);
  const indicatorRef = useRef(null);
  const arrowIconRef = useRef(null);
  const bgOrb1Ref    = useRef(null);
  const bgOrb2Ref    = useRef(null);
  const contentCardRef = useRef(null);
  const nodeRefs     = useRef([]);
  const labelRefs    = useRef([]);
  const contentRefs  = useRef([]);
  const ghostRefs    = useRef([]);
  const progressRef  = useRef(null);
  const currentPhase = useRef(0);
  // store calculated min/maxY so invalidateOnRefresh can update them
  const minYRef      = useRef(0);
  const maxYRef      = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 860;

    // ── Mobile: just show all panels and set first node active ──
    if (isMobile) {
      contentRefs.current.forEach(el => {
        if (!el) return;
        el.style.opacity   = "1";
        el.style.transform = "none";
        el.style.position  = "relative";
        el.style.inset     = "auto";
      });
      nodeRefs.current.forEach((el, i) => {
        if (el) el.style.backgroundColor = i === 0 ? "#db254f" : "rgba(255,255,255,0.06)";
      });
      return;
    }

    const n = PHASES.length;

    // ── Helper: measure node centers relative to .left ──
    const measure = () => {
      const leftTop = leftRef.current.getBoundingClientRect().top;
      const rows    = Array.from(listRef.current.querySelectorAll(`.${styles.phaseRow}`));
      const centers = rows.map(row => {
        const r = row.getBoundingClientRect();
        return r.top + r.height / 2 - leftTop;
      });
      const indH = indicatorRef.current.offsetHeight;
      minYRef.current = centers[0] - indH / 2;
      maxYRef.current = centers[n - 1] - indH / 2;

      // Update rail line position
      gsap.set(railLineRef.current, {
        top:    centers[0],
        height: centers[n - 1] - centers[0],
      });
      gsap.set(railFillRef.current, {
        top:    centers[0],
        height: centers[n - 1] - centers[0],
      });
    };

    measure();

    // ── Initial GSAP states ──
    gsap.set(indicatorRef.current, { y: minYRef.current, opacity: 0 });

    contentRefs.current.forEach((el, i) => {
      gsap.set(el, {
        opacity:  i === 0 ? 1 : 0,
        y:        i === 0 ? 0 : 55,
        zIndex:   i === 0 ? 1 : 0,
        position: "absolute",
        inset:    0,
      });
    });

    nodeRefs.current.forEach((el, i) => {
      gsap.set(el, i === 0
        ? { backgroundColor: "#db254f", boxShadow: "0 0 0 5px rgba(219,37,79,0.18), 0 0 24px rgba(219,37,79,0.4)" }
        : { backgroundColor: "rgba(255,255,255,0.05)", boxShadow: "none" }
      );
    });

    labelRefs.current.forEach((el, i) => {
      gsap.set(el, { color: i === 0 ? "#fff" : "rgba(255,255,255,0.3)" });
    });

    // ── Entrance animation (fires once when section scrolls into view) ──
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start:   "top 82%",
        once:    true,
      },
    });
    entranceTl
      .fromTo(headerRef.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }
      )
      .fromTo(dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.7, ease: "power2.out" },
        0.35
      )
      .fromTo(Array.from(listRef.current.querySelectorAll(`.${styles.phaseRow}`)),
        { opacity: 0, x: -22 },
        { opacity: 1, x: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" },
        0.4
      )
      .fromTo(contentCardRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0.5
      )
      // Reveal rail and indicator after entrance
      .fromTo([railLineRef.current, railFillRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        0.55
      )
      .to(indicatorRef.current,
        { opacity: 1, duration: 0.4 },
        0.65
      );

    // ── Bobbing arrow icon ──
    gsap.to(arrowIconRef.current, {
      y:        7,
      duration: 0.72,
      repeat:   -1,
      yoyo:     true,
      ease:     "sine.inOut",
    });

    // ── Main scroll-driven ScrollTrigger ──
    const st = ScrollTrigger.create({
      trigger:          sectionRef.current,
      start:            "top top",
      end:              "+=400%",
      pin:              true,
      scrub:            1.5,
      anticipatePin:    1,
      invalidateOnRefresh: true,

      onRefresh() {
        measure();
      },

      onUpdate(self) {
        const p = self.progress;
        const minY = minYRef.current;
        const maxY = maxYRef.current;

        // Move indicator
        gsap.set(indicatorRef.current, { y: minY + p * (maxY - minY) });

        // Rail fill
        gsap.set(railFillRef.current, { scaleY: p });

        // Background orb parallax
        gsap.set(bgOrb1Ref.current, { y: p * 45 });
        gsap.set(bgOrb2Ref.current, { y: p * -35 });

        // Ghost number parallax within current panel
        const ghost = ghostRefs.current[currentPhase.current];
        if (ghost) {
          const localP = (p * (n - 1)) % 1;
          gsap.set(ghost, { y: localP * -40 });
        }

        // Active phase detection
        const newPhase = Math.min(Math.round(p * (n - 1)), n - 1);

        if (newPhase !== currentPhase.current) {
          const dir      = newPhase > currentPhase.current ? 1 : -1;
          const oldPhase = currentPhase.current;
          currentPhase.current = newPhase;

          // Content swap
          gsap.killTweensOf([contentRefs.current[oldPhase], contentRefs.current[newPhase]]);
          gsap.set(contentRefs.current[newPhase], { zIndex: 2 });
          gsap.to(contentRefs.current[oldPhase], {
            opacity:  0,
            y:        dir * -62,
            duration: 0.5,
            ease:     "power2.out",
            onComplete: () => gsap.set(contentRefs.current[oldPhase], { zIndex: 0 }),
          });
          gsap.fromTo(contentRefs.current[newPhase],
            { opacity: 0, y: dir * 70 },
            { opacity: 1, y: 0, duration: 0.56, ease: "power3.out" }
          );

          // Node states
          nodeRefs.current.forEach((node, i) => {
            if (i === newPhase) {
              gsap.to(node, {
                backgroundColor: "#db254f",
                boxShadow: "0 0 0 5px rgba(219,37,79,0.18), 0 0 24px rgba(219,37,79,0.4)",
                scale:    1.12,
                duration: 0.3,
                ease:     "back.out(1.7)",
              });
              gsap.to(node, { scale: 1, duration: 0.2, delay: 0.3 });
            } else {
              gsap.to(node, {
                backgroundColor: i < newPhase ? "rgba(219,37,79,0.22)" : "rgba(255,255,255,0.05)",
                boxShadow:       "none",
                scale:           1,
                duration:        0.3,
              });
            }
          });

          // Label colors
          labelRefs.current.forEach((el, i) => {
            gsap.to(el, {
              color:    i === newPhase ? "#fff" : i < newPhase ? "rgba(219,37,79,0.62)" : "rgba(255,255,255,0.3)",
              duration: 0.3,
            });
          });

          // Progress bar
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              scaleX:          (newPhase + 1) / n,
              duration:        0.5,
              ease:            "power2.out",
              transformOrigin: "left center",
            });
          }
        }
      },
    });

    return () => {
      st.kill();
      entranceTl.scrollTrigger?.kill();
      gsap.killTweensOf(arrowIconRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>

      {/* ── Background ── */}
      <div className={styles.bg} aria-hidden="true">
        <div ref={bgOrb1Ref} className={styles.bgOrb1} />
        <div ref={bgOrb2Ref} className={styles.bgOrb2} />
        <div className={styles.bgGrid} />
      </div>

      <div className={styles.container}>

        {/* ── Header ── */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Program Structure
          </span>
          <h2>Learning <span>Phases</span></h2>
          <p className={styles.headerSub}>
            Scroll to walk through each stage of your 10-week journey.
          </p>
        </div>

        {/* ── Separator ── */}
        <div ref={dividerRef} className={styles.divider} aria-hidden="true" />

        {/* ── Body ── */}
        <div ref={bodyRef} className={styles.body}>

          {/* ════ LEFT: timeline rail ════ */}
          <div ref={leftRef} className={styles.left}>

            <div ref={railLineRef} className={styles.railLine} aria-hidden="true" />
            <div ref={railFillRef} className={styles.railFill} aria-hidden="true" />

            <div ref={indicatorRef} className={styles.indicator} aria-hidden="true">
              <div className={styles.indicatorRing} />
              <div ref={arrowIconRef} className={styles.indicatorArrow}>
                <ArrowDown size={16} strokeWidth={2.5} />
              </div>
            </div>

            <div ref={listRef} className={styles.phaseList}>
              {PHASES.map((p, i) => (
                <div key={i} className={styles.phaseRow}>
                  <div
                    ref={el => (nodeRefs.current[i] = el)}
                    className={styles.phaseNode}
                  >
                    <span className={styles.nodeNum}>{p.num}</span>
                  </div>
                  <div
                    ref={el => (labelRefs.current[i] = el)}
                    className={styles.phaseLabel}
                  >
                    <span className={styles.labelTitle}>{p.title}</span>
                    <span className={styles.labelWeek}>{p.week}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* ════ RIGHT: content ════ */}
          <div className={styles.right}>

            {/* Progress bar */}
            <div className={styles.progressTrack} aria-hidden="true">
              <div ref={progressRef} className={styles.progressFill} />
            </div>

            {/* Card that wraps all stacked panels */}
            <div ref={contentCardRef} className={styles.contentCard}>
              {PHASES.map((p, i) => (
                <div
                  key={i}
                  ref={el => (contentRefs.current[i] = el)}
                  className={styles.panel}
                >
                  <div
                    ref={el => (ghostRefs.current[i] = el)}
                    className={styles.ghost}
                    aria-hidden="true"
                  >
                    {p.num}
                  </div>

                  <div className={styles.panelMeta}>
                    <span className={styles.panelTag}>{p.tag}</span>
                    <span className={styles.panelWeek}>
                      <Clock size={11} />{p.week}
                    </span>
                  </div>

                  <p className={styles.panelPhaseNum}>Phase {p.num}</p>
                  <h3 className={styles.panelTitle}>{p.title}</h3>
                  <p className={styles.panelDesc}>{p.desc}</p>

                  <div className={styles.panelGrid}>
                    <div className={styles.skillsCol}>
                      <p className={styles.colLabel}>What You&rsquo;ll Learn</p>
                      <div className={styles.skillsList}>
                        {p.skills.map(s => (
                          <div key={s} className={styles.skillItem}>
                            <CheckCircle2 size={12} className={styles.skillIcon} />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={styles.outcomeCol}>
                      <p className={styles.colLabel}>Phase Outcome</p>
                      <div className={styles.outcomeBox}>
                        <Zap size={13} className={styles.outcomeIcon} />
                        <p>{p.outcome}</p>
                      </div>
                      <div className={styles.phaseCounter}>
                        <span className={styles.counterNum}>{i + 1}</span>
                        <span className={styles.counterOf}>&nbsp;/ {PHASES.length}</span>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
