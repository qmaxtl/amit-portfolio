"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-content";
import { useSound } from "@/components/sound/SoundProvider";

export function Footer() {
  const { playHover, playClick } = useSound();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#07080A] border-t border-white/5 py-12 px-6 md:px-12 font-mono text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Year */}
        <div className="flex items-center gap-3">
          <span className="text-white font-bold tracking-wider">AMIT KUMAR GUPTA</span>
          <span className="text-zinc-600">/</span>
          <span>{PORTFOLIO_DATA.meta.year}</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-400">INDIA ({time} IST)</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href={PORTFOLIO_DATA.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="hover:text-white transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={PORTFOLIO_DATA.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            className="hover:text-white transition-colors"
          >
            GITHUB
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.contact.email}`}
            onMouseEnter={playHover}
            className="hover:text-white transition-colors"
          >
            EMAIL
          </a>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={playHover}
          className="flex items-center gap-2 text-zinc-400 hover:text-brand-cyan transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
