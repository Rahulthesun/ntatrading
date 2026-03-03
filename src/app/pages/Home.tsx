import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { MarketTicker } from "../components/MarketTicker";
import { Testimonials } from "../components/testimonials";

/* ═══════════════════════════════════════
   TRADING FLOOR CANVAS — hero animation
   A live "market matrix": price lines, 
   order-book particles, rising/falling 
   ticker labels, and a glowing trend line
   ═══════════════════════════════════════ */
function TradingCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, raf;
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Colour palette ── */
    const C = {
      green:    "#00ff88",
      greenDim: "rgba(0,255,136,",
      red:      "#ff4466",
      redDim:   "rgba(255,68,102,",
      gold:     "#ffc857",
      cyan:     "#00d4ff",
      white:    "rgba(255,255,255,",
      bg:       "#070b14",
    };

    /* ── 1. Price line ── */
    const PRICE_PTS = 180;
    let prices = [];
    let baseP = 24000;
    for (let i = 0; i < PRICE_PTS; i++) {
      baseP += (Math.random() - 0.48) * 120;
      prices.push(Math.max(20000, Math.min(28000, baseP)));
    }
    let scrollOffset = 0;

    function addPrice() {
      baseP += (Math.random() - 0.46) * 120;
      baseP = Math.max(20000, Math.min(28000, baseP));
      prices.push(baseP);
      if (prices.length > PRICE_PTS + 80) prices.shift();
    }

    /* ── 2. Order-book particles ── */
    const PARTICLES = 60;
    const particles = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * 1,
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0004,
      r: Math.random() * 2.4 + 0.6,
      alpha: Math.random() * 0.5 + 0.15,
      color: Math.random() > 0.55 ? C.green : C.red,
    }));

    /* ── 3. Ticker labels ── */
    const LABELS = ["NIFTY", "BANK", "RELIANCE", "TCS", "HDFC", "INFOSYS", "WIPRO", "ITC", "TATAMOTORS", "BAJFINANCE", "AXISBANK", "SBIN"];
    const floaters = Array.from({ length: 14 }, (_, i) => ({
      sym:   LABELS[i % LABELS.length],
      x:     Math.random(),
      y:     Math.random(),
      vy:    -(Math.random() * 0.00025 + 0.00008),
      val:   (Math.random() * 5000 + 500).toFixed(2),
      chg:   ((Math.random() - 0.42) * 4).toFixed(2),
      alpha: Math.random() * 0.35 + 0.08,
      size:  Math.floor(Math.random() * 3) + 10,
    }));

    /* ── 4. Grid ── */
    const GRID_COLS = 14, GRID_ROWS = 10;

    /* ── 5. Horizontal scan line ── */
    let scanY = 0;

    /* ── 6. Depth bars (order book visual) ── */
    const DEPTH = 28;
    const depthBars = Array.from({ length: DEPTH }, (_, i) => ({
      side: i < DEPTH / 2 ? "buy" : "sell",
      size: Math.random() * 0.7 + 0.05,
      targetSize: Math.random() * 0.7 + 0.05,
      y: i / DEPTH,
    }));

    let lt = null;
    let frame = 0;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function drawPriceLine() {
      scrollOffset += 0.4;
      if (scrollOffset >= W / (prices.length - 1)) {
        scrollOffset = 0;
        addPrice();
      }

      const visible = prices.slice(-Math.ceil(W / 5) - 10);
      const step = W / (visible.length - 1);
      const mn = Math.min(...visible), mx = Math.max(...visible);
      const pad = 80;

      const sy = (v) => pad + ((mx - v) / (mx - mn || 1)) * (H * 0.65 - pad * 2);

      /* Area fill */
      const grad = ctx.createLinearGradient(0, pad, 0, H * 0.65);
      grad.addColorStop(0, "rgba(0,255,136,0.14)");
      grad.addColorStop(0.6, "rgba(0,255,136,0.03)");
      grad.addColorStop(1, "rgba(0,255,136,0)");

      ctx.beginPath();
      ctx.moveTo(0 - scrollOffset, sy(visible[0]));
      for (let i = 1; i < visible.length; i++) {
        const px = i * step - scrollOffset;
        const py = sy(visible[i]);
        const cpx = (i - 0.5) * step - scrollOffset;
        ctx.bezierCurveTo(cpx, sy(visible[i - 1]), cpx, py, px, py);
      }
      ctx.lineTo((visible.length - 1) * step - scrollOffset, H * 0.65);
      ctx.lineTo(-scrollOffset, H * 0.65);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      /* Line */
      ctx.beginPath();
      ctx.moveTo(-scrollOffset, sy(visible[0]));
      for (let i = 1; i < visible.length; i++) {
        const px = i * step - scrollOffset;
        const py = sy(visible[i]);
        const cpx = (i - 0.5) * step - scrollOffset;
        ctx.bezierCurveTo(cpx, sy(visible[i - 1]), cpx, py, px, py);
      }
      ctx.strokeStyle = C.green;
      ctx.lineWidth = 2;
      ctx.shadowColor = C.green;
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      /* Live dot */
      const lx = (visible.length - 1) * step - scrollOffset;
      const ly = sy(visible[visible.length - 1]);
      ctx.beginPath();
      ctx.arc(lx, ly, 5, 0, Math.PI * 2);
      ctx.fillStyle = C.green;
      ctx.shadowColor = C.green;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      /* Pulse ring */
      const pulse = (Math.sin(frame * 0.06) + 1) / 2;
      ctx.beginPath();
      ctx.arc(lx, ly, 5 + pulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0,255,136,${0.6 - pulse * 0.55})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      /* Current price label */
      const price = visible[visible.length - 1];
      ctx.fillStyle = C.green;
      ctx.font = "bold 13px 'Courier New', monospace";
      ctx.fillText(price.toFixed(0), Math.min(lx + 14, W - 100), ly + 5);
    }

    function drawGrid() {
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 1;
      for (let c = 0; c <= GRID_COLS; c++) {
        const x = (c / GRID_COLS) * W;
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let r = 0; r <= GRID_ROWS; r++) {
        const y = (r / GRID_ROWS) * H;
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    function drawParticles() {
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${p.alpha * (0.7 + Math.sin(frame * 0.03 + p.x * 10) * 0.3)})`);
        ctx.fill();
      }
    }

    function drawFloaters() {
      ctx.font = "bold 11px 'Courier New', monospace";
      for (const f of floaters) {
        f.y += f.vy;
        if (f.y < -0.05) {
          f.y = 1.05;
          f.x = Math.random();
          f.val = (Math.random() * 5000 + 500).toFixed(2);
          f.chg = ((Math.random() - 0.42) * 4).toFixed(2);
          f.alpha = Math.random() * 0.25 + 0.06;
        }
        const isPos = parseFloat(f.chg) >= 0;
        const baseColor = isPos ? C.green : C.red;
        ctx.fillStyle = baseColor.replace("#", "rgba(")
          .replace(/(.{2})(.{2})(.{2})/, (_, r, g, b) =>
            `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},${f.alpha})`
          );
        // simpler approach:
        ctx.globalAlpha = f.alpha;
        ctx.fillStyle = isPos ? C.green : C.red;
        ctx.fillText(`${f.sym}  ${f.chg >= 0 ? "▲" : "▼"} ${Math.abs(f.chg)}%`, f.x * W, f.y * H);
        ctx.globalAlpha = 1;
      }
    }

    function drawScanLine() {
      scanY = (scanY + 0.3) % H;
      const grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 2);
      grad.addColorStop(0, "rgba(0,255,136,0)");
      grad.addColorStop(1, "rgba(0,255,136,0.04)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 40, W, 42);
    }

    function drawDepthBars() {
      const barW = 48;
      const barH = H / DEPTH;
      for (let i = 0; i < DEPTH; i++) {
        const b = depthBars[i];
        b.size = lerp(b.size, b.targetSize, 0.04);
        if (Math.random() < 0.01) b.targetSize = Math.random() * 0.75 + 0.05;
        const isBuy = b.side === "buy";
        const x = isBuy ? 0 : W - b.size * barW;
        ctx.fillStyle = isBuy
          ? `rgba(0,255,136,${0.06 + b.size * 0.12})`
          : `rgba(255,68,102,${0.06 + b.size * 0.12})`;
        ctx.fillRect(
          isBuy ? 0 : W - b.size * barW,
          i * barH, b.size * barW, barH - 1
        );
      }
    }

    function drawVignette() {
      const vg = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*0.85);
      vg.addColorStop(0, "rgba(7,11,20,0)");
      vg.addColorStop(1, "rgba(7,11,20,0.88)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
    }

    function tick(ts) {
      if (!lt) lt = ts;
      lt = ts;
      frame++;

      ctx.fillStyle = C.bg;
      ctx.fillRect(0, 0, W, H);

      drawGrid();
      drawDepthBars();
      drawParticles();
      drawFloaters();
      drawScanLine();
      drawPriceLine();
      drawVignette();

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════
   LIVE PRICE COUNTER
   ═══════════════════════ */
function LiveCounter({ value, prefix = "", suffix = "" }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(v => {
        const delta = (Math.random() - 0.46) * 2;
        return Math.max(0, +(v + delta).toFixed(2));
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);
  return <span>{prefix}{display.toLocaleString()}{suffix}</span>;
}


/* ═══════════════════════
   LIVE MARKET STATUS
   ═══════════════════════ */

function useNseMarketStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMarketStatus = () => {
      const now = new Date();

      // Convert to India time
      const indiaTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );

      const day = indiaTime.getDay(); // 0 = Sunday, 6 = Saturday
      const hours = indiaTime.getHours();
      const minutes = indiaTime.getMinutes();

      const totalMinutes = hours * 60 + minutes;

      const marketOpen = 9 * 60 + 15;  // 9:15 AM
      const marketClose = 15 * 60 + 30; // 3:30 PM

      const isWeekday = day >= 1 && day <= 5;
      const isTradingHours =
        totalMinutes >= marketOpen && totalMinutes <= marketClose;

      setIsOpen(isWeekday && isTradingHours);
    };

    checkMarketStatus();
    const interval = setInterval(checkMarketStatus, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return isOpen;
   
}

/* ═══════════════════════
   MINI SPARKLINE
   ═══════════════════════ */
function Sparkline({ color, seed = 1, height = 40 }) {
  const pts = Array.from({ length: 16 }, (_, i) => ({
    x: (i / 15) * 100,
    y: 50 - (Math.sin(i * seed * 1.2 + seed) * 16 + Math.cos(i * seed * 0.7) * 9 + (i / 15) * 18),
  }));
  const d = "M " + pts.map((p, i) =>
    i === 0 ? `${p.x},${p.y}` :
    `C ${pts[i-1].x+3},${pts[i-1].y} ${p.x-3},${p.y} ${p.x},${p.y}`
  ).join(" ");
  const area = `M ${pts[0].x},80 L ${pts[0].x},${pts[0].y} ` +
    pts.slice(1).map((p, i) => `C ${pts[i].x+3},${pts[i].y} ${p.x-3},${p.y} ${p.x},${p.y}`).join(" ") +
    ` L ${pts[pts.length-1].x},80 Z`;

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
   MARKET INDEX CARD
   ═══════════════════════ */
function IndexCard({ name, value, change, color, seed }) {
  const isPos = parseFloat(change) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${color}22`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="p-4 pb-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold tracking-widest uppercase" style={{ color: `${color}90` }}>{name}</span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: isPos ? "rgba(0,255,136,0.12)" : "rgba(255,68,102,0.12)",
              color: isPos ? "#00ff88" : "#ff4466",
            }}
          >
            {isPos ? "▲" : "▼"} {Math.abs(change)}%
          </span>
        </div>
        <div className="text-xl font-black tracking-tight" style={{ color }}>
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
   SERVICES DATA
   ═══════════════════════ */
