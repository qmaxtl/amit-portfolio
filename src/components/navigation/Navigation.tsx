"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Menu, X, Terminal, Radio } from "lucide-react";
import { useSound } from "@/components/sound/SoundProvider";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";

export function Navigation({ activeSection }: { activeSection?: string }) {
  const { isMuted, toggleMute, playHover, playClick } = useSound();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { label: "WORK", href: "#work", id: "work" },
    { label: "IDENTITY", href: "#identity", id: "identity" },
    { label: "LAB", href: "#lab", id: "lab" },
    { label: "SYSTEMS", href: "#systems", id: "systems" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ];

  const handleNavClick = (href: string) => {
    playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#08090A]/85 backdrop-blur-md border-b border-white/5 py-3.5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Monogram & Coordinates */}
          <a
            href="#"
            onClick={() => handleNavClick("#")}
            onMouseEnter={playHover}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white tracking-wider group-hover:border-brand-cyan group-hover:text-brand-cyan transition-colors">
              {PORTFOLIO_DATA.meta.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-medium tracking-hud text-white uppercase group-hover:text-brand-cyan transition-colors">
                AMIT KUMAR GUPTA
              </span>
              <span className="text-[10px] font-mono text-zinc-500 tracking-wider">
                KERNEL // 2026
              </span>
            </div>
          </a>

          {/* Center Telemetry (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-zinc-300 font-semibold tracking-wider">ONLINE</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className="text-zinc-500">IST</span>
              <span className="text-white font-mono">{currentTime || "01:40:00"}</span>
            </div>
            <span className="text-zinc-600">|</span>
            <div className="flex items-center gap-1 text-zinc-400">
              <span>LAT:</span>
              <span className="text-brand-cyan font-mono">12ms</span>
            </div>
          </div>

          {/* Desktop Navigation Links & Audio HUD */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs">
            <nav className="flex items-center gap-6" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  onMouseEnter={playHover}
                  className={`tracking-hud transition-colors relative py-1 ${
                    activeSection === link.id
                      ? "text-brand-cyan font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-brand-cyan shadow-[0_0_8px_#00F0FF]"
                    />
                  )}
                </a>
              ))}
            </nav>

            {/* Audio Toggle */}
            <button
              onClick={toggleMute}
              onMouseEnter={playHover}
              aria-label={isMuted ? "Enable generative audio" : "Mute audio"}
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 hover:border-brand-cyan/50 text-zinc-400 hover:text-white transition-all group"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              )}
              <span className="text-[10px] tracking-wider font-mono uppercase">
                {isMuted ? "SOUND OFF" : "SOUND ON"}
              </span>
            </button>
          </div>

          {/* Mobile Actions: Audio toggle + Menu toggle */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="p-2 rounded border border-white/10 text-zinc-400 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-cyan" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded border border-white/10 text-zinc-200 hover:text-white hover:border-brand-cyan"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-brand-cyan" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Bespoke Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#08090A]/95 backdrop-blur-xl md:hidden flex flex-col justify-between pt-28 pb-10 px-8"
          >
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs text-brand-cyan tracking-hud uppercase">
                // NAVIGATION PROTOCOL
              </span>
              <nav className="flex flex-col gap-5">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-3xl font-display font-bold tracking-tight text-zinc-300 hover:text-brand-cyan transition-colors flex items-center justify-between border-b border-white/5 pb-3"
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-xs text-zinc-600">0{idx + 1}</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4 font-mono text-xs text-zinc-500 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <span>SYSTEM STATUS</span>
                <span className="text-emerald-400">ONLINE • 2026</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LOCAL TIME</span>
                <span className="text-zinc-300">{currentTime} IST</span>
              </div>
              <div className="flex items-center justify-between">
                <span>LOCATION</span>
                <span className="text-zinc-300">{PORTFOLIO_DATA.meta.location}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
