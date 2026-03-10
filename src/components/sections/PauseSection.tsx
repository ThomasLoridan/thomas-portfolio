'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface PauseSectionProps {
  stat: string;
  label: string;
  variant?: 'dark' | 'light';
}

export function PauseSection({ stat, label, variant = 'dark' }: PauseSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });

  const isDark = variant === 'dark';

  return (
    <section
      style={{
        background: isDark ? '#080808' : '#f5f5f7',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 6vw, 96px)',
        overflow: 'hidden',
      }}
    >
      <div ref={ref} style={{ textAlign: 'center' }}>
        {/* Metric number */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            color: isDark ? '#ffffff' : '#0a0a0a',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          {stat}
        </motion.p>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '16px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: isDark ? 'rgba(245,245,247,0.45)' : 'rgba(0,0,0,0.45)',
            maxWidth: '420px',
            margin: '16px auto 0',
            lineHeight: 1.6,
          }}
        >
          {label}
        </motion.p>
      </div>
    </section>
  );
}
