"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";

const workshops = [
  {
    title: "The Future of UI/UX with AI",
    date: "Dec 10, 2024",
    time: "10:00 AM - 2:00 PM",
    location: "Studio 1 / Online",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Sustainable Fashion Mastery",
    date: "Dec 15, 2024",
    time: "11:00 AM - 4:00 PM",
    location: "Main Campus",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Branding for Creatives",
    date: "Jan 05, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Online",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop"
  }
];

export default function WorkshopsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".workshop-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
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
            Masterclasses & <span className="text-purple-500">Workshops.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our short-term, intensive sessions designed to help you master 
            specific design skills in a collaborative environment.
          </p>
        </header>

        <div className="space-y-12">
          {workshops.map((w, i) => (
            <div key={i} className="workshop-card group grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white/5 border border-white/10 rounded-[50px] overflow-hidden hover:border-purple-500/30 transition-all duration-500">
              <div className="lg:col-span-5 h-64 lg:h-auto overflow-hidden">
                <img 
                  src={w.image} 
                  alt={w.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex gap-4 mb-6">
                  <span className="px-4 py-1 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs uppercase tracking-widest">
                    {w.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 group-hover:text-purple-300 transition-colors">
                  {w.title}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="flex items-center gap-3 text-gray-400">
                    <Calendar size={20} className="text-purple-500" />
                    <span>{w.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <Clock size={20} className="text-purple-500" />
                    <span>{w.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400">
                    <MapPin size={20} className="text-purple-500" />
                    <span>{w.location}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all">
                    Register Now
                  </button>
                  <button className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all inline-flex items-center gap-2">
                    Learn More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
