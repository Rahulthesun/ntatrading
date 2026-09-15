import { useEffect, useRef, useState, useCallback } from "react";

/* ── Global CSS injected once into <head> ─────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=JetBrains+Mono:wght@300;400&display=swap');

  @keyframes ae-breathe {
    0%,100%{ transform:translate(-50%,-50%) scale(1);    opacity:.7; }
    50%    { transform:translate(-50%,-50%) scale(1.15); opacity:1;  }
  }
  @keyframes ae-fade-up {
    from{ opacity:0; transform:translateY(14px); }
    to  { opacity:1; transform:translateY(0);    }
  }
  @keyframes ae-fade-in  { from{opacity:0} to{opacity:1} }
  @keyframes ae-c-enter  {
    from{ opacity:0; transform:translateY(28px) scaleY(.3); }
    to  { opacity:1; transform:translateY(0)    scaleY(1);  }
  }
  @keyframes ae-marquee  {
    from{ transform:translateX(0); }
    to  { transform:translateX(-50%); }
  }
  @keyframes ae-page-out { to{ opacity:0; transform:scale(1.04); } }
  @keyframes ae-dot-pulse {
    0%,100%{ opacity:1; r:4; }
    50%    { opacity:.5; r:6; }
  }
`;

function injectCSS() {
  if (document.getElementById("ae-styles")) return;
  const s = document.createElement("style");
  s.id = "ae-styles";
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const STATUSES = [
  "Connecting to live market data...",
  "Loading technical indicators...",
  "Calibrating risk frameworks...",
  "Syncing trading algorithms...",
  "Markets ready. Welcome, Trader.",
];

const TICKERS = [
  { sym:"NIFTY50", val:"▲ 22,456 +1.24%", up:true  },
  { sym:"EUR/USD", val:"▲ 1.0842 +0.31%", up:true  },
  { sym:"BTC/USD", val:"▲ 68,420 +2.14%", up:true  },
  { sym:"GOLD",    val:"▲ 2,341 +0.55%",  up:true  },
  { sym:"GBP/USD", val:"▼ 1.2634 -0.12%", up:false },
  { sym:"ETH/USD", val:"▲ 3,892 +1.67%",  up:true  },
  { sym:"SENSEX",  val:"▲ 73,961 +0.89%", up:true  },
  { sym:"USD/JPY", val:"▼ 151.82 -0.08%", up:false },
];

const CANDLES = [
  { id:"c1", color:"#ef4444", wickTopY:14, bodyY:28, bodyH:72, wickBotY:118,
    finalBodyY:51, finalBodyH:38, finalWickTop2:44,  enterDelay:0.1,  tDelay:1400, tDur:600 },
  { id:"c2", color:"#ef4444", wickTopY:50, bodyY:63, bodyH:32, wickBotY:108,
    finalBodyY:67, finalBodyH:5,  finalColor:"#94a3b8", finalWickTop2:null, enterDelay:0.35, tDelay:1700, tDur:500 },
  { id:"c3", color:"#10b981", wickTopY:60, bodyY:72, bodyH:28, wickBotY:112,
    finalBodyY:35, finalBodyH:60, finalWickTop2:28,  enterDelay:0.6,  tDelay:2000, tDur:600 },
  { id:"c4", color:"#10b981", wickTopY:40, bodyY:56, bodyH:50, wickBotY:118,
    finalBodyY:10, finalBodyH:100,finalWickTop2:4,   enterDelay:0.85, tDelay:2300, tDur:700 },
];

/* ── Easing ─────────────────────────────────────────────────────────────────── */
const eio = p => p < 0.5 ? 2*p*p : -1+(4-2*p)*p;

