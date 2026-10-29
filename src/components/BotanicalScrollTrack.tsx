"use client";

import { useEffect, useState, useRef } from "react";

export default function BotanicalScrollTrack() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const approachEl = document.getElementById("approach");
      if (!approachEl) return;

      const rect = approachEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress through the approach section:
      const totalDist = rect.height + windowHeight * 0.4;
      const currentDist = windowHeight * 0.8 - rect.top;

      let pct = currentDist / totalDist;
      if (pct < 0) pct = 0;
      if (pct > 1) pct = 1;

      setProgress(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block py-6 my-6 relative w-full"
      aria-hidden="true"
    >
      {/* 3-column grid matching the 3 cards (.step-cards-grid) */}
      <div className="grid grid-cols-3 gap-6 relative items-center">
        {/* Full-width continuous track line precisely centered on the node circles */}
        <div className="absolute left-[16.666%] right-[16.666%] top-[14px] h-[2px] bg-[var(--color-warm-taupe)]" />

        {/* Dynamic active line */}
        <div
          className="absolute left-[16.666%] top-[14px] h-[2px] bg-[var(--color-terracotta-seal)] transition-all duration-300 ease-out"
          style={{ width: `${Math.min(1, Math.max(0, (progress - 0.15) / 0.7)) * 66.666}%` }}
        />

        {/* Column 1: Aligned to Card 1 (Patterns / Compassion) */}
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 border ${
              progress >= 0.15
                ? "bg-[var(--color-terracotta-seal)] text-[var(--color-parchment)] border-[var(--color-terracotta-seal)] scale-110 shadow-sm"
                : "bg-[var(--color-parchment)] text-[var(--color-graphite)] border-[var(--color-warm-taupe)]"
            }`}
          >
            01
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-graphite)] mt-2 font-medium">
            Compassion
          </span>
        </div>

        {/* Column 2: Aligned to Card 2 (Embodiment / Regulation) */}
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 border ${
              progress >= 0.5
                ? "bg-[var(--color-terracotta-seal)] text-[var(--color-parchment)] border-[var(--color-terracotta-seal)] scale-110 shadow-sm"
                : "bg-[var(--color-parchment)] text-[var(--color-graphite)] border-[var(--color-warm-taupe)]"
            }`}
          >
            02
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-graphite)] mt-2 font-medium">
            Regulation
          </span>
        </div>

        {/* Column 3: Aligned to Card 3 (Sustainability / Rest) */}
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500 border ${
              progress >= 0.85
                ? "bg-[var(--color-terracotta-seal)] text-[var(--color-parchment)] border-[var(--color-terracotta-seal)] scale-110 shadow-sm"
                : "bg-[var(--color-parchment)] text-[var(--color-graphite)] border-[var(--color-warm-taupe)]"
            }`}
          >
            03
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--color-graphite)] mt-2 font-medium">
            Rest
          </span>
        </div>
      </div>
    </div>
  );
}
