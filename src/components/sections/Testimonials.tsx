'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const COLS = [
  {
    role: 'Director of IT',
    company: 'Auchan',
    quote:
      'Rare talent who goes from whiteboard strategy to a SQL query in the same afternoon. Thomas delivered clarity on a €250M portfolio nobody had managed to map before.',
  },
  {
    role: 'L6 Engineering Manager',
    company: 'Amazon',
    quote:
      'His program management skills kept 50+ stakeholders aligned without a single escalation. He translated ambiguous directives into concrete delivery milestones every time.',
  },
  {
    role: 'Engineering Lead',
    company: 'Amazon',
    quote:
      'Thomas transformed how we think about data products. His ability to bridge engineering and business is rare — he shipped in weeks what I thought would take quarters.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      style={{ background: '#1d1d1f', paddingBlock: 'clamp(5rem,10vw,8rem)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ maxWidth: '680px', marginBottom: '72px' }}
        >
          <p
            style={{
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              color: '#5AC8FA',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Kind words
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
            }}
          >
            &ldquo;Product instinct.{' '}
            <span style={{ color: '#5AC8FA' }}>Technical depth.</span>{' '}
            Delivery.&rdquo;
          </p>
        </motion.div>

        {/* Comparison list — inspired by Apple iPhone comparison layout */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {COLS.map(({ role, company, quote }, i) => (
            <motion.div
              key={role + company}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: 'easeOut' }}
            >
              {/* Model-name header row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: i > 0 ? '40px' : '0',
                  paddingBottom: '16px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#ffffff',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {role}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    color: '#5AC8FA',
                    background: 'rgba(90,200,250,0.08)',
                    border: '1px solid rgba(90,200,250,0.2)',
                    padding: '3px 10px',
                    borderRadius: '99px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {company}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
              </div>

              {/* Quote card */}
              <div
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: 'clamp(24px, 3vw, 36px) clamp(24px, 3vw, 40px)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                    lineHeight: 1.8,
                    color: 'rgba(245,245,247,0.9)',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            color: 'rgba(255,255,255,0.15)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            marginTop: '48px',
          }}
        >
          * Illustrative — real quotes coming soon
        </p>
      </div>
    </section>
  );
}
