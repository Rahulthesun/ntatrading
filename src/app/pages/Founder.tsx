import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { FounderMessage } from "../components/FounderMessage";
import Hero from "../components/Hero";
import { HashLink } from "react-router-hash-link";

function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function Rule() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent" />;
}

function BottomCTA() {
  return (
    <section className="relative z-[5] px-5 sm:px-6 py-6">
      <Rule />
      <div className="relative max-w-3xl mx-auto text-center py-16 sm:py-20">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[560px] h-[200px] sm:h-[280px] pointer-events-none [background:radial-gradient(ellipse_at_center,rgba(139,92,246,0.09)_0%,transparent_70%)]" />
        <FadeUp>
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="h-px w-6 bg-purple-500/40" />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">Ready to Begin</span>
          </div>
          <h2
            className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 mb-4"
            style={{ fontSize: "clamp(26px,3.6vw,46px)" }}
          >
            Learn directly from<br />Sulakshana Trivedi N.
          </h2>
          <p className="font-sans text-[13.5px] font-light text-purple-200/38 max-w-[380px] mx-auto leading-[1.8] mb-8">
            Attend a free live demo class and experience her teaching
            style firsthand — no commitment required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">
            <HashLink smooth to="/articles#contact"
              scroll={(el) => { setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }) }, 150) }}
            >
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-gradient-to-r from-violet-700 to-purple-500 text-white font-sans text-[13px] font-semibold tracking-[0.04em] px-8 py-3.5 rounded-full border-0 cursor-pointer shadow-[0_4px_24px_rgba(139,92,246,0.38)] transition-shadow duration-300 flex items-center justify-center gap-2">
                Book Free Demo <ArrowRight className="w-4 h-4" />
              </motion.button>
            </HashLink>
            <HashLink smooth to="/programs#hero"
              scroll={(el) => { setTimeout(() => { el.scrollIntoView({ behavior: "smooth", block: "start" }) }, 150) }}
            >
              <button className="w-full sm:w-auto font-sans text-[13px] font-normal tracking-[0.04em] text-purple-200/50 px-8 py-3.5 rounded-full border border-purple-400/[0.14] hover:border-purple-400/30 transition-all duration-200 bg-transparent cursor-pointer">
                View Programs
              </button>
            </HashLink>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default function FounderPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <div className="relative bg-gradient-to-br from-[#1d4ed8] via-[#0f172a] to-[#000000] text-purple-50 overflow-x-hidden font-sans min-h-screen">
        <Hero
          headline="The story behind
the academy."
          hasMarketTicker={false}
        />
        <Navbar />
        <FounderMessage />
        <BottomCTA />
        <Footer />
      </div>
    </>
  );
}
