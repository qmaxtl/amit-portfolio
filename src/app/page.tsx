"use client";

import React, { useState, useEffect } from "react";
import { CinematicInitializer } from "@/components/loader/CinematicInitializer";
import { Navigation } from "@/components/navigation/Navigation";
import { Hero } from "@/components/hero/Hero";
import { Identity } from "@/components/identity/Identity";
import { SelectedWork } from "@/components/work/SelectedWork";
import { Lab } from "@/components/experiments/Lab";
import { TechGraph } from "@/components/capability/TechGraph";
import { Philosophy } from "@/components/philosophy/Philosophy";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  const [initialized, setInitialized] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Intersection observer for section tracking
    const sections = ["hero", "identity", "work", "lab", "systems", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [initialized]);

  return (
    <main className="relative min-h-screen w-full bg-[#08090A] text-white selection:bg-brand-cyan selection:text-black overflow-x-hidden">
      {/* Cinematic Telemetry Initializer */}
      <CinematicInitializer onComplete={() => setInitialized(true)} />

      {/* Global Fixed HUD Navigation */}
      <Navigation activeSection={activeSection} />

      {/* Narrative Progression Chapters */}
      <Hero />
      <Identity />
      <SelectedWork />
      <Lab />
      <TechGraph />
      <Philosophy />
      <ContactSection />
      <Footer />
    </main>
  );
}
