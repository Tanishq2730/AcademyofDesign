"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function PlacementPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".placement-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white py-5">
      <div className="container py-5">
        <header className="mb-5 placement-item">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Industry <span className="text-purple-500">Placement.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            Our commitment doesn&apos;t end with education. We ensure our students 
            are placed in world-class design studios, creative agencies, and startups globally.
          </p>
        </header>

        <section className="mb-5 placement-item py-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Top Hiring Partners</h2>
          <div className="row g-4 justify-content-center">
            {["Google", "Amazon", "Nike", "Adidas", "Microsoft", "Meta", "Adobe", "Figma", "Canva", "TCS", "Infosys", "Wipro"].map((company, i) => (
              <div key={i} className="col-6 col-md-4 col-lg-2">
                <div className="h-32 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center grayscale hover:grayscale-0 transition-all hover:bg-white/10">
                  <span className="text-xl font-bold opacity-30">{company}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-5 placement-item py-4">
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <div className="row g-4">
            {[
              { name: "John Doe", role: "Product Designer @ Google", quote: "Nuvosid changed my perspective on design. The mentors are top-notch!" },
              { name: "Jane Smith", role: "Art Director @ Nike", quote: "The curriculum is perfectly aligned with industry requirements." },
              { name: "Alex Johnson", role: "Fashion Designer @ Adidas", quote: "I learned not just skills, but how to think like a designer." }
            ].map((story, i) => (
              <div key={i} className="col-12 col-md-4 d-flex">
                <div className="bg-white/5 p-5 rounded-[40px] border border-white/10 w-100 d-flex flex-column justify-content-between">
                  <p className="text-gray-300 italic mb-5 text-lg">&quot;{story.quote}&quot;</p>
                  <div>
                    <h3 className="font-bold text-xl">{story.name}</h3>
                    <p className="text-purple-500 text-sm font-medium">{story.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Testimonials
        title="Placed. Thriving. Inspiring."
        subtitle="Our alumni are building the future of design at some of the world's most respected companies."
        accentColor="#db254f"
      />
    </div>
  );
}
