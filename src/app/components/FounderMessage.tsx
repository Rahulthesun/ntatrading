import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote, GraduationCap, Briefcase, Users, TrendingUp } from "lucide-react";

/* ── animation helpers ── */
function FadeFrom({ children, from = "left", delay = 0, className = "" }: {
  children: React.ReactNode;
  from?: "left" | "right";
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -36 : 36 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

/* ── swap this URL when ready ── */
const FOUNDER_PHOTO = "assets/founder.jpeg";

const CREDENTIALS = [
  {
    Icon: GraduationCap,
    label: "Education",
    value: "B.Sc. Computer Science",
    sub: "Sri Kanyakaparameswari Arts & Science College for Women",
  },
  {
    Icon: Briefcase,
    label: "Experience",
    value: "10+ Years",
    sub: "7 years dedicated to the financial sector",
  },
  {
    Icon: Users,
    label: "Students Coached",
    value: "10,000+",
    sub: "Across India — and counting",
  },
  {
    Icon: TrendingUp,
    label: "Specialisation",
    value: "Stock Market Training",
    sub: "Equity, Options & Practical Investing",
  },
];

export function FounderMessage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <section id="founder-story" className="relative bg-transparent py-16 sm:py-28 px-6 overflow-hidden font-sans">

        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"/>
        </div>

        {/* top rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mb-16 sm:mb-28" />

        <div className="max-w-5xl mx-auto relative z-10">

          {/* ══════════════════════════════
              MAIN GRID — text + photo
          ══════════════════════════════ */}
          <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20 items-start">

            {/* ════════════════════════
                LEFT — text
            ════════════════════════ */}
            <FadeFrom from="left" className="flex flex-col order-2 lg:order-1">

              {/* eyebrow */}
              <div className="inline-flex items-center gap-2.5 mb-7">
                <div className="h-px w-6 bg-purple-500/40" />
                <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">
                  Founder's Story
                </span>
              </div>

              {/* headline */}
              <h2
                className="font-serif font-normal leading-[1.06] tracking-[-0.02em] text-purple-50 mb-10"
                style={{ fontSize: "clamp(30px,3.8vw,52px)" }}
              >
                 Decade of Markets, <br></br>
                <span className="text-purple-50">
                  One Mission.
                </span>
              </h2>

              {/* pull quote */}
              <div className="relative mb-10 pl-5 border-l-2 border-purple-500/30">
                <Quote className="absolute -top-1 -left-1 w-7 h-7 text-purple-500/[0.18] pointer-events-none" />
                <blockquote
                  className="font-semibold text-purple-100/90 leading-[1.75]"
                  style={{ fontSize: "clamp(15px,1.6vw,18px)" }}
                >
                  "I personally experienced the stock market's highs and lows — and
                  I've seen how people get misled by poor advice or fall prey to scams
                  due to a lack of real knowledge. That's what drove me to build a
                  space for authentic, transparent learning that gives every student
                  genuine clarity and confidence."
                </blockquote>
              </div>

              {/* paragraph blocks */}
              <div className="flex flex-col gap-8 mb-12">

                {/* block 1 — background */}
                <div className="pl-5 border-l border-purple-500/[0.18]">
                  <p className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-purple-400/55 mb-2">
                    Background
                  </p>
                  <p className="font-sans text-[15px] font-normal text-purple-100/85 leading-[1.9]">
                    Sulakshana Trivedi N is a Chennai-based finance professional and
                    trainer passionate about empowering people through financial
                    education. She began her professional life in IT — earning a B.Sc.
                    in Computer Science from Sri Kanyakaparameswari Arts and Science
                    College for Women — before the stock market's complexity and
                    opportunity pulled her into an entirely different direction.
                  </p>
                </div>

                {/* block 2 — journey */}
                <div className="pl-5 border-l border-purple-500/[0.18]">
                  <p className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-purple-400/55 mb-2">
                    The Journey
                  </p>
                  <p className="font-sans text-[15px] font-normal text-purple-100/85 leading-[1.9]">
                    With over ten years of professional experience — seven of them in
                    the financial sector — she has navigated the full spectrum of market
                    conditions. She has personally felt the highs of well-timed trades
                    and the lows that come from trusting the wrong advice. Her background
                    also spans sales and marketing, where she developed strong business
                    acumen and built lasting client relationships. These experiences
                    didn't just shape her trading approach — they shaped her entire
                    teaching philosophy.
                  </p>
                </div>

                {/* block 3 — mission */}
                <div className="pl-5 border-l border-purple-500/[0.18]">
                  <p className="font-sans text-[9.5px] tracking-[0.18em] uppercase text-purple-400/55 mb-2">
                    The Mission
                  </p>
                  <p className="font-sans text-[15px] font-normal text-purple-100/85 leading-[1.9]">
                    Today, having coached over 10,000 people, Sulakshana is known for a
                    teaching style that is practical, results-oriented, and deeply
                    honest. She emphasises real-time market understanding over theory,
                    and clarity and discipline over short-term speculation. Her purpose
                    is straightforward: give every student the kind of guidance she once
                    searched for — a live terminal, real positions, and every decision
                    explained as it happens.
                  </p>
                </div>

              </div>

              {/* byline */}
              <FadeUp delay={0.35}>
                <div className="flex items-center gap-4 pt-6 border-t border-purple-500/[0.08]">
                  <div>
                    <p className="text-[17px] text-purple-50/90 leading-none mb-1.5">
                      Sulakshana Trivedi N
                    </p>
                    <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-purple-400/70">
                      Founder & Head Mentor · Namma Trading Academy
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 bg-[#0D0520]/80 border border-purple-500/[0.14] backdrop-blur-sm px-3 py-1.5 rounded-full shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-sans text-[8.5px] tracking-[0.14em] uppercase text-green-400/65 whitespace-nowrap">
                      Active Trader
                    </span>
                  </div>
                </div>
              </FadeUp>
            </FadeFrom>

            {/* ════════════════════════
                RIGHT — photo + credential pills
            ════════════════════════ */}
            <FadeFrom from="right" delay={0.14} className="order-1 lg:order-2 flex flex-col gap-6">

              {/* photo frame */}
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 65%)" }}
                />
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className="relative w-full rounded-3xl overflow-hidden border border-purple-500/[0.15] shadow-[0_32px_80px_rgba(0,0,0,0.60)]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={FOUNDER_PHOTO}
                    alt="Sulakshana Trivedi N — Founder, Namma Trading Academy"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 [background:linear-gradient(to_top,rgba(6,1,15,0.60)_0%,transparent_50%)]" />

                  {/* floating name card at photo bottom */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#0D0520]/90 border border-purple-500/[0.18] backdrop-blur-xl px-4 py-3 rounded-2xl">
                    <p className=" text-[15px] text-white/90 leading-none mb-1">Sulakshana Trivedi N</p>
                    <p className="font-sans text-[9.5px] tracking-[0.12em] uppercase text-purple-300/55">
                      Founder & Head Mentor
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* quick-fact pills stacked below photo */}
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "10+ Years", sub: "Professional experience" },
                  { label: "10,000+ Students", sub: "Coached across India" },
                  { label: "7 Years in Finance", sub: "Stock market specialist" },
                ].map(({ label, sub }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0C0420]/65 border border-purple-500/[0.09] backdrop-blur-xl"
                  >
                    <span className=" text-[14px] text-purple-50/88">{label}</span>
                    <span className="font-sans text-[10px] text-purple-300/45">{sub}</span>
                  </div>
                ))}
              </div>

            </FadeFrom>

          </div>

          {/* ══════════════════════════════
              CREDENTIALS STRIP — below grid
          ══════════════════════════════ */}
          <FadeUp delay={0.2} className="mt-16 sm:mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CREDENTIALS.map(({ Icon, label, value, sub }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#0C0420]/65 border border-purple-500/[0.09] backdrop-blur-xl rounded-2xl p-5 flex flex-col gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/[0.09] border border-purple-400/[0.11] flex items-center justify-center shrink-0">
                    <Icon className="text-purple-400" size={16} />
                  </div>
                  <div>
                    <p className="font-sans text-[9px] tracking-[0.16em] uppercase text-purple-400/45 mb-1">{label}</p>
                    <p className="text-[16px] text-purple-50/90 leading-snug mb-1">{value}</p>
                    <p className="font-sans text-[11px] font-light text-purple-200/40 leading-[1.55]">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeUp>

        </div>

        {/* bottom rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mt-16 sm:mt-28" />
      </section>
    </>
  );
}
