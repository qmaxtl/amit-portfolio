"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Copy, Check, ArrowUpRight, Mail, Github, Linkedin, Twitter } from "lucide-react";
import confetti from "canvas-confetti";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";
import { useSound } from "@/components/sound/SoundProvider";

export function ContactSection() {
  const { playHover, playClick, playSuccess } = useSound();
  const { contact, inquiryOptions } = PORTFOLIO_DATA;

  const [projectType, setProjectType] = useState(inquiryOptions.projectTypes[0].id);
  const [budget, setBudget] = useState(inquiryOptions.budgetRanges[0].id);
  const [timeline, setTimeline] = useState(inquiryOptions.timelines[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccess();
    setSubmitted(true);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#00F0FF", "#3B82F6", "#10B981", "#ffffff"],
      });
    } catch {
      // Confetti catch
    }
  };

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-32 px-6 md:px-12 bg-[#0A0C10] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-brand-cyan tracking-hud">// CHAPTER 05</span>
            <span>CONTACT & INQUIRY TERMINAL</span>
          </div>
          <div className="text-zinc-400">[ PROTOCOL 2026 // DIRECT LINK ]</div>
        </div>

        {/* Hero Invitation */}
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-white tracking-tight uppercase leading-[1.05]">
            HAVE AN IDEA THAT SHOULDN&apos;T{" "}
            <span className="text-zinc-500">STAY AN IDEA?</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-cobalt">
              LET&apos;S BUILD IT.
            </span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg font-sans max-w-2xl leading-relaxed">
            Whether you need autonomous AI agents, high-throughput SaaS infrastructure, or a
            world-class digital experience, reach out directly or scope your requirements below.
          </p>
        </div>

        {/* Two-Column Layout: Interactive Scoper & Direct Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Interactive Project Scoper Terminal */}
          <div className="lg:col-span-7 p-8 md:p-10 rounded-2xl bg-surface border border-surface-border font-mono">
            <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-white/5 pb-4 mb-8">
              <span className="text-brand-cyan">// PROJECT SCOPING TERMINAL</span>
              <span>TELEMETRY: READY</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center text-brand-cyan">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white">
                  TRANSMISSION RECEIVED.
                </h3>
                <p className="text-xs text-zinc-400 max-w-md font-sans">
                  Thank you for outlining your requirements. I review incoming venture inquiries
                  personally and will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded bg-white/5 border border-white/10 hover:border-brand-cyan text-xs text-zinc-300 transition-colors"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* 1. What are you building? */}
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                    01 // WHAT ARE YOU BUILDING?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryOptions.projectTypes.map((t) => (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => {
                          playClick();
                          setProjectType(t.id);
                        }}
                        onMouseEnter={playHover}
                        className={`px-3.5 py-2 rounded text-xs transition-all ${
                          projectType === t.id
                            ? "bg-brand-cyan text-black font-semibold border-brand-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]"
                            : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                      02 // ESTIMATED BUDGET
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {inquiryOptions.budgetRanges.map((b) => (
                        <button
                          type="button"
                          key={b.id}
                          onClick={() => {
                            playClick();
                            setBudget(b.id);
                          }}
                          onMouseEnter={playHover}
                          className={`p-2 rounded text-left text-xs transition-all ${
                            budget === b.id
                              ? "bg-white/15 border border-brand-cyan text-white font-medium"
                              : "bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider block mb-3">
                      03 // DESIRED TIMELINE
                    </label>
                    <div className="flex flex-col gap-1.5">
                      {inquiryOptions.timelines.map((tl) => (
                        <button
                          type="button"
                          key={tl.id}
                          onClick={() => {
                            playClick();
                            setTimeline(tl.id);
                          }}
                          onMouseEnter={playHover}
                          className={`p-2 rounded text-left text-xs transition-all ${
                            timeline === tl.id
                              ? "bg-white/15 border border-brand-cyan text-white font-medium"
                              : "bg-white/[0.02] border border-white/5 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {tl.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Contact Info */}
                <div className="space-y-4">
                  <label className="text-xs text-zinc-400 uppercase tracking-wider block">
                    04 // YOUR COORDINATES
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name / Company"
                      className="w-full px-4 py-3 rounded bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full px-4 py-3 rounded bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-brand-cyan transition-colors"
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief overview of what needs to be solved or built..."
                    className="w-full px-4 py-3 rounded bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 text-xs focus:outline-none focus:border-brand-cyan transition-colors font-sans"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  onMouseEnter={playHover}
                  data-cursor="open"
                  className="w-full py-4 rounded bg-brand-cyan hover:bg-white text-black font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT PROJECT SPECIFICATION</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Direct Communication Channels & Status */}
          <div className="lg:col-span-5 flex flex-col gap-6 font-mono">
            {/* Quick Email Card */}
            <div className="p-8 rounded-2xl bg-surface border border-surface-border flex flex-col justify-between">
              <div>
                <span className="text-xs text-zinc-500 block mb-2">// DIRECT ACCESS</span>
                <h4 className="text-xl font-display font-bold text-white">
                  DIRECT EMAIL DISPATCH
                </h4>
                <p className="mt-2 text-xs text-zinc-400 font-sans">
                  Prefer direct correspondence over forms? Copy the email or open directly in your
                  mail client.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleCopyEmail}
                  onMouseEnter={playHover}
                  className="w-full p-3 rounded bg-white/5 border border-white/10 hover:border-brand-cyan text-xs text-white flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-cyan" />
                    <span>{contact.email}</span>
                  </div>
                  {copiedEmail ? (
                    <div className="flex items-center gap-1 text-brand-emerald text-[11px]">
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED</span>
                    </div>
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-zinc-500" />
                  )}
                </button>

                <a
                  href={`mailto:${contact.email}`}
                  onMouseEnter={playHover}
                  className="w-full py-2.5 rounded bg-white/5 border border-white/10 text-center text-xs text-zinc-300 hover:text-white hover:border-brand-cyan transition-colors"
                >
                  OPEN IN DEFAULT MAIL CLIENT ↗
                </a>
              </div>
            </div>

            {/* Social & Code Repositories */}
            <div className="p-8 rounded-2xl bg-surface border border-surface-border">
              <span className="text-xs text-zinc-500 block mb-4">// NETWORK NODES</span>
              <div className="flex flex-col gap-3">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-brand-cyan flex items-center justify-between text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-brand-cyan" />
                    <span>GITHUB // SYSTEM REPOSITORIES</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-brand-cyan flex items-center justify-between text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-brand-cobalt" />
                    <span>LINKEDIN // VENTURES & NETWORK</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={contact.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  className="p-3 rounded bg-white/[0.02] border border-white/5 hover:border-brand-cyan flex items-center justify-between text-xs text-zinc-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Twitter className="w-4 h-4 text-zinc-400" />
                    <span>X // REAL-TIME THOUGHTS & AGENTS</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
