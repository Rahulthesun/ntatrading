import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
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

/* ══════════════════════════════════════════════════════════════
   COMPANY INTRODUCTION
══════════════════════════════════════════════════════════════ */
function CompanyIntro() {
  return (
    <section className="relative z-[5] py-16 sm:py-24 px-5 sm:px-6">
      <Rule />
      <div className="max-w-3xl mx-auto pt-16 sm:pt-24">

        <FadeUp>
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-8">
            <div className="h-px w-6 bg-purple-500/40" />
            <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">
              About Us
            </span>
          </div>

          {/* headline */}
          <h2
            className="font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 mb-12"
            style={{ fontSize: "clamp(28px,3.8vw,48px)" }}
          >
            Namma Trading Academy
          </h2>
        </FadeUp>

        {/* paragraphs */}
        <div className="flex flex-col gap-8">

          <FadeUp delay={0.08}>
            <div className="pl-5 border-l border-purple-500/[0.22]">
              <p className="font-sans text-[15.5px] font-normal text-purple-100/88 leading-[1.9]">
                NAMMA TRADING ACADEMY, launched in 2019, is a stock market training
                institute in Chennai that focuses on providing individuals with practical
                financial knowledge and real-time market abilities. The academy's journey
                began with online sessions and cooperation with other institutes, where it
                successfully trained and guided a significant number of learners to grasp
                the stock market with clarity and confidence.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.14}>
            <div className="pl-5 border-l border-purple-500/[0.22]">
              <p className="font-sans text-[15.5px] font-normal text-purple-100/88 leading-[1.9]">
                With a solid foundation of experience and trust, NAMMA TRADING ACADEMY
                is currently focusing on expanding as an independent firm, strengthening
                its footprint through offline training programs. This move enables
                students to receive more individualised advice, direct engagement, and
                a more in-depth learning experience.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.20}>
            <div className="pl-5 border-l border-purple-500/[0.22]">
              <p className="font-sans text-[15.5px] font-normal text-purple-100/88 leading-[1.9]">
                NAMMA TRADING ACADEMY places an emphasis on real-world market experience
                and actual application rather than theoretical notions. The institute is
                dedicated to providing transparent, results-oriented training that enables
                people to make informed financial decisions and generate long-term wealth.
                The academy's aim is to create confident and autonomous traders and
                investors, and it continues to grow as a reliable platform for genuine
                and impactful stock market education.
              </p>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   BOTTOM CTA
══════════════════════════════════════════════════════════════ */
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
            Your market journey<br />begins with one session.
          </h2>
          <p className="font-sans text-[13.5px] font-light text-purple-200/38 max-w-[380px] mx-auto leading-[1.8] mb-8">
            Attend a free live demo class — no commitment, no sales pitch.
            Just come and watch how we actually trade.
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

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <div className="relative bg-gradient-to-br from-[#1d4ed8] via-[#0f172a] to-[#000000] text-purple-50 overflow-x-hidden font-sans min-h-screen">
        <Hero
          headline="South India's most
live trading academy"
          hasMarketTicker={false}
        />
        <Navbar />
        <CompanyIntro />
        <BottomCTA />
        <Footer />
      </div>
    </>
  );
}
