"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkshopModal from "@/components/WorkshopModal";
import ParticleCanvas from "@/components/ParticleCanvas";
import Link from "next/link";

export default function WorkshopPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const openWithSlot = (slot: string) => {
    setSelectedSlot(slot);
    setModalOpen(true);
  };

  return (
    <main className="overflow-hidden relative">
      <ParticleCanvas page="workshop" />
      <Header onBookClick={() => setModalOpen(true)} />

      {/* Hero */}
      <section className="py-16 bg-[var(--color-parchment)]">
        <div className="main-wrapper">
          <span className="eyebrow-mono">EXPERIENTIAL COHORT</span>
          <h1 className="text-5xl font-normal leading-tight mt-2 mb-4">
            Start with <em>Self-Compassion</em>
          </h1>
          <p className="text-lg text-[var(--color-charcoal)] leading-relaxed max-w-2xl mb-8">
            A dedicated, gentle 60-minute space designed to help you soften the demands of your inner critic, release the guilt around resting, and cultivate a kinder relationship with yourself.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              className="btn-primary-terracotta"
              onClick={() => setModalOpen(true)}
            >
              Reserve your place now <span aria-hidden="true">↗</span>
            </button>
            <Link href="/coaching" className="btn-secondary-outlined">
              Looking for 1:1 coaching?
            </Link>
          </div>
        </div>
      </section>

      {/* Workshop Details Three-Card Grid */}
      <section className="py-16 bg-[var(--color-aged-paper)]">
        <div className="main-wrapper">
          <div className="step-cards-grid mt-0">
            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">FORMAT</span>
              <h3 className="step-card-title">Live Online Cohort</h3>
              <p className="step-card-body">
                Small, intimate cohort. You are warmly welcome to keep your camera on or off according to your personal comfort level.
              </p>
            </div>
            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">DURATION</span>
              <h3 className="step-card-title">60 Focused Minutes</h3>
              <p className="step-card-body">
                Unhurried, restorative pacing designed not to overwhelm. Includes structured guided somatic practices and gentle Q&amp;A.
              </p>
            </div>
            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">MATERIALS</span>
              <h3 className="step-card-title">Self-Compassion Toolkit</h3>
              <p className="step-card-body">
                Every attendee receives a printable reflection journal and a guided body-awareness audio practice to revisit anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus / Agenda */}
      <section className="py-20 bg-[var(--color-parchment)]">
        <div className="main-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="eyebrow-label">SYLLABUS &amp; FLOW</span>
              <h2 className="text-4xl font-normal leading-tight">
                An hour designed to <em>restore your nervous system.</em>
              </h2>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4">
                We won't ask you to fix yourself—because you aren't broken. Instead, we examine the systemic and internal pressures that convince you rest must be earned.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[var(--color-aged-paper)] p-6 rounded-2xl border border-[var(--color-warm-taupe)]">
                <span className="text-xs font-mono font-semibold text-[var(--color-dusty-pink)] block mb-1">
                  PART 01 • 15 MINS
                </span>
                <h4 className="text-xl font-normal text-ink mb-2">Unmasking the Inner Critic</h4>
                <p className="text-sm text-[var(--color-charcoal)] leading-relaxed m-0">
                  Recognise the high-functioning anxiety patterns that push you beyond natural capacity.
                </p>
              </div>

              <div className="bg-[var(--color-aged-paper)] p-6 rounded-2xl border border-[var(--color-warm-taupe)]">
                <span className="text-xs font-mono font-semibold text-[var(--color-dusty-pink)] block mb-1">
                  PART 02 • 10 MINS
                </span>
                <h4 className="text-xl font-normal text-ink mb-2">Somatic Nervous System Soothing</h4>
                <p className="text-sm text-[var(--color-charcoal)] leading-relaxed m-0">
                  Evidence-based grounding techniques drawn from clinical psychology and trauma-informed somatics to signal safety to your body.
                </p>
              </div>

              <div className="bg-[var(--color-aged-paper)] p-6 rounded-2xl border border-[var(--color-warm-taupe)]">
                <span className="text-xs font-mono font-semibold text-[var(--color-dusty-pink)] block mb-1">
                  PART 03 • 25 MINS
                </span>
                <h4 className="text-xl font-normal text-ink mb-2">Compassionate Talk</h4>
                <p className="text-sm text-[var(--color-charcoal)] leading-relaxed m-0">
                  Concrete mental shifts to replace self-blame with genuine encouragement when energy dips.
                </p>
              </div>

              <div className="bg-[var(--color-aged-paper)] p-6 rounded-2xl border border-[var(--color-warm-taupe)]">
                <span className="text-xs font-mono font-semibold text-[var(--color-dusty-pink)] block mb-1">
                  PART 04 • 10 MINS
                </span>
                <h4 className="text-xl font-normal text-ink mb-2">Guided Reflection &amp; Integration</h4>
                <p className="text-sm text-[var(--color-charcoal)] leading-relaxed m-0">
                  A gentle closing space to ask questions, share insights, and ground your intentions for the week ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Dates */}
      <section className="py-20 bg-[var(--color-aged-paper)]">
        <div className="main-wrapper">
          <div className="max-w-xl mb-12">
            <span className="eyebrow-label">RESERVE A SPOT</span>
            <h2 className="text-3xl font-normal">Upcoming <em>Cohort Sessions</em></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--color-parchment)] p-8 rounded-3xl border border-[var(--color-warm-taupe)] flex flex-col justify-between gap-6">
              <div>
                <span className="announcement-pill text-ink bg-[var(--color-aged-paper)] border border-[var(--color-warm-taupe)]">
                  WEEKEND SESSION
                </span>
                <h3 className="text-xl font-normal mt-4 mb-2">Saturday, 12 December 2026</h3>
                <p className="text-xs text-[var(--color-graphite)] font-mono">10:00 – 11:00 GMT (ONLINE)</p>
              </div>
              <button
                type="button"
                className="btn-primary-terracotta btn-pill-sm w-full justify-center"
                onClick={() => openWithSlot("Saturday, 12 December 2026 • 10:00–11:00 GMT")}
              >
                Book this slot ↗
              </button>
            </div>

            <div className="bg-[var(--color-parchment)] p-8 rounded-3xl border-2 border-[var(--color-dusty-pink)] flex flex-col justify-between gap-6 shadow-md">
              <div>
                <span className="announcement-pill text-white bg-[var(--color-dusty-pink)]">
                  POPULAR • EVENING CALM
                </span>
                <h3 className="text-xl font-normal mt-4 mb-2">Wednesday, 6 January 2027</h3>
                <p className="text-xs text-[var(--color-graphite)] font-mono">19:00 – 20:00 GMT (ONLINE)</p>
              </div>
              <button
                type="button"
                className="btn-primary-terracotta btn-pill-sm w-full justify-center"
                onClick={() => openWithSlot("Wednesday, 6 January 2027 • 19:00–20:00 GMT")}
              >
                Book this slot ↗
              </button>
            </div>

            <div className="bg-[var(--color-parchment)] p-8 rounded-3xl border border-[var(--color-warm-taupe)] flex flex-col justify-between gap-6">
              <div>
                <span className="announcement-pill text-ink bg-[var(--color-aged-paper)] border border-[var(--color-warm-taupe)]">
                  SUNDAY RESET
                </span>
                <h3 className="text-xl font-normal mt-4 mb-2">Sunday, 17 January 2027</h3>
                <p className="text-xs text-[var(--color-graphite)] font-mono">16:00 – 17:00 GMT (ONLINE)</p>
              </div>
              <button
                type="button"
                className="btn-primary-terracotta btn-pill-sm w-full justify-center"
                onClick={() => openWithSlot("Sunday, 17 January 2027 • 16:00–17:00 GMT")}
              >
                Book this slot ↗
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <WorkshopModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedDate={selectedSlot}
      />
    </main>
  );
}
