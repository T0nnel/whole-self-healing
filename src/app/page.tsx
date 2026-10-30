"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkshopModal from "@/components/WorkshopModal";
import ParticleCanvas, { ParticleSectionState } from "@/components/ParticleCanvas";
import BotanicalScrollTrack from "@/components/BotanicalScrollTrack";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Link from "next/link";

const workshopCopy =
  "Take the first step by joining this one-hour workshop to understand your inner critic, ease the pressure you put on yourself, and learn practical ways to treat yourself with more kindness and compassion.";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<ParticleSectionState>("hero");
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Track active section to trigger organic particle shifts
  useEffect(() => {
    const sectionIds: { id: string; state: ParticleSectionState }[] = [
      { id: "home", state: "hero" },
      { id: "approach", state: "approach" },
      { id: "about", state: "about" },
      { id: "workshop", state: "workshop" },
      { id: "coaching", state: "coaching" },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = sectionIds.find((s) => s.id === entry.target.id);
            if (match) {
              setCurrentSection(match.state);
            }
          }
        });
      },
      {
        threshold: 0.25,
      }
    );

    sectionIds.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);

    try {
      const res = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMsg,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data.error || "Unable to submit your registration. Please try again.");
      } else {
        setFormSuccess(data.message);
      }
    } catch (err) {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleResetForm = () => {
    setFormName("");
    setFormEmail("");
    setFormMsg("");
    setFormSuccess(null);
    setFormError(null);
  };

  return (
    <main className="overflow-hidden relative">
      {/* Signature Canvas Particle Engine (Fixed, smooth, low GPU load, paused when off-screen) */}
      <ParticleCanvas currentSection={currentSection} page="home" />

      <Header onBookClick={() => setModalOpen(true)} />

      {/* Hero Section — Warm Apothecary Journal on Parchment */}
      <section id="home" className="hero-journal-section relative z-10">
        <div className="main-wrapper">
          <div className="hero-journal-grid">
            <div className="hero-stagger-1">
              {/* Small tasteful discipline label — lowercase, body face, not tracked all-caps */}
              <p className="text-sm text-[var(--color-graphite)] mb-5">
                Evidence-based care &amp; somatics
              </p>

              <h1 className="hero-journal-title">
                What if you gave yourself permission to slow down?
              </h1>

              <p className="text-lg text-[var(--color-charcoal)] italic font-serif mb-4 hero-stagger-2">
                "When did resting start to feel like something you had to earn?"
              </p>

              <p className="hero-journal-subtitle hero-stagger-3">
                A space for women who feel they should always be doing more,
                struggle to rest without guilt, and are ready to find a gentler
                way of living.
              </p>

              <div className="hero-actions-row hero-stagger-4">
                <button
                  type="button"
                  className="btn-primary-terracotta"
                  onClick={() => setModalOpen(true)}
                >
                  Join the self-compassion workshop
                </button>
                <Link href="#approach" className="btn-secondary-outlined">
                  How it works
                </Link>
              </div>

              {/* Stats — real figures from Bibi's work, plain language */}
              <div className="hero-stat-row">
                <div className="stat-item">
                  <span className="stat-metric">200+</span>
                  <span className="stat-caption">women supported so far</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-metric">60 min</span>
                  <span className="stat-caption">online, via Zoom</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-metric">1:1</span>
                  <span className="stat-caption">coaching coming soon</span>
                </div>
              </div>
            </div>

            {/* Apothecary Herbarium Card with subtle living rhythm */}
            <div className="flex flex-col items-center">
              <div
                className="apothecary-photo-card breath-rhythm relative"
                aria-label="Apothecary botanical specimen"
              >
                <span className="apothecary-specimen-badge">NO. 01 / SPECIMEN</span>
                <div className="relative w-full aspect-[4/5] flex items-center justify-center">
                  <Image
                    src="/botanical-specimen.svg"
                    alt="Pressed botanical specimen on warm parchment"
                    width={420}
                    height={520}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--color-warm-taupe)] flex justify-between items-center text-xs text-[var(--color-graphite)] font-mono">
                  <span>WHOLE SELF HEALING</span>
                  <span>BIBI BECK, MSc, PWP</span>
                </div>
              </div>
            </div>
          </div>

          {/* What Bibi works on — perfectly aligned tag flow container */}
          <div className="tag-flow-container">
            <span className="text-sm font-medium text-[var(--color-graphite)] shrink-0">
              Areas of support:
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="tag-flow-item">Over-functioning <span className="tag-bullet">·</span></span>
              <span className="tag-flow-item">Inner critic <span className="tag-bullet">·</span></span>
              <span className="tag-flow-item">Chronic restlessness <span className="tag-bullet">·</span></span>
              <span className="tag-flow-item">Rest guilt <span className="tag-bullet">·</span></span>
              <span className="tag-flow-item">Burnout fatigue <span className="tag-bullet">·</span></span>
              <span className="tag-flow-item">Somatic regulation <span className="tag-bullet">·</span></span>
              <span className="tag-flow-item">People pleasing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section — Appears smoothly on scroll from the left */}
      <ScrollRevealSection
        id="approach"
        direction="left"
        className="py-12 md:py-20 bg-[var(--color-parchment)] relative z-10"
      >
        <div className="main-wrapper">
          <div className="max-w-2xl mb-6">
            <p className="text-sm text-[var(--color-graphite)] mb-4">How it works</p>
            <h2 className="text-4xl font-normal leading-tight">
              Rest isn't something you have to earn.
            </h2>
            <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4">
              Combining evidence-based psychological approaches with a holistic focus on wellbeing,
              Whole Self Healing offers coaching and workshops to help you understand the patterns
              that keep you under pressure, learn to rest without guilt, develop a kinder relationship
              with yourself, and create a more balanced and fulfilling way of living.
            </p>
          </div>

          {/* Scroll-Responsive Botanical Progress Track across the 3 principles */}
          <BotanicalScrollTrack />

          <div className="step-cards-grid mt-6">
            <div className="numbered-step-card">
              <div>
                <span className="step-num-badge">01</span>
                <h3 className="step-card-title">Understand your patterns</h3>
                <p className="step-card-body">
                  Explore the inner critic and the unspoken expectations that keep you feeling constantly under pressure to produce.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--color-warm-taupe)] text-xs text-[var(--color-graphite)]">
                Cognitive behavioural awareness
              </div>
            </div>

            <div className="numbered-step-card">
              <div>
                <span className="step-num-badge">02</span>
                <h3 className="step-card-title">Make space to rest</h3>
                <p className="step-card-body">
                  Begin to recognise your nervous system cues and give yourself permission to slow down without internal anxiety or guilt.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--color-warm-taupe)] text-xs text-[var(--color-graphite)]">
                Somatic regulation &amp; yoga
              </div>
            </div>

            <div className="numbered-step-card">
              <div>
                <span className="step-num-badge">03</span>
                <h3 className="step-card-title">Live with compassion</h3>
                <p className="step-card-body">
                  Find practical ways to treat yourself with kindness and create a fulfilling rhythm that honours your natural capacity.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[var(--color-warm-taupe)] text-xs text-[var(--color-graphite)]">
                Compassion-focused integration
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* About Section — Appears smoothly on scroll from the right */}
      <ScrollRevealSection
        id="about"
        direction="right"
        className="py-12 md:py-20 bg-[var(--color-aged-paper)]"
      >
        <div className="main-wrapper">
          <div className="practitioner-quote-card">
            <p className="quote-serif">
              "We shouldn't have to reach breaking point before we give ourselves permission to slow down, prioritise our wellbeing, and make changes that help us feel more like ourselves."
            </p>
            <div className="quote-author-row">
              <div className="quote-avatar-circle" aria-hidden="true">
                BB
              </div>
              <div>
                <p className="author-name">Bibi Beck</p>
                <p className="author-credentials">
                  Psychological Wellbeing Practitioner, MSc Clinical Forensic Psychology, yoga teacher
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12 items-start">
            <div>
              <p className="text-sm text-[var(--color-graphite)] mb-4">About Bibi</p>
              <h2 className="text-3xl font-normal leading-tight">
                Psychological knowledge, clinical expertise, and lived experience.
              </h2>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  BSc (Hons) Psychology
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  MSc Clinical Forensic
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  Qualified PWP
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  NLP Practitioner
                </span>
              </div>
            </div>

            <div className="text-base text-[var(--color-charcoal)] leading-relaxed flex flex-col gap-4">
              <p>
                My approach brings together psychological knowledge, years of professional experience in mental health care, and a holistic understanding of wellbeing. I hold a Bachelor's degree in Psychology and a Master's degree in Clinical Forensic Psychology. I am also a qualified Psychological Wellbeing Practitioner and yoga teacher, with additional training in Neuro-Linguistic Programming (NLP), mental health coaching, and life coaching.
              </p>
              <p>
                Alongside my professional background, my own lived experience has shaped the way I understand wellbeing. My experiences of trauma led me to ways of coping that involved disconnecting from difficult emotions and pushing through, at the expense of my true needs. When I later developed a debilitating health condition, I was forced to slow down and examine my relationship with myself, my identity, and the way I wanted to live.
              </p>
              <p>
                This journey taught me the importance of listening to our bodies, recognising and honouring our limits, and challenging the pressure to keep going at all costs. It also showed me how isolating it can feel to navigate life's challenges alone, and how valuable it is to feel understood, supported, and connected to others.
              </p>
              <p>
                These experiences inspired me to create Whole Self Healing, a space where I can share the lessons I've learned and support other women in finding a more compassionate way of living. I believe we shouldn't have to reach breaking point before we give ourselves permission to slow down, prioritise our wellbeing, and make changes that help us feel more like ourselves.
              </p>
              <div className="pt-2">
                <Link href="/about" className="btn-secondary-outlined btn-pill-sm">
                  Read Bibi's full story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* Workshop Section — Appears smoothly on scroll from the left */}
      <ScrollRevealSection
        id="workshop"
        direction="left"
        className="py-12 md:py-20 bg-[var(--color-parchment)]"
      >
        <div className="main-wrapper">
          <div className="workshop-journal-card">
            <div>
              <p className="text-sm text-[var(--color-graphite)] mb-3">Live workshop</p>
              <h2 className="text-4xl font-normal mt-2 mb-3">
                Start with Self-Compassion
              </h2>
              <p className="text-sm text-[var(--color-terracotta-seal)] mb-4">
                One-hour online workshop via Zoom
              </p>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mb-6">
                {workshopCopy}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  className="btn-primary-terracotta"
                  onClick={() => setModalOpen(true)}
                >
                  Book your place
                </button>
                <Link href="/workshop" className="btn-secondary-outlined">
                  View dates and syllabus
                </Link>
              </div>
            </div>

            <div className="workshop-vignette-box">
              <span className="text-xs uppercase tracking-wider text-[var(--color-graphite)] block mb-2">
                What's included
              </span>
              <h4 className="text-xl font-normal text-ink mb-4">
                Make room for yourself.
              </h4>
              <ul className="text-xs text-left text-[var(--color-charcoal)] leading-loose pl-4 list-disc mb-6">
                <li>Guided somatic nervous system settling</li>
                <li>Cognitive reframing for the inner critic</li>
                <li>Take-home self-compassion workbook and audio practice</li>
              </ul>
              <button
                type="button"
                className="w-full btn-secondary-outlined btn-pill-sm text-center justify-center"
                onClick={() => setModalOpen(true)}
              >
                Reserve your spot
              </button>
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      {/* 1:1 Coaching Intake Section — Appears smoothly on scroll from the right */}
      <ScrollRevealSection
        id="coaching"
        direction="right"
        className="py-12 md:py-20 bg-[var(--color-aged-paper)]"
      >
        <div className="main-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-sm text-[var(--color-graphite)] mb-3">Individual mentorship</p>
              <h2 className="text-4xl font-normal leading-tight">
                Looking for more individual support?
              </h2>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mt-4 mb-4">
                I'm developing one-to-one coaching to help women explore the patterns that keep them under pressure and create a more balanced, fulfilling way of living.
              </p>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mb-6">
                If this sounds like something you would be interested in, register your interest below to be notified as private openings become available.
              </p>
              <Link href="/coaching" className="btn-secondary-outlined btn-pill-sm">
                Learn about 1:1 coaching
              </Link>
            </div>

            <div className="form-journal-card">
              {!formSuccess ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <p className="text-xs text-[var(--color-graphite)] uppercase tracking-wider">Confidential enquiry</p>
                    <h3 className="text-2xl font-normal mt-1">Register your interest</h3>
                    <p className="text-xs text-[var(--color-graphite)] mt-1">
                      Stay in touch as private coaching openings become available.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="home-name" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Your Name
                    </label>
                    <input
                      id="home-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your full name"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="pill-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-email" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Email Address
                    </label>
                    <input
                      id="home-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="pill-input"
                    />
                  </div>

                  <div>
                    <label htmlFor="home-msg" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                      Anything you'd like to share? (Optional)
                    </label>
                    <textarea
                      id="home-msg"
                      name="message"
                      rows={3}
                      placeholder="Tell me a little about what you're looking for..."
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      className="pill-input pill-textarea"
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-red-600 font-medium">{formError}</p>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-terracotta w-full justify-center"
                    >
                      {isSubmitting ? "Submitting..." : "Register interest →"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-sage)] text-[var(--color-sage-deep)] flex items-center justify-center font-bold text-xl mx-auto mb-4">
                    ✓
                  </div>
                  <h3 className="text-2xl font-normal">Thank you, <em>{formName.split(" ")[0]}</em></h3>
                  <p className="text-sm text-[var(--color-charcoal)] leading-relaxed mt-2 mb-6">
                    {formSuccess}
                  </p>
                  <button
                    type="button"
                    className="btn-secondary-outlined btn-pill-sm mx-auto"
                    onClick={handleResetForm}
                  >
                    Submit another response
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollRevealSection>

      <Footer />

      {/* Workshop Booking Modal */}
      <WorkshopModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  );
}
