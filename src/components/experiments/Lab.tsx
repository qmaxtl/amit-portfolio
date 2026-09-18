"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Play, RotateCcw, Volume2, Sparkles, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";
import { useSound } from "@/components/sound/SoundProvider";

export function Lab() {
  const { playHover, playClick } = useSound();
  const { experiments } = PORTFOLIO_DATA;

  return (
    <section
      id="lab"
      className="relative w-full py-32 px-6 md:px-12 bg-[#0A0C10] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="text-brand-cyan tracking-hud">// CHAPTER 03</span>
            <span>THE LAB // EXPERIMENTS & PROTOTYPES</span>
          </div>
          <div className="text-zinc-400">[ LIVE INTERACTIVE SANDBOX ]</div>
        </div>

        {/* Editorial Subtitle */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight uppercase">
            CURIOSITY BEYOND COMMERCIAL CODE.
          </h2>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed font-sans">
            A continuous testing ground for generative shaders, autonomous agent consensus
            protocols, low-latency audio synthesis, and experimental UI mechanics.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Experiment 01: NeuroMesh Canvas */}
          <NeuroMeshWidget />

          {/* Experiment 02: Agentic Consensus Loop */}
          <AgentConsensusWidget />

          {/* Experiment 03: MicroSynth Interactive Pad */}
          <MicroSynthWidget />

          {/* Experiment 04: HyperGraph Physics Topology */}
          <HyperGraphWidget />
        </div>
      </div>
    </section>
  );
}

// Sub-Widget 1: Interactive Canvas Particle Vector Mesh
function NeuroMeshWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playHover } = useSound();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 200);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      origX: Math.random() * width,
      origY: Math.random() * height,
    }));

    let mouseX = -9999;
    let mouseY = -9999;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles & update
      particles.forEach((p) => {
        // Gravitational repulsion/attraction to cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 90) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        } else {
          p.x += p.vx;
          p.y += p.vy;
        }

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = "#00F0FF";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      onMouseEnter={playHover}
      className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col justify-between font-mono"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <span className="text-brand-cyan">// LAB-01</span>
          <span className="px-2 py-0.5 rounded bg-brand-cyan/10 text-brand-cyan text-[10px]">
            ACTIVE SHADER
          </span>
        </div>
        <h3 className="text-lg font-display font-semibold text-white">
          NeuroMesh Vector Field
        </h3>
        <p className="mt-1 text-xs text-zinc-400 font-sans">
          Hover canvas to test particle repulsion and dynamic proximity mesh.
        </p>
      </div>

      <div className="my-4 rounded-lg bg-[#07080A] border border-white/5 overflow-hidden h-[180px] relative">
        <canvas ref={canvasRef} className="w-full h-full cursor-crosshair" />
        <span className="absolute bottom-2 right-3 text-[10px] text-zinc-600 pointer-events-none">
          POINTER GRAVITATIONAL PULL
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5">
        <span>STACK: Three.js • GLSL • WebGL</span>
        <span className="text-brand-cyan">INTERACTIVE</span>
      </div>
    </div>
  );
}

