'use client';

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Link } from "react-router";
import { ArrowRight, Star, Quote } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────────
   DATA — all real testimonials from tradexcelsior.com/testimonials
───────────────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Daksh M Giriya",
    role: "Student",
    initials: "DG",
    quote:
      "This class exceeded my expectations in every way. The instructor explained concepts clearly, kept the sessions engaging, and encouraged questions, which made learning enjoyable and effective. The materials were well-organized, practical, and easy to apply in real-world trading scenarios.",
    tag: "Course Experience",
    color: "#00ff88",
    rating: 5,
  },
  {
    id: 2,
    name: "Harshal S",
    role: "Student",
    initials: "HS",
    quote:
      "It's a wonderful place to learn basics and advanced level of stock market. We are trained for over a month — the depth and patience of the instructors is unmatched.",
    tag: "Basics to Advanced",
    color: "#00d4ff",
    rating: 5,
  },
  {
    id: 3,
    name: "Jyoti Kammar",
    role: "Student",
    initials: "JK",
    quote:
      "I recently attended the Free Stock Market Training & Wealth Management sessions by Excelsior, and it was a fantastic experience! The instructors were highly knowledgeable and explained complex concepts in a simple and practical way. The session was an eye-opener for financial planning.",
    tag: "Wealth Management",
    color: "#ffc857",
    rating: 5,
  },
  {
    id: 4,
    name: "Manjunath Karlannavar",
    role: "Student",
    initials: "MK",
    quote:
      "I never thought learning stock trading could be this easy! The training is simple yet very effective. The live examples and strategies taught here helped me understand the market better. Highly recommended.",
    tag: "Live Training",
    color: "#bf80ff",
    rating: 5,
  },
  {
    id: 5,
    name: "Prashant Angadi",
    role: "Local Guide",
    initials: "PA",
    quote:
      "Attended a full day live training workshop on stock market with Prof. Mallikarjun Sajjan Sir. It was very informative and gave a clear direction on how to approach the market.",
    tag: "Workshop",
    color: "#00ff88",
    rating: 5,
  },
  {
    id: 6,
    name: "RX Varun Shetty",
    role: "Student",
    initials: "VS",
    quote:
      "I have completed their Basic to Master course. I felt it was good since I didn't have any idea about share market but from this course I got to learn a lot of new things. Mahesh Memane Sir's teaching skills were very good and study material is available for learning any time.",
    tag: "Basic to Master",
    color: "#00d4ff",
    rating: 5,
  },
  {
    id: 7,
    name: "Abhishek Mutnal",
    role: "Student",
    initials: "AM",
    quote:
      "I attended one day training of Mr. Mallikarjun Sir. It was a wonderful experience. Full of positive thoughts and a mission towards financial freedom. Lot of energy and motivational speech encouraged me to achieve my financial goals — a never before experience.",
    tag: "Financial Freedom",
    color: "#ffc857",
    rating: 5,
  },
  {
    id: 8,
    name: "Mallikarjun Koralli",
    role: "Student",
    initials: "MK",
    quote:
      "Vishwanath Sir's way of teaching is truly exceptional! His insights on trading and risk management have helped me improve my strategies. This academy provides the best learning experience for anyone interested in stock market investments.",
    tag: "Risk Management",
    color: "#bf80ff",
    rating: 5,
  },
  {
    id: 9,
    name: "Mahesh Mirje",
    role: "Student",
    initials: "MM",
    quote:
      "Taking this class was a transformative experience. Coming in as a beginner, I was initially overwhelmed by the complexity of the stock market, but the course broke everything down in a way that was easy to understand and apply. The practical sessions were the best part.",
    tag: "Beginner Friendly",
    color: "#00ff88",
    rating: 5,
  },
  {
    id: 10,
    name: "Nashrat Jahan",
    role: "Student",
    initials: "NJ",
    quote:
      "I had an incredible experience with the stock market and wealth training program. The sessions were highly informative, breaking down complex financial concepts into simple, actionable strategies. The instructors were knowledgeable, engaging, and patient.",
    tag: "Wealth Training",
    color: "#00d4ff",
    rating: 5,
  },
  {
    id: 11,
    name: "Anand Dhanapal",
    role: "Student",
    initials: "AD",
    quote:
      "The best place to learn stock market trading. The trainers make sure everyone understands the concepts, even beginners. The practical approach to teaching really helped me build confidence in trading.",
    tag: "Confidence Building",
    color: "#ffc857",
    rating: 5,
  },
  {
    id: 12,
    name: "Prajwal Hiremath",
    role: "Student",
    initials: "PH",
    quote:
      "I had an incredible experience with the stock market training and wealth management session offered by Excelsior Bangalore. The trainers were highly knowledgeable and simplified complex concepts, making it easy for beginners like me to understand the market dynamics.",
    tag: "Bangalore Batch",
    color: "#bf80ff",
    rating: 5,
  },
  {
    id: 13,
    name: "ANUP G A",
    role: "Student",
    initials: "AG",
    quote:
      "They teach us mainly on low risk and high reward — and it really works for many people for sure. A practical, results-driven approach that sets Excelsior apart.",
    tag: "Risk & Reward",
    color: "#00ff88",
    rating: 5,
  },
  {
    id: 14,
    name: "Shankareppa Kittur",
    role: "Student",
    initials: "SK",
    quote:
      "The training provided by Prof. Mallikarjun Sajjan Sir in the Workshop 'Train the Trainer' was encouraging and energetic — keeping me focused on minting money and absolute knowledge of stock market to achieve financial freedom.",
    tag: "Train the Trainer",
    color: "#00d4ff",
    rating: 5,
  },
  {
    id: 15,
    name: "TARUN NAIK",
    role: "Student",
    initials: "TN",
    quote:
      "I had an excellent experience with this institute. It offers a well-structured curriculum that caters to both beginners and advanced learners, covering everything from fundamental and technical analysis to live trading strategies. The mentorship is top-notch.",
    tag: "Structured Curriculum",
    color: "#ffc857",
    rating: 5,
  },
  {
    id: 16,
    name: "Babu Rajput",
    role: "Student",
    initials: "BR",
    quote:
      "Today I attended Honorable Sajjan Sir's live session on Train the Trainer. It was just amazing. I learnt about financial planning and this is going to help a lot for the rest of my life. Thank you very much sir for your valuable guidance.",
    tag: "Financial Planning",
    color: "#bf80ff",
    rating: 5,
  },
];

