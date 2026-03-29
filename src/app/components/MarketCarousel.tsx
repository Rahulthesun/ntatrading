"use client";

import { useEffect, useState } from "react";
import type { QuoteResult } from "@/app/api/market-data/route";

/* ══════════════════════════════════════
   STATIC ICONS
══════════════════════════════════════ */
const ICONS: Record<string, React.ReactNode> = {
  "GC=F": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><radialGradient id="goldBg" cx="40%" cy="35%"><stop offset="0%" stopColor="#fde68a"/><stop offset="60%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#b45309"/></radialGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#goldBg)"/>
      <path d="M16 7L19.5 13.5L27 14.5L21.5 19.5L23 27L16 23.5L9 27L10.5 19.5L5 14.5L12.5 13.5Z" fill="#fef3c7" opacity="0.9" stroke="#f59e0b" strokeWidth="0.5"/>
    </svg>
  ),
  "SI=F": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><radialGradient id="silverBg" cx="40%" cy="35%"><stop offset="0%" stopColor="#f1f5f9"/><stop offset="60%" stopColor="#94a3b8"/><stop offset="100%" stopColor="#475569"/></radialGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#silverBg)"/>
      <ellipse cx="16" cy="16" rx="7" ry="7" fill="#e2e8f0" opacity="0.8"/>
      <ellipse cx="13.5" cy="13.5" rx="2.5" ry="2" fill="white" opacity="0.5"/>
    </svg>
  ),
  "CL=F": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><radialGradient id="oilBg" cx="40%" cy="35%"><stop offset="0%" stopColor="#292524"/><stop offset="60%" stopColor="#1c1917"/><stop offset="100%" stopColor="#0c0a09"/></radialGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#oilBg)"/>
      <path d="M16 8C16 8 10 14 10 18C10 21.3 12.7 24 16 24C19.3 24 22 21.3 22 18C22 14 16 8 16 8Z" fill="#78716c" opacity="0.9"/>
    </svg>
  ),
  "NG=F": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><radialGradient id="gasBg" cx="40%" cy="35%"><stop offset="0%" stopColor="#bfdbfe"/><stop offset="60%" stopColor="#3b82f6"/><stop offset="100%" stopColor="#1d4ed8"/></radialGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#gasBg)"/>
      <path d="M16 8C14 10 12 12 12 15C12 16.5 12.8 17.5 14 18C13.5 16 14.5 14.5 16 14C15 16 15.5 17.5 17 18.5C18 17.5 20 16 20 14C20 11 18 9 16 8Z" fill="#93c5fd" opacity="0.9"/>
    </svg>
  ),
  "HG=F": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><radialGradient id="cuBg" cx="40%" cy="35%"><stop offset="0%" stopColor="#fdba74"/><stop offset="60%" stopColor="#ea580c"/><stop offset="100%" stopColor="#9a3412"/></radialGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#cuBg)"/>
      <circle cx="16" cy="16" r="7" fill="#fb923c" opacity="0.8"/>
    </svg>
  ),
  "^NSEI": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="niftyBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#4c1d95"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#niftyBg)"/>
      <polyline points="7,20 11,15 14,18 18,11 21,14 25,9" stroke="#c4b5fd" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "^BSESN": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="sensexBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0ea5e9"/><stop offset="100%" stopColor="#0369a1"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#sensexBg)"/>
      <polyline points="7,21 10,16 13,18 17,12 20,15 25,10" stroke="#bae6fd" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "^NSEBANK": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="bankBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#065f46"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#bankBg)"/>
      <rect x="9" y="14" width="3" height="9" rx="0.5" fill="#6ee7b7" opacity="0.8"/>
      <rect x="14" y="12" width="3" height="11" rx="0.5" fill="#34d399" opacity="0.9"/>
      <rect x="19" y="15" width="3" height="8" rx="0.5" fill="#6ee7b7" opacity="0.8"/>
      <polygon points="16,8 8,13 24,13" fill="#a7f3d0" opacity="0.6"/>
    </svg>
  ),
  "RELIANCE.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="relBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1e40af"/><stop offset="100%" stopColor="#1e3a8a"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#relBg)"/>
      <text x="16" y="20.5" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="800" fontFamily="serif">R</text>
    </svg>
  ),
  "TCS.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="tcsBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#be123c"/><stop offset="100%" stopColor="#881337"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#tcsBg)"/>
      <text x="16" y="20.5" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="800" fontFamily="sans-serif">TCS</text>
    </svg>
  ),
  "HDFCBANK.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="hdfcBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#dc2626"/><stop offset="100%" stopColor="#991b1b"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#hdfcBg)"/>
      <text x="16" y="19" textAnchor="middle" fill="#fca5a5" fontSize="7" fontWeight="700" fontFamily="sans-serif">HDFC</text>
    </svg>
  ),
  "INFY.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="infyBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0284c7"/><stop offset="100%" stopColor="#075985"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#infyBg)"/>
      <text x="16" y="20.5" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="700" fontFamily="sans-serif">Infy</text>
    </svg>
  ),
  "ICICIBANK.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="iciciBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#d97706"/><stop offset="100%" stopColor="#92400e"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#iciciBg)"/>
      <text x="16" y="20.5" textAnchor="middle" fill="#fde68a" fontSize="7.5" fontWeight="700" fontFamily="sans-serif">ICICI</text>
    </svg>
  ),
  "TATAMOTORS.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="tataBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#059669"/><stop offset="100%" stopColor="#064e3b"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#tataBg)"/>
      <path d="M8 19L9 15L12 13L19 13L23 15L24 19Z" fill="#6ee7b7" opacity="0.8"/>
      <circle cx="11" cy="20" r="2" fill="#34d399"/>
      <circle cx="21" cy="20" r="2" fill="#34d399"/>
    </svg>
  ),
  "BAJFINANCE.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="bajajBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#5b21b6"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#bajajBg)"/>
      <text x="16" y="19.5" textAnchor="middle" fill="#ddd6fe" fontSize="7" fontWeight="700" fontFamily="sans-serif">BAJAJ</text>
    </svg>
  ),
  "WIPRO.NS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <defs><linearGradient id="wiproBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0f766e"/><stop offset="100%" stopColor="#134e4a"/></linearGradient></defs>
      <circle cx="16" cy="16" r="14" fill="url(#wiproBg)"/>
      <text x="16" y="20.5" textAnchor="middle" fill="#5eead4" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">W</text>
    </svg>
  ),
};

