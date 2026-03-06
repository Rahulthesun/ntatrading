import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { TrendingUp, Quote, Star, Users, BookOpen, Zap, Target } from "lucide-react";

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
interface TradeResult {
  name: string;
  initials: string;
  stock: string;
  entry: number;
  exit: number;
  pnl: string;
  pnlRaw: number;
  type: "LONG" | "SHORT";
  time: string;
  avatarColor: string;
}

interface Testimonial {
  name: string;
  initials: string;
  location: string;
  role: string;
  text: string;
  rating: number;
  avatarColor: string;
  badge?: string;
}

interface MetricProps {
  value: string;
  label: string;
  sub?: string;
  color: string;
  icon: React.ReactNode;
}

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const TRADE_RESULTS: TradeResult[] = [
  { name: "Rajesh K.",   initials: "RK", stock: "RELIANCE",   entry: 2841, exit: 2973, pnl: "+4.6%",  pnlRaw: 1,  type: "LONG",  time: "2h ago",  avatarColor: "#8100D1" },
  { name: "Priya M.",    initials: "PM", stock: "BANKNIFTY",  entry: 51200, exit: 52480, pnl: "+2.5%", pnlRaw: 1,  type: "LONG",  time: "4h ago",  avatarColor: "#00d4ff" },
  { name: "Arjun S.",    initials: "AS", stock: "TCS",        entry: 3920, exit: 3820,  pnl: "-2.6%",  pnlRaw: -1, type: "SHORT", time: "5h ago",  avatarColor: "#ffc857" },
  { name: "Divya R.",    initials: "DR", stock: "NIFTY CE",   entry: 340,  exit: 490,   pnl: "+44.1%", pnlRaw: 1,  type: "LONG",  time: "6h ago",  avatarColor: "#00ff88" },
  { name: "Karthik N.",  initials: "KN", stock: "HDFC BANK",  entry: 1610, exit: 1658,  pnl: "+3.0%",  pnlRaw: 1,  type: "LONG",  time: "7h ago",  avatarColor: "#bf80ff" },
  { name: "Sneha T.",    initials: "ST", stock: "INFY",       entry: 1490, exit: 1541,  pnl: "+3.4%",  pnlRaw: 1,  type: "LONG",  time: "1d ago",  avatarColor: "#ff9f43" },
  { name: "Ananya C.",   initials: "AC", stock: "TATAMOTORS", entry: 945,  exit: 998,   pnl: "+5.6%",  pnlRaw: 1,  type: "LONG",  time: "2d ago",  avatarColor: "#8100D1" },
  { name: "Suresh M.",   initials: "SM", stock: "BAJFINANCE", entry: 6820, exit: 6755,  pnl: "-1.0%",  pnlRaw: -1, type: "SHORT", time: "2d ago",  avatarColor: "#ffc857" },
  { name: "Lakshmi V.",  initials: "LV", stock: "WIPRO",      entry: 458,  exit: 487,   pnl: "+6.3%",  pnlRaw: 1,  type: "LONG",  time: "3d ago",  avatarColor: "#00ff88" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rahul Sharma", initials: "RS", location: "Bangalore", role: "Software Engineer → Full-time Trader",
    text: "I tried 3 other courses before NTA. None of them showed me live trades. Here, my mentor traded ₹2L in front of me on day 1. That changed everything.",
    rating: 5, avatarColor: "#8100D1", badge: "F&O Specialist",
  },
  {
    name: "Meera Pillai", initials: "MP", location: "Chennai", role: "Homemaker",
    text: "Started with zero knowledge. Within 2 months I made my first profitable week — ₹18,000 in 5 days. The community support at midnight when I was panicking about a position was unreal.",
    rating: 5, avatarColor: "#00d4ff", badge: "Equity Trader",
  },
  {
    name: "Aditya Nair", initials: "AN", location: "Hyderabad", role: "CA Student",
    text: "The risk management module alone is worth 10x the fee. I used to blow up accounts. Now I've been consistently profitable for 6 weeks straight.",
    rating: 5, avatarColor: "#00ff88",
  },
  {
    name: "Deepa Krishnan", initials: "DK", location: "Coimbatore", role: "Business Owner",
    text: "NTA is the only place I've seen mentors share their actual P&L screenshots. No fake promises. They said it takes 3-6 months to be consistent — they were right, and I respect that honesty.",
    rating: 5, avatarColor: "#ffc857", badge: "Options Writer",
  },
  {
    name: "Siddharth Menon", initials: "SM", location: "Kochi", role: "IT Professional",
    text: "The live market sessions are intense in the best way. You're watching a real ₹5L position being managed in real-time. You learn more in one session than a week of videos.",
    rating: 5, avatarColor: "#bf80ff",
  },
  {
    name: "Kavitha Rajan", initials: "KR", location: "Madurai", role: "Teacher",
    text: "I was skeptical because I'm not a finance person. But the way NTA breaks down concepts — no jargon, just logic and charts — I finally get it after 2 years of trying.",
    rating: 4, avatarColor: "#ff9f43", badge: "Swing Trader",
  },
];

