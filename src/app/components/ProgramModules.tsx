import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Shield,
  Activity,
  Brain,
  LineChart,
  CandlestickChart,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { Eyebrow, FadeUp, H2 } from "../pages/Programs";

const MODULES = [
  {
    id: 1,
    title: "Financial Market Foundation",
    icon: GraduationCap,
    topics: [
      "Introduction to Indian Financial Markets",
      "NSE & BSE Market Structure",
      "Types of Market Participants",
      "Equity, Derivatives & Commodity Markets",
      "Understanding Market Cycles",
      "Trading vs Investing",
    ],
  },
  {
    id: 2,
    title: "Trading Platform & Market Operations",
    icon: Activity,
    topics: [
      "Trading Account Setup & Order Types",
      "Understanding Broker Platforms",
      "Live Market Navigation",
      "Intraday, Swing & Positional Trading",
      "Margin & Leverage Concepts",
      "Market Timings & Settlement Process",
    ],
  },
  {
    id: 3,
    title: "Professional Candlestick Analysis",
    icon: CandlestickChart,
    topics: [
      "Candlestick Formation & Psychology",
      "Single & Multiple Candle Patterns",
      "Reversal & Continuation Signals",
      "Institutional Price Behaviour",
      "High Probability Entry Zones",
    ],
  },
  {
    id: 4,
    title: "Price Action & Market Structure",
    icon: TrendingUp,
    topics: [
      "Support & Resistance Mapping",
      "Trend Identification Techniques",
      "Breakout & Breakdown Strategies",
      "Demand & Supply Zones",
      "Liquidity & Fake Breakout Analysis",
      "Market Structure Shift Concepts",
    ],
  },
  {
    id: 5,
    title: "Advanced Technical Analysis",
    icon: LineChart,
    topics: [
      "Moving Averages & Trend Filters",
      "Indicators",
      "Volume & Volatility Analysis",
      "Multi-Timeframe Analysis",
      "Chart Pattern Mastery",
      "Trend Continuation Strategies",
    ],
  },
  {
    id: 6,
    title: "Intraday Trading Strategies",
    icon: BarChart3,
    topics: [
      "Opening Range Breakout Strategy",
      "Scalping Fundamentals",
      "Momentum Trading Concepts",
      "Risk-Controlled Intraday Execution",
      "Live Market Trade Planning",
    ],
  },
  {
    id: 7,
    title: "Swing Trading & Positional Trading",
    icon: TrendingUp,
    topics: [
      "Swing Trade Selection Process",
      "Delivery Trading Concepts",
      "Positional Trend Analysis",
      "Risk-to-Reward Planning",
      "Portfolio Allocation Basics",
    ],
  },
  {
    id: 8,
    title: "Options Trading Professional Program",
    icon: Briefcase,
    topics: [
      "Introduction to Options Chain",
      "Call & Put Mechanics",
      "Open Interest Analysis",
      "Option Buying Strategies",
      "Time Decay & Volatility Concepts",
      "Safe Risk Management in Options Trading",
    ],
  },
  {
    id: 9,
    title: "Risk Management & Trading Psychology",
    icon: Shield,
    topics: [
      "Capital Preservation Techniques",
      "Position Sizing Models",
      "Risk-Reward Optimization",
      "Emotional Discipline in Trading",
      "Trading Journal Maintenance",
      "Professional Trader Mindset Development",
    ],
  },
  {
    id: 10,
    title: "Real-Time Market Mentorship",
    icon: Brain,
    topics: [
      "Live Market Analysis Sessions",
      "Trade Execution Demonstration",
      "Daily Market Outlook Preparation",
      "Economic News Impact Analysis",
      "Weekly Performance Review",
      "Practical Trading Simulations",
    ],
  },
];

const BONUS = [
  "Investment & Wealth Building",
  "SIP & Long-Term Investing",
  "Fundamental Screening Basics",
  "Retirement & Wealth Planning",
  "Financial Goal Structuring",
];

const TOOLS = [
  "TradingView Professional Setup",
  "Stock Screening Techniques",
];

function ModuleCard({ module }: { module: (typeof MODULES)[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = module.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl border border-purple-500/15 bg-[#0C0420]/70 backdrop-blur-xl"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-400/15 flex items-center justify-center">
            <Icon className="w-5 h-5 text-purple-300" />
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-purple-300/50">
              Module {module.id}
            </p>
            <h3 className="text-[15px] sm:text-[18px] text-white leading-tight">
              {module.title}
            </h3>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-purple-300 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 flex flex-col gap-3">
              {module.topics.map((topic, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-purple-300 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/80 leading-relaxed">
                    {topic}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProgramModules() {
  return (
    <section className="relative py-28 px-5 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-14">

        <FadeUp className="text-left mb-4">
          <Eyebrow>Course Modules</Eyebrow>
          <H2>Professional Course Modules</H2>
        </FadeUp>

          <p className="max-w-2xl text-left text-white/65 leading-relaxed">
            A structured, industry-oriented curriculum designed to build real confidence in trading, investing, and financial markets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 mb-10 items-start">
          {MODULES.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <div className="rounded-3xl border border-purple-500/15 bg-[#0C0420]/70 backdrop-blur-xl p-8">
            <h3 className="text-[18px] text-white mb-5">
              Bonus Professional Modules
            </h3>

            <div className="space-y-3">
              {BONUS.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-purple-300 mt-1" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-purple-500/15 bg-[#0C0420]/70 backdrop-blur-xl p-8">
            <h3 className="text-[18px] text-white mb-5">
              Modern Trading Tools
            </h3>

            <div className="space-y-3">
              {TOOLS.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-purple-300 mt-1" />
                  <span className="text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

