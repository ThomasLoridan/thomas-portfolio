'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function ProofQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-10%' });

  return (
    <section
      style={{
        background: '#1d1d1f',
        padding: 'clamp(48px, 7vw, 72px) clamp(24px, 6vw, 96px)',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        {/* Left border — draws from top */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '3px',
            background: '#5AC8FA',
            transformOrigin: 'top',
          }}
        />
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ paddingLeft: '28px' }}
        >
          <p
            style={{
              fontStyle: 'italic',
              fontSize: '19px',
              color: '#86868b',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            &ldquo;SONAR replaced 8 hours of weekly manual work with a 5-minute automated process.
            That&apos;s not a feature. That&apos;s a system.&rdquo;
          </p>
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: 'block',
              marginTop: '16px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: '#6e6e73',
              fontStyle: 'normal',
            }}
          >
            — SONAR · Amazon EU Transportation · 2024
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
