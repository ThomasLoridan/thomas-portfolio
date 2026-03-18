'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { profile } from '@/data/profile';

const WORDS = ['Builder.', 'Strategist.', 'Executor.'];

// Word reveal timing constants
const WORD_DELAY   = 0.3;   // first word starts at 0.3s
const WORD_STAGGER = 0.12;  // 120ms between each word
const WORD_DUR     = 0.75;  // each word animates for 750ms
// last word settles at: WORD_DELAY + (n-1)*STAGGER + WORD_DUR
const LAST_WORD_END = WORD_DELAY + (WORDS.length - 1) * WORD_STAGGER + WORD_DUR;

export function HeroAbout() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // ── Hero GSAP refs ──────────────────────────────────────────
  const heroRef     = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const lineRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const shimmerRef  = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow fades in with first word
      gsap.fromTo(eyebrowRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: WORD_DELAY }
      );

      // Word-by-word clip reveal (each word slides up from overflow:hidden container)
      const lines = lineRefs.current.filter(Boolean);
      gsap.fromTo(lines,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: WORD_DUR,
          ease: 'power4.out',
          stagger: WORD_STAGGER,
          delay: WORD_DELAY,
        }
      );

      // Sub-headline: 300ms after last word settles
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: LAST_WORD_END + 0.3 }
      );

      // CTA: 400ms after sub-headline starts
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

  // ── About section ref ───────────────────────────────────────
  const aboutRef   = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-10%' });

  return (
    <>
      {/* ── Responsive overrides ─────────────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-section { display: flex !important; flex-direction: column !important; min-height: 100svh !important; }
          .hero-photo-wrap { position: relative !important; left: 0 !important; transform: none !important; width: 100% !important; height: 58vh !important; bottom: auto !important; }
          .hero-text-wrap { position: relative !important; bottom: auto !important; left: auto !important; padding: 28px 24px !important; max-width: 100% !important; }
          .hero-h1 { font-size: clamp(3rem, 11vw, 5rem) !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — cinematic dark stage
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="hero"
        className="hero-section"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'hidden',
          background: '#080808',
        }}
      >
        {/* Stage light — subtle top-right radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 70% 55% at 65% -5%, rgba(255,255,255,0.055) 0%, transparent 70%),' +
              'radial-gradient(ellipse 50% 40% at 30% 100%, rgba(90,200,250,0.06) 0%, transparent 60%)',
            zIndex: 0,
          }}
        />

        {/* Profile photo — dominant, center-right, bottom-anchored */}
        <div
          className="hero-photo-wrap"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-15%)',
            height: '94vh',
            width: 'clamp(300px, 48vw, 760px)',
            zIndex: 1,
            // Bottom fade + left-edge feather for dark stage treatment
            maskImage:
              'linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 25%, transparent 55%),' +
              'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.55) 45%, transparent 85%)',
            WebkitMaskImage:
              'linear-gradient(to right, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 25%, transparent 55%),' +
              'linear-gradient(to top, #080808 0%, rgba(8,8,8,0.55) 45%, transparent 85%)',
            maskComposite: 'intersect',
            WebkitMaskComposite: 'destination-in',
          }}
        >
          <Image
            src={profile.photo}
            alt={`${profile.name} — Technical Program Manager`}
            fill
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 48vw, 760px"
          />
        </div>

        {/* Text block — bottom-left, above photo */}
        <div
          className="hero-text-wrap"
          style={{
            position: 'absolute',
            bottom: 'clamp(40px, 7vh, 80px)',
            left: 'clamp(32px, 6vw, 96px)',
            zIndex: 2,
            maxWidth: 'clamp(340px, 42vw, 600px)',
          }}
        >
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            style={{
              opacity: 0,
              color: 'rgba(255,255,255,0.38)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '18px',
            }}
          >
            Thomas Loridan
          </p>

          {/* H1 — serif, word-by-word clip reveal */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(3.8rem, 7.5vw, 8rem)',
              marginBottom: '28px',
            }}
          >
            {WORDS.map((word, i) => (
              /* Clip container — overflow hidden hides the word until it rises */
              <span
                key={word}
                style={{ display: 'block', overflow: 'hidden', lineHeight: 1.06 }}
              >
                <span
                  ref={el => { lineRefs.current[i] = el; }}
                  style={{ display: 'block', color: '#ffffff' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Sub-headline */}
          <p
            ref={subRef}
            style={{
              opacity: 0,
              color: 'rgba(255,255,255,0.52)',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.65,
              marginBottom: '36px',
              maxWidth: '400px',
            }}
          >
            TPM at Amazon EU Transportation — €16M+ delivered, 26 countries, systems that stay.
          </p>

          {/* CTA — white pill, black text, GSAP shimmer on hover */}
          <div ref={ctaRef} style={{ opacity: 0 }}>
            <button
              onClick={() => scrollTo('projects')}
              onMouseEnter={handleShimmer}
              style={{
                position: 'relative',
                overflow: 'hidden',
                padding: '14px 36px',
                borderRadius: '980px',
                background: '#ffffff',
                color: '#080808',
                fontSize: '0.9rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                letterSpacing: '0.01em',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {/* Shimmer layer — slides right on hover */}
              <span
                ref={shimmerRef}
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '55%',
                  height: '100%',
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.65) 50%, transparent 100%)',
                  transform: 'translateX(-120%)',
                  pointerEvents: 'none',
                }}
              />
              View my work ↓
            </button>
          </div>
        </div>
      </section>

      {/* ── Gradient transition band ────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          height: '60px',
          background: 'linear-gradient(to bottom, #080808 0%, #1d1d1f 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════════
          ABOUT — 3-block enabling voice (unchanged)
      ══════════════════════════════════════════════════════ */}
      <section id="about" style={{ background: '#1d1d1f', paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(64px, 9vw, 96px)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 28 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#6e6e73',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '24px',
              }}
            >
              About
            </p>

            {/* H2 */}
            <h2
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.002em',
                lineHeight: 1.08,
                color: '#f5f5f7',
                marginBottom: '28px',
              }}
            >
              Builder. Strategist. Executor.
            </h2>

            {/* Block 1 */}
            <p
              style={{
                fontWeight: 600,
                fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                color: '#f5f5f7',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                marginBottom: '20px',
              }}
            >
              Automation-first. Data-native. Delivery-obsessed.
            </p>

            {/* Block 2 */}
            <p
              style={{
                fontSize: '17px',
                color: '#86868b',
                lineHeight: 1.7,
                marginBottom: '20px',
              }}
            >
              If you need someone who ships Python systems with €13M+ ARR impact, aligns 50+ stakeholders
              across 26 countries, and doesn&apos;t stop at the spec — this is what you get.
            </p>

            {/* Block 3 */}
            <p
              style={{
                fontSize: '13px',
                color: '#6e6e73',
                lineHeight: 1.5,
              }}
            >
              MSc École Centrale Lille&nbsp;·&nbsp;Co-founder Familyad (Station F finalist)&nbsp;·&nbsp;Open to relocation.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
