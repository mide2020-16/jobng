"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      // Use a string for cubic-bezier to satisfy the TypeScript Easing type
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], 
      delay 
    } 
  },
});

const popularTags = ["Engineering", "Finance", "Marketing", "Healthcare", "Remote"];

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-20 bg-gradient-to-br from-[#8DC63F] via-[#00A651] to-[#00863F]">
      {/* Background Glow Layer / Grid Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-10%,#CDEBB0_0%,transparent_60%)]" />
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(10,15,28,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,15,28,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_20%,transparent_100%)] pointer-events-none" 
        aria-hidden 
      />
      
      {/* Ambient Animated Orbs */}
      <motion.div
        className="absolute top-[10%] right-[5%] w-[420px] h-[420px] rounded-full bg-[#CDEBB0]/40 blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-0 w-[360px] h-[360px] rounded-full bg-white/20 blur-[80px] pointer-events-none"
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Hero Interactive Main Window Wrapper */}
      <div className="relative z-10 w-full max-w-[760px] mx-auto text-center">
        
        {/* Update Notification Ribbon Badge */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate="show" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[rgba(10,15,28,0.08)] border border-[rgba(10,15,28,0.14)] text-[rgba(10,15,28,0.72)] mb-7">
          <motion.span
            className="w-2 h-2 rounded-full bg-[#0F9D58] shadow-[0_0_0_3px_rgba(15,157,88,0.2)]"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Live jobs updated daily
        </motion.div>

        {/* Dynamic Typography Main Banner Headers */}
        <motion.h1 variants={fadeUp(0.1)} initial="hidden" animate="show" className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0A0F1C] leading-[1.1] mb-5">
          Your next role<br />
          <span className="text-white drop-shadow-[0_2px_20px_rgba(120,53,15,0.25)]">starts here.</span>
        </motion.h1>

        <motion.p variants={fadeUp(0.2)} initial="hidden" animate="show" className="text-[17px] leading-relaxed text-[rgba(10,15,28,0.72)] max-w-[480px] mx-auto mb-10">
          Discover opportunities across Nigeria. Subscribe via <strong className="text-[#055A2B] font-extrabold">*7098#</strong>, then browse and apply in seconds.
        </motion.p>

        {/* Global Input Search Parameter Target Control Container */}
        <motion.form 
          variants={fadeUp(0.3)} initial="hidden" animate="show" 
          onSubmit={handleSearch} 
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 max-w-[580px] mx-auto p-2 sm:p-2 sm:pl-4.5 bg-white rounded-2xl shadow-[0_24px_70px_rgba(120,53,15,0.28)] mb-6"
        >
          <div className="flex items-center gap-2.5 flex-1 py-2 sm:py-0 px-2 sm:px-0">
            <FiSearch size={18} className="text-[var(--gold-hover)] shrink-0" />
            <input
              type="text"
              placeholder="Search job title or company..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--ink)] placeholder-[var(--text-faint)] min-w-0 font-medium"
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            type="submit" 
            className="flex items-center justify-center gap-2 font-bold text-sm bg-gradient-to-br from-[var(--gold-light)] to-[var(--gold)] text-[var(--ink)] shadow-[var(--shadow-gold)] rounded-[var(--radius-sm)] py-3 px-5.5 whitespace-nowrap"
          >
            Find Jobs <FiArrowRight size={16} />
          </motion.button>
        </motion.form>

        {/* Popular Tags Segment Link Elements */}
        <motion.div variants={fadeUp(0.42)} initial="hidden" animate="show" className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <span className="text-xs font-semibold text-[rgba(10,15,28,0.5)]">Popular:</span>
          {popularTags.map((tag) => (
            <button 
              key={tag} 
              type="button" 
              onClick={() => setKeyword(tag)} 
              className="bg-white/55 border border-[rgba(10,15,28,0.12)] text-[rgba(10,15,28,0.75)] rounded-full px-3.5 py-1 text-xs font-semibold transition-colors duration-200 hover:bg-[#0A0F1C] hover:border-[#0A0F1C] hover:text-[#8DC63F]"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Metrics/Stats Cluster Block */}
        <motion.div variants={fadeUp(0.52)} initial="hidden" animate="show" className="flex flex-wrap justify-center gap-10 border-t border-[rgba(10,15,28,0.14)] pt-8">
          {[
            { value: "300+", label: "Live listings" },
            { value: "*7098#", label: "Subscribe via USSD" },
            { value: "24/7", label: "Always available" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-display text-xl font-extrabold text-[#055A2B]">{s.value}</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[rgba(10,15,28,0.55)]">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Absolute Layer Page Context Cutout Wave */}
      <div className="absolute bottom-0 left-0 right-0 line-height-0 pointer-events-none" aria-hidden>
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" className="block w-full h-20">
          <path d="M0 80H1440V30C1200 80 900 10 720 10C540 10 240 80 0 30V80Z" fill="var(--surface)" />
        </svg>
      </div>
    </section>
  );
}