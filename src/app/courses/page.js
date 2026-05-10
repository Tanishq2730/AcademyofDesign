"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const allCourses = [
  { title: "UI/UX Design", category: "Digital", duration: "6 Months", image: "https://images.unsplash.com/photo-1586717791821-3f44a563de4c?q=80&w=600&auto=format&fit=crop" },
  { title: "Fashion Design", category: "Lifestyle", duration: "1 Year", image: "https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?q=80&w=600&auto=format&fit=crop" },
  { title: "Interior Design", category: "Architecture", duration: "1 Year", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop" },
  { title: "Graphic Design", category: "Digital", duration: "4 Months", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=600&auto=format&fit=crop" },
  { title: "Web Development", category: "Tech", duration: "6 Months", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop" },
  { title: "Motion Graphics", category: "Video", duration: "5 Months", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" },
];

export default function CoursesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".course-card", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Our <span className="text-purple-500">Programs.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose a path that aligns with your passion. Each program is meticulously 
            crafted to ensure you become a master of your craft.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allCourses.map((course, idx) => (
            <div key={idx} className="course-card group relative bg-white/5 rounded-[40px] overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500">
              <div className="h-64 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-gray-500 text-sm">{course.duration}</span>
                </div>
                <h3 className="text-2xl font-bold mb-6">{course.title}</h3>
                <Link 
                  href={`/courses/${course.title.toLowerCase().replace(/ /g, '-')}`}
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
