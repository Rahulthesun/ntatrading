// app/api/market-data/route.ts  (Next.js App Router)
// npm install yahoofinance

//import { NextResponse } from "next/server";
//import yahooFinance from "yahoofinance";

/* ── Symbols ────────────────────────────────────────────────── */
const SYMBOLS = [
  // Commodities (MCX via Yahoo)
  { ticker: "GC=F",   name: "Gold",         category: "Commodity" },
  { ticker: "SI=F",   name: "Silver",       category: "Commodity" },
  { ticker: "CL=F",   name: "Crude Oil",    category: "Commodity" },
  { ticker: "NG=F",   name: "Natural Gas",  category: "Commodity" },
  { ticker: "HG=F",   name: "Copper",       category: "Commodity" },

  // Indian Indices
  { ticker: "^NSEI",  name: "NIFTY 50",     category: "Index"     },
  { ticker: "^BSESN", name: "SENSEX",       category: "Index"     },
  { ticker: "^NSEBANK", name: "BANKNIFTY",  category: "Index"     },

  // NSE Large Caps  (suffix .NS = NSE)
  { ticker: "RELIANCE.NS",   name: "Reliance",      category: "Large Cap" },
  { ticker: "TCS.NS",        name: "TCS",           category: "IT"        },
  { ticker: "HDFCBANK.NS",   name: "HDFC Bank",     category: "Banking"   },
  { ticker: "INFY.NS",       name: "Infosys",       category: "IT"        },
  { ticker: "ICICIBANK.NS",  name: "ICICI Bank",    category: "Banking"   },
  { ticker: "TATAMOTORS.NS", name: "Tata Motors",   category: "Auto"      },
  { ticker: "BAJFINANCE.NS", name: "Bajaj Finance", category: "NBFC"      },
  { ticker: "WIPRO.NS",      name: "Wipro",         category: "IT"        },
];

/* ── Simple in-memory cache (10 min) ───────────────────────── */
let cache: { data: QuoteResult[]; ts: number } | null = null;
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export interface QuoteResult {
  ticker:   string;
  name:     string;
  category: string;
  price:    string;
  chg:      string;
  chgPct:   string;
  up:       boolean;
  spark:    number[];
}

/* ── Helpers ────────────────────────────────────────────────── */
function fmtPrice(p: number, ticker: string): string {
  const isINR = ticker.endsWith(".NS") || ticker.startsWith("^NSE") || ticker.startsWith("^BSE");
  const sym   = isINR ? "₹" : "$";
  if (p >= 10000) return `${sym}${p.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  if (p >= 100)   return `${sym}${p.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  return `${sym}${p.toFixed(2)}`;
}

function fmtChg(chg: number): string {
  const sign = chg >= 0 ? "+" : "";
  return `${sign}${chg.toFixed(2)}%`;
}

async function fetchSpark(ticker: string): Promise<number[]> {
  try {
    const result = await yahooFinance.chart(ticker, {
      period1: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days
      interval: "1d",
    });
    return (result.quotes ?? [])
      .map((q: any) => q.close)
      .filter(Boolean)
      .slice(-16) as number[];
  } catch {
    // fallback flat line if spark fetch fails
    return Array.from({ length: 16 }, (_, i) => 50 + i);
  }
}

/* ── Route handler ──────────────────────────────────────────── */
export async function GET() {
  // serve cache if fresh
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" },
    });
  }

  try {
    // Batch quote fetch
    const quotes = await yahooFinance.quote(SYMBOLS.map(s => s.ticker));
    const quoteMap: Record<string, any> = {};
    (Array.isArray(quotes) ? quotes : [quotes]).forEach((q: any) => {
      if (q?.symbol) quoteMap[q.symbol] = q;
    });

    // Fetch sparklines in parallel (fire-and-forget per symbol)
    const sparks = await Promise.all(SYMBOLS.map(s => fetchSpark(s.ticker)));

    const data: QuoteResult[] = SYMBOLS.map((s, i) => {
      const q      = quoteMap[s.ticker];
      const price  = q?.regularMarketPrice ?? 0;
      const chgPct = q?.regularMarketChangePercent ?? 0;
      return {
        ticker:   s.ticker,
        name:     s.name,
        category: s.category,
        price:    fmtPrice(price, s.ticker),
        chg:      fmtChg(chgPct),
        chgPct:   fmtChg(chgPct),
        up:       chgPct >= 0,
        spark:    sparks[i],
      };
    });

    cache = { data, ts: Date.now() };

    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[market-data]", err);
    return NextResponse.json({ error: "fetch failed" }, { status: 500 });
  }
}