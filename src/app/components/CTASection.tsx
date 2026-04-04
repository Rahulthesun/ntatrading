import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { MessageCircle, Phone, ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";

/* ══════════════════════════════════════════════════════
   TICKER DATA
══════════════════════════════════════════════════════ */
const TICKERS = [
  { sym: "NIFTY 50",  val: "24,836", chg: "+1.2%", up: true  },
  { sym: "SENSEX",    val: "81,224", chg: "+0.9%", up: true  },
  { sym: "BANKNIFTY", val: "52,410", chg: "-0.4%", up: false },
  { sym: "RELIANCE",  val: "₹2,940", chg: "+2.1%", up: true  },
  { sym: "INFY",      val: "₹1,820", chg: "+1.7%", up: true  },
  { sym: "TCS",       val: "₹4,150", chg: "-0.2%", up: false },
];

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .nta-ticker { animation: ticker-scroll 32s linear infinite; }
      `}</style>

      <section
        ref={ref}
        className="relative bg-transparent overflow-hidden font-sans"
      >
        {/* ── ambient glow ── */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]"
            style={{ background: "radial-gradient(ellipse at center, rgba(109,40,217,0.13) 0%, transparent 65%)" }}
          />
          <div className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage: "linear-gradient(rgba(196,132,252,1) 1px,transparent 1px),linear-gradient(90deg,rgba(196,132,252,1) 1px,transparent 1px)",
              backgroundSize: "54px 54px",
            }}
          />
        </div>

        {/* ── top rule ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent" />

        {/* ══════════════════════════════════
            MAIN CTA CONTENT
        ══════════════════════════════════ */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 py-5 sm:py-16 text-center">

          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 mb-8"
          >
            <div className="h-px w-6 bg-purple-500/40" />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/55">
              Start Today
            </span>
            <div className="h-px w-6 bg-purple-500/40" />
          </motion.div>

          {/* headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-normal leading-[1.06] tracking-[-0.02em] text-purple-50 mb-5"
            style={{ fontSize: "clamp(32px,5vw,62px)" }}
          >
            Get into the market <br className="hidden sm:block" />
            with confidence.
          </motion.h2>

          {/* subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-[14px] sm:text-[15px] font-semibold text-grey-400 max-w-[440px] mx-auto leading-[1.8] mb-10"
          >
            You don't need to be a genius. You need a system, a mentor, and the
            guts to start. We'll handle the first two.
          </motion.p>

          {/* trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-2.5 mb-10"
          >
            {[
              { Icon: TrendingUp, label: "500+ Trained Traders" },
              { Icon: Shield,     label: "Full Refund Guarantee" },
              { Icon: Zap,        label: "Results in 30 Days"   },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-sans text-[11.5px] text-purple-200/45"
                style={{
                  background: "rgba(139,92,246,0.07)",
                  border: "1px solid rgba(139,92,246,0.14)",
                }}
              >
                <Icon size={11} className="text-purple-400/70 shrink-0" strokeWidth={2.2} />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10 px-4 sm:px-0"
          >
            {/* WhatsApp — primary */}
            <motion.a
              href="https://wa.me/917338994283?text=Hi!%20I%20came%20across%20Namma%20Trading%20Academy%20and%20I%E2%80%99m%20interested%20in%20learning%20more%20about%20your%20trading%20programs.%20I%E2%80%99d%20like%20to%20understand%20which%20course%20would%20be%20the%20best%20fit%20for%20me,%20how%20the%20live%20sessions%20work,%20and%20what%20kind%20of%20support%20and%20mentorship%20is%20included.%20Looking%20forward%20to%20your%20guidance."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans font-semibold text-[13px] tracking-[0.04em] text-white no-underline"
              style={{
                background: "linear-gradient(135deg,#6d28d9,#7c3aed,#a855f7)",
                boxShadow: "0 6px 28px rgba(109,40,217,0.48), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <span className="absolute inset-x-0 top-0 h-px bg-white/18" />
              <MessageCircle size={15} strokeWidth={2.2} />
              Enquire on WhatsApp
              <ArrowRight size={13} strokeWidth={2.5} />
            </motion.a>

            {/* Call — secondary ghost */}
            <motion.a
              href="tel:917338994283"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-sans font-normal text-[13px] tracking-[0.04em] text-purple-200/50 no-underline transition-all duration-200"
              style={{
                border: "1px solid rgba(139,92,246,0.16)",
                background: "transparent",
              }}
            >
              <Phone size={14} strokeWidth={2.2} />
              Call Us
            </motion.a>
          </motion.div>

          {/* availability */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="font-sans text-[10.5px] tracking-[0.08em] text-purple-400/22"
          >
            Mon – Sat &nbsp;·&nbsp; 9 AM – 7 PM IST &nbsp;·&nbsp; We respond within minutes
          </motion.p>
        </div>

        {/* ══════════════════════════════════
            TICKER BAR — flush bottom
        ══════════════════════════════════ */}
        <div
          className="relative z-10 overflow-hidden py-3.5"
          style={{
            borderTop: "1px solid rgba(139,92,246,0.10)",
            background: "rgba(139,92,246,0.03)",
          }}
        >
          {/* fade masks */}
          <div className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#06010F] to-transparent" />
          <div className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#06010F] to-transparent" />

          <div className="nta-ticker flex w-max">
            {[...TICKERS, ...TICKERS].map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-8"
                style={{ borderRight: "1px solid rgba(139,92,246,0.08)" }}
              >
                <span className="font-sans text-[10px] font-semibold tracking-[0.10em] uppercase text-purple-300/32">
                  {t.sym}
                </span>
                <span className="font-serif text-[13px] text-purple-50/55">{t.val}</span>
                <span
                  className="font-sans text-[10.5px] font-semibold flex items-center gap-0.5"
                  style={{ color: t.up ? "#4ade80" : "#f87171" }}
                >
                  {t.up ? "▲" : "▼"} {t.chg}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── bottom rule ── */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent" />
      </section>
    </>
  );
}