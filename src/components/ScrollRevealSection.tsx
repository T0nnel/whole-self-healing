"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  direction?: "left" | "right" | "up";
}

export default function ScrollRevealSection({
  children,
  id,
  className = "",
  direction = "up",
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Respect user's motion preferences
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        setIsVisible(true);
        return;
      }
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "-20px 0px -20px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Directional entrance: slide from left/right/up
  // The outer wrapper clips overflow so horizontal slides don't cause page overflow
  const SLIDE_DISTANCE = "64px";
  const hiddenTransform =
    direction === "left"
      ? `translate3d(-${SLIDE_DISTANCE}, 0, 0)`
      : direction === "right"
      ? `translate3d(${SLIDE_DISTANCE}, 0, 0)`
      : "translate3d(0, 40px, 0)";

  return (
    /* clip-overflow wrapper: keeps horizontal slides contained within each section */
    <div style={{ overflowX: "clip" }}>
      <section
        ref={ref}
        id={id}
        className={`transition-all duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${className}`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
        }}
      >
        {children}
      </section>
    </div>
  );
}
