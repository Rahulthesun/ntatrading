import { useState, useRef, useEffect } from "react";
import {
  BookOpen, Radio, Users, Award,
  TrendingUp, BarChart2, PiggyBank, Landmark,
  ArrowUpRight, Check, Zap, Shield, Star, ChevronDown,
} from "lucide-react";

declare global { interface Window { gsap: any } }

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    icon: BookOpen,
    title: "Education Course",
    subtitle: "Zero → Hero in 30 days",
    tags: ["Technical Analysis", "Price Action", "NSE / BSE"],
    color: "#a78bfa",
    description:
      "A battle-tested curriculum built for the Indian market. You'll learn what actually works on NSE and BSE today — from candlestick basics to advanced order-flow reading.",
    features: [
      { text: "Candlesticks → advanced price action mastery", hot: true },
      { text: "Market microstructure & order flow reading" },
      { text: "Sector rotation & index correlation" },
      { text: "Risk management & position sizing frameworks", hot: true },
      { text: "Live chart workshops every week" },
      { text: "Lifetime access to recorded sessions" },
    ],
    badge: "Most Popular",
    cta: "Start Learning",
  },
  {
    num: "02",
    icon: Radio,
    title: "Live Market Sessions",
    subtitle: "Trade alongside real mentors",
    tags: ["Daily Briefings", "Live Trades", "Post-Market Review"],
    color: "#60a5fa",
    description:
      "Watch real ₹ positions being opened, managed and closed in live market hours. No simulations. No hindsight trades. Pure, unfiltered execution.",
    features: [
      { text: "Pre-market briefing every day at 9:00 AM IST", hot: true },
      { text: "Live trade execution with full commentary" },
      { text: "Real-time chart markup & entry/exit logic", hot: true },
      { text: "Post-market debrief & trade review" },
      { text: "Full session recording archive" },
    ],
    badge: "Live Every Day",
    cta: "Join Live",
  },
  {
    num: "03",
    icon: Users,
    title: "Mentorship & Support",
    subtitle: "Never trade alone again",
    tags: ["1-on-1 Calls", "Trade Reviews", "Community"],
    color: "#f9a8d4",
    description:
      "Personalised guidance that meets you where you are. Whether you're losing money or scaling up, you'll have a mentor who's been exactly where you are.",
    features: [
      { text: "Bi-weekly 1-on-1 mentor call", hot: true },
      { text: "Trade journal reviews with written feedback" },
      { text: "24/7 community WhatsApp & Discord", hot: true },
      { text: "Psychology & discipline coaching" },
      { text: "Prop firm challenge preparation" },
    ],
    badge: "Lifetime Access",
    cta: "Get Mentored",
  },
  {
    num: "04",
    icon: Award,
    title: "Certification",
    subtitle: "Credentials that open doors",
    tags: ["NSE NCFM", "Mock Exams", "LinkedIn Badge"],
    color: "#c084fc",
    description:
      "NSE-aligned certifications that matter to prop desks, family offices and employers. 93% first-attempt pass rate — we prep you properly, you show up and pass.",
    features: [
      { text: "NSE NCFM module preparation", hot: true },
      { text: "Mock exams with detailed analytics" },
      { text: "93% first-attempt pass rate", hot: true },
      { text: "Verified digital badge for LinkedIn" },
      { text: "Prop firm challenge guidance" },
    ],
    badge: "93% Pass Rate",
    cta: "Get Certified",
  },
  {
    num: "05",
    icon: TrendingUp,
    title: "Wealth Management",
    subtitle: "Grow & protect your capital",
    tags: ["Portfolio Strategy", "SIPs", "Asset Allocation"],
    color: "#86efac",
    description:
      "Move beyond trading. Learn how to build a portfolio that compounds quietly while you sleep — mutual funds, index funds, SIPs, and proper asset allocation.",
    features: [
      { text: "Mutual fund selection & SIP strategies", hot: true },
      { text: "Goal-based financial planning" },
      { text: "Tax-efficient investing frameworks", hot: true },
      { text: "Rebalancing & drawdown protection" },
      { text: "Monthly wealth review sessions" },
    ],
    badge: "New Program",
    cta: "Build Wealth",
  },
];

