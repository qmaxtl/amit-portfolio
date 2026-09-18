"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "drag" | "open">("default");

  // Spring physics for buttery smooth motion
  const cursorX = useSpring(0, { damping: 28, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 28, stiffness: 350 });

  useEffect(() => {
    setMounted(true);
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursorAttr === "view") {
        setCursorVariant("view");
        setCursorText("VIEW");
      } else if (cursorAttr === "drag") {
        setCursorVariant("drag");
        setCursorText("DRAG");
      } else if (cursorAttr === "open") {
        setCursorVariant("open");
        setCursorText("↗");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!mounted || isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer contextual indicator */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "view" ? 1.9 : cursorVariant === "open" ? 1.6 : cursorVariant === "hover" ? 1.4 : 1,
          width: cursorVariant === "view" || cursorVariant === "open" ? 54 : 32,
          height: cursorVariant === "view" || cursorVariant === "open" ? 54 : 32,
          backgroundColor:
            cursorVariant === "view"
              ? "rgba(0, 240, 255, 0.9)"
              : cursorVariant === "open"
              ? "rgba(255, 255, 255, 0.9)"
              : cursorVariant === "hover"
              ? "rgba(0, 240, 255, 0.15)"
              : "rgba(255, 255, 255, 0.04)",
          borderColor:
            cursorVariant === "view"
              ? "#00F0FF"
              : cursorVariant === "hover"
              ? "#00F0FF"
              : "rgba(255, 255, 255, 0.25)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed top-0 left-0 rounded-full border backdrop-blur-[2px] flex items-center justify-center pointer-events-none will-change-transform"
      >
        {cursorText && (
          <span
            className={`text-[9px] font-mono font-bold tracking-wider ${
              cursorVariant === "view" ? "text-black" : "text-black"
            }`}
          >
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Center pinpoint */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: cursorVariant === "view" || cursorVariant === "open" ? 0 : 1,
          scale: cursorVariant === "hover" ? 0.6 : 1,
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-brand-cyan pointer-events-none will-change-transform shadow-[0_0_8px_#00F0FF]"
      />
    </div>
  );
}
