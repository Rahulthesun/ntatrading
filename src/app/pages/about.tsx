import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  MapPin, Phone, Mail, ArrowRight, ChevronDown,
  MonitorPlay, Users, ShieldCheck, TrendingUp,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import LightRays from "../../components/LightRays";
import { FounderMessage } from "../components/FounderMessage";
import Reviews from "../components/Reviews";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero"
import { HashLink } from "react-router-hash-link";

/* ══════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
══════════════════════════════════════════════════════════════ */
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

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-4">
      <div className="h-px w-6 bg-purple-500/40" />
      <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-400/60">{children}</span>
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 ${className}`}
      style={{ fontSize: "clamp(26px,3.6vw,46px)" }}>
      {children}
    </h2>
  );
}

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-serif italic text-transparent bg-clip-text inline-block px-1"
      style={{ backgroundImage: "linear-gradient(135deg,#d8b4fe 0%,#a855f7 55%,#c084fc 100%)" }}
    >
      {children}
    </span>
  );
}

function Rule() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent" />;
}


/* ══════════════════════════════════════════════════════════════
   2 · STATS
══════════════════════════════════════════════════════════════ */
const STATS = [
  { end: 500,  suffix: "+",  label: "Active Students",  note: "& growing"          },
  { end: 60,   suffix: "+",  label: "Live Sessions",    note: "since launch"        },
  { end: 4.9,  suffix: "★", label: "Average Rating",   note: "from real students"  },
  { end: 30,   suffix: "d",  label: "To Consistency",   note: "avg student journey" },
];

function Num({ end, suffix }: { end: number; suffix: string }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let c = 0;
    const dec = end % 1 !== 0;
    const inc = end / 60;
    const id = setInterval(() => {
      c += inc;
      if (c >= end) { setV(end); clearInterval(id); }
      else setV(dec ? Math.round(c * 10) / 10 : Math.floor(c));
    }, 16);
    return () => clearInterval(id);
  }, [inView, end]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Stats() {
  return (
    <section className="relative z-[5] px-5 sm:px-6 pb-4">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
        {STATS.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.07}>
            <div className="bg-[#0C0420]/65 border border-purple-500/[0.09] backdrop-blur-xl rounded-2xl px-4 sm:px-5 py-5 sm:py-6 text-center">
              <p className="font-serif text-purple-50 leading-none mb-1"
                style={{ fontSize: "clamp(22px,3.2vw,36px)" }}>
                <Num end={s.end} suffix={s.suffix} />
              </p>
              <p className="font-sans text-[11px] sm:text-[11.5px] font-medium text-purple-100/72 mb-0.5">{s.label}</p>
              <p className="font-sans text-[9px] text-purple-400/32 tracking-[0.06em]">{s.note}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   3 · WHY NTA
══════════════════════════════════════════════════════════════ */
const DIFF = [
  {
    Icon: MonitorPlay,
    title: "Every session is live.",
    desc: "We open a real trading terminal in front of every student, every day the market is open. Not recordings. Not re-runs. Real money, real decisions, real time.",
  },
  {
    Icon: TrendingUp,
    title: "Mentors who actually trade.",
    desc: "Our instructors trade their own capital daily. When they teach a setup, they've taken that trade. When they warn you about a risk, they've felt that loss.",
  },
  {
    Icon: Users,
    title: "A room, not a course.",
    desc: "You're joining an active community of traders — not buying a product. Students support each other, share setups and call out each other's mistakes in real time.",
  },
  {
    Icon: ShieldCheck,
    title: "Honest about timelines.",
    desc: "We tell every student upfront: 3–6 months to consistent profitability. No overnight promises. No guarantee gimmicks. Just honest, structured skill-building.",
  },
];

function WhyNTA() {
  return (
    <section className="relative z-[5] py-16 sm:py-20 px-5 sm:px-6">
      <Rule />
      <div className="max-w-5xl mx-auto pt-16 sm:pt-20">

        <div className="grid md:grid-cols-2 gap-10 sm:gap-14 items-start">

          {/* heading — not sticky on mobile */}
          <FadeUp>
            <Eyebrow>Why NTA</Eyebrow>
            <H2 className="mb-4 sm:mb-6">
              What makes us<br />
              <Italic>actually</Italic> different.
            </H2>
            <p className="font-sans text-[13px] font-light text-purple-200/40 leading-[1.8] max-w-[360px]">
              There are hundreds of trading courses in India. Most teach theory.
              NTA was built around one idea: the only way to learn trading is
              to do it — with someone who does it too.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-3 sm:gap-4">
            {DIFF.map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex gap-4 p-4 sm:p-5 bg-[#0C0420]/55 border border-purple-500/[0.08] backdrop-blur-xl rounded-2xl hover:border-purple-400/18 transition-colors duration-300 cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-500/[0.09] border border-purple-400/[0.11] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="text-purple-400" size={16} />
                  </div>
                  <div>
                    <p className="font-serif text-[15.5px] sm:text-[17px] text-purple-50 mb-1">{title}</p>
                    <p className="font-sans text-[12px] sm:text-[12.5px] font-light text-purple-200/40 leading-[1.72]">{desc}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4 · PROGRAMS
══════════════════════════════════════════════════════════════ */
const PROGRAMS = [
  { name: "Stock Market Basics",     tag: "Beginner",     dur: "4 weeks",  desc: "Charts, order types, fundamental & technical basics. Zero experience needed." },
  { name: "30-Day Trading Program",  tag: "Flagship",     dur: "30 days",  desc: "Live sessions every market day. Our most popular and most transformative program." },
  { name: "NFI Certification Prep",  tag: "Advanced",     dur: "3 weeks",  desc: "Structured NISM/NCFM prep with mock exams and 1-on-1 doubt-clearing." },
  { name: "Commodity Trading",       tag: "Intermediate", dur: "2 weeks",  desc: "Gold, Silver, Crude Oil & agricultural commodities on MCX." },
  { name: "Options Strategies",      tag: "Advanced",     dur: "3 weeks",  desc: "Delta-neutral, spreads, Iron Condors — for students who already know the basics." },
  { name: "Live Trading Workshops",  tag: "Events",       dur: "1–2 days", desc: "Intensive weekend workshops around key market events and earnings seasons." },
];

const TAG_CLR: Record<string, string> = {
  Beginner:     "bg-emerald-400/10 text-emerald-400  border-emerald-400/20",
  Flagship:     "bg-purple-400/12  text-purple-300   border-purple-400/25",
  Advanced:     "bg-rose-400/10    text-rose-400     border-rose-400/20",
  Intermediate: "bg-amber-400/10   text-amber-400    border-amber-400/20",
  Events:       "bg-sky-400/10     text-sky-400      border-sky-400/20",
};

function Programs() {
  return (
    <section className="relative z-[5] py-16 sm:py-20 px-5 sm:px-6">
      <Rule />
      <div className="max-w-5xl mx-auto pt-16 sm:pt-20">
        <FadeUp className="mb-10 sm:mb-12">
          <Eyebrow>What We Offer</Eyebrow>
          <H2>Programs for <Italic>every level.</Italic></H2>
          <p className="font-sans text-[13px] font-light text-purple-200/38 mt-3 max-w-[440px] leading-[1.75]">
            Opening your first Demat account or sitting for professional certification —
            there's a clear path for you here.
          </p>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PROGRAMS.map(({ name, tag, dur, desc }, i) => (
            <FadeUp key={name} delay={i * 0.05}>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}
                className="group h-full bg-[#0C0420]/55 border border-purple-500/[0.08] backdrop-blur-xl rounded-2xl p-5 cursor-default hover:border-purple-400/18 transition-colors duration-300">
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <p className="font-serif text-[16px] sm:text-[17.5px] text-purple-50 leading-tight">{name}</p>
                  <span className={`font-sans text-[9px] font-bold tracking-[0.12em] uppercase px-2 sm:px-2.5 py-1 rounded-full border shrink-0 mt-0.5 ${TAG_CLR[tag] ?? TAG_CLR["Events"]}`}>{tag}</span>
                </div>
                <p className="font-sans text-[12px] font-light text-purple-200/38 leading-[1.7] mb-3">{desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] tracking-[0.12em] uppercase text-purple-400/38">Duration · {dur}</span>
                  <span className="font-sans text-[11px] text-purple-400/45 group-hover:text-purple-300/65 transition-colors flex items-center gap-1">
                    Learn more <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5 · CONTACT
══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section className="relative z-[5] py-16 sm:py-20 px-5 sm:px-6" id="contact">
      <Rule />
      <div className="max-w-5xl mx-auto pt-16 sm:pt-20">
        <FadeUp className="mb-10 sm:mb-12">
          <Eyebrow>Find Us</Eyebrow>
          <H2>Visit <Italic>NTA Academy.</Italic></H2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.55fr] gap-4 sm:gap-6 items-start">
          <FadeUp className="flex flex-col gap-2.5 sm:gap-3">
            {[
              { Icon: MapPin, label: "Address", value: "NTA Academy, Chennai\nTamil Nadu, India" },
              { Icon: Phone,  label: "Phone",   value: "+91 7338994283"                         },
              { Icon: Mail,   label: "Email",   value: "contact@ntaacademy.in"                      },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#0C0420]/65 border border-purple-500/[0.08] backdrop-blur-xl hover:border-purple-400/18 transition-colors duration-300">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-500/[0.09] border border-purple-400/[0.11] flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.14em] uppercase text-purple-400/42 mb-1">{label}</p>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-purple-100/68 whitespace-pre-line leading-[1.6]">{value}</p>
                </div>
              </div>
            ))}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="w-full mt-1 flex items-center justify-center gap-2.5 py-3.5 rounded-full bg-gradient-to-r from-violet-700 to-purple-500 font-sans font-semibold text-[13px] tracking-[0.04em] text-white border-0 cursor-pointer shadow-[0_4px_24px_rgba(109,40,217,0.38)] transition-shadow duration-300">
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </motion.button>
          </FadeUp>

          <FadeUp delay={0.12}>
            <div
              className="relative rounded-3xl overflow-hidden border border-purple-500/[0.11]"
              style={{ height: 320 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5777947264146!2d80.17235437538311!3d13.062524912877699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52614273a06bc1%3A0x306ff7d176fb8ee0!2sNAMMA%20TRADING%20ACADEMY!5e0!3m2!1sen!2sin!4v1775053370361!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0 grayscale opacity-75"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="absolute inset-0 pointer-events-none [background:linear-gradient(to_top,rgba(6,1,15,0.45)_0%,transparent_60%)]" />

              <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-[#0D0520]/92 border border-purple-500/18 backdrop-blur-xl px-3.5 py-2.5 rounded-2xl pointer-events-none">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-700 to-purple-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <div>
                  <p className="font-sans text-[12px] font-semibold text-white/88">
                    Namma Trading Academy
                  </p>
                  <p className="font-sans text-[9.5px] text-purple-300/38">
                    Chennai, Tamil Nadu
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6 · BOTTOM CTA
══════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section className="relative z-[5] px-5 sm:px-6 py-6">
      <Rule />
      <div className="relative max-w-3xl mx-auto text-center py-16 sm:py-20">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[560px] h-[200px] sm:h-[280px] pointer-events-none [background:radial-gradient(ellipse_at_center,rgba(139,92,246,0.09)_0%,transparent_70%)]" />
        <FadeUp>
          <Eyebrow>Ready to Begin</Eyebrow>
          <H2 className="mb-4">
            Your market journey<br />begins <Italic>with one session.</Italic>
          </H2>
          <p className="font-sans text-[13.5px] font-light text-purple-200/38 max-w-[380px] mx-auto leading-[1.8] mb-8">
            Attend a free live demo class — no commitment, no sales pitch.
            Just come and watch how we actually trade.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0">


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
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto bg-gradient-to-r from-violet-700 to-purple-500 text-white font-sans text-[13px] font-semibold tracking-[0.04em] px-8 py-3.5 rounded-full border-0 cursor-pointer shadow-[0_4px_24px_rgba(139,92,246,0.38)] transition-shadow duration-300 flex items-center justify-center gap-2">
              Book Free Demo <ArrowRight className="w-4 h-4" />
            </motion.button>
            

            </HashLink>

            <HashLink
                smooth
                to="/programs#hero"
                scroll={
                  (el) => {
                    setTimeout(() => {
                        el.scrollIntoView({behaviour:"smooth" , block: "start"})
                      } , 150)
                  }
                             
                }
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
   PAGE ASSEMBLY
══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <div className="relative bg-gradient-to-br
from-[#1d4ed8]
via-[#0f172a]
to-[#000000] text-purple-50 overflow-x-hidden font-sans min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0" >
        </div>

          <Hero  
        headline="South India's most
live trading academy"
        hasMarketTicker={false}
        />
        
        <Navbar />
        
        <Stats />
        <FounderMessage />
        <WhyNTA />
        <Contact />
        <BottomCTA />
        <Footer />
      </div>
    </>
  );
}