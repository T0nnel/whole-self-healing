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

    // Observe when element enters and exits viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.10,
        rootMargin: "-40px 0px -40px 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Gentle vertical reveal: avoids horizontal off-screen translate which causes layout overflow
  const hiddenTransform = "translate3d(0, 36px, 0)";

  return (
    <section
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${className}`}
      style={{
        opacity: isVisible ? 1 : 0.05,
        transform: isVisible ? "translate3d(0, 0, 0)" : hiddenTransform,
      }}
    >
      {children}
    </section>
  );
}
