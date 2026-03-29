{/*
  
  // Home — default behaviour, no props needed
<Hero />

// Programs page — custom headline, no ticker
<Hero
  headline="Master Every Strategy, One Course at a Time"
  hasMarketTicker={false}
/>

// About page — JSX headline with a styled word
<Hero
  headline={<>Built by Traders,<br/>For Traders</>}
  hasMarketTicker={false}
/>

*/}


import { MarketCarousel } from "./MarketCarousel"




interface HeroProps {
  headline?: React.ReactNode
  hasMarketTicker?: boolean
}

export default function Hero({
  headline = (
    <>
      Learn to Navigate the{" "}
      <br className="hidden sm:block" />
      Stock Market Confidently
    </>
  ),
  hasMarketTicker = true,
}: HeroProps) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <section
        id="hero"
        className="relative text-purple-50 min-h-screen overflow-x-hidden font-sans"
        style={{ background: "transparent" }}
      >
        {/* ── CENTRAL CARD ── */}
        <div
          className="relative z-[5] flex flex-col items-center px-4 sm:px-8 pt-28 sm:pt-32 pb-10"
          style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .1s both" }}
        >
          <div
            className="relative w-full max-w-7xl rounded-4xl overflow-hidden"
            style={{
              background: "radial-gradient(145% 125% at 50% 95%, rgb(209, 85, 251) 0%, #1e1b4b 50%, #0d0b2a 100%)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
            }}
          >
            {/* Content — padded */}
            <div className="relative z-[2] text-center px-6 sm:px-12 pt-12 sm:pt-16 pb-8">

              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
                style={{
                  background: "rgba(120,40,220,0.18)",
                  border: "1px solid rgba(160,80,255,0.25)",
                  animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .2s both",
                }}
              >
                <span
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "#c084fc", display: "inline-block",
                    boxShadow: "0 0 8px #c084fc", flexShrink: 0,
                  }}
                />
                <span
                  className="font-sans text-[10px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "rgba(216,180,254,0.8)" }}
                >
                  Namma Trading Academy
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-bold text-[35px] sm:text-[70px] text-left sm:text-center font-normal max-w-[780px] mx-auto leading-[1.07] tracking-[-0.02em] mb-5"
                style={{
                  color: "#f5f0ff",
                  animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .35s both",
                }}
              >
                {headline}
              </h1>

              {/* Subtext */}
              <p
                className="font-sans text-[14px] sm:text-[15px] font-light max-w-[440px] mx-auto mb-10 leading-[1.8]"
                style={{
                  color: "rgba(216,180,254,0.40)",
                  animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .5s both",
                }}
              >
                Professional strategies, risk management & market psychology —
                taught through real live sessions.
              </p>

              {/* CTAs */}
              <div
                className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-10 sm:mb-12"
                style={{ animation: "fadeUp .9s cubic-bezier(.16,1,.3,1) .62s both" }}
              >
                <button
                  className="relative overflow-hidden w-full sm:w-auto text-white font-serif text-[15px] tracking-[0.02em] px-10 py-3.5 rounded-xl hover:brightness-110 hover:-translate-y-px transition-all duration-200 cursor-pointer border-0"
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #7c3aed, #6d28d9)",
                    boxShadow: "0 4px 32px rgba(147,51,234,0.55), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <span className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)" }} />
                  Join the Community
                </button>

                <button
                  className="w-full sm:w-auto font-serif text-[15px] tracking-[0.02em] px-10 py-3.5 rounded-xl transition-all duration-200 bg-transparent cursor-pointer"
                  style={{ color: "rgba(216,180,254,0.6)", border: "1px solid rgba(160,80,255,0.25)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(160,80,255,0.55)"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "rgba(233,213,255,0.9)"
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(160,80,255,0.25)"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "rgba(216,180,254,0.6)"
                  }}
                >
                  Our Programs
                </button>
              </div>

              {/* Divider */}
              <div className="flex justify-center mb-8">
                <div className="h-px w-28" style={{ background: "linear-gradient(90deg,transparent,rgba(160,80,255,0.28),transparent)" }} />
              </div>
            </div>

            {/* ── CAROUSEL ── */}
            {hasMarketTicker && (
              <div
                className="relative w-full pb-8 sm:pb-10"
                style={{ animation: "fadeUp 1.1s cubic-bezier(.16,1,.3,1) .78s both" }}
              >
                <MarketCarousel />
              </div>
            )}

          </div>
        </div>

        {/* Footer note */}
        <div
          className="relative z-[5] text-center pb-8 font-sans text-[10px] tracking-[0.08em]"
          style={{ color: "rgba(120,40,200,0.30)" }}
        >
          © 2026 NTA Trading Academy — All rights reserved
        </div>
      </section>
    </>
  )
}