import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/* ══════════════════════════════════════
   DATA
══════════════════════════════════════ */
const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    initials: "RS",
    location: "Bangalore",
    role: "Software Engineer → Full-time Trader",
    text: "I tried 3 other courses before NTA. None of them showed me live trades. Here, my mentor traded ₹2L in front of me on day 1. That changed everything. No scripts, no theory — just real decisions in real time.",
    rating: 5,
    avatarHue: "from-violet-600 to-purple-500",
    badge: "F&O Specialist",
  },
  {
    name: "Meera Pillai",
    initials: "MP",
    location: "Chennai",
    role: "Homemaker",
    text: "Started with zero knowledge. The community support at midnight when I was panicking about a position was unreal. These people actually care whether you succeed — that's rare.",
    rating: 5,
    avatarHue: "from-purple-500 to-violet-400",
    badge: "Equity Trader",
  },
  {
    name: "Aditya Nair",
    initials: "AN",
    location: "Hyderabad",
    role: "CA Student",
    text: "The risk management module alone is worth 10x the fee. I used to blow up accounts. Now I've been consistently profitable for 6 weeks straight. The shift was in my mindset, not just strategy.",
    rating: 5,
    avatarHue: "from-fuchsia-600 to-purple-500",
    badge: undefined,
  },
  {
    name: "Deepa Krishnan",
    initials: "DK",
    location: "Coimbatore",
    role: "Business Owner",
    text: "NTA is the only place I've seen mentors share their actual P&L. No fake promises. They said it takes 3–6 months to be consistent — they were right, and I respect that honesty more than any guarantee.",
    rating: 5,
    avatarHue: "from-violet-700 to-purple-400",
    badge: "Options Writer",
  },
  {
    name: "Siddharth Menon",
    initials: "SM",
    location: "Kochi",
    role: "IT Professional",
    text: "The live market sessions are intense in the best way. You're watching a real position being managed in real-time. You learn more in one session than a week of recorded videos.",
    rating: 5,
    avatarHue: "from-purple-600 to-fuchsia-500",
    badge: undefined,
  },
  {
    name: "Kavitha Rajan",
    initials: "KR",
    location: "Madurai",
    role: "Teacher",
    text: "I was skeptical because I'm not a finance person. But the way NTA breaks down concepts — no jargon, just logic and charts — I finally understand after 2 years of trying other resources.",
    rating: 4,
    avatarHue: "from-violet-500 to-purple-600",
    badge: "Swing Trader",
  },
];

/* ══════════════════════════════════════
   STAR RATING
══════════════════════════════════════ */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < n ? "fill-amber-400 text-amber-400" : "text-white/10"}`}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   FEATURED CARD (large, centre)
══════════════════════════════════════ */
function FeaturedCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-purple-500/[0.12] bg-[#0D0520]/80 backdrop-blur-xl p-8 md:p-10">
      {/* top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />

      {/* giant quote mark */}
      <div
        className="absolute top-6 right-8 font-serif text-[120px] leading-none text-purple-500/[0.06] pointer-events-none select-none"
        aria-hidden
      >
        "
      </div>

      {/* stars */}
      <Stars n={t.rating} />

      {/* quote */}
      <p className="font-serif italic text-purple-50/90 leading-[1.65] mt-5 mb-8 relative z-10"
        style={{ fontSize: "clamp(17px,2vw,22px)" }}>
        "{t.text}"
      </p>

      {/* author */}
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarHue} flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_16px_rgba(139,92,246,0.4)]`}>
          {t.initials}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans font-semibold text-white text-[14px]">{t.name}</span>
            {t.badge && (
              <span className="font-sans text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full bg-purple-500/[0.12] border border-purple-400/20 text-purple-300/80">
                {t.badge}
              </span>
            )}
          </div>
          <p className="font-sans text-[11.5px] text-purple-300/40 mt-0.5">{t.role} · {t.location}</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   COMPACT CARD (sidebar)
