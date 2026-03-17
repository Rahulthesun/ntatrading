import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < n ? "fill-amber-400 text-amber-400" : "text-white/10"}`} />
      ))}
    </div>
  );
}

function FeaturedCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-purple-500/[0.12] bg-[#0D0520]/80 backdrop-blur-xl p-7 sm:p-9">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
      <div className="absolute top-6 right-8 font-serif text-[120px] leading-none text-purple-500/[0.06] pointer-events-none select-none" aria-hidden>"</div>
      <Stars n={t.rating} />
      <p className="font-serif italic text-purple-50/90 leading-[1.65] mt-5 mb-8 relative z-10"
        style={{ fontSize: "clamp(16px,2vw,21px)" }}>
        "{t.text}"
      </p>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarHue} flex items-center justify-center text-sm font-bold text-white shrink-0 shadow-[0_0_16px_rgba(139,92,246,0.4)]`}>
          {t.initials}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans font-semibold text-white text-[13.5px]">{t.name}</span>
            {t.badge && (
              <span className="font-sans text-[9px] font-bold tracking-[0.14em] uppercase px-2 py-0.5 rounded-full bg-purple-500/[0.12] border border-purple-400/20 text-purple-300/80">
                {t.badge}
              </span>
            )}
          </div>
          <p className="font-sans text-[11px] text-purple-300/40 mt-0.5">{t.role} · {t.location}</p>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ t, onClick, active }: {
  t: typeof TESTIMONIALS[0]; onClick: () => void; active: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`w-full text-left rounded-2xl border p-3.5 transition-all duration-300 cursor-pointer group
        ${active
          ? "border-purple-500/25 bg-purple-500/[0.08]"
          : "border-white/[0.04] bg-white/[0.02] hover:border-purple-500/15 hover:bg-purple-500/[0.04]"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.avatarHue} flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-0.5`}>
          {t.initials}
        </div>
        <div className="min-w-0">
          <p className={`font-sans text-[12px] font-semibold transition-colors duration-200 leading-none mb-0.5 ${active ? "text-white" : "text-white/55 group-hover:text-white/80"}`}>
            {t.name}
          </p>
          <p className="font-sans text-[10px] text-purple-300/30 truncate">{t.role}</p>
          <p className={`font-sans text-[11px] mt-1.5 leading-[1.5] line-clamp-2 transition-colors duration-200 ${active ? "text-purple-100/60" : "text-white/25"}`}>
            "{t.text}"
          </p>
        </div>
      </div>
    </motion.button>
  );
}

export function SocialProof() {
  const [selected, setSelected] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx: number) => { setDir(idx > selected ? 1 : -1); setSelected(idx); };
  const prev = () => go(selected === 0 ? TESTIMONIALS.length - 1 : selected - 1);
  const next = () => go(selected === TESTIMONIALS.length - 1 ? 0 : selected + 1);

  return (
    /* ── same outer padding as Services + TestimonialsSection ── */
    <section className="relative bg-[#06010F] py-10 px-5 sm:px-6 overflow-hidden">

      {/* atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px]"
          style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)" }} />
      </div>

      {/* top rule — identical to Services + TestimonialsSection */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mb-16" />

      {/* ── same max-width as all other sections ── */}
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-purple-500/40" />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">
              What Students Say
            </span>
          </div>

          <h2
            className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 max-w-[520px]"
            style={{ fontSize: "clamp(28px,3.6vw,48px)" }}
          >
            Honest words from{" "}
            <span
              className="font-serif italic text-transparent bg-clip-text inline-block px-1"
              style={{ backgroundImage: "linear-gradient(115deg,#d8b4fe 0%,#a855f7 60%,#c084fc 100%)" }}
            >
              real students.
            </span>
          </h2>

          <p className="font-sans text-[13.5px] font-light text-purple-200/40 mt-4 max-w-[380px] leading-[1.75]">
            No cherry-picked wins. No manufactured success stories.
            Just people sharing what this actually felt like.
          </p>
        </motion.div>

        {/* Main layout — featured left, compact list right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 items-start">

          {/* Featured */}
          <div>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={selected}
                custom={dir}
                initial={{ opacity: 0, x: dir * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -28 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              >
                <FeaturedCard t={TESTIMONIALS[selected]} />
              </motion.div>
            </AnimatePresence>

            {/* nav */}
            <div className="flex items-center gap-3 mt-4">
              <button onClick={prev}
                className="w-8 h-8 rounded-full border border-purple-500/15 text-purple-300/40 hover:text-purple-200 hover:border-purple-400/30 transition-all duration-200 flex items-center justify-center cursor-pointer bg-transparent">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={next}
                className="w-8 h-8 rounded-full border border-purple-500/15 text-purple-300/40 hover:text-purple-200 hover:border-purple-400/30 transition-all duration-200 flex items-center justify-center cursor-pointer bg-transparent">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1.5 ml-1">
                {TESTIMONIALS.map((_, i) => (
                  <button key={i} onClick={() => go(i)}
                    className={`rounded-full transition-all duration-300 cursor-pointer border-0 p-0
                      ${i === selected ? "w-5 h-1.5 bg-purple-400" : "w-1.5 h-1.5 bg-purple-500/25 hover:bg-purple-400/50"}`}
                  />
                ))}
              </div>
              <span className="font-sans text-[11px] text-purple-400/28 ml-auto tabular-nums">
                {String(selected + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Compact list — hidden on mobile, shows on lg+ */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex flex-col gap-2"
          >
            {TESTIMONIALS.map((t, i) => (
              <CompactCard key={i} t={t} active={i === selected} onClick={() => go(i)} />
            ))}
          </motion.div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 pt-8 border-t border-purple-500/[0.08] flex flex-col sm:flex-row items-center justify-between gap-5"
        >
          <p className="font-sans text-[12px] text-purple-300/28 max-w-[400px] text-center sm:text-left leading-relaxed">
            Real messages from real students — shared with their permission.
            We don't manufacture results or simulate success stories.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            {[
              { label: "Students",      value: "500+" },
              { label: "Avg. Rating",   value: "4.9★" },
              { label: "Live Sessions", value: "60+"  },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-[19px] text-purple-100/78 leading-none">{value}</p>
                <p className="font-sans text-[9px] tracking-[0.14em] uppercase text-purple-400/32 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* bottom rule — identical to Services + TestimonialsSection */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mt-16" />
    </section>
  );
}