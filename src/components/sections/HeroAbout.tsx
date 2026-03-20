'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { profile } from '@/data/profile';

const WORDS = ['Builder.', 'Strategist.', 'Executor.'];
const ABOUT_WORDS = ['Systems thinker.', 'Human first.'];

// Word reveal timing constants
const WORD_DELAY   = 0.3;
const WORD_STAGGER = 0.12;
const WORD_DUR     = 0.75;
const LAST_WORD_END = WORD_DELAY + (WORDS.length - 1) * WORD_STAGGER + WORD_DUR;

export function HeroAbout() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // ── Hero GSAP refs ──────────────────────────────────────────
  const heroRef    = useRef<HTMLElement>(null);
  const lineRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word clip reveal
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

      // Sub-headline
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: LAST_WORD_END + 0.3 }
      );

      // CTA
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

  // ── About section refs ──────────────────────────────────────
  const aboutSectionRef = useRef<HTMLElement>(null);
  const h2WordRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const blockRefs       = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = aboutSectionRef.current;

      // H2 word-by-word clip reveal on scroll
      const words = h2WordRefs.current.filter(Boolean);
      gsap.fromTo(words,
        { yPercent: 110 },
        { yPercent: 0, duration: 0.8, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: { trigger, start: 'top 75%', toggleActions: 'play none none reverse' } }
      );

      // 3 content blocks — staggered
      const blocks = blockRefs.current.filter(Boolean);
      gsap.fromTo(blocks,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger, start: 'top 62%', toggleActions: 'play none none reverse' } }
      );

      // Exit animations — fade blocks out as they leave the top
      blocks.forEach((block) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'bottom 18%',
          toggleActions: 'play none none reverse',
          onEnter: () => gsap.to(block, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in', overwrite: 'auto' }),
          onLeaveBack: () => gsap.to(block, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', overwrite: 'auto' }),
        });
      });
    }, aboutSectionRef);

    return () => ctx.revert();
  }, []);

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
        {/* Stage light — subtle radial glow */}
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

        {/* Profile photo — fully visible, no mask */}
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
          {/* H1 — Inter bold, word-by-word clip reveal */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: 'var(--font-inter)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontSize: 'clamp(3.8rem, 7.5vw, 8rem)',
              marginBottom: '28px',
            }}
          >
            {WORDS.map((word, i) => (
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
              fontFamily: 'var(--font-inter)',
              lineHeight: 1.65,
              marginBottom: '36px',
              maxWidth: '400px',
            }}
          >
            TPM at Amazon EU Transportation — €16M+ delivered, 26 countries, systems that stay.
          </p>

          {/* CTA */}
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
                fontFamily: 'var(--font-inter)',
                letterSpacing: '0.01em',
                border: 'none',
                cursor: 'pointer',
              }}
            >
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
          ABOUT — 3-block enabling voice
      ══════════════════════════════════════════════════════ */}
      <section
        ref={aboutSectionRef}
        id="about"
        style={{ background: '#1d1d1f', paddingTop: 'clamp(48px, 7vw, 80px)', paddingBottom: 'clamp(64px, 9vw, 96px)' }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(24px, 5vw, 48px)' }}>

          {/* H2 — Inter bold, two-phrase clip reveal on scroll */}
          <h2
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2.25rem, 4vw, 3.75rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              marginBottom: '32px',
            }}
          >
            {ABOUT_WORDS.map((word, i) => (
              <span
                key={word}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom',
                  marginRight: i < ABOUT_WORDS.length - 1 ? '0.28em' : 0,
                  lineHeight: 1.15,
                }}
              >
                <span
                  ref={el => { h2WordRefs.current[i] = el; }}
                  style={{ display: 'inline-block', color: '#f5f5f7' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          {/* Block 1 */}
          <p
            ref={el => { blockRefs.current[0] = el; }}
            style={{
              opacity: 0,
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
            ref={el => { blockRefs.current[1] = el; }}
            style={{
              opacity: 0,
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
            ref={el => { blockRefs.current[2] = el; }}
            style={{
              opacity: 0,
              fontSize: '13px',
              color: '#6e6e73',
              lineHeight: 1.5,
            }}
          >
            MSc École Centrale Lille&nbsp;·&nbsp;Co-founder Familyad (Station F finalist)&nbsp;·&nbsp;Open to relocation.
          </p>
        </div>
      </section>
    </>
  );
}