const SERVICES = [
  {
    num: "01", emoji: "📈",
    title: "Stock Market Education",
    tag: "NSE · BSE · EQUITY",
    description: "Deep-dive into price action, institutional order flow, and market microstructure. Build a systematic, repeatable edge.",
    features: ["Technical Analysis", "Price Action", "Sector Rotation", "Risk Sizing"],
    color: "#00ff88", seed: 1,
    stats: [{ l: "Avg Return", v: "38%" }, { l: "Students", v: "1,800+" }, { l: "Duration", v: "8 Wks" }],
  },
  {
    num: "02", emoji: "⚡",
    title: "Derivatives & F&O",
    tag: "OPTIONS · FUTURES",
    description: "Master Greeks, volatility surfaces, and multi-leg strategies. Generate income regardless of market direction.",
    features: ["Options Strategies", "IV Edge", "Spreads & Hedges", "Greeks Mastery"],
    color: "#00d4ff", seed: 2,
    stats: [{ l: "Avg Return", v: "52%" }, { l: "Students", v: "1,200+" }, { l: "Duration", v: "10 Wks" }],
  },
  {
    num: "03", emoji: "🌐",
    title: "Mentorship & Live Trading",
    tag: "1-ON-1 · LIVE SESSIONS",
    description: "Trade alongside experienced mentors in real sessions. Personalized feedback on your setups and execution.",
    features: ["Live Calls", "Trade Reviews", "Psychology Coaching", "24/7 Community"],
    color: "#ffc857", seed: 3,
    stats: [{ l: "Avg Return", v: "44%" }, { l: "Students", v: "900+" }, { l: "Duration", v: "Ongoing" }],
  },
  {
    num: "04", emoji: "🏅",
    title: "Certifications",
    tag: "NSE · CMT · PROP FIRMS",
    description: "Industry-recognised credentials that open doors to prop desks, funds, and institutional trading roles.",
    features: ["NSE Modules", "CMT Prep", "Prop Challenges", "Verified Badge"],
    color: "#bf80ff", seed: 4,
    stats: [{ l: "Pass Rate", v: "93%" }, { l: "Students", v: "600+" }, { l: "Format", v: "Self-Paced" }],
  },
];

