'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/certifications';
import type { Certification } from '@/types';

/* ─── Marquee card ─────────────────────────────────────── */
function CertCard({
  cert,
  onClick,
}: {
  cert: Certification;
  onClick: () => void;
}) {
  const isMcKinsey = cert.issuer === 'MCKINSEY & COMPANY';

  return (
    <div
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: '320px',
        background: '#ffffff',
        border: '1px solid #e8e8e8',
        borderRadius: '20px',
        padding: '28px 28px 24px',
        marginRight: '16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        transition: 'box-shadow 0.2s, transform 0.2s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Logo / award area */}
      <div style={{ height: '56px', display: 'flex', alignItems: 'center' }}>
        {cert.isAward ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '40px', lineHeight: 1 }}>{cert.awardIcon}</span>
            <span
              style={{
                background: `${cert.accentColor}20`,
                color: cert.accentColor,
                fontSize: '0.62rem',
                padding: '4px 10px',
                borderRadius: '99px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Award
            </span>
          </div>
        ) : isMcKinsey ? (
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              color: '#0C2340',
              fontWeight: 600,
            }}
          >
            McKinsey &amp; Company
          </span>
        ) : cert.logo ? (
          <Image
            src={cert.logo}
            width={cert.logoWidth}
            height={cert.logoHeight}
            alt={cert.issuer}
            style={{ objectFit: 'contain', objectPosition: 'left' }}
          />
        ) : (
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: `${cert.accentColor}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cert.accentColor,
              fontWeight: 700,
              fontSize: '1rem',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {cert.issuer
              .split(' ')
              .filter((w) => w.length > 2)
              .map((w) => w[0])
              .join('')
              .slice(0, 2)}
          </div>
        )}
      </div>

      <div style={{ height: '1px', background: '#f0f0f0' }} />

      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: cert.accentColor,
          textTransform: 'uppercase',
          fontWeight: 500,
        }}
      >
        {cert.issuer}
      </p>

      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: '1rem',
          color: '#0a0a0a',
          lineHeight: 1.3,
          flex: 1,
        }}
      >
        {cert.name}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#9b9b9b',
          }}
        >
          {cert.year}
        </span>
        {cert.url && (
          <span
            style={{
              fontSize: '0.78rem',
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

/* ─── Modal ────────────────────────────────────────────── */
function CertModal({
  cert,
  onClose,
}: {
  cert: Certification;
  onClose: () => void;
}) {
  const isMcKinsey = cert.issuer === 'MCKINSEY & COMPANY';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
      onClick={onClose}
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
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          position: 'relative',
        }}
      >
        {/* Close */}
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

        {/* Logo */}
        <div style={{ height: '64px', display: 'flex', alignItems: 'center' }}>
          {cert.isAward ? (
            <span style={{ fontSize: '48px', lineHeight: 1 }}>{cert.awardIcon}</span>
          ) : isMcKinsey ? (
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '1.1rem',
                color: '#0C2340',
                fontWeight: 600,
              }}
            >
              McKinsey &amp; Company
            </span>
          ) : cert.logo ? (
            <Image
              src={cert.logo}
              width={cert.logoWidth}
              height={cert.logoHeight}
              alt={cert.issuer}
              style={{ objectFit: 'contain', objectPosition: 'left' }}
            />
          ) : null}
        </div>

        <div style={{ height: '1px', background: '#f0f0f0' }} />

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
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
            fontSize: '1.4rem',
            color: '#0a0a0a',
            lineHeight: 1.25,
          }}
        >
          {cert.name}
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
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
              background: '#0a0a0a',
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
          <p
            style={{
              color: '#9ca3af',
              fontSize: '0.85rem',
              fontStyle: 'italic',
            }}
          >
            No public credential link available.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ─── Main section ─────────────────────────────────────── */
export function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Certification | null>(null);
  const [wheelOffset, setWheelOffset] = useState(0);

  const doubled = [...certifications, ...certifications];

  const handleWheel = (e: React.WheelEvent) => {
    if (!paused) return;
    e.preventDefault();
    setWheelOffset((prev) => prev - (e.deltaY || e.deltaX) * 0.6);
  };

  return (
    <section id="certifications" className="section-padding certs-bg" style={{ overflow: 'hidden' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12"
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              color: '#0a0a0a',
              lineHeight: 1.05,
            }}
          >
            Continuous learning
          </h2>
          <p
            style={{
              color: '#6b7280',
              fontSize: '0.95rem',
              marginTop: '8px',
            }}
          >
            Click any card to view the credential.
          </p>
        </motion.div>
      </div>

      {/* Marquee — full bleed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setWheelOffset(0); }}
        onWheel={handleWheel}
        style={{ overflow: 'hidden', paddingLeft: '24px' }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: paused ? 'none' : 'marquee-left 30s linear infinite',
            transform: paused ? `translateX(${wheelOffset}px)` : undefined,
            transition: paused ? 'none' : undefined,
          }}
        >
          {doubled.map((cert, i) => (
            <CertCard key={`${cert.id}-${i}`} cert={cert} onClick={() => setSelected(cert)} />
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
