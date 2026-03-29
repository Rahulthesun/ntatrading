import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  TrendingUp, BarChart2, PiggyBank, Landmark,
  ArrowRight, CheckCircle2,
} from "lucide-react";
import SpotLightCard from "../../components/SpotlightCard";
import { Services } from "./Services";

const BULLETS = [
  { Icon: TrendingUp, text: "Live stock market & trading strategies"  },
  { Icon: BarChart2,  text: "Mutual Funds, SIPs & index investing"    },
  { Icon: PiggyBank,  text: "Wealth management & financial planning"  },
  { Icon: Landmark,   text: "Bonds, ETFs & portfolio diversification" },
];

const STATS = ["30 Days", "94% Completion", "500+ Graduates"];

const WHATSAPP_NUMBER = "919176001402";

export default function StarCourseSection() {
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const submit = () => {
    if (!name.trim() || !email.trim()) return;
    const message = encodeURIComponent(
`Hi! I'm interested in enrolling in the 30-Day Star Course offered by NTA Academy.

Here are my details:

Name: ${name}
Email: ${email}

I would like to reserve my spot and get more information about the course structure, schedule, and next steps.

Looking forward to your response. Thank you!`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-24 px-5 sm:px-6">

      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.12] to-transparent mb-16" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-purple-500/50" />
            <span className="text-[10px] tracking-[0.22em] uppercase text-purple-300/70">
              30-Day Star Course
            </span>
          </div>

          <h2 className="font-serif text-purple-50 leading-tight text-[42px]">
            Go from zero to{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-500">
              consistently profitable.
            </span>
          </h2>

          <p className="text-purple-200/70 mt-4 max-w-md text-sm leading-relaxed">
            Everything you need — from live sessions to certification to
            community — in one structured 30-day journey.
          </p>
        </motion.div>

        <Services />

        {/* ── Spotlight card ── */}
        <SpotLightCard className="
          !p-0 !overflow-hidden !rounded-3xl
          ![background:linear-gradient(160deg,rgba(22,8,44,0.97)_0%,rgba(12,3,24,0.99)_100%)]
          ![border:1px_solid_rgba(196,132,252,0.18)]
          ![box-shadow:0_40px_100px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]
        ">

          {/* Top hero strip */}
          <div className="px-8 py-8 border-b border-purple-500/10">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-6xl italic text-purple-200/40">Zero</span>
              <span className="text-purple-400/60">→</span>
              <span className="text-6xl italic text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600">
                Hero.
              </span>
            </div>
            <p className="text-purple-200/65 mt-3 max-w-sm text-sm leading-relaxed">
              From knowing nothing about markets to building real wealth — in 30 days.
            </p>
          </div>

          {/* Bottom two-column layout */}
          <div className="flex flex-col lg:flex-row">

            {/* Left — bullets + stats */}
            <div className="flex-1 p-8 border-r border-purple-500/10">
              {BULLETS.map(({ Icon, text }, i) => (
                <div key={i} className="flex items-center gap-3 mb-4">
                  <Icon size={16} className="text-purple-400 shrink-0" />
                  <span className="text-purple-100/90 text-sm">{text}</span>
                </div>
              ))}

              <div className="flex gap-3 mt-6 flex-wrap">
                {STATS.map((t) => (
                  <span
                    key={t}
                    className="text-purple-200/80 text-xs border border-purple-500/20 px-3 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — enrollment form */}
            <div className="p-8 w-full lg:w-[300px] flex flex-col gap-4">
              {!submitted ? (
                <>
                  <p className="text-purple-300/70 text-sm">Enrollment Open</p>

                  <input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="
                      bg-purple-500/10 border border-purple-500/20
                      px-3 py-3 rounded-lg
                      text-purple-100 text-sm
                      placeholder:text-purple-400/40
                      focus:outline-none focus:border-purple-500/50
                      transition-colors duration-200
                    "
                  />

                  <input
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      bg-purple-500/10 border border-purple-500/20
                      px-3 py-3 rounded-lg
                      text-purple-100 text-sm
                      placeholder:text-purple-400/40
                      focus:outline-none focus:border-purple-500/50
                      transition-colors duration-200
                    "
                  />

                  <button
                    onClick={submit}
                    className="
                      bg-gradient-to-r from-purple-600 to-purple-500
                      text-white text-sm font-semibold
                      py-3 rounded-lg
                      flex items-center justify-center gap-2
                      hover:scale-[1.02] hover:brightness-110
                      transition-all duration-200 cursor-pointer
                    "
                  >
                    Claim My Spot <ArrowRight size={16} />
                  </button>

                  <p className="text-purple-300/60 text-xs text-center">
                    Limited seats available
                  </p>

                  <p className="text-purple-200/75 text-xs text-center">
                    Full refund if not satisfied
                  </p>
                </>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 className="mx-auto text-purple-300" size={40} />
                  <p className="text-white mt-3 font-medium">You're In!</p>
                  <p className="text-purple-200/75 text-sm mt-1">{email}</p>
                </div>
              )}
            </div>

          </div>
        </SpotLightCard>
      </div>

      {/* Bottom divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.12] to-transparent mt-16" />

    </section>
  );
}