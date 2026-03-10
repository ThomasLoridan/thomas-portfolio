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
  { from: '3 markets', to: '26 countries', label: 'SCOPE' },
  { from: '€100M analyzed', to: '€30M owned', label: 'OWNERSHIP' },
  { from: 'Consultant', to: 'Builder', label: 'POSTURE' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cellVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function CareerArc() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        background: '#080808',
        paddingBlock: 'clamp(56px, 8vw, 80px)',
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
            fontSize: '0.65rem',
            fontWeight: 500,
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '36px',
            textAlign: 'center',
          }}
        >
          CAREER ARC · 2022 → 2025
        </motion.p>

        {/* Three before→after pairs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
          }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {PAIRS.map((pair) => (
            <motion.div
              key={pair.label}
              variants={cellVariants}
              style={{
                background: '#080808',
                padding: 'clamp(24px, 3.5vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '8px',
              }}
            >
              {/* From value — muted */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.30)',
                  letterSpacing: '0.05em',
                  lineHeight: 1.3,
                }}
              >
                {pair.from}
              </span>

              {/* Arrow */}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                  fontSize: '1.1rem',
                  color: '#5AC8FA',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                →
              </motion.span>

              {/* To value — large, bold */}
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  color: '#ffffff',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                }}
              >
                {pair.to}
              </span>

              {/* Label — small caps */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.22)',
                  marginTop: '4px',
                }}
              >
                {pair.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