const DefaultIcon = ({ letter }: { letter: string }) => (
  <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
    <circle cx="16" cy="16" r="14" fill="#1e1040"/>
    <text x="16" y="20.5" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="700" fontFamily="sans-serif">{letter}</text>
  </svg>
);

const FALLBACK: QuoteResult[] = [
  { ticker:"GC=F",           name:"Gold",          category:"Commodity", price:"₹72,480", chg:"+0.84%", chgPct:"+0.84%", up:true,  spark:[50,54,52,58,55,61,59,65,62,68,65,70,68,74,72,78] },
  { ticker:"SI=F",           name:"Silver",        category:"Commodity", price:"₹89,200", chg:"+0.31%", chgPct:"+0.31%", up:true,  spark:[40,44,41,48,45,52,49,56,53,60,57,64,62,68,66,72] },
  { ticker:"CL=F",           name:"Crude Oil",     category:"Commodity", price:"₹6,842",  chg:"-1.12%", chgPct:"-1.12%", up:false, spark:[80,76,78,74,72,75,70,73,68,72,66,70,64,68,62,65] },
  { ticker:"NG=F",           name:"Natural Gas",   category:"Commodity", price:"₹213",    chg:"+2.45%", chgPct:"+2.45%", up:true,  spark:[30,35,32,38,36,42,39,45,43,49,46,52,50,56,54,60] },
  { ticker:"HG=F",           name:"Copper",        category:"Commodity", price:"₹792",    chg:"+0.62%", chgPct:"+0.62%", up:true,  spark:[40,44,41,48,45,52,49,56,53,60,57,64,62,68,66,72] },
  { ticker:"^NSEI",          name:"NIFTY 50",      category:"Index",     price:"24,832",  chg:"+0.84%", chgPct:"+0.84%", up:true,  spark:[50,54,52,58,55,61,59,65,62,68,65,70,68,74,72,78] },
  { ticker:"^BSESN",         name:"SENSEX",        category:"Index",     price:"81,520",  chg:"+0.97%", chgPct:"+0.97%", up:true,  spark:[40,44,41,48,45,52,49,56,53,60,57,64,62,68,66,72] },
  { ticker:"^NSEBANK",       name:"BANKNIFTY",     category:"Index",     price:"52,140",  chg:"+2.08%", chgPct:"+2.08%", up:true,  spark:[30,35,32,38,36,42,39,45,43,49,46,52,50,56,54,60] },
  { ticker:"RELIANCE.NS",    name:"Reliance",      category:"Large Cap", price:"₹2,941",  chg:"+3.21%", chgPct:"+3.21%", up:true,  spark:[50,54,52,58,55,61,59,65,62,68,65,70,68,74,72,78] },
  { ticker:"TCS.NS",         name:"TCS",           category:"IT",        price:"₹3,812",  chg:"-0.42%", chgPct:"-0.42%", up:false, spark:[80,76,78,74,72,75,70,73,68,72,66,70,64,68,62,65] },
  { ticker:"HDFCBANK.NS",    name:"HDFC Bank",     category:"Banking",   price:"₹1,623",  chg:"-0.38%", chgPct:"-0.38%", up:false, spark:[65,62,64,60,58,61,57,60,56,59,54,58,52,56,50,54] },
  { ticker:"INFY.NS",        name:"Infosys",       category:"IT",        price:"₹1,487",  chg:"+2.11%", chgPct:"+2.11%", up:true,  spark:[30,35,32,38,36,42,39,45,43,49,46,52,50,56,54,60] },
  { ticker:"ICICIBANK.NS",   name:"ICICI Bank",    category:"Banking",   price:"₹1,204",  chg:"+0.93%", chgPct:"+0.93%", up:true,  spark:[40,44,41,48,45,52,49,56,53,60,57,64,62,68,66,72] },
  { ticker:"TATAMOTORS.NS",  name:"Tata Motors",   category:"Auto",      price:"₹978",    chg:"+3.42%", chgPct:"+3.42%", up:true,  spark:[50,54,52,58,55,61,59,65,62,68,65,70,68,74,72,78] },
  { ticker:"BAJFINANCE.NS",  name:"Bajaj Finance", category:"NBFC",      price:"₹6,934",  chg:"+1.78%", chgPct:"+1.78%", up:true,  spark:[30,35,32,38,36,42,39,45,43,49,46,52,50,56,54,60] },
  { ticker:"WIPRO.NS",       name:"Wipro",         category:"IT",        price:"₹462",    chg:"-0.52%", chgPct:"-0.52%", up:false, spark:[65,62,64,60,58,61,57,60,56,59,54,58,52,56,50,54] },
];

