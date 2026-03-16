import { useEffect, useState } from "react"
import LightRays from "../../components/LightRays"
import { Navbar } from "./Navbar"
import { MarketCarousel } from "./MarketCarousel"

/* ─── Sparkline util ──────────────────────────────────────────── */
const SPARK  = [52,58,54,67,63,72,68,80,76,88,84,96,92,105,101,112]
const SPARK2 = [80,74,78,65,70,60,64,52,56,44,48,36,40,28,32,20]

function makePath(data: number[], W: number, H: number, pad = 3) {
  const mn = Math.min(...data) - 2
  const mx = Math.max(...data) + 2
  const sy = (v: number) => H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2)
  const step = (W - pad * 2) / (data.length - 1)
  return {
    line: data.map((v, i) => `${pad + i * step},${sy(v)}`).join(" "),
    area: `${pad},${H} ${data.map((v, i) => `${pad + i * step},${sy(v)}`).join(" ")} ${pad + (data.length - 1) * step},${H}`,
    last: { x: pad + (data.length - 1) * step, y: sy(data[data.length - 1]) },
  }
}

/* ─── Main Hero ───────────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%,100%{opacity:.6} 50%{opacity:1} }
        @keyframes floatA  { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-14px)} }
        @keyframes floatB  { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-9px)}  }
        @keyframes floatC  { 0%,100%{transform:translateY(0px)}  50%{transform:translateY(-18px)} }
        @keyframes ticker  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      <section className="relative bg-[#06010F] text-purple-50 min-h-screen overflow-x-hidden font-sans">

        {/* LightRays */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <LightRays
            raysOrigin="top-center"
            raysColor="#cb70f5"
            raysSpeed={1}
            lightSpread={1}
            rayLength={2}
            pulsating={false}
            fadeDistance={1}
            saturation={1}
            followMouse
            mouseInfluence={0.1}
            noiseAmount={0}
            distortion={0}
          />
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 z-[1] pointer-events-none [background:radial-gradient(ellipse_90%_70%_at_50%_0%,transparent_40%,#06010F_100%)]" />

        {/* Navbar */}
        <Navbar />

        {/* ── HERO TEXT ── */}
        <div className="relative z-[5] text-center pt-28 sm:pt-36 pb-4 px-5 sm:px-6">

          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-violet-700/[0.10] border border-violet-500/[0.16] px-4 sm:px-5 py-1.5 rounded-full mb-7 sm:mb-8"
            style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .1s both" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block shrink-0"
              style={{ animation: "shimmer 2s ease-in-out infinite" }}
            />
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-purple-300/70">
              Live Trading Mentorship
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-serif font-normal text-purple-50 max-w-[780px] mx-auto leading-[1.08] sm:leading-[1.06] tracking-[-0.02em] mb-4 sm:mb-5 px-2 sm:px-0"
            style={{
              fontSize: "clamp(32px,7vw,68px)",
              animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .25s both",
            }}
          >
            Learn to Navigate the{" "}
            {/* break to new line only on md+ */}
            <span className="hidden sm:inline"><br /></span>
            <span className="font-serif italic text-purple-300">Stock Market</span>{" "}
            <span className="font-serif text-white/90">Confidently</span>
          </h1>

          {/* Sub */}
          <p
            className="font-sans text-[13px] sm:text-[14px] font-light text-purple-200/40 max-w-[340px] sm:max-w-[400px] mx-auto mb-8 sm:mb-10 leading-[1.8] tracking-[0.02em]"
            style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .40s both" }}
          >
            Professional strategies, risk management & market
            psychology — taught through real live sessions.
          </p>

          {/* CTAs — stack on mobile, side-by-side on sm+ */}
          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10 sm:mb-14 px-6 sm:px-0"
            style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .55s both" }}
          >
            <button className="relative overflow-hidden w-full sm:w-auto bg-gradient-to-r from-violet-700 to-purple-500 text-white font-serif text-[14px] tracking-[0.02em] px-8 py-3 rounded-2xl hover:brightness-110 hover:-translate-y-px transition-all duration-200 shadow-[0_4px_24px_rgba(139,92,246,0.30)] border-0 cursor-pointer">
              <span className="absolute inset-x-0 top-0 h-px bg-white/20" />
              Join the Community
            </button>
            <button className="w-full sm:w-auto font-serif text-[14px] tracking-[0.02em] text-purple-200/55 px-8 py-3 rounded-2xl border border-purple-400/[0.16] hover:border-purple-400/35 hover:text-purple-100/80 transition-all duration-200 bg-transparent cursor-pointer">
              Our Programs
            </button>
          </div>

          {/* Decorative line */}
          <div
            className="flex justify-center"
            style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .65s both" }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-purple-400/25 to-transparent" />
          </div>
        </div>

        {/* ── CAROUSEL ── */}
        <div
          className="relative z-[5] w-full max-w-[900px] mx-auto px-0 sm:px-4 pb-12 sm:pb-16"
          style={{ animation: "fadeUp 1.1s cubic-bezier(.16,1,.3,1) .75s both" }}
        >
          <MarketCarousel />

          {/* ground reflection */}
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 [background:linear-gradient(to_top,#06010F_0%,transparent_100%)] pointer-events-none" />
        </div>

        {/* Footer note */}
        <div className="relative z-[5] text-center pb-8 sm:pb-10 font-sans text-[10px] tracking-[0.08em] text-purple-400/20">
          © 2026 NTA Trading Academy — All rights reserved
        </div>

      </section>
    </>
  )
}