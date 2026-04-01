import { useState, useRef, useEffect } from "react";
import {
  BookOpen, Radio, Users, Award, TrendingUp,
  ArrowUpRight, Check, ChevronDown,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

declare global { interface Window { gsap: any } }

/* DATA */
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

/* ROW */
function ServiceRow({ s, isOpen, onToggle, isLast }: any) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const Icon = s.icon;
  const [hovered, setHovered] = useState(false);

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
      g.to(bodyRef.current, { height: "auto", opacity: 1, duration: 0.45 });
      g.to(arrowRef.current, { rotation: 180, duration: 0.35 });
      g.to(numRef.current, { color: s.color, duration: 0.3 });
    } else {
      g.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.35 });
      g.to(arrowRef.current, { rotation: 0, duration: 0.3 });
      g.to(numRef.current, { color: "rgba(200,170,255,0.25)", duration: 0.3 });
    }
  }, [isOpen]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        transition-all duration-300
        ${!isLast ? "border-b border-purple-400/10" : ""}
        ${isOpen ? "bg-purple-500/5 rounded-[14px]" : ""}
        ${!isOpen && hovered ? "bg-purple-500/5" : ""}
      `}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-5 text-left font-[DM_Sans]"
      >
        <span
          ref={numRef}
          className="hidden sm:block w-6 text-[12px] font-bold tracking-[0.06em] font-mono"
          style={{ color: isOpen ? s.color : "rgba(200,170,255,0.25)" }}
        >
          {s.num}
        </span>

        <div
          className="w-9 h-9 rounded-[10px] flex items-center justify-center"
          style={{
            background: isOpen ? `${s.color}20` : "rgba(160,100,255,0.08)",
            border: `1px solid ${isOpen ? s.color + "35" : "rgba(160,100,255,0.12)"}`,
          }}
        >
          <Icon size={16} color={isOpen ? s.color : "rgba(180,140,255,0.45)"} />
        </div>

        <div className="flex-1">
          <div className="flex gap-2 flex-wrap items-center">
            <span className={`text-[17px] font-semibold ${isOpen ? "text-white" : "text-purple-200/80"}`}>
              {s.title}
            </span>

            <span
              className="text-[8px] font-extrabold px-2 py-[3px] rounded-full uppercase"
              style={{
                color: s.color,
                background: `${s.color}18`,
                border: `1px solid ${s.color}28`,
              }}
            >
              {s.badge}
            </span>
          </div>

          <div className="text-[12px] text-purple-300/40 mt-0.5">
            {s.subtitle}
          </div>
        </div>

        <div ref={arrowRef}>
          <ChevronDown size={17} color={isOpen ? s.color : "rgba(160,100,255,0.35)"} />
        </div>
      </button>

      <div ref={bodyRef} className="h-0 opacity-0 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 px-4 pb-6">

          <div className="flex flex-col gap-4">
            <div
              className="w-9 h-[2px] rounded-full"
              style={{ background: `linear-gradient(90deg,${s.color},transparent)` }}
            />

            {/* readability FIX */}
            <p className="text-[14px] text-purple-100/70 leading-[1.9] tracking-[0.2px]">
              {s.description}
            </p>

            <HashLink
              smooth
              to="/articles#contact"
              scroll={
                (el) => {
                  setTimeout(() => {
                     el.scrollIntoView({behaviour:"smooth" , block: "start"})
                  } , 150)
                }
                 
              }
            >
              <button
              className="inline-flex items-center gap-2 px-5 py-[11px] rounded-[10px] text-[11px] font-bold uppercase"
              style={{
                background: `linear-gradient(135deg,${s.color},${s.color}bb)`,
                color: "#0c0020",
              }}
            >
              {s.cta}
              <ArrowUpRight size={13} />
            </button>
            </HashLink>
            
          </div>

          <div className="flex flex-col gap-2">
            {s.features.map((f, i) => (
              <div key={i} className="flex gap-2 px-3 py-2 rounded-[9px]">
                <Check size={12} color={s.color} />
                <span className="text-[13px] text-purple-200/70">{f.text}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* MAIN */
export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-5 font-[DM_Sans]">

      {/* FIXED BACKGROUND PANEL */}
      <div className="
        rounded-[18px]
        border border-purple-400/20
        bg-[linear-gradient(160deg,rgba(36,0,72,0.55),rgba(16,0,30,0.60))]
        backdrop-blur-[14px]
        overflow-hidden
      ">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-300/30 to-transparent" />

        {SERVICES.map((s, i) => (
          <ServiceRow
            key={i}
            s={s}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            isLast={i === SERVICES.length - 1}
          />
        ))}
      </div>

    </section>
  );
}