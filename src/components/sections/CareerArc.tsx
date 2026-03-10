'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface ArcPair {
  from: string;
  to: string;
  label: string;
}

const PAIRS: ArcPair[] = [
  { from: '3 markets', to: '26 countries', label: 'Scope' },
  { from: '€100M analyzed', to: '€30M managed', label: 'Ownership' },
  { from: 'Consultant', to: 'Builder', label: 'Posture' },
];

export function CareerArc() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      style={{
        background: '#080808',
        paddingBlock: 'clamp(48px, 8vw, 80px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
        {/* Eyebrow */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.28)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          Career arc
        </motion.p>

        {/* Three pairs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {PAIRS.map((pair, i) => (
            <motion.div
              key={pair.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              style={{
                background: '#080808',
                padding: 'clamp(24px, 3vw, 40px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* From value — muted */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'rgba(255,255,255,0.32)',
                  letterSpacing: '0.06em',
                  lineHeight: 1.3,
                }}
              >
                {pair.from}
              </span>

              {/* Arrow */}
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  color: '#5AC8FA',
                  lineHeight: 1,
                }}
              >
                →
              </span>

              {/* To value — large, white, bold */}
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  color: '#ffffff',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                {pair.to}
              </span>

              {/* Label — small caps, muted */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.28)',
                  marginTop: '4px',
                }}
              >
                {pair.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
