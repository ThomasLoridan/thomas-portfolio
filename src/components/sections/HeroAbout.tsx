'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── H1 nominal fragment data ─────────────────────────── */
const H1_LINES: { text: string; color: string }[][] = [
  [
    { text: 'Programs', color: '#ffffff' },
    { text: 'at scale.', color: '#ffffff' },
  ],
  [
    { text: 'Systems', color: '#ffffff' },
    { text: 'that', color: '#ffffff' },
  ],
  [
    { text: 'last.', color: '#5AC8FA' },
  ],
];

/* ─── Main component ────────────────────────────────────── */
export function HeroAbout() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: '-10%' });

  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: '-10%' });

  return (
    <>
      {/* ─── Responsive overrides ──────────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .hero-section { display: flex !important; flex-direction: column !important; min-height: 100svh !important; }
          .hero-photo-wrap { position: relative !important; left: 0 !important; transform: none !important; width: 100% !important; height: 65vh !important; bottom: auto !important; }
          .hero-text-wrap { position: relative !important; bottom: auto !important; left: auto !important; padding: 24px !important; max-width: 100% !important; }
          .hero-h1 { font-size: clamp(2rem, 8vw, 3rem) !important; }
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
        {/* Subtle noise grain overlay */}
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

        {/* Photo — dominant, centered-right (z-index 1) */}
        <motion.div
          className="hero-photo-wrap"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-40%)',
            height: '95vh',
            width: 'clamp(280px, 40vw, 540px)',
            WebkitMaskImage:
              'linear-gradient(to top, black 60%, transparent 100%)',
            maskImage:
              'linear-gradient(to top, black 60%, transparent 100%)',
            zIndex: 1,
          }}
        >
          <Image
            src={profile.photo}
            alt={`${profile.name} — Product Manager`}
            fill
            style={{ objectFit: 'contain', objectPosition: 'bottom center' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 540px"
          />
        </motion.div>

        {/* Text block — bottom-left (z-index 2) */}
        <div
          className="hero-text-wrap"
          style={{
            position: 'absolute',
            bottom: 'clamp(48px, 8vh, 80px)',
            left: 'clamp(32px, 6vw, 96px)',
            zIndex: 2,
            maxWidth: 'clamp(480px, 44vw, 680px)',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Thomas Loridan
          </motion.p>

          {/* H1 — nominal fragment, word-by-word clip-path reveal */}
          <h1
            className="hero-h1"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              fontSize: 'clamp(2.6rem, 5.5vw, 5.2rem)',
              marginBottom: '20px',
            }}
          >
            {H1_LINES.map((line, li) => {
              const prevCount = H1_LINES.slice(0, li).reduce(
                (acc, l) => acc + l.length,
                0,
              );
              return (
                <span key={li} style={{ display: 'block' }}>
                  {line.map((word, wi) => {
                    const idx = prevCount + wi;
                    return (
                      <span key={wi}>
                        <motion.span
                          style={{ display: 'inline-block' }}
                          initial={{ clipPath: 'inset(0 100% 0 0)' }}
                          animate={{ clipPath: 'inset(0 0% 0 0)' }}
                          transition={{
                            duration: 0.6,
                            delay: 0.3 + idx * 0.08,
                            ease: EASE,
                          }}
                        >
                          <span style={{ color: word.color }}>{word.text}</span>
                        </motion.span>
                        {wi < line.length - 1 && (
                          <span aria-hidden="true">&nbsp;</span>
                        )}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          {/* Metrics sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{
              color: 'rgba(245,245,247,0.50)',
              fontSize: 'clamp(0.78rem, 0.9vw, 0.88rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              marginBottom: '28px',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.04em',
            }}
          >
            €30M+ portfolio&nbsp;·&nbsp;26 countries&nbsp;·&nbsp;Amazon EU Transportation
          </motion.p>

          {/* CTA — 1 primary button + 1 muted text link */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}
          >
            <button
              onClick={() => scrollTo('experience')}
              style={{
                padding: '11px 26px',
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
              See the work
            </button>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: 'rgba(245,245,247,0.40)',
                fontSize: '0.82rem',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(245,245,247,0.75)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = 'rgba(245,245,247,0.40)')
              }
            >
              LinkedIn <ExternalLink size={10} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GRADIENT TRANSITION BAND
      ══════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          height: '120px',
          background: 'linear-gradient(to bottom, #000000 0%, #ffffff 100%)',
        }}
      />

      {/* ══════════════════════════════════════════════════
          WHITE ABOUT — enabling voice, 3 blocks
      ══════════════════════════════════════════════════ */}
      <section id="about" className="bg-white pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 28 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Eyebrow */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#0075eb',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: '36px',
              }}
            >
              About
            </p>

            {/* Big heading */}
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                fontWeight: 800,
                color: '#0a0a0a',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                marginBottom: '48px',
                maxWidth: '760px',
              }}
            >
              The PM who turns
              <br />
              <span style={{ color: '#0075eb' }}>complexity into clarity.</span>
            </h2>

            {/* Three-block enabling voice structure */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12"
              style={{ borderTop: '1px solid #e5e7eb', paddingTop: '36px' }}
            >
              {/* Block 1 — What I do */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#0075eb',
                    fontWeight: 500,
                  }}
                >
                  What I do
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    lineHeight: 1.3,
                  }}
                >
                  I connect product vision to engineering reality.
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.75 }}>
                  TPM at Amazon EU Transportation, owning a €30M+ ARR roadmap across 26 countries.
                  I translate ambiguous business goals into executable programs — then ship them.
                </p>
              </div>

              {/* Block 2 — How */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#0075eb',
                    fontWeight: 500,
                  }}
                >
                  How I work
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    lineHeight: 1.3,
                  }}
                >
                  Data-first. Customer-obsessed. Always shipping.
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.75 }}>
                  I build tools I&apos;d want to use myself. Every decision is anchored in metrics,
                  every release validated against real user behaviour. Automation where possible,
                  judgment where it counts.
                </p>
              </div>

              {/* Block 3 — Track record */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#0075eb',
                    fontWeight: 500,
                  }}
                >
                  Track record
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    lineHeight: 1.3,
                  }}
                >
                  Amazon. L&apos;Oréal. A startup from zero.
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.75 }}>
                  MSc École Centrale Lille. Co-founded Familyad, reached Station F finals.
                  Built analytics for C-suites at L&apos;Oréal. Now driving EU transportation
                  programs at Amazon scale.
                </p>
              </div>
            </div>

            {/* Metadata row */}
            <div
              className="flex flex-wrap gap-x-10 gap-y-3"
              style={{ marginTop: '36px', paddingTop: '28px', borderTop: '1px solid #e5e7eb' }}
            >
              {[
                { label: 'Based in', value: 'Luxembourg · Paris · Barcelona — open to relocation' },
                { label: 'Languages', value: 'French · English' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#9ca3af',
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          QUOTE INTERLUDE — standalone below About (I9)
      ══════════════════════════════════════════════════ */}
      <section
        style={{
          background: '#0a0a0a',
          padding: 'clamp(56px, 9vw, 96px) clamp(24px, 6vw, 96px)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 24 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          style={{ maxWidth: '860px', margin: '0 auto' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              marginBottom: '20px',
            }}
          >
            Approach
          </p>
          <blockquote style={{ margin: 0 }}>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                fontWeight: 700,
                color: '#f5f5f7',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
              }}
            >
              &ldquo;I don&apos;t just ship features.{' '}
              <span style={{ color: '#5AC8FA' }}>
                I build systems that last.
              </span>
              &rdquo;
            </p>
          </blockquote>
        </motion.div>
      </section>
    </>
  );
}
