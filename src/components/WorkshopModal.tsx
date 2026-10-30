"use client";

import { useState, useEffect } from "react";

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDate?: string;
}

const upcomingDates = [
  { id: "slot-1", label: "Saturday, Nov 14 • 10:00 – 11:00 GMT", status: "Open" },
  { id: "slot-2", label: "Thursday, Nov 26 • 19:00 – 20:00 GMT", status: "Filling Fast" },
  { id: "slot-3", label: "Sunday, Dec 6 • 16:00 – 17:00 GMT", status: "Open" },
];

export default function WorkshopModal({ isOpen, onClose, preselectedDate }: WorkshopModalProps) {
  const [selectedSession, setSelectedSession] = useState(preselectedDate || upcomingDates[0].label);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [bookingResult, setBookingResult] = useState<{
    bookingRef: string;
    sessionDate: string;
    message: string;
  } | null>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book-workshop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          sessionDate: selectedSession,
          note,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reserve spot. Please try again.");
      } else {
        setBookingResult(data);
      }
    } catch (err) {
      setError("Network error. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleReset = () => {
    setBookingResult(null);
    setName("");
    setEmail("");
    setNote("");
    setError("");
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-journal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-pill"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {!bookingResult ? (
          <div>
            <span className="eyebrow-mono">APOTHECARY WORKSHOP</span>
            <h2 className="text-3xl font-normal mt-1 mb-2">
              Start with <em>Self-Compassion</em>
            </h2>
            <p className="text-sm text-[var(--color-charcoal)] leading-relaxed mb-6">
              A gentle 60-minute experiential cohort with Bibi Beck. Select your preferred upcoming date to secure your space.
            </p>

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                  Select Cohort Session
                </label>
                <div className="flex flex-col gap-2">
                  {upcomingDates.map((date) => (
                    <button
                      key={date.id}
                      type="button"
                      className={`calendar-pill-row ${selectedSession === date.label ? "selected" : ""}`}
                      onClick={() => setSelectedSession(date.label)}
                    >
                      <span className="text-sm">{date.label}</span>
                      <span className="text-xs font-mono font-semibold text-[var(--color-terracotta-seal)]">
                        {date.status}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="modal-name" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                  Your Full Name
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pill-input"
                />
              </div>

              <div>
                <label htmlFor="modal-email" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                  Email Address (for Workshop Link)
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pill-input"
                />
              </div>

              <div>
                <label htmlFor="modal-note" className="text-xs font-semibold uppercase tracking-wider text-[var(--color-charcoal)] mb-2 block">
                  Anything you are struggling with? (Optional)
                </label>
                <textarea
                  id="modal-note"
                  rows={2}
                  placeholder="e.g. Guilt when taking breaks, perfectionism..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="pill-input pill-textarea"
                />
              </div>

              {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

              <div className="pt-2 flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-terracotta w-full justify-center"
                >
                  {isSubmitting ? "Securing your spot..." : "Confirm reservation ↗"}
                </button>
                <p className="text-xs text-[var(--color-graphite)] text-center font-mono">
                  ✦ Small group size • Online live access • Free attendance
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-sage)] text-[var(--color-sage-deep)] flex items-center justify-center font-bold text-xl mx-auto mb-4">
              ✓
            </div>
            <span className="eyebrow-mono">RESERVATION CONFIRMED</span>
            <h2 className="text-2xl font-normal mt-2 mb-4">
              You are booked in, <em>{name.split(" ")[0]}</em>
            </h2>
            <div className="bg-[var(--color-aged-paper)] p-5 rounded-2xl border border-[var(--color-warm-taupe)] text-left mb-6 flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--color-graphite)]">Session:</span>
                <span className="font-medium text-ink">{bookingResult.sessionDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-graphite)]">Attendee:</span>
                <span className="text-ink">{name} ({email})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--color-graphite)]">Reference:</span>
                <span className="font-mono text-terracotta">{bookingResult.bookingRef}</span>
              </div>
            </div>

            <p className="text-sm text-[var(--color-charcoal)] leading-relaxed mb-6">
              {bookingResult.message}
            </p>

            <button
              type="button"
              className="btn-primary-terracotta w-full justify-center"
              onClick={handleReset}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
