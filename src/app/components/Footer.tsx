import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight, Youtube, Instagram, Twitter, MessageCircle } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const NAV_COLS = [
  {
    heading: "Learn",
    links: [
      { label: "Education Course",     to: "/programs/education"     },
      { label: "Live Market Sessions", to: "/programs/live"          },
      { label: "Mentorship & Support", to: "/programs/mentorship"    },
      { label: "Certification",        to: "/programs/certification" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",     to: "/about"       },
      { label: "Why NTA",      to: "/why-us"       },
      { label: "Testimonials", to: "/testimonials" },
      { label: "Blog",         to: "/blog"         },
      { label: "Contact",      to: "/contact"      },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy",  to: "/privacy" },
      { label: "Terms of Use",    to: "/terms"   },
      { label: "Refund Policy",   to: "/refunds" },
      { label: "Risk Disclosure", to: "/risk"    },
    ],
  },
];

const SOCIALS = [
  { Icon: Youtube,        label: "YouTube",   href: "#" },
  { Icon: Instagram,      label: "Instagram", href: "#" },
  { Icon: Twitter,        label: "Twitter",   href: "#" },
  { Icon: MessageCircle,  label: "Telegram",  href: "#" },
];

/* ══════════════════════════════════════════════════════════════
   LOGO — embedded SVG so no import dependency
══════════════════════════════════════════════════════════════ */
const LOGO_SRC = "YOUR_LOGO_URL_HERE"; // swap with actual URL

/* ══════════════════════════════════════════════════════════════
   SPARKLINE — purple themed
══════════════════════════════════════════════════════════════ */
function Spark() {
  const pts  = [45, 52, 48, 58, 54, 63, 57, 68, 63, 72, 68, 78];
  const max  = Math.max(...pts), min = Math.min(...pts);
  const norm = (v: number) => 100 - ((v - min) / (max - min)) * 76 - 12;
  const d    = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100},${norm(v)}`).join(" ");
  const area = `M 0,100 ${d.slice(2)} L 100,100 Z`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="fsparkG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#a855f7" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#fsparkG)" />
      <path d={d} fill="none" stroke="#a855f7" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="100" cy={norm(pts[pts.length - 1])} r="2.5" fill="#d8b4fe" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="relative bg-[#06010F] border-t border-purple-500/[0.08] overflow-hidden font-sans">

      {/* ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[260px]"
          style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.07) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px]"
          style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)" }} />
      </div>

      {/* ── CTA banner ── */}
      <div className="relative border-b border-purple-500/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.20em] uppercase text-purple-400/55 mb-2">
              — Limited Seats Available
            </p>
            <h3 className="font-serif font-normal text-purple-50 leading-tight"
              style={{ fontSize: "clamp(20px,2.5vw,28px)" }}>
              Ready to start trading{" "}
              <span
                className="font-serif italic text-transparent bg-clip-text inline-block px-1"
                style={{ backgroundImage: "linear-gradient(135deg,#d8b4fe 0%,#a855f7 55%,#c084fc 100%)" }}
              >
                smarter?
              </span>
            </h3>
          </div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-[13px] text-white whitespace-nowrap border-0 shadow-[0_4px_24px_rgba(109,40,217,0.38)] hover:shadow-[0_6px_32px_rgba(139,92,246,0.52)] transition-shadow duration-300"
              style={{ background: "linear-gradient(135deg,#6d28d9,#a855f7)" }}
            >
              Book a Free Demo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* ── Brand column ── */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* logo */}
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0
                shadow-[0_0_12px_rgba(168,85,247,0.22)]
                group-hover:shadow-[0_0_18px_rgba(196,132,252,0.32)]
                transition-shadow duration-300">
                <img src="assets/logo.png" alt="NTA" className="w-full h-full object-cover scale-[1.1]" />
              </div>
              <div>
                <p className="font-serif text-[15px] text-purple-50 leading-none">NTA</p>
                <p className="font-sans text-[7.5px] tracking-[0.22em] uppercase text-purple-400/40 mt-[3px]">
                  Trading Academy
                </p>
              </div>
            </Link>

            {/* tagline */}
            <p className="font-sans text-[12.5px] font-light text-purple-200/35 leading-[1.8] max-w-[260px]">
              Namma Trading Academy — built for Indian retail traders who are
              serious about consistent profitability. Live markets, every day.
            </p>

            {/* mini sparkline */}
            <div className="h-11 rounded-xl overflow-hidden border border-purple-500/[0.09] bg-purple-500/[0.03]">
              <Spark />
            </div>

            {/* badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {["SEBI Aware", "NSE Certified", "NSE India"].map(b => (
                <span key={b}
                  className="px-2.5 py-1 rounded-lg font-sans text-[9.5px] font-medium text-purple-400/45 border border-purple-500/[0.10] bg-purple-500/[0.04] tracking-[0.06em]">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* ── Nav columns ── */}
          {NAV_COLS.map(col => (
            <div key={col.heading} className="lg:col-span-1">
              <h4 className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/40 mb-5">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map(link => (
                  <li key={link.to}>
                    <Link to={link.to}
                      className="group flex items-center gap-2 font-sans text-[12.5px] text-purple-200/35 hover:text-purple-200/80 transition-colors duration-200">
                      <span className="w-1 h-1 rounded-full bg-purple-500/20 group-hover:bg-purple-400/60 transition-colors duration-200 shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ── Contact column ── */}
          <div className="lg:col-span-1">
            <h4 className="font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/40 mb-5">
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              {[
                { Icon: Mail,    href: "mailto:contact@ntatrading.in", value: "contact@ntatrading.in",      iconColor: "text-purple-400"  },
                { Icon: Phone,   href: "tel:+919876543210",            value: "+91 98765 43210",            iconColor: "text-violet-400"  },
                { Icon: MapPin,  href: undefined,                      value: "Chennai, Tamil Nadu, India", iconColor: "text-purple-300"  },
              ].map(({ Icon, href, value, iconColor }) => (
                <li key={value}>
                  {href
                    ? (
                      <a href={href}
                        className="flex items-start gap-3 group text-purple-200/35 hover:text-purple-200/75 transition-colors duration-200">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/[0.10] bg-purple-500/[0.05] group-hover:border-purple-400/20 transition-colors duration-200">
                          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                        </span>
                        <span className="font-sans text-[12px] leading-snug break-all">{value}</span>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 text-purple-200/30">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/[0.09] bg-purple-500/[0.04]">
                          <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                        </span>
                        <span className="font-sans text-[12px] leading-relaxed">{value}</span>
                      </div>
                    )
                  }
                </li>
              ))}
            </ul>

            {/* social icons */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIALS.map(({ Icon, label, href }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.95 }}
                  title={label}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-purple-400/40 hover:text-purple-300/80 border border-purple-500/[0.10] bg-purple-500/[0.04] hover:border-purple-400/22 transition-all duration-200">
                  <Icon className="w-3.5 h-3.5" />
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        {/* ── Risk disclaimer ── */}
        <div className="rounded-2xl px-5 py-4 mb-8 border border-purple-500/[0.08] bg-purple-500/[0.03]">
          <p className="font-sans text-[11px] text-purple-300/25 leading-[1.75] text-center">
            <span className="text-rose-400/70 font-semibold">RISK DISCLAIMER: </span>
            Trading in equities, F&O, commodities and currencies involves substantial risk of loss and is not
            suitable for all investors. Past performance is not indicative of future results. NTA Trading Academy
            provides educational content only and does not constitute investment advice. Please read our{" "}
            <Link to="/risk"
              className="text-purple-400/45 hover:text-purple-300/70 underline underline-offset-2 transition-colors">
              Risk Disclosure
            </Link>
            {" "}before enrolling. Consult a SEBI-registered advisor before making investment decisions.
          </p>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-purple-500/[0.07]">
          <p className="font-sans text-[10.5px] tracking-[0.06em] text-purple-400/22">
            © 2026 NTA Trading Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-1 font-sans text-[10.5px] text-purple-400/20">
            <span>Made with</span>
            <span className="text-purple-400/45 mx-0.5">♥</span>
            <span>in Chennai, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}