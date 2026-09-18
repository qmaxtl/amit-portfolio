"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Cpu, Layers, GitBranch, CheckCircle2, ShieldAlert } from "lucide-react";
import { Project } from "@/data/portfolio-content";
import { useSound } from "@/components/sound/SoundProvider";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex justify-end"
      >
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Modal Drawer Container */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="relative z-10 w-full max-w-4xl h-full bg-[#0B0D11] border-l border-white/10 overflow-y-auto flex flex-col p-6 md:p-14"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-brand-cyan">CASE STUDY // {project.num}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">{project.category}</span>
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              onMouseEnter={playHover}
              className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-brand-cyan transition-colors"
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header Title */}
          <div className="mb-12">
            <span className="text-xs font-mono tracking-hud text-brand-cyan block mb-2">
              {project.visualTheme.badge}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xl text-zinc-300 font-sans mt-2 font-normal">
              {project.subtitle}
            </p>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 font-mono text-xs">
              <div>
                <span className="text-zinc-500 block">ROLE</span>
                <span className="text-zinc-200 mt-1 block font-medium">{project.role}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">YEAR</span>
                <span className="text-zinc-200 mt-1 block font-medium">{project.year}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">SYSTEM STATUS</span>
                <span className="text-brand-emerald mt-1 block font-medium">VERIFIED</span>
              </div>
              <div>
                <span className="text-zinc-500 block">ARCHETYPE</span>
                <span className="text-brand-cyan mt-1 block font-medium">{project.visualTheme.tag}</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {project.metrics.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-lg bg-surface border border-white/5 flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                  {m.label}
                </span>
                <span className="text-2xl font-mono font-bold text-white mt-2">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          {/* Section: Problem & Context */}
          <div className="space-y-8 mb-12">
            <div className="p-6 rounded-lg bg-white/[0.02] border border-white/5">
              <h3 className="text-xs font-mono text-zinc-400 tracking-hud uppercase mb-2">
                // 01 CONTEXT & CHALLENGE
              </h3>
              <p className="text-zinc-300 text-base leading-relaxed font-sans">
                {caseStudy.context}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 text-sm text-zinc-400">
                <strong className="text-zinc-200">The Problem: </strong>
                {caseStudy.problem}
              </div>
            </div>

            {/* Section: Architectural Insight */}
            <div className="p-6 rounded-lg bg-brand-cyan/[0.03] border border-brand-cyan/20">
              <h3 className="text-xs font-mono text-brand-cyan tracking-hud uppercase mb-2">
                // 02 THE SYSTEM INSIGHT
              </h3>
              <p className="text-zinc-200 text-lg font-display leading-relaxed">
                &ldquo;{caseStudy.insight}&rdquo;
              </p>
            </div>
          </div>

          {/* Section: System Architecture Breakdown */}
          <div className="mb-12">
            <h3 className="text-xs font-mono text-zinc-400 tracking-hud uppercase mb-4">
              // 03 SYSTEM ARCHITECTURE MATRIX
            </h3>
            <div className="flex flex-col gap-3 font-mono text-xs">
              {caseStudy.systemArchitecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded bg-surface border border-white/5 flex items-start gap-3 hover:border-brand-cyan/30 transition-colors"
                >
                  <span className="text-brand-cyan font-bold mt-0.5">[{idx + 1}]</span>
                  <span className="text-zinc-300 leading-relaxed">{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Engineering Challenges & Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-lg bg-surface border border-white/5">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-amber-400">
                <ShieldAlert className="w-4 h-4" />
                <span className="tracking-wider uppercase">TECHNICAL CHALLENGES</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-400 leading-relaxed">
                {caseStudy.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-surface border border-white/5">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-brand-emerald">
                <CheckCircle2 className="w-4 h-4" />
                <span className="tracking-wider uppercase">DECISIONS & TRADE-OFFS</span>
              </div>
              <ul className="space-y-3 text-xs text-zinc-400 leading-relaxed">
                {caseStudy.decisions.map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-emerald">•</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Results & Learnings */}
          <div className="p-6 rounded-lg bg-white/[0.02] border border-white/5 mb-12">
            <h3 className="text-xs font-mono text-zinc-400 tracking-hud uppercase mb-2">
              // 04 VERIFIED RESULTS & REASONING
            </h3>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed mb-4">
              {caseStudy.results}
            </p>
            <div className="pt-4 border-t border-white/5">
              <span className="text-xs font-mono text-zinc-500 block mb-2 uppercase">
                CORE ARCHITECTURAL LEARNINGS:
              </span>
              <ul className="space-y-2 text-xs text-zinc-400">
                {caseStudy.learnings.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-cyan font-mono">→</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-auto pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              onClick={() => {
                playClick();
                onClose();
              }}
              className="px-6 py-2.5 rounded bg-brand-cyan text-black font-semibold hover:bg-white transition-colors"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
