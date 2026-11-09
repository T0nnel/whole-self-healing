"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="overflow-hidden relative">
      <Header />

      {/* Hero */}
      <section className="py-16 bg-[var(--color-parchment)]">
        <div className="main-wrapper">
          <span className="eyebrow-mono">FOUNDER &amp; CLINICIAN</span>
          <h1 className="text-5xl font-normal leading-tight mt-2 mb-4">
            Meet <em>Bibi Beck</em>
          </h1>
          <p className="text-lg text-[var(--color-charcoal)] leading-relaxed max-w-2xl mb-8">
            Psychological knowledge, clinical expertise, and real lived experience combined to create a softer, more grounded way of inhabiting your life.
          </p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-20 bg-[var(--color-aged-paper)]">
        <div className="main-wrapper">
          <div className="practitioner-quote-card bg-[var(--color-parchment)] mb-16">
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
                  Founder of Whole Self Healing • MSc Clinical Psychology, PgDip Qualified PWP, Mindfulness Practitioner &amp; Yoga Teacher
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="eyebrow-label">CLINICAL QUALIFICATIONS</span>
              <h2 className="text-3xl font-normal leading-tight">
                Bridging mind, body, and <em>nervous system.</em>
              </h2>

              {/* Portrait Photo Card */}
              <div className="my-6 rounded-2xl overflow-hidden border border-[var(--color-warm-taupe)] shadow-sm bg-[var(--color-parchment)] max-w-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/bibi-beck.jpg"
                    alt="Bibi Beck"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 380px"
                    priority
                  />
                </div>
                <div className="p-4 border-t border-[var(--color-warm-taupe)] text-xs text-[var(--color-graphite)] font-mono flex justify-between items-center">
                  <span>BIBI BECK</span>
                  <span>MSc CLINICAL PSYCHOLOGY</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <div className="bg-[var(--color-parchment)] p-4 rounded-xl border border-[var(--color-warm-taupe)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">BSc (Hons) Psychology</span>
                  <span className="text-xs font-mono text-[var(--color-dusty-pink)]">ACCREDITED</span>
                </div>
                <div className="bg-[var(--color-parchment)] p-4 rounded-xl border border-[var(--color-warm-taupe)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">MSc Clinical Psychology</span>
                  <span className="text-xs font-mono text-[var(--color-dusty-pink)]">POSTGRADUATE</span>
                </div>
                <div className="bg-[var(--color-parchment)] p-4 rounded-xl border border-[var(--color-warm-taupe)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Qualified Psychological Wellbeing Practitioner</span>
                  <span className="text-xs font-mono text-[var(--color-dusty-pink)]">PGDIP • NHS / CLINICAL</span>
                </div>
                <div className="bg-[var(--color-parchment)] p-4 rounded-xl border border-[var(--color-warm-taupe)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Mindfulness Practitioner</span>
                  <span className="text-xs font-mono text-[var(--color-dusty-pink)]">MINDFULNESS</span>
                </div>
                <div className="bg-[var(--color-parchment)] p-4 rounded-xl border border-[var(--color-warm-taupe)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Certified Yoga Teacher (Holistic Somatics)</span>
                  <span className="text-xs font-mono text-[var(--color-dusty-pink)]">SOMATIC</span>
                </div>
                <div className="bg-[var(--color-parchment)] p-4 rounded-xl border border-[var(--color-warm-taupe)] flex items-center justify-between">
                  <span className="text-sm font-semibold text-ink">Certified Training in NLP &amp; Life Coaching</span>
                  <span className="text-xs font-mono text-[var(--color-dusty-pink)]">CERTIFICATE</span>
                </div>
              </div>
            </div>

            <div className="text-base text-[var(--color-charcoal)] leading-relaxed flex flex-col gap-4">
              <p>
                My approach brings together psychological knowledge, years of professional experience in mental health care, and a holistic understanding of wellbeing. I hold a Bachelor's degree in Psychology and a Master's degree in Clinical Psychology. I am also a qualified Psychological Wellbeing Practitioner (holding a postgraduate diploma), mindfulness practitioner, and yoga teacher, with additional training in Neuro-Linguistic Programming (NLP), mental health coaching, and life coaching.
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
              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <Link href="/workshop" className="btn-primary-terracotta">
                  Join the workshop ↗
                </Link>
                <Link href="/coaching" className="btn-secondary-outlined">
                  Work 1:1 with Bibi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
