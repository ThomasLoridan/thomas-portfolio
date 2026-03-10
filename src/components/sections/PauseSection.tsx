'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface PauseSectionProps {
  stat: string;
  label: string;
  statement: string;
  /** 'dark' = near-black bg, 'light' = off-white bg */
  variant?: 'dark' | 'light';
}

export function PauseSection({
  stat,
  label,
  statement,
  variant = 'dark',
}: PauseSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });

  const isDark = variant === 'dark';

  return (
    <section
      style={{
        background: isDark ? '#080808' : '#f5f5f7',
        padding: 'clamp(72px, 12vw, 120px) clamp(24px, 6vw, 96px)',
        overflow: 'hidden',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          alignItems: 'flex-start',
        }}
      >
        {/* Big KPI */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: isDark ? '#5AC8FA' : '#0075eb',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {stat}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isDark ? 'rgba(245,245,247,0.35)' : 'rgba(0,0,0,0.38)',
              marginBottom: '4px',
              alignSelf: 'flex-end',
            }}
          >
            {label}
          </span>
        </div>

        {/* Statement */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
            color: isDark ? '#f5f5f7' : '#0a0a0a',
            lineHeight: 1.25,
            letterSpacing: '-0.015em',
            maxWidth: '680px',
          }}
        >
          {statement}
        </p>
      </motion.div>
    </section>
  );
}
