'use client';

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

// Candle definitions — matches the loader exactly
// Each: { color, wickTopY, bodyY, bodyH, wickBotY, finalBodyY, finalBodyH, finalColor? }
const CANDLES = [
  { id:"c1", color:"#ef4444", wickTopY:14, bodyY:28,  bodyH:72, wickBotY:118, finalBodyY:51, finalBodyH:38 },
  { id:"c2", color:"#ef4444", wickTopY:50, bodyY:63,  bodyH:32, wickBotY:108, finalBodyY:67, finalBodyH:5,  finalColor:"#94a3b8" },
  { id:"c3", color:"#10b981", wickTopY:60, bodyY:72,  bodyH:28, wickBotY:112, finalBodyY:35, finalBodyH:60 },
  { id:"c4", color:"#10b981", wickTopY:40, bodyY:56,  bodyH:50, wickBotY:118, finalBodyY:10, finalBodyH:100 },
];

const TIMELINE = [
  {
    year: "2008",
    label: "The Beginning",
    color: "#ef4444",
    icon: "📉",
    heading: "Born from the Crash",
    body:
      "Founded in the aftermath of the global financial crisis, Namma Trading Academy was born out of a single conviction — that ordinary people deserved the same market knowledge as institutional traders. Our founder stepped away from a decade-long career on the trading floor to build something different.",
  },
  {
    year: "2013",
    label: "Growth",
    color: "#ffc857",
    icon: "🌱",
    heading: "From Classroom to Community",
    body:
      "What started as weekend workshops in Chennai grew into a structured curriculum reaching thousands of students across South India. We built our first live trading room, letting students observe real decisions in real markets — not theory, but practice under pressure.",
  },
  {
    year: "2019",
    label: "Mission",
    color: "#00d4ff",
    icon: "🎯",
    heading: "Democratise Market Education",
    body:
      "Our mission crystallised: make institutional-grade trading education accessible to every Indian who wants financial independence. We launched online cohorts, mentorship programmes, and a community of 2,000+ traders who hold each other accountable to the same standards.",
  },
  {
    year: "2023",
    label: "Vision",
    color: "#00ff88",
    icon: "🔭",
    heading: "India's Most Trusted Trading Academy",
    body:
      "We envision a future where every retail trader in India has access to the tools, knowledge, and mentorship that were once reserved for professionals. Our next chapter: NSE-certified programmes, prop-firm partnerships, and a global alumni network.",
  },
  {
    year: "Today",
    label: "Core Values",
    color: "#bf80ff",
    icon: "🏆",
    heading: "What We Stand For",
    body:
      "Discipline over luck. Risk management over recklessness. Transparency over hype. Community over competition. These aren't slogans — they are the filters through which every curriculum decision, mentorship conversation, and trade review is made at Namma Trading Academy.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   SCROLL-DRIVEN CANDLESTICK ANIMATION
   Section 1: pin the hero, drive candle animation via scroll
   ═══════════════════════════════════════════════════════════════════════════ */

// Lerp helper
const lerp = (a, b, t) => a + (b - a) * t;
const eio  = (p) => p < 0.5 ? 2*p*p : -1+(4-2*p)*p;

function ScrollCandleHero() {
  const sectionRef  = useRef(null);
  const canvasRef   = useRef(null);          // we draw candles on SVG via direct DOM for perf
  const trendRef    = useRef(null);
  const dotRef      = useRef(null);
  const textRef     = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Text opacity: shows once candles are done (~60% scroll) ──
  const textOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const textY       = useTransform(scrollYProgress, [0.55, 0.75], [30, 0]);

  // ── Animate candles frame-by-frame via scroll ──────────────────────────
  useEffect(() => {
    const svg = document.getElementById("about-candle-svg");
    if (!svg) return;

    const unsub = scrollYProgress.on("change", (raw) => {
      const p = Math.max(0, Math.min(1, raw));

      // Phase 1 (0–0.25): candles appear one by one (enter from below)
      // Phase 2 (0.25–0.55): candles transform (red→doji, green grows)
      // Phase 3 (0.55–0.75): trend line draws
      // Phase 4 (0.75–1): all settled, text visible

      CANDLES.forEach((c, i) => {
        const bodyEl  = svg.querySelector(`#body-${c.id}`);
        const wtEl    = svg.querySelector(`#wt-${c.id}`);
        const wbEl    = svg.querySelector(`#wb-${c.id}`);
        const wrapEl  = svg.querySelector(`#wrap-${c.id}`);
        if (!bodyEl || !wtEl || !wbEl || !wrapEl) return;

        // — Enter phase: each candle enters at staggered scroll window —
        const enterStart = i * 0.06;
        const enterEnd   = enterStart + 0.12;
        const enterP = eio(Math.max(0, Math.min(1, (p - enterStart) / (enterEnd - enterStart))));

        // Slide up from 40px below, fade in
        const ty = (1 - enterP) * 40;
        const op = enterP;
        wrapEl.setAttribute("transform", `translate(0, ${ty})`);
        wrapEl.setAttribute("opacity", op);

        // — Transform phase: body geometry morphs —
        const tStart = 0.28 + i * 0.05;
        const tEnd   = tStart + 0.1;
        const tP = eio(Math.max(0, Math.min(1, (p - tStart) / (tEnd - tStart))));

        const curBodyY = lerp(c.bodyY, c.finalBodyY, tP);
        const curBodyH = lerp(c.bodyH, c.finalBodyH, tP);
        const finalCol = c.finalColor ?? c.color;
        // Interpolate colour for c2 (red → grey)
        const col = i === 1
          ? tP > 0.5 ? finalCol : c.color
          : c.color;

        bodyEl.setAttribute("y",      String(curBodyY));
        bodyEl.setAttribute("height", String(Math.max(curBodyH, 2)));
        bodyEl.setAttribute("fill",   col);

        // Update lower wick y1 to match body bottom
        wbEl.setAttribute("y1", String(curBodyY + curBodyH));

        // C4 glow
        if (i === 3 && tP > 0.7) {
          const glow = (tP - 0.7) / 0.3;
          bodyEl.style.filter = `drop-shadow(0 0 ${glow * 14}px rgba(16,185,129,0.7))`;
        }
      });

      // — Trend line draw (scroll 0.55 → 0.72) —
      const tlStart = 0.56, tlEnd = 0.72;
      const tlP = Math.max(0, Math.min(1, (p - tlStart) / (tlEnd - tlStart)));
      const path = svg.querySelector("#trend-path");
      if (path) {
        const total = path.getTotalLength();
        path.setAttribute("stroke-dashoffset", String(total * (1 - eio(tlP))));
        path.setAttribute("opacity", String(tlP > 0.05 ? 1 : 0));

        // Move glowing dot along path
        const dot = svg.querySelector("#trend-dot");
        if (dot && tlP > 0.01) {
          const pt = path.getPointAtLength(eio(tlP) * total);
          dot.setAttribute("cx", String(pt.x));
          dot.setAttribute("cy", String(pt.y));
          dot.setAttribute("opacity", String(Math.min(1, tlP * 4)));
        }
      }
    });

    return () => unsub();
  }, [scrollYProgress]);

  // SVG layout
  const CW = 28, GAP = 18;
  const totalW = CANDLES.length * CW + (CANDLES.length - 1) * GAP; // 28*4+18*3 = 166

  return (
    <section
      ref={sectionRef}
      style={{ height: "260vh", position: "relative" }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background radial glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,136,0.06) 0%, transparent 70%)",
        }} />

        <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{
              marginTop: 32,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              color: "#374151", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
            }}
          >
            <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, transparent, #374151)" }} />
            Scroll to continue
          </motion.div>

        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.4) 1px,transparent 1px)," +
            "linear-gradient(90deg,rgba(0,212,255,0.4) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Corner brackets */}
        {[
          { top:24, left:24, borderTop:"1px solid rgba(0,255,136,0.3)", borderLeft:"1px solid rgba(0,255,136,0.3)" },
          { top:24, right:24, borderTop:"1px solid rgba(0,255,136,0.3)", borderRight:"1px solid rgba(0,255,136,0.3)" },
          { bottom:24, left:24, borderBottom:"1px solid rgba(0,255,136,0.3)", borderLeft:"1px solid rgba(0,255,136,0.3)" },
          { bottom:24, right:24, borderBottom:"1px solid rgba(0,255,136,0.3)", borderRight:"1px solid rgba(0,255,136,0.3)" },
        ].map((s, i) => (
          <div key={i} style={{ position:"absolute", width:52, height:52, ...s }} />
        ))}

        {/* ── The animated candle SVG ── */}
        <svg
          id="about-candle-svg"
          width={totalW + 60}
          height={200}
          viewBox={`-30 -20 ${totalW + 60} 200`}
          style={{ overflow: "visible", marginBottom: 48 }}
        >
          <defs>
            <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {CANDLES.map((c, i) => {
            const x = i * (CW + GAP);
            const cx = x + CW / 2;
            return (
              <g key={c.id} id={`wrap-${c.id}`} opacity="0">
                {/* Upper wick */}
                <line
                  id={`wt-${c.id}`}
                  x1={cx} y1={c.wickTopY} x2={cx} y2={c.bodyY}
                  stroke={c.color} strokeWidth="2" strokeLinecap="round"
                />
                {/* Body */}
                <rect
                  id={`body-${c.id}`}
                  x={x + 4} y={c.bodyY} width={CW - 8} height={c.bodyH}
                  rx="3" fill={c.color}
                />
                {/* Lower wick */}
                <line
                  id={`wb-${c.id}`}
                  x1={cx} y1={c.bodyY + c.bodyH} x2={cx} y2={c.wickBotY}
                  stroke={c.color} strokeWidth="2" strokeLinecap="round"
                />
              </g>
            );
          })}

          {/* Trend line */}
          <path
            id="trend-path"
            d="M 14,95 C 42,82 68,76 95,76 C 118,76 138,52 158,46 C 178,40 196,20 214,16"
            fill="none"
            stroke="#c9a227"
            strokeWidth="1.8"
            strokeLinecap="round"
            filter="url(#glow-gold)"
            style={{ strokeDasharray: 280, strokeDashoffset: 280 }}
            opacity="0"
          />

          {/* Glowing dot on trend tip */}
          <circle
            id="trend-dot"
            cx="14" cy="95" r="5"
            fill="#f0c040"
            filter="url(#glow-green)"
            opacity="0"
          />
        </svg>

        {/* ── Text reveal after animation completes ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY, textAlign: "center", maxWidth: 560, padding: "0 24px" }}
        >
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#00ff88",
              marginBottom: 12,
            }}
          >
            Our Story
          </p>
          <h2
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#f0f4ff",
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Four Candles.{" "}
            <span style={{ color: "#00ff88" }}>One Direction.</span>
          </h2>
          <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.75 }}>
            Just like a market reversal — every great story begins with a loss,
            steadies in uncertainty, and breaks through into something bigger.
            <br />Scroll to walk our timeline.
          </p>

          {/* animated down arrow */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{
              marginTop: 32,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              color: "#374151", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
            }}
          >
            <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, transparent, #374151)" }} />
            Scroll to continue
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HORIZONTAL TIMELINE
   Horizontal scroll driven by vertical page scroll — locked viewport
   ═══════════════════════════════════════════════════════════════════════════ */