// Sub-Widget 2: Agentic Consensus Loop Simulator
function AgentConsensusWidget() {
  const { playHover, playClick } = useSound();
  const [round, setRound] = useState(1);
  const [status, setStatus] = useState<"VOTING" | "CONSENSUS_REACHED">("VOTING");

  const agents = [
    { name: "Agent Alpha", role: "Verifier", vote: round % 2 === 1 ? "APPROVE" : "STALL" },
    { name: "Agent Beta", role: "Arbitrator", vote: "APPROVE" },
    { name: "Agent Gamma", role: "Evaluator", vote: "APPROVE" },
    { name: "Agent Delta", role: "Risk Guard", vote: round > 2 ? "APPROVE" : "VERIFY" },
  ];

  const triggerNextRound = () => {
    playClick();
    setRound((r) => r + 1);
    setStatus("VOTING");
    setTimeout(() => {
      setStatus("CONSENSUS_REACHED");
    }, 600);
  };

  return (
    <div
      onMouseEnter={playHover}
      className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col justify-between font-mono"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <span className="text-brand-cobalt">// LAB-02</span>
          <span className="px-2 py-0.5 rounded bg-brand-cobalt/10 text-brand-cobalt text-[10px]">
            STATE MACHINE
          </span>
        </div>
        <h3 className="text-lg font-display font-semibold text-white">
          Agentic Consensus Loop
        </h3>
        <p className="mt-1 text-xs text-zinc-400 font-sans">
          Simulating distributed Byzantine fault-tolerant quorum arbitration.
        </p>
      </div>

      <div className="my-4 p-4 rounded-lg bg-[#07080A] border border-white/5 flex flex-col gap-2 min-h-[180px] justify-between">
        <div className="flex items-center justify-between text-[11px] border-b border-white/5 pb-2 text-zinc-500">
          <span>EPOCH: #{round}</span>
          <span className="text-emerald-400">{status}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          {agents.map((a, i) => (
            <div key={i} className="p-2 rounded bg-white/[0.02] border border-white/5 flex flex-col">
              <span className="text-zinc-300 font-semibold">{a.name}</span>
              <div className="flex items-center justify-between mt-1 text-zinc-500">
                <span>{a.role}</span>
                <span className="text-brand-cyan">{a.vote}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={triggerNextRound}
          className="w-full py-1.5 rounded bg-white/5 border border-white/10 hover:border-brand-cobalt hover:bg-brand-cobalt/20 text-white text-[11px] flex items-center justify-center gap-2 transition-all mt-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>SIMULATE NEXT CONSENSUS CYCLE</span>
        </button>
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5">
        <span>STACK: TypeScript • Web Workers</span>
        <span className="text-brand-cobalt">QUORUM 4/4</span>
      </div>
    </div>
  );
}

// Sub-Widget 3: MicroSynth Interactive Audio Pads
function MicroSynthWidget() {
  const { playHover, isMuted } = useSound();
  const [activePad, setActivePad] = useState<number | null>(null);

  const pads = [
    { note: "C4", freq: 261.63, label: "ROOT" },
    { note: "E4", freq: 329.63, label: "THIRD" },
    { note: "G4", freq: 392.0, label: "FIFTH" },
    { note: "B4", freq: 493.88, label: "SEVENTH" },
  ];

  const playTone = (freq: number, index: number) => {
    setActivePad(index);
    setTimeout(() => setActivePad(null), 250);

    if (typeof window === "undefined" || isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext catch
    }
  };

  return (
    <div
      onMouseEnter={playHover}
      className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col justify-between font-mono"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <span className="text-brand-violet">// LAB-03</span>
          <span className="px-2 py-0.5 rounded bg-brand-violet/10 text-brand-violet text-[10px]">
            SYNTHESIS
          </span>
        </div>
        <h3 className="text-lg font-display font-semibold text-white">
          MicroSynth Web Audio
        </h3>
        <p className="mt-1 text-xs text-zinc-400 font-sans">
          Click harmonic pads to synthesize low-latency procedural frequencies.
        </p>
      </div>

      <div className="my-4 p-4 rounded-lg bg-[#07080A] border border-white/5 flex flex-col justify-between min-h-[180px]">
        <div className="flex items-center justify-between text-[11px] text-zinc-500 border-b border-white/5 pb-2">
          <span>SINE WAVE HARMONICS</span>
          <span className={isMuted ? "text-amber-400" : "text-emerald-400"}>
            {isMuted ? "ENABLE SOUND IN HUD" : "AUDIO READY"}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2 my-auto">
          {pads.map((pad, idx) => (
            <button
              key={idx}
              onClick={() => playTone(pad.freq, idx)}
              className={`p-3 rounded border flex flex-col items-center justify-center transition-all ${
                activePad === idx
                  ? "bg-brand-violet text-white border-brand-violet scale-95 shadow-[0_0_15px_#8B5CF6]"
                  : "bg-white/[0.03] border-white/10 text-zinc-300 hover:border-brand-violet/50"
              }`}
            >
              <span className="text-sm font-bold">{pad.note}</span>
              <span className="text-[9px] text-zinc-500 mt-1">{pad.label}</span>
            </button>
          ))}
        </div>

        <div className="text-[10px] text-zinc-500 text-center">
          DSP ENVELOPE: Attack 0ms • Decay 350ms • Zero Audio Assets
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5">
        <span>STACK: Web Audio API • DSP</span>
        <span className="text-brand-violet">POLYPHONIC</span>
      </div>
    </div>
  );
}

// Sub-Widget 4: HyperGraph Physics Topology
function HyperGraphWidget() {
  const { playHover, playClick } = useSound();
  const [expanded, setExpanded] = useState(false);

  const nodes = [
    { label: "Core Kernel", x: 50, y: 50 },
    { label: "Agent Mesh", x: 25, y: 30 },
    { label: "Vector Index", x: 75, y: 25 },
    { label: "Streaming Bus", x: 30, y: 75 },
    { label: "Edge Gateway", x: 75, y: 75 },
  ];

  return (
    <div
      onMouseEnter={playHover}
      className="p-6 rounded-xl bg-surface border border-surface-border flex flex-col justify-between font-mono"
    >
      <div>
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
          <span className="text-brand-emerald">// LAB-04</span>
          <span className="px-2 py-0.5 rounded bg-brand-emerald/10 text-brand-emerald text-[10px]">
            TOPOLOGY
          </span>
        </div>
        <h3 className="text-lg font-display font-semibold text-white">
          HyperGraph Visualizer
        </h3>
        <p className="mt-1 text-xs text-zinc-400 font-sans">
          Spatial topology representation of decoupled architectural nodes.
        </p>
      </div>

      <div className="my-4 p-4 rounded-lg bg-[#07080A] border border-white/5 relative min-h-[180px] overflow-hidden flex items-center justify-center">
        {/* SVG Nodes and Filaments */}
        <svg className="w-full h-full absolute inset-0">
          <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="30%" y2="75%" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
          <line x1="50%" y1="50%" x2="75%" y2="75%" stroke="rgba(16,185,129,0.3)" strokeWidth="1" />
        </svg>

        {nodes.map((node, i) => (
          <div
            key={i}
            className="absolute px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 hover:border-brand-emerald hover:text-brand-emerald cursor-pointer transition-colors"
            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          >
            {node.label}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-white/5">
        <span>STACK: SVG • Graph Math</span>
        <span className="text-brand-emerald">DECOUPLED</span>
      </div>
    </div>
  );
}