══════════════════════════════════════ */
function CompactCard({ t, onClick, active }: {
  t: typeof TESTIMONIALS[0];
  onClick: () => void;
  active: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`w-full text-left rounded-2xl border p-4 transition-all duration-300 cursor-pointer group
        ${active
          ? "border-purple-500/25 bg-purple-500/[0.08]"
          : "border-white/[0.04] bg-white/[0.02] hover:border-purple-500/15 hover:bg-purple-500/[0.04]"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.avatarHue} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className={`font-sans text-[12.5px] font-semibold transition-colors duration-200 ${active ? "text-white" : "text-white/55 group-hover:text-white/80"}`}>
            {t.name}
          </p>
          <p className="font-sans text-[10.5px] text-purple-300/30 truncate">{t.role}</p>
          <p className={`font-sans text-[11.5px] mt-1.5 leading-[1.5] line-clamp-2 transition-colors duration-200 ${active ? "text-purple-100/60" : "text-white/25"}`}>
            "{t.text}"
          </p>
        </div>
      </div>
    </motion.button>
  );
}

/* ══════════════════════════════════════
   SOCIAL PROOF — main export
══════════════════════════════════════ */
export function SocialProof() {
  const [selected, setSelected] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx: number) => {
    setDir(idx > selected ? 1 : -1);
    setSelected(idx);
  };

  const prev = () => go(selected === 0 ? TESTIMONIALS.length - 1 : selected - 1);
  const next = () => go(selected === TESTIMONIALS.length - 1 ? 0 : selected + 1);

  return (
    <section className="relative bg-[#06010F] py-28 px-5 overflow-hidden">

      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px]"
          style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          {/* eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-purple-500/40" />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">
              What Students Say
            </span>
          </div>

          <h2
            className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 max-w-[520px]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Honest words from{" "}
            <span className="font-serif italic text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg,#d8b4fe 0%,#a855f7 60%,#c084fc 100%)" }}>
              real students.
            </span>
          </h2>

          <p className="font-sans text-[14px] font-light text-purple-200/40 mt-4 max-w-[380px] leading-[1.7]">
            No cherry-picked wins. No manufactured success stories.
            Just people sharing what this actually felt like.
          </p>
        </motion.div>

        {/* ── Main layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">

          {/* Left — featured testimonial */}
          <div>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={selected}
                custom={dir}
                initial={{ opacity: 0, x: dir * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -32 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturedCard t={TESTIMONIALS[selected]} />
              </motion.div>
            </AnimatePresence>

            {/* nav controls */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-purple-500/15 text-purple-300/40 hover:text-purple-200 hover:border-purple-400/30 transition-all duration-200 flex items-center justify-center cursor-pointer bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full border border-purple-500/15 text-purple-300/40 hover:text-purple-200 hover:border-purple-400/30 transition-all duration-200 flex items-center justify-center cursor-pointer bg-transparent"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* dot indicators */}
              <div className="flex items-center gap-1.5 ml-1">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer border-0 bg-transparent p-0
                      ${i === selected
                        ? "w-5 h-1.5 bg-purple-400"
                        : "w-1.5 h-1.5 bg-purple-500/25 hover:bg-purple-400/50"}`}
                  />
                ))}
              </div>

              {/* counter */}
              <span className="font-sans text-[11px] text-purple-400/30 ml-auto tabular-nums">
                {String(selected + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right — compact list */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-2"
          >
            {TESTIMONIALS.map((t, i) => (
              <CompactCard
                key={i}
                t={t}
                active={i === selected}
                onClick={() => go(i)}
              />
            ))}
          </motion.div>
        </div>

        {/* ── Bottom trust strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 pt-10 border-t border-purple-500/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="font-sans text-[12px] text-purple-300/30 max-w-[420px] text-center sm:text-left leading-relaxed">
            These are real messages from our students — shared with their permission.
            We don't manufacture results or simulate success stories.
          </p>

          <div className="flex items-center gap-6 shrink-0">
            {[
              { label: "Students", value: "500+" },
              { label: "Avg. Rating", value: "4.9★" },
              { label: "Live Sessions", value: "60+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-[20px] text-purple-100/80 leading-none">{value}</p>
                <p className="font-sans text-[9.5px] tracking-[0.14em] uppercase text-purple-400/35 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}