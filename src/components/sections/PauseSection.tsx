'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';
import { motion } from 'framer-motion';

interface PauseSectionProps {
  metric: string;
  label: string;
  variant?: 'dark' | 'light';
}

/* ─── Parse metric string into countable parts ──────────── */
function parseMetric(raw: string): { prefix: string; target: number; suffix: string; decimals: number } {
  // "€16.3M+" → prefix="€", target=16.3, suffix="M+", decimals=1
  // "7,000+"  → prefix="",  target=7000,  suffix="+",  decimals=0
  const clean = raw.replace(/,/g, '');
  const match = clean.match(/^([€$£]?)([0-9.]+)([A-Za-z+%]*)$/);
  if (!match) return { prefix: '', target: 0, suffix: raw, decimals: 0 };
  const prefix = match[1] ?? '';
  const num = parseFloat(match[2]);
  const suffix = match[3] ?? '';
  const decimals = (match[2].split('.')[1] ?? '').length;
  return { prefix, target: num, suffix, decimals };
}

function formatDisplay(value: number, prefix: string, suffix: string, decimals: number): string {
  if (decimals > 0) return `${prefix}${value.toFixed(decimals)}${suffix}`;
  const rounded = Math.round(value);
  // Re-add thousands comma if original had it
  const formatted = rounded >= 1000 ? rounded.toLocaleString('en-US') : String(rounded);
  return `${prefix}${formatted}${suffix}`;
}

export function PauseSection({ metric, label, variant = 'dark' }: PauseSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const isDark = variant === 'dark';

  const { prefix, target, suffix, decimals } = parseMetric(metric);
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(formatDisplay(0, prefix, suffix, decimals));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const controls = animate(count, target, {
        duration: 1.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => setDisplay(formatDisplay(v, prefix, suffix, decimals)),
      });
      return controls.stop;
    }
  }, [inView, count, target, prefix, suffix, decimals]);

  return (
    <section
      style={{
        background: isDark ? '#060606' : '#f5f5f7',
        minHeight: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 6vw, 96px)',
        overflow: 'hidden',
      }}
    >
      <div ref={ref} style={{ textAlign: 'center' }}>
        {/* Count-up metric */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            color: isDark ? '#ffffff' : '#0a0a0a',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {display}
        </p>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginTop: '20px',
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            color: isDark ? 'rgba(245,245,247,0.42)' : 'rgba(0,0,0,0.42)',
            maxWidth: '440px',
            margin: '20px auto 0',
            lineHeight: 1.65,
          }}
        >
          {label}
        </motion.p>
      </div>
    </section>
  );
}