function HorizontalTimeline() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll → horizontal translateX
  // Track width: each card 480px + gap 60px, minus one gap
  const CARD_W      = 480;
  const GAP         = 60;
  const CARDS       = TIMELINE.length;
  const trackWidth  = CARD_W * CARDS + GAP * (CARDS - 1);
  // We shift from 0 to -(trackWidth - viewport), viewport ≈ 100vw
  // Use a big negative number; clip is handled by overflow:hidden
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", `-${trackWidth - 200}px`]
  );

  // Smooth the horizontal motion
  const smoothX = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 });

  // Progress line width
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      style={{ height: `${CARDS * 100}vh`, position: "relative", background: "#0a0e1a" }}
    >
      {/* ── Sticky viewport ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Section label */}
        <div style={{ padding: "0 10vw", marginBottom: 40 }}>
          <p style={{
            fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#6b7280", marginBottom: 6,
          }}>
            Timeline
          </p>
          <h3 style={{
            fontFamily: "'Georgia', serif", fontSize: "clamp(1.4rem,2.5vw,2rem)",
            fontWeight: 700, color: "#f0f4ff",
          }}>
            The Namma Trading Journey
          </h3>
        </div>

        {/* Progress rail */}
        <div style={{ padding: "0 10vw", marginBottom: 36 }}>
          <div style={{
            width: "100%", height: 1,
            background: "rgba(255,255,255,0.07)",
            position: "relative",
          }}>
            <motion.div style={{
              position: "absolute", top: 0, left: 0,
              height: "100%", width: lineWidth,
              background: "linear-gradient(90deg, #ef4444, #ffc857, #00d4ff, #00ff88, #bf80ff)",
            }} />
            {/* Year dots on rail */}
            {TIMELINE.map((t, i) => (
              <div key={i} style={{
                position: "absolute",
                left: `${(i / (CARDS - 1)) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 8, height: 8,
                borderRadius: "50%",
                background: t.color,
                boxShadow: `0 0 10px ${t.color}`,
              }} />
            ))}
          </div>
        </div>

        {/* Scrolling track */}
        <div style={{ paddingLeft: "10vw", overflow: "visible" }}>
          <motion.div
            ref={trackRef}
            style={{
              x: smoothX,
              display: "flex",
              gap: GAP,
              width: "max-content",
              alignItems: "stretch",
            }}
          >
            {TIMELINE.map((t, i) => (
              <TimelineCard key={i} t={t} index={i} scrollYProgress={scrollYProgress} total={CARDS} />
            ))}
          </motion.div>
        </div>

        {/* Bottom left scroll label */}
        <div style={{
          position: "absolute", bottom: 32, left: "10vw",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              color: "#374151", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
            }}
          >
            Scroll to navigate
            <div style={{ width: 28, height: 1, background: "linear-gradient(to right, #374151, transparent)" }} />
            →
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Individual timeline card ────────────────────────────────────────────── */
function TimelineCard({ t, index, scrollYProgress, total }) {
  // Each card's "active window" in the scroll range
  const start = index / total;
  const end   = (index + 0.8) / total;

  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1], { clamp: true });
  const y       = useTransform(scrollYProgress, [start, end], [30, 0], { clamp: true });
  const borderOpacity = useTransform(scrollYProgress, [start, end], [0.1, 0.6], { clamp: true });

  return (
    <motion.div
      style={{
        width: 480,
        flexShrink: 0,
        opacity,
        y,
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "#0b0f1c",
          borderRadius: 20,
          border: `1px solid ${t.color}`,
          borderColor: t.color,
          borderOpacity,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.03), 0 20px 60px rgba(0,0,0,0.6)`,
          padding: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient top glow */}
        <div style={{
          position: "absolute", top: -60, left: -60,
          width: 220, height: 220, borderRadius: "50%",
          background: `radial-gradient(circle, ${t.color}14 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Year badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 14px", borderRadius: 100,
          background: `${t.color}12`, border: `1px solid ${t.color}30`,
          width: "fit-content",
        }}>
          <span style={{ fontSize: 18 }}>{t.icon}</span>
          <span style={{
            fontFamily: "monospace", fontSize: 11,
            letterSpacing: "0.15em", fontWeight: 700,
            textTransform: "uppercase", color: t.color,
          }}>
            {t.year} · {t.label}
          </span>
        </div>

        {/* Heading */}
        <h4 style={{
          fontFamily: "'Georgia', serif",
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "#f0f4ff",
          lineHeight: 1.2,
        }}>
          {t.heading}
        </h4>

        {/* Divider */}
        <div style={{
          width: 48, height: 2,
          background: `linear-gradient(90deg, ${t.color}, transparent)`,
          borderRadius: 2,
        }} />

        {/* Body text */}
        <p style={{
          color: "#9ca3af",
          fontSize: 14.5,
          lineHeight: 1.8,
          flex: 1,
        }}>
          {t.body}
        </p>

        {/* Bottom card number */}
        <span style={{
          fontFamily: "monospace",
          fontSize: 42,
          fontWeight: 900,
          color: `${t.color}10`,
          position: "absolute",
          bottom: -8, right: 20,
          lineHeight: 1,
          userSelect: "none",
        }}>
          0{index + 1}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   STATS STRIP — shown after timeline
   ═══════════════════════════════════════════════════════════════════════════ */
function StatsStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { val: "15+",    label: "Years of Experience", color: "#00ff88" },
    { val: "2,000+", label: "Students Trained",    color: "#00d4ff" },
    { val: "500+",   label: "Live Sessions",        color: "#ffc857" },
    { val: "93%",    label: "Student Success Rate", color: "#bf80ff" },
  ];

  return (
    <section
      ref={ref}
      style={{
        background: "#0f1421",
        padding: "80px 10vw",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 40,
        textAlign: "center",
      }}>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <div style={{
              fontFamily: "'Georgia', serif",
              fontSize: "3rem",
              fontWeight: 700,
              color: s.color,
              lineHeight: 1,
              marginBottom: 8,
              textShadow: `0 0 30px ${s.color}40`,
            }}>
              {s.val}
            </div>
            <div style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#6b7280",
              fontFamily: "monospace",
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
function TeamSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const team = [
    { initials: "RK", name: "Rajesh Kumar",   role: "Founder & Lead Mentor",       exp: "15+ yrs", markets: "Equity · Derivatives", color: "#00ff88" },
    { initials: "PA", name: "Priya Anand",    role: "Forex & Macro Strategist",    exp: "12 yrs",  markets: "Forex · Commodities",  color: "#00d4ff" },
    { initials: "SM", name: "Suresh Mani",    role: "Options & Volatility Expert", exp: "10 yrs",  markets: "Options · F&O",        color: "#ffc857" },
  ];

  return (
    <section
      ref={ref}
      style={{ background: "#0a0e1a", padding: "100px 10vw" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 56, textAlign: "center" }}
      >
        <p style={{
          fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "#6b7280", marginBottom: 10,
        }}>
          The Team
        </p>
        <h2 style={{
          fontFamily: "'Georgia', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)",
          fontWeight: 700, color: "#f0f4ff",
        }}>
          Traders Who Teach
        </h2>
      </motion.div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 28,
      }}>
        {team.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12 }}
          >
            <div style={{
              background: "#0b0f1c",
              border: `1px solid ${m.color}20`,
              borderRadius: 16,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              transition: "border-color 0.3s",
            }}>
              {/* Avatar */}
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${m.color}30, ${m.color}08)`,
                border: `2px solid ${m.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 22,
                color: m.color,
              }}>
                {m.initials}
              </div>

              <div>
                <div style={{ fontFamily: "'Georgia', serif", fontSize: "1.15rem", fontWeight: 700, color: "#f0f4ff", marginBottom: 4 }}>
                  {m.name}
                </div>
                <div style={{ fontSize: 12, color: m.color, fontWeight: 600, letterSpacing: "0.04em" }}>
                  {m.role}
                </div>
              </div>

              <div style={{
                display: "flex", gap: 8, flexWrap: "wrap",
              }}>
                {[`${m.exp} experience`, ...m.markets.split(" · ").map(x => x)].map((tag, j) => (
                  <span key={j} style={{
                    padding: "3px 10px", borderRadius: 100,
                    background: `${m.color}0d`, border: `1px solid ${m.color}20`,
                    fontSize: 11, color: "#9ca3af",
                    fontFamily: "monospace", letterSpacing: "0.04em",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE ROOT
   ═══════════════════════════════════════════════════════════════════════════ */
export function About() {
  return (
    <div style={{ background: "#0a0e1a", color: "#f0f4ff", minHeight: "100vh" }}>
      {/* Noise grain */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.35,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
      }} />

      <Header />

      {/* ── 1. Scroll-driven candlestick hero ── */}
      <ScrollCandleHero />

      {/* ── 2. Horizontal timeline ── */}
      <HorizontalTimeline />

      {/* ── 3. Stats ── */}
      <StatsStrip />

      {/* ── 4. Team ── */}
      <TeamSection />

      <Footer />

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius:2px; }
      `}</style>
    </div>
  );
}