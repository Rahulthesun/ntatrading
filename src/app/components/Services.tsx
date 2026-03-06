import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Radio, Users, Award, ChevronRight, Check, ArrowUpRight, Clock, Zap, Shield, Star } from "lucide-react";
import { Link } from "react-router";

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
interface Feature { text: string; highlight?: boolean; }
interface Service {
  id: string;
  num: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  color: string;
  secondaryColor: string;
  description: string;
  features: Feature[];
  badge: string;
  badgeIcon: React.ReactNode;
  cta: string;
  href: string;
}

/* ══════════════════════════════════════
   MINI SPARKLINE SVG
══════════════════════════════════════ */
function MiniChart({ color, seed }: { color: string; seed: number }) {
  const pts = Array.from({ length: 12 }, (_, i) => ({
    x: (i / 11) * 100,
    y: 60 - (Math.sin(i * seed * 0.9 + seed) * 18 + Math.cos(i * seed * 0.5) * 10 + (i / 11) * 15),
  }));
  const d = pts.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `C ${pts[i-1].x+4},${pts[i-1].y} ${p.x-4},${p.y} ${p.x},${p.y}`).join(" ");
  const area = `M ${pts[0].x},90 L ${pts[0].x},${pts[0].y} ` +
    pts.slice(1).map((p, i) => `C ${pts[i].x+4},${pts[i].y} ${p.x-4},${p.y} ${p.x},${p.y}`).join(" ") +
    ` L ${pts[pts.length-1].x},90 Z`;
  return (
    <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cg${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#cg${seed})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="3" fill={color} />
    </svg>
  );
}

/* ══════════════════════════════════════
   SERVICES DATA
══════════════════════════════════════ */
const SERVICES: Service[] = [
  {
    id: "education",
    num: "01",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Education Course",
    subtitle: "From zero to consistent",
    tag: "FOUNDATIONS",
    tagColor: "#00ff88",
    color: "#00ff88",
    secondaryColor: "#00d4ff",
    description: "A structured, end-to-end curriculum built for the Indian market. We don't teach theory from textbooks — we teach what actually works on NSE and BSE today.",
    features: [
      { text: "Technical Analysis — candlesticks to advanced price action", highlight: true },
      { text: "Market microstructure & order flow reading" },
      { text: "Sector rotation & index correlation" },
      { text: "Risk management & position sizing frameworks", highlight: true },
      { text: "Live chart reading workshops every week" },
      { text: "Recorded sessions — rewatch anytime" },
    ],
    badge: "Most Popular",
    badgeIcon: <Star className="w-3 h-3" />,
    cta: "Start Learning",
    href: "/programs/education",
  },
  {
    id: "live",
    num: "02",
    icon: <Radio className="w-5 h-5" />,
    title: "Live Market Sessions",
    subtitle: "Trade alongside real mentors",
    tag: "LIVE",
    tagColor: "#ff4466",
    color: "#00d4ff",
    secondaryColor: "#8100D1",
    description: "Watch real ₹ positions being opened, managed, and closed in live market hours. No simulations. No hindsight trades.",
    features: [
      { text: "Daily pre-market briefing at 9:00 AM IST", highlight: true },
      { text: "Live trade execution with full commentary" },
      { text: "Real-time chart markup & entry/exit logic", highlight: true },
      { text: "Post-market debrief & trade review" },
      { text: "Recording archive for every session" },
    ],
    badge: "Live Every Day",
    badgeIcon: <Zap className="w-3 h-3" />,
    cta: "Join Live",
    href: "/programs/live",
  },
  {
    id: "mentorship",
    num: "03",
    icon: <Users className="w-5 h-5" />,
    title: "Mentorship & Support",
    subtitle: "Never trade alone",
    tag: "1-ON-1",
    tagColor: "#ffc857",
    color: "#ffc857",
    secondaryColor: "#ff9f43",
    description: "Personalised guidance that meets you where you are. Whether you're losing money or scaling up, you'll have a mentor who's been there.",
    features: [
      { text: "1-on-1 biweekly mentor call", highlight: true },
      { text: "Trade journal reviews with written feedback" },
      { text: "24/7 community WhatsApp & Discord access", highlight: true },
      { text: "Psychology & discipline coaching" },
      { text: "Prop firm challenge preparation support" },
    ],
    badge: "Lifetime Access",
    badgeIcon: <Shield className="w-3 h-3" />,
    cta: "Get Mentored",
    href: "/programs/mentorship",
  },
  {
    id: "certification",
    num: "04",
    icon: <Award className="w-5 h-5" />,
    title: "Certification",
    subtitle: "Credentials that open doors",
    tag: "CERTIFIED",
    tagColor: "#bf80ff",
    color: "#bf80ff",
    secondaryColor: "#8100D1",
    description: "NSE-aligned certifications that matter to prop desks, family offices, and employers. We prep you, you pass.",
    features: [
      { text: "NSE NCFM module preparation", highlight: true },
      { text: "Mock exams with detailed analytics" },
      { text: "93% first-attempt pass rate", highlight: true },
      { text: "Verified digital badge for LinkedIn" },
      { text: "Prop firm challenge guidance" },
    ],
    badge: "93% Pass Rate",
    badgeIcon: <Check className="w-3 h-3" />,
    cta: "Get Certified",
    href: "/programs/certification",
  },
];

