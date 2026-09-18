"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Terminal, Shield, Zap, Radio, Globe, Layers } from "lucide-react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio-content";
import { CaseStudyModal } from "./CaseStudyModal";
import { useSound } from "@/components/sound/SoundProvider";

export function SelectedWork() {
  const { playHover, playClick } = useSound();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const { projects } = PORTFOLIO_DATA;

  return (
    <section
      id="work"
      className="relative w-full py-32 px-6 md:px-12 bg-[#08090A] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 font-mono">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span className="text-brand-cyan tracking-hud">// CHAPTER 02</span>
            <span>SELECTED WORK & LIVING SYSTEMS</span>
          </div>
          <div className="text-xs text-zinc-400">
            [ 04 AUTONOMOUS SYSTEMS DEPLOYED ]
          </div>
        </div>

        {/* Projects Stream */}
        <div className="flex flex-col gap-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              onMouseEnter={playHover}
              data-cursor="view"
              onClick={() => {
                playClick();
                setActiveProject(project);
              }}
              className="group relative rounded-2xl bg-surface border border-surface-border hover:border-brand-cyan/40 transition-all duration-500 overflow-hidden cursor-pointer p-8 md:p-14"
            >
              {/* Subtle Ambient Color Glow */}
              <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                style={{ backgroundColor: project.visualTheme.accent }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Left Column: Editorial Metadata & Positioning */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Project Index & Category */}
                    <div className="flex items-center gap-3 font-mono text-xs mb-6">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-bold">
                        PROJECT / {project.num}
                      </span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400">{project.category}</span>
                      <span className="text-zinc-500">•</span>
                      <span className="text-zinc-400">{project.year}</span>
                    </div>

                    {/* Project Title & Subtitle */}
                    <h3 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase group-hover:text-brand-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-lg text-zinc-300 font-sans font-medium">
                      {project.subtitle}
                    </p>

                    <p className="mt-6 text-zinc-400 text-sm md:text-base leading-relaxed font-sans max-w-xl">
                      {project.summary}
                    </p>

                    {/* Key Highlights */}
                    <div className="mt-6 space-y-2 font-mono text-xs text-zinc-400">
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-brand-cyan">▹</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stats & Trigger */}
                  <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <div className="flex items-center gap-6 font-mono text-xs">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[10px] text-zinc-500">{metric.label}</span>
                          <span className="text-sm font-bold text-zinc-200 mt-0.5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white group-hover:bg-brand-cyan group-hover:text-black group-hover:border-brand-cyan transition-all">
                      <span>DEEP-DIVE CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Right Column: Custom Visual World & Interactive Telemetry Simulator */}
                <div className="lg:col-span-6 w-full h-full min-h-[320px] rounded-xl bg-[#090B0E] border border-white/10 p-6 flex flex-col justify-between font-mono relative overflow-hidden group-hover:border-brand-cyan/30 transition-colors">
                  {/* Visual World Header */}
                  <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: project.visualTheme.accent }}
                      />
                      <span className="text-zinc-300 font-semibold tracking-wider">
                        {project.visualTheme.badge}
                      </span>
                    </div>
                    <span className="text-zinc-500">[ SYSTEM SIMULATOR ]</span>
                  </div>

                  {/* Project-Specific Visual World Content */}
                  <div className="my-6">
                    {project.id === "revenue-os-ai" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-zinc-400 bg-white/[0.02] p-3 rounded border border-white/5">
                          <span className="text-brand-cyan">EVENT_BUS:</span>
                          <span className="text-emerald-400">INBOUND_INTENT_STREAMING</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-zinc-500">
                          <div>[12:00:04.18] Ingested 1,480 telemetry events / sec</div>
                          <div>[12:00:04.22] Cognitive Router: Qualified lead @ 94.2% score</div>
                          <div className="text-brand-cyan">
                            [12:00:04.31] Dispatched autonomous enrichment flow via Worker Node #04
                          </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mt-2">
                          <div className="h-full bg-brand-cyan w-3/4 animate-pulse" />
                        </div>
                      </div>
                    )}

                    {project.id === "ai-computer-operator" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-zinc-400 bg-white/[0.02] p-3 rounded border border-white/5">
                          <span className="text-brand-cobalt">VISION_GROUNDING:</span>
                          <span className="text-zinc-200">60 FPS ACTIVE FRAME</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-zinc-500">
                          <div>BOUNDING BOX: [x: 482, y: 610, w: 120, h: 42] &apos;SUBMIT_FORM&apos;</div>
                          <div>ACTION PLAN: ClickTarget -&gt; SendKeystroke(ENTER)</div>
                          <div className="text-brand-cobalt">
                            VERIFICATION: Visual state matched post-action condition
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-0.5 rounded bg-brand-cobalt/20 text-brand-cobalt text-[10px]">
                            SAFETY BOUNDS: ACTIVE
                          </span>
                          <span className="text-[10px] text-zinc-500">NO OVERRIDE REQUIRED</span>
                        </div>
                      </div>
                    )}

                    {project.id === "super-jarvis" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-zinc-400 bg-white/[0.02] p-3 rounded border border-white/5">
                          <span className="text-brand-violet">AUDIO_ROUNDTRIP:</span>
                          <span className="text-emerald-400">312ms STREAMING</span>
                        </div>
                        {/* Audio Waveform simulation */}
                        <div className="h-12 flex items-center justify-between gap-1 px-4 bg-white/[0.02] rounded border border-white/5">
                          {[30, 65, 45, 90, 75, 40, 85, 95, 60, 40, 70, 50, 80, 60, 45].map(
                            (h, idx) => (
                              <div
                                key={idx}
                                className="w-1 bg-brand-violet rounded-full transition-all duration-300"
                                style={{ height: `${h}%` }}
                              />
                            )
                          )}
                        </div>
                        <div className="text-[11px] text-zinc-500">
                          INPUT: Voice utterance parsed • Screen OCR context merged • Kokoro TTS generating stream
                        </div>
                      </div>
                    )}

                    {project.id === "localgrowth-ai" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs text-zinc-400 bg-white/[0.02] p-3 rounded border border-white/5">
                          <span className="text-brand-emerald">GEO_RADAR:</span>
                          <span className="text-zinc-200">2,400 DATA POINTS / SEC</span>
                        </div>
                        <div className="space-y-1 text-[11px] text-zinc-500">
                          <div>PARSING: Map cluster #849 (Commercial Zone A)</div>
                          <div>SCORE COMPUTATION: Health index 84/100 (Competitor gap detected)</div>
                          <div className="text-brand-emerald">
                            REPORT ENGINE: Automated playbook compiled in 3.8s
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-0.5 rounded bg-brand-emerald/20 text-brand-emerald text-[10px]">
                            PAN-INDIA COVERAGE
                          </span>
                          <span className="text-[10px] text-zinc-500">MAP ENGINE ACTIVE</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Visual World Footer Stack Badges */}
                  <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[10px] text-zinc-600">
                        +{project.stack.length - 4} MORE
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Deep-Dive Case Study Drawer */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
