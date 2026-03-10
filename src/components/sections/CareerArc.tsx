'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Stop {
  year: string;
  company: string;
  role: string;
  accent: string;
}

const STOPS: Stop[] = [
  {
    year: '2021',
    company: 'Familyad',
    role: 'Co-Founder · CEO & CFO',
    accent: '#6366f1',
  },
  {
    year: '2022',
    company: "L'Oréal",
    role: 'Technical PM → Delivery → BA · EMEA & Global',
    accent: '#C8A951',
  },
  {
    year: '2023',
    company: 'Auchan Retail',
    role: 'Strategy Consultant · DSI',
    accent: '#E2001A',
  },
  {
    year: '2024',
    company: 'Amazon',
    role: 'TPM · Reliability → Transportation EMEA → Tech & Innovation',
    accent: '#FF9900',
  },
];

export function CareerArc() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      style={{
        background: '#ffffff',
        paddingBlock: 'clamp(48px, 8vw, 80px)',
        borderTop: '1px solid #e5e7eb',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
        {/* Eyebrow */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 500,
            color: '#9ca3af',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          Career arc
        </motion.p>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '28px',
              left: '0',
              right: '0',
              height: '1px',
              background: 'linear-gradient(to right, #e5e7eb, #e5e7eb)',
              zIndex: 0,
            }}
          />

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {STOPS.map((stop, i) => (
              <motion.div
                key={stop.company}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {/* Year + dot */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: stop.accent,
                      flexShrink: 0,
                      boxShadow: `0 0 0 3px ${stop.accent}22`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 500,
                      color: '#9ca3af',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {stop.year}
                  </span>
                </div>

                {/* Company name */}
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                    color: '#0a0a0a',
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {stop.company}
                </p>

                {/* Role */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: '#6b7280',
                    lineHeight: 1.55,
                  }}
                >
                  {stop.role}
                </p>

                {/* Accent bar */}
                <div
                  style={{
                    height: '2px',
                    width: '32px',
                    borderRadius: '2px',
                    background: stop.accent,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