/* ══════════════════════════════════════
   LARGE HERO CARD (Education)
══════════════════════════════════════ */
function HeroServiceCard({ s }: { s: Service }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden col-span-1 lg:col-span-2 row-span-2 flex flex-col cursor-pointer group"
      style={{
        background: hovered
          ? `linear-gradient(145deg, ${s.color}12 0%, rgba(15,23,42,0.97) 60%)`
          : "rgba(15,23,42,0.85)",
        border: `1px solid ${hovered ? s.color + "35" : s.color + "18"}`,
        boxShadow: hovered ? `0 0 80px ${s.color}14, 0 32px 64px rgba(0,0,0,0.7)` : "0 8px 32px rgba(0,0,0,0.5)",
        transition: "all 0.4s ease",
        minHeight: "480px",
      }}
    >
      {/* Top colour bar */}
      <div className="h-1 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${s.color}, ${s.secondaryColor}, transparent)` }} />

      {/* Background chart decoration */}
      <div className="absolute bottom-0 right-0 w-64 h-32 opacity-20 pointer-events-none">
        <MiniChart color={s.color} seed={1} />
      </div>

      {/* Radial glow */}
      <div className="absolute top-0 left-0 w-72 h-72 pointer-events-none transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${s.color}10 0%, transparent 70%)`, opacity: hovered ? 1 : 0 }} />

      <div className="relative z-10 flex flex-col h-full p-8 gap-6">

        {/* Header row */}
        <div className="flex items-start justify-between">
          <div>
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-[0.15em] uppercase mb-4"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30`, color: s.color }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              {s.tag}
            </div>
            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white leading-tight">{s.title}</h3>
                <p className="text-sm mt-0.5" style={{ color: `${s.color}99` }}>{s.subtitle}</p>
              </div>
            </div>
          </div>
          {/* Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold shrink-0"
            style={{ background: `${s.color}20`, color: s.color }}>
            {s.badgeIcon}
            {s.badge}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed max-w-lg">{s.description}</p>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 flex-1">
          {s.features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              viewport={{ once: true }}
              className="flex items-start gap-2.5 group/feat"
            >
              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: f.highlight ? `${s.color}20` : "rgba(255,255,255,0.05)", border: `1px solid ${f.highlight ? s.color + "40" : "rgba(255,255,255,0.06)"}` }}>
                <Check className="w-3 h-3" style={{ color: f.highlight ? s.color : "rgba(255,255,255,0.3)" }} />
              </div>
              <span className={`text-sm leading-snug ${f.highlight ? "text-white font-medium" : "text-gray-500"}`}>
                {f.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <span className="text-gray-600 text-xs font-mono">{s.num} / 04</span>
          <Link to={s.href}>
            <motion.div
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: `linear-gradient(135deg, ${s.color}22, ${s.color}10)`, border: `1px solid ${s.color}35`, color: s.color }}
            >
              {s.cta}
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   SMALL CARD
══════════════════════════════════════ */
function SmallServiceCard({ s, index, showChart = false }: { s: Service; index: number; showChart?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      style={{
        background: hovered ? `linear-gradient(145deg, ${s.color}10 0%, rgba(15,23,42,0.97) 100%)` : "rgba(15,23,42,0.85)",
        border: `1px solid ${hovered ? s.color + "35" : s.color + "18"}`,
        boxShadow: hovered ? `0 0 50px ${s.color}12, 0 20px 40px rgba(0,0,0,0.6)` : "0 8px 24px rgba(0,0,0,0.4)",
        transition: "all 0.35s ease",
      }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `${s.color}18`, color: s.color }}>
              {s.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">{s.title}</h3>
              <p className="text-[11px] mt-0.5" style={{ color: `${s.color}88` }}>{s.subtitle}</p>
            </div>
          </div>
          {/* Live ping for Live sessions */}
          {s.id === "live" && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              <span className="text-rose-400 text-[9px] font-bold uppercase tracking-wider">Live</span>
            </div>
          )}
          {s.id !== "live" && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold"
              style={{ background: `${s.color}12`, color: `${s.color}cc`, border: `1px solid ${s.color}20` }}>
              {s.badgeIcon}
              <span className="ml-0.5">{s.badge}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>

        {/* Chart for live sessions */}
        {showChart && (
          <div className="h-12 rounded-lg overflow-hidden" style={{ background: `${s.color}06`, border: `1px solid ${s.color}12` }}>
            <MiniChart color={s.color} seed={parseInt(s.num)} />
          </div>
        )}

        {/* Expandable features */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 w-fit"
          style={{ color: expanded ? s.color : "rgba(255,255,255,0.25)" }}
        >
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.div>
          {expanded ? "Hide details" : "What's included"}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-1">
                {s.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: f.highlight ? `${s.color}20` : "rgba(255,255,255,0.04)" }}>
                      <Check className="w-2.5 h-2.5" style={{ color: f.highlight ? s.color : "rgba(255,255,255,0.2)" }} />
                    </div>
                    <span className={`text-xs leading-snug ${f.highlight ? "text-white/80" : "text-gray-600"}`}>{f.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-gray-700 text-[10px] font-mono">{s.num} / 04</span>
          <Link to={s.href}>
            <motion.div
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
              style={{ color: hovered ? s.color : "rgba(255,255,255,0.3)" }}
            >
              {s.cta} <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════ */
export function Services() {
  return (
    <section className="py-24 px-6 bg-[#0F172A] relative overflow-hidden">

      {/* background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,255,136,0.04) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-14"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-400 mb-3">— What We Offer</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-bold tracking-tight text-white leading-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)" }}>
              Four ways to become a<br />
              <span className="text-cyan-400">better trader.</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Pick one or stack all four. Each service is designed to compound the others.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 auto-rows-auto">

          {/* LARGE hero card — Education (spans 2 cols, 2 rows) */}
          <HeroServiceCard s={SERVICES[0]} />

          {/* SMALL cards stacked on the right */}
          <div className="flex flex-col gap-5">
            <SmallServiceCard s={SERVICES[1]} index={1} showChart />
            <SmallServiceCard s={SERVICES[2]} index={2} />
          </div>

          {/* WIDE bottom card — Certification (spans full 3 cols on lg, horizontal layout) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            viewport={{ once: true }}
            className="lg:col-span-3 relative rounded-2xl overflow-hidden"
            style={{ background: "rgba(15,23,42,0.85)", border: `1px solid ${SERVICES[3].color}18` }}
          >
            <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${SERVICES[3].color}, transparent)` }} />

            <div className="p-7 flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Left: icon + title */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${SERVICES[3].color}18`, color: SERVICES[3].color }}>
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-2"
                    style={{ background: `${SERVICES[3].color}12`, border: `1px solid ${SERVICES[3].color}25`, color: SERVICES[3].color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: SERVICES[3].color }} />
                    CERTIFIED
                  </div>
                  <h3 className="text-xl font-bold text-white">Certification</h3>
                  <p className="text-sm" style={{ color: `${SERVICES[3].color}88` }}>Credentials that open doors</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-16 bg-white/5 shrink-0" />

              {/* Middle: features inline */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {SERVICES[3].features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                      style={{ background: f.highlight ? `${SERVICES[3].color}20` : "rgba(255,255,255,0.04)" }}>
                      <Check className="w-2.5 h-2.5" style={{ color: f.highlight ? SERVICES[3].color : "rgba(255,255,255,0.15)" }} />
                    </div>
                    <span className={f.highlight ? "text-white/80 font-medium" : "text-gray-600"}>{f.text}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-16 bg-white/5 shrink-0" />

              {/* Right: stat + CTA */}
              <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-3xl font-black" style={{ color: SERVICES[3].color }}>93%</div>
                  <div className="text-gray-500 text-xs">First-attempt pass rate</div>
                </div>
                <Link to={SERVICES[3].href}>
                  <motion.div
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                    style={{ background: `linear-gradient(135deg, ${SERVICES[3].color}20, ${SERVICES[3].color}10)`, border: `1px solid ${SERVICES[3].color}30`, color: SERVICES[3].color }}
                  >
                    Get Certified <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}