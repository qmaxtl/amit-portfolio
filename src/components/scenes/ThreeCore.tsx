"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeCore({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) {
      setPrefersReducedMotion(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 7.5;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 4. Create Neural Core Geometry
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner geometric icosahedron (The Kernel)
    const icoGeom = new THREE.IcosahedronGeometry(1.6, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const icoMesh = new THREE.Mesh(icoGeom, icoMat);
    coreGroup.add(icoMesh);

    // Inner glowing solid node
    const innerGeom = new THREE.OctahedronGeometry(0.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerMesh);

    // Surrounding Particle Swarm (Data Field)
    const particleCount = 750;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.4 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Custom particle canvas texture for soft spherical glow
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(0, 240, 255, 1)");
      gradient.addColorStop(0.3, "rgba(0, 240, 255, 0.5)");
      gradient.addColorStop(0.8, "rgba(59, 130, 246, 0.15)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    coreGroup.add(particles);

    // Pointer coordinates tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 1.8;
      targetY = -(e.clientY / innerHeight - 0.5) * 1.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer interpolation
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Rotate core elements
      coreGroup.rotation.y = elapsedTime * 0.15 + currentX * 0.8;
      coreGroup.rotation.x = elapsedTime * 0.08 + currentY * 0.8;

      innerMesh.rotation.y = -elapsedTime * 0.35;
      innerMesh.rotation.z = elapsedTime * 0.2;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
      icoMesh.scale.set(pulse, pulse, pulse);

      // Scroll progression influence
      coreGroup.position.y = -scrollProgress * 2.5;
      coreGroup.position.z = -scrollProgress * 1.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up WebGL resources
      icoGeom.dispose();
      icoMat.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollProgress]);

  if (prefersReducedMotion || !hasWebGL) {
    return <CanvasFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80 mix-blend-screen"
      aria-hidden="true"
    />
  );
}

// 2D Canvas Fallback for graceful degradation
function CanvasFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const points = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = "rgba(0, 240, 255, 0.4)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      aria-hidden="true"
    />
  );
}
