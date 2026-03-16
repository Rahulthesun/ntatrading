import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { Footer } from "../components/Footer";
import { MarketTicker } from "../components/MarketTicker";
import { Testimonials } from "../components/testimonials";
import { ArrowRight, TrendingUp } from "lucide-react";
import { SocialProof } from "../components/SocialProof";
import { Services } from "../components/Services";
import StarCourseSection from "../components/StarCourseSection";
import Hero from "../components/Hero";
import { CTASection } from "../components/CTASection";
import LightRays from "../../components/LightRays";
import { Navbar } from "../components/Navbar";




/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
export function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale   = useTransform(scrollY, [0, 500], [1, 0.96]);

  return (
    <div className="min-h-screen text-white bg-[#0B0B12] font-sans">
      

      {/* ─── HERO ─── */}
      <Navbar/>
      <Hero/>

      <Services />

      {/* ─── TICKER ─── 
      <MarketTicker />

      */}

      <SocialProof />


      <StarCourseSection />
      
   

      {/* ─── SERVICES ─── */}
      

      {/* ─── STATS ─── */}
      

      <CTASection/>

      <Footer />
    </div>
  );
}