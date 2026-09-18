"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Terminal, Sparkles, Layers } from "lucide-react";
import dynamic from "next/dynamic";
import { useSound } from "@/components/sound/SoundProvider";

const ThreeCore = dynamic(
  () => import("@/components/scenes/ThreeCore").then((mod) => mod.ThreeCore),
  { ssr: false }
);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Scroll linkage
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleScrollTo = (id: string) => {
    playClick();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden bg-[#08090A] select-none"
      id="hero"
    >
      {/* 3D WebGL Neural Core Signature Visual in Background */}
      <ThreeCore />

      {/* Subtle Hairline Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Top Telemetry Row */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-500 border-b border-white/5 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-brand-cyan tracking-wider">[ 00 // INITIAL ]</span>
          <span className="text-zinc-400">FOUNDER & SYSTEMS ARCHITECT</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-400">LOC: INDIA // 2026</span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline text-zinc-400">AVAILABLE FOR HIGH-IMPACT VENTURES</span>
        </div>
      </motion.div>

      {/* Center Hero Monumental Typography */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: textScale }}
        className="relative z-10 my-auto py-12 flex flex-col justify-center"
      >
        {/* Editorial Sub-badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="px-2.5 py-1 rounded bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-[11px] font-mono tracking-hud flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span>AUTONOMOUS SYSTEMS • AI • SAAS • WEBGL</span>
          </div>
        </div>

        {/* Monolithic Name */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-monumental text-white uppercase leading-[0.88] transition-transform duration-200"
          style={{
            transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
          }}
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
            AMIT KUMAR
          </span>
          <span className="block text-zinc-500 hover:text-brand-cyan transition-colors duration-500">
            GUPTA
          </span>
        </h1>

        {/* Dynamic Positioning Statement */}
        <div className="mt-8 md:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-zinc-200 leading-snug">
              I BUILD WHAT&apos;S NEXT.
            </h2>
            <p className="mt-3 text-zinc-400 text-sm md:text-base leading-relaxed font-sans font-normal max-w-xl">
              I don&apos;t just build digital products. I engineer autonomous intelligence,
              high-throughput systems, and bespoke digital experiences where architectural rigor
              meets creative craft.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <button
              onClick={() => handleScrollTo("#work")}
              onMouseEnter={playHover}
              data-cursor="view"
              className="px-6 py-3.5 rounded bg-white text-black font-semibold tracking-wider hover:bg-brand-cyan hover:text-black transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] group"
            >
              <span>SELECTED WORK</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => handleScrollTo("#contact")}
              onMouseEnter={playHover}
              data-cursor="open"
              className="px-6 py-3.5 rounded bg-white/5 border border-white/10 text-white font-medium tracking-wider hover:border-brand-cyan/50 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
              <span>START CONVERSATION</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Status Bar */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-500 border-t border-white/5 pt-4"
      >
        <div className="flex items-center gap-6">
          <span className="text-zinc-400 flex items-center gap-1.5">
            <span className="text-brand-cyan font-bold">04</span> FLAGSHIP SYSTEMS
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400 flex items-center gap-1.5">
            <span className="text-brand-emerald font-bold">100%</span> VERIFIED ARCHITECTURE
          </span>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => handleScrollTo("#identity")}
          onMouseEnter={playHover}
          className="flex items-center gap-2 text-zinc-400 hover:text-brand-cyan transition-colors group cursor-pointer"
        >
          <span className="tracking-widest">SCROLL TO EXPLORE</span>
          <div className="w-4 h-6 rounded-full border border-zinc-600 flex items-start justify-center p-1 group-hover:border-brand-cyan">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-brand-cyan"
            />
          </div>
        </button>
      </motion.div>
    </section>
  );
}
