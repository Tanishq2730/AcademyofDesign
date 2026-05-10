"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black py-5 border-top border-white-5">
      <div className="container">
        <div className="row gy-5">
          {/* Logo and Description */}
          <div className="col-lg-3 col-md-6">
            <Link href="/" className="d-inline-block mb-4">
              <Image 
                src="/assets/logo.png" 
                alt="Nuvosid Logo" 
                width={150} 
                height={50} 
                className="img-fluid"
                style={{ width: '160px', height: 'auto' }}
                unoptimized
              />
            </Link>
            <p className="text-secondary small lh-lg mb-4">
              A premium design academy shaping the creative leaders of tomorrow. 
              Elevate your skills with industry-leading mentors.
            </p>
            <div className="d-flex gap-3">
              {[
                { path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", extra: "M17.5 6.5h.01", rect: true },
                { path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", rect: true, circle: "4 4 2" },
                { path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }
              ].map((icon, i) => (
                <a key={i} href="#" className="d-flex align-items-center justify-content-center rounded-circle bg-white-5 text-secondary transition-all" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.05)', transition: '0.3s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon.rect && <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>}
                    <path d={icon.path}/>
                    {icon.extra && <path d={icon.extra}/>}
                    {icon.circle && <circle cx="4" cy="4" r="2"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="col-lg-3 col-md-6 ps-lg-5">
            <h5 className="text-white fw-bold mb-4">Explore</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {[
                { name: "Our Courses", href: "/courses" },
                { name: "About Us", href: "/about" },
                { name: "Workshops", href: "/workshops" },
                { name: "Placement", href: "/placement" },
                { name: "Our Work", href: "/our-work" },
                { name: "Instructors", href: "/instructors" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-secondary text-decoration-none small hover-white transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-3 col-md-6 ps-lg-4">
            <h5 className="text-white fw-bold mb-4">Support</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "FAQs", href: "/faq" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-secondary text-decoration-none small hover-white transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white fw-bold mb-4">Newsletter</h5>
            <p className="text-secondary small mb-4">Subscribe to get the latest design news and workshop updates.</p>
            <form className="d-flex flex-column flex-sm-row gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="form-control bg-dark border-secondary text-white small py-2 px-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
              />
              <button 
                type="submit" 
                className="btn btn-light fw-bold px-4 py-2 small"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-5 pt-4 border-top border-white-5 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="text-secondary small mb-0">
            © {new Date().getFullYear()} Nuvosid Academy of Design. All rights reserved.
          </p>
          <div className="d-flex gap-4">
            <Link href="/privacy" className="text-secondary text-decoration-none small">Privacy</Link>
            <Link href="/terms" className="text-secondary text-decoration-none small">Terms</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-secondary { color: #888 !important; }
        .bg-white-5 { background-color: rgba(255,255,255,0.05); }
        .border-white-5 { border-color: rgba(255,255,255,0.05) !important; }
        .hover-white:hover { color: #fff !important; }
        .form-control:focus {
          background-color: rgba(255,255,255,0.08);
          border-color: #914864;
          box-shadow: none;
          color: white;
        }
      `}</style>
    </footer>
  );
}
