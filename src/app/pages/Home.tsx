import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MarketTicker } from "../components/MarketTicker";
import { Testimonials } from "../components/testimonials";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SocialProof } from "../components/SocialProof";
import { Services } from "../components/Services";


/* ── Types ── */
interface IndexCardProps {
  name: string;
  value: number;
  change: number;
  color: string;
  seed: number;
}
interface SparklineProps {
  color: string;
  seed?: number;
  height?: number;
}
interface LiveCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
}
interface ServiceStat { l: string; v: string; }
interface Service {
  num: string; emoji: string; title: string; tag: string;
  description: string; features: string[]; color: string;
  seed: number; stats: ServiceStat[];
}
interface ServiceCardProps { s: Service; index: number; }
interface AnimatedStatProps { value: string; label: string; color: string; }
interface Step { num: string; title: string; desc: string; color: string; }
interface WhyCard { icon: string; title: string; desc: string; color: string; }

/* ═══════════════════════════════════════
   TRADING CANVAS
   ═══════════════════════════════════════ */
function TradingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W: number, H: number, raf: number;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const C = { green: "#00ff88", red: "#ff4466", bg: "#0B0B12" };

    let prices: number[] = [];
    let baseP = 24000;
    for (let i = 0; i < 180; i++) {
      baseP += (Math.random() - 0.48) * 120;
      prices.push(Math.max(20000, Math.min(28000, baseP)));
    }
    let scrollOffset = 0;

    const addPrice = () => {
      baseP += (Math.random() - 0.46) * 120;
      baseP = Math.max(20000, Math.min(28000, baseP));
      prices.push(baseP);
      if (prices.length > 260) prices.shift();
    };

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0004,
      r: Math.random() * 2.4 + 0.6,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.55 ? C.green : C.red,
    }));

    const LABELS = ["NIFTY","BANK","RELIANCE","TCS","HDFC","INFOSYS","WIPRO","ITC","TATAMOTORS","BAJFINANCE","AXISBANK","SBIN"];
    const floaters = Array.from({ length: 14 }, (_, i) => ({
      sym: LABELS[i % LABELS.length], x: Math.random(), y: Math.random(),
      vy: -(Math.random() * 0.00025 + 0.00008),
      chg: ((Math.random() - 0.42) * 4).toFixed(2),
      alpha: Math.random() * 0.35 + 0.08,
    }));

    const depthBars = Array.from({ length: 28 }, (_, i) => ({
      side: i < 14 ? "buy" : "sell",
      size: Math.random() * 0.7 + 0.05,
      targetSize: Math.random() * 0.7 + 0.05,
    }));

    let frame = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const drawPriceLine = () => {
      scrollOffset += 0.4;
      if (scrollOffset >= W / (prices.length - 1)) { scrollOffset = 0; addPrice(); }
      const visible = prices.slice(-Math.ceil(W / 5) - 10);
      const step = W / (visible.length - 1);
      const mn = Math.min(...visible), mx = Math.max(...visible);
      const pad = 80;
      const sy = (v: number) => pad + ((mx - v) / (mx - mn || 1)) * (H * 0.65 - pad * 2);

      const grad = ctx.createLinearGradient(0, pad, 0, H * 0.65);
      grad.addColorStop(0, "rgba(0,255,136,0.14)");
      grad.addColorStop(1, "rgba(0,255,136,0)");
      ctx.beginPath();
      ctx.moveTo(-scrollOffset, sy(visible[0]));
      for (let i = 1; i < visible.length; i++) {
        const px = i * step - scrollOffset, py = sy(visible[i]), cpx = (i - 0.5) * step - scrollOffset;
        ctx.bezierCurveTo(cpx, sy(visible[i - 1]), cpx, py, px, py);
      }
      ctx.lineTo((visible.length - 1) * step - scrollOffset, H * 0.65);
      ctx.lineTo(-scrollOffset, H * 0.65);
      ctx.closePath();
      ctx.fillStyle = grad; ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-scrollOffset, sy(visible[0]));
      for (let i = 1; i < visible.length; i++) {
        const px = i * step - scrollOffset, py = sy(visible[i]), cpx = (i - 0.5) * step - scrollOffset;
        ctx.bezierCurveTo(cpx, sy(visible[i - 1]), cpx, py, px, py);
      }
      ctx.strokeStyle = C.green; ctx.lineWidth = 2;
      ctx.shadowColor = C.green; ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0;

      const lx = (visible.length - 1) * step - scrollOffset, ly = sy(visible[visible.length - 1]);
      ctx.beginPath(); ctx.arc(lx, ly, 5, 0, Math.PI * 2);
      ctx.fillStyle = C.green; ctx.shadowColor = C.green; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;

      const pulse = (Math.sin(frame * 0.06) + 1) / 2;
      ctx.beginPath(); ctx.arc(lx, ly, 5 + pulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,255,136,${0.6 - pulse * 0.55})`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.fillStyle = C.green; ctx.font = "bold 13px 'Courier New', monospace";
      ctx.fillText(visible[visible.length - 1].toFixed(0), Math.min(lx + 14, W - 100), ly + 5);
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255,255,255,0.025)"; ctx.lineWidth = 1;
      for (let c = 0; c <= 14; c++) { const x = (c / 14) * W; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let r = 0; r <= 10; r++) { const y = (r / 10) * H; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    };

    const drawParticles = () => {
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.alpha * (0.7 + Math.sin(frame * 0.03 + p.x * 10) * 0.3);
        ctx.fillStyle = p.color; ctx.fill(); ctx.globalAlpha = 1;
      }
    };

    const drawFloaters = () => {
      ctx.font = "bold 11px 'Courier New', monospace";
      for (const f of floaters) {
        f.y += f.vy;
        if (f.y < -0.05) { f.y = 1.05; f.x = Math.random(); f.chg = ((Math.random() - 0.42) * 4).toFixed(2); f.alpha = Math.random() * 0.25 + 0.06; }
        const isPos = parseFloat(f.chg) >= 0;
        ctx.globalAlpha = f.alpha; ctx.fillStyle = isPos ? C.green : C.red;
        ctx.fillText(`${f.sym}  ${isPos ? "▲" : "▼"} ${Math.abs(parseFloat(f.chg))}%`, f.x * W, f.y * H);
        ctx.globalAlpha = 1;
      }
    };

    const drawDepthBars = () => {
      const barH = H / 28;
      for (let i = 0; i < 28; i++) {
        const b = depthBars[i];
        b.size = lerp(b.size, b.targetSize, 0.04);
        if (Math.random() < 0.01) b.targetSize = Math.random() * 0.75 + 0.05;
        const isBuy = b.side === "buy";
        ctx.fillStyle = isBuy ? `rgba(0,255,136,${0.06 + b.size * 0.12})` : `rgba(255,68,102,${0.06 + b.size * 0.12})`;
        ctx.fillRect(isBuy ? 0 : W - b.size * 48, i * barH, b.size * 48, barH - 1);
      }
    };

    const drawVignette = () => {
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
      vg.addColorStop(0, "rgba(11,11,18,0)"); vg.addColorStop(1, "rgba(11,11,18,0.9)");
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    };

    let scanY = 0;
    const drawScan = () => {
      scanY = (scanY + 0.3) % H;
      const g = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 2);
      g.addColorStop(0, "rgba(0,255,136,0)"); g.addColorStop(1, "rgba(0,255,136,0.04)");
      ctx.fillStyle = g; ctx.fillRect(0, scanY - 40, W, 42);
    };

    const tick = () => {
      frame++;
      ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
      drawGrid(); drawDepthBars(); drawParticles(); drawFloaters(); drawScan(); drawPriceLine(); drawVignette();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}

/* ═══════════════════════
   LIVE COUNTER
   ═══════════════════════ */
function LiveCounter({ value, prefix = "", suffix = "" }: LiveCounterProps) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const t = setInterval(() => setDisplay(v => Math.max(0, +(v + (Math.random() - 0.46) * 2).toFixed(2))), 1200);
    return () => clearInterval(t);
  }, []);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}

/* ═══════════════════════
   MARKET STATUS HOOK
   ═══════════════════════ */
function useNseMarketStatus() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const india = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const day = india.getDay(), mins = india.getHours() * 60 + india.getMinutes();
      setIsOpen(day >= 1 && day <= 5 && mins >= 555 && mins <= 930);
    };
    check();
    const t = setInterval(check, 60000);
    return () => clearInterval(t);
  }, []);
  return isOpen;
}

/* ═══════════════════════
   SPARKLINE
   ═══════════════════════ */
function Sparkline({ color, seed = 1, height = 40 }: SparklineProps) {
  const pts = Array.from({ length: 16 }, (_, i) => ({
    x: (i / 15) * 100,
    y: 50 - (Math.sin(i * seed * 1.2 + seed) * 16 + Math.cos(i * seed * 0.7) * 9 + (i / 15) * 18),
  }));
  const d = "M " + pts.map((p, i) => i === 0 ? `${p.x},${p.y}` : `C ${pts[i-1].x+3},${pts[i-1].y} ${p.x-3},${p.y} ${p.x},${p.y}`).join(" ");
  const area = `M ${pts[0].x},80 L ${pts[0].x},${pts[0].y} ` + pts.slice(1).map((p, i) => `C ${pts[i].x+3},${pts[i].y} ${p.x-3},${p.y} ${p.x},${p.y}`).join(" ") + ` L ${pts[pts.length-1].x},80 Z`;
  return (
    <svg viewBox="0 0 100 80" preserveAspectRatio="none" width="100%" height={height}>
      <defs>
        <linearGradient id={`sg${seed}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sg${seed})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="2.8" fill={color} />
    </svg>
  );
}

