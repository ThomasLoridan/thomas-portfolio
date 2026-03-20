'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

interface ArcPair {
  from: string;
  to: string;
  label: string;
}

const PAIRS: ArcPair[] = [
  { from: '3 markets',      to: '26 countries', label: 'SCOPE'     },
  { from: '€100M analyzed', to: '€30M owned',   label: 'OWNERSHIP' },
  { from: 'Consultant',     to: 'Builder',       label: 'POSTURE'   },
];

export function CareerArc() {
  const sectionRef = useRef<HTMLElement>(null);
  const cellRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3 cells — stagger 100ms, reverse on scroll up
      const cells = cellRefs.current.filter(Boolean);
      gsap.fromTo(cells,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 74%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="career"
      style={{
        background: '#000000',
        paddingBlock: 'clamp(56px, 8vw, 80px)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>

        {/* 3-column grid, 1px separator lines */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px',
            background: 'rgba(255,255,255,0.07)',
          }}
        >
          {PAIRS.map((pair, i) => (
            <div
              key={pair.label}
              ref={el => { cellRefs.current[i] = el; }}
              style={{
                opacity: 0,
                background: '#000000',
                padding: 'clamp(24px, 3.5vw, 44px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              {/* Overline label */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#5AC8FA',
                }}
              >
                {pair.label}
              </span>

              {/* From — muted */}
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
              <span style={{ fontSize: '1.1rem', color: '#5AC8FA', lineHeight: 1 }}>
                →
              </span>

              {/* To — white, large */}
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
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
