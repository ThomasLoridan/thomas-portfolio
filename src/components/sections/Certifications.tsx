'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/certifications';
import { gsap } from '@/lib/gsap';
import type { Certification } from '@/types';

/* ─── Logo renderer (shared by card + modal) ─────────────── */
function CertLogo({
  cert,
  size = 'card',
}: {
  cert: Certification;
  size?: 'card' | 'modal';
}) {
  const isMcKinsey = cert.issuer === 'MCKINSEY & COMPANY';
  const imgH = size === 'modal' ? 44 : 36;

  if (cert.isAward) {
    return (
      <span style={{ fontSize: size === 'modal' ? '44px' : '36px', lineHeight: 1 }}>
        {cert.awardIcon}
      </span>
    );
  }
  if (isMcKinsey) {
    return (
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: size === 'modal' ? '1rem' : '0.78rem',
          color: '#0C2340',
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        McKinsey &amp; Company
      </span>
    );
  }
  if (cert.logo) {
    return (
      <Image
        src={cert.logo}
        width={cert.logoWidth}
        height={cert.logoHeight}
        alt={cert.issuer}
        style={{ objectFit: 'contain', objectPosition: 'left', maxHeight: `${imgH}px`, width: 'auto' }}
      />
    );
  }
  return null;
}

/* ─── Cert card — Apple grid tile ────────────────────────── */
function CertCard({
  cert,
  cardRef,
  onClick,
}: {
  cert: Certification;
  cardRef: (el: HTMLDivElement | null) => void;
  onClick: () => void;
}) {
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        opacity: 0,
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        borderRadius: '16px',
        padding: 'clamp(24px, 3vw, 32px)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = '0 12px 48px rgba(0,0,0,0.10)';
        el.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = 'none';
        el.style.transform = 'translateY(0)';
      }}
    >
      {/* Logo / icon */}
      <div style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
        <CertLogo cert={cert} size="card" />
      </div>

      {/* Separator */}
      <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)' }} />

      {/* Issuer */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.58rem',
          fontWeight: 500,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: cert.accentColor,
        }}
      >
        {cert.issuer}
      </p>

      {/* Cert name */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
          color: '#1d1d1f',
          lineHeight: 1.3,
          flex: 1,
        }}
      >
        {cert.name}
      </h3>

      {/* Year + view link */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#9b9b9b',
          }}
        >
          {cert.year}
        </span>
        {cert.url && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: cert.accentColor,
            }}
          >
            View →
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Detail modal — Framer Motion overlay ───────────────── */
function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          padding: '40px',
          width: '100%',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#f3f4f6',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
          }}
        >
          <X size={16} />
        </button>

        <div style={{ height: '48px', display: 'flex', alignItems: 'center' }}>
          <CertLogo cert={cert} size="modal" />
        </div>

        <div style={{ height: '1px', background: '#f0f0f0' }} />

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.14em',
            color: cert.accentColor,
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          {cert.issuer}
        </p>

        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.3rem',
            color: '#1d1d1f',
            lineHeight: 1.25,
          }}
        >
          {cert.name}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            color: '#9b9b9b',
          }}
        >
          {cert.year}
        </p>

        {cert.url ? (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '99px',
              background: '#1d1d1f',
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '0.875rem',
              textDecoration: 'none',
              alignSelf: 'flex-start',
              marginTop: '8px',
            }}
          >
            <ExternalLink size={14} />
            View credential
          </a>
        ) : (
          <p style={{ color: '#9ca3af', fontSize: '0.85rem', fontStyle: 'italic' }}>
            No public credential link available.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ────────────────────────────────────────── */
export function Certifications() {
  const sectionRef  = useRef<HTMLElement>(null);
  const overlineRef = useRef<HTMLParagraphElement>(null);
  const p1InnerRef  = useRef<HTMLSpanElement>(null);
  const p2InnerRef  = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [selected, setSelected] = useState<Certification | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Overline */
      gsap.fromTo(overlineRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* H2 clip reveal */
      gsap.fromTo([p1InnerRef.current, p2InnerRef.current],
        { yPercent: 110 },
        {
          yPercent: 0, duration: 0.85, ease: 'power4.out', stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Sub */
      gsap.fromTo(subRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* Cards — stagger across the grid */
      const cards = cardRefs.current.filter(Boolean);
      gsap.fromTo(cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 88%',
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
      id="certifications"
      style={{
        background: '#f5f5f7',
        paddingBlock: 'clamp(80px, 12vw, 120px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 64px)',
        }}
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <p
            ref={overlineRef}
            style={{
              opacity: 0,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              fontWeight: 500,
              color: '#5AC8FA',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Certifications
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '18px',
            }}
          >
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p1InnerRef} style={{ display: 'inline-block', color: '#1d1d1f' }}>
                Continuous&nbsp;
              </span>
            </span>
            <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <span ref={p2InnerRef} style={{ display: 'inline-block', color: '#1d1d1f' }}>
                learning.
              </span>
            </span>
          </h2>

          <p
            ref={subRef}
            style={{
              opacity: 0,
              color: '#6e6e73',
              fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
              lineHeight: 1.8,
              fontWeight: 400,
              maxWidth: '480px',
            }}
          >
            Google, AWS, McKinsey, and more. Staying at the frontier of what&apos;s possible.
          </p>
        </div>

        {/* ── 3-column grid ──────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'clamp(12px, 2vw, 20px)',
          }}
        >
          {certifications.map((cert, i) => (
            <CertCard
              key={cert.id}
              cert={cert}
              cardRef={(el) => { cardRefs.current[i] = el; }}
              onClick={() => setSelected(cert)}
            />
          ))}
        </div>
      </div>

      {/* ── Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
