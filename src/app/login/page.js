"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function LoginPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-box", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="login-box w-full max-w-md bg-white/5 border border-white/10 rounded-[50px] p-10 md:p-16 backdrop-blur-xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter text-white mb-4">Welcome Back.</h1>
          <p className="text-gray-400">Enter your credentials to access your dashboard.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-2">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-sm px-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
              <input type="checkbox" className="accent-purple-500" />
              Remember me
            </label>
            <a href="#" className="text-purple-500 hover:underline">Forgot Password?</a>
          </div>

          <button className="w-full py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Sign In
          </button>
        </form>

        <div className="mt-12 text-center text-gray-500">
          Don&apos;t have an account? <Link href="/enroll" className="text-white font-bold hover:underline">Enroll Now</Link>
        </div>
      </div>
    </div>
  );
}
