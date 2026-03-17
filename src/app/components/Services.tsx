import { useState, useRef, useEffect } from "react";
import {
  BookOpen, Radio, Users, Award, TrendingUp,
  ArrowUpRight, Check, Star, ChevronDown,
} from "lucide-react";

declare global { interface Window { gsap: any } }

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const SERVICES = [
  {
    num: "01",
    icon: BookOpen,
    title: "Education Course",
    subtitle: "Zero to consistent in 30 days",
    tags: ["Technical Analysis", "Price Action", "NSE / BSE"],
    color: "#a78bfa",
    description:
      "A battle-tested curriculum built for the Indian market. Learn what actually works on NSE and BSE today — from candlestick basics to advanced order-flow reading. Every concept is taught with live charts, not slides.",
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
    subtitle: "Trade alongside real mentors, daily",
    tags: ["Daily Briefings", "Live Trades", "Post-Market Review"],
    color: "#60a5fa",
    description:
      "Watch real ₹ positions being opened, managed and closed during live market hours. No simulations. No hindsight. Pure, unfiltered execution — with full commentary on every decision as it happens.",
    features: [
      { text: "Pre-market briefing every day at 9:00 AM IST", hot: true },
      { text: "Live trade execution with real-time commentary" },
      { text: "Chart markup & entry/exit logic explained live", hot: true },
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
    subtitle: "A mentor who's been where you are",
    tags: ["1-on-1 Calls", "Trade Reviews", "Community"],
    color: "#f9a8d4",
    description:
      "Personalised guidance that meets you where you are. Whether you're losing money or scaling up, you'll have a mentor who's already made the mistakes you're about to make — and knows exactly how to fix them.",
    features: [
      { text: "Bi-weekly 1-on-1 mentor call", hot: true },
      { text: "Trade journal reviews with written feedback" },
      { text: "24/7 WhatsApp & Discord community", hot: true },
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
    subtitle: "Credentials that open real doors",
    tags: ["NSE NCFM", "Mock Exams", "LinkedIn Badge"],
    color: "#c084fc",
    description:
      "NSE-aligned certifications that matter to prop desks, family offices and employers. 93% first-attempt pass rate — we prep you properly so you don't walk in unprepared.",
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
    subtitle: "Grow & protect what you've earned",
    tags: ["Portfolio Strategy", "SIPs", "Asset Allocation"],
    color: "#86efac",
    description:
      "Move beyond trading. Build a portfolio that compounds quietly while you sleep — mutual funds, index funds, SIPs, and proper asset allocation designed for Indian tax and market conditions.",
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

/* ══════════════════════════════════════════════════════
   ACCORDION ROW
══════════════════════════════════════════════════════ */
function ServiceRow({
  s, isOpen, onToggle, isLast,
}: {
  s: typeof SERVICES[0];
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
}) {
  const bodyRef  = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLSpanElement>(null);
  const Icon = s.icon;
  const [hovered, setHovered] = useState(false);

  /* load GSAP once */
  useEffect(() => {
    if (window.gsap) return;
    const tag = document.createElement("script");
    tag.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    document.head.appendChild(tag);
  }, []);

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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: isLast ? "none" : "1px solid rgba(160,100,255,0.10)",
        transition: "background 0.3s",
        background: isOpen
          ? "rgba(160,100,255,0.04)"
          : hovered ? "rgba(160,100,255,0.02)" : "transparent",
        borderRadius: isOpen ? 14 : 0,
      }}
    >
      {/* ── HEADER ── */}
      <button
        onClick={onToggle}
        className="w-full text-left"
        style={{
          padding: "20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* number — hidden on very small screens */}
        <span
          ref={numRef}
          className="hidden sm:block"
          style={{
            fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
            fontVariantNumeric: "tabular-nums",
            color: isOpen ? s.color : "rgba(200,170,255,0.25)",
            flexShrink: 0, width: 24,
            transition: "color 0.3s", fontFamily: "monospace",
          }}
        >{s.num}</span>

        {/* icon */}
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isOpen ? `${s.color}20` : "rgba(160,100,255,0.08)",
          border: `1px solid ${isOpen ? s.color + "35" : "rgba(160,100,255,0.12)"}`,
          transition: "all 0.3s",
        }}>
          <Icon size={16} color={isOpen ? s.color : "rgba(180,140,255,0.45)"} strokeWidth={2.1} />
        </div>

        {/* title block */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: "clamp(15px,2.5vw,19px)",
              fontWeight: 700,
              color: isOpen ? "#fff" : "rgba(230,215,255,0.75)",
              letterSpacing: "-0.3px",
              transition: "color 0.3s",
              fontFamily: "'DM Serif Display', serif",
            }}>{s.title}</span>
            <span style={{
              fontSize: 8, fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "3px 8px", borderRadius: 99,
              color: s.color,
              background: `${s.color}18`,
              border: `1px solid ${s.color}28`,
              whiteSpace: "nowrap",
            }}>{s.badge}</span>
          </div>
          <div style={{
            fontSize: 12, color: "rgba(200,170,255,0.38)",
            fontWeight: 400, marginTop: 2,
            fontFamily: "'DM Sans', sans-serif",
          }}>{s.subtitle}</div>
        </div>

        {/* tags — desktop only */}
        <div
          className="hidden md:flex"
          style={{ gap: 6, flexShrink: 0, opacity: isOpen ? 0 : 1, transition: "opacity 0.2s" }}
        >
          {s.tags.map((t, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 600,
              padding: "4px 10px", borderRadius: 99,
              color: "rgba(200,170,255,0.45)",
              background: "rgba(160,100,255,0.07)",
              border: "1px solid rgba(160,100,255,0.10)",
              whiteSpace: "nowrap",
            }}>{t}</span>
          ))}
        </div>

        {/* chevron */}
        <div ref={arrowRef} style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>
          <ChevronDown
            size={17}
            color={isOpen ? s.color : "rgba(160,100,255,0.35)"}
            strokeWidth={2.2}
            style={{ transition: "color 0.3s" }}
          />
        </div>
      </button>

      {/* ── BODY ── */}
      <div ref={bodyRef} style={{ height: 0, opacity: 0, overflow: "hidden" }}>
        {/*
          Mobile: single column stack
          md+: two-column side-by-side
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ padding: "0 16px 24px", gap: 24 }}
        >
          {/* LEFT: description + tags + cta */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{
              width: 36, height: 2, borderRadius: 99,
              background: `linear-gradient(90deg,${s.color},transparent)`,
            }} />

            <p style={{
              fontSize: 13, color: "rgba(220,200,255,0.52)",
              lineHeight: 1.8, fontWeight: 400,
              fontFamily: "'DM Sans', sans-serif",
              margin: 0,
            }}>{s.description}</p>

            {/* tag pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {s.tags.map((t, i) => (
                <span key={i} style={{
                  fontSize: 9, fontWeight: 700, letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  padding: "4px 11px", borderRadius: 99,
                  color: s.color,
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}25`,
                }}>{t}</span>
              ))}
            </div>

            {/* CTA */}
            <button
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "11px 20px", borderRadius: 10, border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.10em",
                textTransform: "uppercase", cursor: "pointer",
                color: "#0c0020",
                background: `linear-gradient(135deg,${s.color},${s.color}bb)`,
                boxShadow: `0 4px 20px ${s.color}35`,
                alignSelf: "flex-start",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${s.color}50`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${s.color}35`;
              }}
            >
              {s.cta}
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </button>
          </div>

          {/* RIGHT: feature checklist */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {s.features.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "9px 12px", borderRadius: 9,
                background: f.hot ? `${s.color}0d` : "rgba(255,255,255,0.02)",
                border: `1px solid ${f.hot ? s.color + "22" : "rgba(160,100,255,0.07)"}`,
              }}>
                <div style={{
                  width: 17, height: 17, borderRadius: 5, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: f.hot ? `${s.color}25` : "rgba(160,100,255,0.10)",
                  border: `1px solid ${f.hot ? s.color + "40" : "rgba(160,100,255,0.15)"}`,
                  marginTop: 1,
                }}>
                  <Check size={9} color={f.hot ? s.color : "rgba(160,100,255,0.4)"} strokeWidth={2.8} />
                </div>
                <span style={{
                  fontSize: 12.5, lineHeight: 1.5,
                  color: f.hot ? "rgba(235,220,255,0.85)" : "rgba(200,170,255,0.40)",
                  fontWeight: f.hot ? 600 : 400,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <section
      className="relative overflow-hidden bg-[#06010F] py-24 px-5 sm:px-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ambient blobs */}
      <div style={{
        position: "absolute", top: -160, left: -160, width: 500, height: 500,
        background: "radial-gradient(ellipse,#2a0050 0%,transparent 68%)",
        borderRadius: "60% 40% 55% 45%/50% 62% 38% 54%",
        filter: "blur(10px)", opacity: 0.6, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -120, right: -120, width: 420, height: 420,
        background: "radial-gradient(ellipse,#320060 0%,transparent 70%)",
        borderRadius: "42% 58% 48% 52%",
        filter: "blur(10px)", opacity: 0.5, pointerEvents: "none",
      }} />
      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.018,
        backgroundImage: "linear-gradient(rgba(160,100,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(160,100,255,1) 1px,transparent 1px)",
        backgroundSize: "54px 54px",
      }} />

      {/* top rule — matches testimonials */}
      <div className="w-full h-px mb-16"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,132,252,0.11),transparent)" }} />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <div className="mb-12 sm:mb-14">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5"
            style={{
              padding: "5px 14px", borderRadius: 99,
              background: "rgba(160,100,255,0.10)",
              border: "1px solid rgba(160,100,255,0.20)",
            }}>
            <Star size={9} color="#a78bfa" fill="#a78bfa" />
            <span style={{
              color: "rgba(200,160,255,0.80)", fontSize: 9,
              fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}>Our Programs</span>
          </div>

          {/* heading + sub — stack on mobile, side-by-side on md+ */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              style={{
                fontSize: "clamp(28px,5vw,50px)",
                fontFamily: "'DM Serif Display', serif",
                fontWeight: 400,
                letterSpacing: "-0.8px",
                lineHeight: 1.06,
                color: "#fff",
                margin: 0,
              }}
            >
              Five ways to become a{" "}
              <span
                className="font-serif italic inline-block px-1"
                style={{
                  backgroundImage: "linear-gradient(135deg,#d8b4fe 0%,#a855f7 55%,#c084fc 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                better trader.
              </span>
            </h2>
            <p style={{
              fontSize: 12.5,
              color: "rgba(200,170,255,0.36)",
              maxWidth: 220,
              lineHeight: 1.7,
              fontWeight: 400,
              margin: 0,
              fontFamily: "'DM Sans', sans-serif",
              flexShrink: 0,
            }}>
              Pick one or stack them all.
              Each program compounds the others.
            </p>
          </div>
        </div>

        {/* ── ACCORDION ── */}
        <div style={{
          borderRadius: 18,
          border: "1px solid rgba(160,100,255,0.13)",
          background: "linear-gradient(160deg,rgba(36,0,72,0.55),rgba(16,0,30,0.60))",
          overflow: "hidden",
          backdropFilter: "blur(14px)",
        }}>
          {/* shimmer line */}
          <div style={{
            height: 1,
            background: "linear-gradient(90deg,transparent,rgba(200,150,255,0.30),transparent)",
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

      {/* bottom rule — matches Testimonials */}
      <div className="w-full h-px mt-16"
        style={{ background: "linear-gradient(90deg,transparent,rgba(196,132,252,0.11),transparent)" }} />
    </section>
  );
}