'use client';

import React, { useState, useRef } from 'react';
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
        width: '400px',
        background: '#ffffff',
        border: '1px solid #e8e8e8',
        borderRadius: '20px',
        marginRight: '16px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
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
      {/* Left — logo panel */}
      <div
        style={{
          width: '120px',
          flexShrink: 0,
          background: cert.isAward ? `${cert.accentColor}10` : '#f5f5f7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px 16px',
        }}
      >
        {cert.isAward ? (
          <span style={{ fontSize: '40px', lineHeight: 1 }}>{cert.awardIcon}</span>
        ) : isMcKinsey ? (
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '0.7rem',
              color: '#0C2340',
              fontWeight: 600,
              textAlign: 'center',
              lineHeight: 1.4,
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
            style={{ objectFit: 'contain', maxWidth: '80px', maxHeight: '52px' }}
          />
        ) : (
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: `${cert.accentColor}18`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: cert.accentColor,
              fontWeight: 700,
              fontSize: '1.1rem',
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

      {/* Right — content */}
      <div
        style={{
          flex: 1,
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          borderLeft: '1px solid #f0f0f0',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
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
            fontSize: '0.95rem',
            color: '#0a0a0a',
            lineHeight: 1.3,
            flex: 1,
          }}
        >
          {cert.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
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
  const inView = useInView(headerRef, { once: true, margin: '-15%' });
  const [selected, setSelected] = useState<Certification | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const CARD_WIDTH = 416; // 400px card + 16px gap
  const VISIBLE_COUNT = 3;
  const maxIdx = Math.max(0, certifications.length - VISIBLE_COUNT);

  const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIdx((i) => Math.min(maxIdx, i + 1));

  const canPrev = currentIdx > 0;
  const canNext = currentIdx < maxIdx;

  const BTN_BASE: React.CSSProperties = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.12)',
    background: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    color: '#0a0a0a',
    transition: 'background 0.2s, opacity 0.2s',
    fontFamily: 'var(--font-body)',
  };

  return (
    <section id="certifications" className="section-padding certs-bg" style={{ overflow: 'hidden' }}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header + nav row */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ marginBottom: '48px' }}
        >
          {/* Top row: header left, nav arrows right */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px' }}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color: '#6e6e73',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}
              >
                Certifications
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(3rem, 6vw, 6rem)',
                  color: '#0a0a0a',
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                  marginBottom: '16px',
                }}
              >
                Continuous learning.
              </h2>
              <p
                style={{
                  color: '#6e6e73',
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  lineHeight: 1.8,
                  fontWeight: 400,
                  maxWidth: '560px',
                }}
              >
                Google, AWS, McKinsey, and more. Staying at the frontier of what&apos;s possible.
              </p>
            </div>

            {/* Navigation arrows */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={goPrev}
                disabled={!canPrev}
                style={{ ...BTN_BASE, opacity: canPrev ? 1 : 0.3, cursor: canPrev ? 'pointer' : 'default' }}
                aria-label="Previous"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                disabled={!canNext}
                style={{ ...BTN_BASE, opacity: canNext ? 1 : 0.3, cursor: canNext ? 'pointer' : 'default' }}
                aria-label="Next"
              >
                ›
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Carousel — full bleed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7, delay: 0.15 }}
        style={{ overflow: 'hidden', paddingLeft: 'clamp(16px, 4vw, 48px)' }}
      >
        <motion.div
          animate={{ x: -currentIdx * CARD_WIDTH }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          style={{ display: 'flex', gap: '16px', width: 'max-content' }}
        >
          {certifications.map((cert) => (
            <div key={cert.id} style={{ flexShrink: 0, width: '400px' }}>
              <CertCard cert={cert} onClick={() => setSelected(cert)} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Dot indicators */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '28px',
        }}
      >
        {certifications.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(Math.min(i, maxIdx))}
            style={{
              width: i === currentIdx ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === currentIdx ? '#0a0a0a' : 'rgba(0,0,0,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'width 0.3s ease, background 0.3s ease',
              padding: 0,
            }}
            aria-label={`Go to cert ${i + 1}`}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