/* ── TrendLine ──────────────────────────────────────────────────────────────── */
function TrendLine({ active }) {
  const pathRef = useRef(null);
  const dotRef  = useRef(null);
  const raf     = useRef(null);

  useEffect(() => {
    if (!active || !pathRef.current || !dotRef.current) return;
    const path  = pathRef.current;
    const dot   = dotRef.current;
    const total = path.getTotalLength();
    const DUR   = 900;
    let t0 = null;
    dot.style.opacity = "1";
    function step(ts) {
      if (!t0) t0 = ts;
      const ep = eio(Math.min((ts - t0) / DUR, 1));
      const pt = path.getPointAtLength(ep * total);
      dot.setAttribute("cx", String(pt.x));
      dot.setAttribute("cy", String(pt.y));
      if (ep < 1) raf.current = requestAnimationFrame(step);
    }
    raf.current = requestAnimationFrame(step);
    return () => raf.current && cancelAnimationFrame(raf.current);
  }, [active]);

  return (
    <svg viewBox="0 0 244 140" preserveAspectRatio="none"
      style={{ position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none" }}>
      <defs>
        <filter id="ae-fg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="ae-fd" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path ref={pathRef}
        d="M 14,90 C 50,80 80,74 98,74 C 120,74 144,56 160,56 C 182,56 210,22 230,22"
        fill="none" stroke="#c9a227" strokeWidth="1.5" strokeLinecap="round"
        filter="url(#ae-fg)"
        style={{
          strokeDasharray: 260, strokeDashoffset: active ? 0 : 260,
          transition: active ? "stroke-dashoffset 0.9s cubic-bezier(.5,0,.5,1)" : "none",
        }}
      />
      <circle ref={dotRef} cx="14" cy="90" r="4" fill="#f0c040" filter="url(#ae-fd)"
        style={{ opacity:0, animation: active ? "ae-dot-pulse 1.2s ease-in-out infinite" : "none" }}
      />
    </svg>
  );
}

/* ── Single Candle ──────────────────────────────────────────────────────────── */
function Candle({ data, transform }) {
  const { color, wickTopY, bodyY, bodyH, wickBotY,
    finalBodyY, finalBodyH, finalColor, finalWickTop2,
    enterDelay, tDelay, tDur } = data;

  const [bs, setBs] = useState({ y: bodyY, h: bodyH, col: color });
  const raf = useRef(null);
  const t   = useRef(null);

  useEffect(() => {
    if (!transform) return;
    const endY = finalBodyY ?? bodyY;
    const endH = finalBodyH ?? bodyH;
    let t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      const p  = Math.min((ts - t0) / tDur, 1);
      const ep = eio(p);
      setBs({
        y:   bodyY  + (endY  - bodyY)  * ep,
        h:   bodyH  + (endH  - bodyH)  * ep,
        col: p >= 1 && finalColor ? finalColor : color,
      });
      if (p < 1) raf.current = requestAnimationFrame(step);
    }
    t.current = setTimeout(() => { raf.current = requestAnimationFrame(step); }, tDelay);
    return () => { clearTimeout(t.current); raf.current && cancelAnimationFrame(raf.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transform]);

  const isC4   = data.id === "c4";
  const glowT  = (tDelay + tDur) / 1000;
  const bodyStyle = isC4 && transform
    ? { filter:"drop-shadow(0 0 14px rgba(16,185,129,.7))", transition:`filter 0.8s ${glowT}s ease` }
    : {};

  return (
    <div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"flex-end", height:140, width:28, position:"relative", flexShrink:0,
      animation:`ae-c-enter 0.5s ${enterDelay}s cubic-bezier(.34,1.56,.64,1) both`,
    }}>
      <svg width={28} height={140} viewBox="0 0 28 140" overflow="visible">
        <line x1={14} y1={wickTopY}        x2={14} y2={bs.y}
          stroke={bs.col} strokeWidth={2} strokeLinecap="round" />
        <rect x={4} y={bs.y} width={20} height={Math.max(bs.h, 2)}
          rx={3} ry={3} fill={bs.col} style={bodyStyle} />
        <line x1={14} y1={bs.y + bs.h}    x2={14} y2={wickBotY}
          stroke={bs.col} strokeWidth={2} strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Progress hook ──────────────────────────────────────────────────────────── */
function useProgress(active) {
  const [pct, setPct]           = useState(0);
  const [sidx, setSidx]         = useState(0);
  useEffect(() => {
    if (!active) return;
    let v = 0;
    const id = setInterval(() => {
      if      (v < 38)  v += 1.2;
      else if (v < 71)  v += 1.0;
      else if (v < 91)  v += 0.6;
      else if (v < 100) v += 0.25;
      else { v = 100; clearInterval(id); }
      const s = Math.min(100, Math.round(v));
      setPct(s);
      setSidx(Math.min(STATUSES.length-1, Math.floor((s/100)*(STATUSES.length-0.01))));
    }, 28);
    return () => clearInterval(id);
  }, [active]);
  return { pct, sidx };
}

/* ── Root Loader Component ──────────────────────────────────────────────────── */
export default function Loader({ onComplete, loop = true, duration = 7200 }) {
  const [phase,       setPhase]       = useState(0);
  const [trendActive, setTrendActive] = useState(false);
  const [exiting,     setExiting]     = useState(false);
  const [key,         setKey]         = useState(0);  // force remount on loop

  const { pct, sidx } = useProgress(phase >= 2);

  // Status cross-fade
  const [shownStatus, setShownStatus] = useState(STATUSES[0]);
  const [sFade,       setSFade]       = useState(1);
  const prevSidx = useRef(0);

  useEffect(() => {
    if (sidx !== prevSidx.current) {
      setSFade(0);
      const t = setTimeout(() => {
        setShownStatus(STATUSES[sidx]);
        setSFade(1);
        prevSidx.current = sidx;
      }, 200);
      return () => clearTimeout(t);
    }
  }, [sidx]);

  useEffect(() => { injectCSS(); }, []);

  const reset = useCallback(() => {
    setPhase(0); setTrendActive(false); setExiting(false);
    prevSidx.current = 0;
    setShownStatus(STATUSES[0]); setSFade(1);
    setKey(k => k + 1);
  }, []);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1),           1400),
      setTimeout(() => setTrendActive(true),  3100),
      setTimeout(() => setPhase(2),           3800),
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          onComplete?.();
          if (loop) setTimeout(reset, 400);
        }, 700);
      }, duration),
    ];
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration, loop]);

  const ui = phase >= 2;

  return (
    <div key={key} style={{
      position:"fixed", inset:0, zIndex:9999,
      background:"#020409",
      display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column",
      fontFamily:"'JetBrains Mono', monospace",
      overflow:"hidden",
      animation: exiting ? "ae-page-out 0.7s ease forwards" : "none",
    }}>

      {/* Radial glow */}
      <div style={{
        position:"absolute", width:700, height:700, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(201,162,39,.07) 0%,transparent 65%)",
        top:"50%", left:"50%",
        animation:"ae-breathe 4s ease-in-out infinite",
        pointerEvents:"none",
      }}/>

      {/* Grid */}
      <div style={{
        position:"absolute", inset:0, opacity:.18, pointerEvents:"none",
        backgroundImage:
          "linear-gradient(to right,rgba(26,58,110,.6) 1px,transparent 1px)," +
          "linear-gradient(to bottom,rgba(26,58,110,.6) 1px,transparent 1px)",
        backgroundSize:"60px 60px",
      }}/>

      {/* Noise grain */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none", zIndex:50, opacity:.4,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
      }}/>

      {/* Corner brackets */}
      {[
        { top:28,    left:28,  borderTop:"1px solid #c9a227",    borderLeft:"1px solid #c9a227"   },
        { top:28,    right:28, borderTop:"1px solid #c9a227",    borderRight:"1px solid #c9a227"  },
        { bottom:28, left:28,  borderBottom:"1px solid #c9a227", borderLeft:"1px solid #c9a227"   },
        { bottom:28, right:28, borderBottom:"1px solid #c9a227", borderRight:"1px solid #c9a227"  },
      ].map((s,i) => (
        <div key={i} style={{ position:"absolute", width:60, height:60, opacity:.3, ...s }}/>
      ))}

      {/* ── CANDLES + TREND LINE ── */}
      <div style={{
        display:"flex", alignItems:"flex-end", gap:18,
        height:140, marginBottom:44, position:"relative",
      }}>
        {CANDLES.map(c => <Candle key={c.id} data={c} transform={phase >= 1}/>)}
        <TrendLine active={trendActive}/>
      </div>

      {/* ── logo1 ── */}
      <div style={{
        display:"flex", alignItems:"center", gap:12, marginBottom:28,
        opacity:0,
        animation: ui ? "ae-fade-up .7s .1s ease both" : "none",
      }}>
        <div style={{
          width:42, height:42, borderRadius:10,
          background:"linear-gradient(135deg,#c9a227,#f0c040)",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontFamily:"'Cinzel',serif", fontSize:20, fontWeight:900,
          color:"#020409",
          boxShadow:"0 0 24px rgba(151, 45, 232, 0.35)",
        }}>NTA</div>
        <span style={{
          fontFamily:"'Cinzel',serif", fontSize:"1.35rem",
          fontWeight:700, color:"#f0f4ff", letterSpacing:"0.06em",
        }}>
          Namma<span style={{ color:"#820cc2" }}>Trading</span>
        </span>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div style={{
        width:220, opacity:0,
        animation: ui ? "ae-fade-up .6s .2s ease both" : "none",
      }}>
        <div style={{
          width:"100%", height:3, background:"rgba(255,255,255,.08)",
          borderRadius:10, overflow:"hidden", marginBottom:10,
        }}>
          <div style={{
            height:"100%", width:`${pct}%`,
            background:"linear-gradient(90deg,#c9a227,#f0c040)",
            borderRadius:10, boxShadow:"0 0 10px rgba(201,162,39,.6)",
            transition:"width .12s linear",
          }}/>
        </div>
        <div style={{
          textAlign:"center", fontSize:"0.65rem", color:"#94a3b8",
          letterSpacing:"0.12em", textTransform:"uppercase",
        }}>
          Initializing Markets &nbsp;·&nbsp;{" "}
          <span style={{ color:"#f0c040" }}>{pct}%</span>
        </div>
      </div>

      {/* ── STATUS TEXT ── */}
      <div style={{
        marginTop:18, fontSize:"0.62rem", letterSpacing:"0.16em",
        textTransform:"uppercase", minHeight:"1em",
        color:"rgba(148,163,184,.45)",
        opacity: ui ? sFade * 0.45 : 0,
        transition:"opacity .3s ease",
        animation: ui ? "ae-fade-up .6s .3s ease both" : "none",
      }}>
        {shownStatus}
      </div>

      {/* ── TICKER MARQUEE ── */}
      <div style={{
        position:"absolute", bottom:0, left:0, right:0, height:32,
        background:"rgba(6,13,26,.85)",
        borderTop:"1px solid rgba(201,162,39,.15)",
        display:"flex", alignItems:"center", overflow:"hidden",
        fontSize:"0.65rem", letterSpacing:"0.06em", color:"rgba(148,163,184,.5)",
        opacity:0,
        animation: ui ? "ae-fade-in .6s .5s ease both" : "none",
      }}>
        <div style={{
          display:"flex", whiteSpace:"nowrap",
          animation:"ae-marquee 18s linear infinite",
        }}>
          {[...TICKERS,...TICKERS].map(({ sym, val, up }, i) => (
            <span key={i} style={{ padding:"0 2rem" }}>
              {sym}&nbsp;
              <span style={{ color: up ? "rgba(16,185,129,.6)" : "rgba(239,68,68,.6)" }}>
                {val}
              </span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}