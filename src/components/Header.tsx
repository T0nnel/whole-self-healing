"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ onBookClick }: { onBookClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <span className="announcement-pill">UPCOMING WORKSHOP</span>
        <span>Start with Self-Compassion — Live online cohort booking now</span>
        {onBookClick ? (
          <button
            type="button"
            onClick={onBookClick}
            className="announcement-link bg-transparent border-0 text-white cursor-pointer"
          >
            Reserve your place →
          </button>
        ) : (
          <Link href="/workshop" className="announcement-link">
            Reserve your place →
          </Link>
        )}
      </div>

      {/* Main Navigation Bar */}
      <header className="site-nav-container">
        <div className="site-nav-inner">
          <Link href="/" className="nav-brand-group" onClick={closeMenu} aria-label="Whole Self Healing home">
            <div className="brand-seal-icon" aria-hidden="true">
              ✳
            </div>
            <div className="brand-text">
              whole self <span>healing</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav-menu" aria-label="Main navigation">
            <Link
              href={isHome ? "#approach" : "/approach"}
              className={`ghost-nav-link ${pathname === "/approach" ? "active" : ""}`}
            >
              Our Approach
            </Link>
            <Link
              href={isHome ? "#about" : "/about"}
              className={`ghost-nav-link ${pathname === "/about" ? "active" : ""}`}
            >
              About Bibi
            </Link>
            <Link
              href={isHome ? "#workshop" : "/workshop"}
              className={`ghost-nav-link ${pathname === "/workshop" ? "active" : ""}`}
            >
              Workshop
            </Link>
            <Link
              href={isHome ? "#coaching" : "/coaching"}
              className={`ghost-nav-link ${pathname === "/coaching" ? "active" : ""}`}
            >
              1:1 Coaching
            </Link>
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={isHome ? "#coaching" : "/coaching"}
              className="btn-primary-terracotta btn-pill-sm"
            >
              Work with me ↗
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-full border border-[var(--color-warm-taupe)] bg-[var(--color-aged-paper)] text-ink cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="mobile-drawer-overlay" onClick={closeMenu}>
            <div
              className="mobile-drawer"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="mobile-drawer-header">
                <div className="nav-brand-group">
                  <div className="brand-seal-icon">✳</div>
                  <div className="brand-text">
                    whole self <span>healing</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="close-drawer-btn"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col gap-4 text-base">
                <Link
                  href={isHome ? "#approach" : "/approach"}
                  onClick={closeMenu}
                  className="py-2 border-b border-[var(--color-warm-taupe)]"
                >
                  Our Approach
                </Link>
                <Link
                  href={isHome ? "#about" : "/about"}
                  onClick={closeMenu}
                  className="py-2 border-b border-[var(--color-warm-taupe)]"
                >
                  About Bibi
                </Link>
                <Link
                  href={isHome ? "#workshop" : "/workshop"}
                  onClick={closeMenu}
                  className="py-2 border-b border-[var(--color-warm-taupe)]"
                >
                  Workshop
                </Link>
                <Link
                  href={isHome ? "#coaching" : "/coaching"}
                  onClick={closeMenu}
                  className="py-2 border-b border-[var(--color-warm-taupe)]"
                >
                  1:1 Coaching
                </Link>
                <div className="pt-4 flex flex-col gap-3">
                  <Link
                    href={isHome ? "#coaching" : "/coaching"}
                    onClick={closeMenu}
                    className="btn-primary-terracotta w-full text-center"
                  >
                    Work with me ↗
                  </Link>
                  {onBookClick && (
                    <button
                      type="button"
                      className="btn-secondary-outlined w-full"
                      onClick={() => {
                        closeMenu();
                        onBookClick();
                      }}
                    >
                      Book workshop place ↗
                    </button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
