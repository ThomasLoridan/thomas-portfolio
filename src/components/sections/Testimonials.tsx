'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

/* ─── Data ────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    role: 'Product Manager',
    company: 'Amazon',
    accentColor: '#FF9900',
    quote:
      "Any business needs to use available technology to improve its efficiency, and any tech team needs to understand how the business works to apply that tech in the most useful way. During '25, Thomas became the bridge between those 2 worlds, increasing his business knowledge while actively engaging with the team to propose improvements to the existing mechanisms. He is organized and clean, which makes it easy to non-tech contributors to learn and even reuse his deliveries.",
  },
  {
    role: 'Program Manager',
    company: 'Amazon',
    accentColor: '#FF9900',
    quote:
      "Thomas consistently maintains high standards in his work by ensuring his solutions meet quality benchmarks and iterating on his outputs until they achieve the desired level of excellence. His curiosity-driven approach has resulted in improved automation processes and more effective business intelligence tools that benefit both the team's efficiency and our ability to serve customers better.",
  },
  {
    role: 'Digital Manager',
    company: "L'Oréal",
    accentColor: '#C8A951',
    quote:
      "Thomas has been a key element in my team. He is a fast learner and very volunteer for new challenges. Definitely a great added value to lead projects.",
  },
];

/* ─── Arrow icons ─────────────────────────────────────────── */
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
  const sectionRef       = useRef<HTMLElement>(null);
  const headerRef        = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Section entry — header + card container fade in */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [headerRef.current, cardContainerRef.current],
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

  const goTo = (nextIdx: number) => {
    if (nextIdx === active) return;
    setActive(nextIdx);
  };

  const canPrev = active > 0;
  const canNext = active < TESTIMONIALS.length - 1;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{ background: '#f5f5f7', paddingBlock: 'clamp(80px, 12vw, 120px)' }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>

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

        {/* Card container — sized by the tallest card via CSS grid stacking */}
        <div
          ref={cardContainerRef}
          style={{
            opacity: 0,
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 2px 28px rgba(0,0,0,0.08)',
            marginBottom: '28px',
            /* All children share this grid cell so the box is always
               as tall as the tallest card — navigation never jumps. */
            display: 'grid',
            overflow: 'hidden',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card-inner"
              style={{
                gridRow: 1,
                gridColumn: 1,
                padding: 'clamp(36px, 5vw, 56px)',
                opacity: i === active ? 1 : 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: i === active ? 'auto' : 'none',
              }}
            >
              {/* Attribution — role + company */}
              <div style={{ marginBottom: '24px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    color: '#1d1d1f',
                    lineHeight: 1.2,
                    marginBottom: '4px',
                  }}
                >
                  {t.role}
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    color: t.accentColor,
                    lineHeight: 1.2,
                  }}
                >
                  {t.company}
                </p>
              </div>

              {/* Avatar — Apple person pictogram */}
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: t.accentColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                }}
              >
                {/* Filled SF-symbol-style person silhouette */}
                <svg width="28" height="28" viewBox="0 0 28 28" fill="white">
                  <circle cx="14" cy="10" r="5" />
                  <path d="M4 28c0-5.523 4.477-10 10-10s10 4.477 10 10H4z" />
                </svg>
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 'clamp(0.95rem, 1.15vw, 1.05rem)',
                  lineHeight: 1.9,
                  color: '#3a3a3c',
                  margin: 0,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Navigation — dots left, arrows right */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Pill dots */}
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="nav-dot-btn"
                style={{
                  padding: '12px 4px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{
                  display: 'block',
                  width: i === active ? '22px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === active ? '#1d1d1f' : 'rgba(0,0,0,0.18)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }} />
              </button>
            ))}
          </div>

          {/* Arrow buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {([
              { label: 'Previous', enabled: canPrev, handler: () => goTo(active - 1), icon: <ChevronLeft /> },
              { label: 'Next',     enabled: canNext, handler: () => goTo(active + 1), icon: <ChevronRight /> },
            ] as const).map(({ label, enabled, handler, icon }) => (
              <button
                key={label}
                onClick={handler}
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
                  transition: 'box-shadow 0.2s ease',
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
