'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, BarChart2, Zap } from 'lucide-react';

const COLS = [
  {
    Icon: Target,
    iconColor: '#FF9900',
    role: 'Director of IT · Auchan',
    quote:
      'Rare talent who goes from whiteboard strategy to a SQL query in the same afternoon. Thomas delivered clarity on a €250M portfolio nobody had managed to map before.',
  },
  {
    Icon: BarChart2,
    iconColor: '#5AC8FA',
    role: 'L6 Manager · Amazon',
    quote:
      'His program management skills kept 50+ stakeholders aligned without a single escalation. He translated ambiguous directives into concrete delivery milestones every time.',
  },
  {
    Icon: Zap,
    iconColor: '#34D399',
    role: 'Engineering Lead · Amazon',
    quote:
      'Thomas transformed how we think about data products. His ability to bridge engineering and business is rare — he shipped in weeks what I thought would take quarters.',
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="testimonials"
      style={{ background: '#1d1d1f', paddingBlock: 'clamp(5rem,10vw,8rem)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Top — centered grand quote */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 72px' }}
        >
          <p
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Testimonials
          </p>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              color: '#ffffff',
              lineHeight: 1.3,
            }}
          >
            &ldquo;Thomas combines{' '}
            <span style={{ color: '#5AC8FA' }}>product instinct</span>,{' '}
            <span style={{ color: '#FF9900' }}>technical depth</span>, and{' '}
            <span style={{ color: '#34D399' }}>delivery discipline</span>{' '}
            in a way that&apos;s genuinely rare.&rdquo;
          </p>
        </motion.div>

        {/* Bottom — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLS.map(({ Icon, iconColor, role, quote }, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '18px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <Icon size={24} color={iconColor} strokeWidth={1.8} />
              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '0.93rem',
                  lineHeight: 1.65,
                  fontStyle: 'italic',
                  flex: 1,
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.06em',
                }}
              >
                {role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            textAlign: 'center',
            color: 'rgba(255,255,255,0.18)',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            marginTop: '48px',
          }}
        >
          * Illustrative — real quotes coming soon
        </p>
      </div>
    </section>
  );
}
