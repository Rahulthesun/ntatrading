import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";

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

export function FounderMessage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <section id="founder-story" className="relative bg-transparent py-2 sm:py-28 px-6 overflow-hidden font-sans">

        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]"/>
        </div>

        {/* top rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mb-28" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-[1fr_400px] grid-cols-reverse gap-20 items-center">

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
                Why I trade{" "}
                <span
                  className="font-serif italic text-transparent bg-clip-text pr-1"
                  style={{ backgroundImage: "linear-gradient(110deg,#d8b4fe 0%,#a855f7 55%,#c084fc 100%)" }}
                >
                  live
                </span>
                <br />in front of every student.
              </h2>

              {/* pull quote */}
              <div className="relative mb-8">
                <Quote className="absolute -top-2 -left-1 w-9 h-9 text-purple-500/[0.10] pointer-events-none" />
                <blockquote
                  className="font-serif italic text-purple-50/72 leading-[1.72] pl-6"
                  style={{ fontSize: "clamp(14px,1.5vw,17px)" }}
                >
                  "I started NTA because every course I took taught theory while the
                  real market was moving outside. Every session here begins with my
                  terminal open — you learn by watching, then doing."
                </blockquote>
              </div>

              {/* one supporting paragraph */}
              <p className="font-sans text-[13.5px] font-light text-white/72 leading-[1.82] mb-12 max-w-[400px]">
                Before NTA, I searched years for a mentor who'd show me their actual
                trades — not slides, not hypotheticals. I couldn't find one.
                So I became one.
              </p>

              {/* byline */}
              <FadeUp delay={0.35}>
                <div className="flex items-center gap-4 pt-6 border-t border-purple-500/[0.08]">
                  <div>
                    <p className="font-serif text-[17px] text-purple-50/90 leading-none mb-1.5">
                      Sulakshana Trivedi
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
                RIGHT — single photo
            ════════════════════════ */}
            <FadeFrom from="right" delay={0.14} className="order-1 lg:order-2">
              <div className="relative">

                {/* outer glow behind frame */}
                <div
                  className="absolute -inset-6 rounded-3xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.18) 0%, transparent 65%)" }}
                />

                {/* photo frame */}
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className="relative w-full rounded-3xl overflow-hidden border border-purple-500/[0.15] shadow-[0_32px_80px_rgba(0,0,0,0.60)]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={FOUNDER_PHOTO}
                    alt="Priyadharshini — Founder, NTA Academy"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* bottom fade */}
                  <div className="absolute inset-0 [background:linear-gradient(to_top,rgba(6,1,15,0.60)_0%,transparent_50%)]" />
                </motion.div>

               

              </div>
            </FadeFrom>

          </div>
        </div>

        {/* bottom rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mt-28" />
      </section>
    </>
  );
}