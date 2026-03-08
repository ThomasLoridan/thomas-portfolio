'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/* ─── Types ───────────────────────────────────────────────── */
type MediaConfig =
  | { type: 'image'; src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'gif'; src: string; fit?: 'contain' | 'cover'; bg?: string }
  | { type: 'orbs'; gradient: string };

interface Block {
  id: string;
  pattern: 'A' | 'B'; // A = image left/text right, B = text left/image right
  label: string;
  role: string;
  description: string;
  highlights: string[];
  accentColor: string;
  media: MediaConfig;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Highlight text parser ───────────────────────────────── */
function Highlight({ text, color }: { text: string; color: string }): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color, fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

/* ─── Block data ──────────────────────────────────────────── */
const BLOCKS: Block[] = [
  {
    id: 'amazon-tpm-innovation',
    pattern: 'A',
    label: 'AMAZON · AUG 2025–PRESENT · LUXEMBOURG',
    role: 'Technical Program Manager — Tech & Innovation Portfolio',
    description:
      'Own product strategy for the Tech & Innovation portfolio supporting 30-country EU Intermodal and Expansion. Drive the €30M ARR roadmap across analytics platforms and automation systems.',
    highlights: [
      '**€13.3M ARR** from SONAR automation — 4 hours → 5 minutes cycle time',
      '**50+ stakeholders** aligned across 4 L6 managers and 1 L7 director',
      '**€30M portfolio** managed across 4 technical pillars',
    ],
    accentColor: '#FF9900',
    media: {
      type: 'image',
      src: '/images/companies/amazon-dark.jpg',
      fit: 'contain',
      bg: '#0a0a0a',
    },
  },
  {
    id: 'amazon-ba-emea',
    pattern: 'B',
    label: 'AMAZON · DEC 2024–AUG 2025 · LUXEMBOURG',
    role: 'Performance Business Analyst — Transportation EMEA',
    description:
      'Built real-time monitoring and AI-assisted audit workflows for 30+ L5–L7 leaders. Consolidated fragmented reporting across 35 countries into a single source of truth.',
    highlights: [
      '**80+ ETL pipelines** consolidating 530 lanes across 35 countries',
      '**€1.5M/quarter** in rail capacity planning savings',
      '**45% volume increase** on UK high-speed rail expansion',
    ],
    accentColor: '#FF9900',
    media: {
      type: 'gif',
      src: '/images/companies/amazon-light.gif',
      fit: 'contain',
      bg: '#ffffff',
    },
  },
  {
    id: 'amazon-tpm-reliability',
    pattern: 'A',
    label: 'AMAZON · APR 2024–DEC 2024 · BARCELONA',
    role: 'Technical Program Manager — Global Strategic Reliability',
    description:
      'Drove product development for operational analytics platforms across 2,300 global fulfillment sites. Built 3 strategic data platforms with senior engineers.',
    highlights: [
      '**25% downtime reduction** across 2,300 fulfillment sites',
      '**10,000+ daily users** on 3 strategic data platforms',
      '**€8.9M** operational costs benchmarked across 25 fulfillment centers',
    ],
    accentColor: '#FF9900',
    media: {
      type: 'gif',
      src: '/images/companies/amazon-arrow.gif',
      fit: 'contain',
      bg: '#0a0a0a',
    },
  },
  {
    id: 'auchan',
    pattern: 'B',
    label: 'AUCHAN RETAIL · SEP 2023–MAR 2024 · LILLE',
    role: 'Strategy Consultant — DSI',
    description:
      'Analyzed €250M IT portfolio and led strategic benchmarking across major retail groups. Delivered risk-adjusted roadmap prioritization for executive leadership.',
    highlights: [
      '**€250M IT portfolio** — tech debt analysis and prioritization',
      '**4 companies** benchmarked: CGI, EDF, Decathlon, 3 Mousquetaires',
    ],
    accentColor: '#E2001A',
    media: {
      type: 'image',
      src: '/images/auchan/auchan-logo-full.png',
      fit: 'contain',
      bg: '#1a0000',
    },
  },
  {
    id: 'loreal-freelance',
    pattern: 'A',
    label: "L'ORÉAL · MAR 2023–MAR 2024 · PARIS",
    role: "Business Analyst — Global CDMO, Consumer Product Division",
    description:
      'Led global data governance engagement across 50+ countries. Standardized reporting and designed bi-weekly COMEX dashboards for C-suite product roadmap alignment.',
    highlights: [
      '**50+ countries** data governance standardized',
      '**20% data quality improvement** presented to CDMO leadership',
    ],
    accentColor: '#C8A951',
    media: {
      type: 'image',
      src: '/images/loreal/loreal-grand-public.jpg',
      fit: 'cover',
      bg: '#1a1300',
    },
  },
  {
    id: 'loreal-delivery',
    pattern: 'B',
    label: "L'ORÉAL · SEP 2022–MAR 2023 · PARIS",
    role: 'Technical Delivery Manager — Global Data Team',
    description:
      'Built global B2B analytics platform supporting billion-euro product decisions across Europe, China, and the US. Re-engineered IT delivery workflows.',
    highlights: [
      '**Europe, China & US** markets covered by B2B platform',
      '**25% lead time reduction** via IT delivery re-engineering',
    ],
    accentColor: '#C8A951',
    media: {
      type: 'image',
      src: '/images/loreal/loreal-pro.webp',
      fit: 'cover',
      bg: '#111',
    },
  },
  {
    id: 'loreal-pm',
    pattern: 'A',
    label: "L'ORÉAL · FEB 2022–SEP 2022 · PARIS",
    role: 'Technical Project Manager — Digital EMEA',
    description:
      'Delivered 12 automated customer journeys across 3 UK divisions. Scaled web stack across 120 websites, unlocking €100M ARR opportunity.',
    highlights: [
      '**€1.75M ARR** from 12 UK automated customer journeys',
      '**€100M ARR** unlocked via 120-website web stack scaling',
    ],
    accentColor: '#C8A951',
    media: {
      type: 'image',
      src: '/images/loreal/loreal-water.webp',
      fit: 'cover',
      bg: '#111',
    },
  },
  {
    id: 'familyad',
    pattern: 'B',
    label: 'FAMILYAD · SEP 2021–MAR 2022 · PARIS',
    role: 'Co-Founder, CEO & CFO',
    description:
      'Launched ad-tech platform from zero to pre-Series A engagement. Led product design, customer discovery, and financial modeling. Pitched at Station F.',
    highlights: [
      '**Station F finalist** — pitched to venture partners',
      '**MVP launched** — product design, discovery, financial modeling',
    ],
    accentColor: '#6366f1',
    media: {
      type: 'orbs',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #3730a3 100%)',
    },
  },
];

/* ─── Media panel ─────────────────────────────────────────── */
function MediaPanel({ media }: { media: MediaConfig }) {
  if (media.type === 'orbs') {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '320px',
          background: media.gradient,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)',
            top: '-60px',
            right: '-60px',
          }}
        />
        <div
          className="animate-pulse-glow"
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            bottom: '-40px',
            left: '-40px',
            animationDelay: '1s',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '1.5rem',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Familyad
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '320px',
        background: media.bg ?? '#111',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={media.src}
        alt=""
        fill
        style={{ objectFit: media.fit ?? 'cover' }}
        unoptimized={media.type === 'gif'}
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

