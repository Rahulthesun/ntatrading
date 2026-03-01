'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import {
  TrendingUp, Target, Brain, Users,
  LineChart, BarChart3, Globe,
  ArrowRight, Award, Video, GraduationCap,
} from "lucide-react";

import { Header }              from "../components/Header";
import { Footer }              from "../components/Footer";
import { MarketTicker }        from "../components/MarketTicker";
import { AnimatedCandlestick } from "../components/AnimatedCandlestick";
import { PriceGrid }           from "../components/PriceGrid";

import Loader                  from "../components/Loader";

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL-STACK — replaces the old 3-column services grid
   Cards slide in one-by-one on scroll-down, fully collapse on scroll-up.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Mini sparkline chart ────────────────────────────────────────────────── */
function MiniChart({ color, seed = 1 }) {
  const pts = Array.from({ length: 14 }, (_, i) => ({
    x: (i / 13) * 100,
    y: 48 - (
      Math.sin(i * seed * 1.4 + seed) * 14 +
      Math.cos(i * seed * 0.8) * 8 +
      (i / 13) * 22
    ),
  }));
  const line =
    "M " +
    pts.map((p, i) =>
      i === 0
        ? `${p.x},${p.y}`
        : `C ${pts[i-1].x+4},${pts[i-1].y} ${p.x-4},${p.y} ${p.x},${p.y}`
    ).join(" ");
  const area =
    `M ${pts[0].x},88 L ${pts[0].x},${pts[0].y} ` +
    pts.slice(1).map((p, i) =>
      `C ${pts[i].x+4},${pts[i].y} ${p.x-4},${p.y} ${p.x},${p.y}`
    ).join(" ") +
    ` L ${pts[pts.length-1].x},88 Z`;

  return (
    <svg viewBox="0 0 100 88" preserveAspectRatio="none" width="100%" height="100%">
      <defs>
        <linearGradient id={`cg${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0"   />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#cg${seed})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="2.5" fill={color} />
    </svg>
  );
}

/* ── Services data (4 programs + Certifications) ─────────────────────────── */
const SERVICES = [
  {
    num: "01", Icon: LineChart,
    title: "Education course",       tag: "STOCKS · NSE · BSE",
    description:
      "Master stock market analysis, price action, and institutional order flow. Build a systematic approach to picking winning trades in any market condition.",
    features: ["Technical Analysis", "Fundamental Research", "Position Sizing", "Entry & Exit Strategies"],
    stats: [{ l: "Avg Return", v: "38%" }, { l: "Students", v: "1,800+" }, { l: "Duration", v: "8 Weeks" }],
    color: "#00ff88", seed: 1,
  },
  {
    num: "02", Icon: BarChart3,
    title: "Live Market Trading",      tag: "DERIVATIVES · F&O",
    description:
      "Learn advanced options strategies, Greeks, and volatility-based trading to generate consistent income regardless of market direction.",
    features: ["Options Strategies", "IV Analysis", "Risk Management", "Spreads & Hedging"],
    stats: [{ l: "Avg Return", v: "52%" }, { l: "Students", v: "1,200+" }, { l: "Duration", v: "10 Weeks" }],
    color: "#00d4ff", seed: 2,
  },
  {
    num: "03", Icon: Globe,
    title: "Mentorship and support services",      tag: "GLOBAL MARKETS · FX",
    description:
      "Navigate global markets with currency pairs and futures contracts. Understand macro forces that move trillions of dollars daily.",
    features: ["Macro Analysis", "Leverage Management", "Multi-Timeframe", "Risk Controls"],
    stats: [{ l: "Avg Return", v: "44%" }, { l: "Students", v: "900+" }, { l: "Duration", v: "8 Weeks" }],
    color: "#ffc857", seed: 3,
  },
  {
    num: "04", Icon: Award,
    title: "Certifications",       tag: "INDUSTRY RECOGNISED",
    description:
      "Earn globally recognised trading certifications that validate your skills to employers, prop firms, and institutional desks worldwide.",
    features: ["NSE Certified Courses", "CMT Prep Modules", "Prop Firm Challenges", "Verified Credentials"],
    stats: [{ l: "Pass Rate", v: "93%" }, { l: "Students", v: "600+" }, { l: "Format", v: "Self-Paced" }],
    color: "#bf80ff", seed: 4,
  },
];

/* Scroll constants — tweak to taste */
const CARD_HEIGHT     = 480;   // rendered card height in px
const SCROLL_PER_CARD = 500;   // scroll distance (px) to bring each card fully in
const TOP_BASE        = 80;    // sticky top (px) for the first card
const PEEK            = 20;    // how many px of each buried card peek above the one on top

/* ── Single sticky card ──────────────────────────────────────────────────── */
function StackCard({ p, index, total, containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalScroll = total * SCROLL_PER_CARD;
  const enterStart  = (index * SCROLL_PER_CARD) / totalScroll;
  const enterEnd    = ((index + 1) * SCROLL_PER_CARD) / totalScroll;

  // Slides up from below on scroll-down; reverses completely on scroll-up
  const y = useTransform(
    scrollYProgress,
    [enterStart, enterEnd],
    [CARD_HEIGHT + 40, 0],
    { clamp: true }
  );

  // Cards deeper in the stack compress slightly
  const depth           = total - 1 - index;
  const scaleWhenBuried = 1 - depth * 0.03;
  const scale = useTransform(
    scrollYProgress,
    [enterEnd, 1],
    [1, scaleWhenBuried],
    { clamp: true }
  );

  return (
    <motion.div
      style={{
        position: "sticky",
        top: TOP_BASE + index * PEEK,
        y,
        scale,
        zIndex: index + 1,
        willChange: "transform",
        transformOrigin: "top center",
      }}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          height: CARD_HEIGHT,
          background: "#0b0f1c",
          border: `1px solid ${p.color}22`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.03),
                      0 20px 60px rgba(0,0,0,0.8),
                      0 0 80px ${p.color}0d`,
          display: "grid",
          gridTemplateColumns: "1fr 260px",
        }}
      >
        {/* ── LEFT: content ── */}
        <div className="relative overflow-hidden p-9">
          {/* Ambient glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: -80, left: -80,
              width: 280, height: 280, borderRadius: "50%",
              background: `radial-gradient(circle, ${p.color}16 0%, transparent 70%)`,
            }}
          />

          {/* Card number */}
          <span
            className="absolute top-6 right-6 font-mono text-xs tracking-widest"
            style={{ color: `${p.color}45` }}
          >
            {p.num} / 0{total}
          </span>

          {/* Tag pill */}
          <div
            className="inline-flex items-center gap-1.5 rounded-full text-[10px] font-bold tracking-[0.13em] uppercase mb-5"
            style={{
              padding: "4px 12px",
              background: `${p.color}10`,
              border: `1px solid ${p.color}25`,
              color: p.color,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
            {p.tag}
          </div>

          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${p.color}14`, border: `1px solid ${p.color}28` }}
            >
              <p.Icon className="w-6 h-6" style={{ color: p.color }} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {p.title}
            </h3>
          </div>

          <p className="text-gray-400 leading-relaxed mb-6 text-sm max-w-sm">
            {p.description}
          </p>

          {/* Features grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
            {p.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[8px] font-black"
                  style={{
                    background: `${p.color}1a`,
                    border: `1px solid ${p.color}35`,
                    color: p.color,
                  }}
                >
                  ✓
                </div>
                {f}
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
            style={{ color: p.color }}
          >
            Learn More
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── RIGHT: stats + sparkline ── */}
        <div
          className="flex flex-col justify-between p-6"
          style={{
            borderLeft: `1px solid ${p.color}10`,
            background: `${p.color}04`,
          }}
        >
          {/* Stat pills */}
          <div className="flex flex-col gap-2">
            {p.stats.map(({ l, v }) => (
              <div
                key={l}
                className="flex justify-between items-center rounded-xl px-3 py-2.5"
                style={{ background: `${p.color}08`, border: `1px solid ${p.color}14` }}
              >
                <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                  {l}
                </span>
                <span className="text-sm font-bold" style={{ color: p.color }}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Sparkline */}
          <div>
            <p className="text-[9px] text-gray-600 uppercase tracking-widest font-semibold mb-2">
              Performance Track
            </p>
            <div
              className="h-20 rounded-xl overflow-hidden"
              style={{ background: `${p.color}06`, border: `1px solid ${p.color}12` }}
            >
              <MiniChart color={p.color} seed={p.seed} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Services section wrapper ────────────────────────────────────────────── */
function ServicesStack() {
  const containerRef = useRef(null);
  const total        = SERVICES.length;

  return (
    <section className="bg-[#0f1421]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-[#00d4ff]">Services</span>
          </h2>
          <p className="text-gray-400 text-lg mb-4">
            Specialized tracks for different market instruments
          </p>
          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="inline-flex flex-col items-center gap-1.5 text-gray-600 text-[10px] tracking-widest uppercase mt-2"
          >
            <div className="w-px h-5 bg-gradient-to-b from-transparent to-gray-600" />
            Scroll to explore
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll container — height = scroll travel for all 4 cards */}
      <div
        ref={containerRef}
        className="px-6"
        style={{
          position: "relative",
          height: `${total * SCROLL_PER_CARD}px`,
        }}
      >
        {SERVICES.map((p, i) => (
          <StackCard
            key={p.title}
            p={p}
            index={i}
            total={total}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* Space after last stacked card */}
      <div className="h-32" />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOME
   ═══════════════════════════════════════════════════════════════════════════ */
export function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 7500);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <PriceGrid />
          <AnimatedCandlestick />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/60 via-[#0a0e1a]/80 to-[#0a0e1a] z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 bg-[#8100D1]/10 border border-[#B500B2]/30 rounded-full mb-6">
              <span className="text-[#FF52A0] text-sm font-medium">Professional Trading Education</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Namma Trading
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8100D1] to-[#B500B2]">
                Academy
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              United in Learning, United in Growth
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/programs"
                className="px-8 py-4 bg-[#8100D1] text-[#FF52A0] font-semibold rounded-lg hover:bg-[#B500B2] transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#00ff88]/20"
              >
                Explore Programs
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300">
                Book Free Demo
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e1a] to-transparent z-10" />
      </section>

      {/* ── Market Ticker ────────────────────────────────────────────────── */}
      <MarketTicker />

      {/* ── Why Us ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="text-[#00ff88]">Us</span>
            </h2>
            <p className="text-gray-400 text-lg">Built on real market experience, not promises</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, title: "Real Market Training",     description: "Trade live markets with real-time analysis and decision-making frameworks",              color: "#00ff88" },
              { icon: Target,     title: "Structured Learning Path",  description: "Systematic progression from fundamentals to advanced strategies",                       color: "#00d4ff" },
              { icon: Brain,      title: "Risk & Psychology Focus",   description: "Master the mental game and risk management that separates professionals",                color: "#ffc857" },
              { icon: Users,      title: "Mentorship-Driven",         description: "Personal guidance from experienced traders who have been in the trenches",               color: "#00ff88" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-[#0f1421] border border-gray-800 rounded-xl p-6 hover:border-[#00ff88]/50 transition-all duration-300 h-full">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.color + "20" }}
                  >
                    <item.icon className="w-6 h-6" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services — scroll stack ───────────────────────────────────────── */}
      <ServicesStack />

      {/* ── Methodology ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="text-[#ffc857]">Methodology</span>
            </h2>
            <p className="text-gray-400 text-lg">A systematic approach to trading mastery</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Learn",    description: "Comprehensive curriculum covering theory, tools, and market structure",   color: "#00ff88" },
              { step: "02", title: "Practice", description: "Simulated trading environment with real market data and scenarios",        color: "#00d4ff" },
              { step: "03", title: "Analyze",  description: "Review your trades, identify patterns, and refine your edge",             color: "#ffc857" },
              { step: "04", title: "Execute",  description: "Graduate to live markets with proper risk management and discipline",      color: "#00ff88" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-[#0f1421] border border-gray-800 rounded-xl p-6 hover:border-[#00ff88]/50 transition-all duration-300">
                  <div className="text-5xl font-bold mb-4 opacity-20" style={{ color: item.color }}>
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-gray-700 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust & Credibility ───────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#0f1421]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built on <span className="text-[#00ff88]">Experience</span>
            </h2>
            <p className="text-gray-400 text-lg">Numbers that matter, results that speak</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award,         value: "15+",    label: "Years of Experience",  description: "Trading and teaching across multiple market cycles",                    color: "#00ff88" },
              { icon: Video,         value: "500+",   label: "Live Market Sessions", description: "Real-time trading analysis and decision-making",                         color: "#00d4ff" },
              { icon: GraduationCap, value: "2,000+", label: "Students Trained",     description: "Professionals equipped with institutional-grade skills",                 color: "#ffc857" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0a0e1a] border border-gray-800 rounded-xl p-8 text-center hover:border-[#00ff88]/50 transition-all duration-300"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: item.color + "20" }}
                >
                  <item.icon className="w-8 h-8" style={{ color: item.color }} />
                </div>
                <div className="text-5xl font-bold mb-2" style={{ color: item.color }}>
                  {item.value}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#00ff88]/10 to-[#00d4ff]/10 border border-[#00ff88]/30 rounded-2xl p-12 text-center"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Book a free demo session and see how our systematic approach can transform your trading
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-[#00ff88] text-[#0a0e1a] font-semibold rounded-lg hover:bg-[#00d4ff] transition-all duration-300 shadow-lg shadow-[#00ff88]/20">
                Book Free Demo
              </button>
              <Link
                to="/programs"
                className="px-8 py-4 border border-gray-700 text-white font-semibold rounded-lg hover:border-[#00ff88] hover:text-[#00ff88] transition-all duration-300"
              >
                View All Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}