/* ═══════════════════════
   SERVICE CARD
   ═══════════════════════ */
function ServiceCard({ s, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: hovered ? `linear-gradient(135deg, ${s.color}0e 0%, rgba(10,14,26,.95) 100%)` : "rgba(10,14,26,.8)",
        border: `1px solid ${hovered ? s.color + "40" : s.color + "16"}`,
        backdropFilter: "blur(16px)",
        transition: "all 0.35s ease",
        boxShadow: hovered ? `0 0 60px ${s.color}18, 0 24px 48px rgba(0,0,0,.7)` : "0 8px 32px rgba(0,0,0,.5)",
      }}
    >
      {/* Top bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />

      <div className="p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div
              className="inline-flex items-center gap-1.5 rounded-full text-[10px] font-black tracking-[0.14em] uppercase mb-3"
              style={{ padding: "3px 10px", background: `${s.color}12`, border: `1px solid ${s.color}25`, color: s.color }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
              {s.tag}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.emoji}</span>
              <h3 className="text-xl font-black text-white leading-tight">{s.title}</h3>
            </div>
          </div>
          <span className="font-mono text-xs tracking-widest opacity-20 text-white">{s.num}</span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {s.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: s.color }} />
              {f}
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mb-5">
          {s.stats.map(({ l, v }) => (
            <div key={l} className="flex-1 rounded-lg text-center py-2" style={{ background: `${s.color}08`, border: `1px solid ${s.color}14` }}>
              <div className="text-sm font-black" style={{ color: s.color }}>{v}</div>
              <div className="text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{l}</div>
            </div>
          ))}
        </div>

        {/* Sparkline */}
        <div className="rounded-xl overflow-hidden h-10" style={{ background: `${s.color}06`, border: `1px solid ${s.color}10` }}>
          <Sparkline color={s.color} seed={s.seed} height={40} />
        </div>
      </div>

      {/* Hover arrow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-7 right-7 text-sm font-bold flex items-center gap-1"
        style={{ color: s.color }}
      >
        Explore →
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════
   STAT COUNTER COMPONENT
   ═══════════════════════ */
function AnimatedStat({ value, label, color, icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const target = parseInt(value.replace(/\D/g, ""));
    const duration = 1800;
    const step = 16;
    let current = 0;
    const inc = target / (duration / step);
    const timer = setInterval(() => {
      current = Math.min(current + inc, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [started, value]);

  const suffix = value.replace(/[\d,]/g, "");

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-black mb-2 font-mono" style={{ color }}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500 text-sm tracking-wide uppercase font-semibold">{label}</div>
    </div>
  );
}

/* ═══════════════════════
   METHODOLOGY STEPS
   ═══════════════════════ */
const STEPS = [
  { num: "01", title: "Learn",    desc: "Comprehensive curriculum: theory, tools, and live market structure",  color: "#00ff88" },
  { num: "02", title: "Practice", desc: "Paper-trade real scenarios with our simulated market environment",      color: "#00d4ff" },
  { num: "03", title: "Analyze",  desc: "Review every trade. Find patterns. Build and refine your edge",        color: "#ffc857" },
  { num: "04", title: "Execute",  desc: "Graduate to live markets with risk frameworks and mentor oversight",    color: "#bf80ff" },
];

/* ═══════════════════════
   HOME PAGE
   ═══════════════════════ */
export function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 500], [1, 0.96]);
  const isMarketOpen = useNseMarketStatus();
  return (
    <div className="min-h-screen text-white" style={{ background: "#070b14", fontFamily: "'Courier New', 'IBM Plex Mono', monospace" }}>
      <Header />

      {/* ═══════ HERO ═══════ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* THE BIG CANVAS ANIMATION */}
        <TradingCanvas />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#070b14]/20 to-[#070b14] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14]/60 via-transparent to-[#070b14]/60 pointer-events-none z-10" />
        <br />
        <br />
        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center"
        >
          {/* Live status badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: isMarketOpen
                ? "rgba(0,255,136,0.07)"
                : "rgba(255,0,0,0.07)",
              border: isMarketOpen
                ? "1px solid rgba(0,255,136,0.22)"
                : "1px solid rgba(255,0,0,0.25)",
              backdropFilter: "blur(10px)",
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{
                background: isMarketOpen ? "#00ff88" : "#ff4d4d",
                boxShadow: isMarketOpen
                  ? "0 0 8px #00ff88"
                  : "0 0 8px #ff4d4d",
              }}
            />
            <span
              className="text-xs font-bold tracking-widest uppercase"
              style={{
                color: isMarketOpen ? "#00ff88" : "#ff4d4d",
              }}
            >
              {isMarketOpen ? "Markets Open · NSE Live" : "Markets Closed"}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <h1
              className="font-black leading-none mb-3"
              style={{
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                letterSpacing: "-0.02em",
                fontFamily: "'Unica One', serif",
              }}
            >
              <span style={{ color: "#ffffff" }}>NAMMA</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #00ff88 0%, #00d4ff 50%, #bf80ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                TRADING
              </span>
            </h1>
            <div
              className="font-bold tracking-[0.3em] uppercase mb-2"
              style={{ fontSize: "clamp(.8rem, 2vw, 1.3rem)", color: "rgba(255,255,255,0.35)" }}
            >
              Academy
            </div>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 mb-10 max-w-md text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "Crimson Text, serif" }}
          >
            United in Learning, United in Growth
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              to="/programs"
              className="group relative px-8 py-4 font-bold text-sm tracking-widest uppercase overflow-hidden rounded"
              style={{
                background: "#00ff88",
                color: "#070b14",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              <span className="relative z-10">Explore Programs →</span>
              <motion.div
                className="absolute inset-0"
                style={{ background: "rgba(255,255,255,0.2)" }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.4 }}
              />
            </Link>
            <button
              className="px-8 py-4 font-bold text-sm tracking-widest uppercase rounded"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)",
                fontFamily: "Crimson Text, serif",
              }}
            >
              Book Free Demo
            </button>
          </motion.div>
          <br />
          <br />
          <br />
          <br />
          <br />
          {/* Index cards row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6"
          >
            <div className="grid grid-cols-3 gap-3">
              <IndexCard name="NIFTY 50"  value={24348.85} change={1.24}  color="#00ff88" seed={1} />
              <IndexCard name="BANKNIFTY" value={52429.15} change={0.83}  color="#00d4ff" seed={2} />
              <IndexCard name="SENSEX"    value={80116.49} change={-0.31} color="#ffc857" seed={3} />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll arrow */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-36 right-8 z-20 flex flex-col items-center gap-1"
          style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px", letterSpacing: "0.1em" }}
        >
          <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, transparent, rgba(255,255,255,.2))" }} />
          <span className="uppercase tracking-widest" style={{ fontFamily: "system-ui" }}>Scroll</span>
        </motion.div>
      </section>

      {/* ═══════ TICKER ═══════ */}
      <MarketTicker />

      {/* ═══════ WHY US ═══════ */}
      <section className="py-24 px-6" style={{ background: "#070b14" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#00ff88" }}>
              — Why Choose Us
            </div>
            <h2
              className="font-black leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "'Unica One', serif", letterSpacing: "-0.02em" }}
            >
              Built on Real<br />
              <span style={{ color: "#00ff88" }}>Market Experience</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { icon: "📊", title: "Live Market Training",      desc: "Trade real markets alongside mentors. No theory-only classrooms.",              color: "#00ff88" },
              { icon: "🎯", title: "Structured Learning Path",  desc: "Systematic progression from basics to institutional-grade strategies.",          color: "#00d4ff" },
              { icon: "🧠", title: "Psychology & Risk Focus",   desc: "The mental edge that separates consistent traders from gamblers.",               color: "#ffc857" },
              { icon: "🤝", title: "Community & Mentorship",    desc: "1,800+ active traders. Daily market calls. Lifetime access to the community.", color: "#bf80ff" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex gap-5 p-6 rounded-xl group cursor-default"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${item.color}14`,
                  fontFamily: "Crimson Text, serif",
                  transition: "border-color 0.3s",
                }}
                whileHover={{ borderColor: item.color + "40", backgroundColor: `${item.color}05` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{ background: `${item.color}10` }}
                >
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

      {/* ═══════ SERVICES ═══════ */}
      <section className="py-24 px-6" style={{ background: "#060a12" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#00d4ff" }}>
              — Programs
            </div>
            <h2
              className="font-black"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "'Unica One', serif", letterSpacing: "-0.02em" }}
            >
              Our <span style={{ color: "#00d4ff" }}>Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => <ServiceCard key={s.num} s={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══════ METHODOLOGY ═══════ */}
      <section className="py-24 px-6" style={{ background: "#070b14" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "#ffc857" }}>
              — How It Works
            </div>
            <h2
              className="font-black"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "'Unica One', Serif", letterSpacing: "-0.02em" }}
            >
              Our <span style={{ color: "#ffc857" }}>Methodology</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-10 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,200,87,0.2), transparent)" }}
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-black mb-4 relative z-10"
                    style={{ background: s.color, color: "#070b14" }}
                  >
                    {s.num}
                  </div>
                  <h3 className="text-2xl font-black mb-2" style={{ color: s.color, fontFamily: "'Crimson Text', serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section
        className="py-24 px-6"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,136,0.04) 0%, rgba(0,212,255,0.04) 50%, rgba(191,128,255,0.04) 100%)",
          borderTop: "1px solid rgba(0,255,136,0.08)",
          borderBottom: "1px solid rgba(0,255,136,0.08)",
          fontFamily: "Crimson Text, serif",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <AnimatedStat value="15+"    label="Years Experience"   color="#00ff88" />
            <AnimatedStat value="500+"   label="Live Sessions"      color="#00d4ff" />
            <AnimatedStat value="2000+"  label="Students Trained"   color="#ffc857" />
            <AnimatedStat value="93%"    label="Certification Pass" color="#bf80ff" />
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="py-24 px-6" style={{ background: "#070b14" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-5" style={{ color: "#00ff88" }}>
              — Start Today
            </div>
            <h2
              className="font-black mb-5 leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontFamily: "'Unica One', Serif" }}
            >
              Ready to Trade<br />
              <span style={{ color: "#00ff88" }}>Like a Pro?</span>
            </h2>
            <p className="text-gray-500 mb-10 leading-relaxed max-w-md mx-auto" style={{ fontFamily: "Crimson Text, serif" }}>
              Join 2,000+ traders who've transformed their approach to markets. Your first demo session is on us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" style={{ fontFamily: "Crimson Text, serif" }}>
              <button
                className="px-10 py-4 font-bold text-sm tracking-widest uppercase"
                style={{ background: "#00ff88", color: "#070b14", borderRadius: "4px" }}
              >
                Book Free Demo
              </button>
              <Link
                to="/programs"
                className="px-10 py-4 font-bold text-sm tracking-widest uppercase"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  borderRadius: "4px",
                  background: "transparent",
                }}
              >
                View All Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      <Testimonials />
      <Footer />
    </div>
  );
}