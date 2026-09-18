"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Server, Sparkles, Rocket, ArrowRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";
import { useSound } from "@/components/sound/SoundProvider";

export function Identity() {
  const { playHover, playClick } = useSound();
  const { manifesto } = PORTFOLIO_DATA;

  const pillarIcons = [Cpu, Server, Sparkles, Rocket];

  return (
    <section
      id="identity"
      className="relative w-full py-32 px-6 md:px-12 bg-[#0C0E12] border-t border-white/5 overflow-hidden"
    >
      {/* Background Accent Grid */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* Section Index Header */}
        <div className="flex items-center justify-between font-mono text-xs text-zinc-500 border-b border-white/5 pb-4">
          <span className="text-brand-cyan tracking-hud">// CHAPTER 01</span>
          <span className="tracking-wider">IDENTITY & MANIFESTO</span>
        </div>

        {/* Editorial Statement */}
        <div className="max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.08] tracking-tight uppercase"
          >
            I&apos;M INTERESTED IN THE SPACE BETWEEN{" "}
            <span className="text-zinc-500 hover:text-brand-cyan transition-colors">
              AN IDEA
            </span>{" "}
            AND{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-cobalt">
              A WORKING PRODUCT.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 text-zinc-400 text-lg md:text-xl font-sans max-w-3xl leading-relaxed"
          >
            {manifesto.body}
          </motion.p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {manifesto.pillars.map((pillar, idx) => {
            const IconComponent = pillarIcons[idx];
            return (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={playHover}
                className="group relative p-8 rounded-lg bg-surface border border-surface-border hover:border-brand-cyan/40 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Subtle top indicator */}
                <div className="flex items-center justify-between mb-8 font-mono text-xs">
                  <span className="text-zinc-600 group-hover:text-brand-cyan transition-colors">
                    {pillar.num}
                  </span>
                  <IconComponent className="w-5 h-5 text-zinc-500 group-hover:text-brand-cyan transition-colors" />
                </div>

                <div>
                  <h3 className="text-xl font-display font-semibold text-white group-hover:text-brand-cyan transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed font-sans">
                    {pillar.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <span>DISCIPLINE // ACTIVE</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:text-brand-cyan transition-all" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
