import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

/* ══════════════════════════════════════════════════════════════
   DATA — update quotes / names for NTA students
══════════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    id: 1,
    quote: "I tried 3 other courses before NTA. None showed me live trades. Here, my mentor traded ₹2L in front of me on day 1. That changed everything.",
    name: "Rahul Sharma",
    role: "Software Engineer → Full-time Trader",
    avatar: "RS",
    accent: "#a855f7",
  },
  {
    id: 2,
    quote: "Started with zero knowledge. The community support at midnight when I was panicking about a position was unreal. These people actually care.",
    name: "Meera Pillai",
    role: "Homemaker · Chennai",
    avatar: "MP",
    accent: "#c084fc",
  },
  {
    id: 3,
    quote: "The risk management module alone is worth 10x the fee. I used to blow up accounts. Now I've been consistently profitable for 6 weeks straight.",
    name: "Aditya Nair",
    role: "CA Student · Hyderabad",
    avatar: "AN",
    accent: "#7c3aed",
  },
  {
    id: 4,
    quote: "NTA is the only place I've seen mentors share their actual P&L. No fake promises. They said 3–6 months. They were right, and I respect that.",
    name: "Deepa Krishnan",
    role: "Business Owner · Coimbatore",
    avatar: "DK",
    accent: "#a855f7",
  },
  {
    id: 5,
    quote: "The live market sessions are intense in the best way. You're watching a real ₹5L position managed in real-time. Nothing else teaches like this.",
    name: "Siddharth Menon",
    role: "IT Professional · Kochi",
    avatar: "SM",
    accent: "#c084fc",
  },
  {
    id: 6,
    quote: "I was skeptical because I'm not a finance person. But NTA breaks it down — no jargon, just logic and charts. I finally get it after 2 years of trying.",
    name: "Kavitha Rajan",
    role: "Teacher · Madurai",
    avatar: "KR",
    accent: "#7c3aed",
  },
  {
    id: 7,
    quote: "What surprised me most is how honest they are. No guaranteed returns, no magic strategy. Just disciplined trading with proper risk management.",
    name: "Priya Sundaram",
    role: "Nurse · Bangalore",
    avatar: "PS",
    accent: "#a855f7",
  },
  {
    id: 8,
    quote: "My mentor showed me a losing trade on day 3 and explained exactly what went wrong. That kind of transparency is impossible to find anywhere else.",
    name: "Arjun Balaji",
    role: "Graduate Student",
    avatar: "AB",
    accent: "#c084fc",
  },
  {
    id: 9,
    quote: "Within 8 weeks I understood price action better than I did after 2 years of YouTube. The live sessions simply can't be replicated by recordings.",
    name: "Lakshmi Venkat",
    role: "Homemaker · Trichy",
    avatar: "LV",
    accent: "#7c3aed",
  },
];

const ROW1 = [...TESTIMONIALS.slice(0, 5), ...TESTIMONIALS.slice(0, 5)];
const ROW2 = [...TESTIMONIALS.slice(4), ...TESTIMONIALS.slice(4)];

/* ══════════════════════════════════════════════════════════════
   CARD
══════════════════════════════════════════════════════════════ */
function Card({ item }: { item: typeof TESTIMONIALS[0] }) {
  return (
    <div className="relative flex-shrink-0 w-[300px] mx-2.5 rounded-2xl bg-[#0C0420]/70 border border-purple-500/[0.10] backdrop-blur-xl p-5 overflow-hidden">
      {/* top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}60, transparent)` }}
      />

      {/* quote mark */}
      <div
        className="font-serif text-[40px] leading-none mb-1 opacity-30 select-none"
        style={{ color: item.accent }}
      >
        "
      </div>

      {/* quote text */}
      <p className="font-sans text-[13px] font-light text-purple-100/65 leading-[1.75] mb-5">
        {item.quote}
      </p>

      {/* author row */}
      <div className="flex items-center gap-3">
        {/* avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-sans text-[10px] font-bold shrink-0"
          style={{
            background: `linear-gradient(135deg, ${item.accent}30, ${item.accent}10)`,
            border: `1px solid ${item.accent}40`,
            color: item.accent,
          }}
        >
          {item.avatar}
        </div>

        {/* name + role */}
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[12.5px] font-medium text-purple-50/85 leading-none truncate">
            {item.name}
          </p>
          <p className="font-sans text-[10.5px] text-purple-400/38 mt-0.5 truncate">{item.role}</p>
        </div>

        {/* stars */}
        <div className="flex gap-0.5 shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible]       = useState(false);
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const s1 = !visible || row1Paused ? "paused" : "running";
  const s2 = !visible || row2Paused ? "paused" : "running";

  return (
    <>
      <style>{`
        @keyframes marquee-l { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes marquee-r { from{transform:translateX(-50%)} to{transform:translateX(0)} }
        .mq-l { animation: marquee-l 42s linear infinite; will-change: transform; }
        .mq-r { animation: marquee-r 48s linear infinite; will-change: transform; }
      `}</style>

      <section ref={sectionRef} id="reviews" className="relative bg-transparent py-24 px-5 sm:px-6 overflow-hidden">

        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px]"
            style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.05) 0%, transparent 70%)" }} />
        </div>

        {/* top rule — matches Services */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mb-16" />

        {/* ── Header ── */}
        <div className="relative z-10 text-center max-w-5xl mx-auto mb-16">

          {/* rating badge */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2.5 bg-amber-400/[0.06] border border-amber-400/[0.14] rounded-full px-5 py-2 backdrop-blur-sm">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-sans text-[11px] tracking-[0.08em] text-amber-400/75">
                Rated 4.9 / 5 by real students
              </span>
            </div>
          </div>

          {/* headline */}
          <h2
            className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 mb-4"
            style={{ fontSize: "clamp(30px,4vw,52px)" }}
          >
            What our students{" "}
            <span className="text-purple-50">
              say.
            </span>
          </h2>

          <p className="font-sans text-[14px] font-light text-purple-200/40 max-w-[400px] mx-auto leading-[1.75]">
            Real words from real students — shared with permission,
            unedited and unfiltered.
          </p>
        </div>

        {/* ── Marquee rows ── */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* edge fades */}
          <div className="absolute left-0 inset-y-0 w-28 z-20 pointer-events-none bg-gradient-to-r from-[#06010F] to-transparent" />
          <div className="absolute right-0 inset-y-0 w-28 z-20 pointer-events-none bg-gradient-to-l from-[#06010F] to-transparent" />

          {/* Row 1 — left */}
          <div className="overflow-hidden"
            onMouseEnter={() => setRow1Paused(true)}
            onMouseLeave={() => setRow1Paused(false)}>
            <div className="mq-l flex" style={{ animationPlayState: s1 }}>
              {ROW1.map((item, i) => <Card key={`r1-${item.id}-${i}`} item={item} />)}
            </div>
          </div>

          {/* Row 2 — right */}
          <div className="overflow-hidden"
            onMouseEnter={() => setRow2Paused(true)}
            onMouseLeave={() => setRow2Paused(false)}>
            <div className="mq-r flex" style={{ animationPlayState: s2 }}>
              {ROW2.map((item, i) => <Card key={`r2-${item.id}-${i}`} item={item} />)}
            </div>
          </div>
        </div>

        {/* bottom rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mt-16" />
      </section>
    </>
  );
}