'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const COLS = [
  {
    role: 'Director of IT · Auchan',
    quote:
      'Rare talent who goes from whiteboard strategy to a SQL query in the same afternoon. Thomas delivered clarity on a €250M portfolio nobody had managed to map before.',
  },
  {
    role: 'L6 Manager · Amazon',
    quote:
      'His program management skills kept 50+ stakeholders aligned without a single escalation. He translated ambiguous directives into concrete delivery milestones every time.',
  },
  {
    role: 'Engineering Lead · Amazon',
    quote:
      'Thomas transformed how we think about data products. His ability to bridge engineering and business is rare — he shipped in weeks what I thought would take quarters.',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      style={{ background: '#1d1d1f', paddingBlock: 'clamp(5rem,10vw,8rem)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top — centered grand quote */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 72px' }}
        >
          <p
            style={{
              fontSize: '0.78rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Kind words
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(2.8rem, 5.5vw, 5.5rem)',
              color: '#ffffff',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
            }}
          >
            &ldquo;Product instinct.{' '}
            <span style={{ color: '#5AC8FA' }}>Technical depth.</span>{' '}
            Delivery.&rdquo;
          </p>
        </motion.div>

        {/* Bottom — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLS.map(({ role, quote }, i) => {
            const parts = role.split(' · ');
            const jobTitle = parts[0];
            const company = parts[1] ?? '';

            return (
              <motion.div
                key={role}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: '20px',
                  padding: '36px 32px',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'border-color 0.2s ease, background 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                {/* Opening quote mark */}
                <div
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '4rem',
                    lineHeight: 1,
                    color: '#5AC8FA',
                    opacity: 0.6,
                    marginBottom: '8px',
                  }}
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    fontSize: '1rem',
                    lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.80)',
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  {quote}
                </p>

                {/* Attribution */}
                <div
                  style={{
                    marginTop: '24px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '16px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: '#ffffff',
                      marginBottom: '2px',
                    }}
                  >
                    {jobTitle}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      fontSize: '0.8rem',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {company}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.18)',
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
