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
  includesBase?: boolean;
  icon: React.ReactNode;
  badge?: string;
  price: string;
  duration: string;
  color: "violet" | "purple" | "fuchsia" | "pink";
}

interface PackagesSectionProps {
  className?: string;
  packages?: Package[];
}

const colorMap = {
  violet: {
    dot:        "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]",
    iconBg:     "bg-violet-400/10 text-violet-400",
    iconGlow:   "group-hover:shadow-[0_0_18px_rgba(167,139,250,0.35)]",
    badge:      "bg-violet-400/10 text-violet-400 border border-violet-400/25",
    topLine:    "via-violet-400",
    featureDot: "bg-violet-400 shadow-[0_0_5px_rgba(167,139,250,0.7)]",
    btnHover:   "hover:border-violet-400/40 hover:text-white hover:bg-violet-400/10",
    duration:   "text-violet-300/60",
    baseTag:    "text-violet-300/60 border-violet-400/20",
  },
  purple: {
    dot:        "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]",
    iconBg:     "bg-purple-400/10 text-purple-400",
    iconGlow:   "group-hover:shadow-[0_0_18px_rgba(192,132,252,0.35)]",
    badge:      "bg-purple-400/10 text-purple-400 border border-purple-400/25",
    topLine:    "via-purple-400",
    featureDot: "bg-purple-400 shadow-[0_0_5px_rgba(192,132,252,0.7)]",
    btnHover:   "hover:border-purple-400/40 hover:text-white hover:bg-purple-400/10",
    duration:   "text-purple-300/60",
    baseTag:    "text-purple-300/60 border-purple-400/20",
  },
  fuchsia: {
    dot:        "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]",
    iconBg:     "bg-fuchsia-400/10 text-fuchsia-400",
    iconGlow:   "group-hover:shadow-[0_0_18px_rgba(232,121,249,0.35)]",
    badge:      "bg-fuchsia-400/10 text-fuchsia-400 border border-fuchsia-400/25",
    topLine:    "via-fuchsia-400",
    featureDot: "bg-fuchsia-400 shadow-[0_0_5px_rgba(232,121,249,0.7)]",
    btnHover:   "hover:border-fuchsia-400/40 hover:text-white hover:bg-fuchsia-400/10",
    duration:   "text-fuchsia-300/60",
    baseTag:    "text-fuchsia-300/60 border-fuchsia-400/20",
  },
  pink: {
    dot:        "bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    iconBg:     "bg-pink-400/10 text-pink-400",
    iconGlow:   "group-hover:shadow-[0_0_18px_rgba(244,114,182,0.35)]",
    badge:      "bg-pink-400/10 text-pink-400 border border-pink-400/25",
    topLine:    "via-pink-400",
    featureDot: "bg-pink-400 shadow-[0_0_5px_rgba(244,114,182,0.7)]",
    btnHover:   "hover:border-pink-400/40 hover:text-white hover:bg-pink-400/10",
    duration:   "text-pink-300/60",
    baseTag:    "text-pink-300/60 border-pink-400/20",
  },
} as const;