const STATS = [
  { val: "10,000+", label: "Happy Students" },
  { val: "95%",     label: "Success Rate"   },
  { val: "500+",    label: "Live Sessions"  },
  { val: "4.9/5",   label: "Avg. Rating"   },
];

/* ─────────────────────────────────────────────────────────────────────────────
   HERO — editorial masthead with large typography
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y   = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const op  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section ref={ref} className="relative min-h-[70vh] flex flex-col justify-end pb-24 px-8 md:px-16 overflow-hidden">
      {/* Subtle ruled lines background */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.03) 79px, rgba(255,255,255,0.03) 80px)",
          }}
        />
      </motion.div>

      {/* Top label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-32 left-8 md:left-16 flex items-center gap-3"
      >
        <div className="w-8 h-px bg-[#00ff88]" />
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#00ff88]">
          Testimonials — Real Students
        </span>
      </motion.div>

      {/* Issue number — editorial detail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-32 right-8 md:right-16 font-mono text-[10px] tracking-widest text-gray-700 text-right"
      >
        <div>VOL. 01 · 2024</div>
        <div className="text-gray-800">16 VERIFIED REVIEWS</div>
      </motion.div>

      <motion.div
        style={{ opacity: op }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl"
      >
        <motion.p variants={item} className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-6">
          What Our Traders Say
        </motion.p>

        <motion.h1
          variants={item}
          className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] mb-8 tracking-tight"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Voices of
          <br />
          <span className="text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            }}
          >
            financial
          </span>
          <br />
          <span className="text-[#00ff88]">freedom.</span>
        </motion.h1>

        <motion.p variants={item} className="text-gray-400 text-base max-w-md leading-relaxed">
          Hear directly from students who walked in as beginners and walked out
          as disciplined, confident traders.
        </motion.p>
      </motion.div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00ff88]/30 via-white/5 to-transparent"
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   STATS BAR — horizontal editorial strip
───────────────────────────────────────────────────────────────────────────── */
function StatsBar() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="border-y border-white/5 py-8 px-8 md:px-16 overflow-hidden"
    >
      <div className="flex flex-wrap gap-0 divide-x divide-white/5">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-w-[140px] px-8 first:pl-0 last:pr-0 py-2"
          >
            <div
              className="text-3xl font-bold mb-1 tracking-tight"
              style={{ fontFamily: "'Georgia', serif", color: "#f0f4ff" }}
            >
              {s.val}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-600">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FEATURED CARD — large hero testimonial (first one)
───────────────────────────────────────────────────────────────────────────── */
function FeaturedCard({ t }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="relative border border-white/5 rounded-2xl p-10 md:p-16 overflow-hidden group"
      style={{ background: "#0b0f1c" }}
    >
      {/* Large quote mark */}
      <div
        className="absolute top-8 right-10 text-[120px] leading-none font-serif pointer-events-none select-none"
        style={{ color: `${t.color}08`, fontFamily: "'Georgia', serif", lineHeight: 1 }}
      >
        "
      </div>

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-0 left-0 w-72 h-72 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle, ${t.color}08 0%, transparent 70%)`,
          transform: "translate(-30%, -30%)",
        }}
      />

      <div className="relative z-10 grid md:grid-cols-[1fr_280px] gap-12 items-start">
        <div>
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px" style={{ background: t.color }} />
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ color: t.color }}
            >
              {t.tag}
            </span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-[#ffc857] text-[#ffc857]" />
            ))}
          </div>

          <blockquote
            className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            "{t.quote}"
          </blockquote>

          <div className="flex items-center gap-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
            >
              {t.initials}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{t.name}</div>
              <div className="text-gray-500 text-xs font-mono uppercase tracking-wider">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Right — decorative chart lines */}
        <div className="hidden md:flex flex-col gap-3 pt-6 opacity-40">
          {[65, 82, 58, 91, 74, 88, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transformOrigin: "left",
                height: 2,
                width: `${h}%`,
                background: `linear-gradient(90deg, ${t.color}60, transparent)`,
                borderRadius: 2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   GRID CARD — standard card in the masonry-ish grid
───────────────────────────────────────────────────────────────────────────── */
function GridCard({ t, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Alternate animation direction
  const dir    = index % 3 === 0 ? -24 : index % 3 === 1 ? 24 : 0;
  const yInit  = index % 2 === 0 ? 32 : 48;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yInit, x: dir }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.75,
        delay: (index % 4) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative border border-white/5 rounded-xl p-6 overflow-hidden cursor-default"
      style={{ background: "#0b0f1c" }}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${t.color}30` }}
      />

      {/* Top line accent */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay: (index % 4) * 0.07 + 0.2 }}
        style={{
          transformOrigin: "left",
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 1,
          background: `linear-gradient(90deg, ${t.color}50, transparent)`,
        }}
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3 h-3 fill-[#ffc857] text-[#ffc857]" />
        ))}
      </div>

      {/* Tag */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-px" style={{ background: t.color }} />
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: t.color }}>
          {t.tag}
        </span>
      </div>

      {/* Quote */}
      <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 line-clamp-4">
        "{t.quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: `${t.color}15`, border: `1px solid ${t.color}30`, color: t.color }}
        >
          {t.initials}
        </div>
        <div>
          <div className="text-white text-xs font-semibold">{t.name}</div>
          <div className="text-gray-600 text-[10px] font-mono uppercase tracking-wider">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MARQUEE ROW — infinitely scrolling name strip
