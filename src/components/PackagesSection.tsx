"use client";

import { motion } from "framer-motion";
import { Zap, Flame, Shield, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { HashLink } from "react-router-hash-link";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface Package {
  name: string;
  tagline: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  badge?: string;
  /** Tailwind color token shared across icon/badge/dot/hover — e.g. "violet" | "purple" | "fuchsia" | "pink" */
  color: "violet" | "purple" | "fuchsia" | "pink";
}

interface PackagesSectionProps {
  className?: string;
  packages?: Package[];
}

/* Per-color Tailwind class maps — avoids dynamic class purging */
const colorMap = {
  violet: {
    dot:         "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]",
    iconBg:      "bg-violet-400/10 text-violet-400",
    iconGlow:    "group-hover:shadow-[0_0_18px_rgba(167,139,250,0.35)]",
    badge:       "bg-violet-400/10 text-violet-400 border border-violet-400/25",
    name:        "text-violet-400",
    topLine:     "via-violet-400",
    featureDot:  "bg-violet-400 shadow-[0_0_5px_rgba(167,139,250,0.7)]",
    btnHover:    "hover:border-violet-400/40 hover:text-white hover:bg-violet-400/10",
  },
  purple: {
    dot:         "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    iconBg:      "bg-purple-400/10 text-purple-400",
    iconGlow:    "group-hover:shadow-[0_0_18px_rgba(192,132,252,0.35)]",
    badge:       "bg-purple-400/10 text-purple-400 border border-purple-400/25",
    name:        "text-purple-400",
    topLine:     "via-purple-400",
    featureDot:  "bg-purple-400 shadow-[0_0_5px_rgba(192,132,252,0.7)]",
    btnHover:    "hover:border-purple-400/40 hover:text-white hover:bg-purple-400/10",
  },
  fuchsia: {
    dot:         "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]",
    iconBg:      "bg-fuchsia-400/10 text-fuchsia-400",
    iconGlow:    "group-hover:shadow-[0_0_18px_rgba(232,121,249,0.35)]",
    badge:       "bg-fuchsia-400/10 text-fuchsia-400 border border-fuchsia-400/25",
    name:        "text-fuchsia-400",
    topLine:     "via-fuchsia-400",
    featureDot:  "bg-fuchsia-400 shadow-[0_0_5px_rgba(232,121,249,0.7)]",
    btnHover:    "hover:border-fuchsia-400/40 hover:text-white hover:bg-fuchsia-400/10",
  },
  pink: {
    dot:         "bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    iconBg:      "bg-pink-400/10 text-pink-400",
    iconGlow:    "group-hover:shadow-[0_0_18px_rgba(244,114,182,0.35)]",
    badge:       "bg-pink-400/10 text-pink-400 border border-pink-400/25",
    name:        "text-pink-400",
    topLine:     "via-pink-400",
    featureDot:  "bg-pink-400 shadow-[0_0_5px_rgba(244,114,182,0.7)]",
    btnHover:    "hover:border-pink-400/40 hover:text-white hover:bg-pink-400/10",
  },
} as const;

const defaultPackages: Package[] = [
  {
    name: "Starter",
    tagline: "Begin your trading journey",
    description: "Everything you need to understand the markets and place your first confident trades.",
    features: ["Live sessions", "Community access", "Recorded replays"],
    icon: <Zap className="w-4 h-4" />,
    color: "violet",
  },
  {
    name: "Growth",
    tagline: "Accelerate with strategy",
    description: "Go deeper into technicals, derivatives, and real trade setups with daily mentorship.",
    features: ["Daily live sessions", "Options & futures", "Trade alerts"],
    icon: <Flame className="w-4 h-4" />,
    badge: "Popular",
    color: "purple",
  },
  {
    name: "Pro",
    tagline: "Full mentorship program",
    description: "Institutional-grade strategies with weekly one-on-one coaching and live trade room access.",
    features: ["1-on-1 coaching", "Live trade room", "Portfolio review"],
    icon: <Shield className="w-4 h-4" />,
    color: "fuchsia",
  },
  {
    name: "Elite",
    tagline: "White-glove mentorship",
    description: "A dedicated mentor, exclusive masterclasses, and prop firm preparation — the complete package.",
    features: ["Dedicated mentor", "Prop firm prep", "Lifetime access"],
    icon: <Crown className="w-4 h-4" />,
    badge: "Best Value",
    color: "pink",
  },
];

export default function PackagesSection({ className, packages = defaultPackages }: PackagesSectionProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
      `}</style>

      <section className={cn("relative py-24 sm:py-32 overflow-hidden", className)}>

        {/* ── Section header ── */}
        <div className="relative z-10 text-center mb-16 px-4">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-violet-400/10 border border-violet-400/20">
            <span className="w-[5px] h-[5px] rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)] shrink-0" />
            <span
              className="text-[9px] font-semibold tracking-[0.18em] uppercase text-purple-200/80"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Our Course Packages
            </span>
          </div>

          <h2
            className="text-[clamp(26px,4vw,48px)] tracking-tight leading-[1.1] text-[#f0eeff] mb-4"
          >
            Choose Your Own Path
          </h2>

          <p
            className="text-[13px] font-light max-w-[380px] mx-auto leading-[1.85] text-purple-200/40"
          >
            From first trade to full-time — every level has a program built for it.
          </p>
        </div>

        {/* ── Cards grid — unified panel with dividers ── */}
        <div className="relative z-10 container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y xl:divide-y-0 xl:divide-x divide-white/[0.06] rounded-2xl border border-white/[0.06] overflow-hidden">
            {packages.map((pkg) => {
              const c = colorMap[pkg.color];
              return (
                <div key={pkg.name} className="group relative flex flex-col bg-[linear-gradient(160deg,rgba(36,0,72,0.55),rgba(16,0,30,0.60))]">

                  {/* Top accent line on hover */}
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    c.topLine
                  )} />

                  <div className="flex flex-col flex-1 p-7 sm:p-8">

                    {/* Icon + badge */}
                    <div className="flex items-start justify-between mb-7">
                      <div className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-xl transition-shadow duration-300",
                        c.iconBg,
                        c.iconGlow
                      )}>
                        {pkg.icon}
                      </div>

                      {pkg.badge && (
                        <span className={cn(
                          "text-[8.5px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full",
                          c.badge
                        )}
                        >
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    {/* Plan name */}
                    <p className={cn(
                      "text-[10px] font-semibold tracking-[0.2em] uppercase mb-2",
                      c.name
                    )}
                    >
                      {pkg.name}
                    </p>

                    {/* Tagline */}
                    <p
                      className="text-[clamp(16px,2vw,19px)] font-semibold tracking-tight leading-[1.25] text-[#e8e0ff] mb-3"
                    >
                      {pkg.tagline}
                    </p>

                    {/* Description */}
                    <p
                      className="text-[12.5px] font-light leading-[1.8] text-purple-200/38 mb-6"
                    >
                      {pkg.description}
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-white/[0.06] mb-5" />

                    {/* Features */}
                    <ul className="flex flex-col gap-2.5 flex-1">
                      {pkg.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <span className={cn("w-1 h-1 rounded-full shrink-0", c.featureDot)} />
                          <span
                            className="text-[12.5px] font-normal text-purple-200/55"
                          >
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <HashLink 
                     smooth
                     to="/articles#contact"
                     scroll = {(el) => {
                      setTimeout(()=> {
                        el.scrollIntoView({ behavior: "smooth" , block: "start" });
                      }, 150)
                     }}
                     >
                      <button
                      className={cn(
                        "w-full mt-8 py-3 rounded-xl border border-white/10 bg-transparent",
                        "text-[12px] font-semibold tracking-[0.08em] text-purple-200/60",
                        "transition-all duration-200 cursor-pointer",
                        c.btnHover
                      )}
                    >
                      Enquire Now
                    </button>
                    </HashLink>
                    

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <p
          className="relative z-10 text-center mt-10 text-[11px] tracking-[0.08em] text-violet-400/28"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Reach out to learn more about what's included in each plan.
        </p>

      </section>
    </>
  );
}