'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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
      "Thomas consistently maintains high standards in his work by ensuring his solutions meet quality benchmarks and iterating on his outputs until they achieve the desired level of excellence. His curiosity-driven approach has resulted in improved automation processes and more effective business intelligence tools that benefit both the team's efficiency and our ability to serve customers better.",
  },
  {
    role: 'Digital Manager',
    company: "L'Oréal",
    quote:
      'Thomas has been a key element in my team. He is a fast learner and very volunteer for new challenges. Definitely a great added value to lead projects.',
  },
];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      style={{ background: '#161617', paddingBlock: 'clamp(5rem,10vw,8rem)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
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
              color: '#6e6e73',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Kind words
          </p>
          <p
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(3rem, 6vw, 6rem)',
              color: '#f5f5f7',
              lineHeight: 1.0,
              letterSpacing: '-0.002em',
              marginBottom: '20px',
            }}
          >
            &ldquo;Product instinct.{' '}
            <span style={{ color: '#2997ff' }}>Technical depth.</span>{' '}
            Delivery.&rdquo;
          </p>
          <p
            style={{
              color: '#86868b',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            From the people I&apos;ve delivered with.
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
                    color: '#f5f5f7',
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
                    color: '#86868b',
                    background: 'rgba(245,245,247,0.06)',
                    border: '1px solid rgba(245,245,247,0.12)',
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
                    color: '#f5f5f7',
                    fontStyle: 'italic',
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
