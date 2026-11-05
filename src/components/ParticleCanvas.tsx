"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
  rotation: number;
  vRot: number;
  flutterPhase: number;
  flutterSpeed: number;
  color: string;
  type: "leaf" | "seed" | "petal" | "mote";
  aspectRatio: number;
  veinDetail: boolean;
}

export type ParticleSectionState = "hero" | "approach" | "about" | "workshop" | "coaching";
export type PageTheme = "home" | "about" | "approach" | "workshop" | "coaching";

interface ParticleCanvasProps {
  currentSection?: ParticleSectionState;
  page?: PageTheme;
}

const BRAND_PALETTE = {
  sageDeep: "rgba(101, 118, 93, ",       // #65765d
  sageSoft: "rgba(142, 163, 133, ",      // vibrant botanical green
  sageLight: "rgba(195, 212, 188, ",     // soft herbal leaf
  dustyPink: "rgba(194, 125, 127, ",     // gentle dusty pink botanical accent
  goldPollen: "rgba(196, 163, 118, ",    // golden pollen
  taupe: "rgba(209, 201, 191, ",         // warm paper taupe
};

export default function ParticleCanvas({
  currentSection = "hero",
  page = "home",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<ParticleSectionState>(currentSection);
  const pageRef = useRef<PageTheme>(page);
  const lastScrollYRef = useRef<number>(0);
  const scrollVelocityRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -1000,
    y: -1000,
    active: false,
    radius: 160,
  });

  useEffect(() => {
    sectionRef.current = currentSection;
  }, [currentSection]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        return;
      }
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isTabVisible = true;

    // Handle responsive resize with pixel ratio
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Pointer events
    const handlePointerMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
      pointerRef.current.active = true;
    };
    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave, { passive: true });

    // Scroll speed and direction tracking
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      scrollVelocityRef.current = Math.max(-25, Math.min(25, delta));
      lastScrollYRef.current = currentScrollY;

      // Dampen scroll velocity after user pauses scrolling
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocityRef.current = 0;
      }, 90);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Significantly reduced particle count for a minimal, non-distracting ambiance (client feedback)
    const particleCount = width < 640 ? 5 : width < 1024 ? 8 : 12;

    const particles: Particle[] = [];
    const colorKeys: (keyof typeof BRAND_PALETTE)[] = [
      "sageDeep",
      "sageSoft",
      "sageLight",
      "dustyPink",
      "goldPollen",
      "taupe",
    ];

    const createParticle = (spawnRandomY = true, customX?: number, customY?: number): Particle => {
      const rand = Math.random();
      const pType: Particle["type"] =
        rand < 0.40 ? "leaf" : rand < 0.65 ? "petal" : rand < 0.85 ? "seed" : "mote";

      const chosenColor = BRAND_PALETTE[colorKeys[Math.floor(Math.random() * colorKeys.length)]];

      let size: number;
      let opacity: number;
      let veinDetail = false;

      // Subtle, translucent, slow motion
      if (pType === "leaf") {
        size = Math.random() * 5.0 + 3.5;
        opacity = Math.random() * 0.20 + 0.12;
        veinDetail = size > 5.5;
      } else if (pType === "petal") {
        size = Math.random() * 4.0 + 2.5;
        opacity = Math.random() * 0.18 + 0.10;
      } else if (pType === "seed") {
        size = Math.random() * 2.5 + 1.5;
        opacity = Math.random() * 0.18 + 0.10;
      } else {
        size = Math.random() * 1.8 + 0.8;
        opacity = Math.random() * 0.25 + 0.10;
      }

      // Initial placement:
      const posX = customX !== undefined ? customX : Math.random() * width;
      const posY = customY !== undefined
        ? customY
        : spawnRandomY
        ? Math.random() * height
        : height + Math.random() * 40;

      return {
        x: posX,
        y: posY,
        vx: (Math.random() - 0.5) * 0.2, // very slow, calm drift
        vy: -Math.random() * 0.2 - 0.08,  // gentle upward float
        size,
        opacity,
        baseOpacity: opacity,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.008,
        flutterPhase: Math.random() * Math.PI * 2,
        flutterSpeed: Math.random() * 0.015 + 0.005,
        color: chosenColor,
        type: pType,
        aspectRatio: pType === "leaf" ? 2.5 : pType === "petal" ? 1.7 : 2.0,
        veinDetail,
      };
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    let lastSection = sectionRef.current;
    let animationTime = 0;

    const render = () => {
      if (!isTabVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      animationTime += 0.016;
      ctx.clearRect(0, 0, width, height);

      const activePage = pageRef.current;
      const activeSection = sectionRef.current;
      const scrollV = scrollVelocityRef.current;

      // Detect section transition on home page - gentle, no sudden bursts
      if (activeSection !== lastSection) {
        lastSection = activeSection;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.flutterPhase += p.flutterSpeed;

        // Base atmospheric breeze - very gentle, calm drift
        let breezeX = Math.sin(animationTime * 0.6 + p.y * 0.004) * 0.15;
        let breezeY = Math.cos(animationTime * 0.5 + p.x * 0.003) * 0.08;

        // Subtle scroll influence, avoiding sudden surges
        if (scrollV !== 0) {
          breezeY += Math.sign(scrollV) * Math.min(Math.abs(scrollV) * 0.02, 0.15);
        }

        // 3D tilt flutter scale
        const flutterScale = Math.sin(p.flutterPhase) * 0.35 + 0.95;

        p.x += p.vx + breezeX;
        p.y += p.vy + breezeY;
        p.rotation += p.vRot + Math.sin(p.flutterPhase) * 0.01;

        // Pointer proximity (interactive swirl & repulsion)
        if (pointerRef.current.active) {
          const dx = p.x - pointerRef.current.x;
          const dy = p.y - pointerRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < pointerRef.current.radius && dist > 1) {
            const force = (1 - dist / pointerRef.current.radius) * 1.5;
            const swirlX = -dy / dist;
            const swirlY = dx / dist;

            p.x += (dx / dist) * force * 3 + swirlX * force * 1.5;
            p.y += (dy / dist) * force * 3 + swirlY * force * 1.5;
            p.rotation += 0.03 * force;
          }
        }

        // Boundary wrapping — when leaves leave the frame, respawn from opposite side
        if (p.y < -50) {
          p.y = height + 40;
          p.x = Math.random() * width;
        } else if (p.y > height + 50) {
          p.y = -40;
          p.x = Math.random() * width;
        }

        // Responsive left/right wrapping based on scroll velocity direction
        if (p.x < -60) {
          p.x = width + 50;
          p.y = Math.random() * height;
        } else if (p.x > width + 60) {
          p.x = -50;
          p.y = Math.random() * height;
        }

        // Draw particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(flutterScale, 1);

        ctx.fillStyle = `${p.color}${p.opacity})`;

        if (p.type === "leaf") {
          ctx.beginPath();
          const leafLen = p.size * p.aspectRatio;
          const leafW = p.size;
          ctx.moveTo(-leafLen, 0);
          ctx.bezierCurveTo(-leafLen * 0.5, -leafW * 1.3, leafLen * 0.5, -leafW * 1.3, leafLen, 0);
          ctx.bezierCurveTo(leafLen * 0.5, leafW * 1.3, -leafLen * 0.5, leafW * 1.3, -leafLen, 0);
          ctx.fill();

          if (p.veinDetail) {
            ctx.strokeStyle = `rgba(52, 61, 50, ${p.opacity * 0.5})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(-leafLen * 0.8, 0);
            ctx.lineTo(leafLen * 0.8, 0);
            ctx.stroke();
          }
        } else if (p.type === "petal") {
          ctx.beginPath();
          const pR = p.size;
          ctx.moveTo(0, -pR * 1.6);
          ctx.bezierCurveTo(pR * 1.2, -pR * 0.5, pR * 1.1, pR * 1.2, 0, pR * 1.4);
          ctx.bezierCurveTo(-pR * 1.1, pR * 1.2, -pR * 1.2, -pR * 0.5, 0, -pR * 1.6);
          ctx.fill();
        } else if (p.type === "seed") {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.8, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"
      aria-hidden="true"
    />
  );
}
