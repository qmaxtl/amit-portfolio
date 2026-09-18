"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitializerProps {
  onComplete: () => void;
}

export function CinematicInitializer({ onComplete }: InitializerProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if user already saw the intro in this session or prefers reduced motion
    const hasSeenIntro = sessionStorage.getItem("amit_intro_viewed");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setIsFinished(true);
      onComplete();
      return;
    }

    // Sequence stages: 0 to 4
    const steps = [
      { progress: 24, delay: 250 },
      { progress: 56, delay: 450 },
      { progress: 82, delay: 500 },
      { progress: 100, delay: 400 },
    ];

    let current = 0;

    const runStep = () => {
      if (current < steps.length) {
        setProgress(steps[current].progress);
        setStep(current + 1);
        setTimeout(() => {
          current++;
          runStep();
        }, steps[current].delay);
      } else {
        setTimeout(() => {
          sessionStorage.setItem("amit_intro_viewed", "true");
          setIsFinished(true);
          onComplete();
        }, 300);
      }
    };

    runStep();
  }, [onComplete]);

  if (isFinished) return null;

  const sequence = [
    "01 // IDENTITY & ARCHITECTURE",
    "02 // WORK & SYSTEMS PIPELINE",
    "03 // EXPERIMENTS & LAB MATRIX",
    "04 // SECURE COMMUNICATION CHANNEL",
  ];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#08090A] flex flex-col justify-between p-8 md:p-14 font-mono select-none"
        >
          {/* Top HUD Telemetry */}
          <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              <span className="tracking-hud text-zinc-300">KERNEL INITIALIZATION</span>
            </div>
            <div className="tracking-wider">SYSTEM 2026 // INDIA</div>
          </div>

          {/* Center Stage: High-impact typography and sequence */}
          <div className="max-w-2xl mx-auto w-full my-auto flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl md:text-6xl font-display font-black tracking-tight text-white">
                INITIALIZING
              </span>
              <span className="font-mono text-xl md:text-2xl text-brand-cyan">
                {progress}%
              </span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-cobalt to-brand-cyan"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>

            {/* Staged Checklist */}
            <div className="flex flex-col gap-2 pt-2">
              {sequence.map((label, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between text-xs tracking-wider transition-all duration-300 ${
                    step > idx
                      ? "text-zinc-300 font-medium"
                      : "text-zinc-600 opacity-40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={step > idx ? "text-brand-cyan" : "text-zinc-700"}>
                      {step > idx ? "●" : "○"}
                    </span>
                    <span>{label}</span>
                  </div>
                  <span>{step > idx ? "[ READY ]" : "[ PENDING ]"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex justify-between items-center text-[10px] text-zinc-600 border-t border-white/5 pt-4">
            <span>AMIT KUMAR GUPTA // ARCHITECT & BUILDER</span>
            <span className="tracking-widest">PRESS ANYWHERE TO SKIP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
