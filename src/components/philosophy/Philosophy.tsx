"use client";

import React from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";

export function Philosophy() {
  const { philosophy } = PORTFOLIO_DATA;

  return (
    <section className="relative w-full py-40 px-6 md:px-12 bg-[#08090A] border-t border-white/5 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Subtle HUD Telemetry */}
        <div className="flex items-center justify-between font-mono text-xs text-zinc-600 border-b border-white/5 pb-4">
          <span className="text-zinc-500 tracking-hud">// INTERMISSION</span>
          <span>ETHOS // ARCHITECTURAL INTENT</span>
        </div>

        {/* Large Typographic Manifesto */}
        <div className="flex flex-col gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-monumental text-white uppercase leading-[0.95]"
          >
            I&apos;M NOT INTERESTED IN MAKING{" "}
            <span className="text-zinc-600 hover:text-zinc-400 transition-colors">
              MORE SOFTWARE.
            </span>
            <br />
            I&apos;M INTERESTED IN MAKING{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-white to-brand-cobalt">
              BETTER SYSTEMS.
            </span>
          </motion.h2>

          <p className="mt-8 text-zinc-400 text-lg md:text-2xl font-sans font-light max-w-3xl leading-relaxed">
            {philosophy.statement}
          </p>
        </div>

        {/* 3 Core Principles Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5 font-mono">
          {philosophy.principles.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <span className="text-xs text-brand-cyan font-bold">{item.label}</span>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
