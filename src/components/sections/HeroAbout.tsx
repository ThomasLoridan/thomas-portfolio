'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── H1 word-by-word data ─────────────────────────────── */
const H1_LINES: { text: string; color: string }[][] = [
  [
    { text: 'Building', color: '#ffffff' },
    { text: 'bridges', color: '#ffffff' },
  ],
  [
    { text: 'between', color: '#ffffff' },
    { text: 'business', color: '#ffffff' },
  ],
  [
    { text: '&', color: '#ffffff' },
    { text: 'technology.', color: '#5AC8FA' },
  ],
];

/* ─── Main component ────────────────────────────────────── */
export function HeroAbout() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const bioRef = useRef<HTMLDivElement>(null);
  const bioInView = useInView(bioRef, { once: true, margin: '-12%' });

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
          DARK HERO — Apple MacBook Pro style
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
        {/* Radial glow — behind photo (z-index 0) */}
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70vw',
            height: '70vh',
            background:
              'radial-gradient(ellipse at center bottom, rgba(90,120,255,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
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
            alt={`${profile.name} — Technical Program Manager`}
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
            maxWidth: '520px',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              letterSpacing: '0.04em',
              marginBottom: '12px',
            }}
          >
            Thomas Loridan
          </motion.p>

          {/* H1 — word-by-word clip-path reveal */}
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

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: '400px',
              marginBottom: '28px',
              fontFamily: 'var(--font-body)',
            }}
          >
            I lead cross-functional programs that create measurable impact.
          </motion.p>

          {/* CTA buttons — glass style */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
          >
            <button
              onClick={() => scrollTo('experience')}
              style={{
                padding: '10px 22px',
                borderRadius: '980px',
                background: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.2)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.12)')
              }
            >
              View my work ↓
            </button>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '10px 22px',
                borderRadius: '980px',
                background: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 400,
                fontFamily: 'var(--font-body)',
                border: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.2)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  'rgba(255,255,255,0.12)')
              }
            >
              LinkedIn <ExternalLink size={11} />
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
          WHITE ABOUT (below fold)
      ══════════════════════════════════════════════════ */}
      <section id="about" className="bg-white pb-28">
        <div className="max-w-6xl mx-auto px-6">

          {/* Two-column: pull quote + bio */}
          <motion.div
            ref={bioRef}
            initial={{ opacity: 0, y: 28 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          >
            {/* Left: pull quote + metadata */}
            <div className="flex flex-col gap-8">
              <blockquote style={{ borderLeft: '4px solid #0075eb', paddingLeft: '24px', margin: 0 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    color: '#0a0a0a',
                    lineHeight: 1.3,
                  }}
                >
                  &ldquo;I don&apos;t just ship features.
                  I build systems that last.&rdquo;
                </p>
              </blockquote>

              <div className="flex flex-col gap-3">
                {[
                  { label: 'Location', value: 'Luxembourg · Remote-friendly' },
                  { label: 'Languages', value: 'French · English' },
                  { label: 'Focus', value: 'PM IC4/IC5 at GAFAM companies' },
                  { label: 'Education', value: 'École Centrale Lille · MSc Corporate Strategy' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-xs font-mono text-gray-400 tracking-wider uppercase w-24 shrink-0 pt-0.5">
                      {label}
                    </span>
                    <span className="text-sm text-gray-700 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: bio + CTAs */}
            <div className="flex flex-col gap-6">
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
                  fontWeight: 700,
                  color: '#0a0a0a',
                  lineHeight: 1.2,
                }}
              >
                Builder. Strategist.{' '}
                <span style={{ color: '#0075eb' }}>Executor.</span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                {profile.bio}
              </p>

              <p className="text-base text-gray-500 leading-relaxed">
                I&apos;ve spent my career at the intersection of data engineering,
                program management, and product strategy — building platforms at Amazon
                that serve 2,300+ sites, and delivering analytics solutions at L&apos;Oréal
                that reshaped how their C-suite makes product decisions.
              </p>

              <p className="text-base text-gray-500 leading-relaxed">
                My goal is to move into a PM IC4/IC5 role where I can own the full
                product lifecycle: discovery, roadmap, build, and launch — combining
                the technical depth I&apos;ve built as a TPM with the strategic thinking
                of a Product leader.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button onClick={() => scrollTo('experience')} className="btn-black">
                  View my work
                </button>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline inline-flex items-center gap-2"
                >
                  <ExternalLink size={14} /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
