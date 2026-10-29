"use client";

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="site-journal-footer">
      <div className="main-wrapper">
        <div className="footer-inner-grid">
          {/* Left Column: Brand & Practitioner */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="brand-seal-icon" aria-hidden="true">
                ✳
              </div>
              <span className="brand-text text-xl">
                whole self <span>healing</span>
              </span>
            </div>
            <p className="text-sm text-[var(--color-charcoal)] leading-relaxed max-w-sm mb-4">
              Evidence-based psychological care and trauma-informed somatics for women ready to slow down without guilt.
            </p>
            <p className="text-xs text-[var(--color-graphite)] font-mono">
              Bibi Beck • BSc (Hons), MSc, Qualified PWP
            </p>
          </div>

          {/* Center Column: Navigation */}
          <div>
            <span className="eyebrow-label mb-3 block">EXPLORE</span>
            <ul className="footer-nav-list">
              <li>
                <Link href="/approach">Our Approach</Link>
              </li>
              <li>
                <Link href="/about">About Bibi</Link>
              </li>
              <li>
                <Link href="/workshop">Workshop: Self-Compassion</Link>
              </li>
              <li>
                <Link href="/coaching">1:1 Coaching</Link>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="text-xs font-semibold text-[var(--color-terracotta-seal)] bg-transparent border-0 cursor-pointer p-0 underline"
                >
                  Back to top ↑
                </button>
              </li>
            </ul>
          </div>

          {/* Right Column: Ethos & Copyright */}
          <div>
            <span className="eyebrow-label mb-3 block">PRACTICE NOTE</span>
            <p className="text-sm text-[var(--color-charcoal)] leading-relaxed mb-6">
              You shouldn't have to reach breaking point before you give yourself permission to rest.
            </p>
            <p className="text-xs text-[var(--color-graphite)]">
              © {new Date().getFullYear()} Whole Self Healing. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
