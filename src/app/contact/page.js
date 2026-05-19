"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ContactHeader from "@/components/Contact/ContactHeader";
import ContactDetails from "@/components/Contact/ContactDetails";
import ContactForm from "@/components/Contact/ContactForm";

export default function ContactPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-fade", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ContactHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <ContactDetails />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