/* ══════════════════════════════════════
   SPARKLINE
══════════════════════════════════════ */
function Spark({ data, up }: { data: number[]; up: boolean }) {
  const W = 72, H = 28, pad = 2;
  const mn = Math.min(...data) - 2;
  const mx = Math.max(...data) + 2;
  const sy  = (v: number) => H - pad - ((v - mn) / (mx - mn)) * (H - pad * 2);
  const st  = (W - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => `${pad + i * st},${sy(v)}`).join(" ");
  const area = `${pad},${H} ${pts} ${pad + (data.length - 1) * st},${H}`;
  const color = up ? "#4ade80" : "#f87171";
  const uid = `sg-${Math.random().toString(36).slice(2, 8)}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.20"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#${uid})`}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ══════════════════════════════════════
   CARD — wider to fill the row
══════════════════════════════════════ */
function MarketCard({ card }: { card: QuoteResult }) {
  const icon = ICONS[card.ticker] ?? <DefaultIcon letter={card.name[0]} />;
  return (
    <div
      className="shrink-0 flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 cursor-default select-none"
      style={{
        width: "220px",
        background: "rgba(13,5,32,0.65)",
        border: "1px solid rgba(160,80,255,0.10)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.28)",
      }}
    >
      {/* icon */}
      <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0">{icon}</div>

      {/* name + price */}
      <div className="flex-1 min-w-0">
        <p className="font-sans text-[12px] font-semibold text-white/90 leading-none truncate">{card.name}</p>
        <p className="font-sans text-[9px] tracking-[0.10em] text-purple-400/40 mt-[3px] uppercase">{card.category}</p>
        <p className="font-serif text-[15px] text-white/90 leading-none mt-1.5">{card.price}</p>
        <p className={`font-sans text-[10px] font-medium mt-0.5 ${card.up ? "text-green-400" : "text-red-400"}`}>
          {card.up ? "▲" : "▼"} {card.chg}
        </p>
      </div>

      {/* sparkline */}
      <Spark data={card.spark} up={card.up} />
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN EXPORT — single infinite row, left→right, full viewport width
══════════════════════════════════════ */
export function MarketCarousel() {
  const [data, setData]             = useState<QuoteResult[]>(FALLBACK);
  const [loading, setLoading]       = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const refresh = async () => {
    try {
      const res = await fetch("/api/market-data");
      if (!res.ok) throw new Error("bad");
      const json: QuoteResult[] = await res.json();
      if (Array.isArray(json) && json.length > 0) {
        setData(json);
        setLastUpdated(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch {
      /* keep fallback */
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, 10 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  /* duplicate list so the loop is seamless */
  const looped = [...data, ...data, ...data];

  return (
    <div className="relative w-full overflow-hidden">
      <style>{`
        @keyframes tickerFwd {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
        .ticker-track { animation: tickerFwd 48s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      {/* left + right edge fades — blend into the card's bg colour */}
      <div
        className="absolute left-0 inset-y-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #160035, transparent)" }}
      />
      <div
        className="absolute right-0 inset-y-0 w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #160035, transparent)" }}
      />

      {/* the scrolling track */}
      <div className="ticker-track flex gap-3 w-max">
        {looped.map((card, i) => (
          <MarketCard key={i} card={card} />
        ))}
      </div>

      {/* live pill */}
      {!loading && lastUpdated && (
        <p className="text-center font-sans text-[9px] tracking-[0.12em] text-purple-400/25 mt-3">
          Live · updated {lastUpdated}
        </p>
      )}
    </div>
  );
}