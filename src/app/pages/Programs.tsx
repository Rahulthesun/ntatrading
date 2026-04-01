import { useRef , useState } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import {
  LineChart, BarChart3, Globe, CheckCircle2,
  Clock, Users, Video, BookOpen, FileText,
  TrendingUp, ArrowRight, ArrowLeft, Zap, ShieldCheck,
  ChevronDown
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero"

/* ══════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
══════════════════════════════════════════════════════════════ */
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <div className="h-px w-6 bg-purple-500/40" />
      <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-300/75">{children}</span>
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 ${className}`}
      style={{ fontSize: "clamp(28px,3.6vw,48px)" }}>
      {children}
    </h2>
  );
}

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-serif italic text-transparent bg-clip-text"
      style={{ backgroundImage: "linear-gradient(135deg,#d8b4fe 0%,#a855f7 55%,#c084fc 100%)" }}>
      {children}
    </span>
  );
}

function Rule() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent" />;
}

/* ══════════════════════════════════════════════════════════════
   PROGRAM DATA
══════════════════════════════════════════════════════════════ */
const PROGRAMS = [
  {
    id: "equity",
    Icon: LineChart,
    title: "Equity Trading",
    subtitle: "Master Stock Market Analysis",
    desc: "Comprehensive training in equity markets — from price action and chart patterns to institutional order flow. Learn to identify high-probability setups and manage positions like a professional.",
    accent: "from-violet-500/20 to-purple-400/5",
    border: "border-violet-500/20",
    dot: "bg-violet-400",
    tag: "Most Popular",
    tagColor: "bg-violet-400/12 text-violet-300 border-violet-400/22",
    duration: "12 Weeks",
    sessions: "36 Live Sessions",
    seats: "Max 15 Students",
    curriculum: [
      "Market Structure & Institutional Flow",
      "Technical Analysis & Chart Patterns",
      "Volume Profile & Order Flow",
      "Support & Resistance Dynamics",
      "Momentum & Trend Analysis",
      "Position Sizing & Risk Management",
      "Entry & Exit Strategies",
      "Trade Psychology & Discipline",
    ],
    includes: [
      "Live Trading Room Access",
      "Recorded Session Library",
      "Trading Workbook & Templates",
      "1-on-1 Mentorship Sessions",
      "Private Community Access",
      "Lifetime Material Updates",
    ],
  },
  {
    id: "options",
    Icon: BarChart3,
    title: "Options Trading",
    subtitle: "Advanced Derivatives Strategies",
    desc: "Deep dive into options trading, Greeks, volatility analysis and professional strategies used by market makers. Build systematic edge in the derivatives market.",
    accent: "from-purple-500/18 to-fuchsia-400/5",
    border: "border-purple-500/18",
    dot: "bg-purple-400",
    tag: "Advanced",
    tagColor: "bg-rose-400/10 text-rose-400 border-rose-400/20",
    duration: "16 Weeks",
    sessions: "48 Live Sessions",
    seats: "Max 12 Students",
    curriculum: [
      "Options Fundamentals & Greeks",
      "Implied Volatility Analysis",
      "Directional Strategies (Calls & Puts)",
      "Spread Strategies (Verticals, Butterflies)",
      "Income Strategies (Iron Condors, Credit Spreads)",
      "Volatility Trading (Straddles & Strangles)",
      "Risk Management & Position Hedging",
      "Options Chain Analysis",
    ],
    includes: [
      "Live Trading Room Access",
      "Options Scanner Tools",
      "Strategy Backtesting Templates",
      "Weekly Strategy Sessions",
      "Private Community Access",
      "Lifetime Material Updates",
    ],
  },
  {
    id: "commodities",
    Icon: Globe,
    title: "Commodity & Futures",
    subtitle: "MCX, Forex & Global Markets",
    desc: "Navigate Gold, Silver, Crude Oil and currency pairs with institutional-grade analysis. Learn leverage management, macro-economic drivers and multi-asset correlation.",
    accent: "from-fuchsia-500/15 to-purple-400/5",
    border: "border-fuchsia-500/16",
    dot: "bg-fuchsia-400",
    tag: "Intermediate",
    tagColor: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    duration: "14 Weeks",
    sessions: "42 Live Sessions",
    seats: "Max 15 Students",
    curriculum: [
      "Forex Market Structure & Sessions",
      "Currency Pair Dynamics",
      "Multi-Timeframe Analysis",
      "Futures Contracts & Specifications",
      "Macro-Economic Analysis",
      "Leverage & Margin Management",
      "Risk-Reward Optimisation",
      "Correlation & Portfolio Management",
    ],
    includes: [
      "Live Trading Room Access",
      "Economic Calendar Tools",
      "Multi-Asset Analysis Framework",
      "Risk Calculator Templates",
      "Private Community Access",
      "Lifetime Material Updates",
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   MINI ANIMATED SPARKLINE (SVG, no lib needed)
══════════════════════════════════════════════════════════════ */
const SPARKS: Record<string, number[]> = {
  equity:    [40,46,43,52,48,57,53,62,58,68,64,72,70,78,75,82],
  options:   [50,55,51,60,57,65,61,70,66,75,71,79,76,83,80,87],
  commodity: [35,42,38,47,44,52,49,57,53,61,58,65,62,69,66,73],
};

function MiniSpark({ id }: { id: string }) {
  const data = SPARKS[id] ?? SPARKS.equity;
  const W = 280, H = 56, pad = 3;
  const mn = Math.min(...data) - 3, mx = Math.max(...data) + 3;
  const sy = (v: number) => H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2);
  const st = (W - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => `${pad + i * st},${sy(v)}`).join(" ");
  const area = `${pad},${H} ${pts} ${pad + (data.length - 1) * st},${H}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible w-full opacity-70">
      <defs>
        <linearGradient id={`sg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#sg-${id})`}/>
      <polyline points={pts} fill="none" stroke="#a855f7" strokeWidth="1.4"/>
      <circle cx={pad + (data.length - 1) * st} cy={sy(data[data.length - 1])}
        r="3" fill="#d8b4fe"/>
    </svg>
  );
}



