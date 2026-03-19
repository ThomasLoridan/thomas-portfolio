'use client';

/**
 * ImpactPause — Apple contemplative section.
 *
 * Design rules (from CLAUDE.md Law 3):
 *  - Centered layout only — this IS a contemplative moment
 *  - Opacity-only animation on label (no Y translate)
 *  - Count-up via GSAP counter object
 *  - Resets on scroll-back so count-up replays on re-entry
 */

import { useRef, useState, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

const METRIC  = { prefix: '€', value: 16.3, suffix: 'M+', decimals: 1 };
const LABEL   = 'Total ARR impact across Amazon systems.';

export function ImpactPause() {
  const sectionRef = useRef<HTMLElement>(null);
  const metricRef  = useRef<HTMLParagraphElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState(`${METRIC.prefix}0${METRIC.suffix}`);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      // Metric count-up — triggers at 65% viewport, resets on scroll-back
      gsap.to(counter, {
        value: METRIC.value,
        duration: 2,
        ease: 'power4.out',
        onUpdate() {
          setDisplay(
            `${METRIC.prefix}${counter.value.toFixed(METRIC.decimals)}${METRIC.suffix}`
          );
        },
        onReverseComplete() {
          setDisplay(`${METRIC.prefix}0${METRIC.suffix}`);
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      // Metric number fades in (opacity only — contemplative, no Y)
      gsap.fromTo(metricRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Label: opacity only, 400ms after count starts
      gsap.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
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
      style={{
        background: '#080808',
        minHeight: '42vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(64px, 10vw, 96px) clamp(24px, 6vw, 96px)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <div>
        {/* Count-up metric */}
        <p
          ref={metricRef}
          style={{
            opacity: 0,
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(4.5rem, 13vw, 10rem)',
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          {display}
        </p>

        {/* Label — opacity only, no translate */}
        <p
          ref={labelRef}
          style={{
            opacity: 0,
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            color: 'rgba(245,245,247,0.42)',
            maxWidth: '360px',
            margin: '24px auto 0',
            lineHeight: 1.65,
          }}
        >
          {LABEL}
        </p>
      </div>
    </section>
  );
}
