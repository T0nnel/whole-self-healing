"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
        <span className="announcement-pill hidden sm:inline-block">UPCOMING WORKSHOP</span>
        <span className="announcement-text truncate">
          Start with Self-Compassion — Live online cohort
        </span>
        {onBookClick ? (
          <button
            type="button"
            onClick={onBookClick}
            className="announcement-link bg-transparent border-0 text-white cursor-pointer shrink-0"
          >
            Reserve your place →
          </button>
        ) : (
          <Link href="/workshop" className="announcement-link shrink-0">
            Reserve your place →
          </Link>
        )}
      </div>

      {/* Main Navigation Bar */}
      <header className="site-nav-container">
        <div className="site-nav-inner">
          <Link href="/" className="nav-brand-group" onClick={closeMenu} aria-label="Whole Self Healing home">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[var(--color-aged-paper)] border border-[var(--color-warm-taupe)] flex items-center justify-center shrink-0">
              <Image
                src="/logo-circle.png"
                alt="Whole Self Healing logo motif"
                width={32}
                height={32}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="brand-text">
              Whole Self Healing
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
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-full border border-[var(--color-warm-taupe)] bg-[var(--color-aged-paper)] text-ink cursor-pointer hover:bg-[var(--color-parchment)] transition-colors shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            )}
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
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[var(--color-aged-paper)] border border-[var(--color-warm-taupe)] flex items-center justify-center shrink-0">
                    <Image
                      src="/logo-circle.png"
                      alt="Whole Self Healing logo"
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="brand-text">
                    Whole Self Healing
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