/* ══════════════════════════════════════════════════════════════
   2 · PROGRAM CARDS
══════════════════════════════════════════════════════════════ */
function ProgramCard({ program, index }: { program: typeof PROGRAMS[0]; index: number }) {
  const { Icon } = program;
  const [open, setOpen] = useState(false);

  return (
    <FadeUp delay={index * 0.1}>
      <div id={program.id} className={`relative bg-[#0C0420]/65 border ${program.border} backdrop-blur-xl rounded-3xl overflow-hidden hover:border-purple-400/28 transition-all duration-400`}>

        {/* shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />

        {/* blob */}
        <div className={`absolute -top-12 -right-12 w-56 h-56 rounded-full bg-gradient-to-br ${program.accent} blur-3xl pointer-events-none`} />

        {/* 🔥 MOBILE HEADER */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden w-full text-left p-5 flex flex-col gap-4"
        >
          {/* top row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/[0.10] border border-purple-400/[0.12] flex items-center justify-center">
                <Icon className="w-4 h-4 text-purple-400" />
              </div>

              <span className={`text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-1 rounded-full border ${program.tagColor}`}>
                {program.tag}
              </span>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-purple-400 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* title */}
          <div>
            <p className="font-serif text-[18px] text-purple-50 leading-tight">
              {program.title}
            </p>
            <p className="text-[10px] text-purple-300/50 uppercase tracking-[0.1em]">
              {program.subtitle}
            </p>
          </div>

          {/* preview desc */}
          <p className="text-[13px] text-white/80 leading-[1.6] line-clamp-2">
            {program.desc}
          </p>

          {/* mini stats */}
          <div className="flex items-center gap-4 text-[11px] text-purple-200/70">
            <span>{program.duration}</span>
            <span>•</span>
            <span>{program.sessions}</span>
          </div>
        </button>

        {/* GRID */}
        <div className={`
          relative grid lg:grid-cols-3 gap-0
          divide-y lg:divide-y-0 lg:divide-x divide-purple-500/[0.08]
          ${open ? "block" : "hidden"} lg:grid
        `}>

          {/* COL 1 */}
          <div className="p-5 sm:p-6 lg:p-10 flex flex-col">

            <div className="hidden lg:flex items-start justify-between mb-7">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/[0.10] border border-purple-400/[0.12] flex items-center justify-center">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>
              <span className={`text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border ${program.tagColor}`}>
                {program.tag}
              </span>
            </div>

            <h3 className="hidden lg:block font-serif text-[26px] text-purple-50 leading-tight mb-1">
              {program.title}
            </h3>

            <p className="hidden lg:block text-[11px] tracking-[0.10em] uppercase text-purple-200/90 mb-5">
              {program.subtitle}
            </p>

            {/* improved readability */}
            <p className="text-[14px] text-white/85 leading-[1.85] mb-6 flex-1">
              {program.desc}
            </p>

            {/* stats */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { Icon: Clock, v: program.duration },
                { Icon: Video, v: program.sessions },
                { Icon: Users, v: program.seats },
              ].map(({ Icon: I, v }) => (
                <div key={v} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/[0.08] border border-purple-400/[0.10] flex items-center justify-center shrink-0">
                    <I className="w-3.5 h-3.5 text-purple-400/70" />
                  </div>
                  <span className="text-[12.5px] text-white/82">{v}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#080218]/60 border border-purple-500/[0.07] rounded-xl p-3">
              <p className="text-[8.5px] uppercase text-purple-300/55 mb-2">
                Performance trend
              </p>
              <MiniSpark id={program.id} />
            </div>
          </div>

          {/* COL 2 */}
          <div className="p-5 sm:p-6 lg:p-10">
            <div className="flex items-center gap-2.5 mb-6">
              <BookOpen className="w-4 h-4 text-purple-400/70" />
              <span className="text-[11px] uppercase text-purple-400/55">Curriculum</span>
            </div>

            <div className="flex flex-col gap-3">
              {program.curriculum.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-300/75 mt-0.5" />
                  <span className="text-[13px] text-white/82 leading-[1.55]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COL 3 */}
          <div className="p-5 sm:p-6 lg:p-10 flex flex-col">

            <div className="flex items-center gap-2.5 mb-6">
              <FileText className="w-4 h-4 text-purple-400/70" />
              <span className="text-[11px] uppercase text-purple-400/55">What's Included</span>
            </div>

            <div className="flex flex-col gap-3 mb-auto">
              {program.includes.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${program.dot} mt-[5px]`} />
                  <span className="text-[13px] text-white/82 leading-[1.55]">{item}</span>
                </div>
              ))}
            </div>

            {/* ✅ ONLY CTA */}
            <div className="mt-8">
              <Link to="/articles#contact">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-violet-700 to-purple-500 text-white text-[13px] font-semibold flex items-center justify-center gap-2"
                >
                  Enroll Now <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </FadeUp>
  );
}

function ProgramCards() {
  return (
    <section className="relative z-[5] py-4 sm:py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {PROGRAMS.map((p, i) => <ProgramCard key={p.id} program={p} index={i} />)}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   3 · WHY NTA
══════════════════════════════════════════════════════════════ */
const WHY = [
  { Icon: TrendingUp,   title: "Live Market Only",       desc: "Every session happens during real market hours with real positions open. No hypotheticals." },
  { Icon: Users,        title: "Small Batch Sizes",      desc: "Limited students per batch so mentors can correct your specific calls as they happen." },
  { Icon: BookOpen,     title: "Structured Curriculum",  desc: "Progressive path from fundamentals to institutional strategies — nothing out of order." },
  { Icon: Video,        title: "Lifetime Access",        desc: "All recordings, materials and future updates included. One fee, no recurring charges." },
  { Icon: ShieldCheck,  title: "Honest Timelines",       desc: "We tell you it takes 3–6 months to get consistent. No overnight-riches promises here." },
  { Icon: Zap,          title: "Post-Program Support",   desc: "Lifetime community access and quarterly strategy sessions after you complete the program." },
];

function WhyNTA() {
  return (
    <section className="relative z-[5] py-28 px-6">
      <Rule />
      <div className="max-w-6xl mx-auto py-28">
        <FadeUp className="text-center mb-16">
          <Eyebrow>Why NTA</Eyebrow>
          <H2>What makes our programs <Italic>different.</Italic></H2>
        </FadeUp>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY.map(({ Icon: I, title, desc }, i) => (
            <FadeUp key={title} delay={i * 0.07}>
              <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full bg-[#0C0420]/55 border border-purple-500/[0.08] backdrop-blur-xl rounded-2xl p-6 cursor-default hover:border-purple-400/20 transition-colors duration-300">
                <div className="w-10 h-10 rounded-xl bg-purple-500/[0.09] border border-purple-400/[0.10] flex items-center justify-center mb-4 group-hover:bg-purple-500/[0.15] transition-colors duration-300">
                  <I className="text-purple-400" size={17} />
                </div>
                <p className="font-serif text-[17px] text-purple-50 mb-2">{title}</p>
                <p className="font-sans text-[12.5px] font-normal text-white/75 leading-[1.72]">{desc}</p>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
      <Rule />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4 · BOTTOM CTA
══════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section className="relative z-[5] py-10 px-6">
      <div className="relative max-w-3xl mx-auto text-center py-28">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[260px] pointer-events-none [background:radial-gradient(ellipse_at_center,rgba(139,92,246,0.09)_0%,transparent_70%)]" />
        <FadeUp>
          <Eyebrow>Not Sure Where to Start</Eyebrow>
          <H2 className="mb-5">
            Let's find the right<br /><Italic>program for you.</Italic>
          </H2>
          <p className="font-sans text-[14px] font-normal text-white/75 max-w-[400px] mx-auto leading-[1.8] mb-10">
            Book a free 20-minute consultation call — we'll understand your goals
            and recommend exactly what fits your level and schedule.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/articles#contact">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden bg-gradient-to-r from-violet-700 to-purple-500 text-white font-sans text-[13px] font-semibold tracking-[0.04em] px-8 py-3.5 rounded-full border-0 cursor-pointer shadow-[0_4px_24px_rgba(139,92,246,0.38)] hover:shadow-[0_6px_32px_rgba(139,92,246,0.52)] transition-shadow duration-300 flex items-center gap-2">
                  <span className="absolute inset-x-0 top-0 h-px bg-white/18" />
                  <span className="relative">Schedule Free Consultation</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </motion.button>
            </Link>
            
            <a href="/about#top">
              <button className="font-sans text-[13px] font-normal tracking-[0.04em] text-white/75 px-8 py-3.5 rounded-full border border-purple-400/[0.14] hover:border-purple-400/30 hover:text-purple-100/75 transition-all duration-200 bg-transparent cursor-pointer">
                Learn About Us
              </button>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export function Programs() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <div className="relative bg-gradient-to-br
        from-[#1d4ed8]
        via-[#0f172a]
        to-[#000000]
        text-white overflow-x-hidden font-sans min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0" />

        <Navbar />
        <Hero 
        headline="Choose your path to
market mastery."
        hasMarketTicker={false}
        />
        <ProgramCards />
        <WhyNTA />
        <BottomCTA />
        <Footer />

        <div className="relative z-[5] text-center py-8 border-t border-purple-500/[0.06] font-sans text-[10px] tracking-[0.08em] text-purple-400/18">
          © 2026 NTA Trading Academy · Chennai, Tamil Nadu
        </div>
      </div>
    </>
  );
}