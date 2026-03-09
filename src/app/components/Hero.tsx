import { useEffect, useRef, useState } from "react"

/* ─── CDN Script Loader ───────────────────────────────────────── */
function useScript(src: string) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      setReady(true)
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true
    script.onload = () => setReady(true)

    document.head.appendChild(script)
  }, [src])

  return ready
}

/* ─── Ticker Data ─────────────────────────────────────────────── */
const TICKERS = [
  { sym: "NIFTY 50", val: "24,832", chg: "+1.24%", up: true },
  { sym: "BANKNIFTY", val: "52,140", chg: "+2.08%", up: true },
  { sym: "SENSEX", val: "81,520", chg: "+0.97%", up: true },
  { sym: "RELIANCE", val: "₹2,941", chg: "+3.21%", up: true },
  { sym: "TCS", val: "₹4,128", chg: "-0.42%", up: false },
  { sym: "INFY", val: "₹1,820", chg: "+1.85%", up: true },
  { sym: "HDFC BANK", val: "₹1,672", chg: "+0.63%", up: true },
  { sym: "NIFTY CE", val: "₹148.50", chg: "+12.8%", up: true },
]

/* ─── Mini Chart ─────────────────────────────────────────────── */
const RAW = [52,58,54,67,63,72,68,80,76,88,84,96,92,105,101,112]

function MiniChart() {
  const W = 340
  const H = 90
  const pad = 6

  const mn = Math.min(...RAW) - 4
  const mx = Math.max(...RAW) + 4

  const sy = (v: number) =>
    H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2)

  const step = (W - pad * 2) / (RAW.length - 1)

  const pts = RAW.map((v, i) => `${pad + i * step},${sy(v)}`).join(" ")

  const area = `${pad},${H} ${pts} ${pad + (RAW.length - 1) * step},${H}`

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>

      <polygon points={area} fill="url(#areaG)" />

      <polyline
        points={pts}
        fill="none"
        stroke="#a855f7"
        strokeWidth="1.5"
      />
    </svg>
  )
}

/* ─── Gauge ──────────────────────────────────────────────────── */
function Gauge({ pct = 72 }: { pct?: number }) {
  const r = 44
  const cx = 56
  const cy = 56
  const stroke = 8

  const circ = Math.PI * r
  const offset = circ * (1 - pct / 100)

  return (
    <svg width={112} height={72} viewBox="0 0 112 72">
      <defs>
        <linearGradient id="gaugeG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="rgba(168,85,247,0.12)"
        strokeWidth={stroke}
      />

      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="url(#gaugeG)"
        strokeWidth={stroke}
        strokeDasharray={`${circ}`}
        strokeDashoffset={offset}
      />

      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fill="#e9d5ff"
        fontSize="14"
        fontWeight="700"
      >
        {pct}%
      </text>
    </svg>
  )
}

/* ─── Progress Bar ───────────────────────────────────────────── */
function ProgressBar({
  pct,
  label,
  val,
}: {
  pct: number
  label: string
  val: string
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-purple-200/70 mb-1">
        <span>{label}</span>
        <span>{val}</span>
      </div>

      <div className="h-1.5 bg-purple-500/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-700 to-purple-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

/* ─── Main Hero ───────────────────────────────────────────────── */

export default function NTAHero() {
  const gsapReady = useScript(
    "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
  )

  const rootRef = useRef<HTMLDivElement>(null)

  const fc1 = useRef<HTMLDivElement>(null)
  const fc2 = useRef<HTMLDivElement>(null)
  const fc3 = useRef<HTMLDivElement>(null)
  const fc4 = useRef<HTMLDivElement>(null)

  const [activeTab, setActiveTab] = useState("Personal")

  useEffect(() => {
    if (!gsapReady || !(window as any).gsap) return

    const g = (window as any).gsap

    const tl = g.timeline()

    tl.from(".n-badge", { y: -24, opacity: 0, duration: 0.6 })
      .from(".n-title", { y: 60, opacity: 0, duration: 1 }, "-=0.3")
      .from(".n-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")

    ;[
      [fc1, 3.8, -18],
      [fc2, 4.4, -14],
      [fc3, 5.1, -22],
      [fc4, 4.7, -16],
    ].forEach(([r, d, y]: any) => {
      if (!r.current) return
      g.to(r.current, {
        y,
        duration: d,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    })
  }, [gsapReady])

  return (
    <section
      ref={rootRef}
      className="bg-[#07020F] text-purple-50 min-h-screen overflow-hidden"
    >
      {/* NAVBAR */}

      <nav className="flex justify-between items-center px-12 h-[70px] border-b border-purple-500/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-700 to-purple-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            </svg>
          </div>

          <div>
            <p className="font-bold">NTA</p>
            <p className="text-xs text-purple-300/60">
              Trading Academy
            </p>
          </div>
        </div>

        <div className="flex gap-6 text-sm text-purple-200/60">
          {["Programs", "Results", "Blog", "Contact"].map((l) => (
            <a key={l}>{l}</a>
          ))}
        </div>

        <button className="bg-gradient-to-r from-violet-700 to-purple-500 px-5 py-2 rounded-lg text-sm font-semibold">
          Book Free Demo
        </button>
      </nav>

      {/* HERO */}

      <div className="text-center pt-24 px-6">

        <div className="n-badge inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1 rounded-full mb-6 text-xs uppercase tracking-widest text-purple-300">
          Live Trading Mentorship
        </div>

        <h1 className="n-title text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Master the{" "}
          <span className="text-purple-400">Stock Market</span>
          <br />
          with{" "}
          <span className="text-purple-400">
            Real Live Trades
          </span>
        </h1>

        <p className="n-sub max-w-xl mx-auto text-purple-200/60 mb-10">
          Learn professional trading strategies, risk management
          and market psychology through real market sessions.
        </p>

        <div className="flex justify-center gap-4 mb-20">
          <button className="bg-gradient-to-r from-violet-700 to-purple-500 px-8 py-3 rounded-xl font-semibold">
            Join the Community
          </button>

          <button className="border border-purple-500/30 px-8 py-3 rounded-xl text-purple-200/80">
            View Curriculum
          </button>
        </div>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 pb-24">

        <div className="bg-purple-900/20 border border-purple-500/10 rounded-xl p-5">
          <h3 className="text-sm mb-3">My Goals</h3>

          <ProgressBar
            pct={78}
            label="Profitable Month"
            val="78%"
          />

          <ProgressBar
            pct={56}
            label="Risk Discipline"
            val="56%"
          />
        </div>

        <div className="bg-purple-900/20 border border-purple-500/10 rounded-xl p-5">

          <h3 className="mb-3 text-sm">Live Dashboard</h3>

          <MiniChart />

        </div>

        <div className="bg-purple-900/20 border border-purple-500/10 rounded-xl p-5">

          <h3 className="text-sm mb-3">Performance</h3>

          <Gauge pct={72} />

        </div>

      </div>
    </section>
  )
}