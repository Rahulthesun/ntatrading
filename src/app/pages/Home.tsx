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
import { Navbar } from "../components/Navbar";
import PackagesSection from "../../components/PackagesSection";

/* ════════════════════════════════════════
   HOME
════════════════════════════════════════ */
export function Home() {
  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-br
from-[#1d4ed8]
via-[#0f172a]
to-[#000000]
">
      {/* Navbar lives here — once — at the top */}
      <Navbar />

      <Hero />
      {/* <SocialProof /> */}
      <PackagesSection />
      <StarCourseSection />
      <CTASection />
      <Footer />
    </div>
  );
}