/* ═══════════════════════
   INDEX CARD
   ═══════════════════════ */
function IndexCard({ name, value, change, color, seed }: IndexCardProps) {
  const isPos = change >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden backdrop-blur-md"
      style={{ background: "rgba(26,19,37,0.7)", border: `1px solid ${color}22` }}
    >
      <div className="p-4 pb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: `${color}99` }}>{name}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPos ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
            {isPos ? "▲" : "▼"} {Math.abs(change)}%
          </span>
        </div>
        <div className="text-xl font-black tracking-tight font-mono" style={{ color }}>
          <LiveCounter value={value} />
        </div>
      </div>
      <div className="px-1">
        <Sparkline color={color} seed={seed} height={44} />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════
   SERVICES
   ═══════════════════════ */
const SERVICES: Service[] = [
  {
    num: "01", emoji: "📈", title: "Stock Market Education", tag: "NSE · BSE · EQUITY",
    description: "Deep-dive into price action, institutional order flow, and market microstructure. Build a systematic, repeatable edge.",
    features: ["Technical Analysis", "Price Action", "Sector Rotation", "Risk Sizing"],
    color: "#00ff88", seed: 1,
    stats: [{ l: "Avg Return", v: "38%" }, { l: "Students", v: "1,800+" }, { l: "Duration", v: "8 Wks" }],
  },
  {
    num: "02", emoji: "⚡", title: "Derivatives & F&O", tag: "OPTIONS · FUTURES",
    description: "Master Greeks, volatility surfaces, and multi-leg strategies. Generate income regardless of market direction.",
    features: ["Options Strategies", "IV Edge", "Spreads & Hedges", "Greeks Mastery"],
    color: "#00d4ff", seed: 2,
    stats: [{ l: "Avg Return", v: "52%" }, { l: "Students", v: "1,200+" }, { l: "Duration", v: "10 Wks" }],
  },
  {
    num: "03", emoji: "🌐", title: "Mentorship & Live Trading", tag: "1-ON-1 · LIVE SESSIONS",
    description: "Trade alongside experienced mentors in real sessions. Personalized feedback on your setups and execution.",
    features: ["Live Calls", "Trade Reviews", "Psychology Coaching", "24/7 Community"],
    color: "#ffc857", seed: 3,
    stats: [{ l: "Avg Return", v: "44%" }, { l: "Students", v: "900+" }, { l: "Duration", v: "Ongoing" }],
  },
  {
    num: "04", emoji: "🏅", title: "Certifications", tag: "NSE · CMT · PROP FIRMS",
    description: "Industry-recognised credentials that open doors to prop desks, funds, and institutional trading roles.",
    features: ["NSE Modules", "CMT Prep", "Prop Challenges", "Verified Badge"],
    color: "#bf80ff", seed: 4,
    stats: [{ l: "Pass Rate", v: "93%" }, { l: "Students", v: "600+" }, { l: "Format", v: "Self-Paced" }],
  },
];

function ServiceCard({ s, index }: ServiceCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }} viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: hovered ? `linear-gradient(135deg, ${s.color}0e 0%, rgba(17,24,39,.95) 100%)` : "rgba(17,24,39,.8)",
        border: `1px solid ${hovered ? s.color + "40" : s.color + "16"}`,
        boxShadow: hovered ? `0 0 60px ${s.color}18, 0 24px 48px rgba(0,0,0,.7)` : "0 8px 32px rgba(0,0,0,.5)",
      }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
      <div className="p-7">
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full text-[10px] font-black tracking-widest uppercase px-2.5 py-1 mb-3"
              style={{ background: `${s.color}12`, border: `1px solid ${s.color}25`, color: s.color }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              {s.tag}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.emoji}</span>
              <h3 className="text-xl font-bold text-white leading-tight">{s.title}</h3>
            </div>
          </div>
          <span className="font-mono text-xs tracking-widest opacity-20 text-white">{s.num}</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {s.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: s.color }} />
              {f}
            </div>
          ))}
        </div>
        <div className="flex gap-3 mb-5">
          {s.stats.map(({ l, v }) => (
            <div key={l} className="flex-1 rounded-lg text-center py-2" style={{ background: `${s.color}08`, border: `1px solid ${s.color}14` }}>
              <div className="text-sm font-black" style={{ color: s.color }}>{v}</div>
              <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{l}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl overflow-hidden h-10" style={{ background: `${s.color}06`, border: `1px solid ${s.color}10` }}>
          <Sparkline color={s.color} seed={s.seed} height={40} />
        </div>
      </div>
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }} transition={{ duration: 0.2 }}
        className="absolute bottom-7 right-7 text-sm font-bold" style={{ color: s.color }}
      >
        Explore →
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════
   ANIMATED STAT
   ═══════════════════════ */
function AnimatedStat({ value, label, color }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const target = parseInt(value.replace(/\D/g, ""));
    let current = 0;
    const inc = target / (1800 / 16);
    const t = setInterval(() => {
      current = Math.min(current + inc, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black mb-2 font-mono" style={{ color }}>
        {count.toLocaleString()}{value.replace(/[\d,]/g, "")}
      </div>
      <div className="text-gray-500 text-sm tracking-widest uppercase font-semibold">{label}</div>
    </div>
  );
}

/* ═══════════════════════
   STEPS
   ═══════════════════════ */
const STEPS: Step[] = [
  { num: "01", title: "Learn",    desc: "Comprehensive curriculum: theory, tools, and live market structure",  color: "#00ff88" },
  { num: "02", title: "Practice", desc: "Paper-trade real scenarios with our simulated market environment",      color: "#00d4ff" },
  { num: "03", title: "Analyze",  desc: "Review every trade. Find patterns. Build and refine your edge",        color: "#ffc857" },
  { num: "04", title: "Execute",  desc: "Graduate to live markets with risk frameworks and mentor oversight",    color: "#bf80ff" },
];

const WHY_CARDS: WhyCard[] = [
  { icon: "📊", title: "Live Market Training",     desc: "Trade real markets alongside mentors. No theory-only classrooms.",              color: "#00ff88" },
  { icon: "🎯", title: "Structured Learning Path", desc: "Systematic progression from basics to institutional-grade strategies.",          color: "#00d4ff" },
  { icon: "🧠", title: "Psychology & Risk Focus",  desc: "The mental edge that separates consistent traders from gamblers.",               color: "#ffc857" },
  { icon: "🤝", title: "Community & Mentorship",   desc: "1,800+ active traders. Daily market calls. Lifetime access to the community.",  color: "#bf80ff" },
];

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
export function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 500], [1, 0.96]);
  const isMarketOpen = useNseMarketStatus();

  return (
    <div className="min-h-screen text-white bg-[#0B0B12] font-sans">
      <Header />

      {/* ─── HERO ─── */}
      <section className="relative h-screen min-h-[750px] overflow-hidden">
        <TradingCanvas />

        {/* overlays */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-[#0B0B12]/50 via-[#0B0B12]/20 to-[#0B0B12]" />
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0B0B12]/60 via-transparent to-[#0B0B12]/60" />

        {/* centred content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center pt-28 pb-56"
        >
          {/* market status dot */}
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="flex items-center gap-2 mb-10"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: isMarketOpen ? "#00ff88" : "#ff4466" }}
            />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: isMarketOpen ? "#00ff88" : "#ff4466" }}>
              {isMarketOpen ? "NSE Live · Markets Open" : "Markets Closed"}
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.25 }}
            className="font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl"
            style={{ fontSize: "clamp(2.6rem, 6.5vw, 4rem)" }}
          >
            The Best Community to Learn{" "}
            <span style={{
              background: "linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #8100D1 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Stock Market Trading
            </span>
          </motion.h1>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="text-white/40 leading-relaxed mb-11 max-w-md"
            style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.1rem)" }}
          >
            Namma Trading Academy —{" "}
            <span className="text-white/60">United in learning, united in growth.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/programs"
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white text-[15px] tracking-tight"
                style={{ background: "linear-gradient(135deg, #8100D1, #5500b5)", boxShadow: "0 4px 28px rgba(129,0,209,0.45)" }}
              >
                Get Started Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white/75 text-[15px] tracking-tight bg-white/5 border border-white/10 transition-all duration-200 hover:border-white/20"
            >
              Book a Demo
              <TrendingUp className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* index cards pinned to bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-20"
        >
          <div className="grid grid-cols-3 gap-3">
            <IndexCard name="NIFTY 50"  value={24348.85} change={1.24}  color="#00ff88" seed={1} />
            <IndexCard name="BANKNIFTY" value={52429.15} change={0.83}  color="#00d4ff" seed={2} />
            <IndexCard name="SENSEX"    value={80116.49} change={-0.31} color="#ffc857" seed={3} />
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 right-8 z-20 flex flex-col items-center gap-1.5"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/20" />
          <span className="text-[9px] tracking-[0.14em] text-white/20 uppercase">Scroll</span>
        </motion.div>
      </section>

      {/* ─── TICKER ─── 
      <MarketTicker />

      */}

      <SocialProof />
      
      {/* ─── WHY US ─── */}
      <section className="py-24 px-6 bg-[#0B0B12]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-3">— Why Choose Us</p>
            <h2 className="font-bold leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Built on Real <span className="text-emerald-400">Market Experience</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {WHY_CARDS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ borderColor: item.color + "40", backgroundColor: item.color + "08" }}
                className="flex gap-5 p-6 rounded-xl transition-all duration-300"
                style={{ background: "rgba(26,19,37,0.5)", border: `1px solid ${item.color}14` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
                  style={{ background: `${item.color}10` }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <Services />
      {/* ─── METHODOLOGY ─── */}
      <section className="py-24 px-6 bg-[#0B0B12]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-yellow-400 mb-3">— How It Works</p>
            <h2 className="font-bold tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Our <span className="text-yellow-400">Methodology</span>
            </h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-black mb-4 relative z-10 text-[#0B0B12]"
                    style={{ background: s.color }}>
                    {s.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: s.color }}>{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 bg-[#0B0B12]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400 mb-5">— Start Today</p>
            <h2 className="font-bold leading-tight tracking-tight mb-5" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Ready to Trade <span className="text-emerald-400">Like a Pro?</span>
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed max-w-md mx-auto text-base">
              Join 2,000+ traders who've transformed their approach to markets. Your first demo session is on us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-10 py-4 font-bold text-sm tracking-widest uppercase rounded-lg text-white"
                style={{ background: "linear-gradient(135deg, #8100D1, #5500b5)", boxShadow: "0 4px 24px rgba(129,0,209,0.4)" }}>
                Book Free Demo
              </button>
              <Link to="/programs"
                className="px-10 py-4 font-bold text-sm tracking-widest uppercase rounded-lg text-white/60 border border-white/15 hover:border-white/30 transition-colors duration-200">
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