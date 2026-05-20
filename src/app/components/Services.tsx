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
    title: "Real-Time Market Learning",
    subtitle: "Learn directly from live market conditions",
    tags: ["Live Charts", "Market Analysis", "Practical Learning"],
    color: "#a78bfa",
    description:
      "Learn trading and investing through real-time market observations, practical examples, and hands-on guidance. Instead of theory-heavy learning, students gain exposure to actual market behavior and decision-making.",
    features: [
      { text: "Live market observation sessions", hot: true },
      { text: "Real-time chart analysis & breakdowns" },
      { text: "Practical learning through market examples", hot: true },
      { text: "Daily market insights & understanding" },
      { text: "Hands-on exposure to trading concepts" },
      { text: "Interactive Q&A sessions" },
    ],
    badge: "Live Learning",
    cta: "Start Learning",
  },

  {
    num: "02",
    icon: Radio,
    title: "Practical-Oriented Training",
    subtitle: "Focused on skills that work in real markets",
    tags: ["Hands-On", "Market Practice", "Real Scenarios"],
    color: "#60a5fa",
    description:
      "A practical-first approach designed to help students understand market behavior through examples, case studies, and real trading environments. Learn concepts with clarity and confidence.",
    features: [
      { text: "Practical market-based training", hot: true },
      { text: "Real-world trading examples" },
      { text: "Case-study driven learning", hot: true },
      { text: "Application-focused sessions" },
      { text: "Industry-oriented concepts & frameworks" },
    ],
    badge: "Practical Focus",
    cta: "Explore Training",
  },

  {
    num: "03",
    icon: Users,
    title: "Personalized Mentorship",
    subtitle: "Guidance designed around your learning journey",
    tags: ["Mentorship", "Support", "Growth"],
    color: "#f9a8d4",
    description:
      "Every learner progresses differently. Our personalized mentorship ensures students receive the right guidance, support, and clarity to build confidence in financial markets at their own pace.",
    features: [
      { text: "One-on-one mentorship guidance", hot: true },
      { text: "Beginner-friendly support system" },
      { text: "Individual learning assistance", hot: true },
      { text: "Doubt-clearing sessions" },
      { text: "Growth-focused mentoring approach" },
      { text: "Continuous performance guidance" },
    ],
    badge: "Personal Support",
    cta: "Get Mentored",
  },

  {
    num: "04",
    icon: Award,
    title: "Structured Learning Modules",
    subtitle: "Step-by-step financial market education",
    tags: ["Beginner Friendly", "Structured Learning", "Flexible"],
    color: "#c084fc",
    description:
      "A carefully designed curriculum that simplifies financial market education for beginners while maintaining industry relevance. Learn systematically through structured modules and guided sessions.",
    features: [
      { text: "Beginner-friendly learning approach", hot: true },
      { text: "Step-by-step structured curriculum" },
      { text: "Industry-oriented financial education", hot: true },
      { text: "Easy-to-follow learning modules" },
      { text: "Flexible online & offline sessions" },
      { text: "Clear concept-based progression" },
    ],
    badge: "Beginner Friendly",
    cta: "Start Journey",
  },

  {
    num: "05",
    icon: TrendingUp,
    title: "Lifetime Learning Support",
    subtitle: "Learning that continues beyond the classroom",
    tags: ["Lifetime Access", "Community", "Support"],
    color: "#86efac",
    description:
      "Financial learning is a continuous journey. Students receive ongoing support, updated learning opportunities, and long-term guidance to stay informed and confident in evolving markets.",
    features: [
      { text: "Lifetime learning assistance", hot: true },
      { text: "Continuous mentor support" },
      { text: "Access to updated learning sessions", hot: true },
      { text: "Long-term student guidance" },
      { text: "Supportive learner community" },
    ],
    badge: "Lifetime Support",
    cta: "Join Community",
  },

  {
    num: "06",
    icon: Users,
    title: "Women Financial Empowerment Programs",
    subtitle: "Building confidence & financial independence",
    tags: ["Women Investors", "Financial Freedom", "Special Sessions"],
    color: "#fca5a5",
    description:
      "Specially designed financial education programs to empower women with practical knowledge, confidence, and financial independence. Tailored sessions make investing and financial literacy accessible for every stage of life.",
    features: [
      { text: "Special sessions for women investors", hot: true },
      { text: "Financial awareness for homemakers" },
      { text: "Programs for working professionals", hot: true },
      { text: "Financial independence education" },
      { text: "Beginner-friendly investment guidance" },
      { text: "Supportive learning environment" },
    ],
    badge: "Women Empowerment",
    cta: "Learn More",
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