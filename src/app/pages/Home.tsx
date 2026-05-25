import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { Footer } from "../components/Footer";
import { MarketTicker } from "../components/MarketTicker";
import { Testimonials } from "../components/testimonials";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SocialProof } from "../components/SocialProof";
import { Services } from "../components/Services";
import StarCourseSection from "../components/StarCourseSection";
import Hero from "../components/Hero";
import { CTASection } from "../components/CTASection";
import { Navbar } from "../components/Navbar";
import PackagesSection from "../../components/PackagesSection";

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
export function Home() {
  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-br relative overflow-hidden
from-[#1d4ed8]
via-[#0f172a]
to-[#000000]
">
      {/* Minimal Trading Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1] opacity-[0.42] mix-blend-screen">
        {/* Animated chart lines */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 1200"
          preserveAspectRatio="none"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.path
            d="M0 700 C180 620 240 760 420 680 S720 540 920 620 S1180 760 1440 580"
            fill="none"
            stroke="rgba(34,211,238,0.95)"
            strokeWidth="2.2"
            strokeDasharray="10 6"
            style={{ filter: "drop-shadow(0 0 10px rgba(34,211,238,0.6))" }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />

          <motion.path
            d="M0 840 C220 760 300 900 520 820 S900 620 1120 720 S1280 820 1440 760"
            fill="none"
            stroke="rgba(16,185,129,0.85)"
            strokeWidth="1.8"
            style={{ filter: "drop-shadow(0 0 8px rgba(16,185,129,0.5))" }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }}
          />
        </motion.svg>

        {/* Floating trading labels */}
        <motion.div
          className="absolute top-[18%] left-[12%] text-cyan-200 text-sm font-medium tracking-[0.2em]"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          NIFTY +2.4%
        </motion.div>

        <motion.div
          className="absolute top-[52%] right-[12%] text-emerald-200 text-sm font-medium tracking-[0.2em]"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 9, repeat: Infinity }}
        >
          BANKNIFTY
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[28%] text-cyan-200 text-sm font-medium tracking-[0.2em]"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          RSI ▲
        </motion.div>

        <motion.div
          className="absolute top-[14%] right-[22%] text-cyan-200/70 text-xs tracking-[0.25em]"
          animate={{ y: [0, -18, 0], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 9, repeat: Infinity }}
        >
          EMA 20
        </motion.div>

        <motion.div
          className="absolute top-[34%] left-[8%] text-emerald-200/70 text-xs tracking-[0.25em]"
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.55, 0.2] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          MACD ↗
        </motion.div>

        <motion.div
          className="absolute top-[42%] left-[62%] text-cyan-100/70 text-xs tracking-[0.25em]"
          animate={{ y: [0, -10, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 8, repeat: Infinity }}
        >
          +2.84%
        </motion.div>

        <motion.div
          className="absolute bottom-[28%] right-[14%] text-emerald-100/70 text-xs tracking-[0.25em]"
          animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
        >
          ₹85,240
        </motion.div>

        <motion.div
          className="absolute bottom-[18%] left-[14%] text-cyan-100/60 text-xs tracking-[0.25em]"
          animate={{ y: [0, -14, 0], opacity: [0.18, 0.42, 0.18] }}
          transition={{ duration: 11, repeat: Infinity }}
        >
          VWAP
        </motion.div>

        <motion.div
          className="absolute top-[64%] left-[48%] text-emerald-100/60 text-xs tracking-[0.25em]"
          animate={{ y: [0, -16, 0], opacity: [0.2, 0.48, 0.2] }}
          transition={{ duration: 8.5, repeat: Infinity }}
        >
          ▲ +1.72%
        </motion.div>

        {/* Minimal candle glow accents */}
        <motion.div
          className="absolute top-[30%] left-[25%] w-[2px] h-20 bg-cyan-300/70 shadow-[0_0_30px_rgba(34,211,238,0.8)] blur-[1px]"
          animate={{ scaleY: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-[62%] right-[24%] w-[2px] h-14 bg-emerald-300/65 shadow-[0_0_30px_rgba(16,185,129,0.75)] blur-[1px]"
          animate={{ scaleY: [1, 1.4, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Mini candlestick graphics */}
        <div className="absolute top-[22%] left-[72%] flex items-end gap-[4px] opacity-70">
          <div className="w-[2px] h-10 bg-emerald-300/70" />
          <div className="w-[2px] h-6 bg-red-400/60" />
          <div className="w-[2px] h-14 bg-emerald-300/80" />
          <div className="w-[2px] h-8 bg-red-400/60" />
        </div>

        <div className="absolute bottom-[30%] left-[10%] flex items-end gap-[4px] opacity-60">
          <div className="w-[2px] h-12 bg-emerald-300/70" />
          <div className="w-[2px] h-7 bg-red-400/60" />
          <div className="w-[2px] h-16 bg-emerald-300/80" />
        </div>
      </div>
      {/* Navbar lives here — once — at the top */}
      <Navbar />
      <div className="relative z-10">
      <Hero />
      {/* <SocialProof /> */}
      <PackagesSection />
      <StarCourseSection />
      <CTASection />
      <Footer />
      </div>
    </div>
  );
}