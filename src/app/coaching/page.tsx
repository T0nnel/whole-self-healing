"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CoachingPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [focusArea, setFocusArea] = useState("Rest & Guilt Relief");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          focusArea,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || "Failed to submit. Please try again.");
      } else {
        setSubmissionSuccess(data.message);
      }
    } catch (err) {
      setErrorMessage("Something went wrong connecting to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleResetForm = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmissionSuccess(null);
    setErrorMessage(null);
  };

  return (
    <main className="overflow-hidden relative">
      <Header />

      {/* Hero */}
      <section className="py-16 bg-[var(--color-parchment)]">
        <div className="main-wrapper">
          <span className="eyebrow-mono">PRIVATE CLINICAL MENTORSHIP</span>
          <h1 className="text-5xl font-normal leading-tight mt-2 mb-4">
            One-to-One <em>Coaching</em>
          </h1>
          <p className="text-lg text-[var(--color-charcoal)] leading-relaxed max-w-2xl mb-8">
            A deeply personalized, confidential container for anyone ready to stop pushing through at their own expense, unlearn the instinct to over-function, and build sustainable harmony from within.
          </p>
        </div>
      </section>

      {/* 3 Pillars in Numbered Step Cards */}
      <section className="py-20 bg-[var(--color-aged-paper)]">
        <div className="main-wrapper">
          <div className="max-w-2xl mb-12">
            <span className="eyebrow-label">THE PILLARS OF SUPPORT</span>
            <h2 className="text-4xl font-normal">
              Support that meets you <em>exactly where you are.</em>
            </h2>
            <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4">
              Unlike rigid productivity coaching or superficial self-care advice, our work combines evidence-based psychological tools with somatic nervous system awareness.
            </p>
          </div>

          <div className="step-cards-grid mt-0">
            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">PILLAR 01</span>
              <h3 className="step-card-title">Nervous System <em>Safety</em></h3>
              <p className="step-card-body">
                De-escalate chronic fight-or-flight states so your body can physiologically accept deep rest without panic or restlessness.
              </p>
            </div>

            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">PILLAR 02</span>
              <h3 className="step-card-title">Boundaries Without <em>Guilt</em></h3>
              <p className="step-card-body">
                Learn to protect your time and step away from people-pleasing patterns that systematically drain your reserves.
              </p>
            </div>

            <div className="numbered-step-card bg-[var(--color-parchment)]">
              <span className="step-num-badge">PILLAR 03</span>
              <h3 className="step-card-title">Compassionate <em>Accountability</em></h3>
              <p className="step-card-body">
                Integrate daily rituals that nourish your energy, body, and mind without turning rest into another rigid to-do list item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intake Form Section */}
      <section id="register" className="py-20 bg-[var(--color-parchment)]">
        <div className="main-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="eyebrow-label">APPLICATION &amp; INTAKE</span>
              <h2 className="text-4xl font-normal leading-tight">
                Looking for more <em>individual support?</em>
              </h2>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4 mb-4">
                I'm developing one-to-one coaching to help people explore the patterns that keep them under pressure and create a more balanced, fulfilling way of living.
              </p>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mb-6">
                If this sounds like something you would be interested in, register your interest and book a discovery call below.
              </p>
              <Link href="/workshop" className="btn-secondary-outlined btn-pill-sm">
                Prefer to start with a group workshop first? →
              </Link>
            </div>

            <div className="form-journal-card bg-[var(--color-aged-paper)]">
              {!submissionSuccess ? (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div>
                    <span className="eyebrow-mono">INTAKE REGISTRATION</span>
                    <h3 className="text-2xl font-normal mt-1">Register your interest &amp; book a discovery call</h3>
                    <p className="text-xs text-[var(--color-graphite)] mt-1">
                      Stay in touch as private intake openings unlock.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="coaching-name" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Your Name
                    </label>
                    <input
                      id="coaching-name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pill-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="coaching-email" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Email Address
                    </label>
                    <input
                      id="coaching-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pill-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="coaching-focus" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Primary Focus Area
                    </label>
                    <select
                      id="coaching-focus"
                      className="pill-input"
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value)}
                    >
                      <option value="Rest & Guilt Relief">Rest &amp; Guilt Relief</option>
                      <option value="Inner Critic & Perfectionism">Inner Critic &amp; Perfectionism</option>
                      <option value="Burnout Recovery & Chronic Fatigue">Burnout Recovery &amp; Chronic Fatigue</option>
                      <option value="Boundaries & People Pleasing">Boundaries &amp; People Pleasing</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coaching-message" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Anything you'd like to share? (Optional)
                    </label>
                    <textarea
                      id="coaching-message"
                      name="message"
                      rows={3}
                      placeholder="Tell me a little about what you're experiencing..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="pill-input pill-textarea"
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-terracotta w-full justify-center"
                    >
                      {isSubmitting ? "Submitting..." : "Register your interest & book a discovery call →"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-sage)] text-[var(--color-sage-deep)] flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-normal">Thank you, <em>{name}</em></h3>
                  <p className="text-sm text-[var(--color-charcoal)] leading-relaxed mt-2 mb-6">
                    {submissionSuccess}
                  </p>
                  <button
                    type="button"
                    className="btn-secondary-outlined btn-pill-sm mx-auto"
                    onClick={handleResetForm}
                  >
                    Submit another inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
