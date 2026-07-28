import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  ArrowLeft, ArrowRight, BookOpen, Clock, TrendingUp,
  BarChart3, Globe, Zap, Star, ChevronLeft, ChevronRight,
  Quote, Calendar, Tag,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import Hero from "../components/Hero"
import { ContactSection } from "../components/ContactSection";

/* ══════════════════════════════════════════════════════════════
   SHARED PRIMITIVES  (same as Programs page)
══════════════════════════════════════════════════════════════ */
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >{children}</motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      <div className="h-px w-6 bg-purple-500/40" />
      <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-purple-300/75">{children}</span>
    </div>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-serif font-normal leading-[1.08] tracking-[-0.02em] text-purple-50 ${className}`}
      style={{ fontSize: "clamp(28px,3.6vw,48px)" }}>
      {children}
    </h2>
  );
}

function Italic({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-purple-50">
      {children}
    </span>
  );
}

function Rule() {
  return <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/[0.11] to-transparent" />;
}

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
const FEATURED = [
  {
    id: 1,
    tag: "Trading Psychology",
    tagIcon: TrendingUp,
    title: "8 Common Mistakes Indian Stock Market Beginners Should Avoid",
    excerpt:
      "Learn how institutional order flow impacts price movement, liquidity, and market structure.",
    readTime: "11 min read",
    date: "Updated",
    link: "https://www.investopedia.com/articles/stocks/07/beat_the_mistakes.asp",
    accent: "from-violet-500/20 to-purple-400/5",
    border: "border-violet-500/18",
    dot: "bg-violet-400",
  },
  {
    id: 2,
    tag: "Options",
    tagIcon: BarChart3,
    title: "Implied Volatility (IV): What It Means in Options Trading",
    excerpt:
      "Understand implied volatility, IV crush, and why options prices change before major market events.",
    readTime: "9 min read",
    date: "Updated",
    link: "https://www.investopedia.com/terms/i/iv.asp",
    accent: "from-purple-500/18 to-fuchsia-400/5",
    border: "border-purple-500/18",
    dot: "bg-purple-400",
  },
  {
    id: 3,
    tag: "Commodities",
    tagIcon: Globe,
    title: "Gold Trading Guide",
    excerpt:
      "Discover how interest rates, inflation, and the US Dollar influence gold prices.",
    readTime: "10 min read",
    date: "Updated",
    link: "https://www.investopedia.com/articles/basics/08/invest-in-gold.asp",
    accent: "from-fuchsia-500/15 to-purple-400/5",
    border: "border-fuchsia-500/16",
    dot: "bg-fuchsia-400",
  },
  {
    id: 4,
    tag: "Psychology",
    tagIcon: Zap,
    title: "The Psychology of Trading",
    excerpt:
      "Master emotional discipline and learn why psychology matters more than strategy.",
    readTime: "8 min read",
    date: "Updated",
    link: "https://www.investopedia.com/articles/trading/02/110502.asp",
    accent: "from-rose-500/12 to-purple-400/5",
    border: "border-rose-500/14",
    dot: "bg-rose-400",
  },
  {
    id: 5,
    tag: "Risk Management",
    tagIcon: BarChart3,
    title: "Position Sizing: Why It Matters",
    excerpt:
      "Explore proven position sizing techniques that help professional traders survive long-term.",
    readTime: "9 min read",
    date: "Updated",
    link: "https://www.investopedia.com/articles/trading/09/determine-position-size.asp",
    accent: "from-amber-500/12 to-purple-400/5",
    border: "border-amber-500/14",
    dot: "bg-amber-400",
  },
];

const ALL_ARTICLES = [
  {
    id: 6,
    tag: "Equity",
    title: "Support and Resistance Basics",
    readTime: "6 min",
    date: "Updated",
    link: "https://www.investopedia.com/trading/support-and-resistance-basics/",
  },
  {
    id: 7,
    tag: "Options",
    title: "Iron Condor: How This Options Strategy Works",
    readTime: "8 min",
    date: "Updated",
    link: "https://www.investopedia.com/terms/i/ironcondor.asp",
  },
  {
  id: 8,
  tag: "Psychology",
  title: "Trading Psychology: Definition, Examples & Importance",
  readTime: "6 min",
  date: "Updated",
  link: "https://www.investopedia.com/terms/t/trading-psychology.asp",
},
  {
    id: 9,
    tag: "Market",
    title: "What Is Level II Market Data?",
    readTime: "7 min",
    date: "Updated",
    link: "https://www.investopedia.com/terms/l/level2.asp",
  },
 {
  id: 10,
  tag: "Market",
  title: "Volume Analysis: Understanding and Calculating Market Volume",
  readTime: "10 min",
  date: "Updated",
  link: "https://www.investopedia.com/terms/v/volume-analysis.asp",
},
  {
    id: 11,
    tag: "Equity",
    title: "Support and Resistance: A Complete Guide",
    readTime: "10 min",
    date: "Updated",
    link: "https://www.investopedia.com/trading/support-and-resistance-basics/",
  },
  {
    id: 12,
    tag: "Risk",
    title: "Maximum Drawdown Explained",
    readTime: "6 min",
    date: "Updated",
    link: "https://www.babypips.com/forexpedia/drawdown",
  },
  {
    id: 13,
    tag: "Options",
    title: "Delta Explained",
    readTime: "8 min",
    date: "Updated",
    link: "https://www.investopedia.com/terms/d/delta.asp",
  },
  {
  id: 14,
  tag: "Psychology",
  title: "How to Develop a Trading Brain",
  readTime: "6 min",
  date: "Updated",
  link: "https://www.investopedia.com/articles/basics/13/how-to-develop-trading-brain.asp",
},
];
const REVIEWS = [
  {
    name: "Praveen Kumar",
    location: "Chennai",
    program: "IPO & Equity Trading",
    stars: 5,
    text: "The staff who teaches from the heart — Sulakshana ma'am explained trading and the stock market to me with so much patience. No matter how many doubts I asked, she would calmly explain everything. Thanks to her guidance, I applied for an IPO for the first time and got the allotment on the very first try. Not only that — I even got a 50% return from it. The way ma'am teaches is far more valuable than any course I've seen. Seriously, joining here is more than worth it.",
  },
  {
    name: "Divya",
    location: "Chennai",
    program: "IPO, Equity & Futures",
    stars: 5,
    text: "I felt very happy and blessed that I joined the best trading classes. I joined here after seeing previous reviews, and I'm glad I did. Sana ma'am taught IPO, equity, futures and everything related to trading. She clears doubts on the spot and shows live trading experience, which gave us real confidence to invest. Ma'am taught all the strategies with live examples. Thank you so much, Sana ma'am.",
  },
  {
    name: "Vijay",
    location: "Chennai",
    program: "Stock Market Basics",
    stars: 5,
    text: "I had zero knowledge about trading before joining. But after 45 days of classes, I now know how to take trades and understand their types. Sana ma'am always respected every doubt and kept explaining until we understood. She shows live trading experience which gave us real confidence. She even supports students after course completion. I'm completely satisfied — this is one of the best stock market training institutes in Chennai, with an amazing course structure at minimum fees.",
  },
  {
    name: "Kishore",
    location: "Chennai",
    program: "Stock Market & IPO",
    stars: 5,
    text: "Sana ma'am has in-depth knowledge about the stock market. Her tactics and advice helped me learn about the market and earn significant profits. Thank you for your expert guidance on IPO investments!",
  },
  {
    name: "Raja",
    location: "Chennai",
    program: "Equity & Scalp Trading",
    stars: 5,
    text: "Ms. Sana, I wanted to express my sincere gratitude for your outstanding experience and teaching on the share market. Your dedication and enthusiasm are truly inspiring. Your ability guided me on how to select an IPO, where to buy equity, how to check if it's over or under valued, and your strategy helps me do scalp trading on BankNifty and Nifty. Thank you for your time and positive attitude in making such a meaningful difference in my stock market journey.",
  },
  {
    name: "Murali",
    location: "Chennai",
    program: "Intraday Trading",
    stars: 5,
    text: "During my vacation in Chennai, I had the wonderful opportunity to attend a stock market class conducted by Ms. Sana. Her expertise was nothing short of exceptional — she articulated complex concepts in an easily digestible manner. What stood out was her willingness to tailor the course to my specific interests in intraday trading. She went above and beyond to ensure I grasped the intricacies of intraday strategies, which has immensely contributed to my confidence in navigating the market. Her patience and dedication are commendable — a must-attend for anyone looking to deepen their knowledge.",
  },
];

const TAG_COLORS: Record<string, string> = {
  "Equity":      "bg-violet-400/10 text-violet-300 border-violet-400/20",
  "Options":     "bg-purple-400/10 text-purple-300 border-purple-400/20",
  "Commodities": "bg-fuchsia-400/10 text-fuchsia-300 border-fuchsia-400/20",
  "Psychology":  "bg-rose-400/10 text-rose-400 border-rose-400/20",
  "Risk Management": "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "Risk":        "bg-amber-400/10 text-amber-400 border-amber-400/20",
  "Market Analysis": "bg-sky-400/10 text-sky-400 border-sky-400/20",
  "Market":      "bg-sky-400/10 text-sky-400 border-sky-400/20",
};



function FeaturedCarousel() {
  const [current, setCurrent] = useState(0);
  const total = FEATURED.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  const article = FEATURED[current];
  const Icon = article.tagIcon;

  return (
    <section className="relative z-[5] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <FadeUp>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Eyebrow>Featured Articles</Eyebrow>
              <H2>Editor's <Italic>Picks.</Italic></H2>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-sans text-[11px] text-purple-300/65 tracking-[0.08em]">
                {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>

              <button onClick={prev}
                className="w-9 h-9 rounded-full border border-purple-500/20 bg-purple-500/[0.06] flex items-center justify-center text-purple-300/75 hover:text-purple-300 hover:border-purple-400/35 transition-all duration-200 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button onClick={next}
                className="w-9 h-9 rounded-full border border-purple-500/20 bg-purple-500/[0.06] flex items-center justify-center text-purple-300/75 hover:text-purple-300 hover:border-purple-400/35 transition-all duration-200 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </FadeUp>

        {/* CARD */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`relative bg-[#0C0420]/65 border ${article.border} backdrop-blur-xl rounded-3xl overflow-hidden`}>

              {/* shimmer */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/20 to-transparent" />

              {/* blob */}
              <div className={`absolute -top-16 -right-16 w-72 h-72 rounded-full bg-gradient-to-br ${article.accent} blur-3xl pointer-events-none`} />

              {/* GRID */}
              <div className="relative grid lg:grid-cols-[1fr_360px] divide-y lg:divide-y-0 lg:divide-x divide-purple-500/[0.08]">

                {/* LEFT */}
                <div className="p-5 sm:p-6 lg:p-12 flex flex-col">

                  <div className="flex items-center flex-wrap gap-2 mb-5">
                    <span className={`inline-flex items-center gap-1.5 font-sans text-[9px] font-bold tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border ${TAG_COLORS[article.tag] ?? "bg-purple-400/10 text-purple-300 border-purple-400/20"}`}>
                      <Icon className="w-3 h-3" /> {article.tag}
                    </span>

                    <span className="font-sans text-[11px] text-purple-300/65 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>

                    <span className="font-sans text-[11px] text-purple-300/65 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {article.date}
                    </span>
                  </div>

                  <h3
                    className="font-serif text-purple-50 leading-[1.2] tracking-[-0.015em] mb-4"
                    style={{ fontSize: "clamp(20px,5vw,34px)" }}
                  >
                    {article.title}
                  </h3>

                  {/* readability fix */}
                  <p className="font-sans text-[14px] text-white/85 leading-[1.85] flex-1 mb-8">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <a href={`${article.link}`} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none w-full">
                      <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 sm:flex-none justify-center inline-flex items-center gap-2 py-3 px-5 rounded-full bg-gradient-to-r from-violet-700 to-purple-500 font-sans font-semibold text-[13px] text-white border-0 cursor-pointer"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                    </a>
                    

                  </div>
                </div>

                {/* RIGHT — FIXED */}
                <div className="p-5 sm:p-6 lg:p-10 flex flex-col">

                  <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-purple-300/65 mb-4">
                    All Featured
                  </p>

                  {/* ✅ FIXED: vertical list (no overflow bug) */}
                  <div className="flex flex-col gap-2">
                    {FEATURED.map((a, i) => {
                      const AI = a.tagIcon;
                      return (
                        <button
                          key={a.id}
                          onClick={() => setCurrent(i)}
                          className={`
                            w-full text-left p-3 rounded-xl border transition-all duration-200
                            ${
                              i === current
                                ? "bg-purple-500/[0.10] border-purple-400/22"
                                : "bg-transparent border-transparent hover:border-purple-500/[0.10]"
                            }
                          `}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <AI className={`w-3 h-3 ${i === current ? "text-purple-400" : "text-purple-300/65"}`} />
                            <span className={`font-sans text-[9px] tracking-[0.12em] uppercase ${
                              i === current ? "text-purple-200/90" : "text-purple-300/55"
                            }`}>
                              {a.tag}
                            </span>
                          </div>

                          <p className={`font-sans text-[12px] leading-[1.4] line-clamp-2 ${
                            i === current ? "text-white/85" : "text-purple-200/70"
                          }`}>
                            {a.title}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* dots */}
                  <div className="flex items-center gap-1.5 mt-4">
                    {FEATURED.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`rounded-full transition-all ${
                          i === current ? "w-5 h-1.5 bg-purple-400" : "w-1.5 h-1.5 bg-purple-500/25"
                        }`}
                      />
                    ))}
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
/* ══════════════════════════════════════════════════════════════
   3 · ALL ARTICLES GRID
══════════════════════════════════════════════════════════════ */
function ArticlesGrid() {
  return (
    <section className="relative z-[5] py-20 px-6">
      <Rule />
      <div className="max-w-6xl mx-auto py-20">
        <FadeUp className="mb-12">
          <Eyebrow>All Articles</Eyebrow>
          <H2>Every Insight, <Italic>Indexed.</Italic></H2>
        </FadeUp>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_ARTICLES.map((a, i) => (
            <FadeUp key={a.id} delay={i * 0.05}>
              <a href={a.link} target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group h-full bg-[#0C0420]/55 border border-purple-500/[0.08] backdrop-blur-xl rounded-2xl p-6 cursor-pointer hover:border-purple-400/20 transition-colors duration-300 flex flex-col">

                <div className="flex items-center justify-between mb-5">
                  <span className={`inline-flex items-center gap-1.5 font-sans text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${TAG_COLORS[a.tag] ?? "bg-purple-400/10 text-purple-300 border-purple-400/20"}`}>
                    <Tag className="w-2.5 h-2.5" /> {a.tag}
                  </span>
                  <span className="font-sans text-[10.5px] text-purple-300/55 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {a.readTime}
                  </span>
                </div>

                <p className="font-serif text-[16px] text-white/85 leading-[1.45] mb-4 flex-1 group-hover:text-purple-50 transition-colors duration-300">
                  {a.title}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-purple-500/[0.07]">
                  <span className="font-sans text-[10.5px] text-purple-300/55 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> {a.date}
                  </span>
                  <span className="font-sans text-[11px] text-purple-300/65 group-hover:text-purple-300/60 flex items-center gap-1 transition-colors duration-200">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-10 flex justify-center">
          <button className="inline-flex items-center gap-2 py-3 px-8 rounded-full font-sans font-normal text-[13px] tracking-[0.04em] text-purple-100/75 border border-purple-400/[0.14] hover:border-purple-400/30 hover:text-purple-100/75 transition-all duration-200 bg-transparent cursor-pointer">
            Load More Articles <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </FadeUp>
      </div>
      <Rule />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4 · REVIEWS
══════════════════════════════════════════════════════════════ */
export function Reviews() {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(REVIEWS.length / perPage);
  const visible = REVIEWS.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="testimonials" className="relative z-[5] py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="text-center mb-14">
          <Eyebrow>Student Reviews</Eyebrow>
          <H2>Words from Traders Who <Italic>Made the Leap.</Italic></H2>
        </FadeUp>

        <AnimatePresence mode="wait">
          <motion.div key={page}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-3 gap-4 mb-10"
          >
            {visible.map((r, i) => (
              <div key={i}
                className="relative bg-[#0C0420]/65 border border-purple-500/[0.09] backdrop-blur-xl rounded-2xl p-7 flex flex-col">
                {/* top shimmer */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/18 to-transparent rounded-t-2xl" />

                {/* quote icon */}
                <div className="w-9 h-9 rounded-xl bg-purple-500/[0.08] border border-purple-400/[0.10] flex items-center justify-center mb-5">
                  <Quote className="w-4 h-4 text-purple-300/75" />
                </div>

                {/* stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: r.stars }).map((_, s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-sans text-[13px] font-normal text-white/82 leading-[1.8] flex-1 mb-6">
                  "{r.text}"
                </p>

                <div className="pt-5 border-t border-purple-500/[0.07]">
                  <p className="font-serif text-[15px] text-white/85">{r.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-sans text-[10.5px] text-purple-300/65">{r.location}</span>
                    <span className="w-0.5 h-0.5 rounded-full bg-purple-500/30" />
                    <span className="font-sans text-[10px] text-purple-300/55 tracking-[0.06em]">{r.program}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            className="w-9 h-9 rounded-full border border-purple-500/20 bg-purple-500/[0.06] flex items-center justify-center text-purple-300/75 hover:text-purple-300 hover:border-purple-400/35 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: pages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              className={`rounded-full transition-all duration-300 border-0 cursor-pointer ${
                i === page ? "w-5 h-1.5 bg-purple-400" : "w-1.5 h-1.5 bg-purple-500/25"
              }`} />
          ))}
          <button onClick={() => setPage(p => Math.min(pages - 1, p + 1))} disabled={page === pages - 1}
            className="w-9 h-9 rounded-full border border-purple-500/20 bg-purple-500/[0.06] flex items-center justify-center text-purple-300/75 hover:text-purple-300 hover:border-purple-400/35 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5 · BOTTOM CTA
══════════════════════════════════════════════════════════════ */
function BottomCTA() {
  return (
    <section className="relative z-[5] py-10 px-6">
      <Rule />
      <div className="relative max-w-3xl mx-auto text-center py-28">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[260px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center,rgba(139,92,246,0.09) 0%,transparent 70%)" }} />
        <FadeUp>
          <Eyebrow>Ready to Learn Live</Eyebrow>
          <H2 className="mb-5">
            Articles are Just the Start.<br /><Italic>Join a Program.</Italic>
          </H2>
          <p className="font-sans text-[14px] font-normal text-white/75 max-w-[400px] mx-auto leading-[1.8] mb-10">
            Book a free 20-minute call — we'll match you to the right program for your level and schedule.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden bg-gradient-to-r from-violet-700 to-purple-500 text-white font-sans text-[13px] font-semibold tracking-[0.04em] px-8 py-3.5 rounded-full border-0 cursor-pointer shadow-[0_4px_24px_rgba(139,92,246,0.38)] hover:shadow-[0_6px_32px_rgba(139,92,246,0.52)] transition-shadow duration-300 flex items-center gap-2">
              <span className="absolute inset-x-0 top-0 h-px bg-white/18" />
              <span className="relative">Schedule Free Consultation</span>
              <ArrowRight className="w-4 h-4 relative" />
            </motion.button>
            <Link to="/programs">
              <button className="font-sans text-[13px] font-normal tracking-[0.04em] text-purple-100/75 px-8 py-3.5 rounded-full border border-purple-400/[0.14] hover:border-purple-400/30 hover:text-purple-100/75 transition-all duration-200 bg-transparent cursor-pointer">
                View Programs
              </button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════ */
export default function Articles() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');
      `}</style>

      <div className="relative bg-gradient-to-br
        from-[#1d4ed8]
        via-[#0f172a]
        to-[#000000] text-white overflow-x-hidden font-sans min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-0" />

        <Navbar />
        <Hero
  headline="Master Every Strategy, One Course at a Time"
  hasMarketTicker={false}
/>

        <FeaturedCarousel />
        <ArticlesGrid />
        <ContactSection/>
        <BottomCTA />
        <Footer />

        <div className="relative z-[5] text-center py-8 border-t border-purple-500/[0.06] font-sans text-[10px] tracking-[0.08em] text-purple-400/18">
          © 2026 NTA Trading Academy · Chennai, Tamil Nadu
        </div>
      </div>
    </>
  );
}