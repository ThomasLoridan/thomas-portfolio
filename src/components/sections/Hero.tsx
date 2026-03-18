'use client';

/**
 * Hero — standalone version (mirrors HeroAbout hero section).
 * Not currently mounted in page.tsx (HeroAbout is used instead).
 * Kept in sync for potential future split.
 */

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/profile';

const WORDS = ['Builder.', 'Strategist.', 'Executor.'];

const WORD_DELAY   = 0.3;
const WORD_STAGGER = 0.12;
const WORD_DUR     = 0.75;
const LAST_WORD_END = WORD_DELAY + (WORDS.length - 1) * WORD_STAGGER + WORD_DUR;

export function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const lineRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: WORD_DELAY }
      );

      const lines = lineRefs.current.filter(Boolean);
      gsap.fromTo(lines,
        { yPercent: 110 },
        { yPercent: 0, duration: WORD_DUR, ease: 'power4.out', stagger: WORD_STAGGER, delay: WORD_DELAY }
      );

      gsap.fromTo(subRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: LAST_WORD_END + 0.3 }
      );

      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: LAST_WORD_END + 0.7 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleShimmer = () => {
    if (!shimmerRef.current) return;
    gsap.fromTo(shimmerRef.current,
      { x: '-120%' },
      { x: '120%', duration: 0.55, ease: 'power2.inOut' }
    );
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', background: '#080808' }}
    >
      {/* Stage light */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background:
          'radial-gradient(ellipse 70% 55% at 65% -5%, rgba(255,255,255,0.055) 0%, transparent 70%),' +
          'radial-gradient(ellipse 50% 40% at 30% 100%, rgba(90,200,250,0.06) 0%, transparent 60%)',
      }} />

      {/* Photo */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-15%)',
        height: '94vh', width: 'clamp(300px, 48vw, 760px)', zIndex: 1,
        maskImage:
          'linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 25%, transparent 55%),' +
          'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.55) 45%, transparent 85%)',
        WebkitMaskImage:
          'linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 25%, transparent 55%),' +
          'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.55) 45%, transparent 85%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'destination-in',
      }}>
        <Image
          src={profile.photo}
          alt={`${profile.name} — Technical Program Manager`}
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 48vw, 760px"
        />
      </div>

      {/* Text block */}
      <div style={{
        position: 'absolute',
        bottom: 'clamp(40px, 7vh, 80px)',
        left: 'clamp(32px, 6vw, 96px)',
        zIndex: 2,
        maxWidth: 'clamp(340px, 42vw, 600px)',
      }}>
        <p ref={eyebrowRef} style={{
          opacity: 0, color: 'rgba(255,255,255,0.38)', fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', marginBottom: '18px',
        }}>
          Thomas Loridan
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)', fontWeight: 800, lineHeight: 1.0,
          letterSpacing: '-0.02em', fontSize: 'clamp(3.8rem, 7.5vw, 8rem)', marginBottom: '28px',
        }}>
          {WORDS.map((word, i) => (
            <span key={word} style={{ display: 'block', overflow: 'hidden', lineHeight: 1.06 }}>
              <span ref={el => { lineRefs.current[i] = el; }} style={{ display: 'block', color: '#ffffff' }}>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p ref={subRef} style={{
          opacity: 0, color: 'rgba(255,255,255,0.52)', fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
          fontFamily: 'var(--font-body)', lineHeight: 1.65, marginBottom: '36px', maxWidth: '400px',
        }}>
          TPM at Amazon EU Transportation — €16M+ delivered, 26 countries, systems that stay.
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <button
            onClick={() => scrollTo('projects')}
            onMouseEnter={handleShimmer}
            style={{
              position: 'relative', overflow: 'hidden', padding: '14px 36px',
              borderRadius: '980px', background: '#ffffff', color: '#080808',
              fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)',
              letterSpacing: '0.01em', border: 'none', cursor: 'pointer',
            }}
          >
            <span ref={shimmerRef} aria-hidden="true" style={{
              position: 'absolute', top: 0, left: 0, width: '55%', height: '100%',
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)',
              transform: 'translateX(-120%)', pointerEvents: 'none',
            }} />
            View my work ↓
          </button>
        </div>
      </div>
    </section>
  );
}
