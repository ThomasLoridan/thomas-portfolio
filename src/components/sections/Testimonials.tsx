'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/* ─── Testimonial data — unchanged ───────────────────────── */
const COLS = [
  {
    role: 'Product Manager',
    company: 'Amazon',
    quote:
      "Any business needs to use available technology to improve its efficiency, and any tech team needs to understand how the business works to apply that tech in the most useful way. During '25, Thomas became the bridge between those 2 worlds, increasing his business knowledge while actively engaging with the team to propose improvements to the existing mechanisms. He is organized and clean, which makes it easy to non-tech contributors to learn and even reuse his deliveries.",
  },
  {
    role: 'Program Manager',
    company: 'Amazon',
    quote:
      'Thomas consistently maintains high standards in his work by ensuring his solutions meet quality benchmarks and iterating on his outputs until they achieve the desired level of excellence. His curiosity-driven approach has resulted in improved automation processes and more effective business intelligence tools that benefit both the team\'s efficiency and our ability to serve customers better.',
  },
  {
    role: 'Digital Manager',
    company: "L'Oréal",
    quote:
      'Thomas has been a key element in my team. He is a fast learner and very volunteer for new challenges. Definitely a great added value to lead projects.',
  },
];

/* ─── Single testimonial card ────────────────────────────── */
function TestimonialCard({
  role,
  company,
  quote,
  cardRef,
}: {
  role: string;
  company: string;
  quote: string;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={cardRef}
      style={{ opacity: 0, position: 'relative' }}
    >
      {/* Decorative quote mark — large serif, behind content */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-12px',
          left: 'clamp(20px, 3vw, 36px)',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(8rem, 14vw, 13rem)',
          lineHeight: 1,
          color: '#ffffff',
          opacity: 0.032,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        &#8220;
      </span>

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          padding: 'clamp(28px, 3.5vw, 44px) clamp(28px, 3.5vw, 48px)',
        }}
      >
        {/* Attribution */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: '#f5f5f7',
              letterSpacing: '-0.01em',
            }}
          >
            {role}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 500,
              color: '#86868b',
              background: 'rgba(245,245,247,0.06)',
              border: '1px solid rgba(245,245,247,0.10)',
              padding: '3px 10px',
              borderRadius: '99px',
              letterSpacing: '0.04em',
            }}
          >
            {company}
          </span>
        </div>

        {/* Quote */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 400,
            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
            lineHeight: 1.85,
            color: 'rgba(245,245,247,0.78)',
            fontStyle: 'italic',
          }}
        >
          &#8220;{quote}&#8221;
        </p>
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────── */
export function Testimonials() {
  const sectionRef    = useRef<HTMLElement>(null);
  const p1Ref         = useRef<HTMLSpanElement>(null);
  const p2Ref         = useRef<HTMLSpanElement>(null);
  const p3Ref         = useRef<HTMLSpanElement>(null);
  const subRef        = useRef<HTMLParagraphElement>(null);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // H2 — three-phrase clip reveal
      gsap.fromTo([p1Ref.current, p2Ref.current, p3Ref.current],
        { yPercent: 110 },
        {
          yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Sub
      gsap.fromTo(subRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards — staggered fade in from bottom
      const cards = cardRefs.current.filter(Boolean);
      gsap.fromTo(cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Exit animations — cards fade out as they scroll off the top
      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'bottom 18%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(card, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      style={{
        background: '#0a0a0a',
        paddingBlock: 'clamp(80px, 12vw, 120px)',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          {/* H2 — three-phrase clip reveal */}
          <h2
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 800,
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              marginBottom: '20px',
            }}
          >
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p1Ref} style={{ display: 'inline-block', color: '#f5f5f7' }}>
                Product instinct.&nbsp;
              </span>
            </span>
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p2Ref} style={{ display: 'inline-block', color: '#5AC8FA' }}>
                Technical depth.&nbsp;
              </span>
            </span>
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p3Ref} style={{ display: 'inline-block', color: '#f5f5f7' }}>
                Delivery.
              </span>
            </span>
          </h2>

          <p
            ref={subRef}
            style={{
              opacity: 0,
              color: '#86868b',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            From the people I&apos;ve delivered with.
          </p>
        </div>

        {/* Testimonial cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {COLS.map(({ role, company, quote }, i) => (
            <TestimonialCard
              key={role + company}
              role={role}
              company={company}
              quote={quote}
              cardRef={(el) => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
