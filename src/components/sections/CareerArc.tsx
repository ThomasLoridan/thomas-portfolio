'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

export function CareerArc() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* Single scroll progress drives all child animations */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['0 1', '0.3 0.65'] as any,
  });

  /* Eyebrow */
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const eyebrowY = useTransform(scrollYProgress, [0, 0.4], [16, 0]);

  /* Staggered pairs */
  const p0Opacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const p0Y = useTransform(scrollYProgress, [0.1, 0.6], [20, 0]);
  const arr0Scale = useTransform(scrollYProgress, [0.2, 0.55], [0, 1]);

  const p1Opacity = useTransform(scrollYProgress, [0.25, 0.75], [0, 1]);
  const p1Y = useTransform(scrollYProgress, [0.25, 0.75], [20, 0]);
  const arr1Scale = useTransform(scrollYProgress, [0.35, 0.70], [0, 1]);

  const p2Opacity = useTransform(scrollYProgress, [0.4, 0.9], [0, 1]);
  const p2Y = useTransform(scrollYProgress, [0.4, 0.9], [20, 0]);
  const arr2Scale = useTransform(scrollYProgress, [0.50, 0.85], [0, 1]);

  const pairMotion = [
    { opacity: p0Opacity, y: p0Y, arrowScale: arr0Scale },
    { opacity: p1Opacity, y: p1Y, arrowScale: arr1Scale },
    { opacity: p2Opacity, y: p2Y, arrowScale: arr2Scale },
  ];

  return (
    <section
      style={{
        background: '#000000',
        paddingBlock: 'clamp(56px, 8vw, 80px)',
        overflow: 'hidden',
      }}
    >
      <div
        ref={containerRef}
        style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}
      >
        {/* Eyebrow */}
        <motion.p
          style={{
            opacity: eyebrowOpacity,
            y: eyebrowY,
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.06)',
          }}
          className="grid-cols-1 sm:grid-cols-3"
        >
          {PAIRS.map((pair, i) => {
            const { opacity, y, arrowScale } = pairMotion[i];
            return (
              <motion.div
                key={pair.label}
                style={{
                  opacity,
                  y,
                  background: '#000000',
                  padding: 'clamp(24px, 3.5vw, 44px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '8px',
                }}
              >
                {/* From value */}
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
                  style={{
                    scale: arrowScale,
                    fontSize: '1.1rem',
                    color: '#5AC8FA',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  →
                </motion.span>

                {/* To value */}
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

                {/* Label */}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
