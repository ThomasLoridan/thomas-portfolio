'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ─── Data ────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    role: 'Product Manager',
    company: 'Amazon',
    accentColor: '#FF9900',
    initials: 'PM',
    quote:
      "Any business needs to use available technology to improve its efficiency, and any tech team needs to understand how the business works to apply that tech in the most useful way. During '25, Thomas became the bridge between those 2 worlds, increasing his business knowledge while actively engaging with the team to propose improvements to the existing mechanisms. He is organized and clean, which makes it easy to non-tech contributors to learn and even reuse his deliveries.",
  },
  {
    role: 'Program Manager',
    company: 'Amazon',
    accentColor: '#FF9900',
    initials: 'PM',
    quote:
      "Thomas consistently maintains high standards in his work by ensuring his solutions meet quality benchmarks and iterating on his outputs until they achieve the desired level of excellence. His curiosity-driven approach has resulted in improved automation processes and more effective business intelligence tools that benefit both the team's efficiency and our ability to serve customers better.",
  },
  {
    role: 'Digital Manager',
    company: "L'Oréal",
    accentColor: '#C8A951',
    initials: 'DM',
    quote:
      "Thomas has been a key element in my team. He is a fast learner and very volunteer for new challenges. Definitely a great added value to lead projects.",
  },
];

/* ─── Arrow icon ──────────────────────────────────────────── */
function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Main section ────────────────────────────────────────── */
export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const [active, setActive]   = useState(0);
  const [animating, setAnimating] = useState(false);

  /* Section entry */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerRef.current, cardRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Card slide transition */
  const goTo = useCallback((nextIdx: number) => {
    if (nextIdx === active || animating || !cardRef.current) return;
    const dir = nextIdx > active ? 1 : -1;
    setAnimating(true);
    gsap.to(cardRef.current, {
      opacity: 0, x: -24 * dir, duration: 0.22, ease: 'power2.in',
      onComplete: () => {
        setActive(nextIdx);
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, x: 24 * dir },
          {
            opacity: 1, x: 0, duration: 0.3, ease: 'power2.out',
            onComplete: () => setAnimating(false),
          }
        );
      },
    });
  }, [active, animating]);

  const t = TESTIMONIALS[active];
  const canPrev = active > 0;
  const canNext = active < TESTIMONIALS.length - 1;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ background: '#f5f5f7', paddingBlock: 'clamp(80px, 12vw, 120px)' }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0, marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '14px',
              color: '#1d1d1f',
            }}
          >
            Product instinct.{' '}
            <span style={{ color: '#5AC8FA' }}>Technical depth.</span>{' '}
            Delivery.
          </h2>
          <p style={{ color: '#6e6e73', fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)', lineHeight: 1.8 }}>
            From the people I&apos;ve delivered with.
          </p>
        </div>

        {/* Card */}
        <div
          ref={cardRef}
          style={{
            opacity: 0,
            background: '#ffffff',
            borderRadius: '20px',
            padding: 'clamp(28px, 4vw, 48px)',
            boxShadow: '0 2px 24px rgba(0,0,0,0.07)',
            marginBottom: '28px',
          }}
        >
          {/* Attribution — role + company */}
          <div style={{ marginBottom: '24px' }}>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                color: '#1d1d1f',
                lineHeight: 1.2,
                marginBottom: '8px',
              }}
            >
              {t.role}
            </p>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 500,
                color: '#86868b',
                background: 'rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.08)',
                padding: '3px 10px',
                borderRadius: '99px',
                letterSpacing: '0.04em',
              }}
            >
              {t.company}
            </span>
          </div>

          {/* Avatar circle */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: t.accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '0.82rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
              }}
            >
              {t.initials}
            </span>
          </div>

          {/* Quote */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 'clamp(1rem, 1.2vw, 1.08rem)',
              lineHeight: 1.9,
              color: '#424245',
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

        {/* Navigation — dots left, arrows right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Pill dots */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={{
                  width: i === active ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#1d1d1f' : 'rgba(0,0,0,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { label: 'Previous', enabled: canPrev, onClick: () => goTo(active - 1), icon: <ChevronLeft /> },
              { label: 'Next',     enabled: canNext, onClick: () => goTo(active + 1), icon: <ChevronRight /> },
            ].map(({ label, enabled, onClick, icon }) => (
              <button
                key={label}
                onClick={onClick}
                aria-label={label}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: enabled ? '#ffffff' : 'transparent',
                  border: `1px solid ${enabled ? 'rgba(0,0,0,0.14)' : 'rgba(0,0,0,0.08)'}`,
                  cursor: enabled ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: enabled ? '#1d1d1f' : 'rgba(0,0,0,0.22)',
                  transition: 'background 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => { if (enabled) e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                {icon}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