/* ══════════════════════════════════════
   LIVE TRADE FEED CARD
══════════════════════════════════════ */
function TradeFeedCard({ trade, delay = 0 }: { trade: TradeResult; delay?: number }) {
  const isProfit = trade.pnlRaw > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 hover:border-white/10 cursor-default"
      style={{ background: "rgba(17,24,39,0.6)", borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
        style={{ background: `linear-gradient(135deg, ${trade.avatarColor}cc, ${trade.avatarColor}55)` }}>
        {trade.initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-semibold truncate">{trade.name}</span>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${trade.type === "LONG" ? "bg-emerald-400/10 text-emerald-400" : "bg-rose-400/10 text-rose-400"}`}>
            {trade.type}
          </span>
        </div>
        <div className="text-gray-500 text-xs font-mono mt-0.5">{trade.stock} · {trade.entry} → {trade.exit}</div>
      </div>
      <div className={`text-sm font-black font-mono shrink-0 ${isProfit ? "text-emerald-400" : "text-rose-400"}`}>
        {trade.pnl}
      </div>
      <div className="text-gray-600 text-[10px] shrink-0 w-10 text-right">{trade.time}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   METRIC CARD
══════════════════════════════════════ */
function MetricCard({ value, label, sub, color, icon }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-2xl p-6 border overflow-hidden group"
      style={{ background: "rgba(17,24,39,0.7)", borderColor: `${color}20` }}
    >
      {/* glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
        style={{ background: color }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15` }}>
            <div style={{ color }}>{icon}</div>
          </div>
          {/* mini pulse bar */}
          <div className="flex items-end gap-0.5 h-5">
            {[3, 5, 4, 7, 5, 8, 6].map((h, i) => (
              <motion.div key={i} className="w-1 rounded-sm" style={{ height: `${h * 2.5}px`, background: `${color}40` }}
                animate={{ height: [`${h * 2.5}px`, `${(h + Math.random() * 3) * 2.5}px`, `${h * 2.5}px`] }}
                transition={{ duration: 1.5 + i * 0.2, repeat: Infinity, ease: "easeInOut" }} />
            ))}
          </div>
        </div>
        <div className="text-3xl font-black tracking-tight mb-1" style={{ color }}>{value}</div>
        <div className="text-white text-sm font-semibold mb-0.5">{label}</div>
        {sub && <div className="text-gray-500 text-xs">{sub}</div>}
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   TESTIMONIAL CARD
══════════════════════════════════════ */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="relative p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-white/10 transition-all duration-300"
      style={{ background: "rgba(17,24,39,0.6)" }}
    >
      {/* quote icon */}
      <Quote className="w-6 h-6 text-white/8 absolute top-5 right-5" />

      {/* stars */}
      <div className="flex gap-1">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-current text-yellow-400" />
        ))}
        {[...Array(5 - t.rating)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-gray-700" />
        ))}
      </div>

      {/* text */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1">"{t.text}"</p>

      {/* author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.avatarColor}cc, ${t.avatarColor}55)` }}>
          {t.initials}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm font-semibold">{t.name}</span>
            {t.badge && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                {t.badge}
              </span>
            )}
          </div>
          <div className="text-gray-600 text-xs">{t.role} · {t.location}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export function SocialProof() {
  const [activeTab, setActiveTab] = useState<"results" | "reviews">("results");

  return (
    <section className="py-24 px-6 bg-[#0B0B12] relative overflow-hidden">

      {/* subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(129,0,209,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-purple-400 mb-3">— Social Proof</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-bold tracking-tight leading-tight text-white" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
              Real Students. <span className="text-purple-400">Real Progress.</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              We're a growing community — here's what our students have to say.
            </p>
          </div>
        </motion.div>

        {/* ── Metrics row ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          <MetricCard
            value="500+"
            label="Active Members"
            sub="Growing every week"
            color="#00ff88"
            icon={<Users className="w-4 h-4" />}
          />
          <MetricCard
            value="60+"
            label="Live Sessions"
            sub="Since launch"
            color="#00d4ff"
            icon={<TrendingUp className="w-4 h-4" />}
          />
          <MetricCard
            value="4.9★"
            label="Avg Rating"
            sub="From 500+ reviews"
            color="#ffc857"
            icon={<Star className="w-4 h-4" />}
          />
          <MetricCard
            value="93%"
            label="Cert Pass Rate"
            sub="First attempt"
            color="#bf80ff"
            icon={<Target className="w-4 h-4" />}
          />
        </div>

        {/* ── Tab toggle ── */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit mb-8 border border-white/5">
          {(["results", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-colors duration-200"
              style={{ color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)" }}
            >
              {activeTab === tab && (
                <motion.div layoutId="tabBg" className="absolute inset-0 rounded-lg"
                  style={{ background: "linear-gradient(135deg, #8100D1, #5500b5)" }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }} />
              )}
              <span className="relative z-10">
                {tab === "results" ? "🏆 Trade Results" : "💬 Student Reviews"}
              </span>
            </button>
          ))}
        </div>

        {/* ── Content panels ── */}
        <AnimatePresence mode="wait">

          {/* RESULTS TAB */}
          {activeTab === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left: live feed */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Recent Student Trades</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {TRADE_RESULTS.map((trade, i) => (
                      <TradeFeedCard key={i} trade={trade} delay={i * 0.05} />
                    ))}
                  </div>
                </div>

                {/* Right: summary panel */}
                <div className="flex flex-col gap-4">

                  {/* What students learn card */}
                  <div className="rounded-2xl p-6 border border-purple-400/15 relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, rgba(129,0,209,0.07) 0%, rgba(17,24,39,0.9) 100%)" }}>
                    <div className="absolute top-0 left-0 right-0 h-px"
                      style={{ background: "linear-gradient(90deg, transparent, #8100D1, transparent)" }} />
                    <div className="text-xs font-bold tracking-widest uppercase text-purple-400/80 mb-4">What our students learn</div>
                    <div className="flex flex-col gap-3">
                      {[
                        { label: "Reading price action",   pct: 92 },
                        { label: "Managing risk per trade", pct: 88 },
                        { label: "Trade journaling habit",  pct: 79 },
                        { label: "Sticking to a plan",      pct: 74 },
                      ].map(({ label, pct }) => (
                        <div key={label}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-gray-400">{label}</span>
                            <span className="text-gray-500">{pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${pct}%` }}
                              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
                              viewport={{ once: true }}
                              className="h-full rounded-full"
                              style={{ background: "linear-gradient(90deg, #8100D1, #bf80ff)" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-600 text-[11px] mt-4">% of students who reported improvement after 8 weeks</p>
                  </div>

                  {/* Disclaimer */}
                  <div className="rounded-xl p-4 border border-white/5 bg-white/3">
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      Trade logs shown are from community members for educational illustration only. Trading involves risk — results vary. Past trades ≠ future outcomes.
                    </p>
                  </div>

                  {/* CTA */}
                  <button
                    className="w-full py-3.5 rounded-xl font-bold text-sm text-white tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                    style={{ background: "linear-gradient(135deg, #8100D1, #5500b5)", boxShadow: "0 4px 24px rgba(129,0,209,0.35)" }}
                  >
                    Join the Community →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* overall rating strip */}
              <div className="flex items-center gap-6 p-5 rounded-2xl border border-white/5 bg-white/3 mb-8">
                <div className="text-center shrink-0">
                  <div className="text-5xl font-black text-white">4.9</div>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current text-yellow-400" />)}
                  </div>
                  <div className="text-gray-600 text-xs mt-1">avg rating</div>
                </div>
                <div className="w-px h-12 bg-white/8 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  {[
                    { stars: 5, pct: 85 },
                    { stars: 4, pct: 12 },
                    { stars: 3, pct: 3  },
                  ].map(({ stars, pct }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs w-4 text-right">{stars}</span>
                      <Star className="w-3 h-3 fill-current text-yellow-400 shrink-0" />
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                          viewport={{ once: true }}
                          className="h-full rounded-full bg-yellow-400"
                        />
                      </div>
                      <span className="text-gray-500 text-xs w-8">{pct}%</span>
                    </div>
                  ))}
                </div>
                <div className="w-px h-12 bg-white/8 shrink-0 hidden sm:block" />
                <div className="hidden sm:block text-center shrink-0">
                  <div className="text-2xl font-black text-white">500+</div>
                  <div className="text-gray-500 text-xs mt-0.5">reviews</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {TESTIMONIALS.map((t, i) => (
                  <TestimonialCard key={i} t={t} index={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}