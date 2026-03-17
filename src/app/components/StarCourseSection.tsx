import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  TrendingUp, Shield, Lock, Star, ArrowRight,
  CheckCircle2, Flame, Sparkles, BarChart2,
  PiggyBank, Landmark,
} from "lucide-react";
import SpotLightCard from "../../components/SpotlightCard";

const BULLETS = [
  { Icon: TrendingUp, text: "Live stock market & trading strategies"  },
  { Icon: BarChart2,  text: "Mutual Funds, SIPs & index investing"    },
  { Icon: PiggyBank,  text: "Wealth management & financial planning"  },
  { Icon: Landmark,   text: "Bonds, ETFs & portfolio diversification" },
];

export default function StarCourseSection() {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focus,     setFocus]     = useState<string | null>(null);

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const WHATSAPP_NUMBER = "919176001402"; // ← replace with real number

  const submit = () => {
    if (!name.trim() || !email.trim()) return;
    const message = encodeURIComponent(
`Hi! I'm interested in enrolling in the 30-Day Star Course offered by NTA Academy.

Here are my details:

Name: ${name}
Email: ${email}

I would like to reserve my spot and get more information about the course structure, schedule, and next steps.

Looking forward to your response. Thank you!`    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .nta-input::placeholder { color: rgba(196,132,252,0.25); }
        .nta-input:focus { outline: none; }

        /* ── Override SpotlightCard's default bg so our purple shows through ── */
        .nta-spotlight-card {
          background: linear-gradient(160deg, rgba(22,8,44,0.97) 0%, rgba(12,3,24,0.99) 100%) !important;
          border: 1px solid rgba(196,132,252,0.16) !important;
          box-shadow: 0 40px 100px rgba(0,0,0,0.65),
                      0 0 0 1px rgba(255,255,255,0.03),
                      inset 0 1px 0 rgba(255,255,255,0.06) !important;
          border-radius: 24px !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
      `}</style>

      <section
        ref={ref}
        className="relative overflow-hidden font-sans bg-[#06010F] py-24 px-5 sm:px-6"
      >
        {/* ── ambient — matches SocialProof ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 65%)" }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px]"
            style={{ background: "radial-gradient(ellipse, rgba(109,40,217,0.06) 0%, transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: "linear-gradient(rgba(196,132,252,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,132,252,1) 1px,transparent 1px)",
              backgroundSize: "52px 52px",
            }} />
        </div>

        {/* ── top rule — identical to SocialProof ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mb-16" />

        {/* ── same max-width as SocialProof ── */}
        <div className="relative z-10 max-w-5xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22,1,0.36,1] }}
            className="mb-14"
          >
            {/* eyebrow — matches SocialProof style */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-purple-500/40" />
              <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">
                30-Day Star Course
              </span>
            </div>

            <h2
              className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50"
              style={{ fontSize: "clamp(28px,3.6vw,48px)" }}
            >
              Go from zero to{" "}
              <span
                className="font-serif italic inline-block px-1 text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg,#d8b4fe 0%,#a855f7 55%,#c084fc 100%)" }}
              >
                consistently profitable.
              </span>
            </h2>

            <p className="font-sans text-[13.5px] font-light text-purple-200/40 mt-4 max-w-[440px] leading-[1.78]">
              Everything you need — from live sessions to certification to
              community — in one structured 30-day journey.
            </p>
          </motion.div>

          {/* ── CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22,1,0.36,1] }}
          >
            <SpotLightCard
              spotlightColor="rgba(168, 85, 247, 0.18)"
              className="nta-spotlight-card"
            >
              {/* ── TOP BAND: Zero → Hero ── */}
              <div
                className="relative px-6 sm:px-10 pt-8 sm:pt-10 pb-6 sm:pb-8"
                style={{ borderBottom: "1px solid rgba(139,92,246,0.10)" }}
              >
                {/* inner top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-40 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(109,40,217,0.14) 0%, transparent 70%)" }} />

                <div className="relative flex items-baseline gap-3 sm:gap-5 flex-wrap">
                  {/* Zero — ghost outline */}
                  <span
                    className="font-serif italic leading-none select-none"
                    style={{
                      fontSize: "clamp(44px,7vw,82px)",
                      letterSpacing: "-2px",
                      color: "transparent",
                      backgroundImage: "linear-gradient(135deg, rgba(216,180,254,0.18), rgba(168,85,247,0.10))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextStroke: "1px rgba(216,180,254,0.20)",
                    }}
                  >Zero</span>

                  {/* arrow */}
                  <div className="flex items-center gap-2 sm:gap-3 pb-1.5">
                    <div className="w-8 sm:w-14 h-px"
                      style={{ background: "linear-gradient(90deg,rgba(167,139,250,0.40),transparent)" }} />
                    <span className="font-sans font-light text-purple-400/35 text-xl sm:text-2xl leading-none">→</span>
                  </div>

                  {/* Hero — gradient */}
                  <span
                    className="font-serif italic leading-none text-transparent bg-clip-text"
                    style={{
                      fontSize: "clamp(44px,7vw,82px)",
                      letterSpacing: "-2px",
                      backgroundImage: "linear-gradient(125deg,#f3e8ff 0%,#d8b4fe 28%,#a855f7 62%,#7c3aed 100%)",
                    }}
                  >Hero.</span>

                  {/* tagline desktop */}
                  <p className="font-sans text-[12.5px] font-light text-purple-200/30 leading-[1.75] ml-auto hidden lg:block max-w-[200px] text-right pb-1">
                    From knowing nothing about markets to building real wealth — in 30 days flat.
                  </p>
                </div>

                {/* tagline mobile */}
                <p className="font-sans text-[12.5px] font-light text-purple-200/30 leading-[1.75] mt-2.5 lg:hidden">
                  From knowing nothing about markets to building real wealth — in 30 days flat.
                </p>
              </div>

              {/* ── BOTTOM: bullets | form ── */}
              <div className="flex flex-col lg:flex-row">

                {/* LEFT: bullets + stats */}
                <div className="flex-1 px-6 sm:px-10 py-7 sm:py-8"
                  style={{ borderRight: "1px solid rgba(139,92,246,0.08)" }}>

                  <div className="flex flex-col gap-2.5 sm:gap-3 mb-7 sm:mb-8">
                    {BULLETS.map(({ Icon, text }, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.22,1,0.36,1] }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0"
                          style={{
                            background: "rgba(139,92,246,0.10)",
                            border: "1px solid rgba(139,92,246,0.18)",
                          }}>
                          <Icon size={13} className="text-purple-400" strokeWidth={2} />
                        </div>
                        <span className="font-sans text-[12.5px] sm:text-[13px] font-light text-purple-200/52">{text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* stat chips */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.68 }}
                    className="flex flex-wrap gap-2"
                  >
                    {[
                      { n: "30 Days", s: "Program"    },
                      { n: "94%",     s: "Completion" },
                      { n: "500+",    s: "Graduates"  },
                    ].map(({ n, s }) => (
                      <div key={n}
                        className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl"
                        style={{
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(139,92,246,0.14)",
                        }}>
                        <span className="font-serif text-[14px] sm:text-[15px] text-transparent bg-clip-text"
                          style={{ backgroundImage: "linear-gradient(135deg,#f3e8ff,#c084fc)" }}>{n}</span>
                        <span className="font-sans text-[9.5px] text-purple-400/38 font-medium">{s}</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* RIGHT: form */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4, ease: [0.22,1,0.36,1] }}
                  className="px-6 sm:px-10 py-7 sm:py-8 lg:w-[290px] lg:shrink-0 flex flex-col gap-4 sm:gap-5"
                  style={{ borderTop: "1px solid rgba(139,92,246,0.08)" }}
                >
                  {!submitted ? (
                    <>
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-sans text-[9px] uppercase tracking-[0.18em] font-bold text-purple-400/38">
                            Enrollment
                          </span>
                          <span className="font-sans text-[8px] font-black text-[#06010F] px-2 py-0.5 rounded-full"
                            style={{ background: "#c8f542" }}>OPEN</span>
                        </div>

                        {/* blurred price */}
                        <div className="relative inline-flex items-center mb-1">
                          <span className="font-serif text-[34px] leading-none tracking-[-2px] text-transparent bg-clip-text select-none"
                            style={{
                              backgroundImage: "linear-gradient(135deg,#d8b4fe,#a855f7)",
                              filter: "blur(9px)",
                            }}>
                            ₹XX,XXX
                          </span>
                          <div className="absolute inset-0 flex items-center">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                              style={{
                                background: "rgba(6,1,15,0.90)",
                                border: "1px solid rgba(139,92,246,0.22)",
                                backdropFilter: "blur(8px)",
                              }}>
                              <Lock size={8} className="text-purple-400/50" strokeWidth={2.5} />
                              <span className="font-sans text-[9px] font-medium text-purple-300/55 whitespace-nowrap">
                                Revealed on booking
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="font-sans text-[9.5px] text-purple-400/28">
                          Cohort pricing · very limited seats
                        </p>
                      </div>

                      {/* inputs */}
                      <div className="flex flex-col gap-2">
                        {[
                          { key: "name",  ph: "Your full name",  val: name,  fn: setName  },
                          { key: "email", ph: "Your best email", val: email, fn: setEmail },
                        ].map(f => (
                          <input
                            key={f.key}
                            type={f.key === "email" ? "email" : "text"}
                            placeholder={f.ph}
                            value={f.val}
                            onChange={e => f.fn(e.target.value)}
                            onFocus={() => setFocus(f.key)}
                            onBlur={() => setFocus(null)}
                            className="nta-input w-full font-sans text-[13px] font-light text-purple-100/85 rounded-xl transition-all duration-200"
                            style={{
                              padding: "11px 14px",
                              background: "rgba(139,92,246,0.07)",
                              border: focus === f.key
                                ? "1px solid rgba(168,85,247,0.48)"
                                : "1px solid rgba(139,92,246,0.13)",
                              boxSizing: "border-box",
                            }}
                          />
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.button
                        whileHover={{ scale: 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={submit}
                        className="relative overflow-hidden w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-sans font-semibold text-[12px] tracking-[0.10em] uppercase text-white border-0 cursor-pointer"
                        style={{
                          background: "linear-gradient(135deg,#6d28d9,#7c3aed,#a855f7)",
                          boxShadow: "0 6px 28px rgba(109,40,217,0.48), inset 0 1px 0 rgba(255,255,255,0.12)",
                        }}
                      >
                        <span className="absolute inset-x-0 top-0 h-px bg-white/[0.18]" />
                        <Sparkles size={12} strokeWidth={2.5} />
                        Claim My Spot
                        <ArrowRight size={12} strokeWidth={2.5} />
                      </motion.button>

                      {/* urgency */}
                      <div className="flex items-center justify-center gap-1.5 -mt-1.5">
                        <Flame size={9} className="text-purple-400/28" strokeWidth={2} />
                        <span className="font-sans text-[10px] text-purple-400/26">
                          Only a few seats left this cohort
                        </span>
                      </div>

                      {/* guarantee */}
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="flex items-center gap-3 rounded-xl p-3 mt-auto"
                        style={{
                          background: "rgba(139,92,246,0.06)",
                          border: "1px solid rgba(139,92,246,0.13)",
                        }}
                      >
                        <Shield size={13} className="text-purple-400 shrink-0" strokeWidth={2.2} />
                        <span className="font-sans text-[10.5px] text-purple-200/38 leading-[1.5]">
                          <strong className="text-purple-200/68 font-semibold">Full Refund</strong>
                          {" "}if not transformed in 30 days.
                        </span>
                      </motion.div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center gap-5 py-8 flex-1">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 18 }}
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg,rgba(139,92,246,0.32),rgba(109,40,217,0.22))",
                          border: "1px solid rgba(139,92,246,0.38)",
                          boxShadow: "0 0 32px rgba(139,92,246,0.30)",
                        }}
                      >
                        <CheckCircle2 size={26} className="text-purple-200" strokeWidth={2} />
                      </motion.div>
                      <div>
                        <p className="font-serif text-[20px] text-purple-50 mb-2">You're In! 🎉</p>
                        <p className="font-sans text-[12px] font-light text-purple-300/40 leading-[1.7]">
                          Slot details sent to<br />
                          <span className="text-purple-200/72 font-medium">{email}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </SpotLightCard>
          </motion.div>
        </div>

        {/* ── bottom rule — identical to SocialProof ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent mt-16" />
      </section>
    </>
  );
}