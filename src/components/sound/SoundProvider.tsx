"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { audioEngine } from "@/lib/audio";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playTransition: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHover: () => {},
  playClick: () => {},
  playTransition: () => {},
  playSuccess: () => {},
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Check if user previously enabled sound
    const saved = localStorage.getItem("amit_audio_muted");
    if (saved !== null) {
      const muted = saved === "true";
      setIsMuted(muted);
      audioEngine.setMuted(muted);
    }
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioEngine.setMuted(next);
    localStorage.setItem("amit_audio_muted", String(next));
  };

  const playHover = () => audioEngine.playHover();
  const playClick = () => audioEngine.playClick();
  const playTransition = () => audioEngine.playTransition();
  const playSuccess = () => audioEngine.playSuccess();

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playHover,
        playClick,
        playTransition,
        playSuccess,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
