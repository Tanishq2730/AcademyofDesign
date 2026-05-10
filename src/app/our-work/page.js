"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const projects = [
  { title: "Neo-Futurism App", student: "Aman Gupta", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
  { title: "Eco-Luxe Fashion", student: "Priya Sharma", img: "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=600&auto=format&fit=crop" },
  { title: "Minimalist Habitat", student: "Rohan Varma", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop" },
  { title: "Urban Branding", student: "Sneha Kapoor", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop" },
  { title: "Glassmorphism UI", student: "Vikram Singh", img: "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=600&auto=format&fit=crop" },
  { title: "Sustainable Fabric", student: "Kavita Rao", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" }
];

export default function OurWorkPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".work-card", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Our <span className="text-purple-500">Masterpieces.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A curated showcase of exceptional projects created by our students. 
            From digital interfaces to avant-garde fashion.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <div key={i} className="work-card group relative h-[450px] rounded-[50px] overflow-hidden cursor-pointer border border-white/10">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold mb-2">{p.title}</h3>
                <p className="text-purple-400 font-medium tracking-widest uppercase text-sm">By {p.student}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
