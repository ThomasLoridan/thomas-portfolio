'use client';

import { useEffect, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRef } from 'react';

interface PauseSectionProps {
  metric: string;
  label: string;
  variant?: 'dark' | 'light';
}

/* ─── Parse metric string into countable parts ──────────── */
function parseMetric(metric: string): {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  formatFn: (v: number) => string;
} {
  // "€16.3M+" → prefix="€", target=16.3, suffix="M+", decimals=1
  // "7,000+"  → prefix="",  target=7000,  suffix="+",  decimals=0
  const prefixMatch = metric.match(/^([^0-9]*)/);
  const prefix = prefixMatch ? prefixMatch[1] : '';
  const rest = metric.slice(prefix.length);
  const numMatch = rest.match(/^([0-9][0-9,.]*)/);
  if (!numMatch) {
    return { prefix: '', target: 0, suffix: metric, decimals: 0, formatFn: (v) => String(Math.round(v)) };
  }
  const rawNum = numMatch[1].replace(/,/g, '');
  const target = parseFloat(rawNum);
  const suffix = rest.slice(numMatch[1].length);
  const decimalPart = rawNum.includes('.') ? rawNum.split('.')[1] : '';
  const decimals = decimalPart.length;

  const formatFn = (v: number): string => {
    if (decimals > 0) return v.toFixed(decimals);
    return Math.round(v).toLocaleString('en-US').replace(/,/g, ',');
  };

  return { prefix, target, suffix, decimals, formatFn };
}

export function PauseSection({ metric, label, variant = 'dark' }: PauseSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const isDark = variant === 'dark';

  const { prefix, target, suffix, formatFn } = parseMetric(metric);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      onUpdate: (v) => setDisplay(`${prefix}${formatFn(v)}${suffix}`),
    });
    return controls.stop;
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

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
          animate={isInView ? { opacity: 1 } : {}}
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