───────────────────────────────────────────────────────────────────────────── */
function MarqueeStrip() {
  const names = TESTIMONIALS.map(t => t.name);
  const doubled = [...names, ...names];

  return (
    <div className="relative overflow-hidden py-5 border-y border-white/5 my-20">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0e1a, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0e1a, transparent)" }} />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        className="flex gap-0 whitespace-nowrap"
      >
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-gray-700 px-6">
              {name}
            </span>
            <span className="text-gray-800 text-xs">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PULL QUOTE — large centred editorial pull quote
───────────────────────────────────────────────────────────────────────────── */
function PullQuote({ t }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      className="py-20 px-8 md:px-24 text-center border-y border-white/5 relative overflow-hidden"
    >
      {/* Big ghost quote */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontFamily: "'Georgia', serif",
          fontSize: "clamp(200px, 30vw, 400px)",
          color: "rgba(0,255,136,0.025)",
          lineHeight: 1,
        }}
      >
        "
      </div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <blockquote
          className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed max-w-4xl mx-auto mb-10"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          "{t.quote}"
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-white/10" />
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
            style={{ background: `${t.color}20`, border: `1px solid ${t.color}40`, color: t.color }}
          >
            {t.initials}
          </div>
          <div className="text-left">
            <div className="text-white text-sm font-semibold">{t.name}</div>
            <div className="text-gray-500 text-xs font-mono uppercase tracking-wider">{t.role}</div>
          </div>
          <div className="w-12 h-px bg-white/10" />
        </div>
      </motion.div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TICKER CARDS — horizontal auto-scrolling row (2 rows, opposite directions)
───────────────────────────────────────────────────────────────────────────── */
function TickerRow({ items, dir = 1, speed = 35 }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3">
      <motion.div
        animate={{ x: dir > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex gap-4 w-max"
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-72 border border-white/5 rounded-xl p-5"
            style={{ background: "#0b0f1c" }}
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-2.5 h-2.5 fill-[#ffc857] text-[#ffc857]" />
              ))}
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{ background: `${t.color}18`, color: t.color }}
              >
                {t.initials}
              </div>
              <span className="text-white text-xs font-medium">{t.name}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CTA SECTION
───────────────────────────────────────────────────────────────────────────── */
function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-8 md:px-16 py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative border border-white/5 rounded-2xl p-12 md:p-20 text-center overflow-hidden"
        style={{ background: "#0b0f1c" }}
      >
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,255,136,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,1) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,255,136,0.06) 0%, transparent 70%)" }} />

        <div className="relative z-10">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#00ff88] mb-6">
            Ready to Write Your Success Story?
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Join 10,000+
            <br />
            <span className="text-[#00ff88]">traders.</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            Transform your financial future with our proven education programmes.
            Start with a free demo session — no commitment required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm transition-all duration-300"
              style={{ background: "#00ff88", color: "#0a0e1a" }}
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="px-8 py-4 border border-white/10 text-white font-semibold text-sm rounded-lg hover:border-white/20 transition-all duration-300">
              Book Free Demo
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────────────────────────────────────────── */
export function Testimonials() {
  // Split testimonials into different layout zones
  const featured  = TESTIMONIALS[6];   // Abhishek Mutnal — long emotional quote
  const pullQuote = TESTIMONIALS[14];  // Tarun Naik — structured curriculum
  const gridItems = TESTIMONIALS.filter((_, i) => i !== 6 && i !== 14);
  const row1      = TESTIMONIALS.slice(0, 8);
  const row2      = TESTIMONIALS.slice(8, 16);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Noise grain */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      <Navbar />

      {/* ── 1. Editorial masthead hero ── */}
      <Hero />

      {/* ── 2. Stats bar ── */}
      <StatsBar />

      {/* ── 3. Featured testimonial ── */}
      <section className="px-8 md:px-16 py-16">
        <FeaturedCard t={featured} />
      </section>

      {/* ── 4. Scrolling name marquee ── */}
      <div className="px-0">
        <MarqueeStrip />
      </div>

      {/* ── 5. Main testimonials grid ── */}
      <section className="px-8 md:px-16 pb-4">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-6 h-px bg-[#00ff88]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00ff88]">
            All Reviews
          </span>
          <div className="flex-1 h-px bg-white/5" />
          <span className="font-mono text-[10px] text-gray-700">
            {gridItems.length} testimonials
          </span>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {gridItems.map((t, i) => (
            <div key={t.id} className="break-inside-avoid">
              <GridCard t={t} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. Auto-scrolling ticker rows ── */}
      <section className="py-16 overflow-hidden">
        <div className="flex items-center gap-4 px-8 md:px-16 mb-8">
          <div className="w-6 h-px bg-[#00d4ff]" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#00d4ff]">
            Live Feed
          </span>
        </div>
        <TickerRow items={row1} dir={1}  speed={40} />
        <TickerRow items={row2} dir={-1} speed={50} />
      </section>

      {/* ── 7. Pull quote ── */}
      <PullQuote t={pullQuote} />

      {/* ── 8. CTA ── */}
      <CTASection />
 

      <style>{`
        * { box-sizing: border-box; }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .line-clamp-4 { display:-webkit-box; -webkit-line-clamp:4; -webkit-box-orient:vertical; overflow:hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 2px; }
      `}</style>
    </div>
  );
}