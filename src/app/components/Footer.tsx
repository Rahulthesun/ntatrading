import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, ArrowUpRight, Youtube, Instagram, Twitter, MessageCircle } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   DATA (cleaned)
══════════════════════════════════════════════════════════════ */
const NAV_COLS = [
  {
    heading: "Learn",
    links: [
      { label: "Education Course",     to: "/programs/education" },
      { label: "Live Market Sessions", to: "/programs/live" },
      { label: "Mentorship & Support", to: "/programs/mentorship" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Why NTA",  to: "/why-us" },
      { label: "Contact",  to: "/contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Use",   to: "/terms" },
      { label: "Risk Disclosure", to: "/risk" },
    ],
  },
];

const SOCIALS = [
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
  { Icon: MessageCircle, label: "Telegram", href: "#" },
];

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="relative bg-transparent border-t border-purple-500/[0.08] overflow-hidden font-sans">

      {/* CTA */}
      <div className="relative border-b border-purple-500/[0.08]">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] tracking-[0.20em] uppercase text-purple-200/70 mb-2">
              — Limited Seats Available
            </p>
            <h3 className="font-serif text-purple-50 leading-tight"
              style={{ fontSize: "clamp(20px,2.5vw,28px)" }}>
              Ready to start trading{" "}
              <span className="italic text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#d8b4fe,#a855f7)" }}>
                smarter?
              </span>
            </h3>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg"
              style={{ background: "linear-gradient(135deg,#3b82f6,#7c3aed,#9333ea)" }}
            >
              Book a Free Demo
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-5xl mx-auto px-6 pt-14 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <img src="assets/logo.png" className="w-16 h-16 rounded-xl" />
              <div>
                <p className="text-white text-lg">NTA</p>
                <p className="text-purple-200/70 text-xs tracking-widest uppercase">
                  Trading Academy
                </p>
              </div>
            </Link>

            <p className="text-purple-100/80 text-sm leading-relaxed max-w-[260px]">
              Namma Trading Academy — built for Indian retail traders serious about consistent profitability.
            </p>
          </div>

          {/* NAV */}
          {NAV_COLS.map(col => (
            <div key={col.heading}>
              <h4 className="text-purple-200/80 text-xs uppercase tracking-widest mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-purple-100/80 hover:text-white text-sm transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CONTACT */}
          <div>
            <h4 className="text-purple-200/80 text-xs uppercase tracking-widest mb-4">
              Contact
            </h4>

            <div className="space-y-3 text-purple-100/80 text-sm">
              <a href="mailto:contact@ntatrading.in" className="flex gap-2 items-center hover:text-white">
                <Mail size={14} /> contact@ntatrading.in
              </a>
              <a href="tel:919176001402" className="flex gap-2 items-center hover:text-white">
                <Phone size={14} /> +91 9176001402
              </a>
              <div className="flex gap-2 items-center">
                <MapPin size={14} /> Chennai, India
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(({ Icon, href }) => (
                <a key={href} href={href} className="text-purple-200/70 hover:text-white">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* DISCLAIMER */}
        <div className="text-center text-purple-100/70 text-xs leading-relaxed mb-8">
          <span className="text-rose-400 font-semibold">Risk Disclaimer: </span>
          Trading involves risk. This is educational content only. Read our{" "}
          <Link to="/risk" className="underline text-purple-200 hover:text-white">
            Risk Disclosure
          </Link>.
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-purple-200/60 text-xs border-t border-purple-500/10 pt-6">
          <p>© 2026 NTA Trading Academy</p>
          <p>Made in Chennai 🇮🇳</p>
        </div>

      </div>
    </footer>
  );
}