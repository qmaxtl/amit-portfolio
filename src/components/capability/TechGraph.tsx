"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, Eye, Network, CheckCircle2, Link2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";
import { useSound } from "@/components/sound/SoundProvider";

export function TechGraph() {
  const { playHover, playClick } = useSound();
  const [activeCategory, setActiveCategory] = useState<string>("BUILD");
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string;
    focus: string;
    relatedProjectIds: string[];
  } | null>(null);

  const { capabilities, projects } = PORTFOLIO_DATA;

  const categoryIcons: Record<string, typeof Code2> = {
    BUILD: Code2,
    INTELLIGENCE: BrainCircuit,
    EXPERIENCE: Eye,
    INFRASTRUCTURE: Network,
  };

  const activeCategoryData = capabilities.find((c) => c.title === activeCategory) || capabilities[0];

  return (
    <section
      id="systems"
      className="relative w-full py-32 px-6 md:px-12 bg-[#08090A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-brand-cyan tracking-hud">// CHAPTER 04</span>
            <span>CAPABILITY MATRIX // THE SYSTEMS I WORK WITH</span>
          </div>
          <div className="text-zinc-400">[ RELATIONAL ARCHITECTURE GRAPH ]</div>
        </div>

        {/* Conceptual Tabs Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
              ENGINEERED COMPETENCIES.
            </h2>
            <p className="mt-3 text-zinc-400 text-base font-sans max-w-xl">
              Organized conceptually across execution domains. Hover individual competencies to
              trace their deployment across flagship systems.
            </p>
          </div>

          {/* Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {capabilities.map((cat) => {
              const Icon = categoryIcons[cat.title] || Code2;
              const isSelected = activeCategory === cat.title;
              return (
                <button
                  key={cat.title}
                  onClick={() => {
                    playClick();
                    setActiveCategory(cat.title);
                  }}
                  onMouseEnter={playHover}
                  className={`px-4 py-2.5 rounded border flex items-center gap-2 transition-all ${
                    isSelected
                      ? "bg-white/10 border-brand-cyan text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                      : "bg-surface border-surface-border text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: isSelected ? cat.accent : undefined }}
                  />
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Matrix Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Skill Nodes */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="p-4 rounded-lg bg-surface border border-white/5 font-mono text-xs text-zinc-400 flex items-center justify-between">
              <span>DOMAIN: {activeCategoryData.title}</span>
              <span className="text-zinc-500">{activeCategoryData.description}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCategoryData.skills.map((skill) => {
                const isHovered = hoveredSkill?.name === skill.name;
                return (
                  <motion.div
                    key={skill.name}
                    onMouseEnter={() => {
                      playHover();
                      setHoveredSkill(skill);
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`p-6 rounded-xl bg-surface border transition-all duration-300 font-mono cursor-pointer ${
                      isHovered
                        ? "border-brand-cyan bg-brand-cyan/[0.04] scale-[1.02]"
                        : "border-surface-border hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-300">
                        {skill.level}
                      </span>
                      <span className="text-[10px] text-brand-cyan">
                        {skill.relatedProjectIds.length} SYSTEM{skill.relatedProjectIds.length > 1 ? "S" : ""}
                      </span>
                    </div>

                    <h4 className="text-lg font-display font-semibold text-white mt-1">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans mt-2 leading-relaxed">
                      {skill.focus}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Associated Live Systems Mesh */}
          <div className="lg:col-span-5 p-8 rounded-xl bg-[#090B0E] border border-white/10 font-mono flex flex-col justify-between min-h-[360px]">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-white/5 pb-3">
                <span className="text-brand-cyan">// SYSTEM TRACE LINKAGE</span>
                <span>{hoveredSkill ? "INSPECTING NODE" : "AWAITING NODE HOVER"}</span>
              </div>

              {hoveredSkill ? (
                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase">ACTIVE COMPETENCY</span>
                    <h4 className="text-xl font-display font-bold text-brand-cyan mt-1">
                      {hoveredSkill.name}
                    </h4>
                    <p className="text-xs text-zinc-400 font-sans mt-1">
                      {hoveredSkill.focus}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-3">
                      ASSOCIATED PRODUCTION SYSTEMS:
                    </span>
                    <div className="flex flex-col gap-2">
                      {hoveredSkill.relatedProjectIds.map((pId) => {
                        const project = projects.find((p) => p.id === pId);
                        if (!project) return null;
                        return (
                          <div
                            key={pId}
                            className="p-3 rounded bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2 text-zinc-200">
                              <Link2 className="w-3.5 h-3.5 text-brand-cyan" />
                              <span className="font-semibold">{project.title}</span>
                            </div>
                            <span className="text-[10px] text-zinc-500">{project.year}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my-12 flex flex-col items-center justify-center text-center gap-3 text-zinc-500">
                  <Network className="w-8 h-8 text-zinc-700 animate-pulse" />
                  <span className="text-xs font-mono">
                    Hover over any capability on the left to reveal relational architecture connections.
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Status */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-600">
              <span>ZERO FABRICATED METRICS</span>
              <span className="text-emerald-400 font-bold">100% PRODUCTION TESTED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
