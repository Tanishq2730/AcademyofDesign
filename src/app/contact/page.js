"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail, Phone, MapPin, Send } from "lucide-react";

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
        <header className="mb-20 contact-fade">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Get in <span className="text-purple-500">Touch.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Have questions about our programs or enrollment? Our team is here to 
            help you find the perfect path for your design career.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Details */}
          <div className="contact-fade space-y-12">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Mail className="text-purple-500" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-gray-400 text-lg">hello@nuvosid.com</p>
                <p className="text-gray-400 text-lg">admissions@nuvosid.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Phone className="text-purple-500" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-gray-400 text-lg">+91 (800) 123-4567</p>
                <p className="text-gray-400 text-lg">+91 (800) 987-6543</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                <MapPin className="text-purple-500" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Visit Campus</h3>
                <p className="text-gray-400 text-lg">123 Design Square, Creative District</p>
                <p className="text-gray-400 text-lg">Mumbai, MH 400001, India</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-fade">
            <form className="bg-white/5 border border-white/10 rounded-[50px] p-10 md:p-16 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Message</label>
                <textarea 
                  rows="5" 
                  placeholder="Your message here..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button className="w-full py-5 rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-[0_0_40px_rgba(147,51,234,0.3)] flex items-center justify-center gap-3 group">
                Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
