'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { profile } from '@/data/profile';

const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Main component ────────────────────────────────────── */
export function HeroAbout() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-10%' });

  return (
    <>
      {/* ─── Responsive overrides ──────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-section { display: flex !important; flex-direction: column !important; min-height: 100svh !important; }
          .hero-photo-wrap { position: relative !important; left: 0 !important; transform: none !important; width: 100% !important; height: 65vh !important; bottom: auto !important; }
          .hero-text-wrap { position: relative !important; bottom: auto !important; left: auto !important; padding: 24px !important; max-width: 100% !important; }
          .hero-h1 { font-size: clamp(2rem, 8vw, 3rem) !important; }
          .hero-h1-sub { font-size: clamp(1.1rem, 4vw, 1.5rem) !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════
          DARK HERO — sculptural background
      ══════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="hero-section"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'hidden',
          background: '#000000',
        }}
      >
        {/* Sculptural background layers */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 30% 70%, rgba(90,200,250,0.07) 0%, transparent 50%), ' +
              'radial-gradient(ellipse at 70% 20%, rgba(90,100,255,0.10) 0%, transparent 50%), ' +
              'radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {/* Noise grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.6,
          }}
        />

        {/* Photo */}
        <motion.div
          className="hero-photo-wrap"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE_EXPO }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-40%)',
            height: '95vh',
            width: 'clamp(280px, 40vw, 540px)',
            WebkitMaskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 60%, transparent 100%)',
            zIndex: 1,
          }}
        >
          <Image
            src={profile.photo}
            alt={`${profile.name} — Technical Program Manager`}
            fill
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 540px"
          />
        </motion.div>

        {/* Text block — bottom-left */}
        <div
          className="hero-text-wrap"
          style={{
            position: 'absolute',
            bottom: 'clamp(48px, 8vh, 80px)',
            left: 'clamp(32px, 6vw, 96px)',
            zIndex: 2,
            maxWidth: 'clamp(440px, 44vw, 640px)',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE_EXPO }}
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: '14px',
            }}
          >
            Thomas Loridan
          </motion.p>

          {/* H1 Line 1 — large, bold */}
          <motion.h1
            className="hero-h1"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_EXPO }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
              color: '#ffffff',
              marginBottom: '10px',
            }}
          >
            TPM. Builder.
            <br />
            Automation Lead.
          </motion.h1>

          {/* H1 Line 2 — metrics sub-heading, lighter */}
          <motion.p
            className="hero-h1-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE_EXPO }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: 'clamp(1.1rem, 2vw, 1.8rem)',
              color: 'rgba(245,245,247,0.55)',
              lineHeight: 1.2,
              letterSpacing: '-0.015em',
              marginBottom: '18px',
            }}
          >
            €16M+ delivered. 26 countries. Systems that stay.
          </motion.p>

          {/* Sub-headline — mono, muted */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              color: 'rgba(245,245,247,0.38)',
              fontSize: 'clamp(0.75rem, 0.85vw, 0.82rem)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 400,
              letterSpacing: '0.05em',
              marginBottom: '28px',
            }}
          >
            Amazon EU Transportation&nbsp;·&nbsp;Python&nbsp;·&nbsp;AWS&nbsp;·&nbsp;€30M portfolio
          </motion.p>

          {/* Single primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <button
              onClick={() => scrollTo('projects')}
              style={{
                padding: '11px 28px',
                borderRadius: '980px',
                background: '#f5f5f7',
                color: '#0a0a0a',
                fontSize: '0.88rem',
                fontWeight: 600,
                fontFamily: 'var(--font-body)',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = '0.85')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.opacity = '1')
              }
            >
              See my work ↓
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GRADIENT TRANSITION BAND
      ══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          height: '60px',
          background: 'linear-gradient(to bottom, #000000 0%, #1d1d1f 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════
          WHITE ABOUT — 3-block enabling voice
      ══════════════════════════════════════════════════ */}
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

            {/* Block 1 — identity, bold */}
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

            {/* Block 2 — enabling voice */}
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

            {/* Block 3 — credential anchor, small, muted */}
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