const defaultPackages: Package[] = [
  {
    name: "Basic",
    tagline: "Begin your trading journey",
    description: "Everything you need to understand the markets and place your first confident trades.",
    features: [
      "Market basics",
      "Trading terminology",
      "Candlestick analysis",
      "Basic technical analysis",
      "Risk management foundation",
      "Trading platform guidance",
    ],
    icon: <Zap className="w-4 h-4" />,
    price: "₹6,500 – ₹8,500",
    duration: "30 to 45 days",
    color: "violet",
  },
  {
    name: "Pro",
    tagline: "Accelerate with strategy",
    description: "Go deeper into technicals, derivatives, and real trade setups with daily mentorship.",
    features: [
      "Advanced technical analysis",
      "Price action strategies",
      "Intraday trading concepts",
      "Swing trading setups",
      "Multi-timeframe analysis",
      "Live market observation",
    ],
    includesBase: true,
    icon: <Flame className="w-4 h-4" />,
    badge: "Popular",
    price: "₹10,000 – ₹12,000",
    duration: "3 to 6 months",
    color: "purple",
  },
  {
    name: "Elite",
    tagline: "Full mentorship program",
    description: "Institutional-grade strategies with personalized mentorship and live market discussions.",
    features: [
      "Advanced market structure",
      "Options trading concepts",
      "Trading psychology",
      "Personalized mentorship",
      "Daily market discussion",
      "Strategy refinement",
    ],
    includesBase: true,
    icon: <Shield className="w-4 h-4" />,
    badge: "Best Value",
    price: "₹15,000 – ₹20,000",
    duration: "Long term",
    color: "fuchsia",
  },
  {
    name: "VIP",
    tagline: "White-glove mentorship",
    description: "A dedicated mentor, direct trainer access, and live trade execution — the complete package.",
    features: [
      "One-to-one mentorship",
      "Direct trainer interaction",
      "Personalized trading plans",
      "Portfolio review guidance",
      "Advanced risk management",
      "Priority doubt clarification",
      "Live trade execution sessions",
      "Performance tracking support",
      "Premium community access",
    ],
    icon: <Crown className="w-4 h-4" />,
    price: "₹30,000 – ₹40,000",
    duration: "Long term",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-violet-400/10 border border-violet-400/20">
            <span className="w-[5px] h-[5px] rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)] shrink-0" />
            <span
              className="text-[9px] font-semibold tracking-[0.18em] uppercase text-purple-200/80"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Our Course Packages
            </span>
          </div>

          <h2 className="text-[clamp(26px,4vw,48px)] tracking-tight leading-[1.1] text-white mb-4">
            Choose Your Own Path
          </h2>

          <p className="text-[13px] font-light max-w-[380px] mx-auto leading-[1.85] text-purple-200/60">
            From first trade to full-time — every level has a program built for it.
          </p>
        </div>

        {/* ── Cards grid ── */}
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
                        )}>
                          {pkg.badge}
                        </span>
                      )}
                    </div>

                    {/* Plan name — prominent white heading */}
                    <h3 className="text-[clamp(22px,2.5vw,24px)] font-normal tracking-tight leading-[1.15] mb-2 text-white">
                      {pkg.name}
                    </h3>


                    {/* Price — white bold */}
                    <div className="mb-3">
                      <p className="text-[28px] sm:text-[24px] font-semibold tracking-tight leading-none text-white">
                        {pkg.price}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-white/40 mt-1">
                        Course Fee
                      </p>
                    </div>

                    {/* Duration */}
                    <p className={cn("text-[11px] tracking-[0.05em] mb-4", c.duration)}>
                      Duration: {pkg.duration}
                    </p>

                    {/* Description */}

                    {/* Features */}
                    <div className="mt-2 space-y-3 min-h-[120px]">
                      {pkg.features.slice(0, 3).map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full mt-[7px] shrink-0",
                              c.featureDot
                            )}
                          />
                          <p className="text-[12px] leading-[1.6] text-white/70">
                            {feature}
                          </p>
                        </div>
                      ))}

                      {pkg.features.length > 3 && (
                        <p className="text-[11px] text-white/35 pl-[18px]">
                          +{pkg.features.length - 3} more features
                        </p>
                      )}
                    </div>

                    {/* CTA */}
                    <HashLink
                      smooth
                      to="/programs"
                      scroll={(el) => {
                        setTimeout(() => {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 150);
                      }}
                    >
                      <button
                        className={cn(
                          "w-full mt-6 py-3 rounded-xl border border-white/15 bg-transparent",
                          "text-[12px] font-semibold tracking-[0.08em] text-white/70",
                          "transition-all duration-200 cursor-pointer",
                          c.btnHover
                        )}
                      >
                        Read More Details 
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
          className="relative z-10 text-center mt-10 text-[11px] tracking-[0.08em] text-purple-200/45"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Reach out to learn more about what's included in each plan.
        </p>

      </section>
    </>
  );
}