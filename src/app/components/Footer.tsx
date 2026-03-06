import { Link } from "react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, BarChart2, ArrowUpRight, Twitter, Youtube, Instagram, MessageCircle } from "lucide-react";

/* ── Data ── */
const NAV_COLS = [
  {
    heading: "Learn",
    links: [
      { label: "Education Course",       to: "/programs/education"     },
      { label: "Live Market Sessions",   to: "/programs/live"          },
      { label: "Mentorship & Support",   to: "/programs/mentorship"    },
      { label: "Certification",          to: "/programs/certification" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",       to: "/about"        },
      { label: "Why NTA",        to: "/why-us"        },
      { label: "Results",        to: "/results"       },
      { label: "Testimonials",   to: "/testimonials"  },
      { label: "Blog",           to: "/blog"          },
      { label: "Contact",        to: "/contact"       },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",   to: "/privacy"  },
      { label: "Terms of Use",     to: "/terms"    },
      { label: "Refund Policy",    to: "/refunds"  },
      { label: "Risk Disclosure",  to: "/risk"     },
    ],
  },
];

const SOCIALS = [
  { icon: <Youtube className="w-4 h-4" />,        label: "YouTube",  href: "#", color: "#ff4466" },
  { icon: <Instagram className="w-4 h-4" />,      label: "Instagram",href: "#", color: "#bf80ff" },
  { icon: <Twitter className="w-4 h-4" />,        label: "Twitter",  href: "#", color: "#00d4ff" },
  { icon: <MessageCircle className="w-4 h-4" />,  label: "Telegram", href: "#", color: "#00ff88" },
];

/* ── Sparkline decoration ── */
function FooterChart() {
  const pts = [45, 52, 48, 58, 54, 62, 57, 68, 63, 72, 68, 76];
  const max = Math.max(...pts), min = Math.min(...pts);
  const norm = (v: number) => 100 - ((v - min) / (max - min)) * 80 - 10;
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100},${norm(v)}`).join(" ");
  const area = `M 0,100 ${d.slice(2)} L 100,100 Z`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="footerGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#footerGrad)" />
      <path d={d} fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(pts.length - 1) / (pts.length - 1) * 100} cy={norm(pts[pts.length - 1])} r="2.5" fill="#00ff88" />
    </svg>
  );
}

/* ── Main footer ── */
export function Footer() {
  return (
    <footer className="relative bg-[#060a12] border-t border-white/5 overflow-hidden">

      {/* Background glows */}
      <div className="absolute bottom-0 left-1/4 w-96 h-48 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(129,0,209,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-0 right-1/4 w-96 h-48 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* ── CTA banner ── */}
      <div className="relative border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-purple-400 mb-1">— Limited Seats Available</p>
            <h3 className="text-white font-bold text-2xl tracking-tight">
              Ready to start trading smarter?
            </h3>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap"
              style={{ background: "linear-gradient(135deg, #8100D1, #5500b5)", boxShadow: "0 4px 24px rgba(129,0,209,0.4)" }}
            >
              Book a Free Demo
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand column — spans 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "linear-gradient(135deg, #8100D1, #00ff88)", boxShadow: "0 0 16px rgba(129,0,209,0.35)" }}>
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none tracking-tight">NTA</div>
                <div className="text-[8px] font-semibold tracking-[0.22em] uppercase leading-none mt-1"
                  style={{ background: "linear-gradient(90deg, #8100D1, #00ff88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Trading Academy
                </div>
              </div>
            </Link>

            <p className="text-gray-500 text-sm leading-relaxed">
              Namma Trading Academy — built for Indian retail traders who are serious about consistent profitability. United in learning, united in growth.
            </p>

            {/* Mini chart */}
            <div className="h-12 rounded-xl overflow-hidden border border-emerald-400/10 bg-emerald-400/3">
              <FooterChart />
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {["SEBI Aware", "NSE Certified", "NSE India"].map((b) => (
                <span key={b} className="px-2.5 py-1 rounded-md text-[10px] font-semibold text-gray-500 border border-white/8 bg-white/3 tracking-wide">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading} className="lg:col-span-1">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-5">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="group flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors duration-200 text-sm"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-emerald-400 transition-colors duration-200 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="lg:col-span-1">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-5">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contact@ntatrading.in"
                  className="flex items-start gap-3 text-gray-500 hover:text-white transition-colors duration-200 group">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-white/8 group-hover:border-purple-500/40 bg-white/3 transition-colors duration-200">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                  </span>
                  <span className="text-sm leading-snug break-all">contact@ntatrading.in</span>
                </a>
              </li>
              <li>
                <a href="tel:+919876543210"
                  className="flex items-start gap-3 text-gray-500 hover:text-white transition-colors duration-200 group">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-white/8 group-hover:border-emerald-500/40 bg-white/3 transition-colors duration-200">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  <span className="text-sm">+91 98765 43210</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-500">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-white/8 bg-white/3">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  </span>
                  <span className="text-sm leading-relaxed">Dalal Street, Mumbai,<br />Maharashtra 400 001</span>
                </div>
              </li>
            </ul>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}
                  title={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 hover:text-white transition-colors duration-200 border border-white/8 bg-white/3"
                  style={{ ["--hover-color" as string]: s.color }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <div className="rounded-xl p-4 mb-8 border border-rose-400/10 bg-rose-400/4">
          <p className="text-[11px] text-gray-600 leading-relaxed text-center">
            <span className="text-rose-400 font-bold">RISK DISCLAIMER: </span>
            Trading in equities, F&O, commodities and currencies involves substantial risk of loss and is not suitable for all investors.
            Past performance is not indicative of future results. NTA Trading Academy provides educational content only and does not
            constitute investment advice. Please read our{" "}
            <Link to="/risk" className="text-gray-500 hover:text-white underline underline-offset-2 transition-colors">Risk Disclosure</Link>
            {" "}before enrolling. Consult a SEBI-registered advisor before making investment decisions.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-gray-600 text-xs tracking-wide">
            © 2026 NTA Trading Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-700 text-xs">
            <span>Made with</span>
            <span className="text-rose-400 mx-0.5">♥</span>
            <span>in Chennai, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}