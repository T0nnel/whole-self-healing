"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorkshopModal from "@/components/WorkshopModal";
import BotanicalScrollTrack from "@/components/BotanicalScrollTrack";
import ScrollRevealSection from "@/components/ScrollRevealSection";
import Link from "next/link";

const workshopCopy =
  "Take the first step by joining this one-hour workshop to understand your inner critic, ease the pressure you put on yourself, and learn practical ways to treat yourself with more kindness and compassion.";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

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
                "We shouldn't have to reach breaking point before giving ourselves permission to slow down and prioritise our wellbeing."
              </p>

              <p className="hero-journal-subtitle hero-stagger-3">
                A space for anyone who feels they should always be doing more,
                struggles to rest without guilt, and is ready to find a gentler
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
                  <span className="stat-caption">people supported so far</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-metric">60 min</span>
                  <span className="stat-caption">online cohort</span>
                </div>
                <div className="stat-divider" aria-hidden="true" />
                <div className="stat-item">
                  <span className="stat-metric">1:1</span>
                  <span className="stat-caption">coaching coming soon</span>
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center mb-6">
            <div className="md:col-span-8 lg:col-span-8">
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
            {/* Logo in a circle: centered nicely on mobile below the text, and centered in column 3 (above Card 3) on desktop */}
            <div className="flex md:col-span-4 lg:col-span-4 items-center justify-center my-4 md:my-0">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-[var(--color-aged-paper)] border border-[var(--color-warm-taupe)] shadow-sm flex items-center justify-center p-2">
                <Image
                  src="/logo-circle.png"
                  alt="Whole Self Healing emblem"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            </div>
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
              "We shouldn't have to reach breaking point before giving ourselves permission to slow down and prioritise our wellbeing."
            </p>
            <div className="quote-author-row">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-dusty-pink)] shrink-0 shadow-sm">
                <Image
                  src="/bibi-beck.jpg"
                  alt="Bibi Beck, MSc Clinical Psychology"
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="author-name">Bibi Beck</p>
                <p className="author-credentials">
                  Psychological Wellbeing Practitioner (PgDip), MSc Clinical Psychology, Mindfulness Practitioner &amp; Yoga Teacher
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
                  MSc Clinical Psychology
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  PgDip Qualified PWP
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  Mindfulness Practitioner
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  Yoga Teacher
                </span>
                <span className="announcement-pill text-ink bg-[var(--color-parchment)] border border-[var(--color-warm-taupe)]">
                  NLP Practitioner
                </span>
              </div>

              {/* Bibi Profile Photo Card */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--color-warm-taupe)] shadow-sm bg-[var(--color-parchment)] max-w-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/bibi-beck.jpg"
                    alt="Bibi Beck"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 380px"
                  />
                </div>
                <div className="p-4 border-t border-[var(--color-warm-taupe)] text-xs text-[var(--color-graphite)] font-mono flex justify-between items-center">
                  <span>BIBI BECK</span>
                  <span>MSc CLINICAL PSYCHOLOGY</span>
                </div>
              </div>
            </div>

            <div className="text-base text-[var(--color-charcoal)] leading-relaxed flex flex-col gap-4">
              <p>
                My approach brings together psychological knowledge, years of professional experience in mental health care, and a holistic understanding of wellbeing. I hold a Bachelor's degree in Psychology and a Master's degree in Clinical Psychology. I am also a qualified Psychological Wellbeing Practitioner (postgraduate diploma), mindfulness practitioner, and yoga teacher, with additional training in Neuro-Linguistic Programming (NLP), mental health coaching, and life coaching.
              </p>
              <p>
                Alongside my professional background, my own lived experience has shaped the way I understand wellbeing. My experiences of trauma led me to ways of coping that involved disconnecting from difficult emotions and pushing through, at the expense of my true needs. When I later developed a debilitating health condition, I was forced to slow down and examine my relationship with myself, my identity, and the way I wanted to live.
              </p>
              <p>
                This journey taught me the importance of listening to our bodies, recognising and honouring our limits, and challenging the pressure to keep going at all costs. It also showed me how isolating it can feel to navigate life's challenges alone, and how valuable it is to feel understood, supported, and connected to others.
              </p>
              <p>
                These experiences inspired me to create Whole Self Healing, a space where I can share the lessons I've learned and support people in finding a more compassionate way of living. I believe we shouldn't have to reach breaking point before giving ourselves permission to slow down and prioritise our wellbeing.
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
                One-hour live online workshop
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
                I'm developing one-to-one coaching to help people explore the patterns that keep them under pressure and create a more balanced, fulfilling way of living.
              </p>
              <p className="text-base text-[var(--color-charcoal)] leading-relaxed mb-6">
                If this sounds like something you would be interested in, register your interest and book a discovery call below to be notified as private openings become available.
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
                    <h3 className="text-2xl font-normal mt-1">Register your interest &amp; book a discovery call</h3>
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
                      {isSubmitting ? "Submitting..." : "Register your interest & book a discovery call →"}
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