/* ─── Single experience block ─────────────────────────────── */
function ExperienceBlock({ block }: { block: Block }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-20%' });
  const isPatternA = block.pattern === 'A';

  const mediaMotion = {
    initial: { opacity: 0, scale: 1.15 },
    animate: inView ? { opacity: 1, scale: 1 } : {},
    transition: { duration: 1, ease: EASE },
  };

  const textMotion = {
    initial: { opacity: 0, x: isPatternA ? 40 : -40 },
    animate: inView ? { opacity: 1, x: 0 } : {},
    transition: { duration: 0.7, delay: 0.2, ease: EASE },
  };

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(48px, 8vh, 80px) 0',
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(11px, 2.6vw, 36px)',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.5)',
          zIndex: 2,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
            isPatternA ? '' : 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1'
          }`}
        >
          {/* Image panel — zoom reveal */}
          <motion.div
            {...mediaMotion}
            style={{ aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden' }}
          >
            <MediaPanel media={block.media} />
          </motion.div>

          {/* Text panel */}
          <motion.div {...textMotion} className="flex flex-col gap-5">
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {block.label}
            </p>

            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              {block.role}
            </h3>

            <p
              style={{
                color: 'rgba(255,255,255,0.65)',
                fontSize: 'clamp(1rem, 1.2vw, 1.2rem)',
                lineHeight: 1.75,
              }}
            >
              {block.description}
            </p>

            <ul className="flex flex-col gap-3">
              {block.highlights.map((h, i) => (
                <li
                  key={i}
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '1.05rem',
                    lineHeight: 1.6,
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <span style={{ color: block.accentColor, flexShrink: 0, marginTop: '2px' }}>→</span>
                  <Highlight text={h} color={block.accentColor} />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ─────────────────────────────────────────── */
export function Experience() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience-bg" style={{ position: 'relative' }}>
      {/* Timeline vertical line */}
      <div
        style={{
          position: 'absolute',
          left: 'clamp(15px, 3vw, 40px)',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'rgba(255,255,255,0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(2.8rem, 5vw, 5rem)',
              color: '#ffffff',
              lineHeight: 1.05,
            }}
          >
            Where I&apos;ve made{' '}
            <span style={{ color: '#5AC8FA' }}>an impact</span>
          </h2>
        </motion.div>
      </div>

      {/* Experience blocks */}
      {BLOCKS.map((block, i) => (
        <div key={block.id}>
          <ExperienceBlock block={block} />
          {/* Separator (skip last) */}
          {i < BLOCKS.length - 1 && (
            <div
              style={{
                maxWidth: '1152px',
                margin: '0 auto',
                padding: '0 24px',
              }}
            >
              <div
                style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    background: '#000000',
                    padding: '0 16px',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(255,255,255,0.25)',
                    letterSpacing: '0.1em',
                  }}
                >
                  — {BLOCKS[i + 1]?.label.split(' · ')[0]} —
                </span>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Bottom padding */}
      <div style={{ height: 'clamp(48px, 8vh, 80px)' }} />
    </section>
  );
}
