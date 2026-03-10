'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function ProofQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section
      style={{
        background: '#ffffff',
        padding: 'clamp(48px, 7vw, 72px) clamp(24px, 6vw, 96px)',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: '700px',
          margin: '0 auto',
          borderLeft: '3px solid #0075eb',
          paddingLeft: '28px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
            color: '#1f2937',
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          &ldquo;SONAR replaced 8 hours of weekly manual work with a 5-minute automated process.
          That&apos;s not a feature. That&apos;s a system.&rdquo;
        </p>
        <span
          style={{
            display: 'block',
            marginTop: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9ca3af',
            fontStyle: 'normal',
          }}
        >
          — SONAR · Amazon EU Transportation · 2024
        </span>
      </motion.div>
    </section>
  );
}
