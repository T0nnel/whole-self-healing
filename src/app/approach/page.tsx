"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ApproachPage() {
  return (
    <main className="overflow-hidden relative">
      <Header />

      {/* Hero */}
      <section className="py-16 bg-[var(--color-parchment)]">
        <div className="main-wrapper">
          <span className="eyebrow-mono">OUR FOUNDATIONAL ETHOS</span>
          <h1 className="text-5xl font-normal leading-tight mt-2 mb-4">
            Give Yourself Permission to <em>Slow Down</em>
          </h1>
          <p className="text-lg text-[var(--color-charcoal)] leading-relaxed max-w-2xl mb-8">
            You don't have to keep pushing, put everyone else first or feel guilty for taking time for yourself. It's time to step away from the pressure of always doing more, reconnect with what you need and create space for a more balanced and fulfilling life.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-[var(--color-aged-paper)]">
        <div className="main-wrapper">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow-label">CORE PHILOSOPHY</span>
            <h2 className="text-4xl font-normal">
              Rest isn't something you have to <em>earn.</em>
            </h2>
            <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4">
              In a world that glorifies chronic overwork and emotional endurance, pausing can feel terrifying. Many people find that the moment they sit down to relax, a wave of restless anxiety and self-reproach arises.
            </p>
            <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4">
              Combining evidence-based psychological approaches with a holistic focus on wellbeing,
              Whole Self Healing offers coaching and workshops to help you understand the patterns
              that keep you under pressure, learn to rest without guilt, develop a kinder relationship
              with yourself, and create a more balanced and fulfilling way of living.
            </p>
          </div>

          <div className="step-cards-grid mt-0">
            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">PRINCIPLE 01</span>
              <h3 className="step-card-title">Understand your <em>patterns</em></h3>
              <p className="step-card-body">
                Investigate the roots of your inner critic and identify where the belief that you must "do it all" originated. Awareness transforms subconscious reaction into conscious choice.
              </p>
            </div>

            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">PRINCIPLE 02</span>
              <h3 className="step-card-title">Make space to <em>rest</em></h3>
              <p className="step-card-body">
                Cultivate somatic practices that de-escalate anxiety when resting. Discover how to honor your biological rhythms without apology or internal negotiation.
              </p>
            </div>

            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">PRINCIPLE 03</span>
              <h3 className="step-card-title">Live with <em>compassion</em></h3>
              <p className="step-card-body">
                Reframe your inner dialogue so kindness becomes your default reflex rather than harsh judgment when plans shift or energy fluctuates.
              </p>
            </div>
          </div>

          <div className="pt-20 text-center">
            <span className="eyebrow-mono">TAKE THE NEXT STEP</span>
            <h2 className="text-3xl font-normal mt-2 mb-6">
              Begin your journey toward an <em>unhurried life.</em>
            </h2>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <Link href="/workshop" className="btn-primary-terracotta">
                Join the 1-Hour Workshop ↗
              </Link>
              <Link href="/coaching" className="btn-secondary-outlined">
                Explore 1:1 Coaching
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