/* ─────────────────────────────────────────
   ACCORDION ROW
───────────────────────────────────────── */
function ServiceRow({
  s, isOpen, onToggle, isLast,
}: {
  s: typeof SERVICES[0];
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const bodyRef   = useRef<HTMLDivElement>(null);
  const rowRef    = useRef<HTMLDivElement>(null);
  const arrowRef  = useRef<HTMLDivElement>(null);
  const numRef    = useRef<HTMLSpanElement>(null);

  /* GSAP expand/collapse */
  useEffect(() => {
    if (!window.gsap || !bodyRef.current) return;
    const g = window.gsap;
    if (isOpen) {
      g.to(bodyRef.current, { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
      g.to(arrowRef.current, { rotation: 180, duration: 0.35, ease: "power2.out" });
      g.to(numRef.current,   { color: s.color, duration: 0.3 });
    } else {
      g.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.35, ease: "power2.inOut" });
      g.to(arrowRef.current, { rotation: 0, duration: 0.3, ease: "power2.out" });
      g.to(numRef.current,   { color: "rgba(200,170,255,0.25)", duration: 0.3 });
    }
  }, [isOpen, s.color]);

  /* GSAP load */
  const [gsapReady, setGsapReady] = useState(!!window.gsap);
  useEffect(() => {
    if (window.gsap) return;
    const s2 = document.createElement("script");
    s2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    s2.onload = () => setGsapReady(true);
    document.head.appendChild(s2);
  }, []);

  const Icon = s.icon;

  /* hover state */
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={rowRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(160,100,255,0.1)",
        transition: "background 0.3s",
        background: isOpen
          ? "rgba(160,100,255,0.04)"
          : hovered
          ? "rgba(160,100,255,0.02)"
          : "transparent",
        borderRadius: isOpen ? 16 : 0,
      }}
    >
      {/* ── HEADER ROW (clickable) ── */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          padding: "26px 28px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textAlign: "left",
        }}
      >
        {/* number */}
        <span
          ref={numRef}
          style={{
            fontSize: 13,
            fontWeight: 700,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "0.06em",
            color: isOpen ? s.color : "rgba(200,170,255,0.25)",
            flexShrink: 0,
            width: 28,
            transition: "color 0.3s",
            fontFamily: "monospace",
          }}
        >{s.num}</span>

        {/* icon chip */}
        <div style={{
          width: 40, height: 40, borderRadius: 11, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isOpen ? `${s.color}20` : "rgba(160,100,255,0.08)",
          border: `1px solid ${isOpen ? s.color + "35" : "rgba(160,100,255,0.12)"}`,
          transition: "all 0.3s",
        }}>
          <Icon size={17} color={isOpen ? s.color : "rgba(180,140,255,0.45)"} strokeWidth={2.1} />
        </div>

        {/* title block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 20, fontWeight: 800,
              color: isOpen ? "#fff" : "rgba(230,215,255,0.75)",
              letterSpacing: "-0.4px",
              transition: "color 0.3s",
            }}>{s.title}</span>
            {/* badge */}
            <span style={{
              fontSize: 9, fontWeight: 800, letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "3px 9px", borderRadius: 99,
              color: s.color,
              background: `${s.color}18`,
              border: `1px solid ${s.color}28`,
            }}>{s.badge}</span>
          </div>
          <div style={{
            fontSize: 13, color: "rgba(200,170,255,0.4)",
            fontWeight: 500, marginTop: 2,
          }}>{s.subtitle}</div>
        </div>

        {/* tags — only on closed */}
        <div style={{
          display: "flex", gap: 6, flexShrink: 0,
          opacity: isOpen ? 0 : 1, transition: "opacity 0.2s",
        }}>
          {s.tags.map((t, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 600,
              padding: "4px 10px", borderRadius: 99,
              color: "rgba(200,170,255,0.45)",
              background: "rgba(160,100,255,0.07)",
              border: "1px solid rgba(160,100,255,0.1)",
              whiteSpace: "nowrap",
            }}>{t}</span>
          ))}
        </div>

        {/* chevron */}
        <div ref={arrowRef} style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <ChevronDown
            size={18}
            color={isOpen ? s.color : "rgba(160,100,255,0.35)"}
            strokeWidth={2.2}
            style={{ transition: "color 0.3s" }}
          />
        </div>
      </button>

      {/* ── BODY (collapsed) ── */}
      <div
        ref={bodyRef}
        style={{ height: 0, opacity: 0, overflow: "hidden" }}
      >
        <div style={{
          padding: "0 28px 28px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
        }}>

          {/* LEFT: description + tags + cta */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* accent line */}
            <div style={{
              width: 40, height: 2, borderRadius: 99,
              background: `linear-gradient(90deg,${s.color},transparent)`,
            }}/>

            <p style={{
              fontSize: 14, color: "rgba(220,200,255,0.55)",
              lineHeight: 1.75, fontWeight: 500, maxWidth: 400,
            }}>{s.description}</p>

            {/* tag pills */}
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              {s.tags.map((t, i) => (
                <span key={i} style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "5px 13px", borderRadius: 99,
                  color: s.color,
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}25`,
                }}>{t}</span>
              ))}
            </div>

            {/* CTA */}
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 22px", borderRadius: 12, border: "none",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 12, fontWeight: 800, letterSpacing: "0.1em",
              textTransform: "uppercase", cursor: "pointer",
              color: "#0c0020",
              background: `linear-gradient(135deg,${s.color},${s.color}bb)`,
              boxShadow: `0 6px 24px ${s.color}35`,
              alignSelf: "flex-start",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 32px ${s.color}55`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 24px ${s.color}35`;
              }}
            >
              {s.cta}
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* RIGHT: feature checklist */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {s.features.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 11,
                padding: "10px 14px", borderRadius: 10,
                background: f.hot ? `${s.color}0d` : "rgba(255,255,255,0.02)",
                border: `1px solid ${f.hot ? s.color + "22" : "rgba(160,100,255,0.07)"}`,
                transition: "background 0.2s",
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: 6, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: f.hot ? `${s.color}25` : "rgba(160,100,255,0.1)",
                  border: `1px solid ${f.hot ? s.color + "40" : "rgba(160,100,255,0.15)"}`,
                  marginTop: 1,
                }}>
                  <Check size={10} color={f.hot ? s.color : "rgba(160,100,255,0.4)"} strokeWidth={2.8} />
                </div>
                <span style={{
                  fontSize: 13, lineHeight: 1.45,
                  color: f.hot ? "rgba(235,220,255,0.85)" : "rgba(200,170,255,0.4)",
                  fontWeight: f.hot ? 600 : 400,
                }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex(prev => (prev === i ? null : i));

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap" rel="stylesheet" />

      <section style={{
        background: "#06000f",
        padding: "88px 24px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}>

        {/* ambient blobs */}
        <div style={{
          position: "absolute", top: -200, left: -200,
          width: 600, height: 600, pointerEvents: "none",
          background: "radial-gradient(ellipse,#2a0050 0%,transparent 68%)",
          borderRadius: "60% 40% 55% 45%/50% 62% 38% 54%",
          filter: "blur(8px)", opacity: 0.7,
        }} />
        <div style={{
          position: "absolute", bottom: -160, right: -160,
          width: 500, height: 500, pointerEvents: "none",
          background: "radial-gradient(ellipse,#320060 0%,transparent 70%)",
          borderRadius: "42% 58% 48% 52%",
          filter: "blur(8px)", opacity: 0.6,
        }} />
        {/* faint grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.02,
          backgroundImage: "linear-gradient(rgba(160,100,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(160,100,255,1) 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }} />

        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: 1020, margin: "0 auto",
        }}>

          {/* ── HEADER ── */}
          <div style={{ marginBottom: 56 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "5px 14px", borderRadius: 99, marginBottom: 18,
              background: "rgba(160,100,255,0.1)", border: "1px solid rgba(160,100,255,0.2)",
            }}>
              <Star size={10} color="#a78bfa" fill="#a78bfa" />
              <span style={{ color: "rgba(200,160,255,0.8)", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                Our Programs
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
              <h2 style={{
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 900, letterSpacing: "-1.5px",
                lineHeight: 1.05, color: "#fff", margin: 0,
              }}>
                Five ways to become a{" "}
                <span style={{
                  background: "linear-gradient(120deg,#d8b4fe,#a855f7,#7c3aed)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontStyle: "italic",
                }}>
                  better trader.
                </span>
              </h2>
              <p style={{
                fontSize: 13, color: "rgba(200,170,255,0.38)",
                maxWidth: 240, lineHeight: 1.65, fontWeight: 500,
                margin: 0,
              }}>
                Pick one or stack them all. Each program compounds the others.
              </p>
            </div>
          </div>

          {/* ── ACCORDION LIST ── */}
          <div style={{
            borderRadius: 22,
            border: "1px solid rgba(160,100,255,0.14)",
            background: "linear-gradient(160deg,rgba(40,0,80,0.55),rgba(18,0,35,0.6))",
            overflow: "hidden",
            backdropFilter: "blur(12px)",
          }}>
            {/* top shimmer */}
            <div style={{
              height: 1,
              background: "linear-gradient(90deg,transparent,rgba(200,150,255,0.35),transparent)",
            }} />

            {SERVICES.map((s, i) => (
              <ServiceRow
                key={s.num}
                s={s}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
                isLast={i === SERVICES.length - 1}
              />
            ))}
          </div>
        
        </div>

        <style>{`
          * { box-sizing: border-box; }
          button { outline: none; }
        `}</style>
      </section>
    </>
  );
}