"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Pause, Play } from "lucide-react";
import styles from "./Banner.module.scss";

const YOUTUBE_ID = "e-HZ2TIVULI";
const PLAYER_ELEM_ID = "banner-yt-player";

// postMessage is more reliable than YT.Player API — no script-load race condition
function postCmd(cmd) {
  const iframe = document.getElementById(PLAYER_ELEM_ID);
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: cmd, args: [] }),
    "*"
  );
}

export default function Banner() {
  const sectionRef  = useRef(null);
  const parallaxRef = useRef(null);
  const overlayRef  = useRef(null);
  const progressRef = useRef(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  /* ── Listen for state-change messages from the YouTube iframe ── */
  useEffect(() => {
    const onMessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.event === "onStateChange") {
          setIsPlaying(data.info === 1); // 1 = playing
        }
      } catch { /* non-YT messages — ignore */ }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  /* ── IntersectionObserver: play when visible, pause when not ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!userPausedRef.current) postCmd("playVideo");
          } else {
            postCmd("pauseVideo");
            userPausedRef.current = false;
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.9,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "25% top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      userPausedRef.current = true;
      postCmd("pauseVideo");
    } else {
      userPausedRef.current = false;
      postCmd("playVideo");
    }
  };

  return (
    <section ref={sectionRef} className={styles.videoSection} aria-label="Banner video">

      {/* ── Video background ── */}
      <div className={styles.videoWrapper}>
        <div ref={parallaxRef} className={styles.parallaxLayer}>
          <iframe
            id={PLAYER_ELEM_ID}
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${YOUTUBE_ID}&playsinline=1&iv_load_policy=3&modestbranding=1&disablekb=1&enablejsapi=1`}
            style={{ border: "none" }}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Banner background video"
          />
        </div>
        <div ref={overlayRef} className={styles.overlay} />
      </div>

      {/* ── Play / Pause button ── */}
      <button
        onClick={togglePlay}
        className={`${styles.playBtn} ${isPlaying ? styles.playing : ""}`}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <span className={styles.btnIcon}>
          {isPlaying
            ? <Pause size={18} fill="currentColor" />
            : <Play  size={18} fill="currentColor" />}
        </span>
        <span className={styles.btnLabel}>{isPlaying ? "Pause" : "Play"}</span>
      </button>

      {/* ── Scroll progress bar ── */}
      <div className={styles.progressTrack}>
        <div ref={progressRef} className={styles.progressBar} />
      </div>

    </section>
  );
}
