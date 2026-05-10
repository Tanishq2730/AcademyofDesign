"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Globe } from "lucide-react";

const instructors = [
  { name: "Sarah Jenkins", role: "Head of UI/UX", bio: "15+ years experience in product design at top silicon valley firms.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop" },
  { name: "Marcus Thorne", role: "Creative Director", bio: "Award winning creative director specialized in brand identity.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop" },
  { name: "Elena Rodriguez", role: "Fashion Specialist", bio: "Renowned designer with collections showcased at Paris Fashion Week.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" },
  { name: "David Kim", role: "Interior Architect", bio: "Leading architect focusing on sustainable and futuristic living.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop" },
  { name: "Aisha Patel", role: "Typography Expert", bio: "Master of letterforms and experimental visual communication.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" },
  { name: "James Wilson", role: "Motion Designer", bio: "Creating immersive digital experiences through movement.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop" }
];

export default function InstructorsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".instructor-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Meet the <span className="text-purple-500">Experts.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Our faculty members are more than just teachers; they are industry 
            visionaries who have shaped the world of design as we know it.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {instructors.map((ins, i) => (
            <div key={i} className="instructor-card group relative bg-white/5 rounded-[40px] p-10 border border-white/10 hover:border-purple-500/50 transition-all duration-500 text-center">
              <div className="relative w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-purple-500/20 group-hover:border-purple-500 transition-colors">
                <img src={ins.img} alt={ins.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{ins.name}</h3>
              <p className="text-purple-500 font-medium mb-6 uppercase tracking-widest text-sm">{ins.role}</p>
              <p className="text-gray-400 leading-relaxed mb-8">{ins.bio}</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-purple-500 hover:text-white transition-all text-gray-400">
                  <Globe size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
