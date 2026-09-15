import { Link } from "react-router";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { HashLink } from "react-router-hash-link";

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const NAV_COLS = [
  {
    heading: "Explore",
    links: [
      { label: "Home",        to: "/#hero" },
      { label: "About Us",    to: "/about#hero" },
      { label: "Programs",    to: "/programs#hero" },
      { label: "Articles",    to: "/articles#hero" },
      { label: "Founder Story", to: "/founder#founder-story" },
      { label: "Gallery",       to: "/gallery"               },
      { label: "Testimonials",  to: "/articles#testimonials" },
      { label: "Contact",       to: "/articles#contact" },
    ],
  },
  {
    heading: "Programs",
    links: [
      { label: "Equity Trading",        to: "/programs#equity" },
      { label: "Options Trading",       to: "/programs#options" },
      { label: "Commodity & Futures",   to: "/programs#commodities" },
    ],
  },
];

const SOCIALS = [
  {
    Icon: MapPin,
    label: "Our Location",
    href: "https://maps.app.goo.gl/tJcXQcQEcvr3PF3k9",
  },
  {
    Icon: Globe,
    label: "Google Reviews",
    href: "https://share.google/5tfrah4c1nE1DtnhM",
  },
];

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
export function Footer() {
  return (
    <footer className="relative bg-transparent border-t border-purple-500/[0.08] overflow-hidden font-sans">

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <img src="assets/logo1.png" alt="NTA" className="block w-24 h-auto shrink-0" />
              <div>
                <p className="text-white text-lg">Namma Trading Academy</p>
                <p className="text-purple-200/70 text-[8px] tracking-[0.30em] uppercase">
                  United in learning, United in growth
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
                    <HashLink
                      smooth
                      to={link.to}
                      scroll={(el) => {
                        setTimeout(() => {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 150);
                      }}
                      className="text-purple-100/80 hover:text-white text-sm transition"
                    >
                      {link.label}
                    </HashLink>
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
              <a href="mailto:contact@ntaacademy.in" className="flex gap-2 items-center hover:text-white">
                <Mail size={14} /> contact@ntaacademy.in
              </a>
              <a href="tel:917338994283" className="flex gap-2 items-center hover:text-white">
                <Phone size={14} /> +91 7338994283
              </a>
              <div className="flex gap-2 items-center">
                <MapPin size={14} /> Chennai, India
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(({ Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-white">
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
          <HashLink
            smooth
            to="/risk#top"
            scroll={(el) => {
              setTimeout(() => {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 150);
            }}
            className="underline text-purple-200 hover:text-white"
          >
            Risk Disclosure
          </HashLink>.
        </div>

        {/* 🔥 BOTTOM WITH BUILDIFY */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-purple-200/60 text-xs border-t border-purple-500/10 pt-6">

         <div className="flex items-center gap-0 text-purple-200/60">
            <span className="uppercase tracking-[0.16em] text-[12px]">
              Designed & Developed by
            </span>

            <a
              href="https://buildify-web.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-0 hover:text-white transition"
            >
              <img
                src="/assets/buildify-logo1.png"
                alt="Buildify"
                className="h-6 w-auto opacity-90"
              />
            </a>
          </div>
          {/* RIGHT */}
          <div className="text-purple-200/40 text-[11px] tracking-wide">
            © 2026 NTA Trading Academy. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}