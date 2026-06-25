import { Send } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="contact-fade">
      <form className="bg-white/5 border border-white/10 rounded-[50px] p-10 md:p-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Name</label>
            <input
              type="text"
              placeholder="John Doe"
              style={{ color: "var(--fg)", background: "rgba(var(--fg-rgb), 0.05)" }}
              className="w-full border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#db254f] transition-colors"
            />
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              style={{ color: "var(--fg)", background: "rgba(var(--fg-rgb), 0.05)" }}
              className="w-full border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#db254f] transition-colors"
            />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-sm font-bold uppercase tracking-widest text-gray-500 ml-2">Message</label>
          <textarea
            rows="5"
            placeholder="Your message here..."
            style={{ color: "var(--fg)", background: "rgba(var(--fg-rgb), 0.05)" }}
            className="w-full border border-white/10 rounded-2xl p-5 focus:outline-none focus:border-[#db254f] transition-colors resize-none"
          ></textarea>
        </div>
        <button className="w-full py-5 rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition-all shadow-[0_0_40px_rgba(147,51,234,0.3)] flex items-center justify-center gap-3 group">
          Send Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}
